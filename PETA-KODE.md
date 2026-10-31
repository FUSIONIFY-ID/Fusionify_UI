# Peta teknis · FUSIONIFY UI (repo `FUSIONIFY-ID/Fusionify_UI`)

Dibuat 1 Nov 2026 dari pembacaan penuh repo ini (commit `85ae4e4`, tag terakhir `v1.13.0`). Peta, bukan aturan: kalau bertentangan dengan AGENTS.md atau DESIGN.md, aturan yang menang. Diperbarui untuk 1.14.0 (31 Okt 2026): lihat 8.0.
Nomor baris mengacu ke file apa adanya. CSS di repo ini ditulis padat (satu aturan per baris), jadi nomor baris = nomor aturan.

Cara baca cepat: bagian 1 (arsitektur), 4 (JS + atribut), 7 (uji), 8 (temuan). Temuan tingkat **tinggi** ada di 8.1.

---

## 1. Arsitektur, cara pakai, versi, perintah, rilis

### 1.1 Gambaran

Kit sistem desain semua web FUSIONIFY, diturunkan dari fusionify.id (sumber kebenaran: repo `FUSIONIFY-ID/FUSIONIFY`). Tanpa framework, tanpa build saat runtime. Lapisannya:

```
css/tokens.css ─► css/base.css ─► css/components.css ─► css/product.css ─► css/controls.css   (= css/fusionify.css lewat @import)
                                                                                └─► css/app.css   (tambahan, hanya halaman aplikasi)
js/lisensi.js  ◄── dipanggil di awal ── js/motion.js (initFusionify, web publik, butuh gsap + lenis)
                                       js/app.js    (initApp, aplikasi, tanpa GSAP)
                                       js/controls.js (initControls, dipanggil otomatis oleh keduanya)
js/theme.js (dipanggil oleh motion.js & app.js) · js/seal.js (bentuk segel) · js/ikon-inline.js (hasil generate)
snippets/ (head-script, sprite, body-parts, pwa-head, manifest) · fonts/ brand/ mascot/ badge/ (aset)
Generator: tokens/ (native), ikon/ (SVG/sprite/PNG/React/Android), dokumen/ (PDF + Office), grafis/ (PNG), email/, FUSIONIFY-UI-KONTEKS.md
```

Folder aset biner (hanya dihitung):

| Folder | Isi |
| --- | --- |
| `fonts/` | 5 woff2 (Afacad Flux var, Sansation 400/700, Caveat var, Exo 2 var) |
| `brand/` | 9 file + `brand/kit/` 12 + `brand/app-icons/` 5 |
| `mascot/` | 53 file (badan penuh `.webp` + `-420.webp`, kepala `head-*.webp` + `-120.webp`, `sign`, 4 stiker bot, `POSE-BARU.md`) |
| `badge/` | 4 PNG (id/en × light/dark) |
| `ikon/` | `svg/` 136, `sosmed/` 13, `png/` 17, `ikon.svg`, `ikon.json`, `sumber.mjs`, `README.md` |
| `tokens/` | json, Dart, Swift, Kotlin, RN, `fonts-ttf/` 8, `android/res/` (drawable 153, font 12, values 3, values-night 1) |
| `dokumen/` | `cetak/` 13, `contoh/` 10 PDF, `office/` 5 + `office/aset/` 11 PNG |
| `email/` | `aset/` 13 PNG, `contoh/` 20 (10 html + 10 txt) |
| `grafis/` | 5 template + css/js/README, `contoh/` 13 PNG |
| `templates/` | 15 html + `auth/` 5 + `legal/` 2 + `aset/` 1 (qr-contoh.svg) |

### 1.2 Cara pakai (ringkas dari AGENTS/README)

1. Salin kit ke `public/fusionify-ui/` atau git submodule, kunci di tag (`git checkout vX.Y.Z`), atau `npm i github:FUSIONIFY-ID/Fusionify_UI#vX.Y.Z`.
2. `npm i gsap lenis` (peer: gsap ^3.12, lenis ^1.1). Tanpa bundler: importmap ke jsDelivr (contoh di `demo/index.html:292-298`).
3. `<head>`: isi `snippets/head-script.html`, preload Afacad Flux + Sansation 400, `css/fusionify.css` (+ `css/app.css` di halaman aplikasi).
4. Setelah `<body>`: `snippets/sprite.html` (+ sprite ikon). Sebelum `</body>`: `snippets/body-parts.html`.
5. Web publik: `initFusionify()`; aplikasi/PWA: `initApp()`.
6. Web produk: badge `badge/produk-fusionify-*.png` di footer.

### 1.3 Versi

- `package.json` `version` = **1.14.0**; bagian teratas `CHANGELOG.md` = **1.14.0 · 31 Oktober 2026**. Cocok. Tag terakhir `v1.14.0` (lokal; dorong dengan `git push origin v1.14.0`).
- `name` `@fusionify/ui`, `private: true`, `type: module`. `exports`: `./css/*`, `./js/motion|seal|app|theme|controls|lisensi`, `./tokens/*`, `./snippets/*`, `./fonts/*`, `./brand/*`, `./mascot/*`, `./badge/*`, `./templates/*`, `./react` (index.tsx), `./react/tailwind-preset`, `./email`, `./email/templates`, `./grafis/*`, `./dokumen/*`, `./ikon/*`.
- devDependencies: playwright 1.56.0, axe-core 4.10.3, docx 9.7.1, pptxgenjs 4.0.1, simple-icons 13.21.0, react/react-dom 18.3.1 (+types), typescript 5.6.3, gsap 3.12.5, lenis 1.1.13.

### 1.4 Perintah npm (semua `scripts`)

| Perintah | Isi |
| --- | --- |
| `npm test` | `node tests/run.mjs` (server statis lokal, jalankan semua `tests/*.mjs`; `npm test -- interaksi` untuk filter nama) |
| `npm run build:konteks` | `scripts/build-konteks.mjs` → `FUSIONIFY-UI-KONTEKS.md` |
| `npm run build:tokens` | `scripts/build-tokens.mjs` → `tokens/**` |
| `npm run release` | `scripts/release.mjs` (cek versi package.json = CHANGELOG, cetak perintah git tag) |
| `npm run build:dokumen` | `scripts/build-dokumen.mjs` → `dokumen/contoh/*.pdf` |
| `npm run build:office` | `word.cjs` → `rapikan_docx.py` (3 docx) → `slide.cjs` → `sheet.py` (butuh Python + openpyxl) |
| `npm run build:email` | `scripts/build-email.mjs` → `email/contoh/*.html|.txt` |
| `npm run build:grafis` | `scripts/build-grafis.mjs` → `grafis/contoh/*.png` |
| `npm run build:ikon` | `scripts/build-ikon.mjs` → semua turunan ikon + sprite per halaman |
| `npm run cek:ikon` | `scripts/cek-orisinal-ikon.mjs` (banding Lucide/Tabler/Heroicons/Feather, unduh ke `.cache/`) |

Skrip lain tanpa entri npm: `scripts/mascot-import.py` (Pillow, impor pose maskot baru).

### 1.5 Alur rilis dan CI

- `.github/workflows/uji.yml` ("Uji tampilan"): push ke `main`, PR, manual. Node 22, `npm ci`, `npx playwright install --with-deps chromium`, lalu **cek generate**: jalankan `build-tokens` + `build-konteks` dan `git diff --exit-code -- tokens FUSIONIFY-UI-KONTEKS.md` (gagal kalau lupa regenerate), lalu `npm test`. Timeout 40 menit.
- `.github/workflows/rilis.yml` ("Rilis"): push tag `v*.*.*`. `release.mjs --check $TAG` (tag = package.json = CHANGELOG), `npm ci`, Chromium, `npm test`, `git archive HEAD` → `dist/Fusionify_UI-vX.Y.Z.zip`, `release.mjs --notes` → catatan, `gh release create`. Timeout 45 menit.
- `scripts/release.mjs:12` mengambil versi teratas CHANGELOG dengan regex `^## (\d+\.\d+\.\d+)`; `section()` (`:14`) memotong bagian versi untuk catatan rilis.
- Aturan nomor: Z perbaikan aman, Y komponen baru tak merusak, X kelas/markup berubah. Web produk mengunci satu versi.

Status regenerate yang saya cek (di salinan scratchpad, bukan di repo): `build-konteks` menghasilkan file **identik** dengan `FUSIONIFY-UI-KONTEKS.md`, dan `build-tokens` menghasilkan `tokens/` **identik**. Jadi KONTEKS dan token selaras dengan CSS sekarang.

---

## 2. `css/tokens.css` (162 baris, 1.14.0)

`@font-face` (`:6-10`): "Afacad Flux Variable" (100-1000), "Sansation" 400 dan 700, "Caveat Variable" (400-700), "Exo 2 Variable" (100-900). Semua `font-display: swap`, path `../fonts/*.woff2`.

### 2.1 Terang (`:root`, `:12-106`)

