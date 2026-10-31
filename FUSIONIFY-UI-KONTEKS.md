# FUSIONIFY UI · konteks lengkap untuk AI chat

> **Untuk AI yang membaca file ini (ChatGPT, Gemini, Grok, Qwen, Claude, dan lainnya):**
> Kamu sedang membantu membangun atau membenahi web milik FUSIONIFY. Ikuti SEMUA aturan di file ini.
> Pakai token dan kelas CSS yang tertulis di sini, jangan menciptakan warna, font, atau gaya baru.
> Kalau pengguna minta sesuatu yang bertentangan dengan aturan (misalnya angka atau testimoni karangan), ingatkan dulu.
> Aset gambar (logo, maskot, font) ada di repo `FUSIONIFY-ID/Fusionify_UI`; rujuk dengan path relatif seperti `fusionify-ui/mascot/happy-420.webp`.

File ini dibuat dari repo `FUSIONIFY-ID/Fusionify_UI`. Kalau repo-nya tersedia, repo yang benar. Cara pakai: upload file ini ke chat, lalu tulis permintaanmu.

---
# AGENTS.md · Fusionify_UI

Panduan untuk semua AI agent dan developer (Claude, ChatGPT/Codex, Cursor, Copilot, Gemini, dan lainnya) yang membangun atau membenahi **web apa pun milik FUSIONIFY**: web company fusionify.id maupun web brand produk (Premiumify, FUSIONIFY BOT, StudyDate.id, Fusionify Solutions, dan produk berikutnya).

Repo ini (**github.com/FUSIONIFY-ID/Fusionify_UI**) adalah **starter kit sistem desain FUSIONIFY**: token, CSS komponen, kode gerak, segel, font, logo, maskot, dan badge. Tujuannya satu: semua web FUSIONIFY terasa satu keluarga, siapa pun yang mengerjakannya.

Baca **`DESIGN.md`** sebelum mengubah tampilan apa pun. Library Figma resminya: https://www.figma.com/design/av0M9IuzYKJTiUWJsYTS3i (variabel dan komponennya sama dengan kit ini). Lihat **`demo/index.html`** untuk contoh markup setiap komponen. Peta kode lengkap (kelas, fungsi JS, atribut `data-*`, event, generator, uji, temuan) ada di **`PETA-KODE.md`**; perbarui kalau struktur kit berubah.

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

---

# DESIGN.md · FUSIONIFY UI

