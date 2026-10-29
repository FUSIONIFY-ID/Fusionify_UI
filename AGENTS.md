# AGENTS.md · Fusionify_UI

Panduan untuk semua AI agent dan developer (Claude, ChatGPT/Codex, Cursor, Copilot, Gemini, dan lainnya) yang membangun atau membenahi **web apa pun milik FUSIONIFY**: web company fusionify.id maupun web brand produk (Premiumify, FUSIONIFY BOT, StudyDate.id, Fusionify Solutions, dan produk berikutnya).

Repo ini (**github.com/FUSIONIFY-ID/Fusionify_UI**) adalah **starter kit sistem desain FUSIONIFY**: token, CSS komponen, kode gerak, segel, font, logo, maskot, dan badge. Tujuannya satu: semua web FUSIONIFY terasa satu keluarga, siapa pun yang mengerjakannya.

Baca **`DESIGN.md`** sebelum mengubah tampilan apa pun. Library Figma resminya: https://www.figma.com/design/av0M9IuzYKJTiUWJsYTS3i (variabel dan komponennya sama dengan kit ini). Lihat **`demo/index.html`** untuk contoh markup setiap komponen.

## Isi repo

| Path | Isi |
| --- | --- |
| `css/tokens.css` | Warna, huruf (@font-face), radius, kurva gerak, bayangan |
| `css/base.css` | Reset, tipografi, `.wrap`, `.kicker`, `.h-hero`, `.h-sec`, `.lead`, `.prose` |
| `css/components.css` | Tombol, chip status, nav, menu HP, seksi, kartu stiker, statistik, kartu karya, foto bersegel, gelembung maskot, panggung maskot, marquee partner, FAQ, gelombang, footer, toast, kursor, transisi halaman, status reveal, jeda `.idle`, ikon (`.ikon`, `.ikon-stiker`, `.ikon-segel`, `.sosmed`) |
| `css/product.css` | Komponen web produk: form (`.field`, `.input`, `.select`, `.textarea`, `.check`, `.form-grid`), kartu layanan `.svc`, daftar fitur `.ticks`, langkah `.steps`, harga `.plans`/`.plan` (`.featured`, `.ribbon`), testimoni `.quote`, ajakan `.cta-band`, catatan `.note` (`ok`, `warn`, `danger`), tabel `.table-wrap`/`.table`, tag `.tags`/`.tag`, keadaan kosong/404 `.empty`, `.prod-head`, tab segmen `.segment`, halaman acara (`.event`, `.event-cover` + `.poster`, `.fact`, `.reg`, `.agenda`, `.hosts`, `.event-bar`), label `.sample-note`, halaman bayar `.pay` (`data-pay-state`, `.qr`, `.pay-timer`, `.pay-result`), status layanan (`.status-banner`, `.uptime`, `.uptime-bars`, `.incidents`), dokumentasi (`.docs`, `.docs-nav`, `.code-block`, `.endpoint`, `.method`, `.docs-pager`), daftar isi `.toc`, halaman legal (`.legal`, `.legal-switch`), katalog ikon (`.ikon-grid`, `.ikon-kartu`), linimasa `.timeline` (`.done`, `.now`, `.fail`), tombol keyboard `.kbd`, harga `.harga` (+ `<s>` harga coret), kartu produk `.product-grid` + `.product-card` (`.pc-media`, `.pc-diskon`, `.pc-body`, `.pc-title`, `.pc-actions`, `.habis`), hitung mundur `.countdown` |
| `css/app.css` | Komponen aplikasi (muat **tambahan** di halaman aplikasi saja): kerangka `.app` + `.side` + `.topbar`, `.page-head`, `.panel`, `.dash-grid` (`.span-4/5/6/7/8/12`), `.kpis`/`.kpi`, grafik `.bars`/`.linechart`/`.donut` + `.legend`, `.progress`, `.feed`, `.toolbar`, `.pager`, `.row-actions`, `.avatar`, `.user-chip`, `.switch`, `.settings-row`, halaman masuk `.auth`/`.auth-art`/`.auth-card`, `.pw-field`, `.pw-meter`, `.divider`, `.btn.block`, `.btn.social`, `.btn.danger`, chat (`.chat`, `.chat-list`, `.convo`, `.thread`, `.msgs`, `.msg.me/.them`, `.typing`, `.composer`), `.ev-date` |
| `css/controls.css` | Komponen kontrol untuk web, aplikasi, dan **aplikasi HP**: dropdown/`.menu`, `.modal` (`.full` di HP), `.tabs`, `.badge`, `.btn-group`, `.split-btn`, `.fab` + `.fab-dock` + `.fab-menu`, `.appbar`, `.navbar` (navigasi bawah HP) + `.with-navbar`, `.rail` (tablet) + `.with-rail`, `.m-app` (bar bawah otomatis jadi rail mulai 700px), `.sheet` (bottom sheet) dan `.side-sheet`, `.carousel`, `.slider` dan `.range2`, `.tip-wrap` (tooltip), `.list`/`.li`, `.chip-btn` (filter/aksi) dan `.chip-input`, `.spinner` (segel), `.ring`, `.skel` (skeleton), `.progress.indeterminate`, `.snackbar`, `.search-bar` + `.suggest`, `.picker` (date/time picker), `.float-bar` (floating toolbar), `.otp` (kode OTP) + `.resend`, `.upload` + `.drop` + `.upload-list` (upload file), `.stepper` + `.wizard-step` (form bertahap), `.sort-btn` (tabel bisa diurutkan), `.notif` + `.notif-panel` (pusat notifikasi), `.state` (keadaan kosong/error/offline), `.offline-bar`, `.avatar-crop` + `.crop-modal` (foto profil dengan pemotong bulat), `.breadcrumb`, `.pagination`, `.accordion`, `.input-group` + `.addon` (awalan/akhiran input), `.qty` (jumlah), `.rating` dan `.rating-input`, `.gallery` + `.lightbox`, `.announce` (pengumuman), `.consent` (persetujuan cookie) |
| `css/fusionify.css` | Satu file yang mengimpor tokens, base, components, product, controls (tanpa app.css) |
| `js/motion.js` | `initFusionify()`: smooth scroll, nav, menu HP, kursor, reveal, angka, magnet, salin + toast (`data-copy`; kosong di dalam `.code-block` = salin isi kodenya), transisi halaman, suara, jeda di luar layar |
| `js/app.js` | `initApp()` untuk halaman aplikasi: tema, sidebar HP, dropdown, modal, tab, tampil/sembunyi password, meter kekuatan password, validasi form (`data-validate`), pilih semua baris, toast, tombol salin `data-copy`. Tanpa GSAP |
| `js/controls.js` | `initControls()` dan `snackbar()`: interaksi semua komponen di `controls.css` (sheet bisa ditarik, picker dengan keyboard, carousel, slider, tooltip, saran pencarian). Dipanggil otomatis oleh `initFusionify()` dan `initApp()`. OTP (`[data-otp]`, `otpError()`), hitung mundur kirim ulang (`[data-countdown]`), upload (`[data-upload]`), chat (`[data-chat]`), tambah ke kalender (`[data-ics]`, unduh .ics), bagikan (`[data-share]`). Stepper (`form[data-wizard]`), tabel urut (`table[data-sort]` + `th[data-sort-key]`), notifikasi (`[data-notif]`), bilah offline (`[data-offline-bar]`), pemotong foto profil (`[data-avatar-crop]`), daftar isi yang mengikuti bacaan (`[data-toc]`), jumlah (`[data-qty]`), galeri + lightbox (`[data-gallery]`), pengumuman (`[data-announce]`), persetujuan cookie (`[data-consent]`, `pilihanCookie()`), hitung mundur ke tanggal (`[data-tenggat]`). Event: `fy:change`, `fy:remove`, `fy:select`, `fy:complete`, `fy:files`, `fy:send`, `fy:resend`, `fy:step`, `fy:sort`, `fy:read`, `fy:crop`, `fy:close`, dan `fy:online`/`fy:offline`/`fy:consent` di window |
| `js/ikon-inline.js` | Dibuat `npm run build:ikon`: Ikon FUSIONIFY lengkap (tanpa sprite) untuk elemen yang dibuat JavaScript, `ikon(nama, kelas)`, plus `isi()` dan `svgIkon()` untuk ikon gabungan. Dipakai `controls.js` |
| `js/lisensi.js` | Kunci domain: kit hanya berjalan di domain di `DOMAIN_RESMI` (fusionify.id, fusionify.biz.id, partner premiumify.my.id dan studydate.id, serta subdomainnya) plus localhost. Dipanggil di awal `initFusionify()`, `initApp()`, `initControls()`. Jangan dihapus atau diakali |
| `js/theme.js` | Mode terang/gelap (`initTheme`, `setTheme`). Dipanggil otomatis oleh `motion.js` dan `app.js` |
| `js/seal.js` | `seal()` dan `SEAL_PATH`: bentuk segel 12 lekukan |
| `snippets/head-script.html` | Skrip kecil wajib di `<head>` |
| `snippets/sprite.html` | Sprite SVG (clip-path segel, simbol segel) setelah `<body>` |
| `snippets/body-parts.html` | Kursor, toast, tirai transisi sebelum `</body>` |
| `snippets/pwa-head.html`, `snippets/manifest.webmanifest` | Tambahan `<head>` dan manifest untuk web HP, PWA, dan aplikasi WebView/Capacitor |
| `tokens/` | Token untuk **aplikasi native**: `tokens.json`, Flutter, SwiftUI, Jetpack Compose, React Native, plus resource Android XML (`tokens/android/res/`: warna terang/gelap, ukuran, huruf, drawable stiker, tema) untuk aplikasi Kotlin/Java, dan huruf TTF statis. Dibuat dari `css/tokens.css` dengan `node scripts/build-tokens.mjs`. Panduan di `tokens/README.md` |
| `fonts/` | Afacad Flux, Sansation, Caveat, Exo 2 (woff2, OFL) |
| `brand/` | Segel Fi, wordmark (SVG), emblem; `brand/kit/` logo horizontal, vertikal, legacy; `brand/app-icons/` ikon aplikasi (192, 512, maskable, apple-touch-icon) |
| `mascot/` | Maskot badan penuh, kepala, papan, stiker bot, termasuk pose welcome, loading, empty, paid, pay-failed, offline. `mascot/POSE-BARU.md`: cara membuat dan memasang pose baru |
| `badge/` | Badge "Sebuah produk dari FUSIONIFY" (ID/EN, terang/gelap) |
| `demo/index.html` | Halaman contoh semua komponen |
| `tests/` | Uji otomatis (`npm test`): tata letak dan kontras, layar sentuh, tanpa JS, dan semua interaksi. Jalan juga di GitHub Actions (`.github/workflows/uji.yml`) |
| `.github/workflows/rilis.yml`, `scripts/release.mjs` | Rilis bernomor versi: push tag `vX.Y.Z` untuk menguji, membuat zip, dan menerbitkan GitHub Release |
| `skills/fusionify-brand-style/SKILL.md` | Skill ringkas untuk AI agent, dipasang lewat `npx skills add FUSIONIFY-ID/Fusionify_UI`. Perbarui setiap ada komponen atau aturan baru |
| `FUSIONIFY-UI-KONTEKS.md` | Semua aturan + CSS dalam satu file, untuk di-upload ke AI versi chat web. Buat ulang dengan `node scripts/build-konteks.mjs` setiap ada perubahan |
| `CLAUDE.md`, `GEMINI.md`, `QWEN.md`, `.gemini/`, `.qwen/`, `.cursor/rules/`, `.github/copilot-instructions.md`, `.aider.conf.yml` | Penunjuk ke file ini untuk masing-masing AI agent |
| `templates/landing-produk.html` | Template landing web produk lengkap. Ganti bagian bertanda `GANTI` |
| `templates/404.html` | Template halaman tidak ditemukan dengan maskot confused |
| `templates/500.html`, `offline.html`, `maintenance.html` | Halaman error server, offline (muat ulang sendiri saat tersambung), dan perawatan, semuanya dengan maskot |
| `templates/auth/masuk.html`, `daftar.html`, `lupa-password.html`, `atur-ulang-password.html`, `verifikasi.html` | Halaman masuk, daftar, lupa password, atur ulang password, verifikasi kode OTP. Validasi dan keadaan berhasil sudah jalan; sambungkan ke backend sendiri |
| `templates/dashboard.html` | Dashboard pengguna (ringkasan, grafik, pesanan, aktivitas) |
| `templates/komponen.html` | Katalog semua komponen kontrol dengan contoh hidup |
| `templates/app-mobile.html` | Template aplikasi HP: app bar, pencarian, chip filter, carousel, list, FAB, navigation bar bawah (jadi rail di tablet), bottom sheet |
| `templates/chat.html` | Pesan: daftar obrolan + isi obrolan (HP: layar penuh dan ikut tombol back; layar lebar: berdampingan), kolom tulis, kartu acara di chat |
| `templates/acara.html` | Halaman detail acara publik: poster, waktu (tambah ke kalender), lokasi (buka di Maps), pendaftaran lewat bottom sheet, tiket, susunan acara, bagikan |
| `templates/admin.html` | Dashboard admin (KPI, grafik, tabel pengguna + filter + pilih semua + hapus dengan konfirmasi, pengaturan bertab, log) |
| `templates/bayar-qris.html` | Halaman bayar QRIS: jumlah + salin, kode QR, batas waktu dan hitung mundur, cek status (otomatis tiap 5 detik), keadaan berhasil/kedaluwarsa/gagal dengan maskot. Sambungkan `cekStatus()` ke backend sendiri. QR di `templates/aset/qr-contoh.svg` hanya contoh |
| `templates/status.html` | Status layanan: banner kondisi, uptime 90 hari per layanan (30 hari di HP), riwayat gangguan. Datanya contoh dan berlabel |
| `templates/dokumentasi.html` | Dokumentasi developer: menu samping (jadi lipatan di HP), contoh kode bertab dengan tombol salin, endpoint, tabel parameter dan error, daftar isi yang mengikuti bacaan |
| `templates/legal/privasi.html`, `syarat.html` | Kerangka Kebijakan Privasi (mengacu UU 27/2022 PDP) dan Syarat & Ketentuan, dengan daftar isi bernomor. Bukan nasihat hukum; bagian `GANTI` wajib disesuaikan |
| `grafis/` | Template grafis media sosial dan OG image: `post.html` (1080×1080), `potret.html` (1080×1350), `story.html` (1080×1920, juga sampul Reels/TikTok), `og.html` (1200×630), `banner.html` (X 1500×500, LinkedIn 1584×396). Isi lewat JSON (`grafis.js`), PNG lewat `npm run build:grafis` (`scripts/build-grafis.mjs` menolak teks yang keluar kanvas atau tertutup maskot). Contoh di `grafis/contoh/`. Panduan: `grafis/README.md` |
| `dokumen/cetak/` | Template dokumen cetak HTML → PDF: `surat.html` (surat resmi), `invoice.html`, `penawaran.html`, `kuitansi.html` (A5), `dokumen.html` (proposal/laporan), `perjanjian.html` (PRJ, 3 halaman), `slide.html` (16:9), `sertifikat.html` (A4 mendatar, SER), `tiket.html` (e-tiket acara 210×99 mm), `kartu-nama.html` (90×55 mm, depan-belakang). Gaya di `cetak.css` (memakai `css/tokens.css`), hitungan Rupiah, terbilang, tanggal, dan segel di `dokumen.js`. Panduan: `dokumen/README.md` |
| `dokumen/office/` | Template Office: `FUSIONIFY-Surat.docx`, `FUSIONIFY-Dokumen.docx`, `FUSIONIFY-Perjanjian.docx` (huruf tertanam), `FUSIONIFY-Slide.pptx` (tema + layout FY), `FUSIONIFY-Spreadsheet.xlsx` (Invoice berformula, Anggaran, Daftar). Aset PNG di `office/aset/` |
| `dokumen/contoh/` | Pratinjau PDF semua template cetak (`npm run build:dokumen`) |
| `scripts/build-dokumen.mjs`, `scripts/dokumen/` | Pembuat PDF (`--final` menolak teks "ganti" dan isi yang keluar halaman) dan generator template Office (`npm run build:office`) |
| `email/` | Template email transaksional: `fy-email.js` (`renderEmail`, tabel inline, aman di Gmail/Outlook), `templates.js` (kode verifikasi, atur ulang password, selamat datang, pengajuan disetujui/ditolak, pembayaran berhasil/gagal, status penarikan, pemberitahuan), `tandaTangan()` untuk tanda tangan email karyawan/produk, `aset/` PNG maskot, `contoh/` pratinjau (`npm run build:email`). Panduan: `email/README.md` |
| `react/` | Untuk produk React + Tailwind: `index.tsx` (komponen tipis di atas kelas kit: `Tombol`, `Chip`, `Kartu`, `Judul`, `Maskot`, `PanggungMaskot`, `Keadaan`, `BadgeProduk`, `Ikon`, `IkonStiker`, `IkonSegel`, `IkonSosmed`, `TautanSosmed`, `Remah`, `Rating`, `Harga`, `KartuProduk`, `Linimasa`, `HitungMundur`, `Kbd`, dll.), `lucide.tsx` (nama komponen ala lucide-react yang menggambar Ikon FUSIONIFY, untuk memindahkan produk lama), `ikon-data.ts` (dibuat otomatis), `tailwind-preset.js` (v3), `tailwind-v4.css`. Panduan: `react/README.md` |
| `ikon/` | **Ikon FUSIONIFY**: 136 ikon garis 2px dengan ciri khas titik i biru muda (navigasi, aksi, status, komunikasi, dasbor, data, tema, khas) plus 13 logo sosmed satu warna (dari simple-icons). Sumber satu-satunya `ikon/sumber.mjs`; `npm run build:ikon` membuat `svg/`, `sosmed/`, sprite `ikon.svg`, `ikon.json`, PNG email, `react/ikon-data.ts`, dan drawable Android `fy_ikon_*`/`fy_sosmed_*`. Katalog: `templates/ikon.html`. Panduan: `ikon/README.md` |
| `rencana/` | Rencana yang belum dikerjakan. `rencana/ui-fusionify-id.md`: situs dokumentasi ui.fusionify.id ala m3.material.io (dikunci login, watermark per orang) plus aplikasi desktop dan Android anti-screenshot. Baca dulu sebelum mengerjakannya |

