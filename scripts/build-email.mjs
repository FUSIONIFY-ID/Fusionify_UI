// FUSIONIFY UI · buat pratinjau semua template email ke email/contoh/*.html dan *.txt.
//   npm run build:email
// Pratinjau memakai path relatif ke email/aset dan brand/kit, jadi bisa dibuka langsung di browser.
// Di produksi, isi `aset` dan `merek.logo` dengan URL https yang benar-benar di-host.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as T from "../email/templates.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "email", "contoh");
fs.mkdirSync(out, { recursive: true });

const opsi = {
  aset: "../aset/",
  merek: { logo: "../../brand/kit/fusionify-logo-horizontal.png" },
  alasan: "Email ini dikirim karena kamu punya akun di layanan FUSIONIFY.",
};
const produk = {
  aset: "../aset/",
  merek: { nama: "Nama Produk", namaTeks: "Nama Produk", logo: "../../brand/kit/fusionify-mark.png", logoLebar: 40, logoTinggi: 40, produkFusionify: true },
};

const contoh = {
  "kode-verifikasi": T.kodeVerifikasi({ nama: "Budi", kode: "482913", menit: 10 }, opsi),
  "atur-ulang-password": T.aturUlangPassword({ nama: "Budi", url: "https://contoh.fusionify.id/atur-ulang?token=contoh" }, opsi),
  "selamat-datang": T.selamatDatang({ nama: "Budi", url: "https://contoh.fusionify.id/dashboard", langkah: ["Lengkapi profil usaha", "Coba fitur dengan mode sandbox", "Hubungi kami kalau ada yang membingungkan"] }, opsi),
  "pengajuan-disetujui": T.pengajuanDisetujui({ nama: "Toko Budi", url: "https://contoh.fusionify.id/dashboard", langkah: ["Masuk ke dashboard", "Ambil API key di menu Merchant & API key", "Uji dengan kunci sandbox sebelum live"] }, opsi),
  "pengajuan-ditolak": T.pengajuanDitolak({ nama: "Toko Budi", alasanTolak: "Website usaha belum bisa dibuka.", kontakUrl: "https://wa.me/6283111380628" }, opsi),
  "pembayaran-berhasil": T.pembayaranBerhasil({ nama: "Budi", nomor: "INV-001", jumlah: "Rp100.000", waktu: "26 Oktober 2026, 14.05 WIB", url: "https://contoh.fusionify.id/bukti/INV-001" }, produk),
  "pembayaran-gagal": T.pembayaranGagal({ nama: "Budi", nomor: "INV-001", jumlah: "Rp100.000", alasanGagal: "Waktu pembayaran habis.", url: "https://contoh.fusionify.id/bayar/INV-001" }, produk),
  "penarikan-selesai": T.statusPenarikan({ nama: "Toko Budi", status: "selesai", jumlah: "Rp1.500.000", diterima: "Rp1.493.500", bank: "BCA", rekening: "0123451234", atasNama: "Budi Santoso" }, opsi),
  "pemberitahuan": T.pemberitahuan({ nama: "Budi", judul: "Perawatan terjadwal", paragraf: ["Kami akan melakukan perawatan server pada Minggu, 2 November 2026, pukul 01.00 sampai 03.00 WIB.", "Selama itu layanan mungkin tidak bisa diakses sebentar."] }, opsi),
};

for (const [nama, m] of Object.entries(contoh)) {
  fs.writeFileSync(path.join(out, `${nama}.html`), m.html);
  fs.writeFileSync(path.join(out, `${nama}.txt`), `Subjek: ${m.subject}\n\n${m.text}`);
  console.log(`✓ email/contoh/${nama}.html (${(Buffer.byteLength(m.html) / 1024).toFixed(1)} KB)`);
}
