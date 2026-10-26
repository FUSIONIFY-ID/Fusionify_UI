# Grafis · FUSIONIFY UI

Template grafis untuk media sosial dan gambar pratinjau tautan (OG image). Dibuat dari HTML dengan token, huruf, segel, dan maskot kit, lalu dirender jadi PNG. Hasilnya selalu konsisten, dan teksnya bisa diganti tanpa membuka aplikasi desain.

| Berkas | Ukuran | Kanvas |
| --- | --- | --- |
| `post.html` | 1080 × 1080 | `post-kabar` (biru), `post-tips` (kertas, daftar 3 poin), `post-pemberitahuan` (malam), `post-tagline` (biru) |
| `potret.html` | 1080 × 1350 | `potret-acara` (pengumuman acara) |
| `story.html` | 1080 × 1920 | `story-kabar`, `story-tips`. Dipakai juga untuk sampul Reels dan TikTok |
| `og.html` | 1200 × 630 | `og-perusahaan`, `og-produk`, `og-artikel`, `og-dokumentasi` |
| `banner.html` | 1500 × 500, 1584 × 396 | `banner-x` (header X), `banner-in` (sampul LinkedIn) |

Pratinjau PNG ada di `contoh/`.

## Membuat PNG

```bash
npm run build:grafis                                       # semua kanvas → grafis/contoh/
node scripts/build-grafis.mjs grafis/post.html --kanvas post-kabar --isi isi.json --keluar hasil/
node scripts/build-grafis.mjs grafis/og.html --skala 2     # PNG dua kali lebih tajam
```

`isi.json` berisi teks pengganti. Kunci umum berlaku ke semua kanvas; kunci ber-id kanvas hanya untuk kanvas itu:

```json
{
  "judul": "Premiumify buka pendaftaran",
  "kicker": "Kabar produk",
  "status": "beta",
  "url": "premiumify.my.id",
  "post-tips": { "poin1": "…", "poin2": "…", "poin3": "…" }
}
```

Kunci yang dikenal: `kicker`, `judul`, `teks`, `url`, `gelembung`, `poin1`..`poin3`, `waktu`, `tempat`, `ajakan`, `meta`, `produk`, `maskot` (path gambar), `logo` (path gambar), `status` (`go`, `beta`, `wip`, `plan`, `eos`) dan `statusLabel`. Untuk mencoba cepat di browser: `grafis/post.html?judul=Halo&status=wip`.

Perintah gagal kalau ada teks yang keluar kanvas, tertutup maskot, gambar rusak, atau huruf belum termuat. Kalau judul kepanjangan, pendekkan kalimatnya, jangan kecilkan hurufnya sembarangan.

## Aturan

- **Jujur.** Status produk pakai chip yang benar. Tanpa angka, testimoni, atau logo klien karangan. Teks dalam kurung siku (`[Nama acara kamu]`) wajib diganti sebelum diunggah.
- **Zona aman.** Buka dengan `?panduan` untuk melihat garis putus-putus merah muda. Story: atas, bawah, dan kanan tertutup tombol aplikasi. Banner: kiri tertutup foto profil. OG: WhatsApp kadang memotong jadi persegi di tengah.
- **Logo**: akun FUSIONIFY memakai wordmark; produk memakai logonya sendiri (`logo`) plus badge "Sebuah produk dari FUSIONIFY" bila ada tempat.
- **Maskot** boleh terpotong tepi kanvas, tapi wajahnya tidak. Ganti ekspresi sesuai isi: welcome untuk kabar baru, glasses untuk tips, cry untuk layanan berakhir, happy untuk acara.
- Tanpa em dash, foto stok, gradien ungu, atau emoji sebagai hiasan.

## Memasang OG image

```html
<meta property="og:image" content="https://domain-produk/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Judul halaman">
<meta name="twitter:card" content="summary_large_image">
```
