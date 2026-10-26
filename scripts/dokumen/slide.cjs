// FUSIONIFY UI · template PowerPoint (.pptx), dibangun terstruktur: tema, layout bernama, placeholder.
//   node scripts/dokumen/slide.cjs   → dokumen/office/FUSIONIFY-Slide.pptx
// Layout: FY Judul, FY Bagian, FY Isi, FY Judul saja, FY Angka, FY Penutup.
// Di PowerPoint: Beranda → Layout untuk memakai layout yang sama di slide baru.
// Huruf: pasang dulu tokens/fonts-ttf/*.ttf (Afacad Flux, Sansation, Exo 2, Caveat) di komputer yang membuka file ini.
const path = require("path");
const pptxgen = require("pptxgenjs");
const { terapkanTema } = require("./tema_pptx.cjs");

const ROOT = path.resolve(__dirname, "..", "..");
const ASET = (f) => path.join(ROOT, "dokumen", "office", "aset", f);
const OUT = path.join(ROOT, "dokumen", "office", "FUSIONIFY-Slide.pptx");

// Token (css/tokens.css) → tema PowerPoint
const THEME = {
  name: "FUSIONIFY",
  headFontFace: "Afacad Flux ExtraBold",
  bodyFontFace: "Sansation",
  colors: {
    dk1: "0B0F1A", lt1: "FFFFFF", dk2: "071022", lt2: "F7FBFF",
    accent1: "0D6CD7", accent2: "539DE9", accent3: "0261CD", accent4: "157F3B", accent5: "9A5B00", accent6: "8A4A00",
    hlink: "0261CD", folHlink: "0261CD",
  },
};
const HEX = { ink: "0B0F1A", ink2: "3A4458", ink3: "566175", blue: "0D6CD7", light: "539DE9", surface: "EAF4FF", paper: "F7FBFF", night: "071022", card: "0F2040", edgeDark: "2E5592", onBlue: "F2F8FF", onBlueSoft: "BFE0FF", line: "D3E4F7", betaBg: "FFF2D8" };
const W = 10, H = 5.625;

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "PT FUSIONIFY DIGITAL STORE";
pres.company = "PT FUSIONIFY DIGITAL STORE";
pres.title = "Template slide FUSIONIFY";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

const kakiTeks = (warna) => ({ text: { text: "FUSIONIFY · Fuse Ideas. Build Progress.", options: { x: 0.6, y: 5.2, w: 6, h: 0.25, fontSize: 9, fontFace: "Exo 2", color: warna, charSpacing: 1, margin: 0 } } });
const nomor = (warna) => ({ x: 9.0, y: 5.2, w: 0.4, h: 0.25, fontSize: 9, fontFace: "Exo 2", color: warna, align: "right" });

pres.defineSlideMaster({
  title: "FY Judul",
  background: { color: HEX.blue },
  objects: [
    { image: { path: ASET("segel-biru.png"), x: 6.2, y: -1.6, w: 5.6, h: 5.6 } },
    { image: { path: ASET("fusionify-wordmark-white.png"), x: 0.6, y: 0.5, w: 1.95, h: 0.415 } },
    { image: { path: ASET("maskot-happy.png"), x: 6.55, y: 1.15, w: 3.5, h: 4.47 } },
    { placeholder: { options: { name: "kicker", type: "body", align: "left", x: 0.6, y: 1.55, w: 5.4, h: 0.35, fontFace: "Exo 2", fontSize: 11, bold: true, color: C.background1, charSpacing: 3, margin: 0 }, text: "JENIS PRESENTASI · 2026" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 1.95, w: 5.6, h: 1.9, fontSize: 46, color: C.background1, valign: "top", margin: 0 }, text: "Judul presentasi" } },
    { placeholder: { options: { name: "body", type: "body", align: "left", x: 0.6, y: 3.9, w: 5.4, h: 0.7, fontSize: 15, color: C.background1, valign: "top", margin: 0 }, text: "Satu kalimat yang menjelaskan isinya." } },
    { text: { text: "PT FUSIONIFY DIGITAL STORE", options: { x: 0.6, y: 4.95, w: 5, h: 0.3, fontFace: "Afacad Flux ExtraBold", fontSize: 13, color: "FFFFFF", margin: 0 } } },
  ],
});