## Cara memakai di proyek baru atau lama

1. Salin folder kit ke proyek (mis. `public/fusionify-ui/` atau `src/fusionify-ui/`), atau jadikan git submodule.
2. Pasang dependensi gerak: `npm i gsap lenis`.
3. Muat CSS: `css/fusionify.css` (atau impor tiga file lewat bundler supaya bisa di-inline).
4. Tempel `snippets/head-script.html` di `<head>`, `snippets/sprite.html` setelah `<body>`, `snippets/body-parts.html` sebelum `</body>`. Sesuaikan path gambar.
5. Panggil `initFusionify()` dari `js/motion.js` sekali setelah DOM siap.
6. Preload dua font utama:
   ```html
   <link rel="preload" href="/fusionify-ui/fonts/afacad-flux-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/fusionify-ui/fonts/sansation-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
   ```
7. Web produk: pasang badge di footer:
   ```html
   <a class="fy-badge" href="https://fusionify.id" rel="noopener"><img src="/fusionify-ui/badge/produk-fusionify-id-dark.png" alt="Sebuah produk dari FUSIONIFY" width="340" height="100"></a>
   ```

Stack acuan fusionify.id: Astro + vanilla CSS. Kit ini tidak terikat framework: bisa dipakai di Astro, Next.js, Vite, Laravel Blade, atau HTML biasa. Jangan menambahkan Tailwind/Bootstrap di atasnya; kalau proyek lama sudah memakai framework CSS, pakai token kit ini sebagai variabel dan sesuaikan komponennya.

