---
name: fusionify-brand-style
description: Use when building, redesigning, or fixing any FUSIONIFY website, product brand site, React/Tailwind app, dashboard, admin panel, login page, mobile app (web/PWA/iOS/Android), transactional email, or company document (surat resmi, invoice, penawaran, kuitansi, proposal, slide, PDF, Word, PowerPoint, Excel) for FUSIONIFY or its brands (Premiumify, FUSIONIFY BOT, StudyDate.id, Solutions, etc.) so it matches the fusionify.id design system.
---

# FUSIONIFY brand style

Acuan visual dan front end untuk semua web FUSIONIFY.

## Sumber kebenaran (urutan prioritas)

1. **Repo `FUSIONIFY-ID/FUSIONIFY`** (fusionify.id, live di https://fusionify.id): `DESIGN.md`, `AGENTS.md`, `src/styles/global.css`, `src/scripts/motion.ts`.
2. **Repo `FUSIONIFY-ID/Fusionify_UI`** (starter kit, https://github.com/FUSIONIFY-ID/Fusionify_UI): `css/tokens.css`, `css/base.css`, `css/components.css`, `css/product.css`, `css/controls.css`, `css/app.css`, `js/motion.js` (`initFusionify()`), `js/app.js` (`initApp()`), `js/controls.js` (`initControls()`, `snackbar()`), `js/lisensi.js` (kunci domain), `js/theme.js`, `js/seal.js`, `snippets/`, `templates/`, `tokens/` (token native), `tests/`, `fonts/`, `brand/`, `mascot/`, `badge/`, `skills/`, `demo/index.html`, plus `AGENTS.md`, `DESIGN.md`, `CHANGELOG.md`, dan `FUSIONIFY-UI-KONTEKS.md` (semua aturan + CSS dalam satu file untuk AI versi chat).
3. **Library Figma** (https://www.figma.com/design/av0M9IuzYKJTiUWJsYTS3i): variabel warna Terang/Gelap, radius, jarak, gaya teks, bayangan stiker, dan komponen yang sama dengan kode (tombol, chip, input, kartu, saklar, avatar, navigasi bawah, notifikasi, stepper, tabel, chat, foto profil, pemotong foto). Variabelnya punya code syntax web/Android/iOS.
4. **Folder Drive MASCOT** (https://drive.google.com/drive/folders/1zoWS_dWgVQsFwJL61kNutVVPi8ZImEDr): file maskot PNG asli dan WebP, plus dokumen "Panduan Maskot FUSIONIFY".
5. Skill ini (ringkasan). Kalau berbeda dengan repo, repo yang benar.

Kalau salah satu repo tersedia di sesi, baca `AGENTS.md` dan `DESIGN.md`-nya dulu. Kalau tidak ada, minta pengguna menambahkan repo `FUSIONIFY-ID/Fusionify_UI` atau melampirkan zip-nya (atau file `FUSIONIFY-UI-KONTEKS.md`), lalu tetap kerjakan dengan ringkasan di bawah.

## Langkah kerja untuk web produk

1. Cek dulu: ini web company atau web produk? Produk boleh punya logo sendiri, tapi sistem desainnya sama. Jangan menciptakan palet baru.
2. Cek domainnya terdaftar di `js/lisensi.js` (`DOMAIN_RESMI`). Kalau belum, kit tidak menjalankan interaksi di sana; minta pemilik menambahkannya dan merilis versi baru.
3. Pasang kit dan kunci versinya: `git submodule add https://github.com/FUSIONIFY-ID/Fusionify_UI public/fusionify-ui` lalu `git checkout vX.Y.Z` di dalamnya (atau `npm i github:FUSIONIFY-ID/Fusionify_UI#vX.Y.Z`), lalu `npm i gsap lenis`.
4. Untuk halaman baru, mulai dari template: `templates/landing-produk.html` (hero maskot, fitur, cara kerja, harga, testimoni, FAQ, CTA, form, footer + badge), `templates/404.html`, `500.html`, `offline.html`, `maintenance.html`, `templates/auth/masuk.html` / `daftar.html` / `lupa-password.html` / `atur-ulang-password.html` / `verifikasi.html` (kode OTP), `templates/dashboard.html` (pengguna), `templates/admin.html` (admin), `templates/app-mobile.html` (aplikasi HP), `templates/chat.html` (pesan), `templates/acara.html` (detail acara ala Luma), `templates/komponen.html` (katalog kontrol). Ganti semua bagian bertanda `GANTI`.
5. `<head>`: isi `snippets/head-script.html`, preload Afacad Flux dan Sansation 400 (jangan impor paket font penuh), muat `css/fusionify.css` (atau impor file CSS lewat bundler supaya bisa di-inline).
6. Setelah `<body>`: `snippets/sprite.html`. Sebelum `</body>`: `snippets/body-parts.html` (kursor, toast, tirai transisi), lalu `import { initFusionify } from ".../js/motion.js"; initFusionify();`.
7. Bangun halaman dari komponen kit (daftar di bawah, contoh markup di `demo/index.html` dan `templates/komponen.html`). Jangan menambahkan Tailwind/Bootstrap di atasnya. Untuk desain, pakai komponen dan variabel di library Figma.
8. Pasang badge di footer web produk:
   `<a class="fy-badge" href="https://fusionify.id" rel="noopener"><img src=".../badge/produk-fusionify-id-dark.png" alt="Sebuah produk dari FUSIONIFY" width="340" height="100"></a>` (tersedia `{id,en}-{light,dark}`).
9. Jangan menyalin momen khas fusionify.id (segel menutup hero, footer malam Bogor, orbit ekosistem) apa adanya. Rakit momen khas produk dari bagian yang sama: segel, maskot, gelombang.
10. QA di **tema terang dan gelap**, ukuran 375, 390, 768, 820, 1024, 1366, 1440, 1920 px: tanpa scroll horizontal, tanpa teks bertabrakan, tanpa kartu yatim di grid. Cek reduced motion (semua konten harus langsung tampil) dan tanpa JavaScript. Periksa kontras dengan axe **setelah** semua elemen `data-reveal` tampil. Semua `<img>` wajib `width`/`height`; jangan ada `<img>` tanpa `src` di HTML.
11. Ukur performa scroll sebelum dan sesudah menambah animasi.
12. Di repo kit: jalankan `npm test` (tata letak, kontras, layar sentuh, tanpa JS, lisensi domain, semua interaksi; juga jalan di GitHub Actions). Komponen atau template baru wajib ditambah ujinya di `tests/`.
13. Web produk mengunci satu versi kit. Jangan mengubah file kit di dalam proyek produk; ubah di repo kit, catat di CHANGELOG, samakan `version` di `package.json`, rilis dengan tag `vX.Y.Z` (`npm run release`), lalu naikkan versinya di produk. Nomor: Z perbaikan aman, Y komponen baru yang tidak merusak, X kalau kelas atau markup berubah.

## Komponen kit (kelas CSS)

`components.css`:
- Tata letak: `.wrap`, `.sec` (`.tint`, `.blue`), `.sec-head`, `.page-hero`, `.crumbs`, `.grid-2`, `.grid-3`
- Teks: `.kicker`, `.h-hero`, `.h-sec` (+ `<span class="dot">.</span>`), `.lead`, `.prose`, `.num`, `.hand`
- Aksi: `.btn` (`.ghost`, `.sm`), `.icon-btn`, `.theme-btn`, `.chip` (`go`, `beta`, `wip`, `plan`, `eos`)
- Navigasi: `.nav` (+ `.brand`, `.brand-mark`, `.brand-word`, `.nav-links`, `.nav-tools`, `.lang`, `.sound-btn`, `.menu-btn`), `.drawer`
- Kartu: `.card` (`.blue`, `.tint`), `.stats`/`.stat`, `.works`/`.work` (+ `.cover`, `.meta`, `.arrow`, `.cover-note`), `.person` (foto bingkai segel)
- Maskot: `.bubble` (`.left`), `.mascot-stage` (+ `.seal-bg`, `.seal-ring`, `.body`)
- Lain: `.marquee`, `.faq`, `.wave`, `.footer` (+ `.fcols`, `.fbar`, `.to-top`, `.fy-badge`), `.toast`, `.cursor`, `.veil`
- Utilitas: `.fx-oversize` untuk hiasan SVG yang sengaja lebih besar dari wadahnya (setara `max-width: none`)

`product.css` (web produk):
- Form: `.field`, `.input`, `.select`, `.textarea`, `.check` (checkbox/radio), `.form-grid` (+ `.full`)
- Isi: `.svc` + `.svc-ico` (kartu layanan dengan ikon dalam segel), `.ticks` (+ `li.no`), `.steps` (+ `<span class="n">1</span>` di tiap `li`)
- Harga: `.plans > .plan` (`.featured`, `.ribbon`, `.price`, `.desc`), `.segment` (tab radio). `.plan` selalu di dalam `.plans` karena `.chip.plan` juga ada
- Lain: `.quote` (testimoni), `.cta-band` (+ `.actions`, `.mascot`, `.seal-deco`), `.note` (`ok`, `warn`, `danger`), `.table-wrap` (wajib `tabindex="0" role="region" aria-label`) + `.table`, `.tags`/`.tag`, `.empty` (+ `.code` untuk 404), `.prod-head`
- Halaman acara: `.event`, `.event-cover` + `.poster`, `.fact`, `.reg`, `.agenda`, `.hosts`, `.event-bar`
- Bayar QRIS (`templates/bayar-qris.html`): `.pay[data-pay-state="menunggu|berhasil|kedaluwarsa|gagal"]` + panel `[data-show]`, `.pay-card`, `.pay-amount`, `.qr` + `.qr-box`, `.pay-timer` + `.pay-bar`, `.pay-meta`, `.pay-actions`, `.pay-result`. Jangan menulis nama penyedia pembayaran
- Status layanan (`templates/status.html`): `.status-banner` (`.warn`, `.down`), `.uptime` + `.uptime-bars` (`span[data-s="warn|down|none"]`), `.incidents` > `.incident`, `.sample-note` untuk data contoh
- Dokumentasi (`templates/dokumentasi.html`): `.docs` + `details.docs-nav` + `.docs-main` + `.docs-toc`, `.code-block` (+ `.code-head` tombol `data-copy=""`), `.endpoint` + `.method.get/.post/.put/.delete`, `.req`, `.docs-pager`, `.toc[data-toc]`
- Legal (`templates/legal/privasi.html`, `syarat.html`): `.legal`, `.legal-head`, `.legal-switch`, `.toc`, `.prose` (judul bernomor otomatis)

`app.css` (aplikasi, dimuat tambahan setelah fusionify.css; panggil `initApp()` dari `js/app.js`, bukan `initFusionify`):
- Kerangka: `.app` (`data-app`) + `.side` (`data-side`) + `.scrim` + `.app-main` + `.topbar` (`.search`, `.side-toggle` `data-side-toggle`, `.user-chip`) + `.app-body`, `.side-nav` (`a[aria-current="page"]`, `.count`, `.group`), `.side-help`
- Isi: `.page-head`, `.panel` (`.flush`, `.panel-head`), `.dash-grid` + `.span-4/5/6/7/8/12`, `.kpis`/`.kpi` (`.blue`, `.lab`, `.v`, `.delta.up/.down/.flat`, `.spark`), `.bars`, `.linechart`, `.donut` + `.legend`, `.progress`, `.feed`, `.sample-note` (label "Data contoh")
- Tabel: `.toolbar`, `.pager`, `.row-actions`, `[data-check-all]`, `.avatar` (`.sm`, `.lg`), `.avatar-stack`
- Kontrol: `.switch` (`input` + `span`), `.settings-row`, `.btn.block`, `.btn.social`, `.btn.danger`
- Chat: `.chat`, `.chat-list`, `.convo`, `.thread`, `.msgs`, `.msg.me/.them`, `.typing`, `.composer`; tanggal acara `.ev-date`
- Masuk/daftar: `.auth` + `.auth-art` + `.auth-main` + `.auth-card`, `.pw-field` + `[data-pw-toggle]`, `.pw-meter` (`data-pw-meter`), `.divider`, `.auth-done`, `form[data-validate]` (+ `data-done`, `data-match`, `data-msg-*`)

`controls.css` (web, aplikasi, dan aplikasi HP; termasuk di `fusionify.css`; interaksi di `js/controls.js`, otomatis dipanggil `initFusionify()`/`initApp()`):
- Menu dan dialog: `.dropdown` + `[data-dropdown]` + `.menu`, `dialog.modal` (`.full` di HP) + `[data-open-modal]`/`[data-close]`, `dialog.sheet` (bottom sheet, bisa ditarik) dan `dialog.side-sheet` + `[data-open-sheet]`, `.tabs` (`data-tabs`)
- Tombol: `.btn-group` (`data-btn-group="single|multi"`), `.split-btn`, `.fab` (+ extended), `.fab-dock`, `.fab-menu` (`data-fab-menu`), `[data-fab-shrink]`
- Navigasi HP: `.appbar` (`data-appbar`, `.appbar-title`), `.navbar` + `.with-navbar`, `.rail` + `.with-rail`, `.m-app` (bar bawah jadi rail mulai 700px)
- Isi: `.carousel` (`data-carousel`, tidak berputar sendiri), `.list`/`.li`, `.chip-btn` (filter/aksi, `aria-pressed`), `.chip-input`, `.badge`/`.has-badge`, `.tip-wrap` + `.tip` (tooltip)
- Input: `.slider`, `.range2` (`data-range2`), `.search-bar` + `[data-suggest]`, `.picker` (`data-datepicker`, `data-timepicker`)
- Status: `.spinner` (segel), `.ring`, `.progress.indeterminate`, `.skel`, `.snackbar` (`snackbar(teks, { action, onAction })`), `.float-bar`
- Verifikasi dan file: `.otp` (`[data-otp]`, `otpError()`), `[data-countdown]` (kirim ulang), `.upload` + `.drop` + `.upload-list` (`[data-upload]`, `data-max-mb`)
- Foto profil: `.avatar-crop[data-avatar-crop]` (+ `.ac-preview` > `.ac-initial`, input file `.sr-only`) membuka pemotong bulat (`.crop-modal`: geser, zoom slider/roda/cubit/+-, putar 90°); hasil 512px WebP menggantikan file di form; batal mengembalikan foto sebelumnya
- Form bertahap: `form[data-wizard]` + `ol.stepper` (diisi otomatis) + `fieldset.wizard-step[data-title]` + `[data-wizard-prev]`/`[data-wizard-next]` (`data-last`, `data-done`)
- Tabel urut: `table[data-sort]` + `th[data-sort-key]` (kosong = teks, `num`, `date`), nilai khusus `td[data-value]`
- Notifikasi: `.notif[data-notif]` + tombol lonceng `aria-controls` + `.notif-panel` (`.notif-head`, `.notif-readall`, `.notif-filter` btn-group value all/unread, `.notif-list` > `.notif-item.unread`, `.notif-empty`, `.notif-all`)
- Keadaan: `.state` (`.error`, `.offline`, `.sm`) dengan maskot, satu kalimat, satu tombol; `.offline-bar[data-offline-bar]` muncul otomatis saat koneksi putus; halaman `templates/500.html`, `offline.html`, `maintenance.html`
- Lain: `[data-chat]` (obrolan; di HP tombol back Android menutup isi obrolan), `[data-ics]` (unduh .ics, tambah ke kalender), `[data-share]`
- Event: `fy:change`, `fy:remove`, `fy:select`, `fy:complete`, `fy:files`, `fy:send`, `fy:resend`, `fy:step`, `fy:sort`, `fy:read`, `fy:crop`, dan `fy:online`/`fy:offline` di window

Atribut `initFusionify()`: `data-split`, `data-reveal`, `data-assemble`, `data-count-to` + `data-suffix`, `data-magnetic`, `data-copy` + `data-copied`, `data-cursor-label`, `data-sfx`, `data-nav`, `data-menu`, `data-drawer`, `data-sound`, `data-no-veil`, `data-pause`.

## Domain resmi

- `js/lisensi.js`: kit hanya berjalan di `fusionify.id`, `fusionify.biz.id`, partner `premiumify.my.id` dan `studydate.id`, serta subdomainnya (plus localhost, `*.local`, file lokal). Di domain lain interaksi dan animasi mati, konten tetap terbaca, dan konsol memberi peringatan. Jangan dihapus atau diakali.
- Domain partner baru ditambah di `DOMAIN_RESMI` atas izin pemilik, dicatat di CHANGELOG, lalu rilis versi baru dan naikkan versi kit di web produk tersebut.

## Token warna

```css
--blue: #0d6cd7;        /* utama, tombol, seksi biru */
--blue-deep: #0261cd;   /* link, hover */
--blue-light: #539de9;  /* titik i, aksen kecil, kursor */
--ink: #0b0f1a;         /* teks */
--ink-2: #3a4458; --ink-3: #566175;
--surface: #eaf4ff;     /* latar seksi selang-seling */
--paper: #f7fbff;       /* latar halaman */
--line: #d3e4f7;
--night: #071022;       /* footer malam */
/* chip status */
--go: #157f3b; --go-bg: #e3f6e9;      /* aktif */
--beta: #9a5b00; --beta-bg: #fff2d8;  /* beta */
--wip: #8a4a00; --wip-bg: #ffe9d6;    /* dalam pengembangan */
--plan: #0261cd; --plan-bg: #eef7ff;  /* direncanakan */
--eos: #5b6475; --eos-bg: #eceff4;    /* layanan berakhir */
--r-s: 10px; --r-m: 18px; --r-l: 28px; --r-pill: 999px;
--sp-xs: 4px; --sp-s: 8px; --sp-m: 12px; --sp-l: 16px; --sp-xl: 24px; --sp-2xl: 32px;
--edge-width: 2px; --touch-min: 44px;
--gut: clamp(16px, 4vw, 48px); --max: 1240px;
--ease: cubic-bezier(0.22, 1, 0.36, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--shadow-pop: 0 3px 0 var(--edge-shadow); --shadow-sticker: 0 6px 0 var(--edge-shadow);
```

Di Figma, warna ada di koleksi `Warna` (grup `brand/`, `teks/`, `latar/`, `garis/`, `bayangan/`, `status/`), ukuran di koleksi `Ukuran` (`radius/`, `jarak/`, `garis/stiker`, `sentuh/minimal`). Kalau token berubah, ubah di `tokens.css` dan Figma sekaligus.

## Mode gelap

- Semua komponen memakai token tema: `--card`, `--field`, `--surface`, `--surface-2`, `--edge` (garis stiker), `--edge-shadow` (bayangan pejal), `--ink`/`--ink-2`/`--ink-3`, `--text-blue`/`--text-blue-deep`, `--inverse-bg`/`--inverse-fg`, `--danger`/`--danger-bg`. **Jangan menulis `#fff` atau `var(--ink)` untuk latar, garis, atau bayangan.** `#fff` hanya untuk teks/ikon/isi di atas biru.
- Gelap: latar `#071022`, kartu `#10203F`, teks `#EAF3FF`, garis `#2E5592`, bayangan `#02060F`, teks biru `#8CC0FF`. Biru isi (`--blue`) tidak berubah.
- Bawaan ikut sistem; tombol `.theme-btn[data-theme-toggle]` (ikon `.moon`/`.sun`) menyimpan pilihan di `localStorage` (`fy-theme`). Skrip head memasang `data-theme` sebelum halaman tampil. Selalu terang: `<html data-theme="light" data-theme-lock>`.
- Gambar per tema: `.only-light` / `.only-dark` (mis. `wordmark.svg` vs `wordmark-white.svg`).

## Halaman aplikasi

- Data dashboard di template adalah contoh berlabel `.sample-note`; ganti dengan data asli lalu hapus labelnya.
- Elemen `.sr-only` di dalam area yang bisa digeser butuh pembungkus `position: relative` (sudah di `.table-wrap`), kalau tidak halaman melebar di HP.
- Pesan error form hilang saat pengguna mengetik perbaikannya, bukan saat blur. Form masuk diletakkan di atas, bukan tengah vertikal, supaya tidak loncat.
- Elemen dengan `display` sendiri (mis. `.empty`, `.state`) butuh aturan `[hidden] { display: none }` supaya atribut `hidden` benar-benar menyembunyikan.
- Panel yang muncul dari dalam app bar sticky harus menaikkan z-index app bar saat terbuka.
- Setiap daftar atau panel yang bisa kosong punya `.state` dengan maskot dan satu langkah berikutnya; error selalu ada tombol "Coba lagi".
- Login Google hanya dipasang kalau OAuth benar-benar tersedia.
- Aplikasi tanpa smooth scroll, kursor segel, atau reveal.

## Aplikasi HP

- Isinya HTML (web HP, PWA, Capacitor, WebView): mulai dari `templates/app-mobile.html`, tempel `snippets/pwa-head.html` + `snippets/manifest.webmanifest`, ikon di `brand/app-icons/`, pakai `initApp()`, `templates/offline.html` sebagai halaman cadangan.
- Native (Flutter, SwiftUI, Jetpack Compose, React Native, Android Kotlin/Java ber-XML): CSS tidak dipakai. Ambil token dari `tokens/`: `tokens.json`, `flutter/fusionify_tokens.dart`, `swift/FusionifyTokens.swift`, `android/FusionifyTokens.kt` (Compose), `react-native/fusionify-tokens.ts`, dan `android/res/` untuk aplikasi XML (`values/` + `values-night/fy_colors.xml`, `fy_dimens.xml`, tema `Theme.Fusionify`, drawable stiker, `res/font/`). Huruf TTF di `tokens/fonts-ttf/`. Buat ulang token dengan `node scripts/build-tokens.mjs` kalau `tokens.css` berubah. Panduan di `tokens/README.md`.
- Pilihan stack FUSIONIFY: StudyDate pakai Flutter (satu kode untuk iOS dan Android); aplikasi VPN tetap Kotlin/Java karena butuh VpnService native. Keduanya memakai token yang sama.
- Target sentuh minimal 44px, area aman notch lewat `env(safe-area-inset-*)`, input 16px di layar sentuh (anti zoom iOS, sudah di `base.css`).
- Satu FAB per layar; navigation bar 3 sampai 5 tujuan; bottom sheet bisa ditutup dengan tarik, tombol, dan Esc/kembali.
- Bayangan stiker di native: offset ke bawah tanpa blur, bukan `elevation`.
- QA HP pakai emulasi layar sentuh (360, 375, 390, 430 px) di kedua tema.

## Huruf (semua OFL, di-host sendiri, subset latin, `font-display: swap`)

- **Afacad Flux 800**: judul, rapat (`letter-spacing: -0.02em` sampai `-0.035em`, `line-height: 0.98`).
- **Sansation** 400/700: teks dan UI (17px, `line-height: 1.6`).
- **Caveat**: suara maskot (gelembung bicara, papan, catatan tangan).
- **Exo 2**: angka (`tabular-nums`) dan label kecil kapital.

## Elemen khas

- **Segel bergelombang**: lingkaran 12 lekukan, `seal(50, 50, 44, 3.2, 12)` di viewBox 100 (`r = R + amp * sin(12a)`). Tersedia juga sebagai CSS mask `var(--seal-mask)` di `product.css`. Dipakai sebagai latar maskot, cincin kursor, bingkai foto, ikon layanan, nomor langkah, bulan, tirai transisi, loader, spinner.
- **Titik i**: bulatan `--blue-light` di akhir judul hero.
- **Gaya stiker**: garis tepi 2px `--edge`, bayangan pejal ke bawah (`--edge-shadow`), sudut bulat besar. Ini memang meminjam rasa neo-brutalism (aliran, bukan karya siapa pun), tapi identitas FUSIONIFY datang dari segel, maskot, palet biru, dan sudut bulat besar. Jangan menempel komponen dari UI kit neo-brutalism lain.
- **Logo company**: segel Fi + wordmark resmi (SVG). Jangan pernah mengetik "FUSIONIFY" dengan font sebagai pengganti logo. Versi putih untuk latar gelap, mono putih untuk latar biru.
- **Logo produk**: produk boleh pakai logonya sendiri (mis. Premiumify memakai segel S biru), tetap dengan warna dan huruf di atas.

## Maskot

- Karakter chibi rambut putih ujung biru, jaket hitam. Ekspresi: smile (papan), shy, wink, happy, angry, tired, confused, cry, glasses, plus pose welcome (selamat datang), loading, empty (kosong), paid (sukses bayar), pay-failed (gagal bayar), offline.
- Ganti ekspresi dengan **menukar gambar badan penuh**. Jangan menempel kepala di atas badan lain.
- Pose baru boleh bebas dan hidup (berlari, melompat, jinjit, lebay), jangan kaku. Wajib sama: wajah, mata abu tua, rambut putih ujung biru dengan helai mencuat, pipi merah, garis tebal merah tua. Baju bawaan jaket hitam terbuka (kerah dan lengan abu) dengan kaus putih; boleh ganti kalau situasi butuh. Saat membuat pose dengan AI, pakai beberapa pose asli sekaligus sebagai acuan dan bandingkan berdampingan sebelum dipasang. Cara memasang ada di `mascot/POSE-BARU.md`; file asli pose ada di desain Canva "Pose Maskot FUSIONIFY" dan folder Drive MASCOT.
- Ekspresi mengikuti status: confused untuk yang masih dikembangkan (juga FAQ, 404), cry untuk error dan layanan berakhir (500), glasses untuk layanan profesional dan perawatan, empty untuk keadaan kosong, loading untuk proses lama, paid/pay-failed untuk hasil pembayaran, offline untuk tanpa internet, welcome untuk sambutan dan selesai daftar.
- Gelembung bicara memakai Caveat dan tidak boleh menutupi wajah atau judul.
- Pakai versi `-420.webp` (badan) dan `-120.webp` (kepala kecil) dengan `srcset`; semua `<img>` wajib `width`/`height`.

## Gerak

- Stack acuan: Astro + vanilla CSS, Lenis (`lerp 0.1`) + GSAP ScrollTrigger. Suara disintesis Web Audio, mati secara bawaan.
- Motion (dulu Framer Motion) tidak dipakai di kit. Boleh untuk animasi kecil di web produk React/Astro, dengan aturan yang sama (hanya `transform`/`opacity`, kurva `--ease`/`--spring`, hormati kurangi gerakan) dan tidak menganimasikan elemen yang sudah dipegang `initFusionify()`.
- Nav transparan di atas, berubah jadi kapsul blur setelah scroll >24px, sembunyi saat scroll turun.
- Judul naik per kata, kartu "dirakit" saat muncul, transisi halaman pakai segel biru yang membesar.
- `data-assemble` jangan dipakai pada elemen yang punya transform saat hover (bentrok); pakai `data-reveal` pada pembungkusnya.
- Hormati `prefers-reduced-motion`. Konten wajib tetap terbaca tanpa JavaScript.

## Performa (wajib, sudah diukur di fusionify.id)

- Hanya animasikan `transform` dan `opacity`.
- Jangan menganimasikan elemen di dalam SVG satu per satu (memaksa gambar ulang); kedipkan seluruh lapisan `<svg>` dengan `opacity`.
- Glow pakai gradien statis, bukan `filter: blur`/`drop-shadow` pada elemen bergerak.
- Animasi `infinite` wajib dijeda di luar layar (kelas `.idle`, otomatis lewat `initFusionify` untuk `main > section`, `main > div`, `footer`, `[data-pause]`).
- Jangan menulis `left`/`top`/`width` atau membaca ukuran elemen tiap frame. Ukur sekali, perbarui saat resize.
- Lenis hanya untuk mouse/trackpad; layar sentuh pakai scroll bawaan. Kunci scroll lewat `lockScroll()`, dan `ScrollTrigger.config({ ignoreMobileResize: true })`.
- Dengan Lenis: `scrub` sekitar 0.3, tanpa `anticipatePin`.
- Efek membesar: SVG sekitar 400px diperbesar dengan `scale`, jangan SVG raksasa.
- Untuk Safari lama: tulis `overflow-x: hidden` sebelum `overflow-x: clip`, dan `100vh` sebelum `100svh`.
- Target PageSpeed mobile: Aksesibilitas, Praktik Terbaik, SEO = 100.

## Dokumen

Template ada di `dokumen/` (panduan `dokumen/README.md`):
- HTML → PDF di `dokumen/cetak/`: `surat.html`, `invoice.html`, `penawaran.html`, `kuitansi.html`, `dokumen.html`, `slide.html`, `perjanjian.html`, `sertifikat.html` (A4 mendatar), `tiket.html` (e-tiket 210×99 mm), `kartu-nama.html` (90×55 mm). Gaya `cetak.css` memakai `css/tokens.css`; `dokumen.js` menghitung Rupiah, total, terbilang, tanggal, dan menggambar `.segel`.
- Office di `dokumen/office/`: `FUSIONIFY-Surat.docx`, `FUSIONIFY-Dokumen.docx`, `FUSIONIFY-Slide.pptx` (layout FY Judul/Bagian/Isi/Judul saja/Angka/Penutup), `FUSIONIFY-Spreadsheet.xlsx` (Invoice, Anggaran, Daftar).
- Isian wajib diganti berlatar kuning muda (`.ganti`). Cetak final: `node scripts/build-dokumen.mjs --final berkas.html --keluar hasil.pdf`.
- Nomor dokumen `{urut}/{SRT|INV|PNW|KWT|PRJ|SER}/FI/{bulan romawi}/{tahun}`. Harga, angka, dan status wajib asli; pajak hanya bila PKP.

## Ikon

- Pakai Ikon FUSIONIFY: sprite `ikon/ikon.svg` lalu `<svg class="ikon" aria-hidden="true"><use href="#ikon-NAMA"/></svg>`; React `<Ikon nama="…" />`, `<IkonStiker>`, `<IkonSegel>`, `<TautanSosmed>`; Android `@drawable/fy_ikon_nama`.
- Ciri khas: garis 2px bulat + titik i biru muda (`--ikon-titik`). Wadah `.ikon-stiker` (`.biru`, `.tint`, `.kecil`) dan `.ikon-segel` (`.biru`). Sosmed: `.sosmed` + `#sosmed-instagram|tiktok|whatsapp|telegram|x|youtube|linkedin|facebook|threads|github|discord|shopee|google-play`.
- Nama ikon: lihat `ikon/ikon.json` atau `templates/ikon.html`. Jangan memakai set ikon lain atau emoji; ikon baru digambar di `ikon/sumber.mjs` lalu `npm run build:ikon`.

## Grafis media sosial dan OG image

- `grafis/post.html` (1080×1080), `potret.html` (1080×1350), `story.html` (1080×1920, juga sampul Reels/TikTok), `og.html` (1200×630), `banner.html` (X, LinkedIn). Satu `.kanvas[id]` = satu PNG.
- Ganti teks lewat JSON: `node scripts/build-grafis.mjs grafis/og.html --kanvas og-produk --isi isi.json --keluar hasil/` (kunci `judul`, `kicker`, `teks`, `status`, `url`, `maskot`, `logo`, dll.). Perintah menolak teks yang keluar kanvas atau tertutup maskot.
- Setiap halaman publik produk punya `og:image` 1200×630.

## Email dan React

- Email: `email/fy-email.js` (`renderEmail`) dan `email/templates.js` (kodeVerifikasi, aturUlangPassword, selamatDatang, pengajuanDisetujui/Ditolak, pembayaranBerhasil/Gagal, statusPenarikan, pemberitahuan), tanda tangan email `tandaTangan({ nama, jabatan, aset })`. Tabel inline, tanpa SVG/WebP, PNG dari `email/aset/` di-host di domain produk, selalu kirim teks polos, tanpa emoji di subjek.
- React: `react/index.tsx` (Tombol, Chip, Kartu, Judul, Kicker, Seksi, Maskot, KepalaMaskot, PanggungMaskot, Gelembung, Keadaan, BadgeProduk, Segel, FyAset) di atas `css/fusionify.css`. Tailwind: `react/tailwind-preset.js` (v3) atau `react/tailwind-v4.css` (v4); warna dari variabel kit, jangan hex sendiri.
- Dokumen perjanjian: `dokumen/cetak/perjanjian.html`, `dokumen/office/FUSIONIFY-Perjanjian.docx` (kode PRJ; kerangka umum, bukan nasihat hukum).

## Isi dan bahasa

- Status produk ditulis jujur sebagai chip berwarna. Tidak ada angka, testimoni, atau partner karangan.
- Kontras teks minimal 4.5:1. Teks terang di atas biru pakai `#f2f8ff` atau putih, jangan pakai `opacity` pada teks di atas biru.
- Harga di `.plan` wajib harga asli; kalau belum pasti tulis "Hubungi kami". Seksi testimoni dihapus kalau belum ada izin tertulis, jangan diisi contoh.
- Bilingual ID/EN; Bahasa Indonesia natural, bukan terjemahan kaku.
- Gaya santai, jelas, manusiawi. Tanpa em dash di teks yang dibaca pengunjung.
- Kontak publik hanya hello@fusionify.id dan WhatsApp +62 831-1138-0628.

## Larangan orisinalitas

Semua kode ditulis sendiri. Jangan meniru andikadevs: tidak ada maskot terbang ke pojok nav, pintu di huruf wordmark, awan bertumpuk, atau laut dan kapal. Jangan memakai gaya template generik (gradien ungu, kartu kaca).

## Menjaga sinkron

Kalau token atau komponen di fusionify.id berubah, perbarui repo `Fusionify_UI` (lalu jalankan `node scripts/build-konteks.mjs` dan `node scripts/build-tokens.mjs`, `npm test`, catat di CHANGELOG, rilis versi baru), samakan variabel dan komponen di library Figma, dan perbarui skill ini (juga salinannya di `skills/fusionify-brand-style/SKILL.md` di repo kit).
