// FUSIONIFY UI · uji otomatis (email). Dijalankan oleh tests/run.mjs
// Cek: semua template email bisa dirender, isian di-escape (tidak bisa menyisipkan HTML/skrip),
// aturan email dipatuhi (tanpa SVG/WebP, gambar ber-width/height/alt, di bawah batas potong Gmail 102 KB),
// teks polos tersedia, tampil tanpa scroll samping di HP, dan setiap blok punya keluaran.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { BASE, ROOT } from "./_env.mjs";
import { renderEmail, tandaTangan } from "../email/fy-email.js";
import * as T from "../email/templates.js";

let lulus = 0, gagal = 0;
const cek = (ok, pesan) => { if (ok) lulus++; else { gagal++; console.log("  ✗ " + pesan); } };
const opsi = { aset: "https://contoh.fusionify.id/email/" };
const jahat = `<img src=x onerror=alert(1)>"'&`;

const semua = {
  kodeVerifikasi: T.kodeVerifikasi({ nama: jahat, kode: "482913" }, opsi),
  aturUlangPassword: T.aturUlangPassword({ nama: jahat, url: "javascript:alert(1)" }, opsi),
  selamatDatang: T.selamatDatang({ nama: jahat, url: "https://contoh.fusionify.id", langkah: [jahat] }, opsi),
  pengajuanDisetujui: T.pengajuanDisetujui({ nama: jahat, url: "https://contoh.fusionify.id", langkah: ["a"] }, opsi),
  pengajuanDitolak: T.pengajuanDitolak({ nama: jahat, alasanTolak: jahat }, opsi),
  pembayaranBerhasil: T.pembayaranBerhasil({ nama: jahat, nomor: "INV-1", jumlah: "Rp1" }, opsi),
  pembayaranGagal: T.pembayaranGagal({ nama: jahat, nomor: "INV-1", jumlah: "Rp1", alasanGagal: jahat }, opsi),
  statusPenarikan: T.statusPenarikan({ nama: jahat, status: "selesai", jumlah: "Rp1", rekening: "1234567890", atasNama: jahat, bank: jahat }, opsi),
  statusPenarikanTolak: T.statusPenarikan({ nama: jahat, status: "ditolak", jumlah: "Rp1", rekening: "1" }, opsi),
  pemberitahuan: T.pemberitahuan({ nama: jahat, judul: jahat, paragraf: [jahat] }, opsi),
};

for (const [nama, m] of Object.entries(semua)) {
  const h = m.html;
  // Isian berbahaya harus muncul sebagai teks (&lt;img …), bukan sebagai tag
cek(!h.includes("<img src=x") && h.includes("&lt;img src=x"), `${nama}: isian tidak di-escape`);
  cek(!/href="javascript:/i.test(h), `${nama}: tautan javascript: lolos`);
  cek(!/<svg|\.webp/i.test(h), `${nama}: memakai SVG/WebP`);
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((x) => x[0]);
  cek(imgs.every((i) => /\swidth="\d+"/.test(i) && /\sheight="\d+"/.test(i) && /\salt="/.test(i)), `${nama}: img tanpa width/height/alt`);
  cek(Buffer.byteLength(h) < 102 * 1024, `${nama}: ${Buffer.byteLength(h)} byte, lewat batas Gmail`);
  cek(m.subject && m.text.length > 20 && !/<[a-z]/i.test(m.text.split(jahat).join("")), `${nama}: subject/teks polos`);
  cek(/<meta name="color-scheme" content="light">/.test(h) && h.includes('role="presentation"'), `${nama}: kerangka email`);
}
cek(semua.statusPenarikan.html.includes("•••• 7890") && !semua.statusPenarikan.html.includes("1234567890"), "rekening tidak disamarkan");

let galat = "";
try { renderEmail({ judul: "x", maskot: "happy" }); } catch (e) { galat = e.message; }
cek(galat.includes("aset"), "maskot tanpa aset harus ditolak");
try { renderEmail({ judul: "x", maskot: "naga", aset: "https://x/" }); galat = ""; } catch (e) { galat = e.message; }
cek(galat.includes("tidak ada"), "maskot tidak dikenal harus ditolak");

// Tanda tangan email
{
  const tt = tandaTangan({ nama: "Budi <b>", jabatan: "Desainer", aset: "https://contoh.id/fy/email/" });
  cek(tt.html.includes("Budi &lt;b&gt;") && !tt.html.includes("<b>"), "tanda tangan: nama tidak di-escape");
  cek(tt.html.includes("hello@fusionify.id") && tt.html.includes("+62 831-1138-0628"), "tanda tangan: kontak publik hilang");
  cek(tt.html.includes("https://contoh.id/fy/email/fusionify-mark-112.png") && /width="56" height="56" alt="FUSIONIFY"/.test(tt.html), "tanda tangan: logo");
  cek(!/<svg|\.webp|<style/i.test(tt.html), "tanda tangan: SVG/WebP/style tidak boleh");
  cek(tt.text.startsWith("-- \nBudi <b>") && tt.text.includes("PT FUSIONIFY DIGITAL STORE"), "tanda tangan: teks polos");
  const tp = tandaTangan({ nama: "A", jabatan: "B", merek: { nama: "Premiumify", logo: "javascript:alert(1)", url: "https://premiumify.my.id" }, produkFusionify: true });
  cek(tp.html.includes("Premiumify") && tp.html.includes("Sebuah produk dari FUSIONIFY") && !tp.html.includes("javascript:"), "tanda tangan produk");
  cek(fs.existsSync(path.join(ROOT, "email/aset/fusionify-mark-112.png")), "aset fusionify-mark-112.png tidak ada");
}

// Tampilan di HP (390px) dan desktop: tanpa scroll samping, gambar contoh termuat
const b = await chromium.launch();
const contoh = fs.readdirSync(path.join(ROOT, "email/contoh")).filter((f) => f.endsWith(".html"));
cek(contoh.length >= 9, `pratinjau email cuma ${contoh.length}`);
for (const f of contoh) for (const w of [390, 700]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(BASE + "email/contoh/" + f, { waitUntil: "networkidle" });
  const r = await p.evaluate((w) => ({ sw: document.documentElement.scrollWidth, rusak: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute("src")) }), w);
  cek(r.sw <= w, `${f} @${w}: scroll samping ${r.sw}`);
  cek(!r.rusak.length, `${f}: gambar rusak ${r.rusak.join(",")}`);
  await p.close();
}
await b.close();

console.log(`${lulus} lulus, ${gagal} FAIL`);
process.exit(gagal ? 1 : 0);
