# Changelog

## 1.12.0 · 28 Oktober 2026

- **33 ikon baru** untuk kebutuhan web produk dan panel admin (total 136):
  - status: `memuat`, `awas`, `larang`, `bulat`
  - navigasi: `chevron-atas`, `layar-penuh`, `pegangan`
  - aksi: `tukar`, `perbaiki`, `cetak`, `kilau`
  - editor teks: `tebal`, `miring`, `coret`, `daftar`, `daftar-angka`
  - media: `berhenti`
  - dasbor: `tambah-pengguna`, `kerja`, `target`
  - komunikasi: `pengumuman`, `kutipan`, `kotak-masuk`, `ponsel`
  - data: `layar`, `terminal`, `prosesor`, `memori`, `penyimpanan`, `sinyal`, `sinyal-putus`, `petir`, `uji`
- Semua digambar sendiri dan lolos `npm run cek:ikon` (tanpa path identik, kemiripan tertinggi tetap di bawah 85%).

## 1.11.1 · 28 Oktober 2026

- Ikon terakhir yang masih digambar manual di `controls.js` ikut diganti Ikon FUSIONIFY: tombol perkecil, perbesar, dan putar di pemotong foto profil, serta panah urut di judul kolom tabel.
- Ikon baru: `perbesar`, `perkecil`, `rotasi`. Total 103 ikon, semua lolos `npm run cek:ikon`.
- `js/ikon-inline.js` menambah `isi(nama)` dan `svgIkon(isi, kelas)` untuk ikon gabungan (mis. dua ikon yang bergantian tampil seperti panah urut).

## 1.11.0 · 27 Oktober 2026

- **Template kit kini memakai Ikon FUSIONIFY.** 262 ikon SVG yang dulu ditulis manual di 22 template dan demo diganti `<svg class="ikon"><use href="#ikon-…"/></svg>`, jadi kit tidak lagi melanggar aturannya sendiri. Yang sengaja tetap inline: ikon menu dan speaker di nav (bagiannya dianimasikan) dan logo Google.
- Ikon baru: `jelajah`, `arsip`, `dibaca` (centang dua untuk pesan terbaca), `lampiran`, `tautan`. Total 100 ikon. Semua lolos `npm run cek:ikon`.
- `npm run build:ikon` sekarang juga mengisi **sprite per halaman** di setiap template dan demo (hanya simbol yang dipakai, di antara penanda `IKON-SPRITE`) dan menolak nama ikon yang tidak ada.
- `js/ikon-inline.js` (dibuat otomatis): ikon lengkap untuk elemen yang dibuat JavaScript. `controls.js` memakainya untuk tombol carousel, tombol hapus chip, dan tanda pesan terbaca/terkirim.

## 1.10.2 · 27 Oktober 2026

- Kode perusahaan di nomor dokumen diganti dari `FDS` menjadi `FI` (FUSIONIFY): `{urut}/{kode}/FI/{bulan romawi}/{tahun}`, contoh `007/SRT/FI/X/2026`. FI dipakai karena lebih umum daripada singkatan nama PT, jadi tetap berlaku kalau nama badan hukum berubah. Berlaku di template cetak, template Office, `dokumen/README.md`, AGENTS, dan skill.

## 1.10.1 · 27 Oktober 2026

- **Ikon makin khas FUSIONIFY**: ikon status (info, berhasil, galat, bantuan, jam) kini memakai lingkaran segel bergelombang; semua panah memakai mata panah melengkung; email, database, dokumen, dan matahari digambar ulang.
- `npm run cek:ikon` (`scripts/cek-orisinal-ikon.mjs`): membandingkan semua ikon dengan 7.036 ikon Lucide, Tabler, Heroicons, dan Feather. Hasil: tidak ada path identik, kemiripan tertinggi 84%. Set pembanding diunduh ke `.cache/` dan tidak ikut repo.

## 1.10.0 · 27 Oktober 2026

