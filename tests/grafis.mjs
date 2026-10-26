// FUSIONIFY UI · uji otomatis (grafis). Dijalankan oleh tests/run.mjs
// Cek: semua template grafis bisa dirender jadi PNG dengan ukuran platform yang benar, tanpa teks keluar kanvas
// atau tertutup maskot (diperiksa build-grafis.mjs), dan isian dari --isi benar-benar mengganti teks.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ROOT } from "./_env.mjs";

let lulus = 0, gagal = 0;
const cek = (ok, pesan) => { if (ok) lulus++; else { gagal++; console.log("  ✗ " + pesan); } };
const ukuranPng = (f) => { const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const UKURAN = { post: [1080, 1080], potret: [1080, 1350], story: [1080, 1920], og: [1200, 630], "banner-x": [1500, 500], "banner-in": [1584, 396] };

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fy-grafis-"));
let log = "";
try { log = execFileSync(process.execPath, ["scripts/build-grafis.mjs", "--keluar", tmp], { cwd: ROOT, encoding: "utf8" }); }
catch (e) { log = (e.stdout || "") + (e.stderr || ""); cek(false, "build-grafis gagal:\n" + log); }
const png = fs.readdirSync(tmp).filter((f) => f.endsWith(".png"));
cek(png.length >= 13, `cuma ${png.length} PNG`);
for (const f of png) {
  const jenis = Object.keys(UKURAN).sort((a, b) => b.length - a.length).find((k) => f.startsWith(k));
  const [w, h] = ukuranPng(path.join(tmp, f));
  cek(jenis && w === UKURAN[jenis][0] && h === UKURAN[jenis][1], `${f}: ${w}x${h}`);
}

// Isian dari JSON: judul terlalu panjang harus ditolak, judul pendek lolos
const isiPanjang = path.join(tmp, "panjang.json");
fs.writeFileSync(isiPanjang, JSON.stringify({ judul: "Judul yang sengaja dibuat sangat panjang sekali supaya keluar dari kanvas grafis dan ditolak oleh pemeriksa otomatis ini" }));
let tolak = false;
try { execFileSync(process.execPath, ["scripts/build-grafis.mjs", "grafis/og.html", "--kanvas", "og-perusahaan", "--isi", isiPanjang, "--keluar", tmp], { cwd: ROOT, encoding: "utf8", stdio: "pipe" }); }
catch { tolak = true; }
cek(tolak, "judul kepanjangan tidak ditolak");
const isiPendek = path.join(tmp, "pendek.json");
fs.writeFileSync(isiPendek, JSON.stringify({ judul: "Halo dari uji", "og-produk": { produk: "Premiumify", status: "beta" } }));
try {
  execFileSync(process.execPath, ["scripts/build-grafis.mjs", "grafis/og.html", "--kanvas", "og-perusahaan,og-produk", "--isi", isiPendek, "--keluar", path.join(tmp, "isi")], { cwd: ROOT, encoding: "utf8", stdio: "pipe" });
  cek(fs.existsSync(path.join(tmp, "isi", "og-produk.png")), "og-produk.png dengan isian tidak dibuat");
} catch (e) { cek(false, "render dengan isian gagal: " + (e.stdout || e.message)); }

// Template tidak boleh memakai em dash dan wajib light theme
for (const f of fs.readdirSync(path.join(ROOT, "grafis")).filter((f) => f.endsWith(".html"))) {
  const s = fs.readFileSync(path.join(ROOT, "grafis", f), "utf8");
  cek(!s.includes("—"), `${f}: em dash`);
  cek(s.includes('data-theme="light"'), `${f}: harus data-theme="light"`);
  cek([...s.matchAll(/<img\b[^>]*>/g)].every((m) => /width="\d+"/.test(m[0]) && /height="\d+"/.test(m[0]) && /alt="/.test(m[0])), `${f}: img tanpa width/height/alt`);
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${lulus} lulus, ${gagal} FAIL`);
process.exit(gagal ? 1 : 0);
