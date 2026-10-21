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

Baca **`DESIGN.md`** sebelum mengubah tampilan apa pun. Lihat **`demo/index.html`** untuk contoh markup setiap komponen.

## Isi repo

| Path | Isi |
| --- | --- |
| `css/tokens.css` | Warna, huruf (@font-face), radius, kurva gerak, bayangan |
| `css/base.css` | Reset, tipografi, `.wrap`, `.kicker`, `.h-hero`, `.h-sec`, `.lead`, `.prose` |
| `css/components.css` | Tombol, chip status, nav, menu HP, seksi, kartu stiker, statistik, kartu karya, foto bersegel, gelembung maskot, panggung maskot, marquee partner, FAQ, gelombang, footer, toast, kursor, transisi halaman, status reveal, jeda `.idle` |
| `css/product.css` | Komponen web produk: form (`.field`, `.input`, `.select`, `.textarea`, `.check`, `.form-grid`), kartu layanan `.svc`, daftar fitur `.ticks`, langkah `.steps`, harga `.plans`/`.plan` (`.featured`, `.ribbon`), testimoni `.quote`, ajakan `.cta-band`, catatan `.note` (`ok`, `warn`, `danger`), tabel `.table-wrap`/`.table`, tag `.tags`/`.tag`, keadaan kosong/404 `.empty`, `.prod-head`, tab segmen `.segment` |
| `css/fusionify.css` | Satu file yang mengimpor semuanya |
| `js/motion.js` | `initFusionify()`: smooth scroll, nav, menu HP, kursor, reveal, angka, magnet, salin + toast, transisi halaman, suara, jeda di luar layar |
| `js/seal.js` | `seal()` dan `SEAL_PATH`: bentuk segel 12 lekukan |
| `snippets/head-script.html` | Skrip kecil wajib di `<head>` |
| `snippets/sprite.html` | Sprite SVG (clip-path segel, simbol segel) setelah `<body>` |
| `snippets/body-parts.html` | Kursor, toast, tirai transisi sebelum `</body>` |
| `fonts/` | Afacad Flux, Sansation, Caveat, Exo 2 (woff2, OFL) |
| `brand/` | Segel Fi, wordmark (SVG), emblem; `brand/kit/` logo horizontal, vertikal, legacy |
| `mascot/` | Maskot badan penuh, kepala, papan, stiker bot |
| `badge/` | Badge "Sebuah produk dari FUSIONIFY" (ID/EN, terang/gelap) |
| `demo/index.html` | Halaman contoh semua komponen |
| `FUSIONIFY-UI-KONTEKS.md` | Semua aturan + CSS dalam satu file, untuk di-upload ke AI versi chat web. Buat ulang dengan `node scripts/build-konteks.mjs` setiap ada perubahan |
| `CLAUDE.md`, `GEMINI.md`, `QWEN.md`, `.gemini/`, `.qwen/`, `.cursor/rules/`, `.github/copilot-instructions.md`, `.aider.conf.yml` | Penunjuk ke file ini untuk masing-masing AI agent |
| `templates/landing-produk.html` | Template landing web produk lengkap. Ganti bagian bertanda `GANTI` |
| `templates/404.html` | Template halaman tidak ditemukan dengan maskot confused |

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
- **Maskot**: ganti ekspresi dengan menukar gambar badan penuh. Jangan menempel kepala di badan lain.
- Hiasan SVG yang sengaja lebih besar dari wadahnya wajib kelas `.fx-oversize` (atau `max-width: none`).
- Gaya stiker: garis 2px `--ink`, bayangan pejal ke bawah, sudut besar.
- Jangan menyalin momen khas fusionify.id (segel menutup hero, footer malam Bogor) apa adanya ke web produk. Rakit momen sendiri dari bagian yang sama.

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
- Dengan Lenis, pakai `scrub` kecil (sekitar 0.3) dan jangan pakai `anticipatePin`.
- Untuk efek membesar (segel menutup layar), perbesar SVG berukuran sedang (sekitar 400px) dengan `transform: scale`; jangan menggambar SVG raksasa.
- Font di-host sendiri, gambar WebP dengan `width`/`height`, inisialisasi yang tidak perlu saat awal dijalankan saat browser senggang.
- Target PageSpeed Insights mobile: Aksesibilitas, Praktik Terbaik, SEO = 100.

