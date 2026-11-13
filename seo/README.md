# Paket SEO, GEO, AIO, AEO · FUSIONIFY UI

Wajib untuk setiap web produk FUSIONIFY yang baru atau direvisi. Template publik kit (`landing-produk`, `acara`, `status`, `dokumentasi`, `legal/*`) sudah membawa blok `<!-- SEO: ... -->` di `<head>`; halaman yang bukan untuk mesin pencari (masuk, dashboard, admin, chat, error, katalog) membawa `noindex`. `tests/seo.mjs` mengecek semuanya.

## Isi folder

| File | Pakai untuk |
| --- | --- |
| `robots.txt` | Izinkan Googlebot, Bingbot, dan bot AI (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended). Tanpa baris Content-Signal |
| `sitemap.xml` | Contoh sitemap dengan `hreflang` dan `lastmod` |
| `llms.txt` | Ringkasan produk untuk asisten AI, ditaruh di `/llms.txt`. Buat juga `/llms-full.txt` (isi halaman utama dalam teks polos), sebaiknya otomatis saat build |

## Di setiap halaman publik

1. `<title>` berbasis kata kunci, satu `<h1>`, meta description 140 sampai 160 karakter yang tidak terpotong di tengah kata.
2. `meta robots` dengan `max-snippet:-1, max-image-preview:large`.
3. `canonical`, `hreflang` `id`, `en`, `x-default`.
4. Open Graph lengkap dengan gambar 1200x630 dari `grafis/og.html`, plus `twitter:card`.
5. JSON-LD `@graph`: `WebSite`, `WebPage` (atau `TechArticle`/`Event`), `Organization` FUSIONIFY dengan kontak publik, `BreadcrumbList`, dan `FAQPage` kalau halaman punya FAQ. Teks FAQ di JSON-LD wajib sama persis dengan yang tampil.
6. Bisnis lokal: tambahkan `meta geo.region` (`ID-JB`) dan `geo.placename` (`Bogor`) bila relevan.

## Isi yang mudah dikutip AI (GEO dan AEO)

- Jawaban inti di paragraf pertama. Subjudul berupa pertanyaan, langkah bernomor atau tabel, FAQ di akhir.
- Halaman layanan punya blok "Jawaban singkat".
- Nama, alamat, nomor, dan profil sama persis di web, Google Business Profile, Instagram, dan direktori (AIO).
- Tanpa trik, FAQ palsu, harga, angka, atau klaim karangan.

## Di luar kode (setelah rilis)

- Google Search Console: verifikasi domain, kirim `sitemap.xml`.
- Bing Webmaster Tools: impor dari Search Console.
- IndexNow: file kunci di root domain, kirim URL baru setiap rilis.
- Google Business Profile untuk produk dengan layanan lokal; minta ulasan asli.
- Cloudflare: cek AI Crawl Control supaya bot AI di atas tidak diblokir, dan CSP tidak memblokir Cloudflare Web Analytics.
