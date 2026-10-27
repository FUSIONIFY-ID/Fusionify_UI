// FUSIONIFY UI · cek keaslian Ikon FUSIONIFY terhadap set ikon populer.
//   npm run cek:ikon
// Mengunduh Lucide, Tabler, Heroicons, dan Feather (hanya untuk pembanding, ke .cache/pembanding-ikon/, tidak ikut repo),
// lalu untuk setiap ikon di ikon/sumber.mjs:
//   1. mencari path yang identik (angka dibulatkan ke 0,5), dan
//   2. mengukur kemiripan gambar (IoU raster 48px, TANPA titik i supaya penilaiannya paling ketat).
// Gagal kalau ada path identik, atau ikon yang bukan bentuk dasar mirip >= 85% dengan ikon lain.
// Bentuk dasar (tambah, kurang, tutup) memang sama di semua set ikon dan dikecualikan.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { IKON } from "../ikon/sumber.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = path.join(ROOT, ".cache/pembanding-ikon");
const PAKET = { "lucide-static@0.460.0": ["lucide", "lucide-static/icons"], "@tabler/icons@3.22.0": ["tabler", "@tabler/icons/icons/outline"], "heroicons@2.1.5": ["heroicons", "heroicons/24/outline"], "feather-icons@4.29.2": ["feather", "feather-icons/dist/icons"] };
const DASAR = new Set(["tambah", "kurang", "tutup"]);
const BATAS = 0.85;

if (!fs.existsSync(path.join(CACHE, "node_modules/lucide-static"))) {
  fs.mkdirSync(CACHE, { recursive: true });
  console.log("Mengunduh set ikon pembanding (sekali saja)...");
  execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["i", "--prefix", CACHE, "--no-save", "--silent", ...Object.keys(PAKET)], { stdio: "inherit", shell: process.platform === "win32" });
}
const ref = [];
for (const [set, dir] of Object.values(PAKET)) {
  const d = path.join(CACHE, "node_modules", dir);
  for (const f of fs.readdirSync(d).filter((f) => f.endsWith(".svg"))) {
    const s = fs.readFileSync(path.join(d, f), "utf8");
    ref.push({ id: `${set}/${f.replace(".svg", "")}`, inner: s.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<path[^>]*stroke="none"[^>]*\/>/g, "") });
  }
}

const norm = (d) => d.replace(/-?\d*\.?\d+/g, (x) => (Math.round(+x * 2) / 2).toString()).replace(/\s+/g, " ").trim();
const refD = new Map();
for (const r of ref) for (const m of r.inner.matchAll(/\sd="([^"]+)"/g)) { const k = norm(m[1]); if (k.length > 12) (refD.get(k) || refD.set(k, []).get(k)).push(r.id); }
const masalah = [];
for (const [n, i] of Object.entries(IKON)) for (const d of i.d) { const k = norm(d); if (refD.has(k)) masalah.push(`${n}: path identik dengan ${refD.get(k).slice(0, 3).join(", ")}`); }

const b = await chromium.launch();
const p = await b.newPage();
const hasil = await p.evaluate(async ({ our, ref }) => {
  const S = 48, cv = new OffscreenCanvas(S, S), cx = cv.getContext("2d", { willReadFrequently: true });
  const mask = async (inner) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner.replace(/stroke-width="[^"]*"/g, "").replace(/fill="currentColor"/g, 'fill="#000"')}</svg>`;
    const img = new Image(); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    try { await img.decode(); } catch { return null; }
    cx.clearRect(0, 0, S, S); cx.drawImage(img, 0, 0);
    const a = cx.getImageData(0, 0, S, S).data, m = new Uint8Array(S * S);
    for (let i = 0; i < S * S; i++) m[i] = a[i * 4 + 3] > 100 ? 1 : 0;
    return m;
  };
  const R = [];
  for (const r of ref) { const m = await mask(r.inner); if (m) R.push({ id: r.id, m, n: m.reduce((x, y) => x + y, 0) }); }
  const out = [];
  for (const o of our) {
    const m = await mask(o.inner), n = m.reduce((x, y) => x + y, 0);
    let best = { ref: "", iou: 0 };
    for (const r of R) { let i = 0; for (let k = 0; k < m.length; k++) i += m[k] & r.m[k]; const iou = i / (n + r.n - i); if (iou > best.iou) best = { ref: r.id, iou }; }
    out.push({ nama: o.nama, ...best });
  }
  return out;
}, { our: Object.entries(IKON).map(([n, i]) => ({ nama: n, inner: i.d.map((d) => `<path d="${d}"/>`).join("") })), ref });
await b.close();

hasil.sort((a, b) => b.iou - a.iou);
for (const h of hasil) if (!DASAR.has(h.nama) && h.iou >= BATAS) masalah.push(`${h.nama}: ${(h.iou * 100).toFixed(0)}% mirip ${h.ref}`);
console.log(`Dibandingkan dengan ${ref.length} ikon (Lucide, Tabler, Heroicons, Feather), tanpa titik i.`);
console.log("Kemiripan tertinggi (bentuk dasar dikecualikan):");
for (const h of hasil.filter((h) => !DASAR.has(h.nama)).slice(0, 8)) console.log(`  ${h.nama.padEnd(16)} ${(h.iou * 100).toFixed(0)}%  ~ ${h.ref}`);
if (masalah.length) { console.log("\n✗ Perlu digambar ulang:\n  " + masalah.join("\n  ")); process.exit(1); }
console.log(`\n✓ Tidak ada path identik, semua ikon di bawah ${BATAS * 100}% kemiripan.`);