## QA (wajib sebelum selesai)

Cek di **HP** 375×667 dan 390×844, **tablet** 768×1024, 820×1180, 1024×768, **desktop** 1366×768, 1440×900, 1920×1080.

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

## Menjaga kit tetap sinkron

fusionify.id (repo `FUSIONIFY-ID/FUSIONIFY`) adalah sumber kebenaran. Kalau token, komponen, atau aturan di sana berubah, perbarui kit ini di commit yang sama atau sesudahnya, lalu catat di `CHANGELOG.md`.

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
4. **Tegas seperti stiker.** Garis tepi 2px warna tinta, bayangan pejal ke bawah, sudut bulat besar.

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
- **Gaya stiker**: `.card`, `.stat`, `.btn`, `.toast` semuanya bergaris 2px tinta dengan bayangan pejal ke bawah.

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
| glasses | layanan profesional, halaman kosong |

- Ganti ekspresi dengan **menukar gambar badan penuh**. Jangan menempel kepala di atas badan lain karena wajah lama ikut terlihat.
- Gelembung bicara (`.bubble`, Caveat) tidak boleh menutupi wajah, rambut, atau judul.
- Stiker (order, proses, done, batal) hanya untuk obrolan bot.
- Tampil kecil: pakai `-420.webp` / `-120.webp` dengan `srcset`. Semua `<img>` wajib `width` dan `height`.

## Gerak (`js/motion.js`)

- Smooth scroll Lenis (`lerp 0.1`).
- Nav transparan di atas, berubah jadi kapsul putih blur setelah scroll >24px, sembunyi saat scroll turun, muncul saat scroll naik.
- Menu HP: lingkaran biru membesar dari tombol menu.
- Muncul saat scroll: judul naik per kata (`data-split`), elemen naik dan memudar masuk (`data-reveal`), kartu "dirakit" dari posisi acak (`data-assemble`), angka naik (`data-count-to`).
- Kursor: titik biru muda + cincin segel; membesar dan berputar di atas tautan; label tulisan tangan lewat `data-cursor-label`. Hanya di perangkat bermouse.
- Efek magnet pada tautan kontak besar (`data-magnetic`).
- Tombol salin (`data-copy`) dengan notifikasi maskot (toast, hilang setelah 2,6 detik).
- Transisi halaman: segel biru membesar menutup layar, kepala mengedip, lalu menyusut di halaman baru.
- Suara disintesis Web Audio, **mati secara bawaan**, dinyalakan lewat tombol speaker.

## Layout

