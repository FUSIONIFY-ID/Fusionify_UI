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