pres.defineSlideMaster({
  title: "FY Bagian",
  background: { color: HEX.night },
  objects: [
    { image: { path: ASET("segel-biru-tua.png"), x: 6.4, y: 1.0, w: 5.2, h: 5.2 } },
    { placeholder: { options: { name: "kicker", type: "body", align: "left", x: 0.6, y: 1.8, w: 6, h: 0.35, fontFace: "Exo 2", fontSize: 11, bold: true, color: C.accent2, charSpacing: 3, margin: 0 }, text: "BAGIAN 1" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 2.2, w: 6.4, h: 1.5, fontSize: 44, color: C.background1, valign: "top", margin: 0 }, text: "Judul bagian" } },
    kakiTeks(HEX.onBlueSoft),
  ],
  slideNumber: nomor(HEX.onBlueSoft),
});

pres.defineSlideMaster({
  title: "FY Isi",
  background: { color: HEX.paper },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", align: "left", x: 0.6, y: 0.45, w: 6, h: 0.3, fontFace: "Exo 2", fontSize: 10, bold: true, color: C.accent3, charSpacing: 3, margin: 0 }, text: "BAGIAN" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.75, w: 8.8, h: 0.8, fontSize: 34, color: C.text1, valign: "top", margin: 0 }, text: "Satu pesan per slide" } },
    { placeholder: { options: { name: "body", type: "body", align: "left", x: 0.6, y: 1.8, w: 8.8, h: 3.1, fontSize: 16, color: C.text1, valign: "top", margin: 0, paraSpaceAfter: 8 }, text: "Isi slide" } },
    kakiTeks(HEX.ink3),
  ],
  slideNumber: nomor(HEX.ink3),
});

pres.defineSlideMaster({
  title: "FY Judul saja",
  background: { color: HEX.paper },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", align: "left", x: 0.6, y: 0.45, w: 6, h: 0.3, fontFace: "Exo 2", fontSize: 10, bold: true, color: C.accent3, charSpacing: 3, margin: 0 }, text: "BAGIAN" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.75, w: 8.8, h: 0.8, fontSize: 34, color: C.text1, valign: "top", margin: 0 }, text: "Judul slide" } },
    kakiTeks(HEX.ink3),
  ],
  slideNumber: nomor(HEX.ink3),
});

pres.defineSlideMaster({
  title: "FY Angka",
  background: { color: HEX.night },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", align: "left", x: 0.6, y: 0.45, w: 6, h: 0.3, fontFace: "Exo 2", fontSize: 10, bold: true, color: C.accent2, charSpacing: 3, margin: 0 }, text: "BUKTI" } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 0.6, y: 0.75, w: 8.8, h: 0.8, fontSize: 34, color: C.background1, valign: "top", margin: 0 }, text: "Angka yang bisa dipertanggungjawabkan" } },
    kakiTeks(HEX.onBlueSoft),
  ],
  slideNumber: nomor(HEX.onBlueSoft),
});

pres.defineSlideMaster({
  title: "FY Penutup",
  background: { color: HEX.blue },
  objects: [
    { image: { path: ASET("segel-biru.png"), x: -1.4, y: 2.2, w: 5.2, h: 5.2 } },
    { image: { path: ASET("maskot-wink.png"), x: 0.9, y: 1.2, w: 3.45, h: 4.45 } },
    { placeholder: { options: { name: "title", type: "title", align: "left", x: 4.9, y: 1.2, w: 4.6, h: 1.0, fontSize: 46, color: C.background1, valign: "top", margin: 0 }, text: "Terima kasih" } },
    ...[["EMAIL", "hello@fusionify.id"], ["WHATSAPP", "+62 831-1138-0628"], ["WEBSITE", "fusionify.id"]].flatMap(([label, isi], i) => [
      { text: { text: label, options: { x: 4.9, y: 2.45 + i * 0.72, w: 4.6, h: 0.25, fontFace: "Exo 2", fontSize: 10, bold: true, color: HEX.onBlueSoft, charSpacing: 2, margin: 0 } } },
      { text: { text: isi, options: { x: 4.9, y: 2.7 + i * 0.72, w: 4.6, h: 0.35, fontSize: 15, color: "FFFFFF", margin: 0 } } },
    ]),
  ],
});