## Aturan desain (wajib)

- Pakai token di `css/tokens.css`. Jangan menulis warna hex, font, atau radius baru.
- **Logo**: pakai file di `brand/`. Jangan mengetik "FUSIONIFY" dengan font sebagai pengganti logo. Web produk memakai logonya sendiri, sistem desainnya tetap kit ini.
- **Maskot**: ganti ekspresi dengan menukar gambar badan penuh. Jangan menempel kepala di badan lain. Pose baru boleh bebas dan ekspresif, tapi wajah, mata abu tua, rambut putih ujung biru dengan helai mencuat, dan garis tebalnya wajib sama. Baju bawaan jaket hitam terbuka dengan kaus putih; boleh ganti kalau situasinya butuh.
- Hiasan SVG yang sengaja lebih besar dari wadahnya wajib kelas `.fx-oversize` (atau `max-width: none`).
- Gaya stiker: garis 2px `--edge`, bayangan pejal ke bawah (`--edge-shadow`), sudut besar.
- Jangan menyalin momen khas fusionify.id (segel menutup hero, footer malam Bogor) apa adanya ke web produk. Rakit momen sendiri dari bagian yang sama.

## Ikon (wajib)

- Pakai Ikon FUSIONIFY dari `ikon/` (sprite `#ikon-<nama>`, React `<Ikon>`, Android `fy_ikon_*`). Jangan menulis SVG ikon sendiri di halaman atau memakai set ikon lain (Material, Lucide, Font Awesome, emoji).
- Ikon belum ada? Gambar di `ikon/sumber.mjs` mengikuti aturan di `ikon/README.md` (kisi 24, garis 2px bulat, titik i bila bermakna), lalu `npm run build:ikon` dan `npm run cek:ikon` (menolak ikon yang path-nya identik atau mirip 85% atau lebih dengan Lucide, Tabler, Heroicons, Feather).
- Template dan demo membawa sprite sendiri yang hanya berisi ikon yang dipakai (penanda `IKON-SPRITE`, diisi `npm run build:ikon`). Habis menambah `#ikon-…` di template, jalankan build itu lagi.
- Logo sosmed hanya untuk menautkan akun resmi yang benar-benar ada, satu warna, bentuk tidak diubah.
- Tombol yang isinya hanya ikon wajib `aria-label`; ikon di samping teks `aria-hidden="true"`.