| Kelompok | Token = nilai |
| --- | --- |
| Biru | `--blue` #0d6cd7 · `--blue-deep` #0261cd · `--blue-light` #539de9 |
| Tinta/latar | `--ink` #0b0f1a · `--ink-2` #3a4458 · `--ink-3` #566175 · `--surface` #eaf4ff · `--paper` #f7fbff · `--white` #ffffff · `--line` #d3e4f7 · `--night` #071022 |
| Status | `--go` #157f3b / `--go-bg` #e3f6e9 · `--beta` #9a5b00 / `--beta-bg` #fff2d8 · `--wip` #8a4a00 / `--wip-bg` #ffe9d6 · `--plan` #0261cd / `--plan-bg` #eef7ff · `--eos` #5b6475 / `--eos-bg` #eceff4 |
| Huruf | `--f-head` "Afacad Flux Variable", "Afacad Flux", system-ui, sans-serif · `--f-body` "Sansation", system-ui, sans-serif · `--f-hand` "Caveat Variable", "Caveat", cursive · `--f-num` "Exo 2 Variable", "Exo 2", system-ui, sans-serif |
| Radius | `--r-s` 10px · `--r-m` 18px · `--r-l` 28px · `--r-pill` 999px |
| Jarak | `--sp-xs` 4 · `--sp-s` 8 · `--sp-m` 12 · `--sp-l` 16 · `--sp-xl` 24 · `--sp-2xl` 32 (px) · `--edge-width` 2px · `--touch-min` 44px · `--gut` clamp(16px, 4vw, 48px) · `--max` 1240px |
| Gerak | `--ease` cubic-bezier(0.22, 1, 0.36, 1) · `--spring` cubic-bezier(0.34, 1.56, 0.64, 1) |
| Tema | `--card` #ffffff · `--field` #ffffff · `--surface-2` #dcecff · `--edge` var(--ink) · `--edge-shadow` var(--ink) · `--text-blue` #0d6cd7 · `--text-blue-deep` #0261cd · `--inverse-bg` #0b0f1a · `--inverse-fg` #ffffff · `--inverse-accent` #8cc0ff · `--nav-glass` rgba(255,255,255,0.82) · `--hero-glow` #dcedff · `--seal-tint` #d8eaff · `--danger` #b4232c / `--danger-bg` #fde8ea · `--placeholder` #707a8c · `--bintang` #f0a800 |
| Bayangan | `--shadow` 0 1px 0 rgba(13,108,215,.06), 0 12px 32px -14px rgba(11,15,26,.18) · `--shadow-pop` 0 3px 0 var(--edge-shadow) · `--shadow-sticker` 0 6px 0 var(--edge-shadow) |
| Sama di dua tema (1.14.0) | `--on-dark` #ffffff · `--on-dark-2` #f2f8ff · `--danger-fill` #c4323a · `--warn-fill` #e8a33d · `--online` #2fbf63 (gelap #3fd277) |
| Permukaan malam (1.14.0) | `--night-ink` #dbe9fb · `--night-ink-2` #9fb3cd · `--night-ink-3` #8296b2 · `--night-link` #b9cbe3 · `--night-line` #1d2b45 · `--night-line-2` #2a3b5c · `--code-fg` #eaf3ff · `--code-muted` #9db2cf · `--code-line` #1f3459 · `--code-edge` #2e5592 · `--code-btn` #10203f · `--code-btn-hover` #17305a · `--code-str` #7fe0a6 · `--code-key` #8cc0ff · `--code-num` #ffd27a |
| Lain | `color-scheme: light` |

`--seal-mask` (data-URI segel) ada di `:root` tersendiri `:110` (sejak 1.14.0; sebelumnya di product.css). `--footer-top` hanya di blok gelap.

### 2.2 Gelap (`:root[data-theme="dark"]` `:119-134`, disalin identik di `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` `:136-153`; keduanya dicek identik oleh `build-tokens.mjs` dan `tests/token.mjs`)

`--ink` #eaf3ff · `--ink-2` #c3d4ea · `--ink-3` #9db2cf · `--paper` #071022 · `--surface` #0c1a33 · `--line` #1f3459 · `--white` #0f2040 · `--card` #10203f · `--field` #0b1830 · `--surface-2` #17305a · `--edge` #2e5592 · `--edge-shadow` #02060f · `--text-blue` #8cc0ff · `--text-blue-deep` #a9d0ff · `--inverse-bg` #eaf3ff · `--inverse-fg` #071022 · `--inverse-accent` #0261cd · `--nav-glass` rgba(10,22,44,.82) · `--hero-glow` #0f2a55 · `--seal-tint` #15315c · `--go` #7fe0a6 / #0f3324 · `--beta` #ffd27a / #3a2a08 · `--wip` #ffb98a / #3c220e · `--plan` #a9d0ff / #10264a · `--eos` #b5c0d0 / #1c2638 · `--danger` #ff9ba1 / #3d1418 · `--placeholder` #8597b3 · `--footer-top` #1f3459 · `--bintang` #ffc93d · `--shadow` 0 1px 0 rgba(0,0,0,.2), 0 12px 32px -14px rgba(0,0,0,.6) · `color-scheme: dark`.

Tidak berubah di gelap: `--blue`, `--blue-deep`, `--blue-light`, `--night`, huruf, radius, jarak, gerak.

### 2.3 Utilitas tema (`:157-161`)

`.only-light` / `.only-dark` disembunyikan sesuai `data-theme` atau `prefers-color-scheme` (tanpa atribut).

---

## 3. Per file CSS: kelas, varian, breakpoint

Hitungan kelas di bawah dari ekstraksi selector otomatis.

### 3.1 `css/fusionify.css` (8 baris)
`@import` tokens, base, components, product, controls. **Tidak** termasuk app.css.

### 3.2 `css/base.css` (102 baris, 30 kelas)
- Reset (`*` box-sizing), `html` (bg paper, `overflow-x: clip`), `html.lenis`, `html.scroll-lock` (`:9`), `body` 17px/1.6 Sansation, `img, svg {max-width:100%}` (`:21`).
- `.fx-oversize` + pengecualian `max-width:none` untuk `.cursor svg, .veil svg, .loader svg, .wave svg, .person .ph .ring` (`:25`).
- `::selection`, `:focus-visible` (outline 3px blue-light).
- Tipografi: `h1-h4` Afacad 800 lh .98; `.wrap` (`:34`), `.sr-only`, `.skip`, `.nowrap`, `.num`, `.hand`, `.kicker` (+`::before` titik), `.h-hero` clamp(54-128), `.h-sec` clamp(40-84), `.dot`, `.lead`, `.prose` (h2/h3/p/ul/a).
- `.theme-switching` (`:66`, transisi warna 0,3 dtk saat ganti tema).
- Scrollbar webkit kapsul biru (`:83-90`), Firefox `scrollbar-color` via `@supports not selector(::-webkit-scrollbar)`.
- Breakpoint: `prefers-reduced-motion: reduce` (`:69`, reveal/split langsung tampil), `max-width: 420px` (`:78`), `(hover:none) and (pointer:coarse)` (`:100`, input min 16px).

### 3.3 `css/components.css` (336 baris, ±104 kelas)

| Baris | Komponen | Kelas/varian |
| --- | --- | --- |
| 9-26 | Tombol | `.btn` (`--bg/--fg`), `.ghost`, `.sm`; `.icon-btn` |
| 31-38 | Tombol tema | `.theme-btn .sun/.moon` |
| 44-50 | Chip status | `.chip` + `.go .beta .wip .plan .eos` |
| 56-106 | Nav | `.nav` (`.scrolled`, `.hide`), `.brand`, `.brand-mark`, `.brand-word`, `.nav-links`, `.nav-tools`, `.lang` (`b.on`), `.sound-btn` (`.w1 .w2 .x`), `.menu-btn` (`.l1 .l2`), `.drawer` (`.open`, `.drawer-mascot`) |
| 111-120 | Seksi | `.sec` (`.tint`, `.blue`), `.sec-head`, `.page-hero`, `.crumbs` |
| 125-136 | Kartu | `.card` (`.blue`, `.tint`, `a.card`), `.grid-3`, `.grid-2` |
| 139-149 | Statistik | `.stats`, `.stat` (`.v`, `.lab`; pola nth-child biru/tint) |
| 152-165 | Karya | `.works`, `.work` (`.cover`, `.meta`, `.cat`, `.arrow`), `.cover-note` |
| 168-175 | Foto bersegel | `.person .ph` (`.ring`, img `clip-path:url(#seal-clip)`) |
| 181-196 | Maskot | `.bubble` (`.left`, `.pop`), `.mascot-stage` (`.seal-bg`, `.seal-ring`, `.body`) |
| 201-218 | Marquee, FAQ | `.marquee .row .item`, `.faq details/summary/.pm/.ans` |
| 223-224 | Gelombang | `.wave` |
| 229-246 | Footer produk | `.footer`, `.fcols .fh`, `.fbar`, `.to-top`, `.fy-badge` |
| 251-258 | Toast | `.toast` (`.show`) |
| 263-278 | Kursor | `.cursor` (`.ready .link .labelled .down .dark`), `.has-cursor`, `.dot`, `.ring`, `.label` |
| 284-289 | Tirai | `.veil` (`.blob`, img), `.arriving` |
| 294-301 | Reveal/jeda | `.js [data-reveal]`, `.js .split .w`, `.fx-off`, `.idle` |
| 310-336 | Ikon | `.ikon` (`.polos`, `.ikon-16/20/24/32`, `--ikon-titik`), `.ikon-stiker` (`.kecil .biru .tint`), `.ikon-segel` (`.biru`), `.sosmed` |

Keyframes: `fy-wave` (opacity), `fy-pop`, `fy-spin`, `fy-bob`, `fy-slide` (transform/opacity).
Breakpoint: `prefers-color-scheme: dark` (`:35`), `max-width` 960 (`:104`, nav jadi tombol menu), 420 (`:105`), 350 (`:106`, wordmark hilang), 1000 (`:135, 148, 164`), 620 (`:136, 165`), 560 (`:149`), 860 (`:246`).

### 3.4 `css/product.css` (536 baris, ±164 kelas)

