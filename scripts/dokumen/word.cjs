// FUSIONIFY UI · template Word (.docx).
//   node scripts/dokumen/word.cjs   → dokumen/office/FUSIONIFY-Surat.docx, FUSIONIFY-Dokumen.docx, FUSIONIFY-Perjanjian.docx
// Warna dan huruf mengikuti css/tokens.css. Huruf FUSIONIFY (OFL) ditanam di file .docx,
// jadi tampil benar walau penerima belum memasang hurufnya.
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, AlignmentType, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, TabStopType, PageNumber, LevelFormat, HeadingLevel, CharacterSet,
  PageBreak, VerticalAlign, LineRuleType,
} = require("docx");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(ROOT, "dokumen", "office");
const A = (f) => fs.readFileSync(path.join(OUT, "aset", f));
const TTF = (f) => fs.readFileSync(path.join(ROOT, "tokens", "fonts-ttf", f));

// Token (css/tokens.css)
const C = { blue: "0D6CD7", deep: "0261CD", light: "539DE9", ink: "0B0F1A", ink2: "3A4458", ink3: "566175", surface: "EAF4FF", paper: "F7FBFF", line: "D3E4F7",
  go: "157F3B", goBg: "E3F6E9", beta: "9A5B00", betaBg: "FFF2D8", wip: "8A4A00", wipBg: "FFE9D6", plan: "0261CD", planBg: "EEF7FF", eos: "5B6475", eosBg: "ECEFF4" };
const F = { head: "Afacad Flux ExtraBold", body: "Sansation", num: "Exo 2" };
const PERUSAHAAN = "PT FUSIONIFY DIGITAL STORE";
const KONTAK = "hello@fusionify.id  ·  +62 831-1138-0628  ·  fusionify.id";

const fonts = [
  { name: F.body, data: TTF("Sansation-Regular.ttf"), characterSet: CharacterSet.ANSI },
  { name: F.head, data: TTF("AfacadFlux-ExtraBold.ttf"), characterSet: CharacterSet.ANSI },
  { name: F.num, data: TTF("Exo2-Regular.ttf"), characterSet: CharacterSet.ANSI },
];

// A4 dalam DXA; margin 2 cm kiri-kanan
const PAGE = { size: { width: 11906, height: 16838 }, margin: { top: 2268, right: 1134, bottom: 1418, left: 1134, header: 567, footer: 567 } };
const LEBAR = 11906 - 1134 * 2;

const styles = {
  default: { document: { run: { font: F.body, size: 21, color: C.ink }, paragraph: { spacing: { after: 120, line: 300, lineRule: LineRuleType.AUTO } } } },
  paragraphStyles: [
    { id: "Title", name: "Title", basedOn: "Normal", run: { font: F.head, size: 64, color: C.ink }, paragraph: { spacing: { after: 160, line: 240, lineRule: LineRuleType.AUTO } } },
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: F.head, size: 40, color: C.ink }, paragraph: { spacing: { before: 360, after: 160, line: 240, lineRule: LineRuleType.AUTO }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: F.head, size: 28, color: C.ink }, paragraph: { spacing: { before: 280, after: 100, line: 240, lineRule: LineRuleType.AUTO }, outlineLevel: 1 } },
    { id: "Kicker", name: "Kicker", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: F.num, size: 16, bold: true, color: C.deep, characterSpacing: 40, allCaps: true }, paragraph: { spacing: { before: 240, after: 40 } } },
    { id: "Keterangan", name: "Keterangan", basedOn: "Normal", quickFormat: true, run: { size: 17, color: C.ink3 } },
  ],
};

const numbering = { config: [
  { reference: "titik", levels: [{ level: 0, format: LevelFormat.BULLET, text: "●", alignment: AlignmentType.LEFT, style: { run: { color: C.light }, paragraph: { indent: { left: 567, hanging: 284 } } } }] },
  { reference: "angka", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 567, hanging: 284 } } } }] },
] };