- **Ikon FUSIONIFY** (`ikon/`, panduan `ikon/README.md`): 95 ikon digambar sendiri dengan ciri khas **titik i** biru muda, garis 2px bulat di kisi 24. Kategori navigasi, aksi, status, komunikasi, dasbor (dompet, kartu, QR, struk, keranjang, toko, paket, truk, gudang, tim, tiket, laporan, grafik), data dan teknis (server, database, bot, VPN, kunci API), tema dan media, serta ikon khas (segel, titik i, fusi, progres, maskot).
- **Logo media sosial** satu warna dari simple-icons (CC0): Instagram, TikTok, WhatsApp, Telegram, X, YouTube, LinkedIn, Facebook, Threads, GitHub, Discord, Shopee, Google Play. Hanya untuk menautkan akun resmi.
- CSS baru di `components.css`: `.ikon` (+ `.polos`, `.ikon-16/20/24/32`, `--ikon-titik`), `.ikon-stiker` (`.biru`, `.tint`, `.kecil`), `.ikon-segel` (`.biru`), `.sosmed`.
- `npm run build:ikon` membuat SVG satuan, sprite `ikon/ikon.svg`, `ikon/ikon.json`, PNG email, `react/ikon-data.ts`, dan vector drawable Android (`fy_ikon_*`, `fy_sosmed_*`).
- React: `Ikon`, `IkonSosmed`, `IkonStiker`, `IkonSegel`, `TautanSosmed`, tipe `NamaIkon` dan `NamaSosmed`.
- Katalog `templates/ikon.html`: cari, ganti tampilan (garis, stiker, segel, biru), klik untuk menyalin kode.
- Uji baru `tests/ikon.mjs` (sinkron dengan sumber, ikon di dalam kisi aman, katalog), `tests/react.mjs` mencakup ikon.

## 1.9.0 · 27 Oktober 2026

- **Halaman produk siap pakai** (kelas baru di `css/product.css`):
  - `templates/bayar-qris.html`: halaman bayar QRIS dengan jumlah + salin, kode QR, batas waktu WIB dan hitung mundur, cek status otomatis tiap 5 detik, serta keadaan berhasil, kedaluwarsa, dan gagal bermaskot (`data-pay-state`). Pratinjau keadaan dengan `?status=`.
  - `templates/status.html`: status layanan dengan banner kondisi, uptime 90 hari per layanan (30 hari di HP), dan riwayat gangguan. Data contoh berlabel.
  - `templates/dokumentasi.html`: dokumentasi developer dengan menu samping (lipatan di HP), contoh kode bertab dan tombol salin, lencana metode, tabel parameter/error, daftar isi yang mengikuti bacaan.
  - `templates/legal/privasi.html` dan `syarat.html`: kerangka Kebijakan Privasi (mengacu UU 27/2022 PDP) dan Syarat & Ketentuan. Bukan nasihat hukum.
- `data-copy` kosong di dalam `.code-block` menyalin isi kodenya; `initApp()` sekarang juga mendukung `data-copy`. Daftar isi `[data-toc]` baru di `controls.js`.
- `.sample-note` dipindah dari `app.css` ke `product.css` supaya bisa dipakai halaman web.
- **Grafis media sosial dan OG image** (`grafis/`, panduan `grafis/README.md`): post 1080×1080, potret 1080×1350, story/sampul Reels-TikTok 1080×1920, OG 1200×630, banner X dan LinkedIn. Teks diganti lewat JSON atau parameter URL. `npm run build:grafis` membuat PNG dan menolak teks yang keluar kanvas atau tertutup maskot.
- **Dokumen cetak baru**: sertifikat A4 mendatar (kode `SER`, tanpa maskot secara bawaan karena dokumen resmi), e-tiket acara 210×99 mm dengan QR, dan kartu nama 90×55 mm depan-belakang.
- **Tanda tangan email**: `tandaTangan()` di `email/fy-email.js`, pratinjau `email/contoh/tanda-tangan.html`, aset `email/aset/fusionify-mark-112.png`.
- Uji baru `tests/grafis.mjs` dan `tests/interaksi-halaman-produk.mjs`; halaman baru masuk uji tata letak, kontras, tanpa JS, dan kurangi gerak.

