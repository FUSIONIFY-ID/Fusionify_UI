// FUSIONIFY UI · buat semua format Ikon FUSIONIFY dari ikon/sumber.mjs.
//   npm run build:ikon
// Hasil:
//   ikon/svg/<nama>.svg            satu file per ikon (garis 2px, titik i biru muda)
//   ikon/sosmed/<nama>.svg         logo sosmed satu warna (dari simple-icons, CC0)
//   ikon/ikon.svg                  sprite <symbol id="ikon-…"> dan <symbol id="sosmed-…">
//   ikon/ikon.json                 daftar nama, kategori, kata kunci (untuk pencarian dan Figma)
//   ikon/png/*.png                 PNG untuk email (sosmed + kontak), 64px warna tinta
//   react/ikon-data.ts             data path untuk <Ikon nama="…"> di react/index.tsx
//   tokens/android/res/drawable/fy_ikon_*.xml, fy_sosmed_*.xml   vector drawable Android
//   templates/ikon.html            sprite dan katalog diisi ulang di antara penanda IKON
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as SI from "simple-icons";
import { IKON, SOSMED, KATEGORI, c } from "../ikon/sumber.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tulis = (rel, isi) => { const p = path.join(ROOT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, isi); };
const BIRU_MUDA = "#539DE9";
const ATR = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const nama = Object.keys(IKON).sort((a, b) => a.localeCompare(b));
for (const n of nama) if (!/^[a-z0-9-]+$/.test(n)) throw new Error(`Nama ikon tidak valid: ${n}`);
const titikD = (i) => (i.t ? c(i.t[0], i.t[1], i.t[2] ?? 1.6) : null);

// Bersihkan hasil lama supaya ikon yang dihapus ikut hilang
for (const dir of ["ikon/svg", "ikon/sosmed", "ikon/png"]) fs.rmSync(path.join(ROOT, dir), { recursive: true, force: true });
for (const f of fs.readdirSync(path.join(ROOT, "tokens/android/res/drawable")).filter((f) => /^fy_(ikon|sosmed)_/.test(f))) fs.rmSync(path.join(ROOT, "tokens/android/res/drawable", f));

// 1. SVG satuan
for (const n of nama) {
  const i = IKON[n], t = titikD(i);
  tulis(`ikon/svg/${n}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ${ATR}>${i.d.map((d) => `<path d="${d}"/>`).join("")}${t ? `<path d="${t}" fill="${BIRU_MUDA}" stroke="none"/>` : ""}</svg>\n`);
}

// 2. Sosmed dari simple-icons
const sosmed = Object.entries(SOSMED).map(([n, key]) => {
  const s = SI[key];
  if (!s) throw new Error(`simple-icons tidak punya ${key}`);
  tulis(`ikon/sosmed/${n}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><title>${esc(s.title)}</title><path d="${s.path}"/></svg>\n`);
  return { nama: n, judul: s.title, path: s.path, warna: "#" + s.hex, panduan: s.guidelines || null };
});

