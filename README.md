<p align="center">
  <img src="brand/kit/fusionify-logo-horizontal.png" alt="FUSIONIFY" width="360">
</p>

<h1 align="center">FUSIONIFY UI</h1>

<p align="center">
  Sistem desain resmi semua web FUSIONIFY.<br>
  Token, komponen CSS, gerak, segel, font, logo, dan maskot, diambil dari <a href="https://fusionify.id">fusionify.id</a>.
</p>

---

## Untuk apa

Supaya **web company dan semua web brand produk** (Premiumify, FUSIONIFY BOT, StudyDate.id, Fusionify Solutions, dan produk berikutnya) terasa satu keluarga, siapa pun yang mengerjakan: kamu, tim, atau AI agent.

Setiap AI agent (Claude, ChatGPT/Codex, Cursor, Copilot, Gemini) otomatis membaca `AGENTS.md` dan `DESIGN.md` di repo ini.

## Mulai cepat

```bash
# 1. Taruh kit di proyek
git submodule add https://github.com/FUSIONIFY-ID/Fusionify_UI public/fusionify-ui
# atau salin foldernya saja

# 2. Pasang mesin gerak
npm i gsap lenis
```

```html
<head>
  <!-- isi snippets/head-script.html -->
  <link rel="preload" href="/fusionify-ui/fonts/afacad-flux-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fusionify-ui/fonts/sansation-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/fusionify-ui/css/fusionify.css">
</head>
<body>
  <!-- isi snippets/sprite.html -->

  <section class="sec">
    <div class="wrap">
      <span class="kicker">Produk</span>
      <h2 class="h-sec split" data-split>Fuse ideas<span class="dot">.</span></h2>
      <a class="btn" href="#">Mulai</a> <span class="chip beta">Beta</span>
    </div>
  </section>

  <!-- isi snippets/body-parts.html -->
  <script type="module">
    import { initFusionify } from "/fusionify-ui/js/motion.js";
    const fy = initFusionify();
  </script>
</body>
```

Buka **`demo/index.html`** (lewat server lokal, mis. `npx serve .`) untuk melihat semua komponen dan contoh markup-nya.

Mau bikin web produk baru? Salin **`templates/landing-produk.html`**, ganti teks bertanda `GANTI`, logo produk, dan status chip-nya. Isinya sudah lengkap: hero dengan maskot, fitur, cara kerja, harga, testimoni (hapus kalau belum ada izin), FAQ, ajakan, form, dan footer dengan badge.

## Dipakai di AI agent mana pun

| Agent | Cara membaca aturan repo ini |
| --- | --- |
| Codex / ChatGPT agent, Cursor, Windsurf, GitHub Copilot (coding agent), Jules, Zed, Aider, Junie, Amp, opencode, dan lainnya | Otomatis membaca `AGENTS.md` |
| Grok (Grok Build) | Otomatis membaca `AGENTS.md` dan `CLAUDE.md`, juga `.cursor/rules/` |
| Claude Code | `CLAUDE.md` (menunjuk ke `AGENTS.md` dan `DESIGN.md`) |
| Gemini CLI | `.gemini/settings.json` sudah diatur membaca `AGENTS.md` + `GEMINI.md` |
| Qwen Code | `.qwen/settings.json` sudah diatur membaca `AGENTS.md` + `QWEN.md` |
| Copilot di editor | `.github/copilot-instructions.md` |
| Cursor (aturan lama) | `.cursor/rules/*.mdc` |
| Aider | `.aider.conf.yml` membaca `AGENTS.md` dan `DESIGN.md` |
| **AI versi chat web** (ChatGPT, Gemini, Grok, Qwen, Claude di browser) | Tidak bisa membaca repo. **Upload `FUSIONIFY-UI-KONTEKS.md`** ke chat, lalu tulis permintaan |

`FUSIONIFY-UI-KONTEKS.md` dibuat otomatis dari `AGENTS.md`, `DESIGN.md`, semua CSS, dan snippet. Setiap kali salah satunya berubah, jalankan `node scripts/build-konteks.mjs`.

## Isi

| Folder | Isi |
| --- | --- |
| `css/` | `tokens.css`, `base.css`, `components.css`, `product.css` (komponen web produk), `fusionify.css` (semua sekaligus) |
| `js/` | `motion.js` (`initFusionify`), `seal.js` (`seal`, `SEAL_PATH`) |
| `snippets/` | Potongan HTML wajib: head, sprite SVG, kursor/toast/tirai |
| `fonts/` | Afacad Flux, Sansation, Caveat, Exo 2 (woff2, OFL) |
| `brand/` | Segel Fi, wordmark, emblem, logo horizontal/vertikal/legacy |
| `mascot/` | Maskot badan penuh, kepala, papan, stiker bot |
| `badge/` | "Sebuah produk dari FUSIONIFY" ID/EN, terang/gelap |
| `demo/` | Halaman contoh semua komponen |
| `templates/` | Halaman siap pakai: `landing-produk.html`, `404.html` |

## Atribut data yang dipahami `initFusionify()`

| Atribut | Efek |
| --- | --- |
| `data-split` | Judul naik per kata |
| `data-reveal` | Naik dan memudar masuk saat terlihat |
| `data-assemble` | Anak-anak elemen "dirakit" dari posisi acak (jangan untuk elemen yang punya transform saat hover) |
| `data-count-to="120" data-suffix="+"` | Angka naik |
| `data-magnetic` | Efek magnet ke kursor |
| `data-copy="teks" data-copied="pesan"` | Salin ke clipboard + toast |
| `data-cursor-label="lihat"` | Label tulisan tangan di kursor |
| `data-sfx="plop"` | Bunyi saat diklik (kalau suara dinyalakan) |
| `data-nav`, `data-menu`, `data-drawer`, `data-sound` | Nav, menu HP, tombol suara |
| `data-no-veil` | Tautan ini tidak memakai transisi segel |
| `data-pause` | Elemen tambahan yang animasinya dijeda saat di luar layar |

## Aturan singkat

- Pakai token, jangan bikin warna atau font baru.
- Logo dari `brand/`, jangan diketik ulang. Web produk boleh pakai logonya sendiri.
- Maskot: tukar gambar badan penuh, jangan tempel kepala.
- Status produk jujur, tanpa angka atau testimoni karangan.
- Hanya animasikan `transform` dan `opacity`.
- Tanpa em dash di teks pengunjung.

Lengkapnya di **[`AGENTS.md`](AGENTS.md)** dan **[`DESIGN.md`](DESIGN.md)**.

## Lisensi

Kode untuk proyek FUSIONIFY. Logo, maskot, dan badge milik PT FUSIONIFY DIGITAL STORE. Font OFL. Detail di [`LICENSE.md`](LICENSE.md) dan [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

<p align="center"><img src="brand/mark-128.webp" width="40" alt=""><br><sub>© 2026 PT FUSIONIFY DIGITAL STORE · Bogor · <a href="https://fusionify.id">fusionify.id</a></sub></p>