| Baris | Komponen | Kelas |
| --- | --- | --- |
| 10-34 | Form | `.field` (`span`, `small`, `.err`), `.input`, `.select`, `.textarea`, `.check`, `.form-grid` (`.full`) |
| 40-53 | Layanan | `.svc` (`.more`, `a.svc`), `.svc-ico`; `:root{--seal-mask}` (`:53`) |
| 58-64 | Fitur | `.ticks` (`li.no`) |
| 70-80 | Langkah | `.steps` (`.n`), varian di `.sec.blue` |
| 87-101 | Harga | `.plans > .plan` (`.desc .price .featured .ribbon`) |
| 106-112 | Testimoni | `.quote` (blockquote, figcaption) |
| 117-125 | CTA | `.cta-band` (`.actions .mascot .seal-deco`) |
| 131-137 | Catatan | `.note` (`.ok .warn .danger`) |
| 143-149 | Tabel | `.table-wrap`, `.table` (`.num`) |
| 154-156 | Tag | `.tags`, `.tag` |
| 161-165 | Kosong/404 | `.empty` (`.code`) |
| 170-171 | Kepala produk | `.prod-head`, `.prod-logo` |
| 176-181 | Segmen | `.segment` |
| 187-249 | Acara | `.event-top`, `.event` (`-cover -main -meta -chips -facts -sec -bar`), `.poster`, `.fact .ico-tile`, `.reg` (`-head -done .quota`), `.ticket`, `.agenda`, `.hosts`, `.going`, `.has-event-bar` |
| 254 | Data contoh | `.sample-note` |
| 261-303 | Bayar QRIS | `.pay` (`data-pay-state`: menunggu/berhasil/kedaluwarsa/gagal + `[data-show]`), `.pay-top .avatar-l`, `.pay-card`, `.pay-amount`, `.pay-meta`, `.qr .qr-box .qr-label`, `.pay-timer`, `.pay-bar` (`.low`), `.pay-actions`, `.pay-how`, `.pay-result`, `.pay-foot` |
| 308-342 | Status | `.status-banner` (`.warn .down`), `.uptime` (`.head .scale .wide .narrow`), `.uptime-bars` (`data-s=warn/down/none`), `.incidents .incident`, `.day-ok` |
| 348-404 | Dokumentasi | `.docs`, `.docs-nav`, `.docs-main`, `.docs-toc`, `.code-block .code-head` (`.c .s .k .n`), `.endpoint`, `.method` (`.get .post .put .patch .delete`), `.req`, `.docs-pager` |
| 407-435 | Daftar isi, legal | `.toc`, `.legal`, `.legal-head`, `.legal-switch`, penomoran counter `pasal` |
| 441-460 | Katalog ikon | `.ikon-katalog .ikon-alat .ikon-daftar .ikon-grup .ikon-grid .ikon-kartu .ikon-wadah .ikon-kosong .ikon-contoh .ikon-panduan` |
| 471-484 | Linimasa | `.timeline li` (`.done .now .fail`, `.tl-time .tl-title`) |
| 488 | Kbd | `.kbd` |
| 492-495 | Harga | `.harga` (`.lg`, `s`) |
| 506-525 | Kartu produk | `.product-grid`, `.product-card` (`.habis`), `.pc-media` (`.contain`), `.pc-diskon`, `.pc-body`, `.pc-cat`, `.pc-title`, `.pc-actions` |
| 532-536 | Hitung mundur | `.countdown .cd-unit` (`.selesai`) |

Breakpoint: max 620 (`:34, 101`), 720 (`:80`), 1000 (`:100`), 700 (`:125, 327`), min 700 (`:192`), min 900 (`:245, 431`), min 701 (`:332`), min 960 (`:395`), min 1280 (`:401`), max 420 (`:460`), max 560 (`:507`).

### 3.5 `css/controls.css` (833 baris, ±223 kelas)

| Baris | Bagian | Kelas |
| --- | --- | --- |
| 11-25 | Dropdown | `.dropdown`, `.menu` (`.up .start`, `hr`) |
| 27-39 | Modal | `.modal` (`.m-body .m-foot .m-close`, `.full`), `.btn.danger` (`:39`) |
| 42-55 | Tab, progres | `.tabs [role=tab|tablist|tabpanel]`; `.progress` (`span`, `.go .warn`) |
| 57-66 | Badge | `.badge` (`.dot .blue`), `.has-badge` |
| 68-93 | Grup tombol, split | `.btn-group` (`.block`), `.split-btn` (`.caret`) |
| 95-125 | FAB | `.fab` (`.sm .lg .soft .ext .shrink`, `.label`), `.fab-dock`, `.fab-menu`, `.fab-actions .fab-action`, `.fab-scrim` (`.on`) |
| 127-140 | App bar | `.appbar` (`.scrolled .collapse`, `.title .actions`), `.appbar-title` |
| 142-158 | Navbar bawah | `.with-navbar`, `.navbar` (`.ico .lbl`) |
| 160-177 | Rail | `.with-rail`, `.rail` (`.rail-top .rail-nav .rail-foot`), `.m-app` (navbar → rail mulai 700px) |
| 179-213 | Sheet | `.sheet`, `.side-sheet` (`.closing .dragging`), `.sheet-handle .sheet-head .sheet-body .sheet-foot`, `html.sheet-open` |
| 216-241 | Carousel | `.carousel` (`-track -nav -dots`, `.slide .wide .slide-body`) |
| 243-268 | Slider | `.slider`, `.slider-field`, `.range2` (`.ends`) |
| 270-282 | Tooltip | `.tip-wrap .tip` (`.below`, `.tip-on .tip-off`) |
| 284-304 | List | `.list` (`.divided`), `.li` (`.li-lead .li-ico .li-txt .li-trail`, `.unread`) |
| 306-327 | Chip interaktif | `.chip-set` (`.scroll`), `.chip-btn`, `.chip-input` (`.with-av .x`) |
| 329-358 | Loading | `.spinner` (`.sm .lg .contained`), `.loading-block`, `.skel` (`.text .title .circle .block`), `.ring` (`:353`), `.progress.indeterminate` |
| 360-374 | Snackbar | `.snackbar` (`.show`, `.sb-text .sb-act .sb-x`) |
| 376-394 | Search | `.search-bar`, `.suggest` (`.none`) |
| 396-448 | Picker | `.picker` (`.picker-btn`, `.pop .end`, `.pop-scrim`), `.dp-head .dp-title .dp-grid .dp-wd .dp-day` (`.out .in-range`), `.dp-foot .hint .txt-btn`, `.tp-cols .tp-sep .tp-col .tp-list .tp-foot` |
| 450-462 | Float bar | `.float-bar` (`.fb-count .sep .dock`) |
| 464-482 | OTP | `.otp` (`.otp-box .filled .otp-sep .shake .done .otp-store`), `.resend` |
| 484-515 | Upload | `.upload` (`.drop .over .single .has`), `.upload-list .up-item` (`.up-thumb .round .up-meta .error`) |
| 517-549 | Stepper | `.stepper` (`.step-sub`), `.wizard-step`, `.wizard-foot`, `.wizard-count` |
| 551-567 | Tabel urut | `.sort-btn .sort-arrow .sort-both` |
| 569-625 | Notifikasi | `.notif` (`.open`), `.notif-panel`, `.notif-head .notif-readall .notif-filter .notif-list .notif-item .notif-ico .notif-txt .notif-dot .notif-empty .notif-all .notif-scrim` |
| 627-648 | Keadaan | `.state` (`.sm .error .offline`), `.offline-bar` |
| 650-675 | Foto profil | `.avatar-crop .ac-preview`, `.crop-modal .crop-stage .crop-ring .crop-tools .crop-hint` |
| 680-696 | Breadcrumb | `.breadcrumb` |
| 697-715 | Pagination | `.pagination` (`.gap`) |
| 716-729 | Accordion | `.accordion .acc-body` |
| 730-745 | Input group | `.input-group .addon` |
| 746-763 | Jumlah | `.qty` |
| 764-780 | Rating | `.rating .stars` (`--nilai`, `--ukuran`), `.rating-input` |
| 781-804 | Galeri | `.gallery`, `.lightbox` (`.lb-top .lb-stage .lb-cap .lb-prev .lb-next`) |
| 805-816 | Pengumuman | `.announce .announce-close` |
| 817-833 | Cookie | `.consent .consent-actions` (`.inline`) |

Keyframes: `fy-modal`, `fy-rise`, `fy-sheet-up`, `fy-side-in`, `fy-fade`, `fy-breathe`, `fy-shimmer`, `fy-indet`, `fy-shake`, `fy-pop-in`, `fy-sheet-in`, `fy-drop-in` (semua transform/opacity).
Breakpoint: min 700 (`:172`), max 520 (`:198, 373`), max 600 (`:210, 412, 422, 447, 614, 803`), `prefers-reduced-motion` (`:240, 340`), `hover: hover` (`:279`), `prefers-color-scheme: dark` (`:346`), max 560 (`:543, 692`), min 601 (`:621`), max 420 (`:714`), max 480 (`:833`).

### 3.6 `css/app.css` (328 baris, ±119 kelas)

