// FUSIONIFY UI · uji otomatis di mesin Safari (WebKit) dan Firefox. Dijalankan oleh tests/run.mjs.
// Uji lain hanya memakai Chromium. Uji ini memastikan halaman utama tanpa error JavaScript, tanpa scroll
// horizontal, tombol tema bekerja, dan menu HP terbuka di WebKit (mesin Safari iPhone/macOS) dan Firefox.
// Di CI: job "safari dan firefox" memasang kedua browser. Di komputer yang belum memasangnya, uji dilewati
// (pasang dengan: npx playwright install webkit firefox).
import * as pw from "playwright";
import { BASE, cdnLokal } from "./_env.mjs";

let ok = 0, fail = 0;
const cek = (benar, pesan) => { if (benar) ok++; else { fail++; console.log("FAIL:", pesan); } };
const HALAMAN = ["templates/landing-produk.html", "templates/gaya.html", "templates/halaman-perusahaan.html", "templates/halaman-karya.html", "templates/dashboard.html", "templates/komponen.html", "templates/auth/masuk.html", "templates/bayar-qris.html", "templates/acara.html", "templates/chat.html", "demo/index.html"];
const UKURAN = [[390, 844, true], [820, 1180, true], [1366, 768, false]];

for (const nama of ["webkit", "firefox"]) {
  let b;
  try { b = await pw[nama].launch(); } catch { console.log(`LEWATI: ${nama} belum terpasang`); continue; }
  for (const pg of HALAMAN) for (const [w, h, sentuh] of UKURAN) {
    const c = await b.newContext({ viewport: { width: w, height: h }, hasTouch: sentuh, ...(nama === "webkit" && sentuh ? { isMobile: true } : {}) });
    await cdnLokal(c);
    const p = await c.newPage();
    const err = [];
    p.on("pageerror", (e) => err.push(e.message));
    await p.goto(BASE + pg, { waitUntil: "load" });
    await p.waitForTimeout(600);
    const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
    cek(!err.length, `${nama} ${pg}@${w}: tanpa error JS (${err.join("; ")})`);
    cek(r.sw <= r.iw + 1, `${nama} ${pg}@${w}: tanpa scroll horizontal (${r.sw} > ${r.iw})`);
    await c.close();
  }
  // Tombol tema dan menu HP
  {
    const c = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
    await cdnLokal(c);
    const p = await c.newPage();
    await p.goto(BASE + "templates/landing-produk.html", { waitUntil: "load" }); await p.waitForTimeout(500);
    const tema = p.locator("[data-theme-toggle]").first();
    if (await tema.count()) {
      const awal = await p.evaluate(() => document.documentElement.dataset.theme || "");
      await tema.click(); await p.waitForTimeout(300);
      const akhir = await p.evaluate(() => document.documentElement.dataset.theme || "");
      cek(akhir && akhir !== awal, `${nama}: tombol tema mengganti tema (${awal} -> ${akhir})`);
    }
    const menu = p.locator("[data-menu]").first();
    if (await menu.count() && await menu.isVisible()) {
      await menu.click(); await p.waitForTimeout(800);
      cek(await p.evaluate(() => document.documentElement.classList.contains("scroll-lock") || document.querySelector("[data-drawer]")?.classList.contains("open") || document.body.classList.contains("menu-open")), `${nama}: menu HP terbuka`);
    }
    await c.close();
  }
  await b.close();
}
console.log(`${ok} lulus, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