// 3. Sprite
const simbol = [
  ...nama.map((n) => {
    const i = IKON[n], t = titikD(i);
    return `<symbol id="ikon-${n}" viewBox="0 0 24 24">${i.d.map((d) => `<path d="${d}"/>`).join("")}${t ? `<path class="t" d="${t}" style="fill:var(--ikon-titik,${BIRU_MUDA});stroke:none"/>` : ""}</symbol>`;
  }),
  ...sosmed.map((s) => `<symbol id="sosmed-${s.nama}" viewBox="0 0 24 24"><path d="${s.path}" style="fill:currentColor;stroke:none"/></symbol>`),
];
const sprite = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${simbol.join("")}</svg>`;
tulis("ikon/ikon.svg", sprite.replace(' width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"', "") + "\n");

// 4. JSON
const daftar = {
  versi: JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version,
  ikon: nama.map((n) => ({ nama: n, kategori: IKON[n].kat, kata: IKON[n].kata || "", titik: !!IKON[n].t })),
  sosmed: sosmed.map(({ nama, judul, warna, panduan }) => ({ nama, judul, warnaMerek: warna, panduanMerek: panduan })),
};
tulis("ikon/ikon.json", JSON.stringify(daftar, null, 2) + "\n");

// 5. React
tulis("react/ikon-data.ts", `// Dibuat otomatis oleh scripts/build-ikon.mjs dari ikon/sumber.mjs. Jangan diedit langsung.
export const IKON_DATA = ${JSON.stringify(Object.fromEntries(nama.map((n) => [n, { d: IKON[n].d, t: titikD(IKON[n]) || undefined }])))} as const;
export type NamaIkon = keyof typeof IKON_DATA;
export const SOSMED_DATA = ${JSON.stringify(Object.fromEntries(sosmed.map((s) => [s.nama, { judul: s.judul, d: s.path }])))} as const;
export type NamaSosmed = keyof typeof SOSMED_DATA;
`);

// 6. Android vector drawable
const android = (paths, sosmedPath) => `<?xml version="1.0" encoding="utf-8"?>
<!-- FUSIONIFY UI · dibuat dari ikon/sumber.mjs (npm run build:ikon). -->
<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24">
${sosmedPath ? `    <path android:fillColor="@color/fy_ink" android:pathData="${sosmedPath}" />` : paths}
</vector>
`;
for (const n of nama) {
  const i = IKON[n], t = titikD(i);
  const p = i.d.map((d) => `    <path android:pathData="${d}" android:strokeColor="@color/fy_ink" android:strokeWidth="2" android:strokeLineCap="round" android:strokeLineJoin="round" android:fillColor="#00000000" />`);
  if (t) p.push(`    <path android:pathData="${t}" android:fillColor="@color/fy_blue_light" />`);
  tulis(`tokens/android/res/drawable/fy_ikon_${n.replace(/-/g, "_")}.xml`, android(p.join("\n")));
}
for (const s of sosmed) tulis(`tokens/android/res/drawable/fy_sosmed_${s.nama.replace(/-/g, "_")}.xml`, android("", s.path));

// 7. PNG untuk email (SVG tidak didukung banyak klien email)
const { chromium } = await import("playwright");
const b = await chromium.launch();
const pg = await b.newPage({ deviceScaleFactor: 1 });
const png = [...sosmed.map((s) => ({ nama: `sosmed-${s.nama}`, isi: `<path d="${s.path}" fill="#0B0F1A"/>` })),
  ...["email", "telepon", "web", "lokasi"].map((n) => ({ nama: `ikon-${n}`, isi: fs.readFileSync(path.join(ROOT, `ikon/svg/${n}.svg`), "utf8").replace(/^<svg[^>]*>|<\/svg>\s*$/g, "") }))];
for (const { nama: n, isi } of png) {
  const kuas = n.startsWith("ikon-") ? ATR.replace('stroke="currentColor"', 'stroke="#0B0F1A"') : "";
  await pg.setContent(`<style>html,body{margin:0;background:transparent}</style><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" ${kuas}>${isi}</svg>`);
  const buf = await (await pg.$("svg")).screenshot({ omitBackground: true });
  tulis(`ikon/png/${n}.png`, buf);
}
await b.close();