// Teks yang wajib diganti: latar kuning muda (--beta-bg), sama seperti .ganti di template cetak
const G = (t, o = {}) => new TextRun({ text: t, shading: { type: ShadingType.CLEAR, fill: C.betaBg, color: "auto" }, ...o });
const T = (t, o = {}) => new TextRun({ text: t, ...o });
const P = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], ...o });
const tanpaGaris = { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } };
const tanpaGarisTabel = { ...tanpaGaris, insideHorizontal: tanpaGaris.top, insideVertical: tanpaGaris.top };

function kop() {
  const logo = new ImageRun({ type: "png", data: A("fusionify-logo-horizontal.png"), transformation: { width: 172, height: 54 }, altText: { title: "FUSIONIFY", description: "Logo FUSIONIFY", name: "logo" } });
  const kiri = new TableCell({ width: { size: 3600, type: WidthType.DXA }, borders: tanpaGaris, verticalAlign: VerticalAlign.CENTER, children: [P(logo)] });
  const kanan = new TableCell({ width: { size: LEBAR - 3600, type: WidthType.DXA }, borders: tanpaGaris, verticalAlign: VerticalAlign.CENTER, children: [
    P(T(PERUSAHAAN, { font: F.head, size: 24 }), { alignment: AlignmentType.RIGHT, spacing: { after: 0 } }),
    P([G("Alamat lengkap kantor", { size: 16, color: C.ink2 }), T(", Bogor, Jawa Barat", { size: 16, color: C.ink2 })], { alignment: AlignmentType.RIGHT, spacing: { after: 0 } }),
    P(T(KONTAK, { size: 16, color: C.ink2 }), { alignment: AlignmentType.RIGHT, spacing: { after: 0 } }),
  ] });
  return new Header({ children: [
    new Table({ width: { size: LEBAR, type: WidthType.DXA }, columnWidths: [3600, LEBAR - 3600], borders: tanpaGarisTabel, rows: [new TableRow({ children: [kiri, kanan] })] }),
    // Garis kop: border bawah paragraf, bukan tabel
    P(T(""), { spacing: { after: 0 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.ink, space: 1 } } }),
  ] });
}

function kaki(kiriTeks) {
  return new Footer({ children: [P([
    T(kiriTeks, { font: F.num, size: 14, color: C.ink3 }),
    T("\t", {}),
    T("Halaman ", { font: F.num, size: 14, color: C.ink3 }),
    new TextRun({ children: [PageNumber.CURRENT], font: F.num, size: 14, color: C.ink3 }),
  ], { tabStops: [{ type: TabStopType.RIGHT, position: LEBAR }], border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.line, space: 4 } } })] });
}