| Baris | Bagian | Kelas |
| --- | --- | --- |
| 11-46 | Kerangka | `.app` (`.side-open`), `.side`, `.side-brand`, `.side-nav` (`.group .count`), `.side-foot`, `.side-help`, `.app-main`, `.topbar`, `.side-toggle`, `.app-body`, `.page-head`, `.scrim` |
| 49-58 | Cari, titik notif | `.search`, `.icon-btn .dot-badge` |
| 63-70 | Avatar | `.avatar` (`.sm .lg`, `--s`), `.avatar-stack`, `.user-chip` (`.who`) |
| 75-83 | Panel, grid | `.panel` (`.flush`), `.panel-head`, `.dash-grid`, `.span-4/5/6/7/8/12` |
| 91-105 | KPI | `.kpis`, `.kpi` (`.lab .v .delta.up/.down/.flat .spark`, `.blue`) |
| 113-130 | Grafik | `.bars` (`span[--v]`, `.hl`), `.linechart` (`.grid .area .ln .pt`, gradien `#fyArea`), `.chart-x`, `.donut` (`--p`), `.legend` |
| 132-135 | "PROGRESS" | **kosong** (kelas `.progress` ada di controls.css) |
| 139-144 | Feed | `.feed` |
| 149-174 | Tabel aplikasi | `.toolbar` (`.left .right`), `.select.sm`, `.input.sm`, `.row-actions`, `.pager` (`.cur`) |
| 179-189 | Switch | `.switch`, `.settings-row` |
| 197-239 | Auth | `.auth`, `.auth-art` (`.seal-deco .copy .mascot .bubble`), `.auth-main`, `.auth-card` (`.sub .row .alt`), `.auth-top`, `.btn.block`, `.btn.social`, `.divider`, `.pw-field .pw-toggle`, `.pw-meter` (`data-level` 1-4), `.auth-done` |
| 247-324 | Chat | `.chat` (`.thread-open`), `.chat-list .chat-top`, `.convos`, `.convo` (`.unread`, `-txt`, `-meta`), `.av-wrap .online`, `.thread`, `.thread-head`, `.msgs`, `.day`, `.msg` (`.them .me .media`), `.msg-card`, `.typing`, `.composer .send`, `.thread-empty`, `.chat-page` |
| 326-328 | Tanggal | `.ev-date` |

Breakpoint: max 960 (`:40`, sidebar jadi laci), 620 (`:54, 70`), 1100 (`:83, 104`), 520 (`:105`), `pointer: coarse` (`:166`), max 900 (`:232`), min 700 (`:315`), min 900 (`:316`), reduced motion (`:324`).

---

## 4. JavaScript

### 4.1 `js/motion.js` (364 baris) · ekspor `initFusionify(opts)`

Impor: `lenis`, `gsap`, `gsap/ScrollTrigger`, `./theme.js`, `./controls.js` (`initControls, snackbar, otpError`), `./lisensi.js`.

| Baris | Isi |
| --- | --- |
| 36-87 | `createSfx()`: Web Audio (tone/noise), suara `tick plop poke ting bloop whoosh`, mati bawaan, simpan `localStorage['fx-sound']` |
| 90-112 | `splitWords(el)`: pecah judul jadi `.w > span`, titik `.dot` ikut kata terakhir |
| 114 | `export function initFusionify(opts)`; `115` `if (!cekLisensi()) return;` (mengembalikan `undefined`) |
| 116-123 | Opsi: `smooth`, `cursor`, `transitions`, `darkAreas` (".sec.blue, .footer, .drawer, [data-dark]"), `pauseSelector` ("main > section, main > div, footer, [data-pause]") |
| 124-126 | `window.__fx = true`, `initTheme()`, `initControls()` |
| 149-158 | Lenis hanya bila `!reduce && !(pointer: coarse)`; `lerp 0.1`, `gsap.ticker`, `lagSmoothing(0)`; `ScrollTrigger.config({ignoreMobileResize:true})` |
| 160-168 | `lockScroll(on)` (Lenis stop/start atau `html.scroll-lock`), `scrollToEl` (offset -20) |
| 171-185 | Nav `.scrolled` (>24px) dan `.hide` (turun, >300px) |
| 188-204 | Laci menu HP (`inert`, fokus, Esc, tutup otomatis ≥961px) |
| 207-218 | Jangkar `#` di halaman sama: scroll halus + fokus |
| 221-257 | Kursor segel (mouse saja): ticker hanya menulis `transform`/`translate`; label dari `data-cursor-label`; `.dark` di `darkAreas` |
| 260-289 | Reveal: `data-split`, `ScrollTrigger.batch("[data-reveal]")`, `data-assemble`, `data-count-to` + `data-suffix` (tahun naik dari -30) |
| 292-303 | Magnet `data-magnetic` (quickTo x/y) |
| 306-322 | `toast(msg)` 2,6 dtk; `data-copy` / `data-copied` (kosong di `.code-block` = salin `<pre>`) |
| 325-354 | Transisi halaman segel (`data-veil`, `.blob`, `sessionStorage['fx-nav']`, `.arriving`, `data-no-veil`, `pageshow` bfcache) |
| 357-360 | `IntersectionObserver` memasang `.idle` (rootMargin 50%) |
| 363 | Return `{ sfx, toast, snackbar, otpError, lenis, lockScroll, scrollTo, gsap, ScrollTrigger }` |

Atribut dibaca: `data-sound`, `data-sfx`, `data-nav`, `data-drawer`, `data-menu`, `data-cursor-el`, `data-cursor` (`poke`), `data-cursor-label`, `data-dark`, `data-split`, `data-reveal`, `data-assemble`, `data-count-to`, `data-suffix`, `data-magnetic`, `data-toast`, `data-toast-text`, `data-copy`, `data-copied`, `data-veil`, `data-no-veil`, `data-pause`. Storage: `fx-sound`, `fx-nav` (session).

### 4.2 `js/app.js` (155 baris) · ekspor `initApp()`

| Baris | Isi |
| --- | --- |
| 26 | Tanpa lisensi: kembalikan stub `{ toast(){}, snackbar(){}, otpError(){}, setSide(){} }` |
| 27-29 | `__fx`, `initTheme()`, `initControls()` |
| 32-46 | Sidebar HP: `data-app`, `data-side`, `data-side-toggle`, `.scrim`, `inert` di ≤960px |
| 49-71 | Password: `data-pw-toggle` (`data-hide`, `data-show`), meter `data-pw-meter="#id"` (`data-words` dipisah `|`, 4 level) |
| 74-118 | Validasi `form[data-validate]`: `data-msg-required/-type/-short/-match`, `data-match="#id"`, `data-done="#id"` (tampil keadaan berhasil). Error hilang saat mengetik; baru muncul saat blur hanya kalau kolom sudah berisi |
| 121-127 | `data-check-all` (+ `aria-selected` di `tr`) |
| 136-152 | `toast`, `data-toast-msg`, `data-copy` (pesan gagal "Gagal menyalin. Salin manual, ya.") |
| 154 | Return `{ toast, snackbar, otpError, setSide }` |

Tidak ada `IntersectionObserver` `.idle` di app.js.

### 4.3 `js/controls.js` (1630 baris)

Ekspor: `snackbar(text, opts)` (`:65`), `otpError(wrap, message)` (`:475`), `pilihanCookie()` (`:1284`), `initControls(root = document)` (`:1308`), `openDialog`, `closeDialog` (`:1629`). Objek `api` (`:1628`) = `{ snackbar, openDialog, closeDialog, otpError, closePopup, init }`.
Impor: `cekLisensi` (lisensi.js), `ikon, isi, svgIkon` (ikon-inline.js).
Helper: `emit()` (`:37`, CustomEvent bubbles), `once(el,key)` (`:40`, semua `init*` memakainya sehingga aman dipanggil berulang), `id()` (`:42`).

| Baris | Fungsi | Atribut / event |
| --- | --- | --- |
| 49-109 | Snackbar (antrean, aksi, jeda saat disorot) | `opts.action/onAction/onClose/duration/close`; label tutup tetap "Tutup" (`:52`) |
| 111-151 | `closePop` / `showPop` (popup picker, jebakan fokus) | |
| 157-265 | `initDatepicker` | `data-datepicker`, `data-range`, `data-locale`, `data-week-start`, `data-min`, `data-max`, `data-label-prev/next/clear/today/start/end/title/to` · `fy:change {start,end,value}` |
| 267-345 | `initTimepicker` | `data-timepicker`, `data-step`, `data-sep`, `data-label-title/hour/minute/cancel/ok` · `fy:change` |
| 347-406 | `closeDialog`, `initDialog`, `openDialog` | `data-close`, tarik `.sheet-handle` (tutup bila >90px atau v>0,6), `data-lenis-prevent` |
| 408-473 | `initOtp` | `data-otp` · `fy:change`, `fy:complete` |
| 495-517 | `initToc` | `data-toc` (aria-current mengikuti bacaan) |
| 519-544 | `initCountdown` (kirim ulang) | `data-countdown`, `data-label`, `data-start` · `fy:resend` |
| 547-651 | `initUpload` | `data-upload`, `data-max-mb`, `data-max-files`, `data-round` · `fy:files`; API `el._fyUpload.progress/done/fail` |
| 654-742 | `initChat` | `data-chat`, `data-thread`, `.back`, history `pushState` · `fy:thread`, `fy:send` (cancelable); API `chat._fyChat.open/close/add` |
| 746-766 | `initIcs` | `data-ics`, `data-title/start/end/location/details/url/file` · `fy:ics` |
| 768-785 | `initShare` | `data-share`, `data-url`, `data-title`, `data-copied` |
| 787-872 | `fieldMsg`, `markField`, `initWizard` | `form[data-wizard]`, `fieldset.wizard-step[data-title]`, `data-wizard-next/prev`, `data-done` · `fy:step {index,total}`; API `_fyWizard.go(i)` |
| 873-924 | `initSort` | `table[data-sort]`, `th[data-sort-key=text|num|date]` · `fy:sort` |
| 926-1007 | `initNotif` | `data-notif` · `fy:read`, `fy:change` |
| 1009-1020 | `initOffline` | `data-offline-bar`, `data-online` · `fy:offline` / `fy:online` di window, `html.is-offline` |
| 1028-1184 | `initAvatarCrop` | `data-avatar-crop`, `data-size` (512), `data-max-mb` (10), `data-type` (image/webp) · `fy:crop {file,blob,url}` |
| 1188-1211 | `initQty` | `data-qty`, `data-qty-step` · `fy:change {value}` |
| 1214-1261 | `lightbox`, `initGallery` | `data-gallery`, `data-caption`, `data-lb` (internal) |
| 1263-1269 | `initAnnounce` | `data-announce="id"`, `data-close` · `fy:close`; `localStorage['fy-tutup-<id>']` |
| 1271-1282 | `initConsent` | `data-consent`, `data-consent-pilih` · `fy:consent {pilihan}` di window; `localStorage['fy-consent']` |
| 1287-1306 | `initTenggat` | `data-tenggat` (ISO), `data-cd=hari|jam|menit|detik` · `.selesai`, `fy:complete` |
| 1308-1626 | `initControls` | dropdown `data-dropdown` (`:1312`), modal/sheet `data-open-modal`/`data-open-sheet` (`:1347`), tab `data-tabs` (`:1354`), `data-btn-group=single|multi` (`:1376`), `.chip-btn[aria-pressed]` + `data-single`, `.chip-input .x` + `data-chip-focus` (`:1389`), `data-fab-menu` (`:1412`), `data-fab-shrink`, `data-appbar` (`:1432`), `data-carousel` + `data-prev/next` (`:1450`), `.slider`, `data-range2`, `data-gap`, `data-format` (`:1491`), `.tip-wrap` (`:1527`), `data-suggest`, `data-empty` (`:1552`), semua `init*` (`:1591-1612`), `data-snackbar` + `data-snackbar-action` → `fy:snackbar-action` (`:1614`), klik luar/Esc (`:1620`) |

