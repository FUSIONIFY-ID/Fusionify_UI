// FUSIONIFY UI · uji otomatis (lisensi domain). Dijalankan oleh tests/run.mjs
// Domain resmi (dan subdomainnya) harus jalan normal; domain lain tidak menjalankan interaksi tapi konten tetap terbaca.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './_env.mjs';
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
  await p.goto(`https://${host}/templates/${page}`, { waitUntil: 'load' }); await p.waitForTimeout(400);
  return { c, p, warns };
};
for (const host of ['fusionify.id', 'studio.fusionify.id', 'fusionify.biz.id', 'app.fusionify.biz.id']) {
  const { c, p, warns } = await visit(host, 'komponen.html');
  await p.click('#tabel th:nth-child(3) .sort-btn');
  T(host + ' jalan', (await p.getAttribute('#tabel th:nth-child(3)', 'aria-sort')) === 'ascending' && warns.length === 0);
  await c.close();
}
for (const host of ['tirufusionify.id.evil.com', 'contoh.test', 'fusionify.id.contoh.com']) {
  const { c, p, warns } = await visit(host, 'komponen.html');
  T(host + ' dikunci (tidak ada tombol urut)', (await p.$$('.sort-btn')).length === 0);
  T(host + ' ada peringatan', warns.some((w) => w.includes('belum terdaftar')));
  T(host + ' konten tetap tampil', await p.isVisible('#tabel table'));
  await c.close();
}
console.log(ok, 'OK', bad, 'FAIL'); await b.close();