## Mode gelap (wajib dijaga)

- Semua warna komponen memakai token tema: `--card`, `--field`, `--surface`, `--surface-2`, `--edge` (garis stiker), `--edge-shadow` (bayangan pejal), `--ink`/`--ink-2`/`--ink-3` (teks), `--text-blue`/`--text-blue-deep` (teks biru), `--inverse-bg`/`--inverse-fg`, `--danger`. **Jangan menulis `#fff` atau `var(--ink)` untuk latar, garis, atau bayangan.** `#fff` hanya untuk teks/ikon di atas biru.
- Bawaan: ikut pengaturan sistem. Pilihan pengguna disimpan (`fy-theme`) lewat tombol `[data-theme-toggle]`. Web yang ingin selalu terang: `<html data-theme="light" data-theme-lock>`.
- Gambar yang beda per tema (mis. wordmark biru vs putih): kelas `.only-light` dan `.only-dark`.
- Cek kontras dan tampilan di **kedua** tema sebelum selesai.

## Halaman aplikasi (dashboard, admin, masuk)

- Muat `css/app.css` setelah `fusionify.css`, dan panggil `initApp()` dari `js/app.js` (bukan `initFusionify`). Aplikasi tidak memakai smooth scroll, kursor segel, atau reveal: harus terasa cepat dan tenang.
- Data di template dashboard adalah **contoh** dan diberi label `.sample-note` "Data contoh". Ganti dengan data asli dari sistem, lalu hapus labelnya. Jangan pernah menampilkan angka contoh di aplikasi yang sudah dipakai orang.
- Tabel lebar wajib di `.table-wrap` (sudah `position: relative`, `tabindex="0" role="region" aria-label`). Teks `.sr-only` di dalam elemen yang bisa digeser butuh pembungkus `position: relative`, kalau tidak halaman ikut melebar di HP.
- Form: pesan error muncul saat kirim atau saat meninggalkan kolom, dan hilang saat pengguna mengetik perbaikannya. Jangan menghapus pesan error saat blur (tata letak bergeser tepat saat pengguna mengklik).
- Form masuk/daftar diletakkan di bagian atas, bukan di tengah vertikal, supaya tidak loncat saat pesan error berubah.
- Login dengan Google hanya dipasang kalau OAuth-nya benar-benar tersedia.

