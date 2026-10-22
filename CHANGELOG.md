# Changelog

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