## 1.8.0 · 27 Oktober 2026

- **Template email** (`email/`, panduan `email/README.md`): `renderEmail()` tanpa dependensi untuk Node, Deno, Bun, dan browser, tabel inline yang aman di Gmail/Outlook, teks polos otomatis, semua isian di-escape, tautan non-http jadi `#`. Sembilan template siap pakai: kode verifikasi, atur ulang password, selamat datang, pengajuan disetujui/ditolak, pembayaran berhasil/gagal, status penarikan (rekening otomatis disamarkan), pemberitahuan. PNG maskot ringan di `email/aset/`, pratinjau di `email/contoh/` (`npm run build:email`).
- **React + Tailwind** (`react/`, panduan `react/README.md`): komponen TSX tipis di atas kelas kit (`Tombol`, `Chip`, `Kartu`, `Judul`, `Kicker`, `Lead`, `Seksi`, `Wrap`, `Segel`, `Maskot`, `KepalaMaskot`, `Gelembung`, `PanggungMaskot`, `Keadaan`, `BadgeProduk`, `FyAset`), preset Tailwind v3 dan token Tailwind v4, semuanya memakai variabel kit sehingga mode gelap ikut. `js/seal.d.ts` untuk TypeScript.
- **Template perjanjian** (kode `PRJ`): `dokumen/cetak/perjanjian.html` (3 halaman, paraf, kotak materai dua pihak, lampiran) dan `dokumen/office/FUSIONIFY-Perjanjian.docx` (pasal tidak terpotong di pergantian halaman). Kerangka umum, bukan nasihat hukum.
- Uji baru `tests/email.mjs` dan `tests/react.mjs`; `tests/dokumen.mjs` mencakup perjanjian.
- AGENTS, DESIGN, README, dan skill punya bagian Email dan React.

## 1.7.0 · 26 Oktober 2026

- **Template dokumen resmi** di folder baru `dokumen/` (panduan `dokumen/README.md`), semuanya memakai token, huruf, logo, segel, dan maskot kit:
  - **HTML → PDF** (`dokumen/cetak/`): surat resmi, invoice, penawaran harga, kuitansi A5, dokumen umum (proposal/laporan) dengan sampul, dan slide 16:9 lima layout. Gaya bersama `cetak.css` mengimpor `css/tokens.css`.
  - `dokumen/cetak/dokumen.js`: jumlah, subtotal, diskon, pajak, total, terbilang Rupiah, format `Rp1.500.000`, tanggal Indonesia, dan gambar segel. Skrip biasa, jalan juga saat file dibuka langsung dari disk.
  - **Word**: `FUSIONIFY-Surat.docx` (kop surat di header, nomor/lampiran/perihal, tanda tangan, tembusan) dan `FUSIONIFY-Dokumen.docx` (sampul, judul, daftar, tabel status, kotak catatan). Huruf FUSIONIFY ditanam di file.
  - **PowerPoint**: `FUSIONIFY-Slide.pptx` terstruktur dengan warna tema FUSIONIFY dan layout `FY Judul`, `FY Bagian`, `FY Isi`, `FY Judul saja`, `FY Angka`, `FY Penutup`, termasuk kartu stiker dan grafik berwarna kit.
  - **Excel**: `FUSIONIFY-Spreadsheet.xlsx` dengan sheet Panduan, Invoice berformula, Anggaran (rencana vs realisasi, merah bila lewat 100%), dan Daftar (status resmi kit dengan warnanya, filter, validasi).