// ---------- Surat resmi ----------
function surat() {
  const meta = (label, isi) => new TableRow({ children: [
    new TableCell({ width: { size: 1300, type: WidthType.DXA }, borders: tanpaGaris, children: [P(T(label), { spacing: { after: 20 } })] }),
    new TableCell({ width: { size: 250, type: WidthType.DXA }, borders: tanpaGaris, children: [P(T(":"), { spacing: { after: 20 } })] }),
    new TableCell({ width: { size: 4200, type: WidthType.DXA }, borders: tanpaGaris, children: [P(isi, { spacing: { after: 20 } })] }),
  ] });
  const body = [
    P([T("Bogor, "), G("26 Oktober 2026")], { alignment: AlignmentType.RIGHT, spacing: { before: 240 } }),
    new Table({ width: { size: 5750, type: WidthType.DXA }, columnWidths: [1300, 250, 4200], borders: tanpaGarisTabel, rows: [
      meta("Nomor", [G("007"), T("/SRT/FI/"), G("X"), T("/"), G("2026")]),
      meta("Lampiran", [G("1 (satu) berkas")]),
      meta("Perihal", [G("Permohonan kerja sama", { bold: true })]),
    ] }),
    P(T("Kepada Yth."), { spacing: { before: 360, after: 0 } }),
    P(G("Nama penerima", { bold: true }), { spacing: { after: 0 } }),
    P(G("Jabatan, nama instansi"), { spacing: { after: 0 } }),
    P([T("di "), G("Tempat")], { spacing: { after: 300 } }),
    P(T("Dengan hormat,")),
    P(G("Paragraf pembuka: perkenalan singkat dan maksud surat. Tulis dengan bahasa yang jelas dan sopan."), { alignment: AlignmentType.JUSTIFIED }),
    P(G("Paragraf isi: hal yang diminta atau disampaikan, beserta rincian penting."), { alignment: AlignmentType.JUSTIFIED }),
    P(G("Poin pertama, bila perlu dirinci."), { numbering: { reference: "angka", level: 0 }, spacing: { after: 60 } }),
    P(G("Poin kedua."), { numbering: { reference: "angka", level: 0 } }),
    P(T("Demikian surat ini kami sampaikan. Atas perhatian dan kerja samanya, kami ucapkan terima kasih."), { alignment: AlignmentType.JUSTIFIED }),
    P(T("Hormat kami,"), { alignment: AlignmentType.RIGHT, spacing: { before: 360, after: 0 }, indent: { left: 5800 } }),
    P(T(PERUSAHAAN, { bold: true }), { alignment: AlignmentType.RIGHT, spacing: { after: 1100 } }),
    P(G("Muhammad Jundy Rabbani, S.Kom.", { bold: true, underline: {} }), { alignment: AlignmentType.RIGHT, spacing: { after: 0 } }),
    P(G("Founder & CEO"), { alignment: AlignmentType.RIGHT }),
    P(T("Tembusan:", { bold: true, size: 17 }), { spacing: { before: 480, after: 0 } }),
    P([T("1. ", { size: 17 }), G("Arsip", { size: 17 })]),
  ];
  return new Document({
    creator: PERUSAHAAN, title: "Surat resmi FUSIONIFY", description: "Template surat resmi. Ganti semua teks berlatar kuning.",
    styles, numbering, fonts,
    sections: [{ properties: { page: PAGE }, headers: { default: kop() }, footers: { default: kaki("PT FUSIONIFY DIGITAL STORE  ·  Fuse Ideas. Build Progress.") }, children: body }],
  });
}

