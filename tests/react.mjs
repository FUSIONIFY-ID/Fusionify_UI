// FUSIONIFY UI · uji otomatis (react). Dijalankan oleh tests/run.mjs
// Cek: komponen React lolos TypeScript strict, markup hasil render memakai kelas kit dan gambar ber-width/height,
// dan semua variabel CSS yang dipakai preset Tailwind (v3 dan v4) benar-benar ada di css/tokens.css.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { ROOT } from "./_env.mjs";

const require = createRequire(import.meta.url);
let lulus = 0, gagal = 0;
const cek = (ok, pesan) => { if (ok) lulus++; else { gagal++; console.log("  ✗ " + pesan); } };

// 1. TypeScript
const tsc = spawnSync(process.execPath, [require.resolve("typescript/bin/tsc"), "-p", path.join(ROOT, "react/tsconfig.json")], { encoding: "utf8" });
cek(tsc.status === 0, "tsc: " + (tsc.stdout + tsc.stderr).trim().slice(0, 600));

// 2. Render ke HTML
const ts = require("typescript");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fy-react-"));
fs.mkdirSync(path.join(tmp, "react"));
fs.mkdirSync(path.join(tmp, "js"));
fs.copyFileSync(path.join(ROOT, "js/seal.js"), path.join(tmp, "js/seal.js"));
const src = fs.readFileSync(path.join(ROOT, "react/index.tsx"), "utf8");
const out = ts.transpileModule(src, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
fs.writeFileSync(path.join(tmp, "react/index.mjs"), out.replace('"../js/seal.js"', '"../js/seal.js"'));
fs.writeFileSync(path.join(tmp, "package.json"), '{"type":"module"}');
// Pakai react dari node_modules kit
fs.symlinkSync(path.join(ROOT, "node_modules"), path.join(tmp, "node_modules"), "dir");
const K = await import(path.join(tmp, "react/index.mjs"));
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const h = React.createElement;
const html = (el) => renderToStaticMarkup(h(K.FyAset, { base: "/kit/" }, el));

const t1 = html(h(K.Tombol, { href: "/daftar" }, "Daftar"));
cek(/^<a class="btn" href="\/daftar">Daftar<\/a>$/.test(t1), "Tombol tautan: " + t1);
const t2 = html(h(K.Tombol, { varian: "ghost", kecil: true }, "Batal"));
cek(t2 === '<button type="button" class="btn ghost sm">Batal</button>', "Tombol button: " + t2);
cek(html(h(K.Chip, { status: "wip" })) === '<span class="chip wip">Dalam pengembangan</span>', "Chip label bawaan");
const j = html(h(K.Judul, { as: "h1", besar: true }, "Halo"));
cek(j === '<h1 class="h-hero">Halo<span class="dot">.</span></h1>', "Judul: " + j);
const m = html(h(K.Maskot, { ekspresi: "paid" }));
cek(m.includes('src="/kit/mascot/paid-420.webp"') && m.includes('width="324"') && m.includes('height="420"') && m.includes('alt=""'), "Maskot: " + m);
const kp = html(h(K.KepalaMaskot, { ekspresi: "cry" }));
cek(kp.includes('width="120"') && kp.includes('height="105"'), "Kepala maskot: " + kp);
const st = html(h(K.Keadaan, { jenis: "error", judul: "Gagal memuat", teks: "Coba lagi ya.", aksi: h(K.Tombol, {}, "Coba lagi") }));
cek(st.startsWith('<div class="state sm error" role="alert">') && st.includes("cry-420.webp"), "Keadaan error: " + st.slice(0, 120));
const pg = html(h(K.PanggungMaskot, { ekspresi: "welcome", kata: "Halo!" }));
cek(pg.includes('class="mascot-stage"') && pg.includes('class="bubble"') && pg.includes("seal-ring") && pg.includes('d="M'), "Panggung maskot");
const bd = html(h(K.BadgeProduk, { bahasa: "en", tema: "light" }));
cek(bd.includes("produk-fusionify-en-light.png") && bd.includes("A product by FUSIONIFY"), "Badge produk");
cek(html(h(K.Seksi, { nada: "blue" })) === '<section class="sec blue"></section>', "Seksi biru");
cek(html(h(K.Kartu, { nada: "tint", href: "/x" }, "a")) === '<a href="/x" class="card tint">a</a>', "Kartu tautan");
// Semua kelas yang dipakai komponen harus ada di CSS kit
const css = ["components", "controls", "base", "app"].map((f) => fs.readFileSync(path.join(ROOT, `css/${f}.css`), "utf8")).join("\n");
for (const kelas of ["btn", "ghost", "sm", "danger", "block", "chip", "card", "tint", "kicker", "h-hero", "h-sec", "lead", "dot", "wrap", "sec", "mascot-stage", "seal-bg", "seal-ring", "bubble", "state", "actions", "fy-badge", "fx-oversize"]) {
  cek(new RegExp(`\\.${kelas.replace("-", "\\-")}\\b`).test(css), `kelas .${kelas} tidak ada di CSS kit`);
}

// 3. Variabel preset Tailwind ada di tokens.css
const tokens = fs.readFileSync(path.join(ROOT, "css/tokens.css"), "utf8");
const dipakai = new Set([
  ...fs.readFileSync(path.join(ROOT, "react/tailwind-preset.js"), "utf8").matchAll(/v\("([a-z0-9-]+)"\)/g),
  ...fs.readFileSync(path.join(ROOT, "react/tailwind-v4.css"), "utf8").matchAll(/var\(--([a-z0-9-]+)\)/g),
].map((x) => x[1]));
for (const nama of dipakai) cek(new RegExp(`--${nama}\\s*:`).test(tokens), `token --${nama} dipakai preset tapi tidak ada di css/tokens.css`);
const preset = (await import(path.join(ROOT, "react/tailwind-preset.js"))).default;
cek(!!preset.theme.extend.colors.blue && !!preset.theme.extend.fontFamily.head, "preset v3 punya warna dan huruf");

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${lulus} lulus, ${gagal} FAIL`);
process.exit(gagal ? 1 : 0);
