# Dokumen FUSIONIFY

Template dokumen resmi dengan sistem desain yang sama dengan web FUSIONIFY: warna dan huruf dari `css/tokens.css`, logo dari `brand/`, maskot dari `mascot/`, gaya stiker (garis 2px tinta, bayangan pejal), dan chip status yang sama.

## Pilih format

| Kebutuhan | Pakai | File |
| --- | --- | --- |
| Surat resmi (permohonan, undangan, pemberitahuan) | Word | `office/FUSIONIFY-Surat.docx` |
| | PDF dari HTML | `cetak/surat.html` |
| Invoice / tagihan | PDF dari HTML (total dan terbilang otomatis) | `cetak/invoice.html` |
| | Excel (berformula) | `office/FUSIONIFY-Spreadsheet.xlsx`, sheet Invoice |
| Penawaran harga | PDF dari HTML | `cetak/penawaran.html` |
| Kuitansi (A5) | PDF dari HTML | `cetak/kuitansi.html` |
| Proposal, laporan, company profile, panduan | Word | `office/FUSIONIFY-Dokumen.docx` |
| | PDF dari HTML | `cetak/dokumen.html` |
| Presentasi, pitch deck | PowerPoint | `office/FUSIONIFY-Slide.pptx` |
| | PDF dari HTML | `cetak/slide.html` |
| Anggaran, daftar, pelacak | Excel | `office/FUSIONIFY-Spreadsheet.xlsx` |

Pratinjau semua template HTML ada di `contoh/*.pdf`.

**Word/PowerPoint/Excel** cocok kalau dokumen akan diedit orang lain atau dikirim sebagai file yang bisa diubah. **HTML → PDF** cocok untuk dokumen final yang harus tampil persis sama di mana pun (invoice, penawaran, surat yang dikirim sebagai PDF).

## Aturan

- **Teks bertanda kuning wajib diganti.** Di HTML: `<span class="ganti">`. Di Word: teks berlatar kuning muda. Di Excel: sel berlatar kuning muda adalah isian. Hapus tandanya setelah diganti.
- **Jujur.** Tidak ada angka, harga, testimoni, atau klien karangan. Harga di penawaran dan invoice harus harga asli. Status produk ditulis apa adanya dengan chip `Aktif`, `Beta`, `Dalam pengembangan`, `Direncanakan`, `Layanan berakhir`.
- **Kontak publik** hanya `hello@fusionify.id` dan WhatsApp `+62 831-1138-0628`. Penanda tangan boleh memakai email kerja pribadinya di isi surat bila perlu, bukan di kop.
- **Logo** dari file di `brand/`, jangan mengetik "FUSIONIFY" dengan huruf biasa sebagai pengganti logo.
- **Pajak:** baris pajak di invoice diisi hanya kalau perusahaan sudah PKP. Selain itu biarkan 0 atau hapus.
- **Materai:** kuitansi dan perjanjian bernilai di atas Rp5.000.000 memakai materai Rp10.000.
- **Tanpa em dash (—)** di teks dokumen. Pakai koma, titik dua, atau kalimat baru.
- **Rahasia:** proyek rahasia klien pemerintah dan nama provider pembayaran tidak ditulis di dokumen yang keluar dari perusahaan.

### Penomoran

`{urut}/{kode}/FDS/{bulan romawi}/{tahun}`, contoh `007/SRT/FDS/X/2026`. FDS = Fusionify Digital Store. Nomor urut mulai dari 001 setiap tahun, per kode.

| Kode | Dokumen |
| --- | --- |
| `SRT` | Surat resmi |
| `INV` | Invoice |
| `PNW` | Penawaran harga |
| `KWT` | Kuitansi |
| `PRJ` | Perjanjian / MoU |

## Memakai template HTML → PDF

1. Salin file dari `cetak/` (biarkan di folder yang sama supaya `cetak.css`, `dokumen.js`, dan path logo tetap jalan, atau sesuaikan path `../../`).
2. Ganti semua teks `<span class="ganti">`. Barang di invoice/penawaran: isi `data-qty` dan `data-harga` (angka tanpa titik); jumlah, total, dan terbilang dihitung `dokumen.js`.
3. Cetak:
   - **Paling mudah:** buka file di Chrome → Cetak → Simpan sebagai PDF. Ukuran sesuai template, Margin: Tidak ada, centang Grafis latar belakang.
   - **Otomatis:** `node scripts/build-dokumen.mjs --final berkas.html --keluar hasil.pdf`. Perintah ini menolak mencetak kalau masih ada teks bertanda kuning atau isi yang keluar halaman.

Satu `<section class="halaman">` = satu lembar. Isi tidak pindah halaman sendiri; kalau terlalu panjang, pecah ke section berikutnya.

## Memakai template Office

1. **Pasang huruf** dari `tokens/fonts-ttf/` (Afacad Flux, Sansation, Exo 2, Caveat), klik dua kali file `.ttf` lalu Install. Word sudah menanam hurufnya, tapi PowerPoint dan Excel membutuhkan huruf terpasang supaya tampil sama.
2. Buka template, lalu **Simpan sebagai** file baru (jangan menimpa template).
3. PowerPoint: tambah slide lewat **Beranda → Slide Baru** dan pilih layout `FY Judul`, `FY Bagian`, `FY Isi`, `FY Judul saja`, `FY Angka`, atau `FY Penutup`. Warna di palet "Warna Tema" sudah warna FUSIONIFY.
4. Excel: isi hanya sel kuning muda. Sheet **Panduan** menjelaskan setiap sheet. Baris contoh ditandai di kolom catatan; timpa dengan data asli.

## Membuat ulang template

Template dibuat dari skrip, jadi kalau token berubah tinggal dibuat ulang:

```bash
npm run build:dokumen   # cetak/*.html → contoh/*.pdf
npm run build:office    # office/*.docx, *.pptx, *.xlsx
```

`build:office` butuh `docx` dan `pptxgenjs` (devDependencies), Python 3 dengan `openpyxl`, dan aset PNG di `office/aset/`.
