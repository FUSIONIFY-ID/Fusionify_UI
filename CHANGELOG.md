# Changelog

## 1.1.1 · 21 Oktober 2026

- Perbaikan penting: dengan "kurangi gerakan" aktif, konten `data-reveal` dan judul `data-split` dulu tidak tampil. Sekarang langsung tampil.
- Kontras teks terang di atas biru dinaikkan ke minimal 4.5:1 (kicker, lead, kartu biru, angka, langkah, harga unggulan, CTA).
- `.table-wrap` wajib `tabindex="0" role="region" aria-label` supaya bisa digeser pakai keyboard.
- Ditambahkan aturan layar sangat kecil (≤420px, ≤350px) dan scrollbar FUSIONIFY yang sebelumnya ketinggalan dari fusionify.id.
- Cadangan untuk Safari lama (iOS 15 ke bawah): `overflow-x: hidden` sebelum `clip`, `100vh` sebelum `100svh`.

## 1.1.0 · 21 Oktober 2026

- `css/product.css`: form, kartu layanan, daftar fitur, langkah, tabel harga + tab segmen, testimoni, CTA band, catatan, tabel data, tag, keadaan kosong/404, kepala halaman produk.
- `templates/landing-produk.html` dan `templates/404.html`.
- Titik biru di akhir judul (`.dot`) tidak lagi turun sendirian ke baris baru.
- `html { overflow-x: clip }` supaya hiasan besar tidak memicu scroll horizontal.

## 1.0.0 · 21 Oktober 2026

- Rilis pertama, diambil dari fusionify.id: token, base, komponen, `initFusionify()`, `seal()`, snippet head/sprite/body, font, logo (termasuk logo vertikal dan legacy FTV), maskot, badge produk, halaman demo.
- Sudah memuat perbaikan performa fusionify.id: kursor hanya menyentuh DOM saat bergerak, jeda animasi di luar layar, transisi halaman yang menutup layar ultra-lebar tanpa kedipan.
