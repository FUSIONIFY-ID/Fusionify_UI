// FUSIONIFY UI · uji otomatis (aman untuk SSR). Dijalankan oleh tests/run.mjs. Tanpa browser.
// Next.js, Astro, dan framework lain mengimpor modul di server, tempat document, window, dan matchMedia tidak ada.
// Modul kit tidak boleh menyentuh API browser saat diimpor; baru boleh saat fungsi init dipanggil di browser.
// motion.js tidak diuji di sini karena mengimpor GSAP dan Lenis, yang di produk selalu lewat bundler.
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT } from "./_env.mjs";

let ok = 0, fail = 0;
for (const m of ["theme", "controls", "app", "kelas", "lisensi", "seal", "ikon-inline"]) {
  try {
    const mod = await import(pathToFileURL(path.join(ROOT, "js", m + ".js")).href);
    if (Object.keys(mod).length) ok++; else { fail++; console.log(`FAIL: js/${m}.js tidak mengekspor apa pun`); }
  } catch (e) {
    fail++;
    console.log(`FAIL: js/${m}.js gagal diimpor tanpa browser (${e.message})`);
  }
}
console.log(`${ok} lulus, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