- Lebar konten maksimal 1240px (`.wrap`) dengan gutter `clamp(16px, 4vw, 48px)`.
- Grid tanpa kartu yatim: 3 kolom di desktop, 2 di tablet (kartu terakhir yang sendirian dibuat lebar penuh), 1 di HP.
- Hero dua kolom mulai 700px; di bawahnya maskot di atas teks.
- Nav lengkap mulai 961px; di bawahnya tombol menu.
- Cover karya/produk rasio 1600:848, screenshot asli. Ilustrasi wajib diberi label `.cover-note` "Ilustrasi".
- Di layar sentuh: magnet, kursor khusus, dan parallax dimatikan.

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
  --gut: clamp(16px, 4vw, 48px);
  --max: 1240px;

  /* Gerak */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Bayangan */
  --shadow: 0 1px 0 rgba(13, 108, 215, 0.06), 0 12px 32px -14px rgba(11, 15, 26, 0.18);
  --shadow-pop: 0 3px 0 var(--ink);      /* tombol */
  --shadow-sticker: 0 6px 0 var(--ink);  /* kartu bergaya stiker */

  color-scheme: light;
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
.skip { position: fixed; left: 12px; top: -60px; z-index: 200; background: var(--ink); color: #fff; padding: 10px 14px; border-radius: 10px; text-decoration: none; }
.skip:focus { top: 12px; }
.nowrap { white-space: nowrap; }

.num { font-family: var(--f-num); font-variant-numeric: tabular-nums; }
.hand { font-family: var(--f-hand); font-weight: 600; }

/* Label kecil di atas judul seksi, dengan titik biru muda */
.kicker {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--f-num); font-size: 13px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--blue);
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
.prose a { color: var(--blue-deep); overflow-wrap: anywhere; }

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
  padding: 14px 22px; border-radius: 999px; border: 2px solid var(--ink);
  background: var(--bg); color: var(--fg); text-decoration: none; font-weight: 700; font-size: 16px;
  box-shadow: var(--shadow-pop); cursor: pointer;
  transition: transform 0.35s var(--spring), box-shadow 0.35s var(--spring), background 0.2s;
}
.btn:hover { transform: translateY(-3px); box-shadow: 0 6px 0 var(--ink); }
.btn:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--ink); }
.btn.ghost { --bg: #fff; --fg: var(--ink); }
.btn.sm { padding: 10px 18px; font-size: 15px; }
.btn svg { width: 18px; height: 18px; }

/* Tombol ikon bulat (suara, menu) */
.icon-btn { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; background: var(--surface); border: 0; cursor: pointer; transition: transform 0.3s var(--spring), background 0.2s; }
.icon-btn:hover { transform: scale(1.08); background: #dcecff; }
.icon-btn svg { width: 20px; height: 20px; }

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
  background: rgba(255, 255, 255, 0.82); backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4);
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
.nav-links a:hover, .nav-links a[aria-current="true"], .nav-links a[aria-current="page"] { background: var(--surface); color: var(--blue-deep); }
.nav-tools { display: flex; align-items: center; gap: 6px; }
.nav .btn { padding: 10px 18px; font-size: 15px; }
.lang { display: inline-flex; align-items: center; gap: 4px; height: 42px; font-family: var(--f-num); font-size: 13px; text-decoration: none; padding: 0 14px; border-radius: 999px; background: var(--surface); color: var(--ink-3); transition: background 0.2s; }
.lang:hover { background: #dcecff; }
.lang b { font-weight: 600; } .lang b.on { color: var(--blue-deep); font-weight: 800; } .lang i { font-style: normal; opacity: 0.4; }
.sound-btn { color: var(--ink-3); }
.sound-btn .w1, .sound-btn .w2 { opacity: 0; transition: opacity 0.2s; }
.sound-btn[aria-pressed="true"] { color: var(--blue); }
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
.page-hero { padding: 150px 0 60px; background: radial-gradient(120% 80% at 80% 0%, #dcedff 0%, var(--paper) 60%); }
.page-hero h1 { font-size: clamp(48px, 8vw, 110px); margin: 16px 0 20px; }
.crumbs { display: flex; gap: 8px; font-size: 14px; color: var(--ink-3); }
.crumbs a { color: var(--blue-deep); }

/* =========================================================
   KARTU STIKER · garis 2px tinta, bayangan pejal, sudut besar
   ========================================================= */
.card { position: relative; padding: 26px; border-radius: var(--r-l); background: #fff; color: var(--ink); border: 2px solid var(--ink); box-shadow: var(--shadow-sticker); }
.card.blue { background: var(--blue); color: #fff; }
.card.tint { background: var(--surface); }
.card h3 { font-size: 26px; margin-bottom: 6px; }
.card p { font-size: 15px; color: var(--ink-2); }
.card.blue p { color: #f2f8ff; }
a.card { text-decoration: none; transition: transform 0.35s var(--spring), box-shadow 0.35s var(--spring); }
a.card:hover { transform: translateY(-4px); box-shadow: 0 10px 0 var(--ink); }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
@media (max-width: 1000px) { .grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } .grid-3 > :last-child:nth-child(odd) { grid-column: 1 / -1; } }
@media (max-width: 620px) { .grid-3, .grid-2 { grid-template-columns: 1fr; } }

/* Angka besar (hanya angka yang bisa dibuktikan) */
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.stat { position: relative; padding: 26px; border-radius: var(--r-l); background: #fff; color: var(--ink); border: 2px solid var(--ink); box-shadow: var(--shadow-sticker); min-height: 230px; display: grid; align-content: space-between; gap: 18px; overflow: hidden; }
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
.work .cover { position: relative; border-radius: var(--r-l); overflow: hidden; border: 2px solid var(--ink); aspect-ratio: 1600 / 848; background: var(--surface); }
.work .cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.9s var(--ease); }
.work:hover .cover img { transform: scale(1.06); }
.work .meta { display: flex; justify-content: space-between; gap: 12px; align-items: flex-end; }
.work .meta .chip { margin-bottom: 8px; }
.work h3 { font-size: clamp(26px, 2.4vw, 34px); margin-bottom: 4px; }
.work .cat { color: var(--ink-3); font-size: 14.5px; }
.work .arrow { width: 40px; height: 40px; flex: none; border-radius: 50%; border: 2px solid var(--ink); display: grid; place-items: center; transition: transform 0.4s var(--spring), background 0.2s; }
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
  background: #fff; border: 2px solid var(--ink); border-radius: 22px; padding: 10px 16px 12px;
  font-family: var(--f-hand); font-weight: 600; font-size: 25px; line-height: 1.05; color: var(--ink); box-shadow: var(--shadow-pop);
  transform-origin: 90% 100%;
}
.bubble::after { content: ""; position: absolute; right: 26px; bottom: -11px; width: 18px; height: 18px; background: #fff; border-right: 2px solid var(--ink); border-bottom: 2px solid var(--ink); transform: rotate(45deg) skew(8deg, 8deg); }
.bubble.left::after { right: auto; left: 22px; }
.bubble.pop { animation: fy-pop 0.45s var(--spring); }
@keyframes fy-pop { 0% { transform: scale(0.6) rotate(-6deg); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.mascot-stage { position: relative; width: min(100%, 420px); aspect-ratio: 1; display: grid; place-items: end center; }
.mascot-stage .seal-bg { position: absolute; inset: 4% -4% 8%; color: #d8eaff; animation: fy-spin 40s linear infinite; max-width: none; }
.mascot-stage .seal-ring { position: absolute; inset: -2% -10% 2%; color: transparent; stroke: var(--blue-light); opacity: 0.5; animation: fy-spin 60s linear infinite reverse; max-width: none; }
.mascot-stage .body { position: relative; width: 78%; animation: fy-bob 4.2s ease-in-out infinite; transform-origin: 50% 100%; }
@keyframes fy-spin { to { transform: rotate(360deg); } }
@keyframes fy-bob { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-10px) rotate(-1deg); } }

/* =========================================================
   PARTNER BERJALAN, FAQ
   ========================================================= */
.marquee { overflow: hidden; border-block: 2px solid var(--ink); background: #fff; padding: 22px 0; }
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
.faq summary .pm::before, .faq summary .pm::after { content: ""; position: absolute; left: 50%; top: 50%; width: 14px; height: 2.5px; margin: -1.25px 0 0 -7px; background: var(--blue-deep); border-radius: 2px; }
.faq summary .pm::after { transform: rotate(90deg); transition: transform 0.3s var(--ease); }
.faq details[open] summary .pm { background: var(--blue); transform: rotate(180deg); }
.faq details[open] summary .pm::before, .faq details[open] summary .pm::after { background: #fff; }
.faq details[open] summary .pm::after { transform: rotate(0); }
.faq .ans { padding: 0 0 24px; color: var(--ink-2); max-width: 70ch; }

/* =========================================================
   PEMBATAS GELOMBANG · antar seksi berwarna beda
   ========================================================= */
.wave { position: relative; z-index: 2; height: 90px; margin: -1px 0; color: var(--blue); overflow-x: clip; }
.wave svg { position: absolute; inset: 0; width: 100%; height: 100%; }

/* =========================================================
   FOOTER SEDERHANA (untuk web produk). Footer adegan malam Bogor khusus fusionify.id.
   ========================================================= */
.footer { background: var(--night); color: #dbe9fb; padding: 56px 0 28px; }
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
.to-top:hover { background: var(--blue); border-color: var(--blue); color: #fff; }
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
  padding: 8px 18px 8px 8px; border-radius: 999px; background: #fff; border: 2px solid var(--ink); box-shadow: 0 4px 0 var(--ink);
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
.cursor .ring svg { width: 100%; height: 100%; overflow: visible; color: var(--blue); }
.cursor .ring svg path { fill: none; stroke: currentColor; stroke-width: 1.6; vector-effect: non-scaling-stroke; transition: fill 0.3s; }
.cursor.link .ring { width: 70px; height: 70px; margin: -35px 0 0 -35px; }
.cursor.link .ring svg { animation: fy-spin 4s linear infinite; }
.cursor.link .ring svg path { fill: rgba(83, 157, 233, 0.18); }
.cursor .label { position: absolute; left: 0; top: 0; will-change: translate; padding: 4px 10px; border-radius: 999px; background: var(--ink); color: #fff; font-family: var(--f-hand); font-size: 20px; line-height: 1; white-space: nowrap; transform: scale(0); transform-origin: 0 0; transition: transform 0.3s var(--spring); }
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
.field .err { color: #b4232c; font-weight: 700; }
.input, .select, .textarea {
  width: 100%; font: inherit; font-size: 16px; color: var(--ink);
  padding: 13px 16px; border-radius: var(--r-m); border: 2px solid var(--ink); background: #fff;
  box-shadow: 0 3px 0 var(--ink); transition: box-shadow 0.25s var(--spring), transform 0.25s var(--spring), border-color 0.2s;
}
.textarea { min-height: 130px; resize: vertical; }
.select { appearance: none; padding-right: 44px; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230b0f1a' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") right 14px center / 18px no-repeat; }
.input::placeholder, .textarea::placeholder { color: #8a94a6; }
.input:focus, .select:focus, .textarea:focus { outline: none; border-color: var(--blue); box-shadow: 0 3px 0 var(--blue), 0 0 0 4px rgba(83, 157, 233, 0.25); }
.input[aria-invalid="true"], .textarea[aria-invalid="true"] { border-color: #b4232c; box-shadow: 0 3px 0 #b4232c; }
.input:disabled, .select:disabled, .textarea:disabled { background: var(--surface); color: var(--ink-3); box-shadow: none; }
.check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 15.5px; }
.check input { appearance: none; flex: none; width: 22px; height: 22px; margin: 1px 0 0; border: 2px solid var(--ink); border-radius: 7px; background: #fff; display: grid; place-items: center; cursor: pointer; transition: background 0.2s; }
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
.svc { position: relative; display: grid; gap: 12px; align-content: start; padding: 26px; border-radius: var(--r-l); background: #fff; color: var(--ink); border: 2px solid var(--ink); box-shadow: var(--shadow-sticker); }
.svc h3 { font-size: 26px; }
.svc p { font-size: 15.5px; color: var(--ink-2); }
.svc .more { margin-top: 6px; font-weight: 700; color: var(--blue-deep); text-decoration: none; display: inline-flex; gap: 6px; align-items: center; }
.svc .more:hover { text-decoration: underline; text-underline-offset: 4px; }
.svc-ico { position: relative; width: 58px; height: 58px; display: grid; place-items: center; color: #fff; }
.svc-ico::before { content: ""; position: absolute; inset: 0; background: var(--blue); -webkit-mask: var(--seal-mask) center / contain no-repeat; mask: var(--seal-mask) center / contain no-repeat; }
.svc-ico svg { position: relative; width: 26px; height: 26px; }
.svc:nth-child(3n+2) .svc-ico::before { background: var(--blue-light); }
.svc:nth-child(3n+3) .svc-ico::before { background: var(--ink); }
a.svc { text-decoration: none; transition: transform 0.35s var(--spring), box-shadow 0.35s var(--spring); }
a.svc:hover { transform: translateY(-4px); box-shadow: 0 10px 0 var(--ink); }
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
.sec.blue .steps li::before { background: #fff; } .sec.blue .steps .n { color: var(--blue); }
.sec.blue .steps li:not(:last-child)::after { border-color: rgba(255, 255, 255, 0.5); }
.sec.blue .steps p { color: #f2f8ff; }
@media (max-width: 720px) { .steps li:not(:last-child)::after { display: none; } }

/* =========================================================
   TABEL HARGA · paket unggulan diberi .featured
   Harga wajib harga asli. Kalau belum pasti, tulis "Hubungi kami".
   ========================================================= */
.plans { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
.plan { position: relative; display: grid; grid-template-rows: auto auto 1fr auto; gap: 18px; padding: 30px 26px 26px; border-radius: var(--r-l); background: #fff; color: var(--ink); border: 2px solid var(--ink); box-shadow: var(--shadow-sticker); }
.plan h3 { font-size: 26px; }
.plan .desc { font-size: 15px; color: var(--ink-2); margin-top: 4px; }
.plan .price { font-family: var(--f-num); font-weight: 800; font-size: clamp(36px, 4vw, 48px); line-height: 1; letter-spacing: -0.02em; }
.plan .price small { font-family: var(--f-body); font-weight: 400; font-size: 15px; color: var(--ink-3); letter-spacing: 0; }
.plan .btn { justify-content: center; }
.plan.featured { background: var(--blue); color: #fff; transform: translateY(-10px); box-shadow: 0 16px 0 var(--ink); }
.plan.featured .desc, .plan.featured .price small, .plan.featured .ticks li { color: #f2f8ff; }
.plan.featured .ticks li::before { background: #fff; }
.plan.featured .ticks li::after { border-color: var(--blue); }
.plan.featured .btn { --bg: #fff; --fg: var(--ink); }
.plan .ribbon { position: absolute; top: -16px; right: 22px; padding: 6px 14px; border-radius: 999px; border: 2px solid var(--ink); background: #fff; color: var(--ink); font-family: var(--f-hand); font-weight: 700; font-size: 20px; line-height: 1; transform: rotate(4deg); }
@media (max-width: 1000px) { .plans { grid-template-columns: repeat(2, minmax(0, 1fr)); } .plans > :last-child:nth-child(odd) { grid-column: 1 / -1; } .plan.featured { transform: none; box-shadow: var(--shadow-sticker); } }
@media (max-width: 620px) { .plans { grid-template-columns: 1fr; } }

/* =========================================================
   TESTIMONI · HANYA dengan izin tertulis dan tanggalnya
   ========================================================= */
.quote { position: relative; display: grid; gap: 18px; padding: 30px 26px 24px; border-radius: var(--r-l); background: #fff; color: var(--ink); border: 2px solid var(--ink); box-shadow: var(--shadow-sticker); }
.quote::before { content: "\201C"; position: absolute; top: -26px; left: 20px; font-family: var(--f-head); font-weight: 800; font-size: 96px; line-height: 1; color: var(--blue); }
.quote blockquote { margin: 0; font-size: 18px; line-height: 1.55; }
.quote figcaption { display: flex; align-items: center; gap: 12px; }
.quote figcaption img { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; background: var(--surface); }
.quote figcaption b { display: block; line-height: 1.2; }
.quote figcaption span { font-size: 14px; color: var(--ink-3); }

/* =========================================================
   CTA BAND · ajakan besar di akhir halaman, maskot di samping
   ========================================================= */
.cta-band { position: relative; display: grid; grid-template-columns: 1fr auto; gap: 30px; align-items: center; padding: clamp(28px, 5vw, 56px); border-radius: var(--r-l); background: var(--blue); color: #fff; border: 2px solid var(--ink); box-shadow: 0 10px 0 var(--ink); overflow: hidden; }
.cta-band h2 { font-size: clamp(34px, 4.6vw, 60px); max-width: 16ch; }
.cta-band p { color: #f2f8ff; margin-top: 12px; max-width: 46ch; }
.cta-band .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.cta-band .btn { --bg: #fff; --fg: var(--ink); }
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
.note.danger { --nc: #b4232c; background: #fde8ea; } .note.danger::before { content: "!"; }

/* =========================================================
   TABEL DATA · dibungkus .table-wrap supaya bisa digeser di HP.
   Wajib: <div class="table-wrap" tabindex="0" role="region" aria-label="..."> supaya bisa digeser pakai keyboard
   ========================================================= */
.table-wrap { overflow-x: auto; border: 2px solid var(--ink); border-radius: var(--r-l); background: #fff; box-shadow: var(--shadow-sticker); }
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
.tag { display: inline-block; padding: 4px 12px; border-radius: 999px; border: 1.5px solid var(--line); background: #fff; font-size: 13.5px; font-weight: 700; color: var(--ink-2); }
.sec.blue .tag { background: rgba(255, 255, 255, 0.12); border-color: rgba(255, 255, 255, 0.3); color: #fff; }

/* =========================================================
   KEADAAN KOSONG / 404 · maskot + pesan + aksi
   ========================================================= */
.empty { display: grid; justify-items: center; text-align: center; gap: 16px; padding: 40px 0; }
.empty img { width: clamp(150px, 22vw, 230px); height: auto; }
.empty h2, .empty h1 { font-size: clamp(34px, 5vw, 60px); }
.empty p { color: var(--ink-2); max-width: 44ch; }
.empty .code { font-family: var(--f-num); font-weight: 800; font-size: clamp(64px, 12vw, 140px); line-height: 0.9; color: var(--blue); letter-spacing: -0.04em; }

/* =========================================================
   KEPALA HALAMAN PRODUK · slot logo produk + chip status
   ========================================================= */
.prod-head { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.prod-head .prod-logo { height: 48px; width: auto; }

/* =========================================================
   TAB SEGMEN · pilihan bulanan/tahunan, dsb. (tanpa JS: pakai radio)
   ========================================================= */
.segment { display: inline-flex; padding: 4px; gap: 4px; border-radius: 999px; border: 2px solid var(--ink); background: #fff; box-shadow: 0 3px 0 var(--ink); }
.segment label { position: relative; cursor: pointer; }
.segment input { position: absolute; opacity: 0; pointer-events: none; }
.segment span { display: block; padding: 8px 16px; border-radius: 999px; font-weight: 700; font-size: 14.5px; color: var(--ink-2); transition: background 0.25s var(--ease), color 0.25s; }
.segment input:checked + span { background: var(--blue); color: #fff; }
.segment input:focus-visible + span { outline: 3px solid var(--blue-light); outline-offset: 2px; }

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

## Snippet: `snippets/head-script.html`

```html
<!-- FUSIONIFY UI · skrip kecil di <head>, SEBELUM CSS dan skrip lain.
     - .js / .no-js: konten tetap terbaca tanpa JavaScript
     - .arriving: tirai transisi sudah menutup sejak HTML pertama tampil (tidak ada kedipan)
     - .fx-off: kalau motion.js gagal jalan dalam 4 detik, semua konten dipaksa tampil -->
<script>
  (function () {
    var d = document.documentElement;
    d.classList.remove("no-js");
    d.classList.add("js");
    try { if (sessionStorage.getItem("fx-nav") === "1") d.classList.add("arriving"); } catch (e) {}
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

## Catatan untuk `js/motion.js`

`motion.js` (fungsi `initFusionify()`) ada di repo dan terlalu panjang untuk disalin di sini. Kalau tidak punya akses ke repo, cukup tulis HTML dengan atribut `data-*` yang benar (lihat README di AGENTS.md) dan panggil:

```html
<script type="module">
  import { initFusionify } from "./fusionify-ui/js/motion.js";
  initFusionify();
</script>
```

Jangan menulis ulang mesin geraknya sendiri. Kalau terpaksa, patuhi aturan performa di AGENTS.md.