## Aplikasi HP (web HP, PWA, iOS, Android)

- Aplikasi yang isinya HTML (PWA, Capacitor, WebView): mulai dari `templates/app-mobile.html`, tempel `snippets/pwa-head.html`, pakai `initApp()` (bukan `initFusionify`).
- Aplikasi native (Flutter, SwiftUI, Compose, React Native, Android Kotlin/Java dengan XML): CSS tidak dipakai. Ambil token dari `tokens/` dan bangun ulang komponennya dengan aturan yang sama. Jangan menulis hex sendiri di kode native.
- Target sentuh minimal 44px. Elemen yang menempel di tepi layar wajib memakai `env(safe-area-inset-*)` (komponen kit sudah).
- Di layar sentuh semua input minimal 16px (sudah di `base.css`) supaya iOS tidak memperbesar halaman saat mengetik.
- Satu FAB per layar. Navigation bar bawah 3 sampai 5 tujuan; lebih dari itu pakai drawer.
- Carousel tidak boleh berputar sendiri. Bottom sheet harus bisa ditutup dengan tarik ke bawah, tombol, dan Esc/tombol kembali.
- Bayangan stiker di native: offset ke bawah tanpa blur, bukan `elevation`.

## Toko, promo, dan privasi

- Harga di `.harga` dan kartu produk wajib harga asli; harga coret hanya kalau memang pernah dijual dengan harga itu. Rating dan jumlah ulasan hanya dari ulasan asli; kalau belum ada, jangan tampilkan `.rating`.
- Hitung mundur promo (`[data-tenggat]`) harus sesuai tanggal promo yang benar. Jangan memasang hitung mundur palsu yang diulang setiap kunjungan.
- Persetujuan cookie (`.consent`): tombol "Hanya yang penting" dan "Terima semua" sama menonjolnya. Muat skrip analitik/iklan hanya kalau `pilihanCookie() === "semua"` atau setelah event `fy:consent` dengan pilihan itu.
- Produk lama yang masih memakai lucide-react: ganti impornya ke `react/lucide.tsx` (gambar tetap Ikon FUSIONIFY), lalu pelan-pelan pindah ke `<Ikon nama="…" />`.

