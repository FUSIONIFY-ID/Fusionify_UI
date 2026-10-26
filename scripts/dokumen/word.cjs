// FUSIONIFY UI · template Word (.docx).
//   node scripts/dokumen/word.cjs   → dokumen/office/FUSIONIFY-Surat.docx dan FUSIONIFY-Dokumen.docx
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
      meta("Nomor", [G("007"), T("/SRT/FDS/"), G("X"), T("/"), G("2026")]),
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

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [nama, doc] of [["FUSIONIFY-Surat.docx", surat()], ["FUSIONIFY-Dokumen.docx", dokumen()]]) {
    fs.writeFileSync(path.join(OUT, nama), await Packer.toBuffer(doc));
    console.log(`✓ dokumen/office/${nama}`);
  }
})();