// ---------- Dokumen umum (proposal, laporan) ----------
function dokumen() {
  const sampul = [
    P(new ImageRun({ type: "png", data: A("fusionify-wordmark.png"), transformation: { width: 230, height: 49 }, altText: { title: "FUSIONIFY", description: "Wordmark FUSIONIFY", name: "wordmark" } }), { spacing: { before: 400, after: 1400 } }),
    P(G("PROPOSAL · 2026", { font: F.num, bold: true, size: 18, color: C.deep, characterSpacing: 40 })),
    P([G("Judul dokumen yang jelas"), T(".", { color: C.light })], { style: "Title" }),
    P(G("Satu kalimat ringkasan isi dokumen.", { size: 26, color: C.ink2 }), { spacing: { after: 600 } }),
    P(new ImageRun({ type: "png", data: A("maskot-glasses.png"), transformation: { width: 210, height: 274 }, altText: { title: "Maskot FUSIONIFY", description: "Maskot FUSIONIFY berkacamata", name: "maskot" } }), { alignment: AlignmentType.RIGHT, spacing: { after: 600 } }),
    P(T(PERUSAHAAN, { font: F.head, size: 26 }), { spacing: { after: 0 } }),
    P([T("Disiapkan untuk ", { color: C.ink3 }), G("nama penerima"), T("  ·  ", { color: C.ink3 }), G("26 Oktober 2026")]),
    P(new PageBreak()),
  ];
  const sel = (teks, o = {}) => new TableCell({ width: { size: o.w, type: WidthType.DXA }, shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 90, bottom: 90, left: 140, right: 140 }, borders: { top: { style: BorderStyle.SINGLE, size: 4, color: C.line }, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.line }, left: tanpaGaris.left, right: tanpaGaris.right },
    children: [P(Array.isArray(teks) ? teks : [teks], { spacing: { after: 0 } })] });
  const KOL = [3000, LEBAR - 3000 - 2600, 2600];
  const kepala = new TableRow({ tableHeader: true, children: ["PRODUK", "KETERANGAN", "STATUS"].map((h, i) => sel(T(h, { font: F.num, bold: true, size: 15, color: "FFFFFF", characterSpacing: 20 }), { w: KOL[i], fill: C.ink })) });
  const status = [["Aktif", C.go, C.goBg], ["Beta", C.beta, C.betaBg], ["Dalam pengembangan", C.wip, C.wipBg], ["Direncanakan", C.plan, C.planBg], ["Layanan berakhir", C.eos, C.eosBg]];
  const baris = status.map(([s, warna, latar]) => new TableRow({ children: [
    sel(G("Nama produk", { bold: true }), { w: KOL[0] }), sel(G("Keterangan singkat"), { w: KOL[1] }),
    sel(T(` ● ${s} `, { font: F.num, bold: true, size: 15, color: warna, shading: { type: ShadingType.CLEAR, fill: latar, color: "auto" } }), { w: KOL[2] }),
  ] }));
  const catatan = new Table({ width: { size: LEBAR, type: WidthType.DXA }, columnWidths: [1300, LEBAR - 1300], borders: tanpaGarisTabel, rows: [new TableRow({ children: [
    new TableCell({ width: { size: 1300, type: WidthType.DXA }, borders: tanpaGaris, shading: { fill: C.surface, type: ShadingType.CLEAR, color: "auto" }, verticalAlign: VerticalAlign.CENTER, margins: { top: 120, bottom: 120, left: 160, right: 80 },
      children: [P(new ImageRun({ type: "png", data: A("kepala-wink.png"), transformation: { width: 52, height: 52 }, altText: { title: "Maskot", description: "Kepala maskot mengedip", name: "kepala" } }), { spacing: { after: 0 } })] }),
    new TableCell({ width: { size: LEBAR - 1300, type: WidthType.DXA }, borders: tanpaGaris, shading: { fill: C.surface, type: ShadingType.CLEAR, color: "auto" }, verticalAlign: VerticalAlign.CENTER, margins: { top: 120, bottom: 120, left: 80, right: 200 },
      children: [P([T("Catatan. ", { bold: true }), G("Kotak catatan untuk hal penting yang tidak boleh terlewat.")], { spacing: { after: 0 } })] }),
  ] })] });
  const isi = [
    P(G("Bagian 1"), { style: "Kicker" }),
    P([G("Latar belakang"), T(".", { color: C.light })], { heading: HeadingLevel.HEADING_1 }),
    P(G("Paragraf isi. Tulis santai, jelas, dan manusiawi. Satu paragraf satu gagasan. Hindari em dash; pakai koma, titik dua, atau kalimat baru."), { alignment: AlignmentType.JUSTIFIED }),
    P(G("Sub judul"), { heading: HeadingLevel.HEADING_2 }),
    P(G("Poin pertama"), { numbering: { reference: "titik", level: 0 }, spacing: { after: 60 } }),
    P(G("Poin kedua"), { numbering: { reference: "titik", level: 0 } }),
    P(T("Status produk"), { heading: HeadingLevel.HEADING_2 }),
    new Table({ width: { size: LEBAR, type: WidthType.DXA }, columnWidths: KOL, borders: { top: { style: BorderStyle.SINGLE, size: 12, color: C.ink }, bottom: { style: BorderStyle.SINGLE, size: 12, color: C.ink }, left: { style: BorderStyle.SINGLE, size: 12, color: C.ink }, right: { style: BorderStyle.SINGLE, size: 12, color: C.ink }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: C.line }, insideVertical: tanpaGaris.left }, rows: [kepala, ...baris] }),
    P(T("Status ditulis apa adanya. Jangan menaikkan status produk.", { size: 17, color: C.ink3 }), { spacing: { before: 80, after: 240 } }),
    catatan,
  ];
  return new Document({
    creator: PERUSAHAAN, title: "Dokumen FUSIONIFY", description: "Template proposal dan laporan. Ganti semua teks berlatar kuning.",
    styles, numbering, fonts,
    sections: [
      { properties: { page: { size: PAGE.size, margin: { top: 1418, right: 1418, bottom: 1418, left: 1418 } } }, children: sampul },
      { properties: { page: PAGE }, headers: { default: new Header({ children: [P(new ImageRun({ type: "png", data: A("fusionify-wordmark.png"), transformation: { width: 110, height: 23 }, altText: { title: "FUSIONIFY", description: "Wordmark", name: "wm" } }), { alignment: AlignmentType.RIGHT })] }) },
        footers: { default: kaki("Judul dokumen  ·  FUSIONIFY") }, children: isi },
    ],
  });
}