## Keadaan kosong, error, dan offline

- Setiap daftar atau panel yang bisa kosong wajib punya `.state` dengan maskot, satu kalimat penjelasan, dan satu tombol langkah berikutnya. Jangan biarkan area kosong tanpa penjelasan.
- Error memakai `.state.error` dan selalu ada tombol "Coba lagi". Halaman penuh: `templates/500.html`.
- Aplikasi yang bisa dipakai saat sinyal lemah memasang `[data-offline-bar]` dan `templates/offline.html` sebagai halaman cadangan service worker.

## Dokumen (surat, invoice, PDF, Word, PowerPoint, Excel)

- Semua dokumen resmi FUSIONIFY dibuat dari template di `dokumen/`. Jangan membuat kop surat, invoice, atau deck dari nol dengan warna dan huruf lain. Panduan lengkap: `dokumen/README.md`.
- Format: dokumen final yang harus tampil persis (invoice, penawaran, surat PDF) dari `dokumen/cetak/*.html`; dokumen yang akan diedit orang lain dari `dokumen/office/`.
- Teks bertanda kuning (`.ganti`, latar kuning muda di Word, sel kuning muda di Excel) wajib diganti sebelum dikirim. Cetak final dengan `node scripts/build-dokumen.mjs --final berkas.html --keluar hasil.pdf`.
- Penomoran: `{urut}/{kode}/FI/{bulan romawi}/{tahun}`, kode `SRT`, `INV`, `PNW`, `KWT`, `PRJ`, `SER` (sertifikat: `cetak/sertifikat.html`; perjanjian: `cetak/perjanjian.html`, `office/FUSIONIFY-Perjanjian.docx`; kerangka umum, bukan nasihat hukum).
- Kop surat memakai logo horizontal dari `brand/kit/`, nama PT FUSIONIFY DIGITAL STORE, dan kontak publik saja.
- Harga, angka, dan status produk wajib asli. Pajak hanya kalau perusahaan sudah PKP. Angka contoh di grafik atau tabel diberi label "Data contoh" dan diganti sebelum dipakai.
- Satu `<section class="halaman">` = satu lembar A4 (`.halaman.a5` untuk kuitansi, `.slide` untuk 16:9). Hiasan yang sengaja lebih besar dari halaman memakai `.segel` atau `.fx-oversize`.
- Kalau token di `css/tokens.css` berubah, jalankan `npm run build:dokumen` dan `npm run build:office`, lalu catat di CHANGELOG.

