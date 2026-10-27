// FUSIONIFY UI · uji otomatis (ikon). Dijalankan oleh tests/run.mjs
// Cek: semua format ikon sinkron dengan ikon/sumber.mjs, gambar di dalam kisi aman, ciri titik i dipakai,
// logo sosmed lengkap, PNG email ada, dan katalog templates/ikon.html bisa dicari, diganti tampilan, dan disalin.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { BASE, ROOT, NM } from "./_env.mjs";
import { IKON, SOSMED, c } from "../ikon/sumber.mjs";

let lulus = 0, gagal = 0;
const cek = (ok, pesan) => { if (ok) lulus++; else { gagal++; console.log("  ✗ " + pesan); } };
const nama = Object.keys(IKON);
const sosmed = Object.keys(SOSMED);
const baca = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

// 1. Sinkron dengan sumber (lupa npm run build:ikon = gagal)
const sprite = baca("ikon/ikon.svg"), data = baca("react/ikon-data.ts"), json = JSON.parse(baca("ikon/ikon.json")), katalog = baca("templates/ikon.html");
cek(nama.length >= 80, `ikon cuma ${nama.length}`);
for (const n of nama) {
  const i = IKON[n];
  cek(fs.existsSync(path.join(ROOT, `ikon/svg/${n}.svg`)), `${n}: svg tidak ada (jalankan npm run build:ikon)`);
  cek(sprite.includes(`id="ikon-${n}"`) && katalog.includes(`id="ikon-${n}"`), `${n}: tidak ada di sprite/katalog`);
  cek(data.includes(`"${n}":`) && json.ikon.some((x) => x.nama === n), `${n}: tidak ada di react/ikon-data.ts atau ikon.json`);
  cek(fs.existsSync(path.join(ROOT, `tokens/android/res/drawable/fy_ikon_${n.replace(/-/g, "_")}.xml`)), `${n}: drawable Android tidak ada`);
  cek(i.d.every((d) => sprite.includes(d)) && (!i.t || sprite.includes(c(i.t[0], i.t[1], i.t[2] ?? 1.6))), `${n}: sprite beda dengan sumber`);
}
cek(fs.readdirSync(path.join(ROOT, "ikon/svg")).length === nama.length, "ada svg sisa ikon yang sudah dihapus");
for (const s of sosmed) {
  cek(sprite.includes(`id="sosmed-${s}"`) && fs.existsSync(path.join(ROOT, `ikon/sosmed/${s}.svg`)) && fs.existsSync(path.join(ROOT, `ikon/png/sosmed-${s}.png`)), `sosmed ${s} tidak lengkap`);
}
for (const f of ["email", "telepon", "web", "lokasi"]) {
  const p = path.join(ROOT, `ikon/png/ikon-${f}.png`);
  const b = fs.existsSync(p) ? fs.readFileSync(p) : null;
  cek(b && b.readUInt32BE(16) === 64 && b.readUInt32BE(20) === 64, `png ikon-${f} harus 64x64`);
}
cek(nama.filter((n) => IKON[n].t).length / nama.length >= 0.5, "ciri titik i dipakai kurang dari separuh ikon");
cek(baca("THIRD_PARTY_NOTICES.md").includes("simple-icons"), "simple-icons belum dicatat di THIRD_PARTY_NOTICES.md");
cek(!/#[0-9a-f]{3,6}"/i.test(sprite.replace(/#539DE9/g, "")), "sprite memakai warna hex selain titik bawaan");

// 2. Geometri: semua ikon di dalam kisi 24 dengan ruang untuk garis 2px
const b = await chromium.launch();
const p = await b.newPage();
const kotak = await p.evaluate(({ ikon }) => {
  document.body.innerHTML = `<svg width="240" height="240" viewBox="0 0 24 24"></svg>`;
  const svg = document.querySelector("svg"), out = {};
  for (const [n, d] of Object.entries(ikon)) {
    svg.innerHTML = d.map((x) => `<path d="${x}"/>`).join("");
    const k = svg.getBBox();
    out[n] = [k.x, k.y, k.x + k.width, k.y + k.height].map((v) => +v.toFixed(2));
  }
  return out;
}, { ikon: Object.fromEntries(nama.map((n) => [n, [...IKON[n].d, ...(IKON[n].t ? [c(...IKON[n].t)] : [])]])) });
for (const [n, [x0, y0, x1, y1]] of Object.entries(kotak)) cek(x0 >= 1.4 && y0 >= 1.4 && x1 <= 22.6 && y1 <= 22.6, `${n}: keluar kisi aman ${[x0, y0, x1, y1]}`);

// 3. Katalog
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
await ctx.route(/cdn\.jsdelivr\.net\/npm\/(gsap|lenis)@[^/]+\/(.*)$/, (r) => { const m = r.request().url().match(/npm\/(gsap|lenis)@[^/]+\/(.*)$/); r.fulfill({ path: NM + m[1] + "/" + m[2], contentType: "text/javascript" }); });
const k = await ctx.newPage();
const err = [];
k.on("pageerror", (e) => err.push(e.message));
await k.goto(BASE + "templates/ikon.html", { waitUntil: "networkidle" });
cek(await k.$$eval(".ikon-kartu", (x) => x.length) === nama.length + sosmed.length, "jumlah kartu katalog");
cek(await k.textContent("[data-jumlah-ikon]") === String(nama.length), "angka jumlah ikon di katalog");
const tampil = await k.$eval(".ikon-kartu svg", (s) => { const r = s.getBoundingClientRect(); return r.width > 20 && s.querySelector("use").getBBox().width > 5; });
cek(tampil, "ikon di katalog tidak tergambar");
await k.fill("[data-cari-ikon]", "qris");
cek(await k.$$eval(".ikon-kartu", (x) => x.filter((b) => !b.closest("li").hidden).map((b) => b.dataset.nama).join()) === "qr", "cari 'qris' harus menemukan ikon qr");
await k.fill("[data-cari-ikon]", "zzzz");
cek(await k.isVisible("[data-ikon-kosong]"), "pesan kosong saat tidak ada hasil");
await k.fill("[data-cari-ikon]", "");
await k.check('input[name="tampilan"][value="stiker"]', { force: true });
cek(await k.$eval(".ikon-wadah", (w) => w.classList.contains("ikon-stiker")), "ganti tampilan stiker");
await k.click('.ikon-kartu[data-nama="dompet"]');
cek(await k.evaluate(() => navigator.clipboard.readText()) === '<span class="ikon-stiker"><svg class="ikon" aria-hidden="true"><use href="#ikon-dompet"/></svg></span>', "salin kode ikon stiker");
await k.click('.ikon-kartu[data-nama="instagram"]');
cek((await k.evaluate(() => navigator.clipboard.readText())).includes("#sosmed-instagram"), "salin kode sosmed");
cek(!err.length, "error JS katalog: " + err.join(" | "));
await b.close();

console.log(`${lulus} lulus, ${gagal} FAIL`);
process.exit(gagal ? 1 : 0);