// ---------- Perjanjian kerja sama (PRJ) ----------
// Kerangka umum, bukan nasihat hukum. Untuk nilai besar atau jangka panjang, minta notaris/konsultan memeriksa.
function perjanjian() {
  const tengah = (children, o = {}) => P(children, { alignment: AlignmentType.CENTER, ...o });
  const pihak = (rows) => new Table({ width: { size: LEBAR, type: WidthType.DXA }, columnWidths: [400, 1700, 250, LEBAR - 2350], borders: tanpaGarisTabel,
    rows: rows.map(([no, l, isi]) => new TableRow({ children: [
      new TableCell({ width: { size: 400, type: WidthType.DXA }, borders: tanpaGaris, children: [P(T(no), { spacing: { after: 0 } })] }),
      new TableCell({ width: { size: 1700, type: WidthType.DXA }, borders: tanpaGaris, children: [P(T(l), { spacing: { after: 0 } })] }),
      new TableCell({ width: { size: 250, type: WidthType.DXA }, borders: tanpaGaris, children: [P(T(":"), { spacing: { after: 0 } })] }),
      new TableCell({ width: { size: LEBAR - 2350, type: WidthType.DXA }, borders: tanpaGaris, children: [P(isi, { spacing: { after: 0 } })] }),
    ] })) });
  const pasal = (n, judul, butir) => [
    P(T(`Pasal ${n}`, { font: F.head, size: 24 }), { alignment: AlignmentType.CENTER, spacing: { before: 240, after: 0 }, keepNext: true, keepLines: true }),
    P(T(judul, { bold: true, color: C.ink2 }), { alignment: AlignmentType.CENTER, spacing: { after: 80 }, keepNext: true }),
    // keepNext + keepLines: satu pasal tidak terpotong di pergantian halaman
    ...butir.map((b, i) => P(b, { numbering: { reference: `pasal-${n}`, level: 0 }, alignment: AlignmentType.JUSTIFIED, spacing: { after: 60 }, keepLines: true, keepNext: i < butir.length - 1 })),
  ];
  const PASAL = [
    ["Ruang Lingkup", [[T("PIHAK PERTAMA mengerjakan "), G("pembuatan website company profile"), T(" untuk PIHAK KEDUA dengan rincian pada Lampiran 1.")], [T("Pekerjaan di luar Lampiran 1 dihitung terpisah setelah disetujui PARA PIHAK secara tertulis.")]]],
    ["Jangka Waktu", [[T("Pekerjaan diselesaikan dalam "), G("21 (dua puluh satu) hari kerja"), T(" sejak pembayaran awal diterima dan bahan dari PIHAK KEDUA lengkap.")], [T("Keterlambatan karena bahan atau persetujuan dari PIHAK KEDUA tidak dihitung sebagai keterlambatan PIHAK PERTAMA.")]]],
    ["Nilai dan Cara Pembayaran", [[T("Nilai pekerjaan sebesar "), G("Rp2.500.000 (dua juta lima ratus ribu rupiah)", { bold: true }), T(".")], [T("Pembayaran: "), G("50% di awal dan 50% setelah serah terima"), T(", ditransfer ke rekening PT FUSIONIFY DIGITAL STORE "), G("nama bank dan nomor rekening"), T(".")], [T("Setiap pembayaran disertai invoice dan kuitansi dari PIHAK PERTAMA.")]]],
    ["Hak dan Kewajiban", [[T("PIHAK PERTAMA wajib mengerjakan pekerjaan sesuai ruang lingkup, memberi kabar kemajuan secara berkala, dan memperbaiki kesalahan yang ditemukan selama masa garansi "), G("30 (tiga puluh) hari"), T(" setelah serah terima.")], [T("PIHAK KEDUA wajib menyediakan bahan (teks, logo, foto, akses) tepat waktu, memberi masukan paling lambat "), G("3 (tiga) hari kerja"), T(" setelah diminta, dan membayar sesuai Pasal 3.")], [T("Revisi termasuk dalam nilai pekerjaan sebanyak "), G("2 (dua) kali"), T("; revisi berikutnya dihitung terpisah.")]]],
    ["Kerahasiaan dan Data Pribadi", [[T("PARA PIHAK wajib merahasiakan informasi yang diterima dari pihak lain selama dan setelah perjanjian ini berakhir, kecuali diwajibkan oleh hukum.")], [T("Data pribadi yang diolah dalam pekerjaan ini hanya dipakai untuk keperluan pekerjaan dan dilindungi sesuai peraturan perundang-undangan tentang pelindungan data pribadi.")]]],
    ["Hak Kekayaan Intelektual", [[T("Setelah pembayaran lunas, hak atas hasil akhir pekerjaan beralih kepada PIHAK KEDUA.")], [T("Pustaka, kerangka kerja, dan alat milik PIHAK PERTAMA atau pihak ketiga yang dipakai dalam pekerjaan tetap milik pemiliknya; PIHAK KEDUA mendapat hak pakai sesuai lisensinya.")], [T("PIHAK PERTAMA boleh mencantumkan pekerjaan ini di portofolio, kecuali PIHAK KEDUA menyatakan keberatan secara tertulis.")]]],
    ["Keadaan Kahar", [[T("Keadaan kahar adalah kejadian di luar kendali PARA PIHAK, seperti bencana alam, kebakaran, gangguan listrik atau internet yang meluas, dan kebijakan pemerintah, yang membuat kewajiban tidak dapat dilaksanakan.")], [T("Pihak yang mengalaminya memberi tahu pihak lain paling lambat "), G("7 (tujuh) hari"), T(", dan jangka waktu disesuaikan bersama.")]]],
    ["Pengakhiran", [[T("Perjanjian dapat diakhiri lebih awal atas kesepakatan tertulis PARA PIHAK.")], [T("Bila diakhiri oleh PIHAK KEDUA sebelum pekerjaan selesai, pembayaran yang sudah diterima tidak dikembalikan dan pekerjaan yang sudah selesai diserahkan sesuai keadaannya.")]]],
    ["Penyelesaian Perselisihan", [[T("Perselisihan diselesaikan lebih dahulu secara musyawarah untuk mufakat.")], [T("Bila tidak tercapai dalam "), G("30 (tiga puluh) hari"), T(", PARA PIHAK sepakat memilih domisili hukum di Kepaniteraan "), G("Pengadilan Negeri Cibinong"), T(".")]]],
    ["Penutup", [[T("Hal yang belum diatur akan dituangkan dalam addendum yang disepakati PARA PIHAK dan menjadi bagian tidak terpisahkan dari perjanjian ini.")], [T("Perjanjian ini dibuat rangkap 2 (dua), masing-masing bermaterai cukup dan mempunyai kekuatan hukum yang sama, serta berlaku sejak ditandatangani PARA PIHAK.")]]],
  ];
  const kolomTtd = (judul, inst, nama, jabatan) => new TableCell({ width: { size: LEBAR / 2, type: WidthType.DXA }, borders: tanpaGaris, children: [
    tengah(T(judul, { bold: true }), { spacing: { after: 0 } }),
    tengah(inst, { spacing: { after: 200 } }),
    tengah(T("MATERAI Rp10.000", { font: F.num, size: 14, color: C.ink3 }), { spacing: { before: 200, after: 500 } }),
    tengah(nama, { spacing: { after: 0 } }),
    tengah(jabatan),
  ] });
  const isi = [
    tengah(T("PERJANJIAN KERJA SAMA", { font: F.head, size: 34 }), { spacing: { before: 200, after: 0 } }),
    tengah(G("Pembuatan Website Company Profile", { bold: true }), { spacing: { after: 0 } }),
    tengah([T("Nomor: ", { color: C.ink2 }), G("001"), T("/PRJ/FI/"), G("X"), T("/"), G("2026")], { spacing: { after: 300 } }),
    P([T("Pada hari ini "), G("Senin"), T(", tanggal "), G("26 Oktober 2026"), T(", bertempat di "), G("Bogor"), T(", yang bertanda tangan di bawah ini:")], { alignment: AlignmentType.JUSTIFIED }),
    pihak([["1.", "Nama", G("Muhammad Jundy Rabbani, S.Kom.", { bold: true })], ["", "Jabatan", G("Founder & CEO")], ["", "Alamat", G("Alamat kantor PT FUSIONIFY DIGITAL STORE")]]),
    P([T("dalam hal ini bertindak untuk dan atas nama PT FUSIONIFY DIGITAL STORE, selanjutnya disebut "), T("PIHAK PERTAMA", { bold: true }), T(".")], { alignment: AlignmentType.JUSTIFIED, spacing: { before: 80 } }),
    pihak([["2.", "Nama", G("Nama perwakilan klien", { bold: true })], ["", "Jabatan", G("Jabatan")], ["", "Instansi", G("Nama instansi atau usaha")], ["", "Alamat", G("Alamat instansi")]]),
    P([T("dalam hal ini bertindak untuk dan atas nama "), G("nama instansi"), T(", selanjutnya disebut "), T("PIHAK KEDUA", { bold: true }), T(".")], { alignment: AlignmentType.JUSTIFIED, spacing: { before: 80 } }),
    P([T("PIHAK PERTAMA dan PIHAK KEDUA, yang bersama-sama disebut "), T("PARA PIHAK", { bold: true }), T(", sepakat mengadakan perjanjian dengan ketentuan sebagai berikut.")], { alignment: AlignmentType.JUSTIFIED }),
    ...PASAL.flatMap(([judul, butir], i) => pasal(i + 1, judul, butir)),
    new Table({ width: { size: LEBAR, type: WidthType.DXA }, columnWidths: [LEBAR / 2, LEBAR / 2], borders: tanpaGarisTabel, rows: [new TableRow({ cantSplit: true, children: [
      kolomTtd("PIHAK PERTAMA", T("PT FUSIONIFY DIGITAL STORE"), G("Muhammad Jundy Rabbani, S.Kom.", { bold: true, underline: {} }), G("Founder & CEO")),
      kolomTtd("PIHAK KEDUA", G("Nama instansi"), G("Nama perwakilan klien", { bold: true, underline: {} }), G("Jabatan")),
    ] })] }),
    P(T("Lampiran 1 · Rincian pekerjaan", { font: F.num, bold: true, size: 16, color: C.deep, allCaps: true, characterSpacing: 30 }), { spacing: { before: 400, after: 60 }, keepNext: true }),
    P(G("Desain dan pengembangan 5 halaman: Beranda, Tentang, Layanan, Portofolio, Kontak"), { numbering: { reference: "angka", level: 0 }, spacing: { after: 40 } }),
    P(G("Tampilan responsif untuk HP, tablet, dan desktop"), { numbering: { reference: "angka", level: 0 }, spacing: { after: 40 } }),
    P(G("Domain dan hosting 1 tahun"), { numbering: { reference: "angka", level: 0 } }),
  ];
  // Setiap pasal punya penomoran sendiri supaya butirnya mulai dari 1 lagi
  const num = { config: [...numbering.config, ...PASAL.map((_, i) => ({ reference: `pasal-${i + 1}`, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 567, hanging: 284 } } } }] }))] };
  return new Document({
    creator: PERUSAHAAN, title: "Perjanjian kerja sama FUSIONIFY", description: "Template perjanjian. Kerangka umum, bukan nasihat hukum. Ganti semua teks berlatar kuning.",
    styles, numbering: num, fonts,
    sections: [{ properties: { page: PAGE }, headers: { default: kop() }, footers: { default: kaki("Perjanjian 001/PRJ/FI  ·  Paraf: ______ / ______") }, children: isi }],
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [nama, doc] of [["FUSIONIFY-Surat.docx", surat()], ["FUSIONIFY-Dokumen.docx", dokumen()], ["FUSIONIFY-Perjanjian.docx", perjanjian()]]) {
    fs.writeFileSync(path.join(OUT, nama), await Packer.toBuffer(doc));
    console.log(`✓ dokumen/office/${nama}`);
  }
})();