// Kartu stiker: garis 2px tinta + bayangan pejal ke bawah (tanpa blur)
const bayangan = (warna = HEX.ink) => ({ type: "outer", blur: 0, offset: 3, angle: 90, color: warna, opacity: 1 });
function kartu(slide, x, y, w, h, nama, gelap = false) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.16, fill: { color: gelap ? HEX.card : "FFFFFF" }, line: { color: gelap ? HEX.edgeDark : HEX.ink, width: 1.5 }, shadow: bayangan(gelap ? "02060F" : HEX.ink), objectName: nama });
}

// ----- Contoh slide (setiap layout) -----
pres.addSection({ title: "Pembuka" });
let s = pres.addSlide({ masterName: "FY Judul", sectionTitle: "Pembuka" });
s.addText("JENIS PRESENTASI · 2026", { placeholder: "kicker" });
s.addText([{ text: "Judul presentasi" }, { text: ".", options: { color: HEX.onBlueSoft } }], { placeholder: "title" });
s.addText("Satu kalimat yang menjelaskan isinya.", { placeholder: "body" });
s.addNotes("Layout FY Judul. Ganti kicker, judul, dan kalimat ringkasan.");

pres.addSection({ title: "Isi" });
s = pres.addSlide({ masterName: "FY Bagian", sectionTitle: "Isi" });
s.addText("BAGIAN 1", { placeholder: "kicker" });
s.addText([{ text: "Judul bagian" }, { text: ".", options: { color: HEX.light } }], { placeholder: "title" });

s = pres.addSlide({ masterName: "FY Isi", sectionTitle: "Isi" });
s.addText("BAGIAN", { placeholder: "kicker" });
s.addText([{ text: "Satu pesan per slide" }, { text: ".", options: { color: HEX.light } }], { placeholder: "title" });
s.addText([
  { text: "Poin penting pertama, satu kalimat.", options: { bullet: true, breakLine: true } },
  { text: "Poin penting kedua.", options: { bullet: true, breakLine: true } },
  { text: "Poin penting ketiga.", options: { bullet: true } },
], { placeholder: "body" });

s = pres.addSlide({ masterName: "FY Judul saja", sectionTitle: "Isi" });
s.addText("BAGIAN", { placeholder: "kicker" });
s.addText([{ text: "Tiga kartu stiker" }, { text: ".", options: { color: HEX.light } }], { placeholder: "title" });
[["1", "Poin pertama", "Penjelasan singkat, satu atau dua kalimat."], ["2", "Poin kedua", "Penjelasan singkat."], ["3", "Poin ketiga", "Penjelasan singkat."]].forEach(([n, j, t], i) => {
  const x = 0.6 + i * 3.0;
  kartu(s, x, 1.85, 2.75, 2.75, `kartu-${n}`);
  s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: 2.1, w: 0.5, h: 0.5, fill: { color: C.accent1 }, line: { color: HEX.ink, width: 1.5 }, objectName: `nomor-${n}` });
  s.addText(n, { x: x + 0.25, y: 2.1, w: 0.5, h: 0.5, align: "center", valign: "middle", fontFace: "Exo 2", bold: true, fontSize: 15, color: C.background1, margin: 0, isTextBox: true });
  s.addText(j, { x: x + 0.25, y: 2.8, w: 2.25, h: 0.45, fontFace: "Afacad Flux ExtraBold", fontSize: 20, color: C.text1, margin: 0, isTextBox: true });
  s.addText(t, { x: x + 0.25, y: 3.3, w: 2.25, h: 1.1, fontSize: 14, color: HEX.ink2, valign: "top", margin: 0, isTextBox: true });
});

