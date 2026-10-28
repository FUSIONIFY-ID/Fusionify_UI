// FUSIONIFY UI · sumber Ikon FUSIONIFY (satu-satunya tempat menggambar ikon).
// Setelah mengubah file ini jalankan: npm run build:ikon
//
// Aturan gambar (lihat ikon/README.md):
// - Kisi 24 × 24, isi gambar di dalam 2..22 (garis 2px tidak boleh terpotong).
// - Garis 2px, ujung dan sambungan bulat, tanpa isi. Bentuk dasar hanya path (lingkaran/kotak lewat helper di bawah)
//   supaya bisa dipakai apa adanya di web, React, Android, dan Figma.
// - Ciri khas: TITIK I. Satu bulatan biru muda (`t: [x, y, r]`) di tempat yang punya arti: titik huruf i,
//   ujung garis, lampu, notifikasi, lubang label, ujung antena. Ikon utilitas kecil (tutup, tambah, chevron) tanpa titik.
// - Tidak meniru set ikon lain. Logo sosmed TIDAK digambar di sini: diambil dari paket simple-icons (lihat build-ikon.mjs).

const n = (v) => +v.toFixed(2);
/** Lingkaran sebagai path */
export const c = (cx, cy, r) => `M${n(cx - r)} ${n(cy)}a${r} ${r} 0 1 0 ${n(2 * r)} 0a${r} ${r} 0 1 0 ${n(-2 * r)} 0z`;
/** Kotak bersudut bulat sebagai path */
export const k = (x, y, w, h, r = 2) =>
  `M${n(x + r)} ${y}h${n(w - 2 * r)}a${r} ${r} 0 0 1 ${r} ${r}v${n(h - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${r}h${n(-(w - 2 * r))}a${r} ${r} 0 0 1 ${-r} ${-r}v${n(-(h - 2 * r))}a${r} ${r} 0 0 1 ${r} ${-r}z`;
/** Bintang lima sudut */
const bintang = (cx, cy, R, r) => {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r : R;
    d += (i ? "L" : "M") + n(cx + rr * Math.cos(a)) + " " + n(cy + rr * Math.sin(a));
  }
  return d + "z";
};
/** Segel 12 lekukan FUSIONIFY, digambar ulang halus (bukan salinan path 100x100) */
export const segel = (cx, cy, R, amp = 0.09) => {
  let d = "";
  const N = 96;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2, rr = R * (1 + amp * Math.cos(12 * a));
    d += (i ? "L" : "M") + n(cx + rr * Math.cos(a)) + " " + n(cy + rr * Math.sin(a));
  }
  return d + "z";
};

/**
 * Daftar ikon. nama: { kat, d: [path…], t?: [x, y, r] (titik i), kata?: "kata kunci pencarian" }
 * Kategori: navigasi, aksi, status, komunikasi, dasbor, data, tema, khas
 */
