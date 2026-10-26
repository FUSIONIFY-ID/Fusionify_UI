# Email · FUSIONIFY UI

Template email transaksional dengan gaya FUSIONIFY: kartu stiker, judul Afacad dengan titik biru muda, kicker, maskot, tabel rincian, tombol kapsul biru, dan chip status. Satu file tanpa dependensi, jalan di Node, Deno (Supabase Edge Functions), Bun, dan browser.

| File | Isi |
| --- | --- |
| `fy-email.js` | `renderEmail(opsi)` → `{ subject, html, text }`, `esc()`, `FUSIONIFY` (merek bawaan) |
| `fy-email.js` → `tandaTangan()` | Tanda tangan email karyawan atau produk (`{ html, text }`). Pratinjau: `contoh/tanda-tangan.html` |
| `templates.js` | Template siap pakai: `kodeVerifikasi`, `aturUlangPassword`, `selamatDatang`, `pengajuanDisetujui`, `pengajuanDitolak`, `pembayaranBerhasil`, `pembayaranGagal`, `statusPenarikan`, `pemberitahuan` |
| `aset/` | PNG maskot (220×276, tampil 110×138) dan badge produk. Host di domain produk |
| `contoh/` | Pratinjau HTML dan teks polos setiap template (`npm run build:email`) |

## Pakai

1. Salin `aset/*.png` ke folder publik produk, mis. `https://produk.fusionify.id/fy/email/`.
2. Salin `fy-email.js` dan `templates.js` ke backend (jangan diubah di sana; ubah di kit lalu salin ulang).
3. Kirim:

```js
import { pembayaranBerhasil } from "./templates.js";

const mail = pembayaranBerhasil(
  { nama: "Budi", nomor: "INV-001", jumlah: "Rp100.000", waktu: "26 Oktober 2026, 14.05 WIB", url: "https://…" },
  {
    merek: { nama: "Premiumify", namaTeks: "Premiumify", logo: "https://premiumify.my.id/fy/email/logo.png", logoLebar: 40, logoTinggi: 40, url: "https://premiumify.my.id", produkFusionify: true },
    aset: "https://premiumify.my.id/fy/email/",
    alasan: "Email ini dikirim karena kamu berbelanja di Premiumify.",
  },
);
// kirim mail.subject, mail.html, dan mail.text lewat Resend / MailChannels / SMTP
```

Tanpa `merek`, email memakai logo dan nama FUSIONIFY. `produkFusionify: true` menambahkan badge "Sebuah produk dari FUSIONIFY" di kaki email.

### Membuat email sendiri

```js
import { renderEmail } from "./fy-email.js";
renderEmail({
  subject: "…", pratinjau: "teks pratinjau di kotak masuk", maskot: "glasses", aset: "https://…/fy/email/",
  kicker: "Pemberitahuan", judul: "Judul email",
  isi: [
    { p: ["Halo ", { b: "Budi" }, ", …"] },
    { rincian: [["Nomor", "INV-001"], ["Jumlah", "Rp100.000"]] },
    { catatan: { nada: "warn", teks: "…" } },            // info | ok | warn | danger
    { status: { teks: "Aktif", nada: "go" } },            // go | beta | wip | plan | eos
    { kode: "482913", keterangan: "Berlaku 10 menit." },
    { daftar: ["langkah 1", "langkah 2"] },
    { tombol: { teks: "Buka dashboard", url: "https://…" } },
    { kecil: "…" }, { judul2: "…" }, { garis: true },
  ],
});
```

Semua teks di-escape. Tautan hanya menerima `https:`, `http:`, `mailto:`, `tel:`, atau path relatif; selain itu jadi `#`.

## Aturan email

- Tata letak tabel 600px dengan gaya inline. Gmail dan Outlook tidak memuat CSS luar.
- **Tanpa SVG dan WebP.** Pakai PNG dengan `width`, `height`, dan `alt`.
- Huruf FUSIONIFY dipakai bila terpasang di perangkat penerima; cadangannya Arial/Segoe UI, jadi tampilan tetap rapi.
- Bayangan stiker ditiru dengan `border-bottom` tebal (box-shadow tidak didukung semua klien email).
- Selalu kirim versi teks polos (`text`) bersama HTML.
- Ukuran HTML di bawah 102 KB supaya Gmail tidak memotongnya.
- Satu email, satu tujuan: satu tombol utama. Jangan memakai emoji di subjek atau judul.
- Data sensitif disamarkan: nomor rekening hanya 4 digit terakhir (otomatis di `statusPenarikan`). Jangan pernah mengirim password atau API key lewat email.
- Pengirim memakai domain sendiri yang sudah diverifikasi (SPF/DKIM), bukan domain milik orang lain.

## Tanda tangan email

```js
import { tandaTangan } from "./fy-email.js";
const { html, text } = tandaTangan({ nama: "Nama Lengkap", jabatan: "Jabatan", aset: "https://fusionify.id/fy/email/" });
// produk: tandaTangan({ …, merek: { nama: "Premiumify", logo: "https://…/logo-112.png", url: "https://premiumify.my.id" }, produkFusionify: true })
```

Pasang di Gmail: buka `contoh/tanda-tangan.html` (atau HTML hasil fungsi di atas) di browser, blok semuanya, salin, lalu tempel di **Setelan → Lihat semua setelan → Tanda tangan**. Gambar harus URL https yang benar-benar di-host (`aset/fusionify-mark-112.png`). Kontak memakai kontak publik; email kerja pribadi boleh lewat opsi `email`, nomor HP pribadi jangan.
