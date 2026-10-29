# Rencana · situs dokumentasi FUSIONIFY UI (ui.fusionify.id) + aplikasi terlindungi

Status: **keputusan sudah diambil (29 Oktober 2026), mulai tahap 0 dan 1**. Ditulis 27 Oktober 2026.
Ide awal: teman bertanya apakah FUSIONIFY UI punya situs seperti m3.material.io. Syarat pemilik: **private penuh**,
seperti channel private Telegram: tidak bisa di-screenshot, direkam, di-inspect, diambil extension, atau di-copy semua.

---

## 1. Batas teknis yang harus jujur disampaikan

| Ancaman | Web di browser | Aplikasi desktop (Electron) | Android native | iPhone |
| --- | --- | --- | --- | --- |
| Screenshot / rekam layar / share layar (Zoom, Meet, OBS) | **Tidak bisa dicegah** | Bisa diblokir: `setContentProtection(true)` (Windows 10 2004+, macOS) | Bisa diblokir: `FLAG_SECURE` | Tidak bisa diblokir, hanya dideteksi lalu konten ditutup |
| Inspect / DevTools | Tidak bisa dicegah | Bisa dimatikan di build rilis | Tidak ada DevTools di build rilis | Sama |
| Extension membaca halaman | Tidak bisa dicegah | Tidak ada extension | Tidak ada | Tidak ada |
| Salin semua teks | Bisa dipersulit, tidak bisa dicegah | Bisa dimatikan, kecuali tombol salin kode | Bisa dimatikan | Bisa dimatikan |
| Foto layar pakai HP lain | Tidak bisa | Tidak bisa | Tidak bisa | Tidak bisa |
| Perangkat root/jailbreak, bongkar aplikasi | Tidak bisa | Tidak bisa sepenuhnya | Tidak bisa sepenuhnya | Tidak bisa sepenuhnya |

Kesimpulan: perlindungan seperti Telegram hanya mungkin di **aplikasi**, bukan web. Untuk celah yang tidak bisa ditutup
(foto pakai HP lain, perangkat root), yang bekerja adalah **watermark identitas + log + perjanjian lisensi/NDA**.
Jangan memasang skrip "anti-inspect/anti-klik-kanan" di web: gampang dilewati, merusak aksesibilitas (target skor 100), dan bikin tim sendiri kesal.

---

## 2. Bentuk akhir: tiga lapis

1. **Web `ui.fusionify.id`**: akses cepat, dikunci login, watermark per orang. Halaman yang sangat sensitif tidak ditampilkan di web, cukup tulisan "Buka di aplikasi FUSIONIFY UI".
2. **Aplikasi desktop "FUSIONIFY UI"** (Windows + macOS, Electron): versi lengkap, anti-screenshot/rekam/share layar, tanpa DevTools, tanpa extension.
3. **Aplikasi Android** (Capacitor dari web yang sama + `FLAG_SECURE`). iPhone: opsional nanti, hanya deteksi rekam layar + tutup konten.

Semua lapis membaca konten yang sama dari server, setelah login.

---

## 3. Akses dan keamanan

### Siapa yang boleh masuk
- Peran: `admin` (pemilik, Co-CEO), `tim` (karyawan FUSIONIFY), `partner` (mis. tim produk partner yang domainnya ada di `js/lisensi.js`).
- Daftar email yang diizinkan disimpan di server (D1). Admin bisa menambah, mencabut, dan melihat siapa saja yang punya akses.
- Login pertama wajib menyetujui **ketentuan lisensi / NDA** (teks dari `LICENSE.md` versi yang sudah diperiksa konsultan hukum). Tanggal persetujuan dicatat.

### Login
- Web: **Cloudflare Access** (gratis sampai 50 pengguna) di depan `ui.fusionify.id`, login lewat kode email atau Google. Orang tanpa izin tidak bisa memuat satu byte pun dari halaman.
- Aplikasi desktop/Android: login di dalam aplikasi lewat alur yang sama (buka jendela login Access, ambil token), token disimpan di penyimpanan aman OS, kedaluwarsa 7 hari.
- Opsional: batasi satu akun maksimal 2 perangkat aplikasi.

### Watermark identitas
- Lapisan tipis di seluruh halaman: email + tanggal + jam akses, diulang miring, opasitas rendah tapi tetap terlihat di foto.
- Dibuat di **server** (Worker menyisipkan dari header `Cf-Access-Authenticated-User-Email`), bukan dari JavaScript di browser, supaya tidak bisa dihapus dengan mematikan JS.
- Pratinjau gambar (maskot, contoh grafis) juga diberi watermark di server.