Semua event `fy:*` yang dipancarkan: `fy:change`, `fy:complete`, `fy:remove`, `fy:select`, `fy:step`, `fy:sort`, `fy:read`, `fy:files`, `fy:send`, `fy:resend`, `fy:crop`, `fy:close`, `fy:thread`, `fy:ics`, `fy:snackbar-action`, `fy:offline`, `fy:online`, `fy:consent` (window), plus `fy:theme` dari theme.js (di `<html>`).

### 4.4 `js/theme.js` (42 baris)

`currentTheme()` (`:12`), `setTheme(t)` (`:14`, ditolak bila `data-theme-lock`, simpan `localStorage['fy-theme']`, event `fy:theme`), `initTheme()` (`:31`, klik `[data-theme-toggle]`, kelas `.theme-switching` 350 ms, `aria-pressed`, `data-label-dark`/`data-label-light`).

### 4.5 `js/lisensi.js` (43 baris) · kunci domain

- `DOMAIN_RESMI` (`:9`): `fusionify.id`, `fusionify.biz.id`, `premiumify.my.id`, `studydate.id` (setiap subdomain ikut).
- `DOMAIN_LOKAL` (`:18`): `localhost`, `127.0.0.1`, `0.0.0.0`, `[::1]`; juga `file:`, `*.local`, `*.localhost` (`:24-29`).
- `domainDiizinkan(host, protocol)` (`:21`, hasil di-cache untuk host saat ini). `cekLisensi()` (`:35`): kalau gagal, pasang `html.fx-off.fy-unlicensed` dan `console.warn` sekali.
- Efek: `initFusionify` berhenti total (return `undefined`), `initApp` mengembalikan stub, `initControls` mengembalikan `api` tanpa memasang apa pun. CSS tetap jalan, konten terbaca (`.fx-off` memaksa reveal tampil). Ini kunci sisi klien (bisa dilewati dengan mengedit file); fungsinya pengingat lisensi, bukan proteksi.

### 4.6 `js/seal.js` (22 baris) + `js/seal.d.ts`
`seal(cx=50, cy=50, r=44, amp=3.2, waves=12, steps=160)` (`:11`), `SEAL_PATH` (`:22`). Path di snippet dan `--seal-mask` sama bentuknya (beda jumlah langkah saja).

### 4.7 `js/ikon-inline.js` (21 baris, hasil `build:ikon`)
Ekspor `IKON_INLINE` (subset ikon yang dipakai JS: chevron, tutup, dibaca, cari, naik, urut, perbesar/perkecil/rotasi, dll.), `IKON`, `ikon(nama, kelas)`, `isi(nama)`, `svgIkon(isi, kelas)`.

### 4.8 React (`react/`)
- `index.tsx` (316 baris): `FyAset`/`useFyAset` (base path aset, bawaan `/fusionify-ui`), `Wrap`, `Seksi` (`nada`), `Kicker`, `Judul` (`besar`, `titik`), `Lead`, `Tombol` (`varian` utama/ghost/danger, `kecil`, `penuh`, `href`), `Chip` (label bawaan ID), `Kartu`, `Segel`, `Maskot`, `KepalaMaskot`, `Gelembung`, `PanggungMaskot`, `Keadaan` (kosong/memuat/error/offline/bayar-berhasil/bayar-gagal), `BadgeProduk`, `Ikon`, `IkonSosmed`, `IkonStiker`, `IkonSegel`, `TautanSosmed`, `rupiah`, `Remah`, `Rating`, `Harga`, `KartuProduk`, `Linimasa`, `HitungMundur`, `Kbd`; tipe `NamaIkon`, `NamaSosmed`, `Status`, `Ekspresi`, `EkspresiKepala`, `JenisKeadaan`.
- `lucide.tsx` (171 baris): `buatIkon(nama, tampil)`, `Ikon`, dan ±139 alias nama lucide-react (Activity … Zap) yang menggambar Ikon FUSIONIFY.
- `ikon-data.ts` (hasil generate): `IKON_DATA`, `SOSMED_DATA`, tipe nama.
- `tailwind-preset.js` (v3) dan `tailwind-v4.css` (`@theme inline`): warna, font, radius, bayangan, easing dari `var(--…)`.

---

## 5. Template dan demo

Semua template: `<html lang="id" class="no-js">`, skrip head (tema + `.js`), sprite segel + sprite ikon per halaman (penanda `IKON-SPRITE`), importmap gsap/lenis ke jsDelivr di halaman yang memakai motion.js.

| File | Tujuan | Komponen utama | CSS / JS |
| --- | --- | --- | --- |
| `demo/index.html` (305) | Contoh semua komponen web publik | nav, drawer, hero (`.hero-demo` inline), `.mascot-stage`, swatch token, `.btn`, `.chip`, `.card`, `.stats` (`data-count-to`), `.works`, `.person`, `.marquee`, `.faq`, `.wave`, `.footer`, toast, kursor, tirai | fusionify.css · `initFusionify()` |
| `templates/landing-produk.html` (223) | Landing web produk (bagian `GANTI`) | `.p-hero` (inline), `.svc`, `.steps`, `.segment` + `.plans`, `.quote`, `.faq`, `.cta-band`, form, `.footer` + badge | fusionify.css · `initFusionify()` |
| `404.html`, `500.html`, `maintenance.html`, `offline.html` (121-123) | Halaman error/perawatan/offline (maskot confused/cry/glasses/offline) | `.empty`, `.footer` | fusionify.css · `initFusionify()` |
| `auth/masuk`, `daftar`, `lupa-password`, `atur-ulang-password` (79-89) | Auth | `.auth`, `.auth-art`, `.auth-card`, `.field`, `.pw-field`, `.pw-meter`, `.auth-done` | +app.css · `initApp()` (`data-validate`, `data-pw-*`, `data-done`) |
| `auth/verifikasi.html` (99) | OTP | `.otp` (`data-otp`), `data-countdown` | +app.css · `initApp()` |
| `dashboard.html` (148) | Dashboard pengguna (data contoh berlabel) | `.app`, `.side`, `.topbar`, `.kpis`, `.bars`, `.linechart`, `.donut`, `.feed`, `.notif`, `.offline-bar` | +app.css · `initApp()` |
| `admin.html` (202) | Dashboard admin | KPI, tabel `data-sort` + `data-check-all`, `.toolbar`, `.pager`, modal hapus, `.tabs`, `.switch`, `data-notif` | +app.css · `initApp()` |
| `komponen.html` (629) | Katalog semua kontrol hidup | hampir semua `controls.css` + komponen 1.13 (breadcrumb, pagination, accordion, qty, rating, galeri, announce, consent, countdown) | +app.css · `initApp()` |
| `app-mobile.html` (200) | Aplikasi HP | `.m-app`, `.appbar`, `.search-bar` (`data-suggest`), `.chip-btn`, `.carousel`, `.list`, `.fab` (`data-fab-shrink`), `.navbar`/`.rail`, `.sheet`, picker | +app.css · `initApp()`, `snackbar`, `closeDialog` |
| `chat.html` (181) | Pesan | `.chat`, `.convo`, `.thread`, `.msg`, `.typing`, `.composer`, `.ev-date` | +app.css · `initApp()` (`data-chat`) |
| `acara.html` (202) | Detail acara | `.event*`, `.poster`, `.fact`, `.reg`, `.agenda`, `.hosts`, `.event-bar`, `.sheet` pendaftaran | +app.css · `initApp()`, `openDialog`, `closeDialog` (`data-ics`, `data-share`) |
| `bayar-qris.html` (208) | Bayar QRIS | `.pay` (`data-pay-state`, `?status=`), `.qr`, `.pay-timer`, `.pay-result` | +app.css · `initApp()` + skrip inline `cekStatus()` (`:161`, contoh selalu "menunggu"), cek tiap 5 dtk (`:192`) |
| `status.html` (190) | Status layanan | `.status-banner`, `.uptime-bars`, `.incidents` | fusionify.css · `initFusionify()` |
| `dokumentasi.html` (250) | Dokumentasi developer | `.docs`, `.docs-nav`, `.code-block` (`data-copy`), `.tabs`, `.endpoint`, `.method`, `.toc` (`data-toc`) | fusionify.css · `initFusionify()` |
| `legal/privasi.html`, `legal/syarat.html` (188, 166) | Kerangka legal (UU 27/2022 PDP) | `.legal`, `.legal-switch`, `.toc` (`data-toc`), `.prose` | fusionify.css · `initFusionify()` |
| `ikon.html` (361) | Katalog ikon (cari, ganti tampilan, salin) | `.ikon-katalog` dkk., sprite penuh | fusionify.css · `const fy = initFusionify()` lalu `fy.toast` |