## Grafis media sosial dan OG image

- Semua grafis untuk akun FUSIONIFY dan produknya dibuat dari `grafis/*.html`, bukan dari template Canva acak. Teks diganti lewat JSON (`--isi`), bukan dengan mengubah gaya.
- Teks penting di dalam zona aman (pratinjau dengan `?panduan`): story bagian atas, bawah, dan kanan tertutup tombol aplikasi; banner profil kiri tertutup foto profil.
- `build-grafis.mjs` wajib lolos (tanpa teks keluar kanvas atau tertutup maskot). Kalau judul terlalu panjang, pendekkan kalimatnya.
- Isi tetap jujur: status produk dengan chip yang benar, tanpa angka atau testimoni karangan. Contoh acara memakai teks dalam kurung siku dan wajib diganti.
- Setiap halaman publik produk punya `og:image` 1200×630 dari `grafis/og.html`.

## Email

- Semua email produk FUSIONIFY dibuat dengan `email/fy-email.js` atau `email/templates.js`. Jangan menulis HTML email sendiri dengan warna, gradien, atau emoji lain.
- Salin file email ke backend produk tanpa diubah (ubah di kit, rilis, salin ulang) dan host `email/aset/*.png` di domain produk; isi `aset` dan `merek` dengan URL https asli.
- Tanpa SVG/WebP, gambar ber-`width`/`height`/`alt`, kirim juga versi teks polos, di bawah 102 KB, satu tombol utama, tanpa emoji di subjek. Nomor rekening disamarkan; password dan API key tidak pernah dikirim lewat email.
- Pengirim memakai domain sendiri yang sudah diverifikasi.

## React + Tailwind

- Produk React memakai `react/index.tsx` dan preset `react/tailwind-preset.js` (v3) atau `react/tailwind-v4.css` (v4), plus `css/fusionify.css` yang tetap wajib dimuat. Jangan menulis ulang komponen kit dengan kelas Tailwind dan hex sendiri.
- Warna Tailwind dari preset berbasis variabel CSS kit, jadi mode gelap ikut. Kalau butuh warna baru, tambahkan ke `css/tokens.css`, bukan ke config Tailwind proyek.
- Komponen baru di kit dibuat dulu sebagai kelas CSS, baru dibungkus React. Uji: `tests/react.mjs`.

## Aturan isi (wajib)

- **Jujur.** Status produk ditulis apa adanya dengan chip (`go`, `beta`, `wip`, `plan`, `eos`). Jangan menaikkan status.
- Harga di `.plan` wajib harga asli; kalau belum pasti tulis "Hubungi kami". Seksi testimoni dihapus kalau belum ada izin, jangan diisi contoh.
- **Tidak ada angka, testimoni, logo klien, atau partner karangan.** Testimoni hanya dengan izin tertulis dan tanggalnya.
- Cover produk harus screenshot asli; ilustrasi wajib diberi label "Ilustrasi".
- Kontak publik FUSIONIFY hanya `hello@fusionify.id` dan WhatsApp `+62 831-1138-0628`.
- Proyek rahasia klien pemerintah tidak boleh muncul di web publik.
- Bilingual ID/EN bila memungkinkan; Bahasa Indonesia ditulis natural, bukan terjemahan kaku.
- Gaya tulisan santai, jelas, manusiawi. **Tanpa em dash (—)** di teks yang dibaca pengunjung.

## Performa (wajib, sudah diukur di fusionify.id)

