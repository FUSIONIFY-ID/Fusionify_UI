// FUSIONIFY UI · uji otomatis (dokumen). Dijalankan oleh tests/run.mjs
// Cek: hitungan dokumen.js (terbilang, Rupiah, total invoice), setiap template cetak tidak punya
// isi yang keluar halaman, jumlah halaman PDF benar, gambar dan huruf termuat, serta template Office
// ada dan berisi bagian yang diharapkan.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { BASE, ROOT } from "./_env.mjs";

let lulus = 0, gagal = 0;
const cek = (ok, pesan) => { if (ok) lulus++; else { gagal++; console.log("  ✗ " + pesan); } };

// 1. Fungsi hitung (tanpa browser)
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "dokumen/cetak/dokumen.js"), "utf8"), ctx);
const D = ctx.window.FYDokumen;
const kasus = [[0, "Nol rupiah"], [11, "Sebelas rupiah"], [115, "Seratus lima belas rupiah"], [1001, "Seribu satu rupiah"],
  [1500000, "Satu juta lima ratus ribu rupiah"], [12345678, "Dua belas juta tiga ratus empat puluh lima ribu enam ratus tujuh puluh delapan rupiah"],
  [2000000000, "Dua miliar rupiah"]];
for (const [n, harap] of kasus) cek(D.kalimatRupiah(n) === harap, `terbilang ${n}: "${D.kalimatRupiah(n)}"`);
cek(D.rupiah(1500000) === "Rp1.500.000", `rupiah: ${D.rupiah(1500000)}`);

// 2. Template cetak
const halaman = { "sertifikat.html": 1, "tiket.html": 1, "kartu-nama.html": 2, "surat.html": 1, "invoice.html": 1, "penawaran.html": 1, "kuitansi.html": 1, "dokumen.html": 2, "slide.html": 5, "perjanjian.html": 3 };
const b = await chromium.launch();
const p = await b.newPage();
for (const [f, jumlah] of Object.entries(halaman)) {
  const salah = [];
  p.removeAllListeners("pageerror");
  p.removeAllListeners("response");
  p.on("pageerror", (e) => salah.push("JS " + e.message));
  p.on("response", (r) => { if (r.status() >= 400) salah.push(r.status() + " " + r.url()); });
  await p.goto(BASE + "dokumen/cetak/" + f, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const out = [];
    const lembar = [...document.querySelectorAll(".halaman, .slide")];
    lembar.forEach((pg, i) => {
      const b = pg.getBoundingClientRect();
      pg.querySelectorAll("*").forEach((el) => {
        if (el.closest(".segel, .fx-oversize")) return;
        const k = el.getBoundingClientRect();
        if (k.width && k.height && (k.bottom > b.bottom + 1 || k.right > b.right + 1)) out.push(`keluar halaman ${i + 1}: ${el.tagName}.${el.className}`);
      });
    });
    const rusak = [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute("src"));
    if (rusak.length) out.push("gambar rusak " + rusak.join(","));
    const tanpaUkuran = [...document.images].filter((i) => !i.getAttribute("width") || !i.getAttribute("height")).length;
    if (tanpaUkuran) out.push(`img tanpa width/height ${tanpaUkuran}`);
    const huruf = ["Afacad Flux Variable", "Sansation", "Exo 2 Variable"].filter((f) => !document.fonts.check(`16px "${f}"`));
    if (huruf.length) out.push("huruf tidak termuat " + huruf.join(","));
    const segelKosong = [...document.querySelectorAll(".segel")].filter((s) => !s.querySelector("svg")).length;
    if (segelKosong) out.push(`segel tanpa svg ${segelKosong}`);
    return { out: [...new Set(out)].slice(0, 5), lembar: lembar.length, total: document.querySelector("[data-total]")?.textContent || null, terbilang: document.querySelector("[data-terbilang]")?.textContent || null };
  });
  cek(r.lembar === jumlah, `${f}: ${r.lembar} lembar, harusnya ${jumlah}`);
  cek(!r.out.length && !salah.length, `${f}: ${[...r.out, ...salah].join(" | ")}`);
  if (f === "invoice.html") {
    cek(r.total === "Rp4.300.000", `invoice total ${r.total}`);
    cek(r.terbilang === "Empat juta tiga ratus ribu rupiah", `invoice terbilang ${r.terbilang}`);
  }
  if (f === "penawaran.html") cek(r.total === "Rp3.000.000", `penawaran total ${r.total}`);
  if (f === "perjanjian.html") cek(r.terbilang === "Dua juta lima ratus ribu rupiah", `perjanjian terbilang ${r.terbilang}`);
  const pdf = await p.pdf({ preferCSSPageSize: true, printBackground: true });
  const nHal = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  cek(nHal === jumlah, `${f}: PDF ${nHal} halaman, harusnya ${jumlah}`);
}
await b.close();

// 3. Template Office (berkas zip OOXML dengan bagian yang diharapkan)
const office = {
  "FUSIONIFY-Surat.docx": ["word/document.xml", "word/header1.xml", "word/fonts/"],
  "FUSIONIFY-Dokumen.docx": ["word/document.xml", "word/fonts/"],
  "FUSIONIFY-Perjanjian.docx": ["word/document.xml", "word/header1.xml", "word/fonts/"],
  "FUSIONIFY-Slide.pptx": ["ppt/presentation.xml", "ppt/slideLayouts/", "ppt/theme/theme1.xml"],
  "FUSIONIFY-Spreadsheet.xlsx": ["xl/workbook.xml", "xl/worksheets/sheet2.xml"],
};
for (const [f, bagian] of Object.entries(office)) {
  const file = path.join(ROOT, "dokumen/office", f);
  if (!fs.existsSync(file)) { cek(false, `${f} tidak ada`); continue; }
  const isi = fs.readFileSync(file).toString("latin1");
  cek(isi.startsWith("PK"), `${f} bukan zip OOXML`);
  for (const nama of bagian) cek(isi.includes(nama), `${f} tidak berisi ${nama}`);
}
const tema = fs.readFileSync(path.join(ROOT, "dokumen/office/FUSIONIFY-Slide.pptx"));
cek(tema.length > 0, "pptx kosong");

console.log(`${lulus} lulus, ${gagal} FAIL`);
process.exit(gagal ? 1 : 0);