Gaya inline per halaman: `demo/index.html` (`.hero-demo`), `landing-produk.html` (`.p-hero`, `.center`, `.price-switch`, `.contact-form`), `app-mobile.html`, `chat.html`, `komponen.html`.

---

## 6. Pipeline generator (input → output)

| Pipeline | Input | Output | Catatan |
| --- | --- | --- | --- |
| **Ikon** `build-ikon.mjs` | `ikon/sumber.mjs` (`IKON`, `SOSMED`, `KATEGORI`, helper `c`, `k`, `segel`) + paket `simple-icons` | `ikon/svg/*.svg` (136), `ikon/sosmed/*.svg` (13), `ikon/ikon.svg` (sprite `#ikon-*`, `#sosmed-*`), `ikon/ikon.json`, `ikon/png/*.png` (17, 64px), `react/ikon-data.ts`, `js/ikon-inline.js`, `tokens/android/res/drawable/fy_ikon_*`, `fy_sosmed_*`, sprite di `templates/ikon.html` dan sprite per halaman di setiap template/demo | Menolak nama tidak valid dan ikon yang tidak ada (`:146`). Hapus hasil lama dulu (`:29-30`) |
| **Cek keaslian ikon** `cek-orisinal-ikon.mjs` | `IKON` + Lucide 0.460, Tabler 3.22, Heroicons 2.1.5, Feather (diunduh ke `.cache/`) | laporan | Gagal bila path identik atau IoU ≥ 0,85 (kecuali `tambah`, `kurang`, `tutup`) |
| **Token native** `build-tokens.mjs` | `css/tokens.css` (blok `:root` + `[data-theme=dark]`) | `tokens/tokens.json`, `flutter/fusionify_tokens.dart`, `swift/FusionifyTokens.swift`, `android/FusionifyTokens.kt`, `react-native/fusionify-tokens.ts`, `android/res/values(-night)/fy_colors.xml`, `fy_dimens.xml`, `font/*.xml`, drawable stiker, `fy_themes.xml` | Dicek di CI (`git diff --exit-code`) |
| **Dokumen PDF** `build-dokumen.mjs` | `dokumen/cetak/*.html` (+ `cetak.css` yang mengimpor tokens, `dokumen.js`: `terbilang`, `kalimatRupiah`, `rupiah`, `tanggalIndonesia`, `pasangSegel`, `hitung`) | `dokumen/contoh/*.pdf` atau `--keluar` | Selalu gagal kalau isi keluar `.halaman`/`.slide`; `--final` juga menolak `.ganti` |
| **Office** `build:office` | `scripts/dokumen/word.cjs` (docx), `rapikan_docx.py`, `slide.cjs` + `tema_pptx.cjs` (pptxgenjs + JSZip), `sheet.py` (openpyxl) + `dokumen/office/aset/*.png` | `FUSIONIFY-Surat.docx`, `-Dokumen.docx`, `-Perjanjian.docx`, `-Slide.pptx`, `-Spreadsheet.xlsx` | Butuh Python |
| **Grafis PNG** `build-grafis.mjs` | `grafis/{post,potret,story,og,banner}.html` + `grafis.css`/`grafis.js` (`data-isi`, `data-isi-src`, `data-isi-status`, `window.__ISI`, `?panduan`) + `--isi JSON`, `--kanvas`, `--keluar`, `--skala` | `grafis/contoh/*.png` (13 kanvas: post-kabar/tips/pemberitahuan/tagline, potret-acara, story-kabar/tips, og-perusahaan/produk/artikel/dokumentasi, banner-x/in) | Gagal kalau teks keluar kanvas, tertutup maskot, gambar rusak, atau huruf belum termuat |
| **Email** `build-email.mjs` | `email/fy-email.js` (`renderEmail`, `tandaTangan`, `esc`, `FUSIONIFY`) + `email/templates.js` (`kodeVerifikasi`, `aturUlangPassword`, `selamatDatang`, `pengajuanDisetujui`, `pengajuanDitolak`, `pembayaranBerhasil`, `pembayaranGagal`, `statusPenarikan`, `pemberitahuan`) | `email/contoh/*.html` + `*.txt` (10 pasang) | Warna email ditulis ulang manual di `fy-email.js:28-33` (bukan dari tokens.css) |
| **Konteks AI** `build-konteks.mjs` | AGENTS.md, DESIGN.md, 6 CSS, seal.js, theme.js, app.js, 3 snippet | `FUSIONIFY-UI-KONTEKS.md` (±267 KB) | motion.js dan controls.js tidak disalin, hanya catatan. Dicek di CI. Sekarang identik dengan hasil regenerate |

Daftar 136 ikon per kategori (dari `ikon/ikon.json`):
- **navigasi (19)**: beranda, cari, chevron-atas, chevron-bawah, chevron-kanan, chevron-kiri, jelajah, kembali, lainnya, layar-penuh, maju, menu, naik, pegangan, perbesar, perkecil, tautan-luar, turun, tutup
- **aksi (27)**: arsip, atur, bagikan, cetak, coret, daftar, daftar-angka, edit, filter, hapus, keluar, kilau, kurang, masuk, miring, perbaiki, rotasi, salin, segarkan, setelan, simpan, tambah, tebal, tukar, unduh, unggah, urut
- **status (20)**: awas, bantuan, berhasil, bintang, buka-kunci, bulat, cek, dibaca, galat, info, jam, kalender, kunci, larang, lihat, lonceng, memuat, peringatan, sembunyi, suka
- **komunikasi (13)**: email, kirim, kotak-masuk, kutipan, lampiran, lokasi, pengumuman, pesan, ponsel, tanda-tangan, tautan, telepon, web
- **dasbor (23)**: aktivitas, dasbor, dompet, grafik-batang, grafik-donat, grafik-tren, gudang, kartu, keranjang, kerja, label, laporan, paket, pengguna, qr, struk, tambah-pengguna, target, tiket, tim, toko, truk, uang
- **data (21)**: awan, bot, database, dokumen, folder, gambar, ide, kode, kunci-api, layar, memori, penyimpanan, perisai, petir, prosesor, server, sinyal, sinyal-putus, terminal, uji, vpn
- **tema (8)**: berhenti, gelap, jeda, kamera, putar, senyap, suara, terang
- **khas (5)**: fusi, maskot, progres, segel, titik-i
- **sosmed (13)**: discord, facebook, github, google-play, instagram, linkedin, shopee, telegram, threads, tiktok, whatsapp, x, youtube

---

## 7. Uji (`tests/`, `npm test`)

Runner `tests/run.mjs`: server statis di port acak, jalankan tiap `tests/*.mjs` (kecuali `_*` dan run) dengan `FY_BASE`; lulus bila exit 0, tidak ada `N FAIL`, dan untuk uji audit keluarannya `NO ISSUES`/`MOBILE OK`. GSAP/Lenis dari CDN dialihkan ke `node_modules` lewat `page.route`.

| File | Yang diuji |
| --- | --- |
| `tata-letak-dan-kontras.mjs` | 23 halaman × 8 ukuran × terang/gelap: scroll samping, `data-reveal` macet, `<img>` tanpa width/height, respons ≥400, error JS. axe WCAG 2 A/AA di 1440 dan 390 (setelah reveal dipaksa tampil) |
| `tanpa-js-dan-kurangi-gerak.mjs` | 17 halaman × 8 ukuran: scroll samping, teks terpotong, gambar rusak; tanpa JS (390px) dan reduced motion (1440px: tidak ada Lenis/kursor, konten tampil) |
| `layar-sentuh.mjs` | 10 halaman × 360/375/390/430, terang/gelap, `hasTouch`: target sentuh ≥24px, scroll samping; Lenis tidak dibuat di layar sentuh, menu mengunci scroll, Lenis dibuat di desktop |
| `interaksi-kontrol.mjs` | dropdown, modal, sheet, tab, picker, carousel, slider, dll. (admin, app-mobile, komponen) |
| `interaksi-masuk.mjs` | validasi form auth, meter password, keadaan selesai |
| `interaksi-otp-upload.mjs` | OTP, kirim ulang, upload, snackbar |
| `interaksi-chat-acara.mjs` | chat (buka/tutup, kirim), acara (sheet, .ics) |
| `interaksi-stepper-tabel-notif.mjs` | wizard, tabel urut, pusat notifikasi |
| `interaksi-crop-keadaan.mjs` | pemotong foto, `.state`, halaman status |
| `interaksi-halaman-produk.mjs` | bayar QRIS (`?status=`), dokumentasi, legal |
| `interaksi-toko-dan-navigasi.mjs` | komponen 1.13 (33 pemeriksaan) |
| `interaksi-lisensi-domain.mjs` | domain resmi + subdomain jalan, domain lain tidak menjalankan interaksi tapi konten terbaca |
| `ikon.mjs` | turunan sinkron dengan sumber, kisi aman, titik i, sosmed lengkap, PNG email, katalog ikon |
| `react.mjs` | TypeScript strict, markup render memakai kelas kit, variabel preset Tailwind ada di tokens.css |
| `dokumen.mjs` | `dokumen.js` (terbilang, Rupiah, total), tidak ada isi keluar halaman, jumlah halaman PDF, huruf/gambar, template Office |
| `email.mjs` | render semua template, escape, tanpa SVG/WebP, gambar ber-ukuran, < 102 KB, teks polos, tanpa scroll samping di HP |
| `grafis.mjs` | semua kanvas jadi PNG ukuran platform, `--isi` mengganti teks |
| `token.mjs` (1.14.0) | tanpa browser: dua blok gelap identik, tanpa hex di CSS komponen, setiap `var()` terdefinisi, warna `email/fy-email.js` sama dengan token |
| `interaksi-kursor-menu-tema.mjs` (1.14.0) | kursor dengan mouse (demo, landing): cincin garis, scale 0,63 → 1, hanya transisi `scale`; bingkai foto tim 110% tanpa conic; progres `.ring` tetap 64px conic; menu HP 375/390/820 (lingkaran di tengah tombol menu, menutup layar, menunggu animasi saat menutup); nav kapsul `::before`; tema gelap lewat tombol + kontras axe di 8 halaman × 2 lebar |