- Isian yang wajib diganti selalu berlatar kuning muda (`--beta-bg`) di semua format.
- Penomoran dokumen `{urut}/{SRT|INV|PNW|KWT|PRJ}/FDS/{bulan romawi}/{tahun}`.
- `scripts/build-dokumen.mjs` (`npm run build:dokumen`): cetak template ke PDF; `--final` menolak teks yang belum diganti dan isi yang keluar halaman. `npm run build:office` membuat ulang template Office.
- Pratinjau PDF di `dokumen/contoh/`. Uji baru `tests/dokumen.mjs`.
- Uji `interaksi-otp-upload.mjs` menunggu snackbar sampai 3 detik (rilis 1.6.4 gagal di GitHub Actions karena cek terlalu cepat).
- AGENTS, DESIGN, README, dan skill punya bagian Dokumen.

## 1.6.4 · 25 Oktober 2026

- **Scroll HP lebih ringan** (disamakan dengan fusionify.id): Lenis hanya dibuat untuk mouse/trackpad. Di layar sentuh, termasuk HP dalam mode "Situs desktop", `initFusionify()` memakai scroll bawaan browser, jadi ScrollTrigger tidak lagi di-update dua kali per scroll.
- `ScrollTrigger.config({ ignoreMobileResize: true })`: address bar HP yang muncul/hilang tidak lagi memicu refresh semua trigger.
- `lockScroll(on)` baru (ikut dikembalikan `initFusionify()`): mengunci scroll lewat Lenis kalau ada, kalau tidak lewat kelas `html.scroll-lock`. Menu HP sekarang benar-benar mengunci halaman di layar sentuh.
- `scrollTo()` tanpa Lenis memakai scroll halus bawaan (mati saat kurangi gerakan) dengan jarak 20px dari atas, sama seperti versi Lenis.
- AGENTS, DESIGN, dan skill diperbarui dengan aturan ini.

## 1.6.3 · 22 Oktober 2026

- Skill `skills/fusionify-brand-style/SKILL.md` disamakan dengan versi terbaru: folder Drive MASCOT, aturan Motion (Framer Motion), catatan neo-brutalism, dan daftar komponen Figma lengkap.

## 1.6.2 · 22 Oktober 2026

- **Library Figma dilengkapi**: komponen `Langkah stepper` + `Stepper`, `Sel judul tabel` (Urut = Tidak/Naik/Turun) + `Baris tabel` + `Tabel`, `Gelembung pesan` (Saya/Lawan) + `Sedang mengetik` + `Kolom tulis` + `Contoh obrolan`, `Foto profil` (Inisial/Foto) + `Pemotong foto`. Semua terikat variabel warna, sehingga tampil benar di mode Terang dan Gelap. Pratinjau keduanya ada di frame "Pratinjau komponen tambahan".
- README: daftar komponen Figma diperbarui.

## 1.6.1 · 22 Oktober 2026

- Domain partner `premiumify.my.id` dan `studydate.id` (beserta subdomainnya) ditambahkan ke `DOMAIN_RESMI`, sehingga kit berjalan penuh di sana. Lisensi dan uji ikut diperbarui.
- **Skill AI agent** di `skills/fusionify-brand-style/SKILL.md`: pasang di Claude Code, Codex, Cursor, Copilot, Gemini CLI, dan agent lain dengan `npx skills add FUSIONIFY-ID/Fusionify_UI`.
- **Enam pose maskot baru terpasang**: `welcome`, `loading`, `empty`, `paid`, `pay-failed`, `offline` (masing-masing `.webp` 720px dan `-420.webp`). Sudah dipakai di `offline.html`, contoh keadaan di `komponen.html` (kosong, memuat, pembayaran berhasil/gagal, offline), dan keadaan selesai daftar.
- README: tabel isi diperbarui (lisensi, template baru, tests, scripts, skills).

## 1.6.0 · 22 Oktober 2026