export const IKON = {
  // ---------- Navigasi ----------
  beranda: { kat: "navigasi", kata: "home rumah awal", d: ["M3 11 12 3.5l9 7.5", "M5 9.5V20a1 1 0 0 0 1 1h3.5v-5.5h5V21H18a1 1 0 0 0 1-1V9.5"], t: [12, 10.6, 1.6] },
  menu: { kat: "navigasi", kata: "hamburger daftar", d: ["M4 6.5h16", "M4 12h16", "M4 17.5h10"], t: [19.2, 17.5, 1.6] },
  perbesar: { kat: "navigasi", kata: "zoom in perbesar tambah", d: [c(10.5, 10.5, 6.5), "M15.4 15.4l2.6 2.6", "M10.5 8v5", "M8 10.5h5"], t: [20, 20, 1.5] },
  perkecil: { kat: "navigasi", kata: "zoom out perkecil kurang", d: [c(10.5, 10.5, 6.5), "M15.4 15.4l2.6 2.6", "M8 10.5h5"], t: [20, 20, 1.5] },
  cari: { kat: "navigasi", kata: "search temukan", d: [c(10.5, 10.5, 6.5), "M15.4 15.4 20 20"], t: [8.4, 8.4, 1.4] },
  kembali: { kat: "navigasi", kata: "back panah kiri", d: ["M16.5 12H5", "M10.5 6C9.4 8.6 7.6 10.6 5 12c2.6 1.4 4.4 3.4 5.5 6"], t: [20.2, 12, 1.6] },
  maju: { kat: "navigasi", kata: "next panah kanan lanjut", d: ["M7.5 12H19", "M13.5 6c1.1 2.6 2.9 4.6 5.5 6-2.6 1.4-4.4 3.4-5.5 6"], t: [3.8, 12, 1.6] },
  naik: { kat: "navigasi", kata: "up panah atas", d: ["M12 16.5V5", "M6 10.5C8.6 9.4 10.6 7.6 12 5c1.4 2.6 3.4 4.4 6 5.5"], t: [12, 20.2, 1.6] },
  turun: { kat: "navigasi", kata: "down panah bawah", d: ["M12 7.5V19", "M6 13.5c2.6 1.1 4.6 2.9 6 5.5 1.4-2.6 3.4-4.4 6-5.5"], t: [12, 3.8, 1.6] },
  "chevron-bawah": { kat: "navigasi", kata: "buka dropdown", d: ["M6 9.5 12 15.5l6-6"] },
  "chevron-kanan": { kat: "navigasi", kata: "lanjut detail", d: ["M9.5 6 15.5 12l-6 6"] },
  "chevron-kiri": { kat: "navigasi", kata: "sebelumnya", d: ["M14.5 6 8.5 12l6 6"] },
  tutup: { kat: "navigasi", kata: "close silang x", d: ["M6 6l12 12", "M18 6 6 18"] },
  "tautan-luar": { kat: "navigasi", kata: "external buka tab baru", d: ["M14 3.5h6.5V10", "M20.5 3.5 11 13", "M18 14v4.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2H10"], t: [7.6, 16.4, 1.5] },
  jelajah: { kat: "navigasi", kata: "explore kompas temukan", d: [segel(12, 12, 8.8, 0.08), "M15.4 8.6 13.5 13.5 8.6 15.4 10.5 10.5z"], t: [12, 12, 1.1] },
  lainnya: { kat: "navigasi", kata: "more opsi titik tiga", d: [c(5, 12, 1), c(12, 12, 1)], t: [19, 12, 2] },

  // ---------- Aksi ----------
  tambah: { kat: "aksi", kata: "plus baru add", d: ["M12 5v14", "M5 12h14"] },
  kurang: { kat: "aksi", kata: "minus", d: ["M5 12h14"] },
  edit: { kat: "aksi", kata: "ubah pensil tulis", d: ["M4 20h4L18.6 9.4a2.8 2.8 0 0 0-4-4L4 16z", "M13.2 6.8l4 4"], t: [19.6, 19.6, 1.6] },
  hapus: { kat: "aksi", kata: "delete buang sampah", d: ["M4 7h16", "M9.5 3.5h5", "M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13", "M10 11v5.5", "M14 11v5.5"] },
  salin: { kat: "aksi", kata: "copy duplikat", d: [k(8.5, 8.5, 12, 12, 2.5), "M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"], t: [14.5, 14.5, 1.6] },
  unduh: { kat: "aksi", kata: "download simpan", d: ["M12 3.5v11", "M7 10c1.9.9 3.6 2.4 5 4.5 1.4-2.1 3.1-3.6 5-4.5", "M4 20h12"], t: [19.6, 20, 1.6] },
  unggah: { kat: "aksi", kata: "upload kirim berkas", d: ["M12 15V4", "M7 8.5C8.9 7.6 10.6 6.1 12 4c1.4 2.1 3.1 3.6 5 4.5", "M4 20h12"], t: [19.6, 20, 1.6] },
  bagikan: { kat: "aksi", kata: "share sebar", d: [c(18, 5.5, 2.5), c(6, 12, 2.5), "M8.2 10.8l7.6-4.1", "M8.2 13.2l7.6 4.1"], t: [18, 18.5, 2.5] },
  simpan: { kat: "aksi", kata: "bookmark tandai", d: ["M6.5 3.5h11a1 1 0 0 1 1 1V21l-6.5-4.5L5.5 21V4.5a1 1 0 0 1 1-1z"], t: [12, 9.5, 1.6] },
  arsip: { kat: "aksi", kata: "archive simpan kotak", d: [k(3, 4, 18, 5, 1.5), "M5 9v9.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9", "M9.5 13.5h3"], t: [15.2, 13.5, 1.3] },
  rotasi: { kat: "aksi", kata: "rotate putar gambar foto", d: ["M19.5 12a7.5 7.5 0 1 1-2.2-5.3", "M19.5 3.5v4h-4"], t: [12, 12, 1.5] },
  atur: { kat: "aksi", kata: "slider filter penyesuaian", d: ["M4 7h9.5", "M19.5 7H20", c(16.5, 7, 2.5), "M4 17h.5", "M10.5 17H20", c(7.5, 17, 2.5)], t: [16.5, 7, 1.2] },
  filter: { kat: "aksi", kata: "saring corong", d: ["M3.5 5h17l-6.5 7.5V19l-4 2v-8.5z"] },
  urut: { kat: "aksi", kata: "sort urutkan", d: ["M7 16.5V4.5", "M3.5 8C5 7.3 6.2 6.1 7 4.5 7.8 6.1 9 7.3 10.5 8", "M17 7.5v12", "M13.5 16c1.5.7 2.7 1.9 3.5 3.5.8-1.6 2-2.8 3.5-3.5"], t: [7, 20.2, 1.4] },
  segarkan: { kat: "aksi", kata: "refresh muat ulang sinkron", d: ["M20 11a8 8 0 0 0-14.6-4.4", "M4.5 3.5v4h4", "M4 13a8 8 0 0 0 14.6 4.4", "M19.5 20.5v-4h-4"], t: [12, 12, 1.6] },
  setelan: { kat: "aksi", kata: "settings pengaturan gear", d: [segel(12, 12, 8.4, 0.11), c(12, 12, 3.2)], t: [12, 12, 1.2] },
  keluar: { kat: "aksi", kata: "logout sign out", d: ["M9.5 20.5H6A2.5 2.5 0 0 1 3.5 18V6A2.5 2.5 0 0 1 6 3.5h3.5", "M15 16.5l4.5-4.5L15 7.5", "M19.5 12H10"] },
  masuk: { kat: "aksi", kata: "login sign in", d: ["M14.5 3.5H18A2.5 2.5 0 0 1 20.5 6v12a2.5 2.5 0 0 1-2.5 2.5h-3.5", "M10 16.5l4.5-4.5L10 7.5", "M14.5 12H4"] },

  // ---------- Status ----------
  dibaca: { kat: "status", kata: "read terbaca centang dua", d: ["M2.5 12.8l3.6 3.7L13 8.5", "M11.5 15.6l1 .9L20 8"] },
  cek: { kat: "status", kata: "check centang berhasil", d: ["M5 12.5l4.5 4.5L19 7.5"] },
  berhasil: { kat: "status", kata: "sukses centang lingkaran ok", d: [segel(12, 12, 8.8, 0.08), "M8.2 12.4l2.6 2.6 5-5.4"] },
  info: { kat: "status", kata: "informasi i", d: [segel(12, 12, 8.8, 0.08), "M12 11v5.5"], t: [12, 7.7, 1.5] },
  peringatan: { kat: "status", kata: "warning awas segitiga", d: ["M10.3 4.2a2 2 0 0 1 3.4 0l7.3 12.6a2 2 0 0 1-1.7 3H4.7a2 2 0 0 1-1.7-3z", "M12 9.5v4"], t: [12, 16.6, 1.4] },
  galat: { kat: "status", kata: "error gagal silang", d: [segel(12, 12, 8.8, 0.08), "M9.2 9.2l5.6 5.6", "M14.8 9.2l-5.6 5.6"] },
  bantuan: { kat: "status", kata: "help tanya faq", d: [segel(12, 12, 8.8, 0.08), "M9.4 9.6a2.7 2.7 0 1 1 3.9 2.4c-.8.4-1.3 1.1-1.3 2V14.4"], t: [12, 17.4, 1.4] },
  kunci: { kat: "status", kata: "lock aman privat", d: [k(4.5, 10, 15, 11, 2.5), "M8 10V7a4 4 0 0 1 8 0v3"], t: [12, 15.5, 1.7] },
  "buka-kunci": { kat: "status", kata: "unlock terbuka", d: [k(4.5, 10, 15, 11, 2.5), "M8 10V7a4 4 0 0 1 7.8-1.2"], t: [12, 15.5, 1.7] },
  lihat: { kat: "status", kata: "mata tampil eye", d: ["M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z", c(12, 12, 3.2)], t: [12, 12, 1.4] },
  sembunyi: { kat: "status", kata: "mata tutup hide", d: ["M3.5 3.5l17 17", "M10.6 5.1Q11.3 5 12 5c6 0 9.5 7 9.5 7a17 17 0 0 1-2.5 3.3", "M6.6 6.6A16 16 0 0 0 2.5 12s3.5 7 9.5 7a9.6 9.6 0 0 0 5.3-1.6", "M10 10a3 3 0 0 0 4 4"] },
  jam: { kat: "status", kata: "waktu clock riwayat", d: [segel(12, 12, 8.8, 0.08), "M12 12V7.6", "M12 12l3.4 2.2"], t: [12, 12, 1.4] },
  kalender: { kat: "status", kata: "tanggal jadwal date", d: [k(3.5, 5, 17, 16, 2.5), "M3.5 10h17", "M8 3v4", "M16 3v4"], t: [15.5, 15.5, 1.7] },
  lonceng: { kat: "status", kata: "notifikasi bell pemberitahuan", d: ["M6 16.5V11a6 6 0 0 1 9.2-5.1", "M18 11v5.5l1.5 2h-15L6 16.5", "M10 21h4"], t: [18.5, 6, 2] },
  bintang: { kat: "status", kata: "favorit star rating", d: [bintang(12, 12.6, 9, 4)] },
  suka: { kat: "status", kata: "hati like love", d: ["M12 20s-8-4.6-8-10.4A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.6C20 15.4 12 20 12 20z"] },

  // ---------- Komunikasi ----------
  email: { kat: "komunikasi", kata: "surel mail amplop", d: [k(3, 5, 18, 14, 3.5), "M4 8.5c3.2 2.6 5.6 4 8 4s4.8-1.4 8-4"], t: [12, 16, 1.3] },
  pesan: { kat: "komunikasi", kata: "chat obrolan balon", d: ["M5 4.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z", "M8 11h.01", "M12 11h.01"], t: [16, 11, 1.2] },
  telepon: { kat: "komunikasi", kata: "phone hp telpon", d: ["M5 3.5h3.5l2 5L8 10a11 11 0 0 0 6 6l1.5-2.5 5 2V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2"], t: [18.4, 5.6, 1.6] },
  kirim: { kat: "komunikasi", kata: "send pesawat kertas", d: ["M20.5 3.5 10 14", "M20.5 3.5 14 20.5l-4-6.5-6.5-4z"] },
  lokasi: { kat: "komunikasi", kata: "alamat pin peta map", d: ["M12 21s-7-6-7-11.5a7 7 0 0 1 14 0C19 15 12 21 12 21z"], t: [12, 9.5, 2.3] },
  web: { kat: "komunikasi", kata: "globe internet situs bahasa", d: [c(12, 12, 9), "M3 12h18", "M12 3a14 14 0 0 1 0 18", "M12 3a14 14 0 0 0 0 18"] },
  lampiran: { kat: "komunikasi", kata: "attach klip lampirkan file", d: ["M16 8.5v8a4 4 0 0 1-8 0V6.5a2.5 2.5 0 0 1 5 0v9.5a1 1 0 0 1-2 0V8.5"] },
  tautan: { kat: "komunikasi", kata: "link url sambungan", d: ["M9.5 8H7a4 4 0 0 0 0 8h2.5", "M14.5 8H17a4 4 0 0 1 0 8h-2.5"], t: [12, 12, 1.6] },
  "tanda-tangan": { kat: "komunikasi", kata: "signature paraf", d: ["M3.5 17c2.5 0 3.5-9 6-9 2 0 0 7 2.5 7 1.6 0 2-3 3.5-3 1 0 1.4 1.5 2.5 1.5", "M3.5 20.5h12"], t: [19.6, 20.5, 1.5] },

  // ---------- Dasbor ----------
  dasbor: { kat: "dasbor", kata: "dashboard ringkasan grid", d: [k(3.5, 3.5, 7, 9, 2), k(13.5, 3.5, 7, 5, 2), k(13.5, 11.5, 7, 9, 2), k(3.5, 15.5, 7, 5, 2)] },
  "grafik-batang": { kat: "dasbor", kata: "chart bar statistik", d: ["M6.5 16v-5", "M11.5 16V6", "M16.5 16V9", "M3.5 20h12.5"], t: [19.6, 20, 1.6] },
  "grafik-tren": { kat: "dasbor", kata: "chart line naik pertumbuhan", d: ["M3.5 16.5l5-5 4 3 6-6.5", "M3.5 20.5h17"], t: [20, 6.4, 1.8] },
  "grafik-donat": { kat: "dasbor", kata: "pie porsi persen", d: ["M11 4a8.5 8.5 0 1 0 9 9h-9z", "M14.5 3.3A8.5 8.5 0 0 1 20.7 9.5h-6.2z"] },
  aktivitas: { kat: "dasbor", kata: "pulse detak monitor", d: ["M3 12h3.5l3-7 4.5 14 3-7H21"] },
  dompet: { kat: "dasbor", kata: "wallet saldo", d: ["M18.5 7V5.5a1.5 1.5 0 0 0-1.5-1.5H5.5a2 2 0 0 0 0 4H19a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 19 21H5.5A2 2 0 0 1 3.5 19V6", "M20.5 12H16a2 2 0 0 0 0 4h4.5"], t: [16.2, 14, 1.2] },
  kartu: { kat: "dasbor", kata: "card pembayaran debit kredit", d: [k(2.5, 5, 19, 14, 2.5), "M2.5 10h19", "M6 15h4"], t: [17, 15, 1.5] },
  uang: { kat: "dasbor", kata: "rupiah tunai cash", d: [k(2.5, 6, 19, 12, 2.5), c(12, 12, 3), "M6 9.5v.01", "M18 14.5v.01"], t: [12, 12, 1.3] },
  qr: { kat: "dasbor", kata: "qris scan pindai bayar", d: ["M3.5 8V5.5a2 2 0 0 1 2-2H8", "M16 3.5h2.5a2 2 0 0 1 2 2V8", "M20.5 16v2.5a2 2 0 0 1-2 2H16", "M8 20.5H5.5a2 2 0 0 1-2-2V16", k(7.5, 7.5, 3.5, 3.5, 1), k(13, 7.5, 3.5, 3.5, 1), k(7.5, 13, 3.5, 3.5, 1)], t: [14.8, 14.8, 1.6] },
  struk: { kat: "dasbor", kata: "invoice nota tagihan receipt", d: ["M5.5 3.5h13V21l-2.6-1.5L13.3 21 12 20.2 10.7 21l-2.6-1.5L5.5 21z", "M9 8h6", "M9 12h6", "M9 16h2.5"], t: [14.6, 16, 1.4] },
  keranjang: { kat: "dasbor", kata: "cart belanja pesanan", d: ["M3 4h2.4l2.3 11h10.8l2-8H6.5", c(9, 19.5, 1.5)], t: [17, 19.5, 1.7] },
  toko: { kat: "dasbor", kata: "store merchant warung", d: ["M4.5 9l1.5-5h12l1.5 5", "M4.5 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0", "M5.5 12.2V20h13v-7.8", "M10 20v-4.5h4V20"] },
  paket: { kat: "dasbor", kata: "box produk kiriman", d: ["M12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z", "M3.5 7.5 12 12l8.5-4.5", "M12 12v9", "M7.8 5.3l8.4 4.5"] },
  truk: { kat: "dasbor", kata: "pengiriman kurir logistik", d: ["M2.5 6h11v10h-11z", "M13.5 9.5h4l3.5 3.5v3h-7.5", c(7, 18, 2), c(17, 18, 2)] },
  gudang: { kat: "dasbor", kata: "warehouse stok inventaris", d: ["M3 20.5V9l9-5 9 5v11.5", "M7 20.5V13h10v7.5", "M7 16.8h10"] },
  pengguna: { kat: "dasbor", kata: "user akun profil orang", d: [c(12, 8, 4), "M4.5 20.5a7.5 7.5 0 0 1 15 0"] },
  tim: { kat: "dasbor", kata: "grup pengguna users", d: [c(9, 8, 3.5), "M2.5 20a6.5 6.5 0 0 1 13 0", "M16 4.6a3.5 3.5 0 0 1 0 6.8", "M18 13.8a6.5 6.5 0 0 1 3.5 6.2"] },
  tiket: { kat: "dasbor", kata: "acara event ticket kupon", d: ["M3.5 7a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v3a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-3a2 2 0 0 0 0-4z", "M15 6v1.5", "M15 11.25v1.5", "M15 16.5V18"], t: [9, 12, 1.6] },
  label: { kat: "dasbor", kata: "tag kategori harga", d: ["M3.5 11.5V4.5a1 1 0 0 1 1-1h7l9 9-8.5 8.5z"], t: [8, 8, 1.6] },
  laporan: { kat: "dasbor", kata: "report papan klip", d: [k(5, 4.5, 14, 16.5, 2.5), "M9 3h6v3H9z", "M8.5 11h7", "M8.5 15h4"], t: [15.6, 15, 1.4] },

  // ---------- Data dan teknis ----------
  folder: { kat: "data", kata: "map direktori", d: ["M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"] },
  dokumen: { kat: "data", kata: "file berkas halaman", d: ["M19 14.5V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5z", "M19 14.5h-3.5a1.5 1.5 0 0 0-1.5 1.5v5", "M8.5 8h7", "M8.5 11.5h3.5"], t: [15.2, 11.5, 1.3] },
  gambar: { kat: "data", kata: "foto image galeri", d: [k(3, 4, 18, 16, 2.5), "M3.5 17l5-5 4 4 2.5-2.5 5.5 5.5"], t: [15.5, 9, 1.8] },
  kode: { kat: "data", kata: "code developer api", d: ["M8 7l-5 5 5 5", "M16 7l5 5-5 5", "M13.5 5l-3 14"] },
  server: { kat: "data", kata: "hosting vps mesin", d: [k(3, 3.5, 18, 7.5, 2.5), k(3, 13, 18, 7.5, 2.5), "M7 16.75h.01", "M11 7.25h6", "M11 16.75h6"], t: [7, 7.25, 1.3] },
  database: { kat: "data", kata: "basis data db penyimpanan", d: ["M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z", "M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6", "M4 12.5c1.3.8 2.7 1.1 4 .7s2.7-1.1 4-.7 2.7 1.1 4 .7 2.7-.7 4-.4"], t: [12, 6, 1.3] },
  awan: { kat: "data", kata: "cloud hosting", d: ["M6.5 19a4.5 4.5 0 0 1-.6-9 6.5 6.5 0 0 1 12.4 1.6A3.75 3.75 0 0 1 17.5 19z"] },
  "kunci-api": { kat: "data", kata: "key token akses", d: [c(8, 15.5, 4.5), "M11.2 12.3 19.5 4", "M16 7.5l2.5 2.5", "M13.8 9.7l2 2"], t: [8, 15.5, 1.5] },
  perisai: { kat: "data", kata: "keamanan shield proteksi", d: ["M12 3l8 3v6c0 4.6-3.4 8.3-8 9-4.6-.7-8-4.4-8-9V6z", "M9 12l2.2 2.2L15.5 10"] },
  vpn: { kat: "data", kata: "tunnel aman koneksi", d: ["M12 3l8 3v6c0 4.6-3.4 8.3-8 9-4.6-.7-8-4.4-8-9V6z", "M8.5 16a3.5 3.5 0 0 1 7 0"], t: [12, 10, 1.8] },
  bot: { kat: "data", kata: "robot otomatis telegram ai", d: [k(4, 8, 16, 12, 3.5), "M12 8V5.6", "M9 13.2v1.6", "M15 13.2v1.6", "M2.5 13v3", "M21.5 13v3"], t: [12, 3.6, 1.7] },
  ide: { kat: "data", kata: "lampu bohlam inspirasi", d: ["M9 18h6", "M10 21h4", "M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1V16h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"], t: [12, 9, 1.6] },

  // ---------- Tema dan media ----------
  terang: { kat: "tema", kata: "matahari light siang", d: [segel(12, 12, 5.4, 0.14), "M12 2.6h.01", "M21.4 12h.01", "M12 21.4h.01", "M2.6 12h.01", "M5.4 5.4h.01", "M18.6 18.6h.01", "M5.4 18.6h.01"], t: [18.6, 5.4, 1.3] },
  gelap: { kat: "tema", kata: "bulan dark malam", d: ["M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"], t: [17.5, 5.5, 1.4] },
  suara: { kat: "tema", kata: "volume speaker audio", d: ["M4 9v6h4l5 4V5L8 9H4z", "M16.5 9.5a3.5 3.5 0 0 1 0 5", "M19 7a7 7 0 0 1 0 10"] },
  senyap: { kat: "tema", kata: "mute bisu", d: ["M4 9v6h4l5 4V5L8 9H4z", "M17 9.5l4 5", "M21 9.5l-4 5"] },
  putar: { kat: "tema", kata: "play mulai video", d: ["M7 5v14a1 1 0 0 0 1.5.9l11-7a1 1 0 0 0 0-1.8l-11-7A1 1 0 0 0 7 5z"] },
  jeda: { kat: "tema", kata: "pause berhenti", d: ["M8.5 5v14", "M15.5 5v14"] },
  kamera: { kat: "tema", kata: "foto camera", d: ["M3 8.5a2 2 0 0 1 2-2h2.5L9 4.5h6l1.5 2H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", c(12, 13, 3.8)], t: [17.8, 9.2, 1.1] },

  // ---------- Tambahan 1.12 (kebutuhan web produk) ----------
  memuat: { kat: "status", kata: "loading loader proses tunggu", d: ["M12 3.5a8.5 8.5 0 1 0 8.5 8.5"], t: [17.6, 6.2, 1.5] },
  awas: { kat: "status", kata: "alert error tanda seru perhatian", d: [segel(12, 12, 8.8, 0.08), "M12 7.6v5.2"], t: [12, 16.4, 1.4] },
  larang: { kat: "status", kata: "ban blokir dilarang nonaktif", d: [segel(12, 12, 8.8, 0.08), "M7.3 7.3l9.4 9.4"] },
  bulat: { kat: "status", kata: "circle radio titik pilihan", d: [segel(12, 12, 7.6, 0.07)] },
  "chevron-atas": { kat: "navigasi", kata: "tutup lipat ke atas", d: ["M6 14.5 12 8.5l6 6"] },
  "layar-penuh": { kat: "navigasi", kata: "maximize perbesar penuh fullscreen", d: ["M4 9V4.5a.5.5 0 0 1 .5-.5H9", "M15 4h4.5a.5.5 0 0 1 .5.5V9", "M20 15v4.5a.5.5 0 0 1-.5.5H15", "M9 20H4.5a.5.5 0 0 1-.5-.5V15"], t: [12, 12, 1.6] },
  pegangan: { kat: "navigasi", kata: "grip drag seret geser", d: ["M9.5 5h.01", "M14.5 5h.01", "M9.5 12h.01", "M14.5 12h.01", "M9.5 19h.01"], t: [14.5, 19, 1.3] },
  tukar: { kat: "aksi", kata: "swap pindah transfer bolak balik", d: ["M5 8h13", "M14.5 4.5c.9 1.6 2 2.7 3.5 3.5-1.5.8-2.6 1.9-3.5 3.5", "M19 16H6", "M9.5 12.5c-.9 1.6-2 2.7-3.5 3.5 1.5.8 2.6 1.9 3.5 3.5"] },
  berhenti: { kat: "tema", kata: "stop hentikan", d: [k(6, 6, 12, 12, 2.5)] },
  "tambah-pengguna": { kat: "dasbor", kata: "user plus undang anggota", d: [c(10, 8, 3.8), "M3.5 20.5a6.5 6.5 0 0 1 11.2-4.5", "M18.5 13v6", "M15.5 16h6"] },
  kerja: { kat: "dasbor", kata: "briefcase bisnis tas kantor", d: [k(3, 7, 18, 13, 2.5), "M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7", "M3 12.5h7", "M14 12.5h7"], t: [12, 12.5, 1.5] },
  target: { kat: "dasbor", kata: "sasaran tujuan goal", d: [segel(12, 12, 8.8, 0.08), c(12, 12, 4.6)], t: [12, 12, 1.7] },
  pengumuman: { kat: "komunikasi", kata: "megaphone broadcast siaran promosi", d: ["M3.5 10v4a1 1 0 0 0 1 1H7l7 4.5v-15L7 9H4.5a1 1 0 0 0-1 1z", "M7 15l1.2 5h2.3"], t: [19, 12, 1.7] },
  kutipan: { kat: "komunikasi", kata: "quote testimoni kutip", d: ["M5 17c2.5-1 3.5-3 3.5-5.5V7.5h-4v4h4", "M14 17c2.5-1 3.5-3 3.5-5.5V7.5h-4v4h4"] },
  "kotak-masuk": { kat: "komunikasi", kata: "inbox pesan masuk", d: ["M3.5 13.5l2.6-7.3A2 2 0 0 1 8 5h8a2 2 0 0 1 1.9 1.2l2.6 7.3", "M3.5 13.5V18a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-4.5h-5l-1.5 2.5h-4l-1.5-2.5z"] },
  ponsel: { kat: "komunikasi", kata: "hp smartphone tablet perangkat mobile", d: [k(6.5, 2.5, 11, 19, 2.5), "M10.5 5.5h3"], t: [12, 18, 1.3] },
  layar: { kat: "data", kata: "monitor desktop komputer perangkat", d: [k(2.5, 3.5, 19, 13, 2.5), "M8.5 20.5h7", "M12 16.5v4"], t: [17.4, 12.6, 1.2] },
  terminal: { kat: "data", kata: "console cli perintah shell", d: [k(2.5, 4, 19, 16, 2.5), "M6.5 9.5l3 2.5-3 2.5", "M11.5 15h3"], t: [17.4, 15, 1.3] },
  prosesor: { kat: "data", kata: "cpu chip processor", d: [k(6, 6, 12, 12, 2.5), "M9.5 3v3", "M14.5 3v3", "M9.5 18v3", "M14.5 18v3", "M3 9.5h3", "M3 14.5h3", "M18 9.5h3", "M18 14.5h3"], t: [12, 12, 2] },
  memori: { kat: "data", kata: "ram memory memori", d: [k(2.5, 7, 19, 9, 2), "M6.5 10v3", "M10 10v3", "M13.5 10v3", "M5.5 16v2.5", "M18.5 16v2.5"], t: [17.6, 11.5, 1.3] },
  penyimpanan: { kat: "data", kata: "disk hard drive storage ssd", d: [k(3, 13, 18, 7, 2.5), "M5.5 13l2.2-6.6A2 2 0 0 1 9.6 5h4.8a2 2 0 0 1 1.9 1.4L18.5 13", "M7 16.5h4"], t: [17, 16.5, 1.3] },
  sinyal: { kat: "data", kata: "wifi online koneksi internet", d: ["M4 10.5a11.5 11.5 0 0 1 16 0", "M7.6 14.2a6.5 6.5 0 0 1 8.8 0"], t: [12, 18.3, 1.9] },
  "sinyal-putus": { kat: "data", kata: "wifi off offline terputus", d: ["M4 10.5a11.5 11.5 0 0 1 16 0", "M7.6 14.2a6.5 6.5 0 0 1 8.8 0", "M3.5 3.5l17 17"], t: [12, 18.3, 1.9] },
  petir: { kat: "data", kata: "zap kilat cepat instan energi", d: ["M13.5 3 6 13h5.5L10 21l8-10.5h-5.5z"] },
  uji: { kat: "data", kata: "flask lab eksperimen percobaan", d: ["M9.5 3h5", "M10.5 3v6L4.8 18.3A1.8 1.8 0 0 0 6.4 21h11.2a1.8 1.8 0 0 0 1.6-2.7L13.5 9V3", "M7 14.5h10"], t: [12, 17.6, 1.4] },
  perbaiki: { kat: "aksi", kata: "wrench servis perawatan alat", d: ["M15 3.5a5 5 0 0 0-4.7 6.7L4 16.5A2.1 2.1 0 0 0 7 19.5l6.3-6.3A5 5 0 0 0 20 8.5l-3.3 1.2-2.4-2.4L15.5 4"] },
  cetak: { kat: "aksi", kata: "print printer", d: ["M7 8.5V3.5h10v5", k(3, 8.5, 18, 8.5, 2.5), "M7 14h10v6.5H7z"], t: [16, 11.5, 1.2] },
  kilau: { kat: "aksi", kata: "sparkles ai otomatis ajaib", d: ["M11 3.5c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z", "M18.5 15.5v4", "M16.5 17.5h4"], t: [19, 4.5, 1.5] },
  tebal: { kat: "aksi", kata: "bold huruf tebal editor", d: ["M7 4.5h5.5a3.75 3.75 0 0 1 0 7.5H7z", "M7 12h6.5a4 4 0 0 1 0 8H7z"] },
  miring: { kat: "aksi", kata: "italic huruf miring editor", d: ["M10 4.5h8", "M6 19.5h8", "M14.5 4.5l-5 15"] },
  coret: { kat: "aksi", kata: "strikethrough coret editor", d: ["M16.5 6.5c-.8-1.3-2.5-2-4.4-2-2.6 0-4.4 1.4-4.4 3.4 0 1.5 1 2.4 2.6 3.1", "M4 12h16", "M14.3 14c1.2.6 2 1.5 2 2.9 0 2-1.9 3.5-4.5 3.5-2 0-3.8-.9-4.6-2.4"] },
  daftar: { kat: "aksi", kata: "list poin bullet editor", d: ["M4.5 6.5h.01", "M4.5 17.5h.01", "M9 6.5h11", "M9 12h11", "M9 17.5h11"], t: [4.5, 12, 1.4] },
  "daftar-angka": { kat: "aksi", kata: "ordered list nomor urut editor", d: ["M3.5 4.5h1.5v5", "M3.5 9.5h3", "M3.5 14.5c.4-.6 1-1 1.7-1 .9 0 1.6.6 1.6 1.4 0 1.3-3.3 2.6-3.3 4.1h3.3", "M10.5 6.5h10", "M10.5 12h10", "M10.5 17.5h10"] },

  // ---------- Khas FUSIONIFY ----------
  segel: { kat: "khas", kata: "fusionify logo lencana badge", d: [segel(12, 12, 8.6, 0.1)], t: [12, 12, 2] },
  "titik-i": { kat: "khas", kata: "fusionify i huruf", d: ["M12 10.5v9"], t: [12, 5.2, 2.2] },
  fusi: { kat: "khas", kata: "fuse ideas gabung kolaborasi", d: [c(9, 12, 5.8), c(15, 12, 5.8)], t: [12, 12, 1.6] },
  progres: { kat: "khas", kata: "build progress tangga naik tumbuh", d: ["M3.5 20.5h4.5V16h4.5v-4.5h4.5V7"], t: [17, 3.8, 1.8] },
  maskot: { kat: "khas", kata: "kepala karakter fusionify", d: [c(12, 13.5, 7.5), "M4.8 11.6c2.8 0 4.8-1.4 5.8-3.6 1 2.2 4 3.6 8.6 3.6", "M12 6c-.7-1.5-.1-2.8 1.4-3.3", "M9.4 14.4v1.2", "M14.6 14.4v1.2"], t: [15.2, 2.9, 1.3] },
};

/** Logo sosmed: diambil dari paket simple-icons (CC0). Merek dagang milik pemiliknya masing-masing. */
export const SOSMED = {
  instagram: "siInstagram", tiktok: "siTiktok", whatsapp: "siWhatsapp", telegram: "siTelegram", x: "siX",
  youtube: "siYoutube", linkedin: "siLinkedin", facebook: "siFacebook", threads: "siThreads",
  github: "siGithub", discord: "siDiscord", shopee: "siShopee", "google-play": "siGoogleplay",
};

export const KATEGORI = { navigasi: "Navigasi", aksi: "Aksi", status: "Status", komunikasi: "Komunikasi", dasbor: "Dasbor", data: "Data dan teknis", tema: "Tema dan media", khas: "Khas FUSIONIFY", sosmed: "Media sosial" };