Ukuran layar: tata-letak dan tanpa-js memakai 375×667, 390×844, 768×1024, 820×1180, 1024×768, 1366×768, 1440×900, 1920×1080 (sesuai AGENTS). Layar sentuh 360×740, 375×667, 390×844, 430×932.

Halaman terdaftar di `tests/tata-letak-dan-kontras.mjs` (23, **semua template + demo sudah masuk**): demo/index, landing-produk, 404, auth/masuk, auth/daftar, auth/lupa-password, auth/atur-ulang-password, dashboard, admin, komponen, app-mobile, chat, acara, auth/verifikasi, 500, offline, maintenance, bayar-qris, status, dokumentasi, legal/privasi, legal/syarat, ikon.

Celah cakupan (diperbarui 1.14.0):
- `tanpa-js-dan-kurangi-gerak.mjs` kini 23 halaman (semua template + demo).
- `layar-sentuh.mjs` kini 20 halaman; yang belum: demo, legal/syarat, ikon (halaman developer).
- `grafis/*.html` dan `dokumen/cetak/*.html` hanya diuji oleh uji khususnya (tidak diuji kontras axe).
- Tema manual (tombol) diuji kontras di 8 halaman (`interaksi-kursor-menu-tema.mjs`); kesamaan dua blok gelap diuji `token.mjs`.
- Tata-letak tidak memeriksa teks bertabrakan (AGENTS mewajibkan); hanya tanpa-js yang memeriksa teks terpotong.
- Kursor diuji dengan mouse di `interaksi-kursor-menu-tema.mjs`.

---

## 8. Temuan

### 8.0 Status perbaikan (1.14.0, 31 Oktober 2026)

Selesai: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 (dua blok tetap ditulis, tapi dicek identik di `build-tokens.mjs` dan `tests/token.mjs`), 11, 12 (dipertahankan dengan alasan, dicatat di AGENTS bagian Halaman aplikasi), 13, 14, 15, 17, 18, 19, 20, 22 (`tests/token.mjs` membandingkan warna email dengan token), 23, 24, 25.
Sisa: **16** (komponen hero belum dibuat, menunggu keputusan desain), **21** (PNG ikon email belum dipakai `fy-email.js`; rencana: tambahkan blok `{ ikon: "nama" }` di `renderEmail` saat ada kebutuhan nyata, karena mengubah tata letak email semua produk), **26** (informasi, sengaja dibiarkan). Catatan untuk 4: transisi warna `background`/`color` 0,2 dtk pada tab, tautan nav, chip, dll. masih ada (hanya cat ulang, bukan tata letak), begitu juga `.theme-switching` yang sengaja.

Nomor baris di bawah mengacu ke 1.13.0. Lokasi penting setelah 1.14.0: `components.css` `.nav` `:57`, `.drawer` `:102`, `.person .ph .ring` `:187`, `.fcols .fname` `:257`, `.cursor .ring` `:292`, `.idle` `:325`; `controls.css` `.btn.danger` `:39`, `.progress` `:52`, `.ring:where(...)` `:356`; `motion.js` stub `:117`, `initFusionify` `:119`; `app.js` jeda `.idle` `:164`; `controls.js` `esc` `:53`, `TEKS` `:58`, `icsDate` `:776`, `lightbox(src)` `:1249`.

Lokasi `file:baris`. Tingkat: **tinggi** (rusak terlihat / melanggar aturan inti), **sedang**, **rendah**.

### 8.1 Tinggi

1. **Kelas `.ring` bentrok: kursor segel dan bingkai foto tim rusak.** `css/controls.css:353-354` mendefinisikan `.ring` global (progres lingkaran: `width/height: var(--s)=64px`, `background: conic-gradient(...)`, `border-radius: 50%`, `::before` lingkaran `var(--card)`). Kelas yang sama dipakai `.cursor .ring` (`snippets/body-parts.html`, `css/components.css:269`) dan `.person .ph .ring` (`components.css:170`). Karena `fusionify.css` memuat controls.css, keduanya ikut mewarisi latar conic + piringan putih. Terbukti dengan Playwright di `demo/index.html` dan `templates/landing-produk.html` (1366×768, mouse digerakkan): `.cursor .ring` punya `background-image: conic-gradient(rgb(13,108,215) 0deg, rgb(220,236,255) 0deg)` dan `::before` putih; tangkapan layar menunjukkan kursor jadi cakram biru muda berisi, bukan cincin garis. `.person .ph .ring` jadi 64px (bukan mengikuti `inset:-5%`) dengan latar conic. Perbaikan: ganti nama progres jadi mis. `.ring-progress` (perubahan kelas = versi X menurut aturan kit) atau batasi `.ring` ke elemen non-kursor, lalu tambah uji visual kursor.

### 8.2 Sedang

2. **Chevron `.select` tidak terbaca di mode gelap.** `css/product.css:20` memakai data-URI dengan `stroke='%230b0f1a'` (tinta terang). Tidak ada penimpaan di blok gelap (dicek dengan grep), jadi panah #0b0f1a di atas `--card` #10203f. Perbaikan: pakai `mask` + `background-color: currentColor`, atau tambahkan data-URI versi `#eaf3ff` di blok gelap.
3. **`initFusionify()` mengembalikan `undefined` di domain tak berlisensi** (`js/motion.js:115`), sedangkan `initApp()` mengembalikan stub (`js/app.js:26`). README dan `templates/ikon.html:336-357` memakai `const fy = initFusionify(); fy.toast(...)`, sehingga di domain lain klik salin melempar `TypeError` (di dalam `catch` yang memanggil `fy.toast` lagi). Samakan dengan stub.
4. **Animasi properti selain transform/opacity** (AGENTS: "Hanya animasikan transform dan opacity"):
   - `components.css:269` `.cursor .ring` transisi `width`, `height`, `margin` setiap hover tautan (layout + paint).
   - `components.css:97` `.drawer` transisi `clip-path` (0,7 dtk, layar penuh).
   - `components.css:61` `.nav` transisi `padding`, `top`, `box-shadow`.
   - Transisi `box-shadow` pada hover: `components.css:15` (`.btn`), `:131` (`a.card`), `product.css:17` (`.input`), `:50` (`a.svc`), `:508` (`.product-card`), `app.css:51` (`.search input`), `controls.css:100, 131, 734`.
   - `base.css:66` `.theme-switching` (warna + box-shadow, hanya 0,3 dtk saat ganti tema; disengaja, tetap tercatat).
   Semua keyframes sudah patuh (hanya transform/opacity).
5. **Hex di luar token** (AGENTS kit: "Jangan menulis warna hex … baru"):
   - Merah tanpa token: `controls.css:39` `.btn.danger` `#c4323a`, `controls.css:60` `.badge` `#c4323a`, `app.css:58` `.dot-badge` `#e5484d` (seharusnya `--danger`, yang punya pasangan gelap).
   - Kuning/oranye tanpa token: `controls.css:54` `.progress.warn` dan `app.css:226` `.pw-meter` level 2 `#e8a33d`.
   - Lain: `app.css:116` `#7cc0ff`, `app.css:266` `.online` `#2fbf63`, `controls.css:797` `#e8f1ff`, `app.css:22` `#0261cd`, `app.css:298` `#3a4458`, `product.css:77` `#0d6cd7`, footer `components.css:229-238` (`#dbe9fb #9fb3cd #1d2b45 #8296b2 #b9cbe3 #2a3b5c`), blok kode `product.css:372-381` (palet gelap disalin sebagai hex, bukan token).
   - `#fff` sebagai latar (AGENTS: `#fff` hanya untuk teks/ikon di atas biru): `app.css:22` (`.count` aktif), `app.css:184` (kenop switch aktif), `app.css:295` (`.msg.me .msg-card`), `components.css:216`, `:336`, `product.css:30, 77, 96`. Sebagian di atas biru (wajar), tapi `app.css:295` dan `components.css:336` tidak ikut tema.
   - Template: footer di 404/500/maintenance/offline/landing/legal/dokumentasi/status/ikon memakai `style="…color:#fff…"` untuk teks "Nama Produk" (mis. `templates/404.html:78`); `templates/app-mobile.html:42, 44` (`#fff`); `templates/dashboard.html:100` stop gradien `#539de9`.