Pedoman visual resmi semua web FUSIONIFY. Diambil dari **fusionify.id** (web company, live di https://fusionify.id), yang menjadi sumber kebenaran. Kalau fusionify.id berubah, file ini ikut diperbarui.

Identitasnya dibangun dari aset FUSIONIFY sendiri: segel bergelombang di logo, titik huruf i, biru logo, dan maskot.

## Prinsip

1. **Maskot adalah pemandu.** Dia bereaksi (malu saat didekati, mengedip saat dicolek, ngambek kalau dicolek terus, ngantuk kalau ditinggal), dan ekspresinya mengikuti status produk.
2. **Jujur itu bagian dari desain.** Status produk selalu terlihat sebagai chip berwarna. Tidak ada angka atau testimoni karangan.
3. **Hidup tapi ringan.** Hanya `transform` dan `opacity` yang dianimasikan. Animasi berhenti saat tidak terlihat dan mati total untuk `prefers-reduced-motion`.
4. **Tegas seperti stiker.** Garis tepi 2px (`--edge`), bayangan pejal (`--edge-shadow`) ke bawah, sudut bulat besar.

## Web company vs web produk

| | fusionify.id (company) | Web produk (Premiumify, FUSIONIFY BOT, StudyDate.id, Solutions, dll.) |
| --- | --- | --- |
| Logo | Segel Fi + wordmark FUSIONIFY | Logo produk sendiri (mis. Premiumify memakai segel S biru) |
| Warna, huruf, komponen | Sistem ini | **Sistem ini, sama persis** |
| Maskot | Ya | Boleh, dengan ekspresi yang sesuai status produk |
| Footer | Adegan malam Bogor (khas company) | Footer sederhana `.footer` + badge "Sebuah produk dari FUSIONIFY" |
| Momen khas | Segel menutup hero → Ekosistem, orbit ekosistem, footer Bogor | Boleh punya momen sendiri, dirakit dari bagian yang sama (segel, maskot, gelombang). Jangan menyalin momen khas company apa adanya supaya tiap web tetap punya karakter |

## Warna

| Token | Hex | Pakai untuk |
| --- | --- | --- |
| `--blue` | #0D6CD7 | warna utama, tombol, seksi biru |
| `--blue-deep` | #0261CD | teks tautan, hover |
| `--blue-light` | #539DE9 | titik i, aksen kecil, kursor |
| `--ink` | #0B0F1A | teks, garis tepi, bayangan pejal |
| `--ink-2` / `--ink-3` | #3A4458 / #566175 | teks sekunder / keterangan |
| `--surface` | #EAF4FF | latar seksi selang-seling |
| `--paper` | #F7FBFF | latar halaman |
| `--line` | #D3E4F7 | garis pemisah tipis |
| `--night` | #071022 | footer, area malam |

Chip status: hijau `go` (aktif/live), kuning `beta`, oranye `wip` (dalam pengembangan), biru `plan` (direncanakan/eksperimen), abu `eos` (layanan berakhir).

Jangan menulis warna hex baru di proyek. Kalau butuh warna baru, tambahkan dulu ke `css/tokens.css` di kit ini.

## Mode gelap

Latar malam FUSIONIFY (`#071022`), kartu biru tua (`#10203F`), teks terang (`#EAF3FF`), garis stiker biru redup (`#2E5592`) dengan bayangan pejal hampir hitam. Biru FUSIONIFY sebagai warna isi (tombol, seksi biru, KPI biru) **tidak berubah**; teks biru dibuat lebih terang (`#8CC0FF`) supaya terbaca. Chip status punya pasangan warna gelapnya sendiri. Gaya stiker tetap: garis 2px dan bayangan pejal ke bawah.

Bawaan mengikuti sistem; tombol bulan/matahari menyimpan pilihan pengguna.

## Huruf

Semua berlisensi SIL OFL, di-host sendiri dari `fonts/` (subset latin, `font-display: swap`).

- **Afacad Flux 800**: judul. Rapat (`letter-spacing: -0.02em` sampai `-0.035em`, `line-height: 0.98`).
- **Sansation** 400/700: teks dan UI. Ukuran dasar 17px, `line-height: 1.6`.
- **Caveat**: suara maskot (gelembung bicara, papan, catatan tangan, label kursor).
- **Exo 2**: angka (`tabular-nums`) dan label kecil kapital (kicker, label statistik).
- Preload Afacad Flux dan Sansation 400.

## Logo

- **Segel Fi** (`brand/mark-128|256|512.webp`, sumber resolusi tinggi `brand/fusionify-mark.png` 1024px): favicon, menu, loader, tirai transisi.
- **Wordmark resmi** (`brand/wordmark.svg`, warna #0D6CD7 dan #539DE9): menu. `wordmark-white.svg` untuk latar gelap, `wordmark-mono-white.svg` untuk latar biru.
- **Logo horizontal dan vertikal**, versi terang dan putih: `brand/kit/`.
- **Logo legacy Fusion Tempest VPN** (`brand/kit/fusion-tempest-vpn-logo-legacy.png`) hanya untuk arsip.
- **Badge produk**: `badge/produk-fusionify-{id,en}-{light,dark}.png`, ditaruh di footer web produk dan ditautkan ke https://fusionify.id.
- Jangan mengetik ulang nama FUSIONIFY dengan font sebagai pengganti logo.

## Elemen khas

- **Segel**: lingkaran dengan 12 lekukan (`js/seal.js`, path siap pakai di `snippets/sprite.html`). Dipakai sebagai latar maskot, cincin kursor, bingkai foto, bulan, tirai transisi, dan loader.
- **Titik i**: bulatan `--blue-light` di akhir judul hero (`<span class="dot">.</span>`) dan sebagai titik kursor.
- **Kicker**: label kecil kapital Exo 2 dengan titik biru muda di depannya, di atas setiap judul seksi.
- **Gelombang**: pembatas antar seksi yang warnanya berbeda.
- **Gaya stiker**: `.card`, `.stat`, `.btn`, `.toast` semuanya bergaris 2px `--edge` dengan bayangan pejal `--edge-shadow` ke bawah.

## Ikon

- **Garis 2px**, ujung dan sambungan bulat, kisi 24 × 24, tanpa isi. Tebalnya sama dengan garis stiker.
- **Titik i**: satu bulatan `--blue-light` di tempat yang bermakna (titik huruf i, ujung garis unduh dan grafik, lampu server, notifikasi, lubang label, antena bot). Ikon utilitas kecil (tutup, tambah, chevron, cek) tanpa titik.
- **Lingkaran segel** untuk ikon status (info, berhasil, galat, bantuan, jam) dan matahari; **mata panah melengkung** dengan ekor berakhir di titik i untuk semua panah.
- Garis ikut warna teks; titik tetap biru muda, kecuali `.ikon.polos` (satu warna, mis. di atas foto).
- Wadah: `.ikon-stiker` (ubin bergaris 2px dengan bayangan pejal; putih, biru, atau tint) untuk kartu fitur dan dasbor, `.ikon-segel` untuk kartu layanan.
- Ikon khas: segel (juga ikon setelan), titik i, fusi (dua lingkaran bertemu, "Fuse Ideas"), progres (tangga naik, "Build Progress"), kepala maskot.
- Logo sosmed: satu warna dalam ubin stiker 44px, berubah biru saat disorot. Di footer malam dan seksi biru: garis putih tipis tanpa bayangan.

## Maskot

Karakter chibi rambut putih-biru, hoodie hitam. File di `mascot/`: badan penuh `<ekspresi>.webp` dan `<ekspresi>-420.webp`, kepala `head-<ekspresi>.webp` dan `head-<ekspresi>-120.webp`, papan `sign.webp`, stiker bot `sticker-*.webp`.

| Ekspresi | Kapan |
| --- | --- |
| smile (papan, `sign.webp`) | bawaan hero; papan bisa berganti tulisan |
| shy | kursor mendekat |
| wink / happy | dicolek, notifikasi sukses |
| angry | dicolek berkali-kali |
| tired | lama tanpa gerakan |
| confused | FAQ, 404, produk yang masih dikembangkan |
| cry | produk yang sudah berakhir |
| glasses | layanan profesional, perawatan |
| welcome | layar pertama, selesai daftar |
| loading | proses lama, data sedang disiapkan |
| empty | belum ada data, hasil pencarian kosong |
| paid | pembayaran berhasil |
| pay-failed | pembayaran gagal, kartu ditolak |
| offline | tidak ada internet (halaman offline, `.state.offline`) |

- Ganti ekspresi dengan **menukar gambar badan penuh**. Jangan menempel kepala di atas badan lain karena wajah lama ikut terlihat.
- **Pose baru**: bebas dan hidup (berlari, melompat, jinjit, lebay), jangan kaku. Yang wajib sama: wajah, mata abu tua, rambut putih ujung biru dengan helai mencuat, pipi merah, garis tebal merah tua. Baju bawaan jaket hitam terbuka (kerah dan ujung lengan abu) dengan kaus putih; boleh ganti kalau situasinya butuh. Cara membuat dan memasang pose ada di `mascot/POSE-BARU.md`.
- Gelembung bicara (`.bubble`, Caveat) tidak boleh menutupi wajah, rambut, atau judul.
- Stiker (order, proses, done, batal) hanya untuk obrolan bot.
- Tampil kecil: pakai `-420.webp` / `-120.webp` dengan `srcset`. Semua `<img>` wajib `width` dan `height`.

## Gerak (`js/motion.js`)

- Smooth scroll Lenis (`lerp 0.1`), khusus mouse/trackpad. Layar sentuh (termasuk HP dalam mode "Situs desktop") memakai scroll bawaan browser.
- Nav transparan di atas, berubah jadi kapsul putih blur setelah scroll >24px, sembunyi saat scroll turun, muncul saat scroll naik.
- Menu HP: lingkaran biru membesar dari tombol menu.
- Muncul saat scroll: judul naik per kata (`data-split`), elemen naik dan memudar masuk (`data-reveal`), kartu "dirakit" dari posisi acak (`data-assemble`), angka naik (`data-count-to`).
- Kursor: titik biru muda + cincin segel; membesar dan berputar di atas tautan; label tulisan tangan lewat `data-cursor-label`. Hanya di perangkat bermouse.
- Efek magnet pada tautan kontak besar (`data-magnetic`).
- Tombol salin (`data-copy`) dengan notifikasi maskot (toast, hilang setelah 2,6 detik).
- Transisi halaman: segel biru membesar menutup layar, kepala mengedip, lalu menyusut di halaman baru.
- Suara disintesis Web Audio, **mati secara bawaan**, dinyalakan lewat tombol speaker.

## Aplikasi (dashboard, admin, masuk)

- Sidebar putih/biru tua bergaris stiker; menu aktif berupa kapsul biru dengan bayangan pejal. Di HP sidebar menjadi laci yang meluncur dari kiri.
- Kartu KPI bergaya stiker; satu KPI utama boleh biru penuh. Grafik sederhana dengan gradasi biru muda ke biru.
- Halaman masuk/daftar: panel biru dengan segel besar dan maskot di kiri (wink untuk masuk, happy untuk daftar, confused untuk lupa password, glasses untuk atur ulang), form di kanan. Di HP panel biru menyusut jadi kepala kecil.
- Modal konfirmasi berbahaya memakai maskot confused dan tombol `.btn.danger`.
- Gerak di aplikasi tenang: tanpa smooth scroll, kursor segel, atau reveal. Interaksi cukup transisi pendek.

## Aplikasi HP

- App bar di atas dengan judul besar (Afacad Flux) yang mengecil saat digulir. Navigation bar bawah bergaris stiker di atasnya; tujuan aktif berupa kapsul biru. Mulai 700px berganti jadi rail di kiri.
- FAB biru bergaya stiker (sudut 22px, bayangan pejal), satu per layar, melayang di atas navigation bar dan mengecil jadi ikon saat digulir.
- Bottom sheet dengan pegangan di atas, bisa ditarik ke bawah untuk menutup. Picker tanggal/jam muncul dari bawah di HP dan sebagai popover di layar lebar.
- Loading memakai segel FUSIONIFY yang berputar (`.spinner`), skeleton biru muda untuk isi yang sedang dimuat.
- Snackbar berlatar gelap (terang di mode gelap) dengan tombol aksi seperti "Batalkan".
- Kode OTP: kotak-kotak bergaya stiker berhuruf Exo 2, terbagi 3-3, bergetar pelan kalau salah. Upload: area biru muda bergaris putus-putus, file tampil sebagai kartu stiker dengan pratinjau.
- Chat: gelembung pesan bergaya stiker; pesan sendiri biru di kanan, pesan orang lain kartu di kiri. Indikator mengetik tiga titik.
- Halaman acara: poster persegi bergaya stiker, tanggal dalam ubin kecil, kartu pendaftaran dengan kuota, bar daftar menempel di bawah layar HP.
- Kode OTP: kotak per digit bergaya stiker, dibagi 3-3 dengan tanda pisah; salah = garis merah dan getar pendek (mati saat kurangi gerakan).
- Upload: area bergaris putus-putus biru muda dengan ikon biru; berubah biru saat file diseret di atasnya. Foto tampil sebagai pratinjau kecil.
- Chat: gelembung stiker, pesan sendiri biru di kanan, pesan orang lain kartu di kiri. Di HP isi obrolan layar penuh dan tombol kembali menutupnya. Stiker maskot boleh dikirim sebagai pesan.
- Detail acara: poster biru dengan maskot dan segel, tanggal di kotak `.ev-date`, pendaftaran lewat bottom sheet, tiket berkode setelah terdaftar. Di HP tombol daftar menempel di bawah.
- Stepper: lingkaran bernomor dengan garis putus-putus; langkah aktif biru bergaya stiker, langkah selesai berisi centang dan garisnya jadi utuh.
- Pusat notifikasi: panel stiker dari lonceng (di HP dari bawah), titik biru untuk yang belum dibaca, maskot happy saat semua sudah dibaca.
- Tabel urut: panah kecil di judul kolom; kolom yang aktif berwarna biru.
- Keadaan kosong/error/offline: maskot kecil, judul Afacad, satu kalimat, satu tombol. Error diberi garis putus-putus merah di atas latar merah muda; offline garis putus-putus biasa. Kosong pakai maskot empty, memuat loading, pembayaran paid/pay-failed. Halaman penuh 500 (maskot cry), offline (offline), perawatan (glasses).
- Bilah offline: kapsul kuning di atas layar dengan kepala maskot tired.
- Pemotong foto profil: jendela dengan area kotak bermotif papan catur, lingkaran putus-putus putih sebagai batas potong, slider zoom, tombol putar. Pratinjau foto bulat bergaris stiker.
- Aplikasi native memakai token dari `tokens/` dengan tampilan yang sama: garis 2px, bayangan pejal tanpa blur, huruf yang sama.

## Layout

- Lebar konten maksimal 1240px (`.wrap`) dengan gutter `clamp(16px, 4vw, 48px)`.
- Grid tanpa kartu yatim: 3 kolom di desktop, 2 di tablet (kartu terakhir yang sendirian dibuat lebar penuh), 1 di HP.
- Hero dua kolom mulai 700px; di bawahnya maskot di atas teks.
- Nav lengkap mulai 961px; di bawahnya tombol menu.
- Cover karya/produk rasio 1600:848, screenshot asli. Ilustrasi wajib diberi label `.cover-note` "Ilustrasi".
- Di layar sentuh: magnet, kursor khusus, dan parallax dimatikan.

## Komponen toko dan navigasi web

- **Breadcrumb**: tautan biru tebal dengan pemisah chevron kecil, halaman sekarang tebal warna tinta dan terpotong rapi kalau panjang. Di HP hanya dua tingkat terakhir, diawali "…".
- **Pagination**: angka Exo 2 dalam kotak 44px; halaman aktif berupa kotak biru bergaya stiker. Di HP sempit hanya panah dan halaman aktif.
- **Accordion**: satu kartu stiker berisi beberapa `<details>`, chevron berputar dengan pegas. FAQ halaman publik tetap `.faq`.
- **Input dengan awalan/akhiran**: satu bingkai stiker; awalan (Rp, ikon) dan akhiran (@domain, tombol) berlatar `--surface`.
- **Jumlah**: kapsul stiker dengan tombol − dan + bulat 44px, angka Exo 2 di tengah.
- **Rating**: bintang dari bentuk ikon `bintang`, isi warna `--bintang`, kosong warna `--line`. Bisa pecahan (4,5).
- **Kartu produk**: kartu stiker dengan gambar persegi, label diskon kapsul biru, kategori Exo 2 kapital, judul dua baris, rating, harga biru Exo 2 dengan harga coret abu. Di HP dua kolom. Stok habis: gambar dan tombol meredup.
- **Linimasa**: titik bergaris tinta; langkah selesai biru dengan garis utuh, langkah sekarang biru muda bercahaya, langkah berikutnya garis putus-putus, gagal merah.
- **Hitung mundur**: ubin stiker kecil per satuan (hari, jam, menit, detik), angka Exo 2 tabular.
- **Galeri**: ubin persegi bergaris stiker; lightbox gelap layar penuh dengan tombol bulat tembus pandang, bisa digeser di HP.
- **Pengumuman**: bilah biru penuh di atas halaman, teks putih tebal, tombol tutup bulat.
- **Persetujuan cookie**: kartu stiker mengambang di bawah tengah dengan kepala maskot wink, dua tombol yang sama menonjolnya.

## Dokumen

Surat, invoice, penawaran, kuitansi, proposal, slide, dan spreadsheet memakai sistem yang sama dengan web (template di `dokumen/`).

- **Kop surat**: logo horizontal di kiri, nama PT dan kontak publik rata kanan, garis tinta 2px di bawahnya.
- **Judul** Afacad Flux 800 dengan titik biru muda di akhir; **kicker** Exo 2 kapital bertitik; **teks** Sansation; **angka** Exo 2 tabular; **suara maskot** Caveat dalam gelembung stiker.
- **Tabel**: kepala tabel latar tinta dengan huruf putih Exo 2 kapital, baris selang-seling `--paper`, garis `--line`, bingkai stiker 2px bersudut bulat.
- **Total**: kapsul biru FUSIONIFY bergaya stiker dengan bayangan pejal.
- **Sampul dan slide pembuka/penutup**: latar biru, segel besar biru muda yang terpotong tepi, wordmark putih, maskot badan penuh. Slide bagian dan angka: latar malam.
- **Isian** yang wajib diganti selalu berlatar kuning muda (`--beta-bg`), di HTML, Word, dan Excel.
- Ukuran: A4 tegak untuk surat dan dokumen, A5 mendatar untuk kuitansi, 16:9 untuk slide, A4 mendatar untuk sertifikat, 210×99 mm untuk e-tiket, 90×55 mm untuk kartu nama.
- **Sertifikat**: bingkai stiker bersudut bulat, segel biru muda di pojok, nama penerima besar dengan garis tinta di bawahnya. Bawaan tanpa maskot karena dokumen resmi; maskot happy hanya untuk acara santai (komunitas, kelas internal).
- **E-tiket**: bagian utama biru (judul acara, nama peserta, tanggal, jam, tempat, maskot welcome) dan sobekan putih bergaris putus-putus dengan kode QR dan kode tiket.
- **Kartu nama**: depan biru dengan logo horizontal putih dan tagline, belakang putih dengan nama, jabatan, dan kontak publik.

## Halaman produk yang sering dipakai

- **Bayar QRIS**: satu kolom tenang (maks 480px), kartu stiker berisi jumlah besar Exo 2, kode QR di kotak putih berlabel "QRIS", bilah sisa waktu biru (merah saat sisa <20%), dua tombol. Keadaan berhasil (paid), kedaluwarsa (tired), gagal (pay-failed) menukar isi kartu. Tanpa nama penyedia pembayaran.
- **Status layanan**: banner hijau/kuning/merah bergaya stiker dengan kepala maskot, daftar layanan dengan batang uptime per hari (hijau/kuning/merah), riwayat gangguan berupa garis waktu putus-putus.
- **Dokumentasi**: menu samping dengan item aktif kapsul biru, blok kode berlatar malam bergaris stiker dengan tombol Salin, lencana metode (`GET` hijau, `POST` biru, `PUT/PATCH` kuning, `DELETE` merah), daftar isi kanan yang mengikuti bacaan.
- **Legal**: judul besar, tombol pindah Privasi/Syarat, daftar isi bernomor di kotak `--surface`, bagian bernomor otomatis.

## Grafis media sosial

- Latar biru, kertas (`--paper` dengan cahaya biru muda), atau malam; segel besar terpotong tepi sebagai hiasan.
- Wordmark di kiri atas, kicker bertitik, judul Afacad 800 yang sangat besar dengan titik biru muda, chip status besar bergaris, maskot badan penuh yang boleh terpotong tepi bawah atau kanan.
- Daftar bernomor berupa kartu stiker dengan lingkaran biru; gelembung bicara Caveat.
- Tidak ada teks di bawah maskot, foto stok, gradien ungu, atau emoji sebagai hiasan.

## Email

- Latar `--paper`, satu kartu putih bergaris tinta 2px dengan "bayangan" `border-bottom` 6px, sudut 24px.
- Logo di atas kartu; kicker Exo 2 kapital bertitik; judul Afacad 800 dengan titik biru muda; maskot kecil (110×138) di kanan judul, disembunyikan di HP.
- Rincian dalam tabel stiker; tombol kapsul biru bergaris tinta; catatan berlatar warna nada (`info`, `ok`, `warn`, `danger`); kode OTP dalam kotak stiker Exo 2.
- Kaki: nama PT dan kontak publik, badge "Sebuah produk dari FUSIONIFY" untuk email produk.
- Tanda tangan email: segel Fi 56px, garis biru muda, nama Afacad dengan titik, jabatan Exo 2 kapital biru, kontak publik, nama PT. Tanpa gambar besar, kutipan, atau banner promosi.

## Batas

- Semua kode ditulis sendiri. Jangan meniru situs lain, khususnya andikadevs: tidak ada maskot terbang ke pojok nav, pintu di huruf wordmark, tumpukan awan, atau laut dan kapal.
- Jangan memakai template UI generik (gradien ungu, kartu kaca, ikon emoji sebagai hiasan utama). Kalau terasa seperti template, berarti belum FUSIONIFY.

---

## Kode: `css/tokens.css`

```css
/* FUSIONIFY UI · tokens.css
   Warna, huruf, radius, dan kurva gerak resmi. Sama persis dengan fusionify.id.
   Jangan menambah warna hex baru di proyek; pakai variabel di bawah. */

/* Font di-host sendiri, subset latin, lisensi SIL OFL. Path relatif ke file ini. */
@font-face { font-family: "Afacad Flux Variable"; font-style: normal; font-display: swap; font-weight: 100 1000; src: url(../fonts/afacad-flux-latin-wght-normal.woff2) format("woff2-variations"); }
@font-face { font-family: "Sansation"; font-style: normal; font-display: swap; font-weight: 400; src: url(../fonts/sansation-latin-400-normal.woff2) format("woff2"); }
@font-face { font-family: "Sansation"; font-style: normal; font-display: swap; font-weight: 700; src: url(../fonts/sansation-latin-700-normal.woff2) format("woff2"); }
@font-face { font-family: "Caveat Variable"; font-style: normal; font-display: swap; font-weight: 400 700; src: url(../fonts/caveat-latin-wght-normal.woff2) format("woff2-variations"); }
@font-face { font-family: "Exo 2 Variable"; font-style: normal; font-display: swap; font-weight: 100 900; src: url(../fonts/exo-2-latin-wght-normal.woff2) format("woff2-variations"); }

:root {
  /* Biru FUSIONIFY */
  --blue: #0d6cd7;        /* warna utama, tombol, seksi biru */
  --blue-deep: #0261cd;   /* teks tautan, hover */
  --blue-light: #539de9;  /* titik huruf i, aksen kecil, kursor */

  /* Tinta dan latar */
  --ink: #0b0f1a;         /* teks, garis tepi, bayangan pejal */
  --ink-2: #3a4458;       /* teks sekunder */
  --ink-3: #566175;       /* keterangan */
  --surface: #eaf4ff;     /* latar seksi selang-seling */
  --paper: #f7fbff;       /* latar halaman */
  --white: #ffffff;
  --line: #d3e4f7;
  --night: #071022;       /* footer malam */

  /* Chip status produk (wajib jujur) */
  --go: #157f3b;   --go-bg: #e3f6e9;    /* aktif / live */
  --beta: #9a5b00; --beta-bg: #fff2d8;  /* beta */
  --wip: #8a4a00;  --wip-bg: #ffe9d6;   /* dalam pengembangan */
  --plan: #0261cd; --plan-bg: #eef7ff;  /* direncanakan / eksperimen */
  --eos: #5b6475;  --eos-bg: #eceff4;   /* layanan berakhir */

  /* Huruf */
  --f-head: "Afacad Flux Variable", "Afacad Flux", system-ui, sans-serif; /* judul, tebal 800 */
  --f-body: "Sansation", system-ui, sans-serif;                          /* teks dan UI */
  --f-hand: "Caveat Variable", "Caveat", cursive;                         /* suara maskot */
  --f-num: "Exo 2 Variable", "Exo 2", system-ui, sans-serif;              /* angka dan label */

  /* Bentuk dan ukuran */
  --r-s: 10px;
  --r-m: 18px;
  --r-l: 28px;
  --r-pill: 999px;

  /* Jarak (sama dengan library Figma: jarak/xs sampai jarak/2xl) */
  --sp-xs: 4px; --sp-s: 8px; --sp-m: 12px; --sp-l: 16px; --sp-xl: 24px; --sp-2xl: 32px;
  --edge-width: 2px;   /* tebal garis stiker */
  --touch-min: 44px;   /* target sentuh minimal */
  --gut: clamp(16px, 4vw, 48px);
  --max: 1240px;

  /* Gerak */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ---- Token tema (berubah di mode gelap). Komponen WAJIB memakai ini, bukan #fff / var(--ink) langsung ---- */
  --card: #ffffff;               /* permukaan kartu, input, gelembung */
  --field: #ffffff;              /* latar input form */
  --surface-2: #dcecff;          /* hover tombol ikon, baris aktif */
  --edge: var(--ink);            /* garis tepi stiker 2px */
  --edge-shadow: var(--ink);     /* bayangan pejal stiker */
  --text-blue: #0d6cd7;          /* teks biru (kicker, angka besar) */
  --text-blue-deep: #0261cd;     /* teks tautan */
  --inverse-bg: #0b0f1a;         /* label gelap di atas halaman terang (kursor, skip link) */
  --inverse-fg: #ffffff;
  --inverse-accent: #8cc0ff;    /* tombol aksi di atas label gelap (snackbar) */
  --nav-glass: rgba(255, 255, 255, 0.82);
  --hero-glow: #dcedff;          /* cahaya radial di hero */
  --seal-tint: #d8eaff;          /* segel di belakang maskot */
  --danger: #b4232c; --danger-bg: #fde8ea;
  --placeholder: #707a8c;
  --bintang: #f0a800;            /* isi bintang rating */

  /* Bayangan */
  --shadow: 0 1px 0 rgba(13, 108, 215, 0.06), 0 12px 32px -14px rgba(11, 15, 26, 0.18);
  --shadow-pop: 0 3px 0 var(--edge-shadow);      /* tombol */
  --shadow-sticker: 0 6px 0 var(--edge-shadow);  /* kartu bergaya stiker */

  color-scheme: light;
}

/* =========================================================
   MODE GELAP
   - Otomatis mengikuti sistem, kecuali pengguna memilih sendiri (html[data-theme]).
   - Web yang ingin tetap terang: <html data-theme="light"> dan jangan pasang tombol tema.
   - Biru FUSIONIFY (--blue, --blue-deep, --blue-light) TIDAK berubah sebagai warna isi;
     teks biru memakai --text-blue / --text-blue-deep yang dibuat lebih terang.
   ========================================================= */
:root[data-theme="dark"] {
  --ink: #eaf3ff; --ink-2: #c3d4ea; --ink-3: #9db2cf;
  --paper: #071022; --surface: #0c1a33; --line: #1f3459; --white: #0f2040;
  --card: #10203f; --field: #0b1830; --surface-2: #17305a;
  --edge: #2e5592; --edge-shadow: #02060f;
  --text-blue: #8cc0ff; --text-blue-deep: #a9d0ff;
  --inverse-bg: #eaf3ff; --inverse-fg: #071022; --inverse-accent: #0261cd;
  --nav-glass: rgba(10, 22, 44, 0.82);
  --hero-glow: #0f2a55; --seal-tint: #15315c;
  --go: #7fe0a6; --go-bg: #0f3324; --beta: #ffd27a; --beta-bg: #3a2a08;
  --wip: #ffb98a; --wip-bg: #3c220e; --plan: #a9d0ff; --plan-bg: #10264a;
  --eos: #b5c0d0; --eos-bg: #1c2638; --danger: #ff9ba1; --danger-bg: #3d1418;
  --placeholder: #8597b3; --footer-top: #1f3459; --bintang: #ffc93d;
  --shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 12px 32px -14px rgba(0, 0, 0, 0.6);
  color-scheme: dark;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ink: #eaf3ff; --ink-2: #c3d4ea; --ink-3: #9db2cf;
    --paper: #071022; --surface: #0c1a33; --line: #1f3459; --white: #0f2040;
    --card: #10203f; --field: #0b1830; --surface-2: #17305a;
    --edge: #2e5592; --edge-shadow: #02060f;
    --text-blue: #8cc0ff; --text-blue-deep: #a9d0ff;
    --inverse-bg: #eaf3ff; --inverse-fg: #071022; --inverse-accent: #0261cd;
    --nav-glass: rgba(10, 22, 44, 0.82);
    --hero-glow: #0f2a55; --seal-tint: #15315c;
    --go: #7fe0a6; --go-bg: #0f3324; --beta: #ffd27a; --beta-bg: #3a2a08;
    --wip: #ffb98a; --wip-bg: #3c220e; --plan: #a9d0ff; --plan-bg: #10264a;
    --eos: #b5c0d0; --eos-bg: #1c2638; --danger: #ff9ba1; --danger-bg: #3d1418;
    --placeholder: #8597b3; --footer-top: #1f3459; --bintang: #ffc93d;
    --shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 12px 32px -14px rgba(0, 0, 0, 0.6);
    color-scheme: dark;
  }
}

/* Tampilkan elemen hanya di tema tertentu (mis. logo terang vs logo putih) */
:root[data-theme="dark"] .only-light { display: none !important; }
:root[data-theme="light"] .only-dark, :root:not([data-theme]) .only-dark { display: none !important; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .only-light { display: none !important; }
  :root:not([data-theme]) .only-dark { display: revert !important; }
}

```

---

## Kode: `css/base.css`

```css
/* FUSIONIFY UI · base.css
   Reset ringan, tipografi, dan utilitas dasar. Butuh tokens.css. */

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: auto; background: var(--paper); overflow-x: clip; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
/* Kunci scroll di layar sentuh (menu terbuka), dipasang lockScroll() dari motion.js */
html.scroll-lock, html.scroll-lock body { overflow: hidden; }
body {
  margin: 0;
  font-family: var(--f-body);
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink);
  background: var(--paper);
  overflow-x: hidden; /* cadangan Safari < 16 */
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
}
img, svg { display: block; max-width: 100%; }
img { height: auto; }
/* Hiasan yang SENGAJA lebih besar dari wadahnya (segel, cincin, bulan, gelombang) wajib pakai kelas ini.
   Tanpa itu, aturan svg { max-width: 100% } membuatnya mengecil dan bergeser ke kiri atas. */
.fx-oversize, .cursor svg, .veil svg, .loader svg, .wave svg, .person .ph .ring { max-width: none; }
a { color: inherit; }
button { font: inherit; color: inherit; }
::selection { background: var(--blue); color: #fff; }
:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 3px; border-radius: 6px; }

h1, h2, h3, h4 { font-family: var(--f-head); font-weight: 800; line-height: 0.98; letter-spacing: -0.02em; margin: 0; }
p { margin: 0; }

.wrap { width: min(100% - var(--gut) * 2, var(--max)); margin-inline: auto; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.skip { position: fixed; left: 12px; top: -60px; z-index: 200; background: var(--inverse-bg); color: var(--inverse-fg); padding: 10px 14px; border-radius: 10px; text-decoration: none; }
.skip:focus { top: 12px; }
.nowrap { white-space: nowrap; }

.num { font-family: var(--f-num); font-variant-numeric: tabular-nums; }
.hand { font-family: var(--f-hand); font-weight: 600; }

/* Label kecil di atas judul seksi, dengan titik biru muda */
.kicker {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--f-num); font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--text-blue);
}
.kicker::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--blue-light); box-shadow: 0 0 0 4px rgba(83, 157, 233, 0.22); }

/* Judul besar. Tambahkan <span class="dot">.</span> di akhir untuk titik biru muda khas FUSIONIFY. */
.h-hero { font-size: clamp(54px, 9vw, 128px); letter-spacing: -0.035em; }
.h-sec { font-size: clamp(40px, 6.4vw, 84px); margin-top: 14px; max-width: 18ch; text-wrap: balance; }
.h-hero .dot, .h-sec .dot { color: var(--blue-light); }
.lead { font-size: clamp(17px, 1.4vw, 20px); color: var(--ink-2); max-width: 56ch; }

/* Teks panjang (artikel, legal) */
.prose { max-width: 70ch; font-size: 18px; color: var(--ink-2); }
.prose h2 { font-size: 36px; color: var(--ink); margin: 40px 0 12px; }
.prose h3 { font-size: 26px; color: var(--ink); margin: 28px 0 10px; }
.prose p, .prose ul, .prose ol { margin: 0 0 16px; }
.prose ul { padding-left: 1.2em; } .prose li { margin-bottom: 8px; }
.prose a { color: var(--text-blue-deep); overflow-wrap: anywhere; }

/* Pergantian tema: warna berpindah halus sebentar, hanya saat tombol ditekan */
.theme-switching, .theme-switching *, .theme-switching *::before, .theme-switching *::after { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important; }

/* Gerak dimatikan: hormati pilihan pengguna. Konten yang biasanya muncul lewat animasi WAJIB langsung tampil. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
  .js [data-reveal] { opacity: 1 !important; transform: none !important; }
  .js .split .w > span { transform: none !important; }
}

/* Layar sangat kecil: judul panjang boleh patah, tidak boleh meluber */
.split .w { max-width: 100%; }
.h-hero, .h-sec, .page-hero h1 { overflow-wrap: anywhere; }
@media (max-width: 420px) {
  .h-sec { font-size: clamp(30px, 9.2vw, 40px); }
}

/* Scrollbar FUSIONIFY: kapsul biru bergradasi di atas track surface, tanpa tombol panah */
::-webkit-scrollbar { width: 14px; height: 14px; }
::-webkit-scrollbar-track { background: var(--surface); }
::-webkit-scrollbar-thumb { background: linear-gradient(180deg, var(--blue-light) 0%, var(--blue) 55%, var(--blue-deep) 100%); border-radius: 999px; border: 3px solid var(--surface); min-height: 48px; }
::-webkit-scrollbar-thumb:hover { background: var(--blue-deep); }
::-webkit-scrollbar-thumb:active { background: var(--ink); }
::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
::-webkit-scrollbar-corner { background: var(--surface); }
.drawer::-webkit-scrollbar, .table-wrap::-webkit-scrollbar { width: 8px; height: 8px; }
/* Firefox (Chrome mengabaikan ::-webkit-scrollbar kalau scrollbar-color diisi, jadi dibatasi di sini) */
@supports not selector(::-webkit-scrollbar) {
  html { scrollbar-color: var(--blue) var(--surface); scrollbar-width: thin; }
}

/* Layar sentuh (HP, tablet, aplikasi WebView)
   - iOS memperbesar halaman kalau teks input di bawah 16px, jadi di layar sentuh semua input minimal 16px
   - touch-action: manipulation menghapus jeda ketuk ganda di tombol dan tautan */
a, button, [role="button"], label, summary { touch-action: manipulation; }
@media (hover: none) and (pointer: coarse) {
  input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), select, textarea { font-size: 16px !important; }
}

```

---

## Kode: `css/components.css`

```css
/* FUSIONIFY UI · components.css
   Komponen siap pakai, diambil dari fusionify.id. Butuh tokens.css + base.css.
   Markup contoh untuk setiap komponen ada di demo/index.html. */

/* =========================================================
   TOMBOL · kapsul bergaris tinta dengan bayangan pejal
   <a class="btn">Konsultasi</a>  <a class="btn ghost">Lihat karya</a>
   ========================================================= */
.btn {
  --bg: var(--blue); --fg: #fff;
  position: relative; display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 22px; border-radius: 999px; border: 2px solid var(--edge);
  background: var(--bg); color: var(--fg); text-decoration: none; font-weight: 700; font-size: 16px;
  box-shadow: var(--shadow-pop); cursor: pointer;
  transition: transform 0.35s var(--spring), box-shadow 0.35s var(--spring), background 0.2s;
}
.btn:hover { transform: translateY(-3px); box-shadow: 0 6px 0 var(--edge-shadow); }
.btn:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--edge-shadow); }
.btn.ghost { --bg: var(--card); --fg: var(--ink); }
.btn.sm { padding: 10px 18px; font-size: 15px; }
.btn svg { width: 18px; height: 18px; }

/* Tombol ikon bulat (suara, menu) */
.icon-btn { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; background: var(--surface); border: 0; cursor: pointer; transition: transform 0.3s var(--spring), background 0.2s; }
.icon-btn:hover { transform: scale(1.08); background: var(--surface-2); }
.icon-btn svg { width: 20px; height: 20px; }

/* =========================================================
   TOMBOL TEMA (dipakai di web publik dan aplikasi)
   ========================================================= */
.theme-btn { color: var(--ink-2); }
.theme-btn .sun { display: none; }
:root[data-theme="dark"] .theme-btn .sun { display: block; }
:root[data-theme="dark"] .theme-btn .moon { display: none; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .theme-btn .sun { display: block; }
  :root:not([data-theme]) .theme-btn .moon { display: none; }
}

/* =========================================================
   CHIP STATUS · status produk WAJIB jujur
   <span class="chip go">Aktif</span> beta | wip | plan | eos
   ========================================================= */
.chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 11px; border-radius: 999px; font-size: 12.5px; font-weight: 700; font-family: var(--f-num); letter-spacing: 0.02em; white-space: nowrap; }
.chip::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.chip.go { color: var(--go); background: var(--go-bg); }
.chip.beta { color: var(--beta); background: var(--beta-bg); }
.chip.wip { color: var(--wip); background: var(--wip-bg); }
.chip.plan { color: var(--plan); background: var(--plan-bg); }
.chip.eos { color: var(--eos); background: var(--eos-bg); }

/* =========================================================
   NAVIGASI · transparan di atas, jadi kapsul putih setelah scroll
   motion.js memasang .scrolled (>24px) dan .hide (scroll turun)
   ========================================================= */
.nav {
  position: fixed; inset: 14px var(--gut) auto; z-index: 60;
  display: flex; align-items: center; gap: 10px; justify-content: space-between;
  padding: 10px 0; border-radius: 999px;
  background: rgba(255, 255, 255, 0); border: 1px solid transparent; box-shadow: 0 10px 30px -18px rgba(11, 15, 26, 0);
  transition: transform 0.5s var(--ease), background-color 0.4s var(--ease), border-color 0.4s var(--ease), box-shadow 0.4s var(--ease), padding 0.4s var(--ease), top 0.4s var(--ease);
  max-width: var(--max); margin-inline: auto; top: 20px;
}
.nav.scrolled, html:not(.js) .nav, .fx-off .nav {
  top: 14px; padding: 8px 8px 8px 14px;
  background: var(--nav-glass); backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4);
  border-color: rgba(13, 108, 215, 0.14);
  box-shadow: 0 10px 30px -18px rgba(11, 15, 26, 0.35);
}
.nav.hide { transform: translateY(-140%); }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.brand-mark { width: 34px; height: 34px; transition: transform 0.7s var(--spring); }
.brand:hover .brand-mark { transform: rotate(-200deg) scale(1.06); }
.brand-word { width: auto; height: 19px; }
.nav-links { display: flex; gap: 4px; list-style: none; margin: 0; padding: 0; }
.nav-links a { display: block; padding: 8px 14px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 15px; color: var(--ink-2); transition: background 0.2s, color 0.2s; }
.nav-links a:hover, .nav-links a[aria-current="true"], .nav-links a[aria-current="page"] { background: var(--surface); color: var(--text-blue-deep); }
.nav-tools { display: flex; align-items: center; gap: 6px; }
.nav .btn { padding: 10px 18px; font-size: 15px; }
.lang { display: inline-flex; align-items: center; gap: 4px; height: 42px; font-family: var(--f-num); font-size: 13px; text-decoration: none; padding: 0 14px; border-radius: 999px; background: var(--surface); color: var(--ink-3); transition: background 0.2s; }
.lang:hover { background: var(--surface-2); }
.lang b { font-weight: 600; } .lang b.on { color: var(--text-blue-deep); font-weight: 800; } .lang i { font-style: normal; opacity: 0.4; }
.sound-btn { color: var(--ink-3); }
.sound-btn .w1, .sound-btn .w2 { opacity: 0; transition: opacity 0.2s; }
.sound-btn[aria-pressed="true"] { color: var(--text-blue); }
.sound-btn[aria-pressed="true"] .x { opacity: 0; }
.sound-btn[aria-pressed="true"] .w1 { opacity: 1; animation: fy-wave 1.2s ease-in-out infinite; }
.sound-btn[aria-pressed="true"] .w2 { opacity: 1; animation: fy-wave 1.2s ease-in-out -0.4s infinite; }
@keyframes fy-wave { 50% { opacity: 0.35; } }
.menu-btn { display: none; }
.menu-btn path { transition: transform 0.35s var(--ease), opacity 0.2s; transform-origin: 12px 12px; }
.menu-btn[aria-expanded="true"] .l1 { transform: translateY(4px) rotate(45deg); }
.menu-btn[aria-expanded="true"] .l2 { transform: translate(-3px, -4px) rotate(-45deg) scaleX(1.6); }
/* Menu layar penuh di HP: lingkaran biru membesar dari tombol menu */
.drawer {
  position: fixed; inset: 0; z-index: 55; background: var(--blue); color: #fff;
  clip-path: circle(0% at calc(100% - 46px) 46px); transition: clip-path 0.7s var(--ease);
  display: grid; align-content: center; padding: 90px var(--gut) 40px; visibility: hidden;
}
.drawer.open { clip-path: circle(150% at calc(100% - 46px) 46px); visibility: visible; }
.drawer ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
.drawer a { font-family: var(--f-head); font-weight: 800; font-size: clamp(40px, 11vw, 64px); text-decoration: none; display: inline-block; }
.drawer .drawer-mascot { position: absolute; right: 16px; bottom: 16px; width: 120px; }
@media (max-width: 960px) { .nav-links, .nav .btn { display: none; } .menu-btn { display: grid; } }
@media (max-width: 420px) { .nav { gap: 6px; padding-left: 10px; } .nav-tools { gap: 4px; } .lang { padding: 0 10px; } .icon-btn { width: 38px; height: 38px; } }
@media (max-width: 350px) { .brand-word { display: none; } }

/* =========================================================
   SEKSI · putih (bawaan), .tint (biru sangat muda), .blue (biru penuh)
   ========================================================= */
.sec { position: relative; padding: clamp(80px, 11vw, 150px) 0; overflow-x: clip; }
.sec-head { display: grid; gap: 18px; margin-bottom: clamp(40px, 6vw, 70px); }
.sec.tint { background: var(--surface); }
.sec.blue { background: var(--blue); color: #fff; }
.sec.blue .kicker { color: #fff; }
.sec.blue .lead { color: #f2f8ff; }
.page-hero { padding: 150px 0 60px; background: radial-gradient(120% 80% at 80% 0%, var(--hero-glow) 0%, var(--paper) 60%); }
.page-hero h1 { font-size: clamp(48px, 8vw, 110px); margin: 16px 0 20px; }
.crumbs { display: flex; gap: 8px; font-size: 14px; color: var(--ink-3); }
.crumbs a { color: var(--text-blue-deep); }

/* =========================================================
   KARTU STIKER · garis 2px tinta, bayangan pejal, sudut besar
   ========================================================= */
.card { position: relative; padding: 26px; border-radius: var(--r-l); background: var(--card); color: var(--ink); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); }
.card.blue { background: var(--blue); color: #fff; }
.card.tint { background: var(--surface); }
.card h3 { font-size: 26px; margin-bottom: 6px; }
.card p { font-size: 15px; color: var(--ink-2); }
.card.blue p { color: #f2f8ff; }
a.card { text-decoration: none; transition: transform 0.35s var(--spring), box-shadow 0.35s var(--spring); }
a.card:hover { transform: translateY(-4px); box-shadow: 0 10px 0 var(--edge-shadow); }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
@media (max-width: 1000px) { .grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } .grid-3 > :last-child:nth-child(odd) { grid-column: 1 / -1; } }
@media (max-width: 620px) { .grid-3, .grid-2 { grid-template-columns: 1fr; } }

/* Angka besar (hanya angka yang bisa dibuktikan) */
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.stat { position: relative; padding: 26px; border-radius: var(--r-l); background: var(--card); color: var(--ink); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); min-height: 230px; display: grid; align-content: space-between; gap: 18px; overflow: hidden; }
.stat:first-child { grid-column: span 2; }
.stat:nth-child(3n+2) { background: var(--blue); color: #fff; }
/* Teks terang di atas biru wajib kontras >= 4.5:1, jadi tanpa opacity */
.stat:nth-child(3n+2) .lab, .stat:nth-child(3n+2) p { opacity: 1; color: #f2f8ff; }
.stat:nth-child(3n+3) { background: var(--surface); }
.stat .v { font-family: var(--f-num); font-weight: 800; font-size: clamp(54px, 6vw, 76px); line-height: 0.9; letter-spacing: -0.03em; }
.stat .lab { font-family: var(--f-num); font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.75; }
@media (max-width: 1000px) { .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .stats { grid-template-columns: 1fr; } .stat:first-child { grid-column: auto; } .stat { min-height: 0; } }

/* Kartu karya / produk dengan cover 1600:848 (screenshot asli; ilustrasi wajib diberi label) */
.works { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 34px 24px; }
.work { text-decoration: none; display: grid; gap: 14px; align-content: start; }
.work .cover { position: relative; border-radius: var(--r-l); overflow: hidden; border: 2px solid var(--edge); aspect-ratio: 1600 / 848; background: var(--surface); }
.work .cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); }
.work:hover .cover img { transform: scale(1.06); }
.work .meta { display: flex; justify-content: space-between; gap: 12px; align-items: flex-end; }
.work .meta .chip { margin-bottom: 8px; }
.work h3 { font-size: clamp(26px, 2.4vw, 34px); margin-bottom: 4px; }
.work .cat { color: var(--ink-3); font-size: 14.5px; }
.work .arrow { width: 40px; height: 40px; flex: none; border-radius: 50%; border: 2px solid var(--edge); display: grid; place-items: center; transition: transform 0.4s var(--spring), background 0.2s; }
.work:hover .arrow { transform: rotate(-45deg); background: var(--blue); color: #fff; }
.cover-note { position: absolute; right: 12px; bottom: 12px; padding: 4px 10px; border-radius: 999px; background: rgba(11, 15, 26, 0.72); color: #fff; font-family: var(--f-num); font-size: 11.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
@media (max-width: 1000px) { .works { grid-template-columns: repeat(2, minmax(0, 1fr)); } .work:last-child:nth-child(odd) { grid-column: 1 / -1; } }
@media (max-width: 620px) { .works { grid-template-columns: 1fr; } }

/* Foto orang dalam bingkai segel. Butuh <clipPath id="seal-clip"> dari sprite (lihat demo). */
.person { display: grid; gap: 12px; text-align: center; justify-items: center; }
.person .ph { position: relative; width: 100%; max-width: 210px; aspect-ratio: 1; }
.person .ph .ring { position: absolute; inset: -5%; color: var(--blue-light); transition: transform 1.2s var(--ease); }
.person:hover .ph .ring { transform: rotate(90deg) scale(1.03); }
.person .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; clip-path: url(#seal-clip); background: var(--surface); transition: transform 0.6s var(--spring); }
.person:hover .ph img { transform: scale(1.04); }
.person h3 { font-size: 22px; line-height: 1.1; }
.person p { font-size: 14.5px; color: var(--ink-3); }

/* =========================================================
   MASKOT · gelembung bicara dan panggung segel
   Ganti ekspresi dengan MENUKAR GAMBAR BADAN PENUH, jangan menempel kepala.
   ========================================================= */
.bubble {
  position: relative; display: inline-block; white-space: nowrap;
  background: var(--card); border: 2px solid var(--edge); border-radius: 22px; padding: 10px 16px 12px;
  font-family: var(--f-hand); font-weight: 600; font-size: 25px; line-height: 1.05; color: var(--ink); box-shadow: var(--shadow-pop);
  transform-origin: 90% 100%;
}
.bubble::after { content: ""; position: absolute; right: 26px; bottom: -11px; width: 18px; height: 18px; background: var(--card); border-right: 2px solid var(--edge); border-bottom: 2px solid var(--edge); transform: rotate(45deg) skew(8deg, 8deg); }
.bubble.left::after { right: auto; left: 22px; }
.bubble.pop { animation: fy-pop 0.45s var(--spring); }
@keyframes fy-pop { 0% { transform: scale(0.6) rotate(-6deg); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.mascot-stage { position: relative; width: min(100%, 420px); aspect-ratio: 1; display: grid; place-items: end center; }
.mascot-stage .seal-bg { position: absolute; inset: 4% -4% 8%; color: var(--seal-tint); animation: fy-spin 40s linear infinite; max-width: none; }
.mascot-stage .seal-ring { position: absolute; inset: -2% -10% 2%; color: transparent; stroke: var(--blue-light); opacity: 0.5; animation: fy-spin 60s linear infinite reverse; max-width: none; }
.mascot-stage .body { position: relative; width: 78%; animation: fy-bob 4.2s ease-in-out infinite; transform-origin: 50% 100%; }
@keyframes fy-spin { to { transform: rotate(360deg); } }
@keyframes fy-bob { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-10px) rotate(-1deg); } }

/* =========================================================
   PARTNER BERJALAN, FAQ
   ========================================================= */
.marquee { overflow: hidden; border-block: 2px solid var(--edge); background: var(--card); padding: 22px 0; }
.marquee .row { display: flex; width: max-content; gap: 56px; animation: fy-slide 30s linear infinite; }
.marquee:hover .row { animation-play-state: paused; }
.marquee .item { display: flex; align-items: center; gap: 14px; font-family: var(--f-head); font-weight: 800; font-size: clamp(28px, 4vw, 48px); white-space: nowrap; }
.marquee .item small { font-family: var(--f-body); font-weight: 400; font-size: 14px; color: var(--ink-3); }
.marquee .item img { width: 34px; height: 34px; }
@keyframes fy-slide { to { transform: translateX(-50%); } }

.faq details { border-bottom: 2px solid var(--line); }
.faq summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; gap: 20px; align-items: center; padding: 22px 0; font-family: var(--f-head); font-weight: 800; font-size: clamp(22px, 2.2vw, 28px); line-height: 1.15; }
.faq summary::-webkit-details-marker { display: none; }
.faq summary .pm { flex: none; width: 38px; height: 38px; border-radius: 50%; background: var(--surface); position: relative; transition: transform 0.4s var(--spring), background 0.2s; }
.faq summary .pm::before, .faq summary .pm::after { content: ""; position: absolute; left: 50%; top: 50%; width: 14px; height: 2.5px; margin: -1.25px 0 0 -7px; background: var(--text-blue-deep); border-radius: 2px; }
.faq summary .pm::after { transform: rotate(90deg); transition: transform 0.3s var(--ease); }
.faq details[open] summary .pm { background: var(--blue); transform: rotate(180deg); }
.faq details[open] summary .pm::before, .faq details[open] summary .pm::after { background: #fff; }
.faq details[open] summary .pm::after { transform: rotate(0); }
.faq .ans { padding: 0 0 24px; color: var(--ink-2); max-width: 70ch; }

/* =========================================================
   PEMBATAS GELOMBANG · antar seksi berwarna beda
   ========================================================= */
.wave { position: relative; z-index: 2; height: 90px; margin: -1px 0; color: var(--text-blue); overflow-x: clip; }
.wave svg { position: absolute; inset: 0; width: 100%; height: 100%; }

/* =========================================================
   FOOTER SEDERHANA (untuk web produk). Footer adegan malam Bogor khusus fusionify.id.
   ========================================================= */
.footer { background: var(--night); color: #dbe9fb; padding: 56px 0 28px; box-shadow: inset 0 1px 0 var(--footer-top, transparent); }
.fcols { display: grid; grid-template-columns: 1.3fr 1fr 1fr 1fr; gap: 30px; margin-bottom: 40px; }
.fcols .fh { font-family: var(--f-num); font-weight: 700; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue-light); margin-bottom: 14px; }
.fcols ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.fcols a { text-decoration: none; color: #dbe9fb; overflow-wrap: anywhere; }
.fcols a:hover { color: #fff; text-decoration: underline; text-underline-offset: 4px; }
.fcols p { color: #9fb3cd; font-size: 15px; max-width: 34ch; }
.fbar { display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center; border-top: 1px solid #1d2b45; padding-top: 22px; font-size: 14px; color: #8296b2; }
.fbar a { color: #b9cbe3; }
.to-top { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 999px; border: 1px solid #2a3b5c; text-decoration: none; font-weight: 700; transition: background 0.2s, color 0.2s, transform 0.3s var(--spring); }
.to-top svg { width: 16px; height: 16px; transition: transform 0.3s var(--spring); }
.to-top:hover { background: var(--blue); border-color: var(--text-blue); color: #fff; }
.to-top:hover svg { transform: translateY(-3px); }
/* Badge "Sebuah produk dari FUSIONIFY" di footer web produk */
.fy-badge { display: inline-block; line-height: 0; transition: transform 0.3s var(--spring); }
.fy-badge img { height: 44px; width: auto; }
.fy-badge:hover { transform: translateY(-2px); }
@media (max-width: 860px) { .fcols { grid-template-columns: 1fr 1fr; } .fcols > div:first-child { grid-column: 1 / -1; } }

/* =========================================================
   NOTIFIKASI (toast) · kapsul putih dengan kepala maskot
   ========================================================= */
.toast {
  position: fixed; left: 50%; bottom: 24px; z-index: 320; display: flex; align-items: center; gap: 10px;
  padding: 8px 18px 8px 8px; border-radius: 999px; background: var(--card); border: 2px solid var(--edge); box-shadow: 0 4px 0 var(--edge-shadow);
  font-weight: 700; font-size: 15px; transform: translate(-50%, 160%); opacity: 0; pointer-events: none;
  transition: transform 0.5s var(--spring), opacity 0.25s;
}
.toast img { width: 40px; height: auto; border-radius: 50%; background: var(--surface); }
.toast.show { transform: translate(-50%, 0); opacity: 1; }

/* =========================================================
   KURSOR SEGEL (hanya perangkat dengan mouse; motion.js memasang .has-cursor)
   ========================================================= */
.cursor { position: fixed; left: 0; top: 0; z-index: 300; pointer-events: none; display: none; opacity: 0; transition: opacity 0.25s; }
.cursor.ready { opacity: 1; }
.has-cursor .cursor { display: block; }
.has-cursor, .has-cursor a, .has-cursor button, .has-cursor summary { cursor: none; }
.has-cursor input, .has-cursor textarea { cursor: text; }
.cursor .dot { position: absolute; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 50%; background: var(--blue-light); box-shadow: 0 0 0 2px #fff; }
.cursor .ring { position: absolute; width: 44px; height: 44px; margin: -22px 0 0 -22px; transition: width 0.35s var(--spring), height 0.35s var(--spring), margin 0.35s var(--spring); }
.cursor .ring svg { width: 100%; height: 100%; overflow: visible; color: var(--text-blue); }
.cursor .ring svg path { fill: none; stroke: currentColor; stroke-width: 1.6; vector-effect: non-scaling-stroke; transition: fill 0.3s; }
.cursor.link .ring { width: 70px; height: 70px; margin: -35px 0 0 -35px; }
.cursor.link .ring svg { animation: fy-spin 4s linear infinite; }
.cursor.link .ring svg path { fill: rgba(83, 157, 233, 0.18); }
.cursor .label { position: absolute; left: 0; top: 0; will-change: translate; padding: 4px 10px; border-radius: 999px; background: var(--inverse-bg); color: var(--inverse-fg); font-family: var(--f-hand); font-size: 20px; line-height: 1; white-space: nowrap; transform: scale(0); transform-origin: 0 0; transition: transform 0.3s var(--spring); }
.cursor.labelled .label { transform: scale(1); }
.cursor.down .ring { transform: scale(0.8); }
.cursor.dark .ring svg { color: #fff; }

/* =========================================================
   TRANSISI HALAMAN · segel biru menutup layar
   Elemen <svg> persegi 180vmax yang dianimasikan, supaya layar ultra-lebar tetap tertutup.
   ========================================================= */
.veil { position: fixed; inset: 0; z-index: 350; pointer-events: none; overflow: hidden; }
.veil svg { position: absolute; left: 50%; top: 50%; width: 180vmax; height: 180vmax; margin: -90vmax 0 0 -90vmax; transform: scale(0); will-change: transform; }
.veil .blob path { fill: var(--blue); }
.veil img { position: absolute; left: 50%; top: 50%; width: 120px; margin: -60px 0 0 -60px; opacity: 0; }
.arriving .veil svg { transform: scale(1); }
.arriving .veil img { opacity: 1; }

/* =========================================================
   MUNCUL SAAT SCROLL · data-reveal, data-split, data-assemble
   ========================================================= */
.js [data-reveal] { opacity: 0; transform: translateY(40px); }
.js .split .w { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.js .split .w > span { display: inline-block; transform: translateY(105%); }
.fx-off [data-reveal] { opacity: 1 !important; transform: none !important; }
.fx-off .split .w > span { transform: none !important; }

/* Animasi tanpa henti dijeda saat seksinya di luar layar (motion.js memasang .idle) */
.idle *, .idle *::before, .idle *::after { animation-play-state: paused !important; }

/* =========================================================
   IKON FUSIONIFY · garis 2px, ujung bulat, dengan "titik i" biru muda sebagai ciri khas.
   Sprite: ikon/ikon.svg (tempel di <body> atau rujuk file) lalu:
     <svg class="ikon" aria-hidden="true"><use href="#ikon-cari"/></svg>
     <svg class="ikon" aria-hidden="true"><use href="#sosmed-instagram"/></svg>
   Ukuran ikut font-size (1.25em). Warna garis = currentColor, warna titik = --ikon-titik.
   ========================================================= */
.ikon { display: inline-block; flex: none; width: 1.25em; height: 1.25em; vertical-align: -0.25em; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; overflow: visible; --ikon-titik: var(--blue-light); }
.ikon.polos { --ikon-titik: currentColor; }   /* satu warna, mis. di atas foto */
.ikon-16 { width: 16px; height: 16px; } .ikon-20 { width: 20px; height: 20px; } .ikon-24 { width: 24px; height: 24px; } .ikon-32 { width: 32px; height: 32px; }

/* Ikon dalam ubin stiker (kartu fitur, KPI dasbor) */
.ikon-stiker { display: inline-grid; place-items: center; flex: none; width: 52px; height: 52px; border-radius: 16px; border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: 0 4px 0 var(--edge-shadow); }
.ikon-stiker .ikon { width: 26px; height: 26px; }
.ikon-stiker.kecil { width: 40px; height: 40px; border-radius: 12px; box-shadow: 0 3px 0 var(--edge-shadow); }
.ikon-stiker.kecil .ikon { width: 20px; height: 20px; }
.ikon-stiker.biru { background: var(--blue); color: #fff; --ikon-titik: color-mix(in srgb, #fff 55%, var(--blue-light)); }
.ikon-stiker.tint { background: var(--surface); color: var(--text-blue); }

/* Ikon di atas segel 12 lekukan */
.ikon-segel { position: relative; display: inline-grid; place-items: center; flex: none; width: 60px; height: 60px; color: var(--ink); isolation: isolate; }
.ikon-segel::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--seal-tint); -webkit-mask: var(--seal-mask) center / contain no-repeat; mask: var(--seal-mask) center / contain no-repeat; }
.ikon-segel .ikon { width: 26px; height: 26px; }
.ikon-segel.biru { color: #fff; --ikon-titik: color-mix(in srgb, #fff 55%, var(--blue-light)); }
.ikon-segel.biru::before { background: var(--blue); }

/* Daftar tautan sosmed: <ul class="sosmed"><li><a href="…" aria-label="Instagram FUSIONIFY"><svg class="ikon"><use href="#sosmed-instagram"/></svg></a></li></ul> */
.sosmed { list-style: none; display: flex; flex-wrap: wrap; gap: 10px; margin: 0; padding: 0; }
.sosmed a { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 14px; border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: 0 3px 0 var(--edge-shadow); transition: transform 0.2s var(--ease); }
.sosmed a:hover { transform: translateY(-2px); background: var(--blue); color: #fff; }
.sosmed a:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 3px; }
.sosmed .ikon { width: 20px; height: 20px; }
.footer .sosmed a, .sec.blue .sosmed a { background: transparent; color: #f2f8ff; border-color: rgba(255, 255, 255, 0.35); box-shadow: none; }
.footer .sosmed a:hover, .sec.blue .sosmed a:hover { background: #fff; color: #0b0f1a; }

```

---

## Kode: `css/product.css`

```css
/* FUSIONIFY UI · product.css
   Komponen tambahan untuk web produk dan halaman layanan. Butuh tokens.css + base.css + components.css.
   Semua mengikuti gaya stiker: garis 2px tinta, bayangan pejal, sudut besar.
   Contoh markup: demo/index.html dan templates/landing-produk.html. */

/* =========================================================
   FORM · input, textarea, select, checkbox, radio
   <label class="field"><span>Nama</span><input class="input" ...></label>
   ========================================================= */
.field { display: grid; gap: 8px; }
.field > span { font-weight: 700; font-size: 15px; }
.field small { font-size: 13.5px; color: var(--ink-3); }
.field .err { color: var(--danger); font-weight: 700; }
.input, .select, .textarea {
  width: 100%; font: inherit; font-size: 16px; color: var(--ink);
  padding: 13px 16px; border-radius: var(--r-m); border: 2px solid var(--edge); background: var(--card);
  box-shadow: 0 3px 0 var(--edge-shadow); transition: box-shadow 0.25s var(--spring), transform 0.25s var(--spring), border-color 0.2s;
}
.textarea { min-height: 130px; resize: vertical; }
.select { appearance: none; padding-right: 44px; background: var(--card) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230b0f1a' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") right 14px center / 18px no-repeat; }
.input::placeholder, .textarea::placeholder { color: var(--placeholder); }
.input:focus, .select:focus, .textarea:focus { outline: none; border-color: var(--text-blue); box-shadow: 0 3px 0 var(--blue), 0 0 0 4px rgba(83, 157, 233, 0.25); }
.input[aria-invalid="true"], .textarea[aria-invalid="true"] { border-color: var(--danger); box-shadow: 0 3px 0 var(--danger); }
.input:disabled, .select:disabled, .textarea:disabled { background: var(--surface); color: var(--ink-3); box-shadow: none; }
.check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 15.5px; }
.check input { appearance: none; flex: none; width: 22px; height: 22px; margin: 1px 0 0; border: 2px solid var(--edge); border-radius: 7px; background: var(--card); display: grid; place-items: center; cursor: pointer; transition: background 0.2s; }
.check input[type="radio"] { border-radius: 50%; }
.check input:checked { background: var(--blue); }
.check input:checked::after { content: ""; width: 10px; height: 6px; border: solid #fff; border-width: 0 0 2.5px 2.5px; transform: translateY(-1px) rotate(-45deg); }
.check input[type="radio"]:checked::after { width: 8px; height: 8px; border: 0; border-radius: 50%; background: #fff; transform: none; }
.check input:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 2px; }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.form-grid .full { grid-column: 1 / -1; }
@media (max-width: 620px) { .form-grid { grid-template-columns: 1fr; } }

/* =========================================================
   KARTU LAYANAN · ikon di dalam segel kecil
   <article class="svc"><span class="svc-ico"><svg>...</svg></span><h3>..</h3><p>..</p></article>
   ========================================================= */
.svc { position: relative; display: grid; gap: 12px; align-content: start; padding: 26px; border-radius: var(--r-l); background: var(--card); color: var(--ink); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); }
.svc h3 { font-size: 26px; }
.svc p { font-size: 15.5px; color: var(--ink-2); }
.svc .more { margin-top: 6px; font-weight: 700; color: var(--text-blue-deep); text-decoration: none; display: inline-flex; gap: 6px; align-items: center; }
.svc .more:hover { text-decoration: underline; text-underline-offset: 4px; }
.svc-ico { position: relative; width: 58px; height: 58px; display: grid; place-items: center; color: #fff; }
.svc-ico::before { content: ""; position: absolute; inset: 0; background: var(--blue); -webkit-mask: var(--seal-mask) center / contain no-repeat; mask: var(--seal-mask) center / contain no-repeat; }
.svc-ico svg { position: relative; width: 26px; height: 26px; }
.svc:nth-child(3n+2) .svc-ico::before { background: var(--blue-light); }
.svc:nth-child(3n+3) .svc-ico::before { background: var(--blue-deep); }
a.svc { text-decoration: none; transition: transform 0.35s var(--spring), box-shadow 0.35s var(--spring); }
a.svc:hover { transform: translateY(-4px); box-shadow: 0 10px 0 var(--edge-shadow); }
/* Segel sebagai mask (12 lekukan, sama dengan seal.js) */
:root { --seal-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M94.0 50.0L95.8 52.4L96.8 54.9L96.5 57.4L94.9 59.5L92.5 61.4L90.1 63.0L88.2 64.7L87.4 66.7L87.5 69.1L88.1 72.0L88.5 75.0L88.1 77.7L86.6 79.6L84.1 80.7L81.1 81.1L78.2 81.3L75.8 81.8L74.1 83.1L72.9 85.3L72.0 88.1L70.8 90.9L69.1 93.0L66.9 93.9L64.2 93.6L61.4 92.5L58.8 91.2L56.4 90.5L54.3 90.7L52.2 92.1L50.0 94.0L47.6 95.8L45.1 96.8L42.6 96.5L40.5 94.9L38.6 92.5L37.0 90.1L35.3 88.2L33.3 87.4L30.9 87.5L28.0 88.1L25.0 88.5L22.3 88.1L20.4 86.6L19.3 84.1L18.9 81.1L18.7 78.2L18.2 75.8L16.9 74.1L14.7 72.9L11.9 72.0L9.1 70.8L7.0 69.1L6.1 66.9L6.4 64.2L7.5 61.4L8.8 58.8L9.5 56.4L9.3 54.3L7.9 52.2L6.0 50.0L4.2 47.6L3.2 45.1L3.5 42.6L5.1 40.5L7.5 38.6L9.9 37.0L11.8 35.3L12.6 33.3L12.5 30.9L11.9 28.0L11.5 25.0L11.9 22.3L13.4 20.4L15.9 19.3L18.9 18.9L21.8 18.7L24.2 18.2L25.9 16.9L27.1 14.7L28.0 11.9L29.2 9.1L30.9 7.0L33.1 6.1L35.8 6.4L38.6 7.5L41.2 8.8L43.6 9.5L45.7 9.3L47.8 7.9L50.0 6.0L52.4 4.2L54.9 3.2L57.4 3.5L59.5 5.1L61.4 7.5L63.0 9.9L64.7 11.8L66.7 12.6L69.1 12.5L72.0 11.9L75.0 11.5L77.7 11.9L79.6 13.4L80.7 15.9L81.1 18.9L81.3 21.8L81.8 24.2L83.1 25.9L85.3 27.1L88.1 28.0L90.9 29.2L93.0 30.9L93.9 33.1L93.6 35.8L92.5 38.6L91.2 41.2L90.5 43.6L90.7 45.7L92.1 47.8Z'/%3E%3C/svg%3E"); }

/* =========================================================
   DAFTAR FITUR · centang biru di dalam segel
   ========================================================= */
.ticks { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.ticks li { position: relative; padding-left: 34px; color: var(--ink-2); }
.ticks li::before { content: ""; position: absolute; left: 0; top: 1px; width: 24px; height: 24px; background: var(--blue); -webkit-mask: var(--seal-mask) center / contain no-repeat; mask: var(--seal-mask) center / contain no-repeat; }
.ticks li::after { content: ""; position: absolute; left: 8px; top: 8px; width: 8px; height: 5px; border: solid #fff; border-width: 0 0 2px 2px; transform: rotate(-45deg); }
.ticks li.no { color: var(--ink-3); text-decoration: line-through; text-decoration-color: rgba(86, 97, 117, 0.5); }
.ticks li.no::before { background: var(--line); }
.ticks li.no::after { display: none; }

/* =========================================================
   LANGKAH / ALUR KERJA · nomor dalam segel
   <ol class="steps"><li><span class="n">1</span><h3>..</h3><p>..</p></li></ol>
   ========================================================= */
.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
.steps li { position: relative; display: grid; gap: 8px; align-content: start; padding-top: 72px; }
.steps li::before { content: ""; position: absolute; left: 0; top: 0; width: 56px; height: 56px; background: var(--blue); -webkit-mask: var(--seal-mask) center / contain no-repeat; mask: var(--seal-mask) center / contain no-repeat; }
.steps .n { position: absolute; left: 0; top: 0; width: 56px; height: 56px; display: grid; place-items: center; font-family: var(--f-num); font-weight: 800; font-size: 22px; color: #fff; }
.steps li:not(:last-child)::after { content: ""; position: absolute; left: 66px; right: -12px; top: 27px; border-top: 2px dashed var(--blue-light); }
.steps h3 { font-size: 24px; }
.steps p { color: var(--ink-2); font-size: 15.5px; }
.sec.blue .steps li::before { background: #fff; } .sec.blue .steps .n { color: #0d6cd7; }
.sec.blue .steps li:not(:last-child)::after { border-color: rgba(255, 255, 255, 0.5); }
.sec.blue .steps p { color: #f2f8ff; }
@media (max-width: 720px) { .steps li:not(:last-child)::after { display: none; } }

/* =========================================================
   TABEL HARGA · paket unggulan diberi .featured
   Selalu di dalam .plans (kelas .plan sendirian dipakai juga oleh .chip.plan)
   Harga wajib harga asli. Kalau belum pasti, tulis "Hubungi kami".
   ========================================================= */
.plans { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
.plans > .plan { position: relative; display: grid; grid-template-rows: auto auto 1fr auto; gap: 18px; padding: 30px 26px 26px; border-radius: var(--r-l); background: var(--card); color: var(--ink); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); }
.plans > .plan h3 { font-size: 26px; }
.plans > .plan .desc { font-size: 15px; color: var(--ink-2); margin-top: 4px; }
.plans > .plan .price { font-family: var(--f-num); font-weight: 800; font-size: clamp(36px, 4vw, 48px); line-height: 1; letter-spacing: -0.02em; }
.plans > .plan .price small { font-family: var(--f-body); font-weight: 400; font-size: 15px; color: var(--ink-3); letter-spacing: 0; }
.plans > .plan .btn { justify-content: center; }
.plans > .plan.featured { background: var(--blue); color: #fff; transform: translateY(-10px); box-shadow: 0 16px 0 var(--edge-shadow); }
.plans > .plan.featured .desc, .plans > .plan.featured .price small, .plans > .plan.featured .ticks li { color: #f2f8ff; }
.plans > .plan.featured .ticks li::before { background: #fff; }
.plans > .plan.featured .ticks li::after { border-color: var(--text-blue); }
.plans > .plan.featured .btn { --bg: #fff; --fg: #0b0f1a; }
.plans > .plan .ribbon { position: absolute; top: -16px; right: 22px; padding: 6px 14px; border-radius: 999px; border: 2px solid var(--edge); background: var(--card); color: var(--ink); font-family: var(--f-hand); font-weight: 700; font-size: 20px; line-height: 1; transform: rotate(4deg); }
@media (max-width: 1000px) { .plans { grid-template-columns: repeat(2, minmax(0, 1fr)); } .plans > :last-child:nth-child(odd) { grid-column: 1 / -1; } .plans > .plan.featured { transform: none; box-shadow: var(--shadow-sticker); } }
@media (max-width: 620px) { .plans { grid-template-columns: 1fr; } }

/* =========================================================
   TESTIMONI · HANYA dengan izin tertulis dan tanggalnya
   ========================================================= */
.quote { position: relative; display: grid; gap: 18px; padding: 30px 26px 24px; border-radius: var(--r-l); background: var(--card); color: var(--ink); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); }
.quote::before { content: "\201C"; position: absolute; top: -26px; left: 20px; font-family: var(--f-head); font-weight: 800; font-size: 96px; line-height: 1; color: var(--text-blue); }
.quote blockquote { margin: 0; font-size: 18px; line-height: 1.55; }
.quote figcaption { display: flex; align-items: center; gap: 12px; }
.quote figcaption img { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; background: var(--surface); }
.quote figcaption b { display: block; line-height: 1.2; }
.quote figcaption span { font-size: 14px; color: var(--ink-3); }

/* =========================================================
   CTA BAND · ajakan besar di akhir halaman, maskot di samping
   ========================================================= */
.cta-band { position: relative; display: grid; grid-template-columns: 1fr auto; gap: 30px; align-items: center; padding: clamp(28px, 5vw, 56px); border-radius: var(--r-l); background: var(--blue); color: #fff; border: 2px solid var(--edge); box-shadow: 0 10px 0 var(--edge-shadow); overflow: hidden; }
.cta-band h2 { font-size: clamp(34px, 4.6vw, 60px); max-width: 16ch; }
.cta-band p { color: #f2f8ff; margin-top: 12px; max-width: 46ch; }
.cta-band .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.cta-band .btn { --bg: #fff; --fg: #0b0f1a; }
.cta-band .btn.ghost { --bg: var(--blue); --fg: #fff; border-color: #fff; box-shadow: 0 3px 0 rgba(255, 255, 255, 0.6); }
.cta-band .mascot { width: clamp(130px, 18vw, 220px); align-self: end; margin-bottom: calc(clamp(28px, 5vw, 56px) * -1); }
.cta-band .seal-deco { position: absolute; right: -60px; top: -60px; width: 260px; color: rgba(255, 255, 255, 0.08); max-width: none; pointer-events: none; }
@media (max-width: 700px) { .cta-band { grid-template-columns: 1fr; } .cta-band .mascot { justify-self: end; width: 140px; margin-top: -10px; } }

/* =========================================================
   CATATAN / PEMBERITAHUAN · info, sukses, peringatan, bahaya
   <div class="note warn"><b>Judul</b><p>Isi</p></div>
   ========================================================= */
.note { --nc: var(--plan); display: grid; gap: 4px; padding: 16px 18px 16px 52px; position: relative; border-radius: var(--r-m); border: 2px solid var(--nc); background: var(--plan-bg); }
.note::before { content: "i"; position: absolute; left: 16px; top: 15px; width: 24px; height: 24px; border-radius: 50%; background: var(--nc); color: #fff; display: grid; place-items: center; font-family: var(--f-num); font-weight: 800; font-size: 14px; }
.note b { color: var(--ink); }
.note p { color: var(--ink-2); font-size: 15.5px; }
.note.ok { --nc: var(--go); background: var(--go-bg); } .note.ok::before { content: "✓"; }
.note.warn { --nc: var(--beta); background: var(--beta-bg); } .note.warn::before { content: "!"; }
.note.danger { --nc: var(--danger); background: var(--danger-bg); } .note.danger::before { content: "!"; }

/* =========================================================
   TABEL DATA · dibungkus .table-wrap supaya bisa digeser di HP.
   Wajib: <div class="table-wrap" tabindex="0" role="region" aria-label="..."> supaya bisa digeser pakai keyboard
   ========================================================= */
.table-wrap { position: relative; overflow-x: auto; border: 2px solid var(--edge); border-radius: var(--r-l); background: var(--card); box-shadow: var(--shadow-sticker); }
.table { width: 100%; border-collapse: collapse; font-size: 15.5px; min-width: 520px; }
.table th, .table td { padding: 14px 18px; text-align: left; border-bottom: 1px solid var(--line); }
.table thead th { font-family: var(--f-num); font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); background: var(--surface); }
.table tbody tr:last-child td { border-bottom: 0; }
.table tbody tr:hover { background: var(--paper); }
.table .num { text-align: right; }

/* =========================================================
   TAG kecil (kategori, teknologi) · beda dari chip status
   ========================================================= */
.tags { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0; }
.tag { display: inline-block; padding: 4px 12px; border-radius: 999px; border: 1.5px solid var(--line); background: var(--card); font-size: 13.5px; font-weight: 700; color: var(--ink-2); }
.sec.blue .tag { background: rgba(255, 255, 255, 0.12); border-color: rgba(255, 255, 255, 0.3); color: #fff; }

/* =========================================================
   KEADAAN KOSONG / 404 · maskot + pesan + aksi
   ========================================================= */
.empty { display: grid; justify-items: center; text-align: center; gap: 16px; padding: 40px 0; }
.empty img { width: clamp(150px, 22vw, 230px); height: auto; }
.empty h2, .empty h1 { font-size: clamp(34px, 5vw, 60px); }
.empty p { color: var(--ink-2); max-width: 44ch; }
.empty .code { font-family: var(--f-num); font-weight: 800; font-size: clamp(64px, 12vw, 140px); line-height: 0.9; color: var(--text-blue); letter-spacing: -0.04em; }

/* =========================================================
   KEPALA HALAMAN PRODUK · slot logo produk + chip status
   ========================================================= */
.prod-head { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.prod-head .prod-logo { height: 48px; width: auto; }

/* =========================================================
   TAB SEGMEN · pilihan bulanan/tahunan, dsb. (tanpa JS: pakai radio)
   ========================================================= */
.segment { display: inline-flex; padding: 4px; gap: 4px; border-radius: 999px; border: 2px solid var(--edge); background: var(--card); box-shadow: 0 3px 0 var(--edge-shadow); }
.segment label { position: relative; cursor: pointer; }
.segment input { position: absolute; opacity: 0; pointer-events: none; }
.segment span { display: block; white-space: nowrap; padding: 8px 16px; border-radius: 999px; font-weight: 700; font-size: 14.5px; color: var(--ink-2); transition: background 0.25s var(--ease), color 0.25s; }
.segment input:checked + span { background: var(--blue); color: #fff; }
.segment input:focus-visible + span { outline: 3px solid var(--blue-light); outline-offset: 2px; }

/* =========================================================
   HALAMAN ACARA (templates/acara.html) · ala halaman acara publik
   HP: satu kolom + bar daftar menempel di bawah. Mulai 900px: poster dan penyelenggara di kiri, detail di kanan.
   ========================================================= */
.event-top { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; gap: 10px; min-height: 64px; padding: env(safe-area-inset-top) max(var(--gut), env(safe-area-inset-right)) 0 max(var(--gut), env(safe-area-inset-left)); background: var(--nav-glass); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
.event-top .brand { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); text-decoration: none; font-family: var(--f-head); font-weight: 800; font-size: 20px; }
.event-top .spacer { flex: 1; }
.event-top .lnk { display: none; padding: 10px 6px; color: var(--ink-2); font-weight: 700; font-size: 15px; text-decoration: none; }
.event-top .lnk:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 4px; }
@media (min-width: 700px) { .event-top .lnk { display: inline-block; } }
.event { display: grid; grid-template-areas: "cover" "main" "meta"; gap: 28px; padding-block: 24px 48px; }
.event-cover { grid-area: cover; }
.event-main { grid-area: main; }
.event-meta { grid-area: meta; }
.event-meta, .event-main { display: grid; align-content: start; gap: 22px; min-width: 0; }
.event-cover { position: relative; overflow: hidden; aspect-ratio: 1; border-radius: var(--r-l); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); background: var(--blue); }
.event-cover > img.photo { width: 100%; height: 100%; object-fit: cover; }
.poster { position: absolute; inset: 0; display: grid; align-content: start; gap: 12px; padding: 22px; color: #fff; }
.poster .seal-deco { position: absolute; right: -18%; top: -14%; width: 75%; height: auto; color: rgba(255, 255, 255, 0.14); }
.poster .k { position: relative; font-family: var(--f-num); font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #f2f8ff; }
.poster b { position: relative; max-width: 62%; font-family: var(--f-head); font-weight: 800; font-size: clamp(34px, 9vw, 52px); line-height: 0.95; letter-spacing: -0.03em; }
.poster img { position: absolute; right: 2%; bottom: 0; width: 44%; height: auto; }
.event-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.event h1 { font-size: clamp(36px, 7vw, 56px); line-height: 0.98; letter-spacing: -0.03em; }
.event-facts { display: grid; gap: 16px; }
.fact { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 14px; }
.fact .ico-tile { display: grid; place-items: center; width: 52px; height: 56px; border-radius: 14px; border: 2px solid var(--edge); background: var(--card); color: var(--text-blue); box-shadow: 0 3px 0 var(--edge-shadow); }
.fact .ico-tile svg { width: 24px; height: 24px; }
.fact b { display: block; font-size: 17px; }
.fact span, .fact a { font-size: 15px; color: var(--ink-2); }
.fact a { color: var(--text-blue-deep); font-weight: 700; }
.fact .actions { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 2px; }
.fact .actions button { padding: 4px 0; border: 0; background: none; font: inherit; font-size: 15px; font-weight: 700; color: var(--text-blue-deep); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.reg { display: grid; gap: 14px; padding: 20px; border-radius: var(--r-l); border: 2px solid var(--edge); background: var(--card); box-shadow: var(--shadow-sticker); }
.reg-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
.reg-head h2 { font-size: 22px; }
.reg-head .price { font-family: var(--f-num); font-weight: 800; font-size: 20px; color: var(--text-blue); }
.reg p { margin: 0; font-size: 15px; color: var(--ink-2); }
.reg .quota { display: grid; gap: 6px; font-size: 14px; color: var(--ink-2); }
.reg .quota b { color: var(--ink); }
.reg-done { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 14px; }
.reg-done[hidden] { display: none; }
.reg-done img { width: 72px; height: auto; }
.reg-done h3 { font-size: 22px; }
.ticket { display: inline-flex; align-items: center; gap: 8px; margin-top: 6px; padding: 6px 12px; border-radius: 10px; border: 2px dashed var(--blue-light); background: var(--surface); font-family: var(--f-num); font-weight: 700; letter-spacing: 0.12em; color: var(--ink); }
.event-sec { display: grid; gap: 12px; }
.event-sec h2 { font-size: 15px; font-family: var(--f-num); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
.agenda { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.agenda li { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 12px; align-items: baseline; }
.agenda time { font-family: var(--f-num); font-weight: 700; color: var(--text-blue-deep); }
.hosts { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.hosts li { display: flex; align-items: center; gap: 12px; }
.hosts b { flex: 1; min-width: 0; }
.going { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.going .avatar { --s: 40px; font-size: 13px; }
.going .avatar-stack .avatar { margin-left: -6px; }
.going .avatar-stack .avatar:first-child { margin-left: 0; }
.event-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; display: flex; align-items: center; gap: 12px; padding: 12px max(16px, env(safe-area-inset-right)) calc(12px + env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left)); background: var(--card); border-top: 2px solid var(--edge); }
.event-bar .info { flex: 1; min-width: 0; display: grid; line-height: 1.25; }
.event-bar .info b { font-size: 16px; }
.event-bar .info span { font-size: 13.5px; color: var(--ink-3); }
.has-event-bar { padding-bottom: calc(88px + env(safe-area-inset-bottom)); }
@media (min-width: 900px) {
  .event { grid-template-columns: minmax(300px, 380px) minmax(0, 1fr); grid-template-areas: "cover main" "meta main"; grid-template-rows: auto 1fr; gap: 28px 48px; padding-top: 40px; }
  .event-bar { display: none; }
  .has-event-bar { padding-bottom: 0; }
}

/* =========================================================
   LABEL DATA CONTOH · wajib di setiap angka/grafik contoh, hapus setelah diganti data asli
   ========================================================= */
.sample-note { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; background: var(--beta-bg); color: var(--beta); font-family: var(--f-num); font-size: 12px; font-weight: 700; }

/* =========================================================
   HALAMAN BAYAR QRIS (templates/bayar-qris.html)
   Satu kolom tenang di tengah. Keadaan diatur atribut data-pay-state di .pay:
   menunggu | berhasil | kedaluwarsa | gagal. Panel [data-show="..."] tampil sesuai keadaannya.
   ========================================================= */
.pay { width: min(100% - 2 * var(--gut), 480px); margin-inline: auto; padding-block: 28px 56px; display: grid; gap: 20px; }
.pay-top { display: flex; align-items: center; gap: 12px; }
.pay-top .avatar-l { flex: none; width: 48px; height: 48px; border-radius: 14px; border: 2px solid var(--edge); background: var(--surface); display: grid; place-items: center; font-family: var(--f-head); font-weight: 800; font-size: 20px; color: var(--text-blue); overflow: hidden; }
.pay-top .avatar-l img { width: 100%; height: 100%; object-fit: cover; }
.pay-top b { display: block; font-size: 17px; line-height: 1.25; overflow-wrap: anywhere; }
.pay-top span { font-size: 14px; color: var(--ink-3); }
.pay-card { display: grid; gap: 18px; padding: clamp(18px, 5vw, 26px); border-radius: var(--r-l); border: 2px solid var(--edge); background: var(--card); box-shadow: var(--shadow-sticker); }
.pay-amount { display: grid; gap: 4px; }
.pay-amount .kicker { margin: 0; }
.pay-amount .row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.pay-amount strong { font-family: var(--f-num); font-weight: 800; font-size: clamp(32px, 9vw, 42px); line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.pay-meta { display: grid; gap: 6px; margin: 0; padding: 12px 0 0; border-top: 1px dashed var(--line); font-size: 14.5px; }
.pay-meta div { display: flex; justify-content: space-between; gap: 12px; }
.pay-meta dt { color: var(--ink-3); }
.pay-meta dd { margin: 0; font-weight: 700; text-align: right; overflow-wrap: anywhere; }
.qr { justify-self: center; display: grid; gap: 10px; justify-items: center; }
.qr-box { position: relative; width: min(100%, 280px); padding: 10px; border-radius: var(--r-m); border: 2px solid var(--edge); background: var(--card); box-shadow: 0 4px 0 var(--edge-shadow); }
.qr-box img { display: block; width: 100%; height: auto; border-radius: 8px; }
.qr-box .qr-label { position: absolute; left: 50%; top: -13px; transform: translateX(-50%); padding: 2px 12px; border-radius: 999px; border: 2px solid var(--edge); background: var(--card); font-family: var(--f-num); font-weight: 800; font-size: 13px; letter-spacing: 0.14em; }
.qr small { font-size: 13.5px; color: var(--ink-3); text-align: center; }
.pay-timer { display: grid; gap: 8px; }
.pay-timer .row { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; font-size: 14.5px; color: var(--ink-2); }
.pay-timer time, .pay-timer [data-pay-left] { font-family: var(--f-num); font-weight: 800; color: var(--ink); font-variant-numeric: tabular-nums; }
.pay-bar { height: 10px; border-radius: 999px; background: var(--surface); border: 1.5px solid var(--line); overflow: hidden; }
.pay-bar i { display: block; height: 100%; width: 100%; background: linear-gradient(90deg, var(--blue-light), var(--blue)); transform-origin: left; transform: scaleX(var(--left, 1)); transition: transform 1s linear; }
.pay-bar.low i { background: var(--danger); }
.pay-actions { display: grid; gap: 10px; }
.pay-actions .btn { justify-content: center; }
.pay-how { display: grid; gap: 10px; }
.pay-how summary { cursor: pointer; font-weight: 700; padding: 6px 0; }
.pay-how ol { margin: 0; padding-left: 1.3em; display: grid; gap: 6px; color: var(--ink-2); font-size: 15px; }
.pay-result { display: grid; justify-items: center; text-align: center; gap: 10px; }
.pay-result img { width: 150px; height: auto; }
.pay-result h1, .pay-result h2 { font-size: clamp(30px, 8vw, 40px); }
.pay-result p { color: var(--ink-2); max-width: 36ch; }
.pay [data-show] { display: none; }
.pay[data-pay-state="menunggu"] [data-show~="menunggu"],
.pay[data-pay-state="berhasil"] [data-show~="berhasil"],
.pay[data-pay-state="kedaluwarsa"] [data-show~="kedaluwarsa"],
.pay[data-pay-state="gagal"] [data-show~="gagal"] { display: grid; }
.pay-foot { display: grid; justify-items: center; gap: 12px; text-align: center; font-size: 14px; color: var(--ink-3); }
.pay-foot a { color: var(--text-blue-deep); font-weight: 700; }
.pay-foot .fy-badge img { width: 200px; height: auto; }

/* =========================================================
   HALAMAN STATUS LAYANAN (templates/status.html)
   ========================================================= */
.status-banner { --sc: var(--go); --sb: var(--go-bg); display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 16px; padding: 18px 20px; border-radius: var(--r-l); border: 2px solid var(--sc); background: var(--sb); box-shadow: 0 5px 0 var(--sc); }
.status-banner img { width: 64px; height: auto; }
.status-banner h1, .status-banner h2 { font-size: clamp(26px, 5vw, 36px); line-height: 1.05; }
.status-banner p { margin: 4px 0 0; color: var(--ink-2); font-size: 15px; }
.status-banner.warn { --sc: var(--beta); --sb: var(--beta-bg); }
.status-banner.down { --sc: var(--danger); --sb: var(--danger-bg); }
.uptime { list-style: none; margin: 0; padding: 0; border: 2px solid var(--edge); border-radius: var(--r-l); background: var(--card); box-shadow: var(--shadow-sticker); overflow: hidden; }
.uptime > li { display: grid; gap: 10px; padding: 18px 20px; border-bottom: 1px solid var(--line); }
.uptime > li:last-child { border-bottom: 0; }
.uptime .head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.uptime .head b { font-size: 17px; }
.uptime .head small { display: block; font-size: 13.5px; color: var(--ink-3); font-weight: 400; }
.uptime-bars { display: grid; grid-template-columns: repeat(90, minmax(0, 1fr)); gap: 2px; height: 34px; }
.uptime-bars span { border-radius: 2px; background: var(--go); }
.uptime-bars span[data-s="warn"] { background: var(--beta); }
.uptime-bars span[data-s="down"] { background: var(--danger); }
.uptime-bars span[data-s="none"] { background: var(--line); }
.uptime .scale { display: flex; justify-content: space-between; gap: 10px; font-family: var(--f-num); font-size: 12.5px; color: var(--ink-3); }
.uptime .scale b { color: var(--ink-2); }
@media (max-width: 700px) {
  .uptime-bars { grid-template-columns: repeat(30, minmax(0, 1fr)); gap: 3px; }
  .uptime-bars span:nth-child(-n+60) { display: none; }
  .uptime .scale .wide { display: none; }
}
@media (min-width: 701px) { .uptime .scale .narrow { display: none; } }
.incidents { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
.incident { display: grid; gap: 8px; padding: 18px 20px; border-radius: var(--r-l); border: 2px solid var(--edge); background: var(--card); }
.incident .head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.incident h3 { font-size: 21px; }
.incident ol { list-style: none; margin: 0; padding: 0 0 0 16px; border-left: 2px dashed var(--line); display: grid; gap: 10px; }
.incident ol li { position: relative; font-size: 15px; color: var(--ink-2); }
.incident ol li::before { content: ""; position: absolute; left: -23px; top: 7px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--edge); background: var(--card); }
.incident ol li b { color: var(--ink); }
.incident time { display: block; font-family: var(--f-num); font-size: 13px; color: var(--ink-3); }
.day-ok { padding: 14px 18px; border-radius: var(--r-m); background: var(--surface); color: var(--ink-2); font-size: 15px; }

/* =========================================================
   DOKUMENTASI DEVELOPER (templates/dokumentasi.html)
   Kolom: menu | isi | "di halaman ini". Di bawah 960px menu jadi <details>, daftar isi kanan hilang.
   ========================================================= */
.docs { width: min(100% - 2 * var(--gut), var(--max)); margin-inline: auto; padding-block: 104px 64px; display: grid; gap: 28px; }
.docs-nav { align-self: start; }
.docs-nav > summary { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 16px; border-radius: var(--r-m); border: 2px solid var(--edge); background: var(--card); box-shadow: 0 3px 0 var(--edge-shadow); font-weight: 700; cursor: pointer; list-style: none; }
.docs-nav > summary::-webkit-details-marker { display: none; }
.docs-nav > summary::after { content: ""; width: 10px; height: 10px; border-right: 2.5px solid currentColor; border-bottom: 2.5px solid currentColor; transform: rotate(45deg) translateY(-3px); transition: transform 0.2s var(--ease); }
.docs-nav[open] > summary::after { transform: rotate(-135deg) translateY(-1px); }
.docs-nav nav { display: grid; gap: 18px; padding: 16px 4px 4px; }
.docs-nav h2 { margin: 0 0 6px; font-family: var(--f-num); font-size: 12.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
.docs-nav ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
.docs-nav a { display: block; padding: 7px 12px; border-radius: 10px; color: var(--ink-2); text-decoration: none; font-size: 15px; font-weight: 700; }
.docs-nav a:hover { background: var(--surface); color: var(--ink); }
.docs-nav a[aria-current="page"] { background: var(--blue); color: #fff; box-shadow: 0 3px 0 var(--edge-shadow); }
.docs-main { min-width: 0; }
.docs-main .prose { max-width: 74ch; }
.docs-main .prose h1 { font-size: clamp(38px, 6vw, 58px); color: var(--ink); margin-bottom: 12px; }
.docs-main .prose h2 { scroll-margin-top: 96px; }
.docs-main .prose h3 { scroll-margin-top: 96px; }
.docs-main .prose :not(pre) > code, .legal .prose :not(pre) > code { font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; font-size: 0.88em; padding: 2px 6px; border-radius: 6px; background: var(--surface); color: var(--ink); overflow-wrap: anywhere; }
.docs-main .prose > * + .code-block, .docs-main .prose > * + .tabs, .docs-main .prose > * + .table-wrap, .docs-main .prose > * + .note, .docs-main .prose > * + .endpoint { margin-top: 16px; }
.docs-main .prose .code-block, .docs-main .prose .tabs, .docs-main .prose .table-wrap, .docs-main .prose .note, .docs-main .prose .endpoint { margin-bottom: 20px; }
.docs-main .prose .table { font-size: 15px; }
.docs-main .prose .table code { white-space: nowrap; overflow-wrap: normal; }
.docs-toc { display: none; }
.code-block { border-radius: var(--r-m); border: 2px solid var(--edge); background: var(--night); box-shadow: 0 4px 0 var(--edge-shadow); overflow: hidden; }
.code-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 10px 8px 16px; border-bottom: 1px solid #1f3459; font-family: var(--f-num); font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #9db2cf; }
.code-head button { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 4px 12px; border-radius: 999px; border: 1.5px solid #2e5592; background: #10203f; color: #eaf3ff; font: inherit; font-size: 12.5px; font-weight: 700; letter-spacing: 0.06em; cursor: pointer; }
.code-head button:hover { background: #17305a; }
.code-head button.done { border-color: #7fe0a6; color: #7fe0a6; }
.code-block pre { margin: 0; padding: 16px; overflow-x: auto; font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace; font-size: 14px; line-height: 1.65; color: #eaf3ff; tab-size: 2; }
.code-block pre:focus-visible { outline: 3px solid var(--blue-light); outline-offset: -3px; }
.code-block .c { color: #9db2cf; }
.code-block .s { color: #7fe0a6; }
.code-block .k { color: #8cc0ff; }
.code-block .n { color: #ffd27a; }
.endpoint { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; padding: 10px 14px; border-radius: var(--r-m); border: 2px solid var(--edge); background: var(--card); font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 15px; overflow-wrap: anywhere; }
.method { flex: none; padding: 3px 10px; border-radius: 8px; font-family: var(--f-num); font-weight: 800; font-size: 12.5px; letter-spacing: 0.08em; }
.method.get { background: var(--go-bg); color: var(--go); }
.method.post { background: var(--plan-bg); color: var(--plan); }
.method.put, .method.patch { background: var(--beta-bg); color: var(--beta); }
.method.delete { background: var(--danger-bg); color: var(--danger); }
.req { font-family: var(--f-num); font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--danger); }
.docs-pager { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 40px; }
.docs-pager a { display: grid; gap: 2px; padding: 14px 18px; border-radius: var(--r-m); border: 2px solid var(--edge); background: var(--card); box-shadow: 0 3px 0 var(--edge-shadow); text-decoration: none; transition: transform 0.2s var(--ease); }
.docs-pager a:hover { transform: translateY(-2px); }
.docs-pager small { font-family: var(--f-num); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); }
.docs-pager b { color: var(--text-blue-deep); }
.docs-pager .next { text-align: right; }
@media (min-width: 960px) {
  .docs { grid-template-columns: 240px minmax(0, 1fr); gap: 48px; }
  .docs-nav { position: sticky; top: 96px; max-height: calc(100dvh - 120px); overflow-y: auto; }
  .docs-nav > summary { display: none; }
  .docs-nav nav { padding-top: 0; }
}
@media (min-width: 1280px) {
  .docs { grid-template-columns: 220px minmax(0, 1fr) 200px; }
  .docs-toc { display: block; position: sticky; top: 96px; align-self: start; }
}

/* Daftar isi kecil di kanan (dokumentasi) dan di atas (halaman legal) */
.toc h2 { margin: 0 0 8px; font-family: var(--f-num); font-size: 12.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
.toc ol, .toc ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; border-left: 2px solid var(--line); }
.toc a { display: block; padding: 4px 0 4px 14px; margin-left: -2px; border-left: 2px solid transparent; color: var(--ink-2); text-decoration: none; font-size: 14.5px; }
.toc a:hover, .toc a[aria-current="true"] { color: var(--text-blue-deep); border-left-color: var(--blue); }

/* =========================================================
   HALAMAN LEGAL (templates/legal/privasi.html, syarat.html)
   ========================================================= */
.legal { width: min(100% - 2 * var(--gut), 1080px); margin-inline: auto; padding-block: 104px 64px; display: grid; gap: 28px; }
.legal-head { display: grid; gap: 12px; padding-bottom: 20px; border-bottom: 2px solid var(--line); }
.legal-head h1 { font-size: clamp(40px, 7vw, 68px); }
.legal-head p { margin: 0; color: var(--ink-2); }
.legal-switch { display: flex; flex-wrap: wrap; gap: 8px; }
.legal-switch a { padding: 8px 16px; border-radius: 999px; border: 2px solid var(--edge); background: var(--card); font-weight: 700; font-size: 14.5px; text-decoration: none; color: var(--ink-2); }
.legal-switch a[aria-current="page"] { background: var(--blue); color: #fff; box-shadow: 0 3px 0 var(--edge-shadow); }
.legal .toc { padding: 16px 18px; border-radius: var(--r-m); background: var(--surface); }
.legal .toc ol { counter-reset: toc; border-left: 0; }
.legal .toc li { counter-increment: toc; }
.legal .toc a { padding-left: 0; border-left: 0; margin-left: 0; }
.legal .toc a::before { content: counter(toc) ". "; font-family: var(--f-num); font-weight: 700; color: var(--text-blue); }
.legal .prose { counter-reset: pasal; max-width: 72ch; }
.legal .prose h2 { counter-increment: pasal; font-size: clamp(26px, 4vw, 32px); scroll-margin-top: 96px; }
.legal .prose h2::before { content: counter(pasal) ". "; color: var(--text-blue); }
.legal .prose h3 { font-size: 21px; }
@media (min-width: 900px) {
  .legal { grid-template-columns: 240px minmax(0, 1fr); column-gap: 56px; }
  .legal-head { grid-column: 1 / -1; }
  .legal .toc { position: sticky; top: 96px; align-self: start; max-height: calc(100dvh - 120px); overflow-y: auto; }
}
.pay-result h2:focus { outline: none; }

/* =========================================================
   KATALOG IKON (templates/ikon.html)
   ========================================================= */
.ikon-katalog { display: grid; gap: 28px; }
.ikon-katalog > * { min-width: 0; }
.ikon-alat { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.ikon-daftar { display: grid; gap: 32px; }
.ikon-grup h2 { margin: 0 0 12px; font-family: var(--f-num); font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
.ikon-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(112px, 1fr)); gap: 12px; }
.ikon-kartu { width: 100%; display: grid; justify-items: center; gap: 10px; padding: 16px 8px 12px; border-radius: var(--r-m); border: 2px solid var(--line); background: var(--card); color: var(--ink); font: inherit; font-size: 13px; cursor: pointer; transition: transform 0.2s var(--ease); }
.ikon-kartu:hover { transform: translateY(-2px); border-color: var(--edge); }
.ikon-kartu:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 2px; }
.ikon-kartu > span:last-child { max-width: 100%; overflow-wrap: anywhere; color: var(--ink-2); }
.ikon-wadah { display: grid; place-items: center; width: 52px; height: 52px; }
.ikon-wadah .ikon { width: 28px; height: 28px; }
.ikon-wadah.ikon-stiker .ikon, .ikon-wadah.ikon-segel .ikon { width: 26px; height: 26px; }
.ikon-kosong { color: var(--ink-2); }
.ikon-contoh { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 8px 0 24px; }
.ikon-contoh .card { display: grid; gap: 10px; align-content: start; }
.ikon-contoh .card p { margin: 0; font-size: 15px; }
.ikon-panduan .code-block { margin-bottom: 16px; }
.ikon-panduan :not(pre) > code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.88em; padding: 2px 6px; border-radius: 6px; background: var(--surface); color: var(--ink); }
@media (max-width: 420px) { .ikon-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; } .ikon-kartu { padding: 12px 4px 10px; font-size: 12px; } }

/* =========================================================
   KOMPONEN 1.13: tampilan
   ========================================================= */

/* ---------- Linimasa (timeline) ----------
   <ol class="timeline">
     <li class="done"><span class="tl-time">10.02</span><b class="tl-title">Pesanan dibuat</b><p>Menunggu pembayaran.</p></li>
     <li class="now">…</li> <li>…</li>   (.fail untuk langkah gagal)
   </ol> */
.timeline { list-style: none; margin: 0; padding: 0; }
.timeline li { position: relative; padding: 0 0 22px 36px; }
.timeline li::before { content: ""; position: absolute; left: 3px; top: 3px; width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--edge); background: var(--card); box-sizing: border-box; }
.timeline li::after { content: ""; position: absolute; left: 10px; top: 24px; bottom: 2px; border-left: 2px dashed var(--line); }
.timeline li:last-child { padding-bottom: 0; }
.timeline li:last-child::after { display: none; }
.timeline li.done::before { background: var(--blue); }
.timeline li.done::after { border-left-style: solid; border-color: var(--blue); }
.timeline li.now::before { background: var(--blue-light); box-shadow: 0 0 0 5px rgba(83, 157, 233, 0.28); }
.timeline li.fail::before { background: var(--danger); border-color: var(--danger); }
.timeline .tl-time { display: block; font: 700 12.5px var(--f-num); letter-spacing: 0.05em; text-transform: uppercase; color: var(--ink-3); }
.timeline .tl-title { display: block; font-weight: 700; color: var(--ink); }
.timeline li.fail .tl-title { color: var(--danger); }
.timeline p { margin-top: 2px; font-size: 14.5px; color: var(--ink-2); }

/* ---------- Tombol keyboard ----------
   Tekan <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">K</kbd> */
.kbd { display: inline-grid; place-items: center; min-width: 1.9em; height: 1.9em; padding: 0 0.45em; border: 1.5px solid var(--edge); border-bottom-width: 3px; border-radius: 7px; background: var(--card); color: var(--ink); font: 700 0.8em var(--f-num); line-height: 1; vertical-align: 0.1em; white-space: nowrap; }

/* ---------- Harga ----------
   <p class="harga">Rp25.000 <s>Rp40.000</s></p>   (.harga.lg untuk halaman detail) */
.harga { display: flex; align-items: baseline; flex-wrap: wrap; gap: 2px 8px; font: 800 18px var(--f-num); font-variant-numeric: tabular-nums; color: var(--text-blue); }
.harga s { font-size: 13.5px; font-weight: 600; color: var(--ink-3); }
.harga.lg { font-size: 30px; }
.harga.lg s { font-size: 16px; }

/* ---------- Kartu produk ----------
   <ul class="product-grid"><li><article class="product-card">
     <div class="pc-media"><img src="…" alt="" width="600" height="600"><span class="pc-diskon">-38%</span></div>
     <div class="pc-body"><span class="pc-cat">Streaming</span><h3 class="pc-title"><a href="/produk/x">Nama produk</a></h3>
       <span class="rating" style="--nilai:4.8" role="img" aria-label="Rating 4,8 dari 5"><span class="stars" aria-hidden="true"></span>4,8</span>
       <p class="harga">Rp25.000 <s>Rp40.000</s></p>
       <div class="pc-actions"><button class="btn sm" type="button">Beli</button></div></div>
   </article></li></ul>
   Seluruh kartu bisa diklik lewat tautan judul; tombol di .pc-actions tetap bisa diklik sendiri. Harga wajib asli. */
.product-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 210px), 1fr)); gap: 18px; }
@media (max-width: 560px) { .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } .pc-body { padding: 10px 12px 12px; } .pc-title { font-size: 14.5px; } .harga { font-size: 16px; } .pc-diskon { top: 8px; left: 8px; } }
.product-card { position: relative; height: 100%; display: flex; flex-direction: column; border: 2px solid var(--edge); border-radius: var(--r-l); background: var(--card); box-shadow: var(--shadow-sticker); overflow: hidden; transition: transform 0.35s var(--spring), box-shadow 0.35s var(--spring); }
.product-card:hover { transform: translateY(-4px); box-shadow: 0 10px 0 var(--edge-shadow); }
.product-card:focus-within { outline: 3px solid var(--blue-light); outline-offset: 3px; }
.pc-media { position: relative; aspect-ratio: 1; background: var(--surface); border-bottom: 2px solid var(--edge); overflow: hidden; }
.pc-media img { width: 100%; height: 100%; object-fit: cover; }
.pc-media.contain img { object-fit: contain; padding: 12px; }
.pc-diskon { position: absolute; top: 10px; left: 10px; padding: 4px 10px; border-radius: 999px; border: 2px solid var(--edge); background: var(--blue); color: #fff; font: 800 13px var(--f-num); box-shadow: 0 2px 0 var(--edge-shadow); }
.pc-body { flex: 1; display: flex; flex-direction: column; gap: 6px; padding: 14px 16px 16px; }
.pc-cat { font: 700 11.5px var(--f-num); letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); }
.pc-title { font: 700 16px/1.35 var(--f-body); letter-spacing: 0; color: var(--ink); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pc-title a { color: inherit; text-decoration: none; padding-block: 4px; }
.pc-title a::after { content: ""; position: absolute; inset: 0; z-index: 1; }
.pc-title a:focus-visible { outline: none; }
.pc-body .rating { --ukuran: 15px; font-size: 13px; }
.pc-actions { position: relative; z-index: 2; margin-top: auto; padding-top: 6px; display: flex; gap: 8px; }
.pc-actions .btn { flex: 1; justify-content: center; }
.product-card.habis .pc-media img { opacity: 0.45; }
.product-card.habis .pc-actions .btn { opacity: 0.5; pointer-events: none; }

/* ---------- Hitung mundur (promo, acara) ----------
   <div class="countdown" data-tenggat="2026-11-11T00:00:00+07:00" role="timer">
     <span class="cd-unit"><b data-cd="hari">--</b><small>hari</small></span> … jam, menit, detik
   </div>
   Selesai: kelas .selesai dan event fy:complete. Tanpa JavaScript angka tetap "--". */
.countdown { display: inline-flex; flex-wrap: wrap; gap: 8px; }
.countdown .cd-unit { min-width: 62px; padding: 8px 6px 6px; border: 2px solid var(--edge); border-radius: 14px; background: var(--card); box-shadow: var(--shadow-pop); text-align: center; }
.countdown b { display: block; font: 800 26px/1.05 var(--f-num); font-variant-numeric: tabular-nums; color: var(--ink); }
.countdown small { display: block; margin-top: 2px; font: 700 10.5px var(--f-num); letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); }
.countdown.selesai .cd-unit { opacity: 0.55; }

```

---

## Kode: `css/controls.css`

```css
/* FUSIONIFY UI · controls.css
   Komponen kontrol yang dipakai di web publik, web produk, aplikasi, dan aplikasi HP (web/PWA/WebView):
   menu, modal, tab, badge, button group, split button, FAB, app bar HP, navigation bar bawah,
   navigation rail, bottom/side sheet, carousel, slider, tooltip, list, chip interaktif, loading,
   snackbar, search bar, date/time picker, floating toolbar.
   Interaksinya di js/controls.js (dipanggil otomatis oleh initFusionify() dan initApp()).
   Aturan: hanya token tema (aman untuk mode gelap), target sentuh minimal 44px,
   area aman notch lewat env(safe-area-inset-*), gerak hanya transform dan opacity. */

/* =========================================================
   DROPDOWN · <div class="dropdown"><button aria-expanded="false" aria-haspopup="menu" data-dropdown>..</button><div class="menu" role="menu" hidden>..</div></div>
   ========================================================= */
.dropdown { position: relative; }
.menu { position: absolute; right: 0; top: calc(100% + 8px); z-index: 50; min-width: 220px; padding: 6px; border-radius: var(--r-m); background: var(--card); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); display: grid; gap: 2px; }
.menu[hidden] { display: none; }
.menu.up { top: auto; bottom: calc(100% + 8px); }
.menu.start { right: auto; left: 0; }
.menu a, .menu button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border: 0; border-radius: 10px; background: none; text-align: left; text-decoration: none; font: inherit; font-size: 15px; font-weight: 700; color: var(--ink-2); cursor: pointer; }
.menu a:hover, .menu button:hover, .menu a:focus-visible, .menu button:focus-visible { background: var(--surface); color: var(--ink); outline: none; }
.menu svg { width: 18px; height: 18px; }
.menu hr { border: 0; border-top: 1px solid var(--line); margin: 4px 6px; }
.menu .danger { color: var(--danger); }
.menu .head { padding: 10px 12px 8px; font-size: 14px; color: var(--ink-3); }
.menu .head b { display: block; color: var(--ink); font-size: 15px; }

/* =========================================================
   MODAL · <dialog class="modal" id="..."> dibuka lewat [data-open-modal="id"]
   ========================================================= */
.modal { width: min(520px, calc(100vw - 32px)); padding: 0; border-radius: var(--r-l); border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: 0 10px 0 var(--edge-shadow); }
.modal::backdrop { background: rgba(2, 6, 15, 0.55); }
.modal[open] { animation: fy-modal 0.35s var(--spring); }
@keyframes fy-modal { from { opacity: 0; transform: translateY(16px) scale(0.96); } }
.modal .m-body { position: relative; display: grid; gap: 12px; padding: 28px 26px 22px; }
.modal .m-body > img { width: 96px; height: auto; justify-self: center; }
.modal h2 { font-size: 28px; }
.modal p { color: var(--ink-2); }
.modal .m-foot { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; padding: 16px 26px 22px; }
.modal .m-close { position: absolute; top: 12px; right: 12px; }
.btn.danger { --bg: #c4323a; --fg: #fff; }

/* =========================================================
   TAB · <div class="tabs" data-tabs><div role="tablist">..</div><div role="tabpanel">..</div></div>
   ========================================================= */
.tabs [role="tablist"] { display: flex; gap: 4px; padding: 4px; border-radius: 999px; background: var(--surface); width: max-content; max-width: 100%; overflow-x: auto; }
.tabs [role="tab"] { flex: none; padding: 9px 16px; border: 0; border-radius: 999px; background: none; font: inherit; font-weight: 700; font-size: 14.5px; color: var(--ink-2); cursor: pointer; transition: background 0.2s, color 0.2s; }
.tabs [role="tab"][aria-selected="true"] { background: var(--card); color: var(--ink); box-shadow: 0 0 0 2px var(--edge), 0 3px 0 2px var(--edge-shadow); }
.tabs [role="tabpanel"] { padding-top: 18px; }
.tabs [role="tabpanel"][hidden] { display: none; }


/* PROGRES (garis) */
.progress { height: 12px; border-radius: 999px; background: var(--surface-2); overflow: hidden; border: 1.5px solid var(--line); }
.progress span { display: block; height: 100%; width: calc(var(--v, 0) * 100%); border-radius: inherit; background: linear-gradient(90deg, var(--blue-light), var(--blue)); }
.progress.go span { background: var(--go); } .progress.warn span { background: #e8a33d; }

/* =========================================================
   BADGE · angka atau titik di ikon / item navigasi
   <span class="has-badge"><svg/><span class="badge">3</span></span>
   ========================================================= */
.badge { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: #c4323a; color: #fff; font-family: var(--f-num); font-size: 11.5px; font-weight: 800; line-height: 1; box-shadow: 0 0 0 2px var(--card); }
.badge.dot { min-width: 10px; width: 10px; height: 10px; padding: 0; }
.badge.blue { background: var(--blue); }
.has-badge { position: relative; display: inline-grid; place-items: center; }
.has-badge > .badge { position: absolute; top: -6px; right: -8px; }
.has-badge > .badge.dot { top: -2px; right: -2px; }

/* =========================================================
   BUTTON GROUP · tombol tersambung, bisa pilih satu atau banyak
   <div class="btn-group" role="group" aria-label=".." data-btn-group="single|multi">
     <button type="button" aria-pressed="true">Hari</button> ...
   ========================================================= */
.btn-group { display: inline-flex; max-width: 100%; overflow-x: auto; border: 2px solid var(--edge); border-radius: 999px; background: var(--card); box-shadow: var(--shadow-pop); scrollbar-width: none; }
.btn-group::-webkit-scrollbar { display: none; }
.btn-group > button, .btn-group > a { flex: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 0 18px; border: 0; border-left: 2px solid var(--edge); background: none; font: inherit; font-weight: 700; font-size: 15px; color: var(--ink-2); text-decoration: none; white-space: nowrap; cursor: pointer; transition: background 0.2s, color 0.2s; }
.btn-group > :first-child { border-left: 0; }
.btn-group > :hover { background: var(--surface); color: var(--ink); }
.btn-group > [aria-pressed="true"] { background: var(--blue); color: #fff; }
.btn-group > [aria-pressed="true"]::before { content: ""; width: 11px; height: 6px; border-left: 2.5px solid currentColor; border-bottom: 2.5px solid currentColor; transform: translateY(-2px) rotate(-45deg); }
.btn-group > :focus-visible { outline: 3px solid var(--blue-light); outline-offset: -5px; border-radius: 999px; }
.btn-group svg { width: 18px; height: 18px; }
.btn-group.block { display: flex; } .btn-group.block > * { flex: 1; }

/* =========================================================
   SPLIT BUTTON · aksi utama + panah menu
   <div class="split-btn"><button class="btn">Simpan</button><button class="btn caret" data-dropdown aria-haspopup="menu" aria-expanded="false" aria-label="Pilihan lain"><svg/></button><div class="menu" role="menu" hidden>..</div></div>
   ========================================================= */
.split-btn { position: relative; display: inline-flex; gap: 3px; }
.split-btn > .btn:first-child { border-radius: 999px 8px 8px 999px; }
.split-btn > .btn.caret { border-radius: 8px 999px 999px 8px; padding: 0 14px 0 12px; }
.split-btn > .btn.caret svg { width: 20px; height: 20px; transition: transform 0.35s var(--spring); }
.split-btn > .btn.caret[aria-expanded="true"] svg { transform: rotate(180deg); }
.split-btn > .btn.sm.caret { padding: 0 10px; }

/* =========================================================
   FAB · tombol aksi utama yang melayang
   <div class="fab-dock"><button class="fab" aria-label="Buat"><svg/></button></div>
   .fab.ext = dengan label, .sm / .lg ukuran, .soft = versi biru muda
   [data-fab-shrink] = label disembunyikan saat scroll turun
   ========================================================= */
.fab { --bg: var(--blue); --fg: #fff; position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px; width: 60px; height: 60px; padding: 0; border-radius: 22px; border: 2px solid var(--edge); background: var(--bg); color: var(--fg); box-shadow: 0 4px 0 var(--edge-shadow); font: inherit; font-weight: 700; font-size: 16px; text-decoration: none; cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform 0.35s var(--spring), box-shadow 0.35s var(--spring); }
.fab:hover { transform: translateY(-3px); box-shadow: 0 7px 0 var(--edge-shadow); }
.fab:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--edge-shadow); }
.fab svg { width: 24px; height: 24px; flex: none; }
.fab.sm { width: 46px; height: 46px; border-radius: 16px; } .fab.sm svg { width: 20px; height: 20px; }
.fab.lg { width: 88px; height: 88px; border-radius: 30px; } .fab.lg svg { width: 34px; height: 34px; }
.fab.soft { --bg: var(--surface-2); --fg: var(--text-blue-deep); }
.fab.ext { width: auto; padding: 0 24px 0 18px; border-radius: 20px; }
.fab.ext.shrink { width: 60px; padding: 0; }
.fab.ext.shrink .label { display: none; }
.fab.ext.shrink svg { animation: fy-pop 0.35s var(--spring); }
.fab-dock { position: fixed; z-index: 70; right: max(16px, env(safe-area-inset-right)); bottom: calc(16px + env(safe-area-inset-bottom) + var(--navbar-h, 0px)); display: grid; justify-items: end; gap: 12px; }

/* FAB menu: <div class="fab-menu" data-fab-menu><ul class="fab-actions" id="x" hidden>..</ul><button class="fab" aria-expanded="false" aria-controls="x">..</button></div> */
.fab-menu { display: grid; justify-items: end; gap: 12px; }
.fab-actions { list-style: none; margin: 0; padding: 0; display: grid; justify-items: end; gap: 10px; }
.fab-actions[hidden] { display: none; }
.fab-action { display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 20px 0 18px; border-radius: 999px; border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: var(--shadow-pop); font: inherit; font-weight: 700; font-size: 15px; text-decoration: none; white-space: nowrap; cursor: pointer; animation: fy-rise 0.35s var(--spring) both; animation-delay: calc(var(--i, 0) * 45ms); }
.fab-action:hover { background: var(--surface); }
.fab-action svg { width: 20px; height: 20px; color: var(--text-blue); }
.fab-menu > .fab svg { transition: transform 0.35s var(--spring); }
.fab-menu > .fab[aria-expanded="true"] svg { transform: rotate(45deg); }
.fab-scrim { position: fixed; inset: 0; z-index: 69; background: rgba(2, 6, 15, 0.35); opacity: 0; pointer-events: none; transition: opacity 0.25s; }
.fab-scrim.on { opacity: 1; pointer-events: auto; }
@keyframes fy-rise { from { opacity: 0; transform: translateY(14px) scale(0.92); } }

/* =========================================================
   APP BAR HP · bilah atas aplikasi mobile
   <header class="appbar" data-appbar><button class="icon-btn">←</button><h1 class="title">Judul</h1><div class="actions">..</div></header>
   .appbar.collapse + <h1 class="appbar-title"> besar di bawahnya: judul kecil baru muncul setelah scroll
   ========================================================= */
.appbar { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; gap: 4px; min-height: 64px; padding: env(safe-area-inset-top) max(8px, env(safe-area-inset-right)) 0 max(8px, env(safe-area-inset-left)); background: var(--paper); transition: background 0.25s, box-shadow 0.25s; }
.appbar.scrolled { background: var(--card); box-shadow: 0 2px 0 var(--edge); }
.appbar .title { flex: 1; min-width: 0; padding: 0 8px; font-family: var(--f-head); font-weight: 800; font-size: 22px; line-height: 1.1; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.appbar .actions { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.appbar .icon-btn { background: none; width: 44px; height: 44px; }
.appbar .icon-btn:hover { background: var(--surface); }
.appbar.collapse .title { opacity: 0; transform: translateY(6px); transition: opacity 0.2s, transform 0.3s var(--ease); }
.appbar.collapse.scrolled .title { opacity: 1; transform: none; }
.appbar-title { padding: 6px max(16px, env(safe-area-inset-left)) 14px; font-size: clamp(34px, 9vw, 48px); }

/* =========================================================
   NAVIGATION BAR · menu bawah untuk HP (3 sampai 5 item)
   <nav class="navbar" aria-label="Menu utama"><a href="#" aria-current="page"><span class="ico"><svg/></span>Beranda</a>..</nav>
   Tambahkan .with-navbar di <body> supaya isi tidak tertutup.
   ========================================================= */
.with-navbar { --navbar-h: 76px; padding-bottom: calc(var(--navbar-h) + env(safe-area-inset-bottom)); }
.navbar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); padding: 6px max(6px, env(safe-area-inset-right)) calc(6px + env(safe-area-inset-bottom)) max(6px, env(safe-area-inset-left)); background: var(--card); border-top: 2px solid var(--edge); }
.navbar a, .navbar button, .rail-nav a, .rail-nav button { display: grid; justify-items: center; align-content: center; gap: 4px; min-height: 60px; min-width: 0; padding: 4px 2px; border: 0; background: none; font: inherit; font-size: 12.5px; font-weight: 700; line-height: 1.2; color: var(--ink-3); text-align: center; text-decoration: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.navbar .ico, .rail-nav .ico { position: relative; display: grid; place-items: center; width: 60px; height: 32px; border-radius: 999px; transition: background 0.25s, transform 0.35s var(--spring); }
.navbar svg, .rail-nav svg { width: 22px; height: 22px; }
.navbar a:hover .ico, .rail-nav a:hover .ico { background: var(--surface); }
.navbar [aria-current="page"], .rail-nav [aria-current="page"] { color: var(--ink); }
.navbar [aria-current="page"] .ico, .rail-nav [aria-current="page"] .ico { background: var(--blue); color: #fff; box-shadow: 0 0 0 2px var(--edge), 0 3px 0 2px var(--edge-shadow); }
.navbar a:active .ico, .rail-nav a:active .ico { transform: scale(0.9); }
.navbar .badge, .rail-nav .badge { position: absolute; top: -5px; right: 8px; }
.navbar .badge.dot, .rail-nav .badge.dot { top: 2px; right: 16px; }
.navbar .lbl, .rail-nav .lbl { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* =========================================================
   NAVIGATION RAIL · menu samping ramping untuk tablet
   <nav class="rail" aria-label="Menu utama"><div class="rail-top">(FAB)</div><div class="rail-nav"><a ..><span class="ico">..</span>Beranda</a></div></nav>
   Tambahkan .with-rail di <body>. Pola responsif: .m-app (navbar di HP, rail mulai 700px)
   ========================================================= */
.with-rail { padding-left: calc(92px + env(safe-area-inset-left)); }
.rail { position: fixed; left: 0; top: 0; bottom: 0; z-index: 60; width: calc(92px + env(safe-area-inset-left)); display: flex; flex-direction: column; align-items: center; gap: 18px; padding: max(18px, env(safe-area-inset-top)) 0 max(18px, env(safe-area-inset-bottom)) env(safe-area-inset-left); background: var(--card); border-right: 2px solid var(--edge); overflow-y: auto; }
.rail-top { display: grid; justify-items: center; gap: 14px; }
.rail-top .brand-mark { width: 40px; height: 40px; }
.rail-nav { display: grid; gap: 6px; width: 100%; }
.rail-nav a, .rail-nav button { min-height: 64px; }
.rail .rail-foot { margin-top: auto; }
.m-app .rail { display: none; }
@media (min-width: 700px) {
  .m-app { --navbar-h: 0px; padding-bottom: env(safe-area-inset-bottom); padding-left: calc(92px + env(safe-area-inset-left)); }
  .m-app .navbar { display: none; }
  .m-app .rail { display: flex; }
}

/* =========================================================
   SHEET · panel bawah (bottom sheet) dan panel samping (side sheet)
   <dialog class="sheet" id="s1" aria-labelledby="s1-t"><button class="sheet-handle" data-close aria-label="Tutup"></button><div class="sheet-head"><h2 id="s1-t">..</h2></div><div class="sheet-body">..</div><div class="sheet-foot">..</div></dialog>
   Buka: [data-open-sheet="s1"]. Tutup: [data-close], klik di luar, Esc, atau tarik pegangannya ke bawah.
   ========================================================= */
.sheet, .side-sheet { padding: 0; border: 2px solid var(--edge); background: var(--card); color: var(--ink); overflow: hidden; }
.sheet::backdrop, .side-sheet::backdrop { background: rgba(2, 6, 15, 0.5); animation: fy-fade 0.3s; }
.sheet { position: fixed; inset: auto 0 0 0; margin: 0 auto; width: 100%; max-width: min(640px, 100%); max-height: calc(100dvh - 40px); border-bottom: 0; border-radius: var(--r-l) var(--r-l) 0 0; box-shadow: 0 -4px 0 var(--edge-shadow); }
.sheet[open], .side-sheet[open] { display: flex; flex-direction: column; }
.sheet[open] { animation: fy-sheet-up 0.42s var(--ease); }
.sheet.closing { transform: translateY(105%) !important; transition: transform 0.26s cubic-bezier(0.4, 0, 1, 1); }
.sheet.dragging { transition: none; }
.sheet-handle { flex: none; display: grid; place-items: center; width: 100%; height: 30px; padding: 0; border: 0; background: none; cursor: grab; touch-action: none; }
.sheet-handle::before { content: ""; width: 44px; height: 5px; border-radius: 999px; background: var(--ink-3); opacity: 0.55; }
.sheet-head { flex: none; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 4px 22px 12px; }
.sheet-head h2 { font-size: 26px; }
.sheet-head p { color: var(--ink-3); font-size: 14.5px; }
.sheet-body { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 4px 22px 18px; }
.sheet-foot { flex: none; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; padding: 14px 22px calc(16px + env(safe-area-inset-bottom)); border-top: 1px solid var(--line); }
.sheet-foot .btn { justify-content: center; }
@media (max-width: 520px) { .sheet-foot .btn { flex: 1; } }
.side-sheet { position: fixed; inset: 0 0 0 auto; margin: 0; width: min(420px, 100vw); max-width: 100vw; height: 100dvh; max-height: 100dvh; border-right: 0; border-radius: var(--r-l) 0 0 var(--r-l); box-shadow: -6px 0 0 var(--edge-shadow); }
.side-sheet[open] { animation: fy-side-in 0.42s var(--ease); }
.side-sheet.closing { transform: translateX(105%) !important; transition: transform 0.26s cubic-bezier(0.4, 0, 1, 1); }
.side-sheet .sheet-head { padding: max(18px, env(safe-area-inset-top)) 16px 12px 22px; border-bottom: 1px solid var(--line); }
.side-sheet .sheet-body { padding-top: 18px; }
@keyframes fy-sheet-up { from { transform: translateY(100%); } }
@keyframes fy-side-in { from { transform: translateX(100%); } }
@keyframes fy-fade { from { opacity: 0; } }
html.sheet-open { overflow: hidden; }

/* Modal layar penuh di HP: <dialog class="modal full"> */
@media (max-width: 600px) {
  .modal.full { width: 100vw; max-width: 100vw; height: 100dvh; max-height: 100dvh; margin: 0; border: 0; border-radius: 0; box-shadow: none; }
  .modal.full .m-body { padding-top: max(28px, env(safe-area-inset-top)); }
}

/* =========================================================
   CAROUSEL · geser horizontal dengan snap, tanpa putar otomatis
   <section class="carousel" data-carousel aria-roledescription="carousel" aria-label="..">
     <div class="carousel-track" tabindex="0"><article class="slide" role="group" aria-roledescription="slide" aria-label="1 dari 4">..</article>..</div>
     <div class="carousel-nav"><button class="icon-btn" data-prev aria-label="Sebelumnya">..</button><button class="icon-btn" data-next aria-label="Berikutnya">..</button></div>
   </section>
   .carousel.full = satu slide selebar layar
   ========================================================= */
.carousel { position: relative; min-width: 0; display: grid; gap: 8px; }
.carousel-track { --slide: min(78%, 320px); display: grid; grid-auto-flow: column; grid-auto-columns: var(--slide); gap: 16px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: 4px 4px 14px; margin: -4px -4px 0; scrollbar-width: none; border-radius: var(--r-l); }
.carousel-track::-webkit-scrollbar { display: none; }
.carousel-track:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 2px; }
.carousel.full .carousel-track { --slide: 100%; padding-inline: 4px; }
.carousel.wide .carousel-track { --slide: min(86%, 520px); }
.slide { position: relative; min-width: 0; scroll-snap-align: start; border-radius: var(--r-l); border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: var(--shadow-sticker); overflow: hidden; }
.slide > img { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; background: var(--surface); }
.slide .slide-body { display: grid; gap: 4px; padding: 14px 16px 16px; }
.slide .slide-body b { font-size: 17px; }
.slide .slide-body span { font-size: 14px; color: var(--ink-3); }
.carousel-nav { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.carousel-nav .icon-btn[disabled] { opacity: 0.4; cursor: default; transform: none; }
.carousel-dots { display: flex; gap: 2px; margin-right: auto; }
.carousel-dots button { width: 28px; height: 28px; padding: 0; border: 0; background: none; display: grid; place-items: center; cursor: pointer; }
.carousel-dots button::before { content: ""; width: 8px; height: 8px; border-radius: 999px; background: var(--line); transition: background 0.2s, transform 0.3s var(--spring); }
.carousel-dots button[aria-current="true"]::before { background: var(--blue); transform: scale(1.35); }
@media (prefers-reduced-motion: reduce) { .carousel-track { scroll-behavior: auto; } }

/* =========================================================
   SLIDER · <input type="range" class="slider" data-slider>
   Dua ujung: <div class="range2" data-range2><input type="range" class="slider" aria-label="Minimum"><input type="range" class="slider" aria-label="Maksimum"></div>
   ========================================================= */
.slider { --p: 50%; -webkit-appearance: none; appearance: none; display: block; width: 100%; height: 44px; margin: 0; background: transparent; cursor: pointer; touch-action: pan-y; }
.slider:focus-visible { outline: none; }
.slider::-webkit-slider-runnable-track { height: 10px; border-radius: 999px; border: 2px solid var(--edge); background: linear-gradient(90deg, var(--blue) var(--p), var(--surface-2) var(--p)); }
.slider::-moz-range-track { height: 10px; border-radius: 999px; border: 2px solid var(--edge); background: linear-gradient(90deg, var(--blue) var(--p), var(--surface-2) var(--p)); }
.slider::-webkit-slider-thumb { -webkit-appearance: none; width: 26px; height: 26px; margin-top: -10px; border-radius: 50%; background: var(--card); border: 2px solid var(--edge); box-shadow: 0 3px 0 var(--edge-shadow); transition: transform 0.25s var(--spring); }
.slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: var(--card); border: 2px solid var(--edge); box-shadow: 0 3px 0 var(--edge-shadow); transition: transform 0.25s var(--spring); }
.slider:active::-webkit-slider-thumb { transform: scale(1.15); }
.slider:active::-moz-range-thumb { transform: scale(1.15); }
.slider:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 5px rgba(83, 157, 233, 0.45), 0 3px 0 var(--edge-shadow); }
.slider:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 5px rgba(83, 157, 233, 0.45), 0 3px 0 var(--edge-shadow); }
.slider:disabled { opacity: 0.45; cursor: not-allowed; }
.slider-field { display: grid; gap: 2px; }
.slider-field .top { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; font-weight: 700; }
.slider-field output { font-family: var(--f-num); font-weight: 800; color: var(--text-blue-deep); font-variant-numeric: tabular-nums; }
.slider-field .ends { display: flex; justify-content: space-between; font-size: 13px; color: var(--ink-3); font-family: var(--f-num); }
.range2 { --a: 20%; --b: 80%; position: relative; height: 44px; }
.range2::before { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 14px; transform: translateY(-50%); border-radius: 999px; border: 2px solid var(--edge); background: linear-gradient(90deg, var(--surface-2) var(--a), var(--blue) var(--a), var(--blue) var(--b), var(--surface-2) var(--b)); }
.range2 .slider { position: absolute; inset: 0; pointer-events: none; }
.range2 .slider::-webkit-slider-runnable-track { background: none; border-color: transparent; }
.range2 .slider::-moz-range-track { background: none; border-color: transparent; }
.range2 .slider::-webkit-slider-thumb { pointer-events: auto; }
.range2 .slider::-moz-range-thumb { pointer-events: auto; }

/* =========================================================
   TOOLTIP · label singkat saat disorot, difokus keyboard, atau ditekan lama di HP
   <span class="tip-wrap"><button class="icon-btn" aria-label="Unduh" aria-describedby="t1">..</button><span class="tip" role="tooltip" id="t1">Unduh laporan</span></span>
   .tip.below = muncul di bawah
   ========================================================= */
.tip-wrap { position: relative; display: inline-flex; }
.tip { --dx: 0px; position: absolute; left: 50%; bottom: calc(100% + 10px); z-index: 80; width: max-content; max-width: min(240px, 70vw); padding: 7px 12px; border-radius: 10px; background: var(--inverse-bg); color: var(--inverse-fg); font-size: 13.5px; font-weight: 700; line-height: 1.35; text-align: center; pointer-events: none; opacity: 0; visibility: hidden; transform: translate(calc(-50% + var(--dx)), 6px); transition: opacity 0.15s, transform 0.25s var(--spring), visibility 0s 0.25s; }
.tip::after { content: ""; position: absolute; left: calc(50% - var(--dx)); top: 100%; width: 10px; height: 10px; background: inherit; transform: translate(-50%, -6px) rotate(45deg); border-radius: 2px; }
.tip.below { bottom: auto; top: calc(100% + 10px); transform: translate(calc(-50% + var(--dx)), -6px); }
.tip.below::after { top: auto; bottom: 100%; transform: translate(-50%, 6px) rotate(45deg); }
@media (hover: hover) { .tip-wrap:hover .tip { opacity: 1; visibility: visible; transform: translate(calc(-50% + var(--dx)), 0); transition-delay: 0.35s, 0.35s, 0s; } }
.tip-wrap:has(:focus-visible) .tip, .tip-wrap.tip-on .tip { opacity: 1; visibility: visible; transform: translate(calc(-50% + var(--dx)), 0); transition-delay: 0s; }
.tip-wrap.tip-off .tip { opacity: 0 !important; visibility: hidden !important; }

/* =========================================================
   LIST · daftar umum (pengaturan, kontak, notifikasi, hasil pencarian)
   <ul class="list divided"><li><a class="li" href="#"><span class="li-lead avatar">AR</span><span class="li-txt"><b>Judul</b><span>Keterangan</span></span><span class="li-trail">2 j</span></a></li></ul>
   ========================================================= */
.list { list-style: none; margin: 0; padding: 4px 0; display: grid; min-width: 0; }
.list > li { min-width: 0; }
.list .sub { padding: 16px 16px 6px; font-family: var(--f-num); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
.list.divided > li + li:not(.sub) { border-top: 1px solid var(--line); }
.li { display: flex; align-items: center; gap: 14px; min-height: 60px; width: 100%; padding: 10px 16px; border: 0; border-radius: var(--r-m); background: none; color: var(--ink); font: inherit; text-align: left; text-decoration: none; }
a.li, button.li, label.li { cursor: pointer; transition: background 0.2s; }
a.li:hover, button.li:hover, label.li:hover { background: var(--surface); }
.list.divided .li { border-radius: 0; }
.li-lead { flex: none; }
.li-ico { flex: none; display: grid; place-items: center; width: 42px; height: 42px; border-radius: 14px; background: var(--surface-2); color: var(--text-blue-deep); }
.li-ico svg { width: 21px; height: 21px; }
.li-txt { flex: 1; min-width: 0; display: grid; gap: 2px; }
.li-txt b { font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.li-txt span { font-size: 14px; line-height: 1.45; color: var(--ink-3); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.li-trail { flex: none; margin-left: auto; display: flex; align-items: center; gap: 8px; color: var(--ink-3); font-family: var(--f-num); font-size: 13px; }
.li-trail > svg { width: 20px; height: 20px; }
.li .unread { width: 10px; height: 10px; border-radius: 50%; background: var(--blue); }

/* =========================================================
   CHIP INTERAKTIF · .chip tetap khusus status produk
   Filter: <button class="chip-btn" aria-pressed="false">Gratis</button>
   Aksi:   <button class="chip-btn"><svg/>Bagikan</button>
   Input:  <span class="chip-input">Bogor<button class="x" aria-label="Hapus Bogor">×</button></span>
   Pembungkus: <div class="chip-set" role="group" aria-label=".."> (.scroll = satu baris geser)
   ========================================================= */
.chip-set { display: flex; flex-wrap: wrap; gap: 8px; min-width: 0; }
.chip-set.scroll { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; padding: 2px 2px 6px; margin: -2px -2px 0; }
.chip-set.scroll::-webkit-scrollbar { display: none; }
.chip-btn { flex: none; display: inline-flex; align-items: center; gap: 7px; min-height: 38px; padding: 0 15px; border-radius: 12px; border: 2px solid var(--line); background: var(--card); color: var(--ink-2); font: inherit; font-size: 14.5px; font-weight: 700; white-space: nowrap; text-decoration: none; cursor: pointer; transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.3s var(--spring); }
.chip-btn:hover { border-color: var(--blue-light); color: var(--ink); }
.chip-btn:active { transform: scale(0.96); }
.chip-btn svg { width: 18px; height: 18px; }
.chip-btn[aria-pressed="true"] { background: var(--blue); border-color: var(--edge); color: #fff; box-shadow: 0 2px 0 var(--edge-shadow); }
.chip-btn[aria-pressed="true"]::before { content: ""; width: 10px; height: 6px; border-left: 2.4px solid currentColor; border-bottom: 2.4px solid currentColor; transform: translateY(-2px) rotate(-45deg); }
.chip-input { flex: none; display: inline-flex; align-items: center; gap: 6px; min-height: 38px; padding: 0 3px 0 13px; border-radius: 12px; border: 2px solid var(--line); background: var(--surface); color: var(--ink); font-size: 14.5px; font-weight: 700; white-space: nowrap; }
.chip-input.with-av { padding-left: 4px; }
.chip-input .avatar { --s: 26px; border-width: 1.5px; }
.chip-input .x { display: grid; place-items: center; width: 30px; height: 30px; padding: 0; border: 0; border-radius: 9px; background: none; color: var(--ink-3); font: inherit; font-size: 20px; line-height: 1; cursor: pointer; }
.chip-input .x:hover { background: var(--surface-2); color: var(--ink); }
.chip-input .x svg { width: 16px; height: 16px; }

/* =========================================================
   LOADING · spinner segel, skeleton, progres lingkaran, progres tanpa angka
   <span class="spinner" role="status" aria-label="Memuat"></span>
   <span class="skel text" style="width:60%"></span>
   ========================================================= */
.spinner { --s: 30px; --spin: var(--blue); display: inline-block; flex: none; width: var(--s); height: var(--s); vertical-align: middle; animation: fy-breathe 1.6s var(--ease) infinite; }
.spinner::before { content: ""; display: block; width: 100%; height: 100%; background: var(--spin); -webkit-mask: var(--seal-mask) center / contain no-repeat; mask: var(--seal-mask) center / contain no-repeat; animation: fy-spin 1.6s linear infinite; }
.spinner.sm { --s: 18px; } .spinner.lg { --s: 52px; }
.spinner.contained { --s: 44px; padding: 8px; border-radius: 50%; background: var(--surface-2); }
.btn .spinner { --s: 18px; --spin: currentColor; }
.btn[aria-busy="true"] { cursor: progress; pointer-events: none; }
@keyframes fy-breathe { 50% { transform: scale(0.8); } }
@media (prefers-reduced-motion: reduce) { .spinner { animation: none !important; } .spinner::before { animation: fy-spin 3s linear infinite !important; } }
.loading-block { display: grid; justify-items: center; gap: 10px; padding: 28px 16px; color: var(--ink-3); font-size: 14.5px; text-align: center; }

.skel { position: relative; display: block; overflow: hidden; border-radius: 10px; background: var(--surface-2); color: transparent !important; }
.skel::after { content: ""; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent); animation: fy-shimmer 1.4s ease-in-out infinite; }
:root[data-theme="dark"] .skel::after { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .skel::after { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent); } }
.skel.text { height: 0.9em; margin: 0.35em 0; border-radius: 6px; }
.skel.title { height: 1.4em; width: 60%; border-radius: 8px; }
.skel.circle { border-radius: 50%; }
.skel.block { aspect-ratio: 16 / 9; border-radius: var(--r-m); }
@keyframes fy-shimmer { to { transform: translateX(100%); } }

.ring { --v: 0; --s: 64px; position: relative; display: inline-grid; place-items: center; flex: none; width: var(--s); height: var(--s); border-radius: 50%; background: conic-gradient(var(--blue) calc(var(--v) * 1turn), var(--surface-2) 0); font-family: var(--f-num); font-weight: 800; font-size: calc(var(--s) * 0.24); color: var(--ink); }
.ring::before { content: ""; position: absolute; inset: calc(var(--s) * 0.14); border-radius: 50%; background: var(--card); }
.ring > * { position: relative; }
.progress.indeterminate span { width: 40%; animation: fy-indet 1.3s var(--ease) infinite; }
@keyframes fy-indet { from { transform: translateX(-100%); } to { transform: translateX(260%); } }

/* =========================================================
   SNACKBAR · kabar singkat dengan tombol aksi (mis. Batalkan)
   JS: snackbar("Pesan diarsipkan", { action: "Batalkan", onAction() {} })
   Deklaratif: <button data-snackbar="Tersimpan" data-snackbar-action="Lihat">
   ========================================================= */
.snackbar { position: fixed; left: 50%; bottom: calc(20px + env(safe-area-inset-bottom) + var(--navbar-h, 0px)); z-index: 330; display: flex; align-items: center; gap: 4px 10px; width: max-content; max-width: min(560px, calc(100vw - 32px)); min-height: 52px; padding: 6px 6px 6px 18px; border-radius: 16px; border: 2px solid var(--edge); background: var(--inverse-bg); color: var(--inverse-fg); box-shadow: 0 4px 0 var(--edge-shadow); font-size: 15px; font-weight: 700; opacity: 0; visibility: hidden; transform: translate(-50%, 24px); transition: transform 0.45s var(--spring), opacity 0.2s, visibility 0s 0.45s; }
.snackbar.show { opacity: 1; visibility: visible; transform: translate(-50%, 0); transition-delay: 0s; }
.snackbar .sb-text { flex: 1; min-width: 0; padding: 8px 0; }
.snackbar .sb-act { flex: none; min-height: 40px; padding: 0 14px; border: 0; border-radius: 10px; background: none; color: var(--inverse-accent); font: inherit; font-weight: 800; cursor: pointer; }
.snackbar .sb-act:hover { background: rgba(127, 127, 127, 0.18); }
.snackbar .sb-x { flex: none; display: grid; place-items: center; width: 40px; height: 40px; border: 0; border-radius: 10px; background: none; color: inherit; cursor: pointer; }
.snackbar .sb-x:hover { background: rgba(127, 127, 127, 0.18); }
.snackbar .sb-x svg { width: 18px; height: 18px; }
.snackbar :focus-visible { outline-color: var(--inverse-accent); outline-offset: 1px; }
@media (max-width: 520px) { .snackbar { left: 16px; right: 16px; width: auto; max-width: none; transform: translateY(24px); } .snackbar.show { transform: none; } }

/* =========================================================
   SEARCH BAR + SARAN
   <div class="search-bar" data-suggest><svg/><input type="search" role="combobox" aria-expanded="false" aria-controls="sg" aria-autocomplete="list" aria-label=".."><ul class="suggest" id="sg" role="listbox" hidden><li role="option">..</li></ul></div>
   ========================================================= */
.search-bar { position: relative; display: flex; align-items: center; gap: 4px; min-height: 54px; padding: 0 6px 0 16px; border-radius: 999px; border: 2px solid var(--edge); background: var(--card); box-shadow: var(--shadow-pop); }
.search-bar > svg { flex: none; width: 20px; height: 20px; color: var(--ink-3); }
.search-bar input { flex: 1; min-width: 0; height: 50px; padding: 0 8px; border: 0; background: none; color: var(--ink); font: inherit; font-size: 16px; }
.search-bar input::placeholder { color: var(--placeholder); }
.search-bar input:focus { outline: none; }
.search-bar:focus-within { box-shadow: 0 0 0 4px rgba(83, 157, 233, 0.3), var(--shadow-pop); }
.search-bar input::-webkit-search-cancel-button { -webkit-appearance: none; }
.search-bar .icon-btn { flex: none; background: none; }
.search-bar .avatar { --s: 38px; }
.suggest { position: absolute; left: 0; right: 0; top: calc(100% + 8px); z-index: 55; list-style: none; margin: 0; padding: 6px; max-height: min(320px, 60vh); overflow-y: auto; border-radius: var(--r-m); border: 2px solid var(--edge); background: var(--card); box-shadow: var(--shadow-sticker); }
.suggest[hidden] { display: none; }
.suggest [role="option"] { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 8px 12px; border-radius: 10px; color: var(--ink-2); font-weight: 700; cursor: pointer; }
.suggest [role="option"] svg { width: 18px; height: 18px; color: var(--ink-3); flex: none; }
.suggest [role="option"]:hover, .suggest [role="option"][aria-selected="true"] { background: var(--surface); color: var(--ink); }
.suggest .none { padding: 12px; color: var(--ink-3); font-size: 14.5px; }

/* =========================================================
   DATE & TIME PICKER
   <div class="picker" data-datepicker [data-range] [data-min="2026-10-01"] [data-max]>
     <input class="input" id="tgl" readonly placeholder="Pilih tanggal">
     <button type="button" class="picker-btn" aria-label="Buka kalender">..</button>
     <input type="hidden" name="tanggal">
   </div>
   Jam: data-timepicker [data-step="5"]. Popup dibuat oleh controls.js.
   ========================================================= */
.picker { position: relative; }
.picker .input { padding-right: 52px; cursor: pointer; }
.picker-btn { position: absolute; right: 5px; top: 50%; transform: translateY(-50%); display: grid; place-items: center; width: 42px; height: 42px; border: 0; border-radius: 12px; background: none; color: var(--text-blue-deep); cursor: pointer; }
.picker-btn:hover { background: var(--surface); }
.picker-btn svg { width: 21px; height: 21px; }
.pop { position: absolute; left: 0; top: calc(100% + 8px); z-index: 90; width: max-content; max-width: min(340px, calc(100vw - 24px)); padding: 14px; border-radius: var(--r-l); border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: var(--shadow-sticker); animation: fy-rise 0.3s var(--spring); }
.pop.end { left: auto; right: 0; }
.pop-scrim { display: none; }
@media (max-width: 600px) {
  .pop { position: fixed; left: 12px !important; right: 12px !important; top: auto; bottom: calc(12px + env(safe-area-inset-bottom)); width: auto; max-width: none; margin-inline: auto; max-height: calc(100dvh - 24px); overflow-y: auto; }
  .pop-scrim { display: block; position: fixed; inset: 0; z-index: 89; background: rgba(2, 6, 15, 0.45); animation: fy-fade 0.25s; }
}
.dp-head { display: flex; align-items: center; gap: 4px; margin-bottom: 8px; }
.dp-title { flex: 1; text-align: center; font-family: var(--f-head); font-weight: 800; font-size: 20px; }
.dp-head button, .tp-foot button.icon { display: grid; place-items: center; width: 44px; height: 44px; border: 0; border-radius: 12px; background: none; color: var(--ink-2); cursor: pointer; }
.dp-head button:hover { background: var(--surface); }
.dp-head svg { width: 20px; height: 20px; }
.dp-grid { display: grid; grid-template-columns: repeat(7, 44px); gap: 2px; justify-content: center; }
@media (max-width: 600px) { .dp-grid { grid-template-columns: repeat(7, minmax(0, 1fr)); } }
.dp-wd { display: grid; place-items: center; height: 30px; font-family: var(--f-num); font-size: 12px; font-weight: 700; color: var(--ink-3); text-transform: uppercase; }
.dp-day { position: relative; height: 44px; padding: 0; border: 0; border-radius: 50%; background: none; color: var(--ink); font: inherit; font-family: var(--f-num); font-size: 15px; font-weight: 700; font-variant-numeric: tabular-nums; cursor: pointer; }
.dp-day:hover { background: var(--surface); }
.dp-day.out { color: var(--ink-3); font-weight: 400; }
.dp-day[aria-current="date"] { box-shadow: inset 0 0 0 2px var(--blue-light); }
.dp-day.in-range { border-radius: 0; background: var(--surface-2); }
.dp-day[aria-pressed="true"] { background: var(--blue); color: #fff; box-shadow: inset 0 0 0 2px var(--edge); }
.dp-day:disabled { color: var(--ink-3); opacity: 0.35; cursor: not-allowed; background: none; text-decoration: line-through; }
.dp-day:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 1px; }
.dp-foot, .tp-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--line); }
.dp-foot .hint { font-size: 13px; color: var(--ink-3); }
.pop .txt-btn { min-height: 40px; padding: 0 14px; border: 0; border-radius: 10px; background: none; color: var(--text-blue-deep); font: inherit; font-weight: 800; cursor: pointer; }
.pop .txt-btn:hover { background: var(--surface); }
.tp-cols { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 8px; }
.tp-sep { font-family: var(--f-head); font-weight: 800; font-size: 34px; color: var(--ink-3); }
.tp-col { display: grid; gap: 4px; justify-items: stretch; }
.tp-col > span { text-align: center; font-family: var(--f-num); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); }
.tp-list { list-style: none; margin: 0; padding: 4px; width: 96px; height: 212px; overflow-y: auto; overscroll-behavior: contain; scroll-snap-type: y proximity; border-radius: var(--r-m); background: var(--surface); scrollbar-width: none; }
.tp-list::-webkit-scrollbar { display: none; }
.tp-list:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 2px; }
.tp-list li { display: grid; place-items: center; height: 44px; scroll-snap-align: center; border-radius: 12px; font-family: var(--f-num); font-size: 22px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--ink-2); cursor: pointer; }
.tp-list li:hover { background: var(--surface-2); }
.tp-list li[aria-selected="true"] { background: var(--blue); color: #fff; box-shadow: inset 0 0 0 2px var(--edge); }
.tp-list li.active:not([aria-selected="true"]) { outline: 2px solid var(--blue-light); outline-offset: -2px; }
@media (max-width: 600px) { .tp-list { width: 100%; } }

/* =========================================================
   FLOATING TOOLBAR · bilah aksi melayang (mis. saat memilih item)
   <div class="float-bar" role="toolbar" aria-label=".."><span class="fb-count">3 dipilih</span><button class="icon-btn">..</button></div>
   ========================================================= */
.float-bar { display: inline-flex; align-items: center; gap: 4px; max-width: calc(100vw - 32px); padding: 6px; border-radius: 999px; border: 2px solid var(--edge); background: var(--card); box-shadow: var(--shadow-sticker); overflow-x: auto; scrollbar-width: none; }
.float-bar .icon-btn { flex: none; background: none; width: 44px; height: 44px; }
.float-bar .icon-btn:hover { background: var(--surface); }
.float-bar .fb-count { flex: none; padding: 0 12px 0 10px; font-family: var(--f-num); font-weight: 800; font-size: 14.5px; white-space: nowrap; }
.float-bar .sep { flex: none; width: 2px; height: 24px; margin: 0 4px; background: var(--line); }
.float-bar.dock { position: fixed; left: 50%; bottom: calc(18px + env(safe-area-inset-bottom) + var(--navbar-h, 0px)); z-index: 65; transform: translateX(-50%); }

/* Label kolom yang memakai <label for> (mis. picker), selaras dengan .field > span */
.field > label:not(.check):first-child { font-weight: 700; font-size: 15px; }

/* =========================================================
   OTP · kode verifikasi per kotak
   <div class="otp" data-otp><input name="kode" inputmode="numeric" maxlength="6" autocomplete="one-time-code" aria-label="Kode verifikasi 6 digit"></div>
   Tanpa JS tetap satu kolom biasa. Dengan JS jadi 6 kotak; tempel kode atau isi otomatis dari SMS tetap jalan.
   ========================================================= */
.otp { position: relative; display: flex; gap: clamp(6px, 2vw, 10px); min-width: 0; max-width: 100%; }
.otp > input:only-child { width: 100%; max-width: 260px; height: 56px; padding: 0 16px; border-radius: 14px; border: 2px solid var(--edge); background: var(--field); color: var(--ink); font: 700 24px var(--f-num); letter-spacing: 0.3em; }
.otp-box { flex: 1 1 0; min-width: 0; max-width: 54px; height: 60px; padding: 0; text-align: center; border-radius: 14px; border: 2px solid var(--edge); background: var(--field); color: var(--ink); font: 700 26px var(--f-num); font-variant-numeric: tabular-nums; box-shadow: var(--shadow-pop); caret-color: var(--blue); transition: transform 0.2s var(--spring), border-color 0.2s; }
.otp-box:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 4px rgba(83, 157, 233, 0.3), var(--shadow-pop); }
.otp-box.filled { background: var(--surface); }
.otp .otp-sep { flex: none; align-self: center; width: 10px; height: 2px; border-radius: 2px; background: var(--line); }
.otp[aria-invalid="true"] .otp-box { border-color: var(--danger); background: var(--danger-bg); }
.otp.shake { animation: fy-shake 0.4s var(--ease); }
@keyframes fy-shake { 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
.otp.done .otp-box { border-color: var(--go); }
.otp-store { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.resend { font-size: 15px; color: var(--ink-2); }
.resend button { padding: 8px 2px; border: 0; background: none; font: inherit; font-weight: 700; color: var(--text-blue-deep); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.resend button:disabled { color: var(--ink-3); text-decoration: none; cursor: default; }

/* =========================================================
   UPLOAD · seret-lepas file, pratinjau, hapus, progres
   <div class="upload" data-upload data-max-mb="5" data-max-files="3">
     <input type="file" id="up" name="berkas" accept="image/*,.pdf" multiple>
     <label class="drop" for="up">..ikon.. <b>Pilih file</b> atau seret ke sini <small>JPG, PNG, PDF · maks 5 MB</small></label>
     <ul class="upload-list"></ul>
   </div>
   ========================================================= */
.upload { position: relative; display: grid; gap: 12px; }
.upload > input[type="file"] { position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden; }
.drop { display: grid; justify-items: center; gap: 6px; padding: 26px 18px; border-radius: var(--r-l); border: 2px dashed var(--blue-light); background: var(--surface); color: var(--ink-2); text-align: center; cursor: pointer; transition: background 0.2s, border-color 0.2s, transform 0.25s var(--spring); }
.drop svg { width: 34px; height: 34px; color: var(--text-blue); }
.drop b { color: var(--text-blue-deep); text-decoration: underline; text-underline-offset: 3px; }
.drop small { font-size: 13.5px; color: var(--ink-3); }
.drop:hover { background: var(--surface-2); }
.upload > input:focus-visible + .drop { outline: 3px solid var(--blue-light); outline-offset: 3px; }
.upload.over .drop { border-style: solid; border-color: var(--blue); background: var(--surface-2); transform: scale(1.01); }
.upload.full .drop { display: none; }
.upload.single .drop.has { display: none; }
.upload-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.upload-list:empty { display: none; }
.up-item { position: relative; display: grid; grid-template-columns: 52px minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 10px 8px 10px 10px; border-radius: var(--r-m); border: 2px solid var(--edge); background: var(--card); box-shadow: var(--shadow-pop); }
.up-thumb { width: 52px; height: 52px; border-radius: 12px; object-fit: cover; background: var(--surface); display: grid; place-items: center; color: var(--text-blue); font: 700 12px var(--f-num); letter-spacing: 0.06em; text-transform: uppercase; }
.up-thumb.round { border-radius: 50%; }
.up-meta { min-width: 0; display: grid; gap: 2px; }
.up-meta b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 15px; }
.up-meta small { font-size: 13px; color: var(--ink-3); }
.up-meta .progress { height: 6px; margin-top: 4px; }
.up-item.error { border-color: var(--danger); }
.up-item.error .up-meta small { color: var(--danger); font-weight: 700; }
.up-item .icon-btn { width: 44px; height: 44px; background: none; }
.upload .err { color: var(--danger); font-weight: 700; font-size: 14px; }

/* =========================================================
   STEPPER / FORM BERTAHAP
   <form class="wizard" data-wizard data-done="#selesai">
     <ol class="stepper"></ol>                      ← diisi otomatis dari judul tiap langkah
     <fieldset class="wizard-step" data-title="Data diri">..</fieldset>
     <fieldset class="wizard-step" data-title="Kampus" hidden>..</fieldset>
     <div class="wizard-foot"><button class="btn ghost" type="button" data-wizard-prev>Kembali</button><button class="btn" type="submit" data-wizard-next>Lanjut</button></div>
   </form>
   Tombol Lanjut mengecek kolom wajib di langkah itu saja. Event: fy:step { index, total }.
   ========================================================= */
.stepper { --n: 40px; list-style: none; margin: 0 0 22px; padding: 0; display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 8px; counter-reset: fy-step; }
.stepper li { position: relative; display: grid; justify-items: center; gap: 8px; text-align: center; font-size: 14px; font-weight: 700; color: var(--ink-3); counter-increment: fy-step; }
.stepper li::before { content: counter(fy-step); display: grid; place-items: center; width: var(--n); height: var(--n); border-radius: 50%; border: 2px solid var(--line); background: var(--card); font-family: var(--f-num); font-weight: 800; font-size: 16px; color: var(--ink-3); position: relative; z-index: 1; transition: background 0.25s, border-color 0.25s, color 0.25s; }
.stepper li:not(:last-child)::after { content: ""; position: absolute; top: calc(var(--n) / 2 - 1px); left: calc(50% + var(--n) / 2 + 4px); right: calc(-50% + var(--n) / 2 + 4px); border-top: 2px dashed var(--line); }
.stepper li[aria-current="step"] { color: var(--ink); }
.stepper li[aria-current="step"]::before { border-color: var(--edge); background: var(--blue); color: #fff; box-shadow: 0 3px 0 var(--edge-shadow); }
.stepper li.done { color: var(--ink-2); }
.stepper li.done::before { content: ""; border-color: var(--blue); background: var(--blue) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center / 20px no-repeat; }
.stepper li.done:not(:last-child)::after { border-top-style: solid; border-color: var(--blue); }
.stepper .step-sub { display: block; font-weight: 400; font-size: 12.5px; color: var(--ink-3); }
.wizard-step { border: 0; margin: 0; padding: 0; min-width: 0; display: grid; gap: 16px; }
.wizard-step[hidden] { display: none; }
.wizard-step > legend { padding: 0; margin-bottom: 4px; font-family: var(--f-head); font-weight: 800; font-size: 26px; line-height: 1.05; color: var(--ink); outline: none; }
.wizard-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; margin-top: 22px; }
.wizard-foot [data-wizard-prev][hidden] { display: inline-flex; visibility: hidden; }
.wizard-count { display: none; font-family: var(--f-num); font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); }
/* HP: lingkaran saja, judul langkah aktif ditulis di bawah */
@media (max-width: 560px) {
  .stepper { --n: 34px; margin-bottom: 8px; }
  .stepper li { font-size: 0; gap: 0; }
  .stepper li .step-sub { display: none; }
  .wizard-count { display: block; margin-bottom: 14px; }
}

/* =========================================================
   TABEL BISA DIURUTKAN
   <table class="table" data-sort> lalu tandai kolomnya: <th data-sort-key>Nama</th>
   Jenis isi: data-sort-key="num" (angka) / "date" (tanggal). Nilai urut khusus per sel: <td data-value="2026-10-12">.
   Event: fy:sort { column, dir }.
   ========================================================= */
.table th[aria-sort] { padding: 0; }
.sort-btn { display: flex; align-items: center; gap: 6px; width: 100%; min-height: 44px; padding: 10px 18px; border: 0; background: none; font: inherit; letter-spacing: inherit; text-transform: inherit; color: inherit; text-align: left; cursor: pointer; }
.sort-btn:hover { color: var(--ink); }
.sort-btn:focus-visible { outline: 3px solid var(--blue-light); outline-offset: -3px; border-radius: 8px; }
.sort-btn svg { flex: none; width: 15px; height: 15px; opacity: 0.45; transition: transform 0.25s var(--ease), opacity 0.2s; }
.table th.num .sort-btn { justify-content: flex-end; }
th[aria-sort="ascending"] .sort-btn, th[aria-sort="descending"] .sort-btn { color: var(--text-blue); }
th[aria-sort="ascending"] .sort-btn svg, th[aria-sort="descending"] .sort-btn svg { opacity: 1; }
th[aria-sort="descending"] .sort-btn svg { transform: rotate(180deg); }
th[aria-sort="none"] .sort-btn .sort-arrow { display: none; }
th:not([aria-sort="none"]) .sort-btn .sort-both { display: none; }

/* =========================================================
   PUSAT NOTIFIKASI
   <div class="notif" data-notif>
     <button class="icon-btn has-badge" aria-expanded="false" aria-controls="nt">..<span class="badge">3</span></button>
     <section class="notif-panel" id="nt" role="dialog" aria-label="Notifikasi" hidden>
       <header class="notif-head"><h2>Notifikasi</h2><button class="notif-readall">Tandai semua dibaca</button></header>
       <div class="btn-group sm" ..>Semua / Belum dibaca</div>
       <ul class="notif-list"><li class="notif-item unread"><a href="#">..</a></li></ul>
       <div class="notif-empty" hidden>..</div>
       <a class="notif-all" href="#">Lihat semua</a>
     </section>
   </div>
   Di HP panel muncul dari bawah layar. Event: fy:read { item | all }.
   ========================================================= */
.notif { position: relative; display: inline-flex; }
.notif-panel { position: absolute; right: -8px; top: calc(100% + 10px); z-index: 80; width: min(400px, calc(100vw - 24px)); max-height: min(560px, calc(100dvh - 120px)); display: flex; flex-direction: column; border-radius: var(--r-l); border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: var(--shadow-sticker); overflow: hidden; text-align: left; }
.notif-panel[hidden] { display: none; }
.notif-panel.open { animation: fy-pop-in 0.3s var(--spring); }
@keyframes fy-pop-in { from { opacity: 0; transform: translateY(-8px) scale(0.98); } }
.notif-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 16px 18px 10px; }
.notif-head h2 { font-size: 22px; }
.notif-readall { border: 0; background: none; padding: 8px 4px; font: inherit; font-size: 14px; font-weight: 700; color: var(--text-blue-deep); cursor: pointer; }
.notif-readall:hover { text-decoration: underline; }
.notif-readall:disabled { color: var(--ink-3); cursor: default; text-decoration: none; }
.notif-filter { padding: 0 18px 10px; }
.notif-list { list-style: none; margin: 0; padding: 4px 8px 8px; overflow-y: auto; overscroll-behavior: contain; flex: 1; min-height: 0; }
.notif-item > a, .notif-item > button { position: relative; display: grid; grid-template-columns: 40px 1fr auto; gap: 12px; align-items: start; width: 100%; padding: 12px 10px; border: 0; border-radius: 14px; background: none; font: inherit; text-align: left; text-decoration: none; color: var(--ink-2); cursor: pointer; }
.notif-item > a:hover, .notif-item > button:hover, .notif-item > a:focus-visible, .notif-item > button:focus-visible { background: var(--surface); outline: none; }
.notif-item > a:focus-visible, .notif-item > button:focus-visible { box-shadow: inset 0 0 0 2px var(--blue-light); }
.notif-ico { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--surface-2); color: var(--text-blue); font-family: var(--f-num); font-weight: 800; font-size: 14px; }
.notif-ico svg { width: 20px; height: 20px; }
.notif-ico.go { background: var(--go-bg); color: var(--go); }
.notif-ico.warn { background: var(--beta-bg); color: var(--beta); }
.notif-ico.danger { background: var(--danger-bg); color: var(--danger); }
.notif-txt { font-size: 14.5px; line-height: 1.45; }
.notif-txt b { color: var(--ink); }
.notif-txt time { display: block; margin-top: 3px; font-size: 12.5px; color: var(--ink-3); }
.notif-item .notif-dot { width: 10px; height: 10px; margin-top: 6px; border-radius: 50%; background: transparent; }
.notif-item.unread .notif-dot { background: var(--blue); }
.notif-item.unread .notif-txt { color: var(--ink); }
.notif-empty { display: grid; justify-items: center; gap: 6px; padding: 18px 20px 26px; text-align: center; font-size: 14.5px; color: var(--ink-2); }
.notif-empty img { width: 110px; height: auto; }
.notif-empty b { font-size: 16px; color: var(--ink); }
.notif-all { display: block; padding: 14px 18px; border-top: 1px solid var(--line); font-size: 14.5px; font-weight: 700; text-align: center; text-decoration: none; color: var(--text-blue-deep); }
.notif-all:hover { background: var(--surface); }
.notif-scrim { display: none; }
@media (max-width: 600px) {
  .notif-panel { position: fixed; left: 0; right: 0; top: auto; bottom: 0; width: auto; max-height: 82dvh; border-radius: var(--r-l) var(--r-l) 0 0; border-bottom: 0; padding-bottom: env(safe-area-inset-bottom); box-shadow: 0 -6px 0 var(--edge-shadow); }
  .notif-panel.open { animation: fy-sheet-in 0.35s var(--ease); }
  .notif-scrim { position: fixed; inset: 0; z-index: 79; background: rgba(2, 6, 15, 0.5); }
  .notif.open .notif-scrim { display: block; }
}
@keyframes fy-sheet-in { from { transform: translateY(100%); } }
@media (min-width: 601px) { .notif-panel.start { right: auto; left: -8px; } }
.notif-empty[hidden], .notif-list[hidden], .empty[hidden] { display: none; }
/* Panel notifikasi harus di atas navigation bar dan FAB walau loncengnya di dalam app bar yang sticky */
:is(.appbar, .topbar, .nav, header):has(.notif.open) { z-index: 90; }

/* =========================================================
   KEADAAN KOSONG / ERROR / OFFLINE di dalam panel atau daftar
   <div class="state"><img src="mascot/confused-420.webp" alt="" width="330" height="420"><h3>Belum ada pesanan</h3><p>..</p><div class="actions"><a class="btn sm">..</a></div></div>
   Varian: .state.error (garis merah), .state.offline, .state.sm (lebih kecil, untuk kartu)
   Halaman penuh: templates/404.html, 500.html, offline.html, maintenance.html
   ========================================================= */
.state { display: grid; justify-items: center; gap: 8px; padding: 28px 20px; text-align: center; color: var(--ink-2); }
.state[hidden] { display: none; }
.state img { width: clamp(110px, 24vw, 160px); height: auto; margin-bottom: 4px; }
.state h3 { font-family: var(--f-head); font-weight: 800; font-size: 24px; line-height: 1.05; color: var(--ink); }
.state p { max-width: 42ch; font-size: 15.5px; }
.state .actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 8px; }
.state.sm { padding: 18px 14px; } .state.sm img { width: 96px; } .state.sm h3 { font-size: 19px; }
.state.error { border: 2px dashed var(--danger); border-color: color-mix(in srgb, var(--danger) 55%, transparent); border-radius: var(--r-l); background: var(--danger-bg); }
.state.error h3 { color: var(--danger); }
.state.offline { border: 2px dashed var(--line); border-radius: var(--r-l); }

/* Bilah offline otomatis: <div class="offline-bar" data-offline-bar hidden role="status">..</div> */
.offline-bar { position: fixed; left: 50%; top: calc(10px + env(safe-area-inset-top)); z-index: 340; display: flex; align-items: center; gap: 10px; max-width: calc(100vw - 24px); padding: 8px 16px 8px 8px; border-radius: 999px; border: 2px solid var(--edge); background: var(--beta-bg); color: var(--beta); box-shadow: var(--shadow-pop); font-size: 14.5px; font-weight: 700; transform: translateX(-50%); animation: fy-drop-in 0.4s var(--spring); }
.offline-bar[hidden] { display: none; }
.offline-bar img { width: 32px; height: auto; flex: none; }
@keyframes fy-drop-in { from { opacity: 0; transform: translate(-50%, -16px); } }

/* =========================================================
   FOTO PROFIL + PEMOTONG BULAT
   <div class="avatar-crop" data-avatar-crop data-size="512">
     <span class="ac-preview"><span class="ac-initial">RN</span></span>   (gambar pratinjau dibuat otomatis)
     <div><label class="btn ghost sm" for="foto">Ganti foto</label><small>JPG, PNG, WebP · maks 10 MB</small></div>
     <input class="sr-only" type="file" id="foto" name="foto" accept="image/*">
   </div>
   Pilih foto → muncul jendela potong (geser, zoom lewat slider/roda mouse/cubit, putar 90°, panah dan +/-).
   Hasil persegi 512px (WebP) menggantikan file di input, jadi form biasa langsung mengirim foto yang sudah dipotong.
   Event: fy:crop { file, blob, url }
   ========================================================= */
.avatar-crop { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.avatar-crop small { display: block; margin-top: 6px; font-size: 13px; color: var(--ink-3); }
.ac-preview { position: relative; flex: none; width: 88px; height: 88px; border-radius: 50%; overflow: hidden; display: grid; place-items: center; border: 2px solid var(--edge); background: var(--surface-2); box-shadow: var(--shadow-pop); color: var(--text-blue); font-family: var(--f-num); font-weight: 800; font-size: 28px; }
.ac-preview img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ac-preview img[hidden] { display: none; }
.crop-modal .m-body { gap: 14px; }
.crop-stage { --S: min(78vw, 340px); position: relative; width: var(--S); height: var(--S); justify-self: center; overflow: hidden; border-radius: var(--r-m); background: repeating-conic-gradient(var(--surface) 0 25%, var(--surface-2) 0 50%) 0 0 / 22px 22px; touch-action: none; cursor: grab; user-select: none; -webkit-user-select: none; outline: none; }
.crop-stage:active { cursor: grabbing; }
.crop-stage:focus-visible { box-shadow: 0 0 0 4px var(--blue-light); }
.crop-stage img { position: absolute; left: 50%; top: 50%; max-width: none; pointer-events: none; transform-origin: center; will-change: transform; }
.crop-ring { position: absolute; inset: 0; border-radius: 50%; box-shadow: 0 0 0 999px rgba(2, 6, 15, 0.55); border: 2px dashed rgba(255, 255, 255, 0.85); pointer-events: none; }
.crop-tools { display: flex; align-items: center; gap: 10px; }
.crop-tools .slider { flex: 1; }
.crop-tools .icon-btn { flex: none; }
.crop-hint { font-size: 13px; color: var(--ink-3); text-align: center; }

/* =========================================================
   KOMPONEN 1.13: navigasi, form, toko, pengumuman
   ========================================================= */

/* ---------- Breadcrumb ----------
   <nav class="breadcrumb" aria-label="Lokasi halaman"><ol>
     <li><a href="/">Beranda</a></li><li><a href="/produk">Produk</a></li><li><span aria-current="page">Netflix Premium</span></li>
   </ol></nav>
   Di HP hanya dua tingkat terakhir yang tampil, sisanya diganti "…". */
.breadcrumb ol { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; list-style: none; margin: 0; padding: 0; font-size: 14.5px; color: var(--ink-3); }
.breadcrumb li { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
.breadcrumb li + li::before { content: ""; flex: none; width: 7px; height: 7px; border-top: 2px solid currentColor; border-right: 2px solid currentColor; transform: rotate(45deg); margin-right: 2px; }
.breadcrumb a { color: var(--text-blue-deep); font-weight: 700; text-decoration: none; border-radius: 6px; padding: 10px 2px; }
.breadcrumb a:hover { text-decoration: underline; text-underline-offset: 3px; }
.breadcrumb a:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 0; }
.breadcrumb [aria-current="page"] { color: var(--ink); font-weight: 700; max-width: 32ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 560px) {
  .breadcrumb li:not(:nth-last-child(-n+2)) { display: none; }
  .breadcrumb li:nth-last-child(2)::before { content: "…"; width: auto; height: auto; border: 0; transform: none; margin-right: 6px; }
}

/* ---------- Pagination ----------
   <nav class="pagination" aria-label="Halaman">
     <a href="?p=1" aria-label="Halaman sebelumnya" rel="prev"><svg class="ikon"><use href="#ikon-chevron-kiri"/></svg></a>
     <a href="?p=1">1</a><a href="?p=2" aria-current="page">2</a><a href="?p=3">3</a><span class="gap">…</span><a href="?p=12">12</a>
     <a href="?p=3" aria-label="Halaman berikutnya" rel="next"><svg class="ikon"><use href="#ikon-chevron-kanan"/></svg></a>
   </nav>
   Tautan yang tidak bisa dipakai: aria-disabled="true". */
.pagination { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px; }
.pagination a, .pagination .gap { min-width: 44px; height: 44px; padding: 0 10px; display: inline-grid; place-items: center; border-radius: 14px; font-family: var(--f-num); font-weight: 700; font-size: 15px; color: var(--ink); text-decoration: none; font-variant-numeric: tabular-nums; }
.pagination a { border: 2px solid transparent; transition: transform 0.25s var(--spring), background 0.2s; }
.pagination a:hover { background: var(--surface); }
.pagination a:active { transform: scale(0.94); }
.pagination a:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 1px; }
.pagination a[aria-current="page"] { background: var(--blue); color: #fff; border-color: var(--edge); box-shadow: var(--shadow-pop); }
.pagination a[aria-disabled="true"] { opacity: 0.35; pointer-events: none; }
.pagination .gap { color: var(--ink-3); min-width: 24px; padding: 0; }
.pagination .ikon { width: 20px; height: 20px; }
@media (max-width: 420px) { .pagination a:not([rel]):not([aria-current]) { display: none; } .pagination .gap { display: none; } }

/* ---------- Accordion ----------
   <div class="accordion"><details><summary>Judul</summary><div class="acc-body">Isi</div></details> …</div>
   Pakai <details name="grup"> supaya hanya satu yang terbuka. Untuk FAQ halaman publik tetap pakai .faq. */
.accordion { border: 2px solid var(--edge); border-radius: var(--r-m); background: var(--card); box-shadow: var(--shadow-pop); overflow: hidden; }
.accordion details + details { border-top: 2px solid var(--line); }
.accordion summary { list-style: none; display: flex; align-items: center; gap: 12px; min-height: 52px; padding: 14px 18px; cursor: pointer; font-weight: 700; color: var(--ink); }
.accordion summary::-webkit-details-marker { display: none; }
.accordion summary::after { content: ""; flex: none; margin-left: auto; width: 9px; height: 9px; border-right: 2.4px solid currentColor; border-bottom: 2.4px solid currentColor; transform: translateY(-2px) rotate(45deg); transition: transform 0.35s var(--spring); }
.accordion details[open] > summary::after { transform: translateY(2px) rotate(-135deg); }
.accordion summary:hover { background: var(--surface); }
.accordion summary:focus-visible { outline: 3px solid var(--blue-light); outline-offset: -3px; }
.accordion summary .ikon { width: 20px; height: 20px; color: var(--text-blue); }
.accordion .acc-body { padding: 2px 18px 18px; color: var(--ink-2); font-size: 15.5px; }

/* ---------- Input dengan awalan/akhiran ----------
   <div class="input-group"><span class="addon">Rp</span><input class="input" inputmode="numeric" aria-label="Harga"></div>
   <div class="input-group"><input class="input" aria-label="Nama email"><span class="addon">@tmail.id</span></div>
   <div class="input-group"><input class="input" type="search" aria-label="Kode promo"><button class="btn sm" type="button">Pakai</button></div> */
.input-group { display: flex; align-items: stretch; min-width: 0; border: 2px solid var(--edge); border-radius: var(--r-m); background: var(--card); box-shadow: 0 3px 0 var(--edge-shadow); overflow: hidden; transition: box-shadow 0.25s var(--spring), border-color 0.2s; }
.input-group:focus-within { border-color: var(--text-blue); box-shadow: 0 3px 0 var(--blue), 0 0 0 4px rgba(83, 157, 233, 0.25); }
.input-group:has([aria-invalid="true"]) { border-color: var(--danger); box-shadow: 0 3px 0 var(--danger); }
.input-group > .input { flex: 1; min-width: 0; border: 0; border-radius: 0; box-shadow: none; background: transparent; }
.input-group > .input:focus { box-shadow: none; }
.input-group > .addon { flex: none; display: flex; align-items: center; gap: 6px; padding: 0 14px; background: var(--surface); color: var(--ink-2); font-family: var(--f-num); font-weight: 700; font-size: 15px; white-space: nowrap; }
.input-group > .addon:first-child { border-right: 2px solid var(--line); }
.input-group > .addon:last-child { border-left: 2px solid var(--line); }
.input-group > .addon .ikon { width: 18px; height: 18px; }
.input-group > .btn { flex: none; border: 0; border-left: 2px solid var(--edge); border-radius: 0; box-shadow: none; }
.input-group > .btn:hover, .input-group > .btn:active { transform: none; box-shadow: none; }

/* ---------- Jumlah (quantity stepper) ----------
   <div class="qty" data-qty>
     <button type="button" data-qty-step="-1" aria-label="Kurangi"><svg class="ikon"><use href="#ikon-kurang"/></svg></button>
     <input type="number" inputmode="numeric" value="1" min="1" max="10" aria-label="Jumlah">
     <button type="button" data-qty-step="1" aria-label="Tambah"><svg class="ikon"><use href="#ikon-tambah"/></svg></button>
   </div>
   Event: fy:change { value } (juga event input/change biasa di <input>). */
.qty { justify-self: start; align-self: start; display: inline-flex; align-items: center; border: 2px solid var(--edge); border-radius: 999px; background: var(--card); box-shadow: var(--shadow-pop); }
.qty button { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border: 0; border-radius: 50%; background: none; color: var(--ink); cursor: pointer; transition: transform 0.2s var(--spring), background 0.2s; }
.qty button:hover { background: var(--surface); }
.qty button:active { transform: scale(0.9); }
.qty button:disabled { opacity: 0.35; cursor: default; background: none; }
.qty button:focus-visible { outline: 3px solid var(--blue-light); outline-offset: -2px; }
.qty button .ikon { width: 18px; height: 18px; }
.qty input { width: 3.4ch; min-width: 36px; padding: 0; border: 0; background: none; text-align: center; font: 800 17px var(--f-num); font-variant-numeric: tabular-nums; color: var(--ink); -moz-appearance: textfield; appearance: textfield; }
.qty input::-webkit-inner-spin-button, .qty input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.qty input:focus-visible { outline: 3px solid var(--blue-light); border-radius: 8px; }

/* ---------- Rating ----------
   Tampil: <span class="rating" style="--nilai: 4.5" role="img" aria-label="Rating 4,5 dari 5"><span class="stars" aria-hidden="true"></span>4,5 <small>(128 ulasan)</small></span>
   Isi:    <fieldset class="rating-input"><legend class="sr-only">Beri rating</legend>
             <input type="radio" name="r" id="r5" value="5"><label for="r5" title="5 bintang"><span class="sr-only">5 bintang</span></label> … sampai 1 (urutan 5 → 1)
           </fieldset> */
.rating { --nilai: 0; --ukuran: 18px; display: inline-flex; align-items: center; gap: 8px; font: 700 14.5px var(--f-num); color: var(--ink); }
.rating small { font-weight: 600; font-size: 13px; color: var(--ink-3); }
.rating .stars { flex: none; width: calc(var(--ukuran) * 5); height: var(--ukuran); background: linear-gradient(90deg, var(--bintang) calc(var(--nilai) / 5 * 100%), var(--line) 0); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 3.6L14.35 9.36L20.56 9.82L15.8 13.84L17.29 19.88L12 16.6L6.71 19.88L8.2 13.84L3.44 9.82L9.65 9.36z' stroke='%23000' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E") 0 0 / var(--ukuran) var(--ukuran) repeat-x; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 3.6L14.35 9.36L20.56 9.82L15.8 13.84L17.29 19.88L12 16.6L6.71 19.88L8.2 13.84L3.44 9.82L9.65 9.36z' stroke='%23000' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E") 0 0 / var(--ukuran) var(--ukuran) repeat-x; }
.rating.lg { --ukuran: 26px; font-size: 18px; }
.rating-input { display: inline-flex; flex-direction: row-reverse; justify-content: flex-end; gap: 0; margin: 0; padding: 0; border: 0; min-width: 0; }
.rating-input input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.rating-input label { width: 44px; height: 44px; display: grid; place-items: center; cursor: pointer; border-radius: 12px; }
.rating-input label::before { content: ""; width: 30px; height: 30px; background: var(--line); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 3.6L14.35 9.36L20.56 9.82L15.8 13.84L17.29 19.88L12 16.6L6.71 19.88L8.2 13.84L3.44 9.82L9.65 9.36z' stroke='%23000' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 3.6L14.35 9.36L20.56 9.82L15.8 13.84L17.29 19.88L12 16.6L6.71 19.88L8.2 13.84L3.44 9.82L9.65 9.36z' stroke='%23000' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat; transition: transform 0.25s var(--spring), background 0.15s; }
.rating-input input:checked ~ label::before, .rating-input label:hover::before, .rating-input label:hover ~ label::before { background: var(--bintang); }
.rating-input label:hover::before { transform: scale(1.12); }
.rating-input input:focus-visible + label { outline: 3px solid var(--blue-light); outline-offset: -3px; }

/* ---------- Galeri + lightbox ----------
   <div class="gallery" data-gallery>
     <a href="besar-1.webp"><img src="kecil-1.webp" alt="Tampilan depan" width="400" height="400"></a> …
   </div>
   Klik → <dialog class="lightbox"> dengan tombol sebelumnya/berikutnya, panah keyboard, geser di layar sentuh, Esc. */
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 10px; }
.gallery a { display: block; aspect-ratio: 1; border-radius: 14px; overflow: hidden; border: 2px solid var(--edge); background: var(--surface); transition: transform 0.25s var(--spring); }
.gallery a:hover { transform: translateY(-3px); }
.gallery a:focus-visible { outline: 3px solid var(--blue-light); outline-offset: 2px; }
.gallery img { width: 100%; height: 100%; object-fit: cover; }
.lightbox { width: 100vw; max-width: 100vw; height: 100dvh; max-height: 100dvh; margin: 0; padding: 0; border: 0; background: rgba(2, 6, 15, 0.92); color: #fff; }
.lightbox[open] { display: grid; grid-template-rows: auto 1fr auto; }
.lightbox::backdrop { background: transparent; }
.lb-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: max(12px, env(safe-area-inset-top)) 16px 8px; font: 700 14px var(--f-num); }
.lb-stage { position: relative; display: grid; place-items: center; min-height: 0; padding: 0 64px; touch-action: pan-y; }
.lb-stage img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 12px; }
.lb-cap { padding: 10px 16px max(16px, env(safe-area-inset-bottom)); text-align: center; font-size: 14.5px; color: #e8f1ff; }
.lightbox .icon-btn { background: rgba(255, 255, 255, 0.12); color: #fff; width: 44px; height: 44px; }
.lightbox .icon-btn:hover { background: rgba(255, 255, 255, 0.22); }
.lb-prev, .lb-next { position: absolute; top: 50%; transform: translateY(-50%); }
.lb-prev { left: 10px; } .lb-next { right: 10px; }
.lightbox .icon-btn.lb-prev:hover, .lightbox .icon-btn.lb-next:hover { transform: translateY(-50%) scale(1.08); }
@media (max-width: 600px) { .lb-stage { padding: 0 8px; } .lb-prev, .lb-next { top: auto; bottom: 8px; transform: none; } .lightbox .icon-btn.lb-prev:hover, .lightbox .icon-btn.lb-next:hover { transform: scale(1.08); } }

/* ---------- Pengumuman (announcement bar) ----------
   <div class="announce" data-announce="promo-11-11">Diskon 11.11 sampai Minggu. <a href="/promo">Lihat promo</a>
     <button class="announce-close" type="button" data-close aria-label="Tutup pengumuman"><svg class="ikon"><use href="#ikon-tutup"/></svg></button></div>
   Ditutup = diingat per id di localStorage (fy-tutup-<id>), tidak muncul lagi di kunjungan berikutnya. */
.announce { position: relative; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 4px 12px; padding: 10px 56px 10px 16px; background: var(--blue); color: #fff; font-size: 14.5px; font-weight: 700; text-align: center; }
.announce a { color: #fff; text-decoration: underline; text-underline-offset: 3px; padding-block: 4px; }
.announce .announce-close { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; display: grid; place-items: center; border: 0; border-radius: 50%; background: none; color: #fff; cursor: pointer; }
.announce .announce-close:hover { background: rgba(255, 255, 255, 0.16); }
.announce .announce-close:focus-visible { outline: 3px solid #fff; outline-offset: -4px; }
.announce .announce-close .ikon { width: 18px; height: 18px; --ikon-titik: #fff; }
.announce[hidden] { display: none; }

/* ---------- Persetujuan cookie ----------
   <section class="consent" data-consent aria-labelledby="cs-t" hidden>
     <img src="/fusionify-ui/mascot/head-wink-120.webp" alt="" width="56" height="56">
     <div><h2 id="cs-t">Boleh pakai cookie?</h2><p>…</p></div>
     <div class="consent-actions"><button class="btn ghost sm" data-consent-pilih="penting">Hanya yang penting</button><button class="btn sm" data-consent-pilih="semua">Terima semua</button></div>
   </section>
   Tampil sekali sampai dipilih. Pilihan disimpan di localStorage (fy-consent) dan dikirim lewat event fy:consent { pilihan } di window.
   Muat skrip analitik hanya setelah pilihan "semua". Kedua tombol sama menonjolnya (aturan privasi). */
.consent { position: fixed; left: 50%; bottom: max(16px, env(safe-area-inset-bottom)); transform: translateX(-50%); z-index: 90; width: min(560px, calc(100% - 32px)); display: grid; grid-template-columns: auto 1fr; gap: 12px 14px; align-items: start; padding: 18px; border: 2px solid var(--edge); border-radius: var(--r-l); background: var(--card); color: var(--ink); box-shadow: var(--shadow-sticker); }
.consent[hidden] { display: none; }
.consent > img { width: 56px; height: auto; }
.consent h2 { font: 800 20px/1.1 var(--f-head); letter-spacing: -0.02em; margin-bottom: 4px; }
.consent p { font-size: 14.5px; color: var(--ink-2); }
.consent p a { color: var(--text-blue-deep); font-weight: 700; }
.consent .consent-actions { grid-column: 1 / -1; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; }
.consent.inline { position: static; transform: none; width: auto; max-width: 560px; }
@media (max-width: 480px) { .consent { grid-template-columns: 1fr; } .consent > img { display: none; } .consent .consent-actions .btn { flex: 1; justify-content: center; } }

```

---

## Kode: `css/app.css`

```css
/* FUSIONIFY UI · app.css
   Komponen aplikasi: dashboard pengguna, dashboard admin, halaman masuk/daftar.
   Butuh tokens.css + base.css + components.css (+ product.css untuk form).
   Interaksi (sidebar HP, dropdown, modal, tab, tampil password, validasi) ada di js/app.js.
   Prinsip sama: gaya stiker, segel, maskot, jujur. Di aplikasi gerak dibuat lebih tenang: tanpa smooth scroll dan tanpa reveal. */

/* =========================================================
   KERANGKA APLIKASI · sidebar + topbar + isi
   <div class="app" data-app> <aside class="side" data-side>..</aside> <div class="app-main">..</div> </div>
   ========================================================= */
.app { display: grid; grid-template-columns: 264px minmax(0, 1fr); min-height: 100vh; min-height: 100dvh; background: var(--paper); }
.side { position: sticky; top: 0; height: 100vh; height: 100dvh; display: grid; grid-template-rows: auto 1fr auto; gap: 18px; padding: 18px 14px; background: var(--card); border-right: 2px solid var(--edge); overflow-y: auto; z-index: 40; }
.side-brand { display: flex; align-items: center; gap: 10px; padding: 6px 8px; text-decoration: none; font-family: var(--f-head); font-weight: 800; font-size: 21px; }
.side-brand img { width: 34px; height: 34px; }
.side-nav { display: grid; gap: 4px; align-content: start; }
.side-nav .group { margin: 14px 10px 4px; font-family: var(--f-num); font-size: 11.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); }
.side-nav a { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 14px; text-decoration: none; font-weight: 700; font-size: 15px; color: var(--ink-2); transition: background 0.2s, color 0.2s; }
.side-nav a svg { width: 20px; height: 20px; flex: none; }
.side-nav a:hover { background: var(--surface); color: var(--ink); }
.side-nav a[aria-current="page"] { background: var(--blue); color: #fff; box-shadow: var(--shadow-pop); border: 2px solid var(--edge); padding: 8px 10px; }
.side-nav .count { margin-left: auto; min-width: 22px; padding: 1px 7px; border-radius: 999px; background: var(--surface-2); color: var(--text-blue-deep); font-family: var(--f-num); font-size: 12px; font-weight: 800; text-align: center; }
.side-nav a[aria-current="page"] .count { background: #fff; color: #0261cd; }
.side-foot { display: grid; gap: 10px; }
.side-help { position: relative; padding: 16px 16px 16px 84px; border-radius: var(--r-m); background: var(--surface); font-size: 14px; color: var(--ink-2); min-height: 92px; }
.side-help img { position: absolute; left: 8px; bottom: 0; width: 70px; height: auto; }
.side-help b { display: block; color: var(--ink); font-size: 15px; }
.side-help a { display: inline-block; padding-block: 6px; }
.side-help a { color: var(--text-blue-deep); font-weight: 700; }

.app-main { display: grid; grid-template-rows: auto 1fr; min-width: 0; }
.topbar { position: sticky; top: 0; z-index: 30; display: flex; align-items: center; gap: 10px; padding: 12px clamp(16px, 3vw, 32px); background: var(--nav-glass); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.topbar .spacer { flex: 1; }
.side-toggle { display: none; }
.app-body { padding: clamp(18px, 3vw, 34px) clamp(16px, 3vw, 32px) 60px; display: grid; gap: 24px; align-content: start; min-width: 0; }
.page-head { display: flex; flex-wrap: wrap; gap: 14px 20px; align-items: flex-end; justify-content: space-between; }
.page-head h1 { font-size: clamp(32px, 4vw, 46px); }
.page-head p { color: var(--ink-2); margin-top: 6px; }
.page-head .actions { display: flex; flex-wrap: wrap; gap: 10px; }
.scrim { position: fixed; inset: 0; z-index: 39; background: rgba(2, 6, 15, 0.5); opacity: 0; pointer-events: none; transition: opacity 0.3s; }
@media (max-width: 960px) {
  .app { grid-template-columns: 1fr; }
  .side { position: fixed; left: 0; top: 0; bottom: 0; width: min(300px, 86vw); transform: translateX(-105%); transition: transform 0.4s var(--ease); box-shadow: 6px 0 0 var(--edge-shadow); }
  .app.side-open .side { transform: none; }
  .app.side-open .scrim { opacity: 1; pointer-events: auto; }
  .side-toggle { display: grid; }
}

/* Kolom pencarian di topbar */
.search { position: relative; flex: 1 1 260px; max-width: 420px; }
.search svg { position: absolute; left: 14px; top: 50%; width: 18px; height: 18px; transform: translateY(-50%); color: var(--ink-3); pointer-events: none; }
.search input { width: 100%; font: inherit; font-size: 15px; color: var(--ink); padding: 10px 14px 10px 42px; border-radius: 999px; border: 1.5px solid var(--line); background: var(--field); transition: border-color 0.2s, box-shadow 0.2s; }
.search input::placeholder { color: var(--placeholder); }
.search input:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 4px rgba(83, 157, 233, 0.25); }
@media (max-width: 620px) { .topbar .search { display: none; } }

/* Tombol ikon dengan titik notifikasi */
.icon-btn { position: relative; color: var(--ink-2); }
.icon-btn .dot-badge { position: absolute; top: 8px; right: 9px; width: 9px; height: 9px; border-radius: 50%; background: #e5484d; box-shadow: 0 0 0 2px var(--card); }

/* =========================================================
   AVATAR
   ========================================================= */
.avatar { --s: 40px; flex: none; width: var(--s); height: var(--s); border-radius: 50%; display: inline-grid; place-items: center; overflow: hidden; background: var(--surface-2); color: var(--text-blue-deep); font-family: var(--f-num); font-weight: 800; font-size: calc(var(--s) * 0.38); border: 2px solid var(--edge); }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar.sm { --s: 32px; } .avatar.lg { --s: 56px; }
.avatar-stack { display: flex; } .avatar-stack .avatar { margin-left: -10px; } .avatar-stack .avatar:first-child { margin-left: 0; }
.user-chip { display: flex; align-items: center; gap: 10px; padding: 4px 10px 4px 4px; border-radius: 999px; border: 1.5px solid var(--line); background: var(--card); font-weight: 700; font-size: 14.5px; color: var(--ink); cursor: pointer; }
.user-chip small { display: block; font-weight: 400; color: var(--ink-3); font-size: 12.5px; line-height: 1.1; }
.user-chip svg { width: 16px; height: 16px; color: var(--ink-3); }
@media (max-width: 620px) { .user-chip .who { display: none; } .user-chip { padding: 3px; } .user-chip > svg { display: none; } }

/* =========================================================
   PANEL · kartu aplikasi dengan kepala
   ========================================================= */
.panel { position: relative; min-width: 0; padding: 22px; border-radius: var(--r-l); background: var(--card); color: var(--ink); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); }
.panel-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.panel-head h2 { font-size: 22px; }
.panel-head p { font-size: 14px; color: var(--ink-3); }
.panel.flush { padding: 0; overflow: hidden; }
.panel.flush .panel-head { padding: 20px 22px 0; }
.dash-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 22px; }
.span-12 { grid-column: span 12; } .span-8 { grid-column: span 8; } .span-7 { grid-column: span 7; } .span-6 { grid-column: span 6; } .span-5 { grid-column: span 5; } .span-4 { grid-column: span 4; }
@media (max-width: 1100px) { .span-8, .span-7, .span-6, .span-5, .span-4 { grid-column: span 12; } }

/* Label data contoh: WAJIB di template selama datanya belum dari sistem asli */
/* .sample-note dipindah ke product.css (dipakai juga di halaman status) */

/* =========================================================
   KPI · angka ringkas dengan perubahan
   ========================================================= */
.kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.kpi { position: relative; display: grid; gap: 10px; padding: 20px; border-radius: var(--r-l); background: var(--card); color: var(--ink); border: 2px solid var(--edge); box-shadow: var(--shadow-sticker); overflow: hidden; }
.kpi .lab { display: flex; align-items: center; gap: 8px; font-family: var(--f-num); font-size: 12.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); }
.kpi .lab svg { width: 18px; height: 18px; color: var(--text-blue); }
.kpi .v { font-family: var(--f-num); font-weight: 800; font-size: clamp(30px, 3vw, 40px); line-height: 1; letter-spacing: -0.02em; }
.kpi .delta { justify-self: start; display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 999px; font-family: var(--f-num); font-size: 12.5px; font-weight: 800; }
.kpi .delta.up { color: var(--go); background: var(--go-bg); }
.kpi .delta.down { color: var(--danger); background: var(--danger-bg); }
.kpi .delta.flat { color: var(--eos); background: var(--eos-bg); }
.kpi .spark { position: absolute; right: 14px; bottom: 14px; width: 96px; height: 34px; color: var(--blue-light); }
.kpi.blue { background: var(--blue); color: #fff; }
.kpi.blue .lab, .kpi.blue .lab svg { color: #f2f8ff; }
.kpi.blue .spark { color: #fff; }
@media (max-width: 1100px) { .kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .kpis { grid-template-columns: 1fr; } }

/* =========================================================
   GRAFIK SEDERHANA (tanpa library)
   Batang: <div class="bars" role="img" aria-label="..."><span style="--v:.6" data-l="Sen"></span>...</div>
   Garis: SVG polyline di dalam .linechart. Donat: .donut style="--p:72".
   Selalu sertakan ringkasan teks atau tabel untuk pembaca layar.
   ========================================================= */
.bars { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); align-items: end; gap: 10px; height: 200px; padding-bottom: 24px; position: relative; }
.bars::before { content: ""; position: absolute; left: 0; right: 0; bottom: 24px; border-top: 2px solid var(--line); }
.bars span { position: relative; height: calc(var(--v) * 100%); min-height: 4px; border-radius: 10px 10px 4px 4px; background: linear-gradient(180deg, var(--blue-light), var(--blue)); transform-origin: bottom; }
.bars span.hl { background: linear-gradient(180deg, #7cc0ff, var(--blue-deep)); box-shadow: 0 0 0 2px var(--edge); }
.bars span::after { content: attr(data-l); position: absolute; left: 50%; top: calc(100% + 6px); transform: translateX(-50%); font-family: var(--f-num); font-size: 12px; color: var(--ink-3); white-space: nowrap; }
.linechart { width: 100%; height: 220px; color: var(--blue); }
.linechart .grid line { stroke: var(--line); stroke-width: 1; }
.linechart .area { fill: url(#fyArea); }
.linechart .ln { fill: none; stroke: currentColor; stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.linechart .pt { fill: var(--card); stroke: currentColor; stroke-width: 3; vector-effect: non-scaling-stroke; }
.chart-x { display: flex; justify-content: space-between; font-family: var(--f-num); font-size: 12px; color: var(--ink-3); margin-top: 6px; }
.donut { --p: 50; --s: 150px; width: var(--s); aspect-ratio: 1; border-radius: 50%; display: grid; place-items: center; background: conic-gradient(var(--blue) calc(var(--p) * 1%), var(--surface-2) 0); }
.donut::before { content: ""; grid-area: 1 / 1; width: 68%; aspect-ratio: 1; border-radius: 50%; background: var(--card); }
.donut b { grid-area: 1 / 1; position: relative; font-family: var(--f-num); font-weight: 800; font-size: calc(var(--s) * 0.2); }
.legend { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; font-size: 14.5px; color: var(--ink-2); }
.legend li { display: flex; align-items: center; gap: 8px; }
.legend li::before { content: ""; width: 12px; height: 12px; border-radius: 4px; background: var(--c, var(--blue)); }
.legend b { margin-left: auto; color: var(--ink); font-family: var(--f-num); }

/* =========================================================
   PROGRESS
   ========================================================= */

/* =========================================================
   DAFTAR AKTIVITAS / NOTIFIKASI
   ========================================================= */
.feed { list-style: none; margin: 0; padding: 0; display: grid; }
.feed li { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--line); }
.feed li:last-child { border-bottom: 0; }
.feed p { font-size: 14.5px; color: var(--ink-2); line-height: 1.4; }
.feed p b { color: var(--ink); }
.feed time { font-family: var(--f-num); font-size: 12.5px; color: var(--ink-3); white-space: nowrap; }

/* =========================================================
   TABEL APLIKASI · tambahan untuk .table (product.css)
   ========================================================= */
.toolbar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; padding: 16px 18px; border-bottom: 1px solid var(--line); }
.toolbar .left, .toolbar .right { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.toolbar .left { flex: 1 1 260px; }
.toolbar .left .search { max-width: 360px; }
.toolbar .search { flex: 1 1 220px; }
.select.sm, .input.sm { width: auto; padding: 8px 12px; font-size: 14.5px; border-radius: 12px; box-shadow: none; border-width: 1.5px; border-color: var(--line); }
.select.sm { padding-right: 38px; background-position: right 10px center; }
.panel.flush .table-wrap { border: 0; border-radius: 0; box-shadow: none; }
.table .who { display: flex; align-items: center; gap: 10px; min-width: 180px; }
.table .who small { display: block; color: var(--ink-3); font-size: 13px; }
.table td .chip { font-size: 12px; }
.row-actions { display: flex; gap: 4px; justify-content: flex-end; }
.row-actions .icon-btn { width: 36px; height: 36px; background: transparent; }
.row-actions .icon-btn:hover { background: var(--surface-2); }
.row-actions .icon-btn.danger:hover { background: var(--danger-bg); color: var(--danger); }
.table tr[aria-selected="true"] td { background: var(--surface); }
.table input[type="checkbox"] { width: 18px; height: 18px; accent-color: var(--blue); }
@media (pointer: coarse) { .table input[type="checkbox"] { width: 24px; height: 24px; } }

/* Pagination */
.pager { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; padding: 14px 18px; border-top: 1px solid var(--line); font-size: 14px; color: var(--ink-3); }
.pager nav { display: flex; gap: 4px; }
.pager a, .pager span.cur { min-width: 36px; height: 36px; padding: 0 8px; display: grid; place-items: center; border-radius: 10px; text-decoration: none; font-family: var(--f-num); font-weight: 700; color: var(--ink-2); }
.pager a:hover { background: var(--surface); }
.pager span.cur { background: var(--blue); color: #fff; }
.pager a[aria-disabled="true"] { opacity: 0.4; pointer-events: none; }

/* =========================================================
   SWITCH (on/off) · <label class="switch"><input type="checkbox" role="switch"><span></span> Teks</label>
   ========================================================= */
.switch { display: inline-flex; align-items: center; gap: 12px; cursor: pointer; font-size: 15px; }
.switch input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.switch input + span { position: relative; flex: none; width: 50px; height: 28px; border-radius: 999px; background: var(--surface-2); border: 2px solid var(--edge); transition: background 0.25s; }
.switch input + span::after { content: ""; position: absolute; left: 3px; top: 3px; width: 18px; height: 18px; border-radius: 50%; background: var(--card); border: 2px solid var(--edge); transition: transform 0.3s var(--spring); }
.switch input:checked + span { background: var(--blue); }
.switch input:checked + span::after { transform: translateX(22px); background: #fff; }
.switch input:focus-visible + span { outline: 3px solid var(--blue-light); outline-offset: 2px; }
.settings-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--line); }
.settings-row:last-child { border-bottom: 0; }
.settings-row b { display: block; }
.settings-row p { font-size: 14px; color: var(--ink-3); }

/* Dropdown, menu, modal, dan tab pindah ke controls.css (dimuat lewat fusionify.css) supaya bisa dipakai di web publik juga. */

/* =========================================================
   HALAMAN MASUK / DAFTAR / LUPA PASSWORD
   <div class="auth"><aside class="auth-art">..</aside><main class="auth-main"><div class="auth-card">..</div></main></div>
   ========================================================= */
.auth { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); min-height: 100vh; min-height: 100dvh; background: var(--paper); }
.auth-art { position: relative; overflow: hidden; display: grid; align-content: space-between; gap: 30px; padding: clamp(28px, 4vw, 48px); background: var(--blue); color: #fff; }
.auth-art .brand { color: #fff; }
.auth-art .seal-deco { position: absolute; right: -18%; bottom: -14%; width: 80%; color: rgba(255, 255, 255, 0.1); max-width: none; pointer-events: none; }
.auth-art .copy { position: relative; display: grid; gap: 14px; max-width: 30ch; }
.auth-art h2 { font-size: clamp(36px, 4vw, 54px); }
.auth-art p { color: #f2f8ff; }
.auth-art .mascot { position: relative; width: min(62%, 300px); height: auto; justify-self: end; margin: 0 -10px calc(clamp(28px, 4vw, 48px) * -1) 0; }
.auth-art .bubble { position: absolute; right: min(48%, 250px); bottom: min(34%, 260px); z-index: 2; }
.auth-main { display: grid; justify-items: center; align-items: start; padding: clamp(24px, 8vh, 96px) clamp(16px, 4vw, 48px) clamp(24px, 4vw, 56px); } /* atas, bukan tengah: form tidak loncat saat pesan error muncul/hilang */
.auth-card { width: min(100%, 440px); display: grid; gap: 22px; }
.auth-card h1 { font-size: clamp(36px, 4vw, 48px); }
.auth-card .sub { color: var(--ink-2); margin-top: -10px; }
.auth-card form { display: grid; gap: 16px; }
.auth-card .row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; font-size: 15px; }
.auth-card .row a, .auth-card .alt a { color: var(--text-blue-deep); font-weight: 700; }
.auth-card .alt { text-align: center; color: var(--ink-2); font-size: 15px; }
.auth-top { display: flex; justify-content: flex-end; gap: 8px; }
.btn.block { width: 100%; justify-content: center; }
.btn.social { --bg: var(--card); --fg: var(--ink); }
.btn.social svg { width: 20px; height: 20px; }
.divider { display: flex; align-items: center; gap: 12px; color: var(--ink-3); font-size: 14px; }
.divider::before, .divider::after { content: ""; flex: 1; border-top: 1.5px solid var(--line); }
.pw-field { position: relative; }
.pw-field .input { padding-right: 52px; }
.pw-field .pw-toggle { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; background: transparent; }
.pw-meter { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.pw-meter i { height: 6px; border-radius: 3px; background: var(--line); transition: background 0.25s; }
.pw-meter[data-level="1"] i:nth-child(-n+1) { background: var(--danger); }
.pw-meter[data-level="2"] i:nth-child(-n+2) { background: #e8a33d; }
.pw-meter[data-level="3"] i:nth-child(-n+3) { background: var(--blue-light); }
.pw-meter[data-level="4"] i { background: var(--go); }
.auth-done { display: grid; justify-items: center; text-align: center; gap: 14px; }
.auth-done img { width: 150px; height: auto; }
.auth-done[hidden] { display: none; }
@media (max-width: 900px) {
  .auth { grid-template-columns: 1fr; }
  .auth-art { min-height: 0; grid-template-columns: 1fr auto; align-items: end; padding: 22px 20px 0; }
  .auth-art .copy { display: none; }
  .auth-art .bubble { display: none; }
  .auth-art .mascot { width: 110px; margin: 0; }
  .auth-art .seal-deco { width: 60%; right: -10%; bottom: -40%; }
}

/* =========================================================
   CHAT · daftar obrolan + isi obrolan (templates/chat.html)
   <div class="chat" data-chat> <section class="chat-list">..</section> <section class="thread">..</section> </div>
   HP: daftar dulu, ketuk obrolan → isi obrolan layar penuh (tombol kembali dan tombol back Android menutupnya).
   Mulai 900px: daftar dan isi obrolan berdampingan.
   ========================================================= */
.chat { display: grid; min-height: 0; }
.chat-list { display: grid; align-content: start; gap: 12px; padding: 0 max(16px, env(safe-area-inset-right)) 16px max(16px, env(safe-area-inset-left)); }
.chat-list .chat-top { display: flex; align-items: center; gap: 8px; padding-top: max(14px, env(safe-area-inset-top)); }
.chat-list .chat-top h1 { flex: 1; font-size: clamp(34px, 9vw, 44px); }
.chat-list .search-bar { min-height: 48px; }
.chat-list .search-bar input { height: 44px; }
.convos { list-style: none; margin: 0 -8px; padding: 0; display: grid; gap: 2px; }
.convo { position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; width: 100%; min-height: 72px; padding: 10px 10px; border: 0; border-radius: var(--r-m); background: none; color: var(--ink); text-align: left; font: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.convo:hover { background: var(--surface); }
.convo[aria-current="true"] { background: var(--surface-2); }
.convo:focus-visible { outline: 3px solid var(--blue-light); outline-offset: -3px; }
.convo .avatar { --s: 50px; }
.convo-txt { min-width: 0; display: grid; gap: 2px; }
.convo-txt b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 16px; }
.convo-txt span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14.5px; color: var(--ink-2); }
.convo.unread .convo-txt span { color: var(--ink); font-weight: 700; }
.convo-meta { display: grid; justify-items: end; gap: 6px; font-family: var(--f-num); font-size: 12.5px; color: var(--ink-3); }
.convo.unread .convo-meta time { color: var(--text-blue-deep); font-weight: 700; }
.av-wrap { position: relative; flex: none; display: inline-grid; }
.av-wrap .online { position: absolute; right: 0; bottom: 1px; width: 14px; height: 14px; border-radius: 50%; background: #2fbf63; border: 2.5px solid var(--paper); }

.thread { display: none; flex-direction: column; min-width: 0; min-height: 0; background: var(--paper); }
.chat.thread-open .thread { display: flex; position: fixed; inset: 0; z-index: 90; }
.chat.thread-open ~ .navbar, .chat.thread-open ~ .fab-dock { display: none; }
.thread-head { flex: none; display: flex; align-items: center; gap: 10px; min-height: 64px; padding: max(8px, env(safe-area-inset-top)) max(10px, env(safe-area-inset-right)) 8px max(6px, env(safe-area-inset-left)); background: var(--card); border-bottom: 2px solid var(--edge); }
.thread-head .who { flex: 1; min-width: 0; display: grid; }
.thread-head .who b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 17px; }
.thread-head .who small { font-size: 13px; color: var(--ink-3); }
.thread-head .who small.on { color: var(--go); font-weight: 700; }
.thread-head .avatar { --s: 42px; }
.msgs { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; display: flex; flex-direction: column; gap: 6px; padding: 18px max(14px, env(safe-area-inset-right)) 12px max(14px, env(safe-area-inset-left)); }
.msgs:focus-visible { outline: 3px solid var(--blue-light); outline-offset: -3px; }
.msgs > :first-child { margin-top: auto; }
.day { align-self: center; margin: 10px 0 6px; padding: 4px 12px; border-radius: 999px; background: var(--surface); font-family: var(--f-num); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-3); }
.msg { position: relative; max-width: min(78%, 520px); display: grid; gap: 4px; padding: 10px 14px 8px; border-radius: 20px; border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: 0 3px 0 var(--edge-shadow); overflow-wrap: anywhere; animation: fy-msg 0.3s var(--spring); }
@keyframes fy-msg { from { opacity: 0; transform: translateY(8px) scale(0.97); } }
.msg p { margin: 0; font-size: 16px; line-height: 1.45; white-space: pre-wrap; }
.msg time { justify-self: end; display: inline-flex; align-items: center; gap: 4px; font-family: var(--f-num); font-size: 11.5px; color: var(--ink-3); }
.msg time svg { width: 16px; height: 16px; }
.msg.them { align-self: flex-start; border-bottom-left-radius: 6px; }
.msg.me { align-self: flex-end; background: var(--blue); color: #fff; border-bottom-right-radius: 6px; }
.msg.me time { color: #f2f8ff; }
.msg.me time .read { color: #fff; }
.msg + .msg.them, .msg.me + .msg.me { margin-top: -2px; }
.msg.media { padding: 6px 6px 8px; }
.msg.media img { width: 100%; max-width: 280px; height: auto; border-radius: 14px; }
.msg.media time { padding-right: 8px; }
.msg-card { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 10px; align-items: center; padding: 10px; border-radius: 14px; background: var(--surface); color: var(--ink); text-decoration: none; }
.msg.me .msg-card { background: #fff; color: #0b0f1a; }
.msg-card b { display: block; font-size: 15px; }
.msg-card small { font-size: 13px; color: var(--ink-2); }
.msg.me .msg-card small { color: #3a4458; }
.typing { align-self: flex-start; display: inline-flex; gap: 5px; padding: 14px 16px; border-radius: 20px 20px 20px 6px; border: 2px solid var(--edge); background: var(--card); box-shadow: 0 3px 0 var(--edge-shadow); }
.typing[hidden] { display: none; }
.typing i { width: 8px; height: 8px; border-radius: 50%; background: var(--ink-3); animation: fy-type 1.2s var(--ease) infinite; }
.typing i:nth-child(2) { animation-delay: 0.15s; } .typing i:nth-child(3) { animation-delay: 0.3s; }
@keyframes fy-type { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-5px); opacity: 1; } }
.composer { flex: none; display: flex; align-items: flex-end; gap: 8px; padding: 10px max(10px, env(safe-area-inset-right)) calc(10px + env(safe-area-inset-bottom)) max(10px, env(safe-area-inset-left)); background: var(--card); border-top: 2px solid var(--edge); }
.composer textarea { flex: 1; min-width: 0; min-height: 48px; max-height: 140px; resize: none; padding: 12px 16px; border-radius: 24px; border: 2px solid var(--line); background: var(--field); color: var(--ink); font: inherit; font-size: 16px; line-height: 1.35; }
.composer textarea:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 4px rgba(83, 157, 233, 0.25); }
.composer textarea::placeholder { color: var(--placeholder); }
.composer .icon-btn { flex: none; width: 48px; height: 48px; }
.composer .send { flex: none; display: grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--edge); background: var(--blue); color: #fff; box-shadow: 0 3px 0 var(--edge-shadow); cursor: pointer; transition: transform 0.25s var(--spring); }
.composer .send svg { width: 22px; height: 22px; }
.composer .send:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--edge-shadow); }
.composer .send:disabled { background: var(--surface-2); color: var(--ink-3); cursor: default; }
.thread[hidden] { display: none !important; }
.thread-empty { display: none; }
@media (min-width: 700px) { .m-app .chat.thread-open .thread { left: calc(92px + env(safe-area-inset-left)); } .m-app .chat-top .theme-btn { display: none; } }
@media (min-width: 900px) {
  .chat { grid-template-columns: 360px minmax(0, 1fr); height: 100vh; height: 100dvh; }
  .chat-list { overflow-y: auto; border-right: 2px solid var(--edge); background: var(--card); padding-bottom: 24px; }
  .thread, .chat.thread-open .thread { display: flex; position: static; height: 100%; }
  .thread .back { display: none; }
  .with-navbar.chat-page { padding-bottom: 0; }
  .chat-page .msg { max-width: min(70%, 560px); }
}
@media (prefers-reduced-motion: reduce) { .msg { animation: none; } .typing i { animation: none; opacity: 0.8; } }
/* Tanggal kecil bergaya stiker (daftar acara, kartu acara di chat) */
.ev-date { flex: none; display: grid; place-items: center; align-content: center; width: 52px; height: 56px; border-radius: 14px; border: 2px solid var(--edge); background: var(--card); color: var(--ink); box-shadow: 0 3px 0 var(--edge-shadow); font-family: var(--f-num); line-height: 1; }
.ev-date b { font-size: 20px; font-weight: 800; }
.ev-date small { margin-top: 3px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-blue-deep); }

```

---

## Kode: `js/seal.js`

```js
// FUSIONIFY UI · seal.js
// Bentuk segel bergelombang khas FUSIONIFY (12 lekukan), sebagai path SVG.
// Contoh: <svg viewBox="0 0 100 100"><path d={seal()} /></svg>
//
// cx, cy  : titik tengah
// r       : jari-jari rata-rata
// amp     : tinggi gelombang (3.2 pada r 44 = proporsi resmi)
// waves   : jumlah lekukan (resmi: 12)
// steps   : kehalusan garis

export function seal(cx = 50, cy = 50, r = 44, amp = 3.2, waves = 12, steps = 160) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rr = r + amp * Math.sin(waves * a);
    d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(3) + " " + (cy + rr * Math.sin(a)).toFixed(3);
  }
  return d + "Z";
}

// Path resmi siap pakai untuk viewBox 0 0 100 100
export const SEAL_PATH = seal(50, 50, 44, 3.2, 12);

```

## Kode: `js/theme.js`

```js
// FUSIONIFY UI · theme.js
// Mode terang / gelap. Bawaan: ikut sistem. Pilihan pengguna disimpan di localStorage ("fy-theme").
// Pasang skrip head (snippets/head-script.html) supaya tema sudah benar sebelum halaman tampil (tanpa kedip).
//
// Tombol: <button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="Ganti tema">...</button>
// Web yang ingin selalu terang: <html data-theme="light" data-theme-lock> dan jangan pasang tombolnya.

const KEY = "fy-theme";
const root = document.documentElement;
const media = matchMedia("(prefers-color-scheme: dark)");

export const currentTheme = () => root.dataset.theme || (media.matches ? "dark" : "light");

export function setTheme(t) {
  if (root.hasAttribute("data-theme-lock")) return;
  root.dataset.theme = t;
  try { localStorage.setItem(KEY, t); } catch {}
  syncButtons();
  root.dispatchEvent(new CustomEvent("fy:theme", { detail: t }));
}

function syncButtons() {
  const t = currentTheme();
  document.querySelectorAll("[data-theme-toggle]").forEach((b) => {
    b.setAttribute("aria-pressed", String(t === "dark"));
    const id = b.dataset.labelDark && b.dataset.labelLight ? (t === "dark" ? b.dataset.labelLight : b.dataset.labelDark) : null;
    if (id) b.setAttribute("aria-label", id);
  });
}

export function initTheme() {
  document.addEventListener("click", (e) => {
    const b = e.target.closest?.("[data-theme-toggle]");
    if (!b) return;
    // Transisi warna singkat hanya saat ditekan (bukan saat halaman dimuat)
    root.classList.add("theme-switching");
    setTheme(currentTheme() === "dark" ? "light" : "dark");
    setTimeout(() => root.classList.remove("theme-switching"), 350);
  });
  media.addEventListener?.("change", syncButtons);
  syncButtons();
}

```

## Kode: `js/app.js`

```js
// FUSIONIFY UI · app.js
// Interaksi halaman aplikasi (dashboard, admin, masuk/daftar). Tanpa dependensi, tanpa GSAP.
//
//   import { initApp } from "./fusionify-ui/js/app.js";
//   const app = initApp();
//   app.toast("Tersimpan!");
//
// Yang ditangani:
// - Tema terang/gelap ([data-theme-toggle])
// - Sidebar di HP ([data-side-toggle], .app.side-open, Esc, klik scrim)
// - Semua komponen kontrol lewat initControls() (js/controls.js): dropdown, modal, sheet, tab,
//   button group, chip, FAB, carousel, slider, tooltip, search, date/time picker, snackbar
// - Tampil/sembunyi password ([data-pw-toggle]) dan meter kekuatan ([data-pw-meter])
// - Validasi form ([data-validate]): required, email, minlength, [data-match="#id"], tampil pesan .err
// - Pilih semua baris tabel ([data-check-all])
// - Toast (pakai markup .toast dari snippets/body-parts.html)

import { initTheme } from "./theme.js";
import { cekLisensi } from "./lisensi.js";
import { initControls, snackbar, otpError } from "./controls.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

export function initApp() {
  if (!cekLisensi()) return { toast() {}, snackbar() {}, otpError() {}, setSide() {} };
  window.__fx = true; // supaya fallback .fx-off di <head> tidak aktif
  initTheme();
  initControls(); // dropdown, modal, sheet, tab, chip, picker, snackbar, dll. (js/controls.js)

  /* ---------- Sidebar HP ---------- */
  const app = $("[data-app]");
  const side = $("[data-side]");
  const sideBtns = $$("[data-side-toggle]");
  const setSide = (open) => {
    if (!app) return;
    app.classList.toggle("side-open", open);
    sideBtns.forEach((b) => b.setAttribute("aria-expanded", String(open)));
    if (side && matchMedia("(max-width: 960px)").matches) side.inert = !open;
    if (open) $("a", side)?.focus({ preventScroll: true });
  };
  const syncSide = () => { if (side) side.inert = matchMedia("(max-width: 960px)").matches && !app?.classList.contains("side-open"); };
  sideBtns.forEach((b) => b.addEventListener("click", () => setSide(!app.classList.contains("side-open"))));
  $(".scrim", app || document)?.addEventListener("click", () => setSide(false));
  matchMedia("(max-width: 960px)").addEventListener("change", () => { setSide(false); syncSide(); });
  syncSide();

  /* ---------- Password ---------- */
  $$("[data-pw-toggle]").forEach((b) => b.addEventListener("click", () => {
    const input = b.parentElement.querySelector("input");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    b.setAttribute("aria-pressed", String(show));
    b.setAttribute("aria-label", show ? (b.dataset.hide || "Sembunyikan password") : (b.dataset.show || "Tampilkan password"));
  }));
  $$("[data-pw-meter]").forEach((meter) => {
    const input = document.querySelector(meter.dataset.pwMeter);
    const label = meter.nextElementSibling;
    const words = (meter.dataset.words || "Terlalu pendek|Lemah|Lumayan|Kuat|Sangat kuat").split("|");
    input?.addEventListener("input", () => {
      const v = input.value;
      let lvl = 0;
      if (v.length >= 8) lvl++;
      if (/[A-Z]/.test(v) && /[a-z]/.test(v)) lvl++;
      if (/\d/.test(v)) lvl++;
      if (/[^A-Za-z0-9]/.test(v) || v.length >= 14) lvl++;
      if (v.length < 8) lvl = Math.min(lvl, 1);
      meter.dataset.level = String(v ? Math.max(lvl, 1) : 0);
      if (label) label.textContent = v ? words[Math.max(lvl, 1)] : "";
    });
  });

  /* ---------- Validasi form ---------- */
  $$("form[data-validate]").forEach((form) => {
    form.noValidate = true;
    const msg = (f) => {
      const d = f.dataset;
      if (f.validity.valueMissing) return d.msgRequired || "Wajib diisi.";
      if (f.validity.typeMismatch) return d.msgType || "Formatnya belum benar.";
      if (f.validity.tooShort) return d.msgShort || `Minimal ${f.minLength} karakter.`;
      if (d.match && f.value !== document.querySelector(d.match)?.value) return d.msgMatch || "Belum sama.";
      return "";
    };
    const check = (f) => {
      const m = msg(f);
      const field = f.closest(".field") || f.parentElement;
      let err = field.querySelector(".err");
      if (m) {
        if (!err) { err = document.createElement("small"); err.className = "err"; err.id = (f.id || f.name) + "-err"; field.appendChild(err); }
        err.textContent = m;
        f.setAttribute("aria-invalid", "true");
        f.setAttribute("aria-describedby", err.id);
      } else {
        err?.remove();
        f.removeAttribute("aria-invalid");
      }
      return !m;
    };
    const fields = () => $$("input, select, textarea", form).filter((f) => f.willValidate && f.type !== "hidden");
    // Pesan error hilang saat pengguna mengetik perbaikannya (bukan saat blur), supaya tata letak
    // tidak bergeser tepat ketika pengguna mengklik tombol lain. Error baru hanya ditambah saat blur.
    fields().forEach((f) => {
      f.addEventListener("input", () => { if (f.getAttribute("aria-invalid") === "true") check(f); });
      f.addEventListener("change", () => { if (f.getAttribute("aria-invalid") === "true") check(f); });
      f.addEventListener("blur", (e) => {
        if (!f.value || f.getAttribute("aria-invalid") === "true") return;
        if (e.relatedTarget && f.closest(".pw-field")?.contains(e.relatedTarget)) return;
        check(f);
      });
    });
    form.addEventListener("submit", (e) => {
      const bad = fields().filter((f) => !check(f));
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      // Template: tampilkan keadaan berhasil kalau ada [data-done]. Di proyek nyata, kirim ke server di sini.
      const done = form.dataset.done && document.querySelector(form.dataset.done);
      if (done) { e.preventDefault(); form.hidden = true; done.hidden = false; done.querySelector("h2, h1")?.focus?.(); }
    });
  });

  /* ---------- Pilih semua baris ---------- */
  $$("[data-check-all]").forEach((all) => {
    const table = all.closest("table");
    const boxes = () => $$("tbody input[type='checkbox']", table);
    const sync = () => boxes().forEach((b) => b.closest("tr").setAttribute("aria-selected", String(b.checked)));
    all.addEventListener("change", () => { boxes().forEach((b) => (b.checked = all.checked)); sync(); });
    table.addEventListener("change", (e) => { if (e.target !== all) { const bs = boxes(); all.checked = bs.every((b) => b.checked); all.indeterminate = !all.checked && bs.some((b) => b.checked); sync(); } });
  });

  /* ---------- Esc menutup sidebar dan menu ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (app?.classList.contains("side-open")) { setSide(false); sideBtns[0]?.focus(); }
  });

  /* ---------- Toast ---------- */
  const toast = (text) => {
    const el = $("[data-toast]");
    if (!el) return;
    $("[data-toast-text]", el).textContent = text;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2600);
  };
  $$("[data-toast-msg]").forEach((b) => b.addEventListener("click", () => toast(b.dataset.toastMsg)));
  /* Tombol salin, sama seperti di motion.js: data-copy="teks" data-copied="Disalin!" */
  $$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy || b.closest(".code-block")?.querySelector("pre")?.innerText || "");
      toast(b.dataset.copied || "Disalin");
      b.classList.add("done"); setTimeout(() => b.classList.remove("done"), 2000);
    } catch { toast("Gagal menyalin. Salin manual, ya."); }
  }));

  return { toast, snackbar, otpError, setSide };
}

```

## Snippet: `snippets/head-script.html`

```html
<!-- FUSIONIFY UI · skrip kecil di <head>, SEBELUM CSS dan skrip lain.
     - .js / .no-js: konten tetap terbaca tanpa JavaScript
     - data-theme: pilihan terang/gelap yang tersimpan dipasang sebelum halaman tampil (tidak ada kedip putih)
     - .arriving: tirai transisi sudah menutup sejak HTML pertama tampil (tidak ada kedipan)
     - .fx-off: kalau motion.js gagal jalan dalam 4 detik, semua konten dipaksa tampil -->
<script>
  (function () {
    var d = document.documentElement;
    d.classList.remove("no-js");
    d.classList.add("js");
    try {
      var t = localStorage.getItem("fy-theme");
      if ((t === "dark" || t === "light") && !d.hasAttribute("data-theme-lock")) d.setAttribute("data-theme", t);
      if (sessionStorage.getItem("fx-nav") === "1") d.classList.add("arriving");
    } catch (e) {}
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) d.classList.remove("arriving");
    setTimeout(function () { if (!window.__fx) { d.classList.add("fx-off"); d.classList.remove("arriving"); } }, 4000);
  })();
</script>

```

## Snippet: `snippets/body-parts.html`

```html
<!-- FUSIONIFY UI · elemen global. Taruh sebelum </body>. Path gambar sesuaikan dengan lokasi folder kit. -->

<!-- Kursor segel (otomatis hanya aktif di perangkat dengan mouse) -->
<div class="cursor" aria-hidden="true" data-cursor-el>
  <div class="ring"><svg viewBox="0 0 100 100"><path d="M94.000 50.000L95.418 51.784L96.445 53.655L96.834 55.543L96.464 57.359L95.374 59.025L93.746 60.502L91.866 61.807L90.058 63.016L88.605 64.242L87.694 65.613L87.369 67.227L87.528 69.122L87.953 71.255L88.359 73.507L88.466 75.702L88.059 77.651L87.036 79.197L85.426 80.257L83.377 80.853L81.113 81.113L78.881 81.243L76.894 81.489L75.283 82.072L74.074 83.135L73.188 84.703L72.473 86.673L71.744 88.827L70.829 90.880L69.615 92.548L68.063 93.607L66.216 93.955L64.178 93.635L62.079 92.830L60.041 91.823L58.143 90.935L56.407 90.452L54.800 90.556L53.249 91.283L51.670 92.514L50.000 94.000L48.216 95.418L46.345 96.445L44.457 96.834L42.641 96.464L40.975 95.374L39.498 93.746L38.193 91.866L36.984 90.058L35.758 88.605L34.387 87.694L32.773 87.369L30.878 87.528L28.745 87.953L26.493 88.359L24.298 88.466L22.349 88.059L20.803 87.036L19.743 85.426L19.147 83.377L18.887 81.113L18.757 78.881L18.511 76.894L17.928 75.283L16.865 74.074L15.297 73.188L13.327 72.473L11.173 71.744L9.120 70.829L7.452 69.615L6.393 68.063L6.045 66.216L6.365 64.178L7.170 62.079L8.177 60.041L9.065 58.143L9.548 56.407L9.444 54.800L8.717 53.249L7.486 51.670L6.000 50.000L4.582 48.216L3.555 46.345L3.166 44.457L3.536 42.641L4.626 40.975L6.254 39.498L8.134 38.193L9.942 36.984L11.395 35.758L12.306 34.387L12.631 32.773L12.472 30.878L12.047 28.745L11.641 26.493L11.534 24.298L11.941 22.349L12.964 20.803L14.574 19.743L16.623 19.147L18.887 18.887L21.119 18.757L23.106 18.511L24.717 17.928L25.926 16.865L26.812 15.297L27.527 13.327L28.256 11.173L29.171 9.120L30.385 7.452L31.937 6.393L33.784 6.045L35.822 6.365L37.921 7.170L39.959 8.177L41.857 9.065L43.593 9.548L45.200 9.444L46.751 8.717L48.330 7.486L50.000 6.000L51.784 4.582L53.655 3.555L55.543 3.166L57.359 3.536L59.025 4.626L60.502 6.254L61.807 8.134L63.016 9.942L64.242 11.395L65.613 12.306L67.227 12.631L69.122 12.472L71.255 12.047L73.507 11.641L75.702 11.534L77.651 11.941L79.197 12.964L80.257 14.574L80.853 16.623L81.113 18.887L81.243 21.119L81.489 23.106L82.072 24.717L83.135 25.926L84.703 26.812L86.673 27.527L88.827 28.256L90.880 29.171L92.548 30.385L93.607 31.937L93.955 33.784L93.635 35.822L92.830 37.921L91.823 39.959L90.935 41.857L90.452 43.593L90.556 45.200L91.283 46.751L92.514 48.330L94.000 50.000Z" /></svg></div>
  <div class="dot"></div>
  <div class="label"></div>
</div>

<!-- Notifikasi kecil (dipanggil lewat fy.toast("...") atau tombol data-copy) -->
<div class="toast" role="status" aria-live="polite" data-toast>
  <img src="/fusionify-ui/mascot/head-happy-120.webp" alt="" width="40" height="39" />
  <span data-toast-text></span>
</div>

<!-- Tirai transisi halaman -->
<div class="veil" aria-hidden="true" data-veil>
  <svg class="blob" viewBox="0 0 100 100"><path d="M94.000 50.000L95.418 51.784L96.445 53.655L96.834 55.543L96.464 57.359L95.374 59.025L93.746 60.502L91.866 61.807L90.058 63.016L88.605 64.242L87.694 65.613L87.369 67.227L87.528 69.122L87.953 71.255L88.359 73.507L88.466 75.702L88.059 77.651L87.036 79.197L85.426 80.257L83.377 80.853L81.113 81.113L78.881 81.243L76.894 81.489L75.283 82.072L74.074 83.135L73.188 84.703L72.473 86.673L71.744 88.827L70.829 90.880L69.615 92.548L68.063 93.607L66.216 93.955L64.178 93.635L62.079 92.830L60.041 91.823L58.143 90.935L56.407 90.452L54.800 90.556L53.249 91.283L51.670 92.514L50.000 94.000L48.216 95.418L46.345 96.445L44.457 96.834L42.641 96.464L40.975 95.374L39.498 93.746L38.193 91.866L36.984 90.058L35.758 88.605L34.387 87.694L32.773 87.369L30.878 87.528L28.745 87.953L26.493 88.359L24.298 88.466L22.349 88.059L20.803 87.036L19.743 85.426L19.147 83.377L18.887 81.113L18.757 78.881L18.511 76.894L17.928 75.283L16.865 74.074L15.297 73.188L13.327 72.473L11.173 71.744L9.120 70.829L7.452 69.615L6.393 68.063L6.045 66.216L6.365 64.178L7.170 62.079L8.177 60.041L9.065 58.143L9.548 56.407L9.444 54.800L8.717 53.249L7.486 51.670L6.000 50.000L4.582 48.216L3.555 46.345L3.166 44.457L3.536 42.641L4.626 40.975L6.254 39.498L8.134 38.193L9.942 36.984L11.395 35.758L12.306 34.387L12.631 32.773L12.472 30.878L12.047 28.745L11.641 26.493L11.534 24.298L11.941 22.349L12.964 20.803L14.574 19.743L16.623 19.147L18.887 18.887L21.119 18.757L23.106 18.511L24.717 17.928L25.926 16.865L26.812 15.297L27.527 13.327L28.256 11.173L29.171 9.120L30.385 7.452L31.937 6.393L33.784 6.045L35.822 6.365L37.921 7.170L39.959 8.177L41.857 9.065L43.593 9.548L45.200 9.444L46.751 8.717L48.330 7.486L50.000 6.000L51.784 4.582L53.655 3.555L55.543 3.166L57.359 3.536L59.025 4.626L60.502 6.254L61.807 8.134L63.016 9.942L64.242 11.395L65.613 12.306L67.227 12.631L69.122 12.472L71.255 12.047L73.507 11.641L75.702 11.534L77.651 11.941L79.197 12.964L80.257 14.574L80.853 16.623L81.113 18.887L81.243 21.119L81.489 23.106L82.072 24.717L83.135 25.926L84.703 26.812L86.673 27.527L88.827 28.256L90.880 29.171L92.548 30.385L93.607 31.937L93.955 33.784L93.635 35.822L92.830 37.921L91.823 39.959L90.935 41.857L90.452 43.593L90.556 45.200L91.283 46.751L92.514 48.330L94.000 50.000Z" /></svg>
  <img src="/fusionify-ui/mascot/head-wink-120.webp" alt="" width="114" height="120" />
</div>

```

## Snippet: `snippets/pwa-head.html`

```html
<!-- FUSIONIFY UI · tambahan <head> untuk web HP, PWA, dan aplikasi WebView (Capacitor/Cordova).
     Tempel SETELAH snippets/head-script.html. Ganti path dan nama produk.
     - viewport-fit=cover: isi boleh sampai ke bawah notch, komponen kit sudah memakai env(safe-area-inset-*)
     - theme-color dua versi: warna bar status ikut tema terang/gelap
     - apple-touch-icon wajib berlatar (iOS mengisi bagian transparan dengan hitam) -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f7fbff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#071022" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Nama Produk"><!-- GANTI -->
<meta name="format-detection" content="telephone=no">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="/fusionify-ui/brand/app-icons/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/fusionify-ui/brand/app-icons/apple-touch-icon.png"><!-- GANTI dengan ikon produk 180x180 -->

```

## Catatan untuk `js/motion.js`

`motion.js` (fungsi `initFusionify()`) ada di repo dan terlalu panjang untuk disalin di sini. Kalau tidak punya akses ke repo, cukup tulis HTML dengan atribut `data-*` yang benar (lihat README di AGENTS.md) dan panggil:

```html
<script type="module">
  import { initFusionify } from "./fusionify-ui/js/motion.js";
  initFusionify();
</script>
```

Begitu juga `js/controls.js` (`initControls()`, `snackbar()`): interaksi sheet, picker, carousel, slider, tooltip, chip, FAB. Sudah dipanggil otomatis oleh `initFusionify()` dan `initApp()`; contoh markup lengkap ada di `templates/komponen.html`.

Jangan menulis ulang mesin geraknya sendiri. Kalau terpaksa, patuhi aturan performa di AGENTS.md.