- Hanya animasikan `transform` dan `opacity`. Tidak boleh animasi `box-shadow`, `width`, `top`, `filter`.
- Jangan menganimasikan elemen di dalam SVG satu per satu (memaksa gambar ulang seluruh SVG tiap frame). Kalau perlu kedip, kedipkan seluruh lapisan `<svg>` dengan `opacity`.
- Cahaya dan glow pakai gradien statis, bukan `filter: blur`/`drop-shadow` pada elemen bergerak.
- Animasi CSS `infinite` harus berada di dalam elemen yang diamati `initFusionify` (`main > section`, `main > div`, `footer`, `[data-pause]`) supaya dijeda saat tidak terlihat.
- Jangan menulis `left`/`top`/`width` atau membaca ukuran elemen (`getBoundingClientRect`, `clientWidth`) di `gsap.ticker` atau handler scroll. Ukur sekali, perbarui saat resize.
- Lenis hanya dibuat untuk mouse/trackpad (`initFusionify` melewatinya kalau `pointer: coarse`). Di layar sentuh Lenis tidak menghaluskan apa pun tapi menambah kerja tiap event scroll dan membuat ScrollTrigger di-update dua kali; di sana scroll bawaan browser yang dipakai. Kunci scroll (menu, loader) lewat `lockScroll()` yang dikembalikan `initFusionify()`, bukan `lenis.stop()` langsung. `ScrollTrigger.config({ ignoreMobileResize: true })` wajib tetap ada supaya address bar HP tidak memicu refresh semua trigger.
- Jangan membuat puluhan elemen beranimasi sendiri-sendiri (mis. bintang): kelompokkan ke beberapa lapisan dan animasikan lapisannya.
- Dengan Lenis, pakai `scrub` kecil (sekitar 0.3) dan jangan pakai `anticipatePin`.
- Untuk efek membesar (segel menutup layar), perbesar SVG berukuran sedang (sekitar 400px) dengan `transform: scale`; jangan menggambar SVG raksasa.
- Font di-host sendiri, gambar WebP dengan `width`/`height`, inisialisasi yang tidak perlu saat awal dijalankan saat browser senggang.
- Target PageSpeed Insights mobile: Aksesibilitas, Praktik Terbaik, SEO = 100.

## QA (wajib sebelum selesai)

Jalankan `npm test` sebelum commit. Kalau menambah komponen atau template baru, tambahkan juga ujinya di `tests/` (contoh: `tests/interaksi-stepper-tabel-notif.mjs`) dan daftarkan halamannya di `tests/tata-letak-dan-kontras.mjs`.


Cek di **HP** 375×667 dan 390×844 (juga dengan emulasi layar sentuh), **tablet** 768×1024, 820×1180, 1024×768, **desktop** 1366×768, 1440×900, 1920×1080.

- Tidak ada scroll horizontal atau elemen keluar layar.
- Tidak ada teks bertabrakan atau terpotong.
- Kontras teks minimal 4.5:1, termasuk teks terang di atas biru (`#f2f8ff` atau putih, jangan pakai `opacity` pada teks di atas biru). Periksa dengan axe **setelah** semua elemen `data-reveal` tampil; Lighthouse biasa melewatkan elemen yang masih transparan.
- Mode "kurangi gerakan": semua konten harus langsung tampil.
- Grid tanpa kartu yatim.
- Cek mode reduced motion dan tanpa JavaScript (konten tetap terbaca).
- Build proyek sukses tanpa error.

## Aturan hukum dan orisinalitas

- Semua kode ditulis sendiri. **Jangan menyalin kode, aset, atau musik dari situs lain**, khususnya andikadevs (izin penggunaannya ditolak pemiliknya). Inspirasi umum boleh; salinan tidak.
- Jangan membuat momen khas situs tersebut: maskot terbang ke pojok nav, pintu di huruf wordmark, awan bertumpuk, laut dan kapal.
- Dependensi baru wajib berlisensi bebas dipakai komersial dan dicatat di `THIRD_PARTY_NOTICES.md`.
- Logo, maskot, dan badge adalah milik PT FUSIONIFY DIGITAL STORE. Hanya untuk web FUSIONIFY dan partner yang diizinkan.

## Versi dan rilis

- Ikuti nomor versi `X.Y.Z`: Z untuk perbaikan aman, Y untuk komponen baru yang tidak merusak, X kalau kelas atau markup berubah.
- Setiap perubahan dicatat di `CHANGELOG.md`, dan `version` di `package.json` harus sama dengan bagian teratas CHANGELOG (`npm run release` mengeceknya).
- Web produk mengunci satu versi (submodule di tag, atau `#vX.Y.Z`). Jangan mengubah file kit langsung di dalam proyek produk; ubah di repo kit, rilis, lalu naikkan versinya di produk.

## Menjaga kit tetap sinkron

fusionify.id (repo `FUSIONIFY-ID/FUSIONIFY`) adalah sumber kebenaran. Kalau token, komponen, atau aturan di sana berubah, perbarui kit ini di commit yang sama atau sesudahnya, lalu catat di `CHANGELOG.md` dan perbarui `skills/fusionify-brand-style/SKILL.md`.

## Git

- Commit dan push atas nama akun GitHub **jundy779**.
- Pesan commit singkat dan jelas, boleh bahasa Indonesia.
