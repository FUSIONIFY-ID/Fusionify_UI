# Ikon FUSIONIFY

Set ikon resmi FUSIONIFY, digambar sendiri untuk web company, web produk, dasbor, dan aplikasi HP. Katalog dengan pencarian ada di `templates/ikon.html`.

## Ciri khas

- **Titik i.** Satu bulatan biru muda (`--blue-light`) di tempat yang punya arti: titik huruf i di ikon info, ujung garis di unduh dan grafik, lampu server, notifikasi lonceng, lubang label, ujung antena bot. Ini yang membuat ikon FUSIONIFY langsung dikenali, sama seperti titik di akhir judul.
- **Garis 2px**, ujung dan sambungan bulat, kisi 24 × 24. Tebalnya sama dengan garis stiker kit.
- **Lingkaran segel.** Ikon status (info, berhasil, galat, bantuan, jam) memakai garis segel bergelombang 12 lekukan, bukan lingkaran polos. Matahari (`terang`) juga segel kecil dengan sinar berupa titik.
- **Kepala panah lengkung.** Panah (kembali, maju, naik, turun, urut, unduh, unggah) memakai mata panah yang melengkung lembut, bukan dua garis lurus, dan ekornya berakhir di titik i.
- **Ikon khas**: `segel` (12 lekukan, juga dipakai sebagai `setelan`), `titik-i`, `fusi` (Fuse Ideas), `progres` (Build Progress), `maskot`.
- Ikon utilitas kecil (tutup, tambah, kurang, chevron, cek) sengaja tanpa titik supaya tetap bersih.

## Isi

| Path | Isi |
| --- | --- |
| `sumber.mjs` | Satu-satunya tempat menggambar ikon. Ubah di sini, lalu `npm run build:ikon` |
| `svg/<nama>.svg` | Satu file per ikon (untuk Figma, desainer, atau impor langsung) |
| `sosmed/<nama>.svg` | Logo media sosial satu warna |
| `ikon.svg` | Sprite semua ikon (`#ikon-<nama>`) dan logo sosmed (`#sosmed-<nama>`) |
| `ikon.json` | Daftar nama, kategori, kata kunci |
| `png/` | PNG 64px warna tinta untuk email (sosmed, email, telepon, web, lokasi) |

Turunan lain: `react/ikon-data.ts` (dipakai `<Ikon>`), `tokens/android/res/drawable/fy_ikon_*.xml` dan `fy_sosmed_*.xml`.

## Pakai di web

Tempel isi `ikon.svg` sekali di awal `<body>` (atau sisipkan lewat server/komponen layout), lalu:

```html
<svg class="ikon" aria-hidden="true"><use href="#ikon-dompet"/></svg> Saldo
<span class="ikon-stiker"><svg class="ikon" aria-hidden="true"><use href="#ikon-grafik-tren"/></svg></span>
<span class="ikon-segel biru"><svg class="ikon" aria-hidden="true"><use href="#ikon-bot"/></svg></span>
<button class="icon-btn" aria-label="Hapus"><svg class="ikon" aria-hidden="true"><use href="#ikon-hapus"/></svg></button>
```

- Ukuran ikut `font-size` (1.25em) atau kelas `.ikon-16/-20/-24/-32`. Warna garis ikut `color`, warna titik lewat `--ikon-titik`. `.ikon.polos` = satu warna.
- `.ikon-stiker` (putih, `.biru`, `.tint`, `.kecil`) untuk kartu fitur, KPI, dan menu dasbor. `.ikon-segel` (`.biru`) untuk kartu layanan.
- Tombol yang isinya hanya ikon wajib `aria-label`. Ikon di samping teks cukup `aria-hidden="true"`.

## Pakai di React

```tsx
import { Ikon, IkonStiker, IkonSegel, IkonSosmed, TautanSosmed } from "./fusionify-ui/react";
<Ikon nama="cari" />
<Ikon nama="hapus" label="Hapus pesanan" />
<IkonStiker nama="dompet" nada="biru" />
<TautanSosmed akun={[{ nama: "instagram", url: "https://instagram.com/…", label: "Instagram FUSIONIFY" }]} />
```

Nama ikon diketik (`NamaIkon`, `NamaSosmed`), jadi salah ketik ketahuan saat build.

## Pakai di Android

```xml
<ImageView android:src="@drawable/fy_ikon_dompet" android:layout_width="24dp" android:layout_height="24dp" android:contentDescription="Saldo" />
```

Garis memakai `@color/fy_ink` (ikut mode gelap), titik memakai `@color/fy_blue_light`.

## Logo media sosial

Diambil dari paket [simple-icons](https://simpleicons.org) (data CC0), bukan digambar ulang. Logonya tetap merek dagang pemilik masing-masing, jadi:

- Pakai hanya untuk menautkan akun resmi FUSIONIFY atau produknya. Tampilkan hanya akun yang benar-benar ada.
- Satu warna (tinta, putih, atau biru FUSIONIFY), tanpa diubah bentuk, diputar, atau digabung dengan logo lain.
- Baca panduan merek tiap platform (tautannya ada di `ikon.json`, kolom `panduanMerek`) sebelum memakai di materi iklan.

## Keaslian

Semua ikon digambar sendiri, koordinat demi koordinat, di `sumber.mjs`. Tidak ada file atau path yang diambil dari set ikon lain.

`npm run cek:ikon` membandingkan setiap ikon dengan 7.036 ikon Lucide, Tabler, Heroicons, dan Feather (diunduh ke `.cache/` hanya sebagai pembanding):
- tidak boleh ada path yang identik, dan
- kemiripan gambar tanpa titik i harus di bawah 85%. Pengecualiannya hanya bentuk dasar `tambah`, `kurang`, dan `tutup`, karena tanda plus, minus, dan silang memang sama di mana pun.

Hasil terakhir (27 Oktober 2026): tidak ada path identik, kemiripan tertinggi 84% (`database`). Jalankan lagi setiap kali menambah atau mengubah ikon.

## Menambah ikon baru

1. Gambar di `sumber.mjs`: kisi 24, garis di dalam 2..22, hanya path (pakai helper `c()` untuk lingkaran, `k()` untuk kotak bulat).
2. Beri titik i (`t: [x, y, r]`) kalau ada tempat yang bermakna. Jangan dipaksa.
3. Isi `kat` dan `kata` (kata kunci pencarian, Indonesia dan Inggris).
4. `npm run build:ikon`, cek di `templates/ikon.html` (terang dan gelap), lalu `npm test -- ikon` dan `npm run cek:ikon`.
5. Jangan menyalin ikon dari set lain (Material, Lucide, Feather, dll.). Boleh terinspirasi, gambar sendiri.