6. **Komponen ditulis di file yang berbeda dari daftar AGENTS.** AGENTS baris tabel `css/app.css` menyebut `.progress` dan `.btn.danger`, padahal keduanya ada di `controls.css:52-54` dan `:39`. `app.css:132-135` menyisakan judul seksi "PROGRESS" yang kosong. Perbarui AGENTS (dan KONTEKS ikut lewat regenerate).
7. **Celah uji** (lihat 7): bayar-qris tidak diuji layar sentuh; 6 halaman tidak diuji tanpa-JS/kurangi gerak; tema manual tidak diuji; tidak ada uji kursor.
8. **Halaman aplikasi tidak menjeda animasi tanpa henti.** `initApp()` tidak memasang `IntersectionObserver` `.idle` (bandingkan `motion.js:357-360`), padahal `.spinner`, `.skel::after`, `.progress.indeterminate`, `.typing i` berjalan `infinite`. AGENTS bagian Performa mewajibkan jeda di luar layar.

### 8.3 Rendah

9. **Ketergantungan terbalik `--seal-mask`.** Didefinisikan di `product.css:53`, tapi dipakai `components.css:324` (`.ikon-segel`) dan `controls.css:334` (`.spinner::before`). Memuat components.css tanpa product.css membuat segel hilang. Pindahkan ke tokens.css atau components.css.
10. **Duplikasi blok gelap** `tokens.css:91-106` dan `:108-123` (identik sekarang). Mudah tidak sinkron; `build-tokens.mjs` hanya membaca blok `[data-theme="dark"]`.
11. **Dua implementasi validasi**: `app.js:76-83` (`msg`) tidak mengenal `patternMismatch`/`rangeUnderflow` yang dikenal `controls.js:787-796` (`fieldMsg`). Form `data-validate` dengan `pattern` lolos tanpa pesan.
12. **Error kolom kosong tidak muncul saat blur** (`app.js:106` melewati blur bila `!f.value`). AGENTS: "pesan error muncul saat kirim atau saat meninggalkan kolom". Kolom wajib yang dilewati kosong baru diberi tahu saat kirim. Mungkin disengaja; dokumentasikan.
13. **Teks antarmuka di JS tidak bisa dilokalkan**: `controls.js:52` (`sbLabels` "Tutup", tanpa setter), lightbox `controls.js:1219-1222` ("Galeri foto", "Tutup galeri", "Foto sebelumnya"), `initShare` `:777` ("Salin tautan ini"), `initTenggat` `:1301` ("Sisa … hari … jam"). Bertentangan dengan aturan bilingual untuk web produk ber-`/en/`. Picker dan OTP sudah punya `data-label-*`.
14. **`initIcs` melempar `RangeError`** bila `data-start` kosong (`controls.js:755`, `new Date(undefined).toISOString()`).
15. **Nilai atribut disisipkan mentah ke `innerHTML`**: label picker (`controls.js:198` dkk.), titik carousel (`:1465`, `aria-label` dari atribut). Hanya dari markup penulis, tapi tanda kutip di label merusak markup.
16. **Pola hero belum jadi komponen**: DESIGN "Hero dua kolom mulai 700px; di bawahnya maskot di atas teks" diimplementasikan ulang inline di `demo/index.html:25-29` (`.hero-demo`) dan `templates/landing-produk.html` (`.p-hero`). Tidak ada kelas hero di CSS kit.
17. **Teks Inggris di halaman Indonesia**: "Login admin dari …" / "Login admin gagal 3 kali" (`templates/admin.html:67, 161`), "Login dari" (`dashboard.html:129`); judul katalog "Upload", "Loading", "Search bar dengan saran" (`komponen.html:82, 276, 312, 411`; halaman developer, tapi tetap). Em dash: **tidak ditemukan** di template, demo, grafis, dokumen, email, React, JS.
18. **DESIGN.md menulis bagian yang sama dua kali** (`DESIGN.md:139-145`: Kode OTP, Upload, Chat, Halaman/Detail acara masing-masing dua kali dengan kalimat berbeda). KONTEKS ikut membawa duplikasi.
19. **`package.json` `exports`** tidak memuat `./react/lucide`, `./react/tailwind-v4.css`, `./js/ikon-inline`, `./js/seal.d.ts`; impor lewat nama paket akan gagal (impor relatif tetap jalan).
20. **Preset Tailwind tanpa `--bintang`** (`react/tailwind-preset.js`, `react/tailwind-v4.css`), padahal token ditambah di 1.13. `--surface-2`, `--inverse-accent`, `--placeholder`, `--seal-tint`, `--hero-glow` juga tidak dipetakan.
21. **`ikon/png/*.png` (17 file) tidak dipakai** `email/fy-email.js` (tidak ada referensi `ikon-` atau `sosmed-`). Diuji keberadaannya (`tests/ikon.mjs:29-32`) tapi belum terhubung ke template email.
22. **Warna email disalin manual** (`email/fy-email.js:28-33`), tidak dibuat dari tokens.css; kalau token berubah, email tertinggal tanpa peringatan CI.
23. **THIRD_PARTY_NOTICES** tidak mencatat Playwright (Apache-2.0), axe-core (MPL-2.0, disuntik ke halaman saat uji), dan Pillow (`scripts/mascot-import.py`). Semuanya dev, tapi AGENTS minta setiap dependensi baru dicatat.
24. **README basi kecil**: contoh versi masih `v1.6.1`/`v1.7.0` (`README.md` bagian Versi); daftar `scripts/` tidak menyebut `cek-orisinal-ikon.mjs` dan `scripts/dokumen/`. AGENTS tabel isi repo tidak menyebut `scripts/mascot-import.py` dan `js/seal.d.ts`.
25. **Daftar event di header `controls.js:29-30`** hanya menyebut sebagian; `fy:thread`, `fy:ics`, `fy:snackbar-action` (dan `fy:theme` dari theme.js) tidak tercantum di AGENTS.
26. **Kunci domain bersifat sisi klien** (`js/lisensi.js`): mudah dilewati dengan mengedit `DOMAIN_RESMI`. Sesuai rencana ui.fusionify.id, perlindungan nyata ada di lisensi/NDA, bukan kode. Informasi, bukan bug.

### 8.4 Yang sudah selaras (dicek)

- `package.json` 1.14.0 = CHANGELOG teratas (tag `v1.14.0` dibuat lokal).
- `FUSIONIFY-UI-KONTEKS.md` identik dengan hasil `build-konteks` sekarang; `tokens/` identik dengan hasil `build-tokens`.
- `skills/fusionify-brand-style/SKILL.md` (242 baris) sudah memuat komponen 1.13 (breadcrumb, pagination, accordion, product-card, consent, announce, timeline, countdown, rating, qty, galeri, kbd, harga, lucide), 136 ikon, penomoran `FI`. Tidak menyebut `--bintang`.
- Semua kelas yang disebut AGENTS untuk tiap file CSS ada di CSS (kecuali penempatan `.progress` dan `.btn.danger`, temuan #6).
- Semua 23 template/demo terdaftar di uji tata letak dan kontras.
- Dokumen cetak dan grafis memakai `data-theme="light"`, jadi tidak ikut gelap.
- Keyframes semuanya transform/opacity; `prefers-reduced-motion` dihormati di base, controls, app.

---

## 9. Rencana `ui.fusionify.id` (`rencana/ui-fusionify-id.md`)

- **Apa**: situs dokumentasi FUSIONIFY UI ala m3.material.io, sepenuhnya privat, plus (nanti) aplikasi desktop Electron dan Android Capacitor yang anti-screenshot.
- **Batas jujur**: di web, screenshot/rekam/inspect/extension tidak bisa dicegah. Perlindungan seperti Telegram hanya mungkin di aplikasi (`setContentProtection`, `FLAG_SECURE`). Celah sisa ditutup dengan watermark identitas + log + lisensi/NDA. Jangan pasang skrip anti-inspect/anti-klik-kanan.
- **Tiga lapis**: web `ui.fusionify.id` (login + watermark), desktop Electron, Android (iPhone opsional, hanya deteksi).
- **Akses**: peran `admin`, `tim`, `partner`; daftar email di D1; persetujuan lisensi/NDA saat login pertama. Login via **Cloudflare Access** (gratis ≤50 pengguna). Watermark disisipkan di server dari header `Cf-Access-Authenticated-User-Email`. File asli (maskot resolusi tinggi, font, vektor, kit, Office) tidak dikirim ke perangkat. Log akses + batas laju anti-scraping.
- **Isi**: Beranda, Mulai pakai, Fondasi, Gerak, Maskot, Komponen (satu halaman per komponen), Pola, Aplikasi HP, Dokumen, Email, Grafis, Konten & bahasa, Versi, Unduh (admin/tim saja). Pencarian `/`, menu samping, `[data-toc]`, `data-copy`, pilih versi kit; ID dulu, EN menyusul.
- **Teknologi**: repo privat baru `FUSIONIFY-ID/fusionify-ui-situs`, kit sebagai submodule terkunci tag; Astro + vanilla CSS memakai kit itu sendiri; Cloudflare Workers + Access + D1 + R2; Electron + electron-builder; Capacitor.
- **Tahapan**: 0 persiapan → 1 situs inti → 2 isi lengkap → 3 desktop → 4 Android → 5 peluncuran; uji perlindungan wajib sebelum rilis aplikasi.
- **Status keputusan (29 Okt 2026)**: sudah diputuskan, **mulai tahap 0 dan 1**. Pengguna awal tim + partner terbatas (partner sebagian, Unduh hanya admin/tim); semua di balik login, tanpa etalase publik; aplikasi desktop, Android, dan iPhone **ditunda** sampai situs jadi; biaya code signing belum perlu; teks lisensi/NDA menunggu konsultan hukum (sementara pakai `LICENSE.md` berlabel "versi sementara"); nama tetap "FUSIONIFY UI".
- Belum ada kode untuk rencana ini di repo kit (repo situs terpisah belum terlihat di sini).