### Yang tidak pernah dikirim ke perangkat
- File asli: maskot resolusi tinggi, font, logo vektor, kode kit lengkap, template Office. Itu tetap di repo private dan rilis GitHub private.
- Situs hanya menampilkan pratinjau resolusi rendah dan potongan kode secukupnya.

### Log dan pencabutan
- Catat siapa membuka halaman apa, kapan, dari perangkat apa (D1). Admin bisa melihat ringkasannya di halaman admin.
- Batas laju: kalau satu akun membuka halaman sangat cepat dan banyak (tanda scraping), akun dijeda otomatis dan admin dikabari.
- Cabut akses = hapus email dari daftar; token aplikasi ikut tidak berlaku.

### Aplikasi desktop (Electron), wajib
- `win.setContentProtection(true)` di semua jendela.
- Build rilis: `devTools: false`, blok shortcut F12, Ctrl/Cmd+Shift+I/J/C, Ctrl+U.
- `contextIsolation: true`, `sandbox: true`, `nodeIntegration: false`, CSP ketat, hanya memuat domain `ui.fusionify.id`.
- Matikan seleksi teks dan menu klik kanan di area isi, kecuali tombol "Salin kode" (setiap salin dicatat di log).
- Cache konten di disk dienkripsi; dihapus saat logout atau token habis.
- Auto-update dari rilis privat. Ditandatangani (code signing) supaya Windows/macOS tidak memberi peringatan.

### Android, wajib
- `getWindow().setFlags(FLAG_SECURE, FLAG_SECURE)` di `MainActivity`: screenshot, rekam layar, dan pratinjau di daftar aplikasi terbaru jadi hitam.
- WebView tanpa debugging di build rilis, hanya memuat `ui.fusionify.id`.

---

## 4. Isi situs (mengikuti gaya m3.material.io, dengan gaya FUSIONIFY sendiri)

| Bagian | Isi | Sumber di kit |
| --- | --- | --- |
| Beranda | Apa itu FUSIONIFY UI, prinsip, siapa yang memakai, mulai dari mana | `DESIGN.md` Prinsip |
| Mulai pakai | Pasang di Astro, Next.js, Vite, HTML biasa, React + Tailwind, aplikasi HP, native | `AGENTS.md` Cara memakai, `react/README.md`, `tokens/README.md` |
| Fondasi | Warna (klik = salin token, terang/gelap berdampingan), huruf, segel, titik i, kicker, gaya stiker, radius, mode gelap, layout dan breakpoint | `css/tokens.css`, `DESIGN.md` |
| Gerak | Smooth scroll, reveal, transisi halaman, aturan performa, demo hidup | `js/motion.js`, `DESIGN.md` Gerak |
| Maskot | Galeri ekspresi + kapan dipakai, aturan pose baru | `mascot/`, `mascot/POSE-BARU.md` |
| Komponen | Satu halaman per komponen: contoh hidup, varian, kode, aturan pakai, aksesibilitas, mode gelap | `css/*.css`, `demo/index.html`, `templates/komponen.html` |
| Pola | Formulir, keadaan kosong/error/offline, halaman masuk, bayar QRIS, status, dokumentasi, legal | `templates/` |
| Aplikasi HP | App bar, navigation bar, bottom sheet, FAB, picker, OTP, upload, chat | `css/controls.css` |
| Dokumen | Surat, invoice, penawaran, kuitansi, perjanjian, sertifikat, e-tiket, kartu nama, slide, Excel; penomoran | `dokumen/` |
| Email | Template transaksional, tanda tangan email, aturan email | `email/` |
| Grafis | Post, story, OG image, banner, zona aman | `grafis/` |
| Konten dan bahasa | Gaya tulisan, kejujuran status, kontak publik, tanpa em dash | `AGENTS.md` Aturan isi |
| Versi | Changelog per rilis, pilih versi dokumentasi | `CHANGELOG.md` |
| Unduh | Tautan ke rilis GitHub private (hanya peran `admin` dan `tim`) | Releases |

Fitur halaman:
- Pencarian (`/` untuk fokus), menu samping, daftar isi kanan (`[data-toc]` yang sudah ada).
- Contoh komponen hidup memakai CSS kit versi yang sama (dogfooding), bisa ganti tema terang/gelap per contoh.
- Tombol salin kode (`data-copy` di `.code-block`).
- Pilih versi kit (mis. 1.9.0, 1.10.0).
- Bahasa Indonesia dulu; Inggris menyusul.

---

## 5. Teknologi

