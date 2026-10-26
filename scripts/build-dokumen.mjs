// FUSIONIFY UI · cetak template dokumen/cetak/*.html menjadi PDF.
//   npm run build:dokumen                     semua template → dokumen/contoh/*.pdf (contoh, tanda kuning tetap tampil)
//   node scripts/build-dokumen.mjs surat.html  satu file
//   node scripts/build-dokumen.mjs --final berkas-saya.html --keluar hasil.pdf
//        --final: menolak mencetak kalau masih ada <span class="ganti"> (teks yang belum diganti)
// Butuh Chromium Playwright: npx playwright install chromium
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirCetak = path.join(root, "dokumen", "cetak");
const dirContoh = path.join(root, "dokumen", "contoh");

const args = process.argv.slice(2);
const final = args.includes("--final");
const iKeluar = args.indexOf("--keluar");
const keluar = iKeluar >= 0 ? args[iKeluar + 1] : null;
const nama = args.filter((a, i) => !a.startsWith("--") && !(iKeluar >= 0 && i === iKeluar + 1));

const files = nama.length
  ? nama.map((n) => (fs.existsSync(n) ? path.resolve(n) : path.join(dirCetak, n)))
  : fs.readdirSync(dirCetak).filter((f) => f.endsWith(".html")).sort().map((f) => path.join(dirCetak, f));

fs.mkdirSync(dirContoh, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
let gagal = 0;

for (const file of files) {
  await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const cek = await page.evaluate(() => {
    const isSlide = !!document.querySelector(".slide");
    const sisa = document.querySelectorAll(".ganti").length;
    // Isi yang tumpah keluar halaman (kotak terakhir lebih rendah dari batas halaman)
    const tumpah = [];
    document.querySelectorAll(".halaman, .slide").forEach((pg, i) => {
      const b = pg.getBoundingClientRect();
      pg.querySelectorAll("*").forEach((el) => {
        // Hiasan yang sengaja lebih besar dari halaman (segel) tidak dihitung, sama seperti .fx-oversize di kit
        if (el.closest(".segel, .fx-oversize")) return;
        const r = el.getBoundingClientRect();
        if (r.height && r.width && (r.bottom > b.bottom + 1 || r.right > b.right + 1)) tumpah.push(`halaman ${i + 1}: ${el.tagName.toLowerCase()}.${el.className || ""}`);
      });
    });
    return { isSlide, sisa, tumpah: [...new Set(tumpah)].slice(0, 5) };
  });
  const rel = path.relative(root, file);
  if (cek.tumpah.length) {
    gagal++;
    console.log(`✗ ${rel}: isi keluar halaman\n   ${cek.tumpah.join("\n   ")}`);
    continue;
  }
  if (final && cek.sisa) {
    gagal++;
    console.log(`✗ ${rel}: masih ada ${cek.sisa} teks bertanda "ganti". Ganti dulu sebelum dicetak final.`);
    continue;
  }
  const out = keluar ? path.resolve(keluar) : path.join(dirContoh, path.basename(file).replace(/\.html$/, ".pdf"));
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
  console.log(`✓ ${rel} → ${path.relative(root, out)}${cek.sisa ? ` (contoh, ${cek.sisa} teks "ganti")` : ""}`);
}

await browser.close();
process.exit(gagal ? 1 : 0);
