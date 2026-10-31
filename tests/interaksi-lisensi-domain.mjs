// FUSIONIFY UI · uji otomatis (lisensi domain). Dijalankan oleh tests/run.mjs
// Domain resmi (dan subdomainnya) harus jalan normal; domain lain tidak menjalankan interaksi tapi konten tetap terbaca.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, NM } from './_env.mjs';
const b = await chromium.launch(); let ok = 0, bad = 0; const T = (n, c) => { c ? ok++ : (bad++, console.log('FAIL', n)); };
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const visit = async (host, page) => {
  const c = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await c.newPage();
  const warns = []; p.on('console', (m) => { if (m.type() === 'warning') warns.push(m.text()); });
  await p.route(/^https?:\/\/[^/]+\.(id|test|com)\//, (r) => {
    const u = new URL(r.request().url()); const f = path.join(ROOT, decodeURIComponent(u.pathname));
    if (!fs.existsSync(f)) return r.fulfill({ status: 404, body: '' });
    r.fulfill({ path: f, contentType: types[path.extname(f)] || 'application/octet-stream' });
  });
  await p.route(/cdn\.jsdelivr\.net\/npm\/(gsap|lenis)@[^/]+\/(.*)$/, (r) => { const m = r.request().url().match(/npm\/(gsap|lenis)@[^/]+\/(.*)$/); r.fulfill({ path: NM + m[1] + '/' + m[2], contentType: 'text/javascript' }); });
  await p.goto(`https://${host}/templates/${page}`, { waitUntil: 'load' }); await p.waitForTimeout(400);
  return { c, p, warns };
};
for (const host of ['fusionify.id', 'studio.fusionify.id', 'fusionify.biz.id', 'app.fusionify.biz.id', 'premiumify.my.id', 'www.premiumify.my.id', 'studydate.id', 'app.studydate.id']) {
  const { c, p, warns } = await visit(host, 'komponen.html');
  await p.click('#tabel th:nth-child(3) .sort-btn');
  T(host + ' jalan', (await p.getAttribute('#tabel th:nth-child(3)', 'aria-sort')) === 'ascending' && warns.length === 0);
  await c.close();
}
for (const host of ['tirufusionify.id.evil.com', 'contoh.test', 'fusionify.id.contoh.com', 'palsustudydate.id', 'premiumify.my.id.contoh.com']) {
  const { c, p, warns } = await visit(host, 'komponen.html');
  T(host + ' dikunci (tidak ada tombol urut)', (await p.$$('.sort-btn')).length === 0);
  T(host + ' ada peringatan', warns.some((w) => w.includes('belum terdaftar')));
  T(host + ' konten tetap tampil', await p.isVisible('#tabel table'));
  await c.close();
}
// initFusionify() dan initApp() di domain lain mengembalikan objek dengan bentuk yang sama (fungsi kosong),
// supaya kode seperti fy.toast("...") tidak melempar error.
{
  const { c, p } = await visit('contoh.test', 'landing-produk.html');
  const bentuk = await p.evaluate(async () => {
    const { initFusionify } = await import('/js/motion.js'); const { initApp } = await import('/js/app.js');
    const fy = initFusionify(), app = initApp();
    try { fy.toast('x'); fy.lockScroll(true); fy.scrollTo(0); fy.sfx.play('tick'); app.toast('x'); } catch (e) { return 'error ' + e.message; }
    return ['toast', 'snackbar', 'otpError', 'lockScroll', 'scrollTo'].every((k) => typeof fy[k] === 'function') && typeof app.setSide === 'function' ? 'ok' : 'bentuk beda';
  });
  T('stub initFusionify/initApp di domain lain: ' + bentuk, bentuk === 'ok');
  await c.close();
}
console.log(ok, 'OK', bad, 'FAIL'); await b.close();
