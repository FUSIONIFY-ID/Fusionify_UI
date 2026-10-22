// FUSIONIFY UI · jalankan semua uji otomatis.
//   npm install
//   npx playwright install chromium
//   npm test                 (semua)
//   npm test -- interaksi    (hanya file yang namanya mengandung "interaksi")
// Keluar dengan kode 1 kalau ada yang gagal, jadi bisa dipakai di GitHub Actions.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json", ".ttf": "font/ttf", ".pdf": "application/pdf" };

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(root, url);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end("404"); }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(buf);
  });
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const filter = process.argv[2] || "";
const files = fs.readdirSync(here).filter((f) => f.endsWith(".mjs") && !f.startsWith("_") && f !== "run.mjs" && f.includes(filter)).sort();
const results = [];
for (const f of files) {
  const t0 = Date.now();
  process.stdout.write(`\n▶ ${f}\n`);
  const out = await new Promise((resolve) => {
    let buf = "";
    const p = spawn(process.execPath, [path.join(here, f)], { env: { ...process.env, FY_BASE: base }, cwd: root });
    p.stdout.on("data", (d) => { buf += d; process.stdout.write(d); });
    p.stderr.on("data", (d) => { buf += d; process.stderr.write(d); });
    p.on("close", (code) => resolve({ code, buf }));
  });
  const failCount = [...out.buf.matchAll(/(\d+)\s+FAIL/g)].reduce((a, m) => a + +m[1], 0);
  const audit = /^tata-letak|^tanpa-js|^layar-sentuh/.test(f);
  const ok = out.code === 0 && failCount === 0 && (!audit || /NO ISSUES|MOBILE OK/.test(out.buf));
  results.push({ f, ok, s: ((Date.now() - t0) / 1000).toFixed(0) });
}
server.close();
console.log("\n──── Ringkasan ────");
for (const r of results) console.log(`${r.ok ? "LULUS" : "GAGAL"}  ${r.f}  (${r.s} dtk)`);
const bad = results.filter((r) => !r.ok).length;
console.log(bad ? `\n${bad} uji gagal.` : "\nSemua uji lulus.");
process.exit(bad ? 1 : 0);
