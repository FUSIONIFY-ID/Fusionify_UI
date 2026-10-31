// FUSIONIFY UI · uji token (tanpa browser). Dijalankan oleh tests/run.mjs, juga `npm run cek:token`.
// Cek:
// 1. Dua blok gelap di css/tokens.css (tombol tema dan prefers-color-scheme) identik.
// 2. Tidak ada warna hex di CSS komponen (base, components, product, controls, app): semua lewat token.
// 3. Setiap var(--x) tanpa nilai cadangan di CSS kit didefinisikan di suatu tempat.
// 4. Warna email (email/fy-email.js) sama dengan token terang di tokens.css.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baca = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
let ok = 0, fail = 0;
const cek = (benar, pesan) => { if (benar) ok++; else { fail++; console.log("FAIL:", pesan); } };
const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");

const tokens = tanpaKomentar(baca("css/tokens.css"));
const isi = (re) => {
  const m = tokens.match(re);
  if (!m) return null;
  return Object.fromEntries([...m[1].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]));
};
const terang = isi(/(?:^|\n):root\s*\{([\s\S]*?)\n\}/);
const gelapTombol = isi(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);
const gelapSistem = isi(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)\s*\{([\s\S]*?)\n\s*\}/);

// 1
cek(gelapTombol && gelapSistem, "kedua blok gelap ditemukan");
if (gelapTombol && gelapSistem) {
  const kunci = new Set([...Object.keys(gelapTombol), ...Object.keys(gelapSistem)]);
  for (const k of kunci) cek(gelapTombol[k] === gelapSistem[k], `--${k} beda di dua blok gelap (${gelapTombol[k]} vs ${gelapSistem[k]})`);
}

// 2 dan 3
const fileCss = ["css/base.css", "css/components.css", "css/product.css", "css/controls.css", "css/app.css"];
const semua = fileCss.map((f) => [f, tanpaKomentar(baca(f))]);
const didefinisikan = new Set([...tokens.matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1]));
for (const [, s] of semua) for (const m of s.matchAll(/--([\w-]+)\s*:/g)) didefinisikan.add(m[1]);
for (const [f, s] of semua) {
  const tanpaUri = s.replace(/url\("data:[^"]*"\)/g, "");
  const hex = [...tanpaUri.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0]);
  cek(hex.length === 0, `${f} masih menulis hex: ${[...new Set(hex)].join(", ")}`);
  for (const m of s.matchAll(/var\(--([\w-]+)\s*\)/g)) cek(didefinisikan.has(m[1]), `${f} memakai var(--${m[1]}) yang tidak didefinisikan`);
}

// 4
const email = baca("email/fy-email.js");
const T = email.match(/const T = \{([\s\S]*?)\n\};/)[1];
const ambil = (nama) => T.match(new RegExp(`\\b${nama}:\\s*(?:"(#[0-9A-Fa-f]{6})"|\\["(#[0-9A-Fa-f]{6})",\\s*"(#[0-9A-Fa-f]{6})"\\])`));
const pasangan = { blue: "blue", blueDeep: "blue-deep", blueLight: "blue-light", ink: "ink", ink2: "ink-2", ink3: "ink-3", surface: "surface", paper: "paper", line: "line", night: "night", white: "white" };
for (const [js, css] of Object.entries(pasangan)) {
  const m = ambil(js);
  cek(m && m[1].toLowerCase() === (terang[css] || "").toLowerCase(), `email T.${js} (${m?.[1]}) tidak sama dengan --${css} (${terang[css]})`);
}
for (const nada of ["go", "beta", "wip", "plan", "eos", "danger"]) {
  const m = ambil(nada);
  cek(m && m[2].toLowerCase() === terang[nada]?.toLowerCase() && m[3].toLowerCase() === terang[nada + "-bg"]?.toLowerCase(), `email T.${nada} tidak sama dengan --${nada}/--${nada}-bg`);
}

console.log(`${ok} OK ${fail} FAIL`);
process.exit(fail ? 1 : 0);