- **Repo baru private**: `FUSIONIFY-ID/fusionify-ui-situs`. Kit masuk sebagai git submodule yang dikunci ke tag rilis.
- **Situs**: Astro + vanilla CSS memakai kit itu sendiri. Halaman dihasilkan dari isi kit (Markdown + metadata komponen), bukan ditulis ulang manual, supaya tidak beda dengan kit.
- **Hosting**: Cloudflare Workers (seperti fusionify.id) + Cloudflare Access + D1 (pengguna, peran, persetujuan lisensi, log) + R2 (pratinjau gambar ber-watermark).
- **Desktop**: Electron + electron-builder, rilis lewat GitHub Releases private + auto-update.
- **Android**: Capacitor membungkus situs + satu baris `FLAG_SECURE`.
- Semua dependensi baru dicatat di `THIRD_PARTY_NOTICES.md` (Electron dan Capacitor berlisensi MIT).

---

## 6. Tahapan

| Tahap | Hasil | Selesai kalau |
| --- | --- | --- |
| 0. Persiapan | Keputusan di bagian 8 dijawab; subdomain `ui.fusionify.id` dibuat (tanpa menyentuh record email dan subdomain lain); kebijakan Cloudflare Access; daftar awal pengguna | Pemilik bisa login, orang lain ditolak |
| 1. Situs inti | Kerangka situs, Beranda, Mulai pakai, Fondasi, Maskot; watermark server; log akses | Lolos uji tata letak/kontras kit di 8 ukuran layar, terang dan gelap |
| 2. Isi lengkap | Semua halaman Komponen, Pola, Aplikasi HP, Dokumen, Email, Grafis, Konten; pencarian; pilih versi; halaman admin (pengguna, log) | Setiap kelas di `AGENTS.md` punya halaman |
| 3. Aplikasi desktop | Installer Windows + macOS, login, perlindungan konten, auto-update, ditandatangani | Uji perlindungan di bagian 7 lulus |
| 4. Aplikasi Android | APK/AAB dengan `FLAG_SECURE` | Uji perlindungan di bagian 7 lulus |
| 5. Peluncuran | Undang tim dan partner, minta persetujuan lisensi, catat di CHANGELOG kit | Semua pengguna awal sudah login dan setuju |

---

## 7. Uji perlindungan (wajib sebelum rilis aplikasi)

- Windows: Snipping Tool, PrtSc, Win+Shift+S, Xbox Game Bar, OBS, share layar Zoom/Google Meet/Discord → jendela aplikasi hitam atau kosong.
- macOS: Cmd+Shift+3/4/5, QuickTime rekam layar, share layar Zoom/Meet → jendela hitam.
- Android: screenshot, rekam layar, daftar aplikasi terbaru → hitam.
- DevTools tidak bisa dibuka (F12, Ctrl+Shift+I, menu).
- Akun yang dicabut tidak bisa membuka apa pun, termasuk cache di aplikasi.
- Watermark terlihat di foto layar yang diambil pakai HP lain.
- Pengunjung tanpa login ke `ui.fusionify.id` hanya melihat halaman login Cloudflare.

---

## 8. Keputusan pemilik (29 Oktober 2026)

1. **Pengguna awal**: tim FUSIONIFY + partner terbatas. Partner hanya melihat bagian tertentu (peran `partner`); bagian Unduh dan file asli hanya untuk `admin` dan `tim`.
2. **Akses**: semuanya di balik login. Tidak ada halaman etalase publik; tanpa login hanya terlihat halaman login Cloudflare Access.
3. **Aplikasi desktop dan HP**: ditunda. Web dulu (tahap 0 sampai 2); tahap 3 dan 4 dikerjakan setelah situsnya jadi.
4. **iPhone**: ikut ditunda bersama aplikasi lain.
5. **Biaya tanda tangan kode**: belum perlu sampai aplikasi dikerjakan.
6. **Teks lisensi/NDA**: masih menunggu konsultan hukum. Selama belum ada, layar persetujuan memakai teks `LICENSE.md` yang sekarang dan diberi label "versi sementara".
7. **Nama**: tetap "FUSIONIFY UI".

---

## 9. Aturan yang tetap berlaku

Semua aturan `AGENTS.md` dan `DESIGN.md` kit berlaku untuk situs dan aplikasi ini: token kit, gaya stiker, maskot dengan ekspresi yang benar,
mode gelap, tanpa em dash di teks pengunjung, kontak publik saja, tidak ada angka atau testimoni karangan, proyek rahasia klien pemerintah tidak boleh muncul,
commit atas nama `jundy779`, dan uji di semua ukuran layar sebelum selesai.