- **Kunci domain** (`js/lisensi.js`): kit hanya berjalan di `fusionify.id`, `fusionify.biz.id`, dan subdomainnya (plus localhost untuk pengembangan). Di domain lain interaksi dan animasi tidak dijalankan, konten tetap terbaca, dan konsol menampilkan peringatan. Lisensi diperbarui.
- **Halaman 500, offline, dan perawatan** dengan maskot (`templates/500.html`, `offline.html`, `maintenance.html`). Halaman offline memuat ulang sendiri begitu tersambung.
- **Keadaan kosong, error, dan offline** di dalam panel (`.state`, `.state.error`, `.state.offline`, `.state.sm`) dan **bilah offline otomatis** (`[data-offline-bar]`) yang muncul saat koneksi putus. Sudah dipasang di dashboard, admin, aplikasi HP, dan chat.
- **Foto profil dengan pemotong bulat** (`[data-avatar-crop]`): geser, perbesar (slider, roda mouse, cubit, tombol +/-), putar 90°, hasil persegi 512px WebP langsung menggantikan file di form. Batal mengembalikan foto sebelumnya.
- **Library Figma** (https://www.figma.com/design/av0M9IuzYKJTiUWJsYTS3i): variabel warna dengan mode Terang dan Gelap (nama dan kode sama dengan `css/tokens.css`), radius dan jarak, 10 gaya teks, 3 gaya bayangan stiker, ikon, dan komponen (tombol, chip status, chip filter, input, kartu, saklar, lencana, avatar, navigation bar bawah, item notifikasi) plus halaman fondasi dan pratinjau terang/gelap.
- Token baru di `tokens.css` supaya sama dengan Figma: `--r-pill`, `--sp-xs` sampai `--sp-2xl`, `--edge-width`, `--touch-min`.

## 1.5.0 · 22 Oktober 2026

- **Stepper / form bertahap** (`form[data-wizard]`, `.stepper`, `.wizard-step`): tombol Lanjut hanya mengecek kolom di langkah aktif, Kembali menyimpan isian, judul langkah difokus untuk pembaca layar, di HP hanya lingkaran plus teks "Langkah 2 dari 3".
- **Tabel bisa diurutkan** (`table[data-sort]`, `th[data-sort-key]` = teks, `num`, `date`): klik judul kolom, klik lagi untuk membalik. Paham angka Rupiah dan tanggal Indonesia ("12 Okt 2026"). `aria-sort` terpasang. Tabel pengguna di `admin.html` sudah memakai ini.
- **Pusat notifikasi** (`[data-notif]`, `.notif-panel`): lonceng dengan angka, filter Semua / Belum dibaca, tandai semua dibaca, panah atas/bawah, Esc, di HP muncul dari bawah. Sudah dipasang di `dashboard.html`, `admin.html`, dan `app-mobile.html`.
- **Uji otomatis** (`tests/`, `npm test`) dan **GitHub Actions** (`.github/workflows/uji.yml`): setiap push dicek di 8 ukuran layar, terang dan gelap, kontras axe, layar sentuh, tanpa JavaScript, kurangi gerakan, dan semua interaksi.
- **Rilis bernomor versi** (`.github/workflows/rilis.yml`, `npm run release`): push tag `v1.5.0` menguji ulang, membuat zip, dan menerbitkan GitHub Release. Cara mengunci versi di web produk ada di README.
- **Pose maskot baru (draf)**: selamat datang, memuat, kosong, sukses bayar, gagal bayar, offline. Belum dipasang; daftar dan cara pasangnya di `mascot/POSE-BARU.md`, plus `scripts/mascot-import.py`.
- Perbaikan: `.empty[hidden]` sekarang benar-benar tersembunyi; panel di dalam app bar yang sticky tidak lagi tertutup navigation bar dan FAB.

## 1.4.0 · 22 Oktober 2026

- **Kode OTP** (`.otp`, `[data-otp]`, `otpError()`): kotak per digit, tempel dan isi otomatis dari SMS langsung terbagi, mode huruf+angka, keadaan salah, plus hitung mundur kirim ulang (`[data-countdown]`). Template baru `auth/verifikasi.html`.
- **Upload file** (`.upload`, `[data-upload]`): pilih atau seret, cek jenis dan ukuran, pratinjau foto, hapus, progres unggah, file tetap masuk ke form biasa.
- **Chat** (`templates/chat.html`, `[data-chat]`): daftar obrolan + isi obrolan, di HP layar penuh dan ikut tombol back Android, kolom tulis yang tumbuh sendiri, indikator mengetik, kartu acara di dalam pesan.
- **Halaman detail acara** (`templates/acara.html`): poster, tambah ke kalender (`[data-ics]`, file .ics asli), buka di Maps, pendaftaran lewat bottom sheet, tiket, bagikan (`[data-share]`).
- **Android Kotlin/Java dengan XML** (`tokens/android/res/`): warna terang/gelap, ukuran, huruf, drawable stiker, tema `Theme.Fusionify`.
- Token Flutter sudah dicek dengan `flutter analyze` (tanpa masalah) dan `flutter build web`.
- `.ev-date` dipindah ke `app.css` supaya bisa dipakai di semua halaman aplikasi.

## 1.3.0 · 22 Oktober 2026

- **Komponen kontrol lengkap** (`css/controls.css`, `js/controls.js`): button group, split button, FAB, extended FAB, FAB menu, app bar HP, navigation bar bawah, navigation rail, bottom sheet (bisa ditarik), side sheet, modal layar penuh di HP, carousel (tidak berputar sendiri), slider dan slider dua ujung, tooltip, list, chip filter/aksi/input, spinner segel, progress lingkaran dan tanpa angka, skeleton, snackbar dengan tombol aksi, search bar dengan saran, date picker (tunggal dan rentang), time picker, floating toolbar, badge. Dropdown, modal, dan tab dipindah dari `app.css` ke sini supaya bisa dipakai juga di web publik.
- **Siap aplikasi HP**: semua input 16px di layar sentuh (iOS tidak lagi memperbesar halaman), tanpa jeda ketuk ganda, area aman notch, `snippets/pwa-head.html` + `manifest.webmanifest`, ikon aplikasi di `brand/app-icons/`.
- **Token untuk aplikasi native** (`tokens/`): JSON, Flutter, SwiftUI, Jetpack Compose, React Native, plus huruf TTF statis. Dibuat otomatis dengan `node scripts/build-tokens.mjs`.
- Template baru: `templates/komponen.html` (katalog) dan `templates/app-mobile.html` (aplikasi HP).

## 1.2.0 · 21 Oktober 2026

- **Mode gelap** untuk semua komponen: token tema baru (`--card`, `--field`, `--edge`, `--edge-shadow`, `--text-blue`, dll.), ikut sistem secara bawaan, tombol `[data-theme-toggle]` menyimpan pilihan, tanpa kedip putih saat halaman dimuat. Kelas `.only-light` / `.only-dark`.
- **Komponen aplikasi** (`css/app.css`, `js/app.js`): sidebar + topbar, KPI, grafik batang/garis/donat, panel, tabel dengan filter dan aksi, pagination, avatar, switch, dropdown, modal, tab, progress, feed, toast.
- **Halaman masuk, daftar, lupa password, atur ulang password** dengan validasi, meter kekuatan password, dan keadaan berhasil.
- **Template dashboard pengguna dan dashboard admin** (data contoh berlabel).
- Perbaikan: teks pembaca layar di dalam tabel yang bisa digeser tidak lagi membuat halaman melebar di HP; pesan error form tidak lagi membuat tombol "loncat" saat diklik.
- Perubahan: kartu harga kini selalu `.plans > .plan` (sebelumnya `.plan` bentrok dengan chip status `.chip.plan`).

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
