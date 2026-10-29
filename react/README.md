# React + Tailwind · FUSIONIFY UI

Untuk produk FUSIONIFY yang dibangun dengan React (Vite, Next.js, Lovable) dan Tailwind. Isinya:

| File | Isi |
| --- | --- |
| `index.tsx` | Komponen React tipis di atas kelas kit: `FyAset`, `Wrap`, `Seksi`, `Kicker`, `Judul`, `Lead`, `Tombol`, `Chip`, `Kartu`, `Segel`, `Maskot`, `KepalaMaskot`, `Gelembung`, `PanggungMaskot`, `Keadaan`, `BadgeProduk` |
| `tailwind-preset.js` | Preset Tailwind v3: warna, huruf, radius, bayangan, kurva gerak dari `css/tokens.css` |
| `tailwind-v4.css` | Token yang sama untuk Tailwind v4 (`@theme inline`) |

Gaya tetap tinggal di `css/*.css`. Komponen hanya memastikan markup-nya benar: kelas kit, `width`/`height` gambar maskot, `alt`, dan `aria`. Jadi tampilan React dan HTML biasa selalu sama.

## Pasang

1. Taruh kit di proyek (submodule di tag versi, atau salin foldernya), mis. `vendor/fusionify-ui/`.
2. Salin `fonts/`, `mascot/`, `badge/`, dan `brand/` ke folder publik, mis. `public/fusionify-ui/`, supaya gambar dan huruf bisa diakses browser.
3. Muat CSS kit sekali di entry aplikasi:
   ```ts
   import "../vendor/fusionify-ui/css/fusionify.css";
   import "../vendor/fusionify-ui/css/app.css"; // hanya untuk dashboard/admin/masuk
   ```
4. Tailwind v3:
   ```ts
   // tailwind.config.ts
   import fusionify from "./vendor/fusionify-ui/react/tailwind-preset.js";
   export default { presets: [fusionify], content: ["./src/**/*.{ts,tsx}"] };
   ```
   Tailwind v4: `@import "../vendor/fusionify-ui/react/tailwind-v4.css";` setelah `@import "tailwindcss";`.
5. Bungkus aplikasi dengan lokasi aset:
   ```tsx
   import { FyAset } from "../vendor/fusionify-ui/react";
   <FyAset base="/fusionify-ui"><App /></FyAset>
   ```

## Contoh

```tsx
import { Seksi, Wrap, Kicker, Judul, Lead, Tombol, Chip, Kartu, PanggungMaskot, Keadaan } from "../vendor/fusionify-ui/react";

<Seksi>
  <Wrap>
    <Kicker>Payment gateway QRIS</Kicker> <Chip status="wip" />
    <Judul as="h1" besar>Terima QRIS, tanpa ribet</Judul>
    <Lead>Satu kalimat yang menjelaskan produknya.</Lead>
    <Tombol href="/daftar">Daftar</Tombol> <Tombol varian="ghost">Pelajari</Tombol>
    <PanggungMaskot ekspresi="welcome" kata="Scan, bayar, beres!" eager />
  </Wrap>
</Seksi>

<Keadaan jenis="kosong" judul="Belum ada invoice" teks="Invoice pertamamu akan muncul di sini." aksi={<Tombol kecil>Buat invoice</Tombol>} />
```

Kelas Tailwind dari preset: `bg-blue`, `text-ink-2`, `border-edge`, `shadow-sticker`, `font-head`, `rounded-l`, `bg-go-bg text-go`, `max-w-wrap`, `ease-spring`. Warna berbasis variabel CSS sehingga mode gelap kit ikut berlaku; modifier opasitas (`bg-blue/50`) tidak berlaku untuk warna kit.

## Aturan

- Jangan menulis warna hex sendiri di komponen atau config Tailwind. Kalau butuh warna baru, tambahkan dulu ke `css/tokens.css`.
- Jangan mengubah file kit di dalam proyek produk. Ubah di repo Fusionify_UI, rilis, lalu naikkan versinya di produk.
- Interaksi (reveal, kursor, sheet, OTP, upload, dll.) tetap dari `js/motion.js`, `js/app.js`, dan `js/controls.js`. Di aplikasi React, panggil `initApp()` sekali setelah mount, atau buat ulang interaksinya dengan aturan yang sama (hanya `transform` dan `opacity`, hormati `prefers-reduced-motion`).
- `Tombol` dengan `penuh` memakai `.btn.block` dari `css/app.css`.

## Ikon

```tsx
import { Ikon, IkonStiker, IkonSegel, IkonSosmed, TautanSosmed } from "./fusionify-ui/react";

<Ikon nama="cari" />                              // dekoratif
<Ikon nama="hapus" label="Hapus pesanan" />       // berdiri sendiri, dibacakan pembaca layar
<IkonStiker nama="dompet" nada="biru" />           // putih | biru | tint, kecil
<IkonSegel nama="bot" biru />
<TautanSosmed akun={[{ nama: "instagram", url: "https://instagram.com/…", label: "Instagram FUSIONIFY" }]} />
```

Path ikon ada di `react/ikon-data.ts` (dibuat `npm run build:ikon`), jadi tidak perlu memuat sprite. Daftar nama: `ikon/ikon.json`.

## Komponen toko dan navigasi (1.13)

```tsx
import { Remah, KartuProduk, Rating, Harga, Linimasa, HitungMundur, Kbd, Tombol } from "./fusionify-ui/react";

<Remah item={[{ teks: "Beranda", href: "/" }, { teks: "Produk", href: "/produk" }, { teks: "Netflix Premium" }]} />
<KartuProduk judul="…" href="/produk/x" gambar={{ src: "/x.webp", width: 600, height: 600 }} harga={25000} coret={40000} nilai={4.8}>
  <Tombol kecil>Beli</Tombol>
</KartuProduk>
<Linimasa langkah={[{ judul: "Dibayar", status: "done" }, { judul: "Diproses", status: "now" }, { judul: "Selesai" }]} />
<HitungMundur tenggat="2026-11-11T00:00:00+07:00" />   {/* angka diisi initControls() */}
```

Harga, harga coret, rating, dan jumlah ulasan wajib data asli.

## Pindah dari lucide-react

Produk lama yang memakai `lucide-react` cukup mengganti sumber impornya; nama komponen tetap, gambarnya jadi Ikon FUSIONIFY:

```tsx
// sebelum: import { Send, Loader2, ShoppingCart } from "lucide-react";
import { Send, Loader2, ShoppingCart } from "./fusionify-ui/react/lucide";
```

Nama lucide yang belum ada di `react/lucide.tsx` ditambahkan di sana (pemetaan ke nama Ikon FUSIONIFY). Kalau bentuknya belum ada sama sekali, gambar dulu di `ikon/sumber.mjs`. Kode baru langsung pakai `<Ikon nama="kirim" />`.
