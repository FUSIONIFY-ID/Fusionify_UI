# DESIGN.md · FUSIONIFY UI

Pedoman visual resmi semua web FUSIONIFY. Diambil dari **fusionify.id** (web company, live di https://fusionify.id), yang menjadi sumber kebenaran. Kalau fusionify.id berubah, file ini ikut diperbarui.

Identitasnya dibangun dari aset FUSIONIFY sendiri: segel bergelombang di logo, titik huruf i, biru logo, dan maskot.

## Prinsip

1. **Maskot adalah pemandu.** Dia bereaksi (malu saat didekati, mengedip saat dicolek, ngambek kalau dicolek terus, ngantuk kalau ditinggal), dan ekspresinya mengikuti status produk.
2. **Jujur itu bagian dari desain.** Status produk selalu terlihat sebagai chip berwarna. Tidak ada angka atau testimoni karangan.
3. **Hidup tapi ringan.** Hanya `transform` dan `opacity` yang dianimasikan. Animasi berhenti saat tidak terlihat dan mati total untuk `prefers-reduced-motion`.
4. **Tegas seperti stiker.** Garis tepi 2px (`--edge`), bayangan pejal (`--edge-shadow`) ke bawah, sudut bulat besar.

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
| `--on-dark` / `--on-dark-2` | #FFFFFF / #F2F8FF | teks dan ikon di atas biru atau latar malam |
| `--danger-fill` | #C4323A | tombol bahaya, badge angka (teks putih) |
| `--warn-fill` | #E8A33D | progres peringatan, meter password sedang |
| `--online` | #2FBF63 | titik status online |
| `--bintang` | #F0A800 | isi bintang rating |
| `--night-*`, `--code-*` | | teks dan garis footer produk, blok kode (selalu gelap) |

Chip status: hijau `go` (aktif/live), kuning `beta`, oranye `wip` (dalam pengembangan), biru `plan` (direncanakan/eksperimen), abu `eos` (layanan berakhir).

Jangan menulis warna hex baru di proyek. Kalau butuh warna baru, tambahkan dulu ke `css/tokens.css` di kit ini.

## Mode gelap

Latar malam FUSIONIFY (`#071022`), kartu biru tua (`#10203F`), teks terang (`#EAF3FF`), garis stiker biru redup (`#2E5592`) dengan bayangan pejal hampir hitam. Biru FUSIONIFY sebagai warna isi (tombol, seksi biru, KPI biru) **tidak berubah**; teks biru dibuat lebih terang (`#8CC0FF`) supaya terbaca. Chip status punya pasangan warna gelapnya sendiri. Gaya stiker tetap: garis 2px dan bayangan pejal ke bawah.

Bawaan mengikuti sistem; tombol bulan/matahari menyimpan pilihan pengguna.

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
- **Gaya stiker**: `.card`, `.stat`, `.btn`, `.toast` semuanya bergaris 2px `--edge` dengan bayangan pejal `--edge-shadow` ke bawah.

## Ikon

- **Garis 2px**, ujung dan sambungan bulat, kisi 24 × 24, tanpa isi. Tebalnya sama dengan garis stiker.
- **Titik i**: satu bulatan `--blue-light` di tempat yang bermakna (titik huruf i, ujung garis unduh dan grafik, lampu server, notifikasi, lubang label, antena bot). Ikon utilitas kecil (tutup, tambah, chevron, cek) tanpa titik.
- **Lingkaran segel** untuk ikon status (info, berhasil, galat, bantuan, jam) dan matahari; **mata panah melengkung** dengan ekor berakhir di titik i untuk semua panah.
- Garis ikut warna teks; titik tetap biru muda, kecuali `.ikon.polos` (satu warna, mis. di atas foto).
- Wadah: `.ikon-stiker` (ubin bergaris 2px dengan bayangan pejal; putih, biru, atau tint) untuk kartu fitur dan dasbor, `.ikon-segel` untuk kartu layanan.
- Ikon khas: segel (juga ikon setelan), titik i, fusi (dua lingkaran bertemu, "Fuse Ideas"), progres (tangga naik, "Build Progress"), kepala maskot.
- Logo sosmed: satu warna dalam ubin stiker 44px, berubah biru saat disorot. Di footer malam dan seksi biru: garis putih tipis tanpa bayangan.

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
| glasses | layanan profesional, perawatan |
| welcome | layar pertama, selesai daftar |
| loading | proses lama, data sedang disiapkan |
| empty | belum ada data, hasil pencarian kosong |
| paid | pembayaran berhasil |
| pay-failed | pembayaran gagal, kartu ditolak |
| offline | tidak ada internet (halaman offline, `.state.offline`) |

- Ganti ekspresi dengan **menukar gambar badan penuh**. Jangan menempel kepala di atas badan lain karena wajah lama ikut terlihat.
- **Pose baru**: bebas dan hidup (berlari, melompat, jinjit, lebay), jangan kaku. Yang wajib sama: wajah, mata abu tua, rambut putih ujung biru dengan helai mencuat, pipi merah, garis tebal merah tua. Baju bawaan jaket hitam terbuka (kerah dan ujung lengan abu) dengan kaus putih; boleh ganti kalau situasinya butuh. Cara membuat dan memasang pose ada di `mascot/POSE-BARU.md`.
- Gelembung bicara (`.bubble`, Caveat) tidak boleh menutupi wajah, rambut, atau judul.
- Stiker (order, proses, done, batal) hanya untuk obrolan bot.
- Tampil kecil: pakai `-420.webp` / `-120.webp` dengan `srcset`. Semua `<img>` wajib `width` dan `height`.

## Gerak (`js/motion.js`)

- Smooth scroll Lenis (`lerp 0.1`), khusus mouse/trackpad. Layar sentuh (termasuk HP dalam mode "Situs desktop") memakai scroll bawaan browser.
- Nav transparan di atas, berubah jadi kapsul putih blur setelah scroll >24px (lapisan `::before` yang memudar masuk, posisi naik 6px lewat transform), sembunyi saat scroll turun, muncul saat scroll naik.
- Menu HP: lingkaran biru membesar dari tombol menu sampai menutup layar (pseudo-element yang di-scale, bukan clip-path), lalu isi menu memudar naik.
- Muncul saat scroll: judul naik per kata (`data-split`), elemen naik dan memudar masuk (`data-reveal`), kartu "dirakit" dari posisi acak (`data-assemble`), angka naik (`data-count-to`).
- Kursor: titik biru muda + cincin segel; membesar (scale) dan berputar di atas tautan, mengecil sedikit saat ditekan; label tulisan tangan lewat `data-cursor-label`. Hanya di perangkat bermouse.
- Efek magnet pada tautan kontak besar (`data-magnetic`).
- Tombol salin (`data-copy`) dengan notifikasi maskot (toast, hilang setelah 2,6 detik).
- Transisi halaman: segel biru membesar menutup layar, kepala mengedip, lalu menyusut di halaman baru.
- Suara disintesis Web Audio, **mati secara bawaan**, dinyalakan lewat tombol speaker.
- Tombol dan kartu stiker saat disorot: hanya naik-turun (transform) yang beranimasi; bayangan pejal berubah seketika, seperti stiker yang ditekan.

## Aplikasi (dashboard, admin, masuk)

- Sidebar putih/biru tua bergaris stiker; menu aktif berupa kapsul biru dengan bayangan pejal. Di HP sidebar menjadi laci yang meluncur dari kiri.
- Kartu KPI bergaya stiker; satu KPI utama boleh biru penuh. Grafik sederhana dengan gradasi biru muda ke biru.
- Halaman masuk/daftar: panel biru dengan segel besar dan maskot di kiri (wink untuk masuk, happy untuk daftar, confused untuk lupa password, glasses untuk atur ulang), form di kanan. Di HP panel biru menyusut jadi kepala kecil.
- Modal konfirmasi berbahaya memakai maskot confused dan tombol `.btn.danger`.
- Gerak di aplikasi tenang: tanpa smooth scroll, kursor segel, atau reveal. Interaksi cukup transisi pendek.

## Aplikasi HP

- App bar di atas dengan judul besar (Afacad Flux) yang mengecil saat digulir. Navigation bar bawah bergaris stiker di atasnya; tujuan aktif berupa kapsul biru. Mulai 700px berganti jadi rail di kiri.
- FAB biru bergaya stiker (sudut 22px, bayangan pejal), satu per layar, melayang di atas navigation bar dan mengecil jadi ikon saat digulir.
- Bottom sheet dengan pegangan di atas, bisa ditarik ke bawah untuk menutup. Picker tanggal/jam muncul dari bawah di HP dan sebagai popover di layar lebar.
- Loading memakai segel FUSIONIFY yang berputar (`.spinner`), skeleton biru muda untuk isi yang sedang dimuat.
- Snackbar berlatar gelap (terang di mode gelap) dengan tombol aksi seperti "Batalkan".
- Kode OTP: kotak per digit bergaya stiker berhuruf Exo 2, dibagi 3-3 dengan tanda pisah; salah = garis merah dan getar pendek (mati saat kurangi gerakan).
- Upload: area biru muda bergaris putus-putus dengan ikon biru; berubah biru saat file diseret di atasnya. File tampil sebagai kartu stiker dengan pratinjau kecil.
- Chat: gelembung pesan bergaya stiker; pesan sendiri biru di kanan, pesan orang lain kartu di kiri. Indikator mengetik tiga titik. Di HP isi obrolan layar penuh dan tombol kembali menutupnya. Stiker maskot boleh dikirim sebagai pesan.
- Halaman/detail acara: poster biru persegi bergaya stiker dengan maskot dan segel, tanggal di kotak `.ev-date`, kartu pendaftaran dengan kuota lewat bottom sheet, tiket berkode setelah terdaftar. Di HP tombol daftar menempel di bawah layar.
- Stepper: lingkaran bernomor dengan garis putus-putus; langkah aktif biru bergaya stiker, langkah selesai berisi centang dan garisnya jadi utuh.
- Pusat notifikasi: panel stiker dari lonceng (di HP dari bawah), titik biru untuk yang belum dibaca, maskot happy saat semua sudah dibaca.
- Tabel urut: panah kecil di judul kolom; kolom yang aktif berwarna biru.
- Keadaan kosong/error/offline: maskot kecil, judul Afacad, satu kalimat, satu tombol. Error diberi garis putus-putus merah di atas latar merah muda; offline garis putus-putus biasa. Kosong pakai maskot empty, memuat loading, pembayaran paid/pay-failed. Halaman penuh 500 (maskot cry), offline (offline), perawatan (glasses).
- Bilah offline: kapsul kuning di atas layar dengan kepala maskot tired.
- Pemotong foto profil: jendela dengan area kotak bermotif papan catur, lingkaran putus-putus putih sebagai batas potong, slider zoom, tombol putar. Pratinjau foto bulat bergaris stiker.
- Aplikasi native memakai token dari `tokens/` dengan tampilan yang sama: garis 2px, bayangan pejal tanpa blur, huruf yang sama.

## Layout

- Lebar konten maksimal 1240px (`.wrap`) dengan gutter `clamp(16px, 4vw, 48px)`.
- Grid tanpa kartu yatim: 3 kolom di desktop, 2 di tablet (kartu terakhir yang sendirian dibuat lebar penuh), 1 di HP.
- Hero dua kolom mulai 700px; di bawahnya maskot di atas teks.
- Nav lengkap mulai 961px; di bawahnya tombol menu.
- Cover karya/produk rasio 1600:848, screenshot asli. Ilustrasi wajib diberi label `.cover-note` "Ilustrasi".
- Di layar sentuh: magnet, kursor khusus, dan parallax dimatikan.

## Komponen toko dan navigasi web

- **Breadcrumb**: tautan biru tebal dengan pemisah chevron kecil, halaman sekarang tebal warna tinta dan terpotong rapi kalau panjang. Di HP hanya dua tingkat terakhir, diawali "…".
- **Pagination**: angka Exo 2 dalam kotak 44px; halaman aktif berupa kotak biru bergaya stiker. Di HP sempit hanya panah dan halaman aktif.
- **Accordion**: satu kartu stiker berisi beberapa `<details>`, chevron berputar dengan pegas. FAQ halaman publik tetap `.faq`.
- **Input dengan awalan/akhiran**: satu bingkai stiker; awalan (Rp, ikon) dan akhiran (@domain, tombol) berlatar `--surface`.
- **Jumlah**: kapsul stiker dengan tombol − dan + bulat 44px, angka Exo 2 di tengah.
- **Rating**: bintang dari bentuk ikon `bintang`, isi warna `--bintang`, kosong warna `--line`. Bisa pecahan (4,5).
- **Kartu produk**: kartu stiker dengan gambar persegi, label diskon kapsul biru, kategori Exo 2 kapital, judul dua baris, rating, harga biru Exo 2 dengan harga coret abu. Di HP dua kolom. Stok habis: gambar dan tombol meredup.
- **Linimasa**: titik bergaris tinta; langkah selesai biru dengan garis utuh, langkah sekarang biru muda bercahaya, langkah berikutnya garis putus-putus, gagal merah.
- **Hitung mundur**: ubin stiker kecil per satuan (hari, jam, menit, detik), angka Exo 2 tabular.
- **Galeri**: ubin persegi bergaris stiker; lightbox gelap layar penuh dengan tombol bulat tembus pandang, bisa digeser di HP.
- **Pengumuman**: bilah biru penuh di atas halaman, teks putih tebal, tombol tutup bulat.
- **Persetujuan cookie**: kartu stiker mengambang di bawah tengah dengan kepala maskot wink, dua tombol yang sama menonjolnya.

## Dokumen

Surat, invoice, penawaran, kuitansi, proposal, slide, dan spreadsheet memakai sistem yang sama dengan web (template di `dokumen/`).

- **Kop surat**: logo horizontal di kiri, nama PT dan kontak publik rata kanan, garis tinta 2px di bawahnya.
- **Judul** Afacad Flux 800 dengan titik biru muda di akhir; **kicker** Exo 2 kapital bertitik; **teks** Sansation; **angka** Exo 2 tabular; **suara maskot** Caveat dalam gelembung stiker.
- **Tabel**: kepala tabel latar tinta dengan huruf putih Exo 2 kapital, baris selang-seling `--paper`, garis `--line`, bingkai stiker 2px bersudut bulat.
- **Total**: kapsul biru FUSIONIFY bergaya stiker dengan bayangan pejal.
- **Sampul dan slide pembuka/penutup**: latar biru, segel besar biru muda yang terpotong tepi, wordmark putih, maskot badan penuh. Slide bagian dan angka: latar malam.
- **Isian** yang wajib diganti selalu berlatar kuning muda (`--beta-bg`), di HTML, Word, dan Excel.
- Ukuran: A4 tegak untuk surat dan dokumen, A5 mendatar untuk kuitansi, 16:9 untuk slide, A4 mendatar untuk sertifikat, 210×99 mm untuk e-tiket, 90×55 mm untuk kartu nama.
- **Sertifikat**: bingkai stiker bersudut bulat, segel biru muda di pojok, nama penerima besar dengan garis tinta di bawahnya. Bawaan tanpa maskot karena dokumen resmi; maskot happy hanya untuk acara santai (komunitas, kelas internal).
- **E-tiket**: bagian utama biru (judul acara, nama peserta, tanggal, jam, tempat, maskot welcome) dan sobekan putih bergaris putus-putus dengan kode QR dan kode tiket.
- **Kartu nama**: depan biru dengan logo horizontal putih dan tagline, belakang putih dengan nama, jabatan, dan kontak publik.

## Halaman produk yang sering dipakai

- **Bayar QRIS**: satu kolom tenang (maks 480px), kartu stiker berisi jumlah besar Exo 2, kode QR di kotak putih berlabel "QRIS", bilah sisa waktu biru (merah saat sisa <20%), dua tombol. Keadaan berhasil (paid), kedaluwarsa (tired), gagal (pay-failed) menukar isi kartu. Tanpa nama penyedia pembayaran.
- **Status layanan**: banner hijau/kuning/merah bergaya stiker dengan kepala maskot, daftar layanan dengan batang uptime per hari (hijau/kuning/merah), riwayat gangguan berupa garis waktu putus-putus.
- **Dokumentasi**: menu samping dengan item aktif kapsul biru, blok kode berlatar malam bergaris stiker dengan tombol Salin, lencana metode (`GET` hijau, `POST` biru, `PUT/PATCH` kuning, `DELETE` merah), daftar isi kanan yang mengikuti bacaan.
- **Legal**: judul besar, tombol pindah Privasi/Syarat, daftar isi bernomor di kotak `--surface`, bagian bernomor otomatis.

## Grafis media sosial

- Latar biru, kertas (`--paper` dengan cahaya biru muda), atau malam; segel besar terpotong tepi sebagai hiasan.
- Wordmark di kiri atas, kicker bertitik, judul Afacad 800 yang sangat besar dengan titik biru muda, chip status besar bergaris, maskot badan penuh yang boleh terpotong tepi bawah atau kanan.
- Daftar bernomor berupa kartu stiker dengan lingkaran biru; gelembung bicara Caveat.
- Tidak ada teks di bawah maskot, foto stok, gradien ungu, atau emoji sebagai hiasan.

## Email

- Latar `--paper`, satu kartu putih bergaris tinta 2px dengan "bayangan" `border-bottom` 6px, sudut 24px.
- Logo di atas kartu; kicker Exo 2 kapital bertitik; judul Afacad 800 dengan titik biru muda; maskot kecil (110×138) di kanan judul, disembunyikan di HP.
- Rincian dalam tabel stiker; tombol kapsul biru bergaris tinta; catatan berlatar warna nada (`info`, `ok`, `warn`, `danger`); kode OTP dalam kotak stiker Exo 2.
- Kaki: nama PT dan kontak publik, badge "Sebuah produk dari FUSIONIFY" untuk email produk.
- Tanda tangan email: segel Fi 56px, garis biru muda, nama Afacad dengan titik, jabatan Exo 2 kapital biru, kontak publik, nama PT. Tanpa gambar besar, kutipan, atau banner promosi.

## Batas

- Semua kode ditulis sendiri. Jangan meniru situs lain, khususnya andikadevs: tidak ada maskot terbang ke pojok nav, pintu di huruf wordmark, tumpukan awan, atau laut dan kapal.
- Jangan memakai template UI generik (gradien ungu, kartu kaca, ikon emoji sebagai hiasan utama). Kalau terasa seperti template, berarti belum FUSIONIFY.