// 8. Katalog templates/ikon.html
const katalog = path.join(ROOT, "templates/ikon.html");
if (fs.existsSync(katalog)) {
  let h = fs.readFileSync(katalog, "utf8");
  const ganti = (tanda, isi) => {
    const re = new RegExp(`(<!-- ${tanda}:MULAI -->)[\\s\\S]*?(<!-- ${tanda}:SELESAI -->)`);
    if (!re.test(h)) throw new Error(`Penanda ${tanda} tidak ada di templates/ikon.html`);
    h = h.replace(re, `$1\n${isi}\n$2`);
  };
  ganti("IKON-SPRITE", sprite);
  const grup = Object.entries(KATEGORI).filter(([k]) => k !== "sosmed").map(([k, judul]) => {
    const isi = nama.filter((n) => IKON[n].kat === k).map((n) =>
      `<li><button type="button" class="ikon-kartu" data-nama="${n}" data-kata="${esc(n + " " + (IKON[n].kata || ""))}" aria-label="Salin kode ikon ${n}"><span class="ikon-wadah"><svg class="ikon" aria-hidden="true"><use href="#ikon-${n}"/></svg></span><span>${n}</span></button></li>`).join("\n");
    return `<section class="ikon-grup" data-grup="${k}" aria-labelledby="g-${k}"><h2 id="g-${k}">${judul}</h2><ul class="ikon-grid">\n${isi}\n</ul></section>`;
  });
  const sos = sosmed.map((s) =>
    `<li><button type="button" class="ikon-kartu" data-nama="${s.nama}" data-sosmed data-kata="${esc(s.nama + " " + s.judul + " sosmed media sosial")}" aria-label="Salin kode ikon ${esc(s.judul)}"><span class="ikon-wadah"><svg class="ikon" aria-hidden="true"><use href="#sosmed-${s.nama}"/></svg></span><span>${s.nama}</span></button></li>`).join("\n");
  grup.push(`<section class="ikon-grup" data-grup="sosmed" aria-labelledby="g-sosmed"><h2 id="g-sosmed">${KATEGORI.sosmed}</h2><ul class="ikon-grid">\n${sos}\n</ul></section>`);
  ganti("IKON-DAFTAR", grup.join("\n"));
  h = h.replace(/data-jumlah-ikon>[^<]*</, `data-jumlah-ikon>${nama.length}<`).replace(/data-jumlah-sosmed>[^<]*</, `data-jumlah-sosmed>${sosmed.length}<`);
  fs.writeFileSync(katalog, h);
}
// 9. Sprite per halaman: setiap template dan demo hanya membawa simbol yang dipakainya
//    (diisi ulang di antara penanda IKON-SPRITE tepat setelah <body>).
const halaman = [];
const jelajahi = (dir) => {
  for (const f of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, f.name);
    if (f.isDirectory()) jelajahi(rel);
    else if (f.name.endsWith(".html") && rel !== path.join("templates", "ikon.html")) halaman.push(rel);
  }
};
jelajahi("templates");
halaman.push(path.join("demo", "index.html"));
const simbolDari = Object.fromEntries(simbol.map((x) => [x.match(/id="([^"]+)"/)[1], x]));
let jumlahHalaman = 0;
for (const rel of halaman) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) continue;
  let h = fs.readFileSync(file, "utf8");
  const blok = /\n?<!-- IKON-SPRITE:MULAI -->[\s\S]*?<!-- IKON-SPRITE:SELESAI -->/;
  const tanpa = h.replace(blok, "");
  const dipakai = [...new Set([...tanpa.matchAll(/href="#((?:ikon|sosmed)-[a-z0-9-]+)"/g)].map((m) => m[1]))].sort();
  const hilang = dipakai.filter((id) => !simbolDari[id]);
  if (hilang.length) throw new Error(`${rel} memakai ikon yang tidak ada: ${hilang.join(", ")}`);
  if (!dipakai.length) { if (tanpa !== h) fs.writeFileSync(file, tanpa); continue; }
  const isi = `<!-- IKON-SPRITE:MULAI -->\n<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${dipakai.map((id) => simbolDari[id]).join("")}</svg>\n<!-- IKON-SPRITE:SELESAI -->`;
  h = blok.test(h) ? h.replace(blok, "\n" + isi) : h.replace(/(<body[^>]*>)/, `$1\n${isi}`);
  fs.writeFileSync(file, h);
  jumlahHalaman++;
}

// 10. Ikon yang dibuat oleh JavaScript (js/controls.js) ditulis lengkap, tidak bergantung pada sprite halaman.
const JS_IKON = ["chevron-kiri", "chevron-kanan", "tutup", "dibaca", "cari", "segarkan", "perbesar", "perkecil", "rotasi", "naik", "urut"];
const isiIkon = (n) => {
  const i = IKON[n], t = titikD(i);
  return `${i.d.map((d) => `<path d="${d}"/>`).join("")}${t ? `<path class="t" d="${t}" style="fill:var(--ikon-titik,${BIRU_MUDA});stroke:none"/>` : ""}`;
};
const inline = (n, kelas = "ikon") => `<svg class="${kelas}" viewBox="0 0 24 24" ${ATR} aria-hidden="true">${isiIkon(n)}</svg>`;
tulis("js/ikon-inline.js", `// Dibuat otomatis oleh scripts/build-ikon.mjs dari ikon/sumber.mjs. Jangan diedit langsung.
// Ikon FUSIONIFY lengkap (tanpa sprite) untuk elemen yang dibuat JavaScript.
export const IKON_INLINE = ${JSON.stringify(Object.fromEntries(JS_IKON.map((n) => [n, inline(n)])), null, 2)};
/** Ikon sebagai string SVG. kelas tambahan opsional, mis. "read". */
export const ikon = (nama, kelas = "") => kelas ? IKON_INLINE[nama].replace('class="ikon"', \`class="ikon \${kelas}"\`) : IKON_INLINE[nama];
/** Isi <svg> saja (path), untuk ikon gabungan, mis. dua ikon yang bergantian tampil. */
export const isi = (nama) => IKON_INLINE[nama].replace(/^<svg[^>]*>|<\\/svg>$/g, "");
/** Bungkus isi menjadi <svg class="ikon"> dengan gaya garis Ikon FUSIONIFY. */
export const svgIkon = (dalam, kelas = "") => \`<svg class="ikon\${kelas ? " " + kelas : ""}" viewBox="0 0 24 24" ${ATR} aria-hidden="true">\${dalam}</svg>\`;
`);

console.log(`✓ ${nama.length} ikon, ${sosmed.length} logo sosmed, sprite ${(Buffer.byteLength(sprite) / 1024).toFixed(1)} KB, sprite per halaman di ${jumlahHalaman} halaman`);
