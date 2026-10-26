// FUSIONIFY UI · ubah template grafis (grafis/*.html) jadi PNG.
//
//   npm run build:grafis                                   semua template → grafis/contoh/*.png
//   node scripts/build-grafis.mjs grafis/og.html           satu berkas, semua kanvasnya
//   node scripts/build-grafis.mjs grafis/post.html --kanvas post-kabar --isi isi.json --keluar hasil/
//
// --isi    JSON berisi teks pengganti, mis. { "judul": "…", "status": "beta", "post-tips": { "poin1": "…" } }
// --kanvas hanya render kanvas ber-id ini (boleh dipisah koma)
// --keluar folder hasil (bawaan grafis/contoh/)
// --skala  2 untuk PNG dua kali lebih tajam (bawaan 1, ukuran sesuai platform)
// Perintah gagal kalau ada teks atau gambar yang keluar kanvas, gambar rusak, atau huruf belum termuat.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opsi = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const nilaiOpsi = new Set(["--isi", "--kanvas", "--keluar", "--skala"].flatMap((n) => { const i = args.indexOf(n); return i >= 0 ? [i + 1] : []; }));
const berkas = args.filter((a, i) => !a.startsWith("--") && !nilaiOpsi.has(i));
const daftar = berkas.length ? berkas : fs.readdirSync(path.join(ROOT, "grafis")).filter((f) => f.endsWith(".html")).map((f) => "grafis/" + f);
const isi = opsi("--isi") ? JSON.parse(fs.readFileSync(opsi("--isi"), "utf8")) : null;
const pilih = opsi("--kanvas") ? opsi("--kanvas").split(",") : null;
const keluar = path.resolve(opsi("--keluar") || path.join(ROOT, "grafis", "contoh"));
const skala = Number(opsi("--skala") || 1);
fs.mkdirSync(keluar, { recursive: true });

// Server kecil supaya path relatif (../css, ../mascot) jalan seperti di web
const TIPE = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json" };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": TIPE[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/`;

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1700, height: 1000 }, deviceScaleFactor: skala });
let gagal = 0, jumlah = 0;
for (const f of daftar) {
  const rel = path.relative(ROOT, path.resolve(f)).split(path.sep).join("/");
  const p = await ctx.newPage();
  const salah = [];
  p.on("pageerror", (e) => salah.push("JS " + e.message));
  p.on("response", (r) => { if (r.status() >= 400) salah.push(r.status() + " " + r.url()); });
  if (isi) await p.addInitScript((d) => { window.__ISI = d; }, isi);
  await p.goto(base + rel, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => document.documentElement.dataset.grafisSiap === "1");
  const kanvas = await p.$$eval(".kanvas[id]", (ks) => ks.map((k) => k.id));
  for (const id of kanvas) {
    if (pilih && !pilih.includes(id)) continue;
    const cek = await p.evaluate((id) => {
      const k = document.getElementById(id), kb = k.getBoundingClientRect(), out = [];
      k.querySelectorAll("*").forEach((el) => {
        if (el.closest(".segel, .fx-oversize")) return;
        const r = el.getBoundingClientRect();
        if (r.width && r.height && (r.left < kb.left - 1 || r.top < kb.top - 1 || r.right > kb.right + 1 || r.bottom > kb.bottom + 1)) out.push("keluar kanvas: " + el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ").join(".") : ""));
        // Teks yang meluber dari kotaknya sendiri (judul terlalu panjang)
        if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow === "hidden" && el !== k) out.push("teks terpotong: " + el.tagName.toLowerCase());
      });
      // Teks tidak boleh tertutup maskot (kotak gambar maskot dikecilkan sedikit karena tepinya transparan)
      const maskot = [...k.querySelectorAll(".g-maskot")].map((m) => { const r = m.getBoundingClientRect(); return { l: r.left + r.width * 0.12, t: r.top + r.height * 0.1, r: r.right - r.width * 0.12, b: r.bottom }; });
      k.querySelectorAll("h1, h2, p, li, span, b, div").forEach((el) => {
        if (el.closest(".g-gelembung") || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
        const r = el.getBoundingClientRect();
        for (const m of maskot) {
          const w = Math.min(r.right, m.r) - Math.max(r.left, m.l), h = Math.min(r.bottom, m.b) - Math.max(r.top, m.t);
          if (w > 4 && h > 4) out.push("teks tertutup maskot: " + el.tagName.toLowerCase() + " \"" + el.textContent.trim().slice(0, 30) + "\"");
        }
      });
      k.querySelectorAll("img").forEach((i) => { if (!i.naturalWidth) out.push("gambar rusak " + i.getAttribute("src")); });
      ["Afacad Flux Variable", "Sansation", "Exo 2 Variable"].forEach((f) => { if (!document.fonts.check(`32px "${f}"`)) out.push("huruf belum termuat " + f); });
      return [...new Set(out)];
    }, id);
    const el = await p.$("#" + id);
    const nama = path.join(keluar, id + ".png");
    await el.screenshot({ path: nama });
    jumlah++;
    if (cek.length || salah.length) { gagal++; console.log(`✗ ${id}: ${[...cek, ...salah].join(" | ")}`); }
    else console.log(`✓ ${path.relative(ROOT, nama)}`);
  }
  await p.close();
}
await b.close();
server.close();
if (!jumlah) { console.log("Tidak ada kanvas yang dirender. Cek nama berkas atau --kanvas."); process.exit(1); }
process.exit(gagal ? 1 : 0);