s = pres.addSlide({ masterName: "FY Angka", sectionTitle: "Isi" });
s.addText("BUKTI", { placeholder: "kicker" });
s.addText([{ text: "Angka yang bisa dipertanggungjawabkan" }, { text: ".", options: { color: HEX.onBlueSoft } }], { placeholder: "title" });
[["10K+", "Label", "Sumber atau keterangan."], ["4", "Label", "Keterangan."], ["2", "Label", "Keterangan."], ["6", "Label", "Keterangan."]].forEach(([v, l, t], i) => {
  const x = 0.6 + i * 2.25;
  kartu(s, x, 1.9, 2.05, 2.6, `angka-${i + 1}`, true);
  s.addText(v, { x: x + 0.2, y: 2.05, w: 1.7, h: 0.85, fontFace: "Exo 2", bold: true, fontSize: 40, color: "8CC0FF", margin: 0, isTextBox: true });
  s.addText(l, { x: x + 0.2, y: 2.95, w: 1.7, h: 0.4, fontFace: "Afacad Flux ExtraBold", fontSize: 17, color: "FFFFFF", margin: 0, isTextBox: true });
  s.addText(t, { x: x + 0.2, y: 3.35, w: 1.7, h: 0.9, fontSize: 12, color: "DBE9FB", valign: "top", margin: 0, isTextBox: true });
});

s = pres.addSlide({ masterName: "FY Judul saja", sectionTitle: "Isi" });
s.addText("DATA", { placeholder: "kicker" });
s.addText([{ text: "Grafik dengan warna FUSIONIFY" }, { text: ".", options: { color: HEX.light } }], { placeholder: "title" });
kartu(s, 0.6, 1.8, 6.1, 3.15, "kartu-grafik");
s.addChart(pres.charts.BAR, [{ name: "Data contoh", labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"], values: [12, 18, 15, 22, 27, 31] }], {
  x: 0.8, y: 1.95, w: 5.7, h: 2.85, barDir: "col", chartColors: [HEX.blue], showValue: true, dataLabelPosition: "outEnd", dataLabelColor: HEX.ink, dataLabelFontFace: "+mn-lt", dataLabelFontSize: 10,
  catAxisLabelColor: HEX.ink3, valAxisLabelColor: HEX.ink3, catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", catAxisLabelFontSize: 10, valAxisLabelFontSize: 9,
  valGridLine: { color: HEX.line, size: 0.75 }, catGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 60,
});
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.0, y: 1.8, w: 2.4, h: 3.15, rectRadius: 0.16, fill: { color: HEX.surface }, line: { color: HEX.surface, width: 0 }, objectName: "kotak-catatan" });
s.addText([
  { text: "DATA CONTOH", options: { fontFace: "Exo 2", bold: true, fontSize: 10, color: "9A5B00", charSpacing: 2, breakLine: true } },
  { text: "Ganti dengan data asli. Klik kanan grafik → Edit Data.", options: { fontSize: 13, color: HEX.ink2 } },
], { x: 7.2, y: 2.0, w: 2.0, h: 2.6, valign: "top", margin: 0, isTextBox: true });
s.addNotes("Kit melarang angka contoh di materi yang dipakai sungguhan. Hapus label Data contoh setelah datanya diganti.");

pres.addSection({ title: "Penutup" });
s = pres.addSlide({ masterName: "FY Penutup", sectionTitle: "Penutup" });
s.addText([{ text: "Terima kasih" }, { text: ".", options: { color: HEX.onBlueSoft } }], { placeholder: "title" });

(async () => {
  await pres.writeFile({ fileName: OUT });
  await terapkanTema(OUT, THEME);
  console.log("✓ dokumen/office/FUSIONIFY-Slide.pptx");
})();
