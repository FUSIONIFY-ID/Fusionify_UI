// FUSIONIFY UI · uji otomatis (pemotong foto profil, keadaan kosong/error/offline, halaman status). Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import { BASE, FIX, ROOT } from './_env.mjs';
const b = await chromium.launch(); let ok = 0, bad = 0; const T = (n, c) => { c ? ok++ : (bad++, console.log('FAIL', n)); }; const errs = [];
// foto uji: persegi panjang 1200x800 (landscape) supaya geser dan putar terasa
fs.copyFileSync(new URL('../brand/fusionify-mark.png', import.meta.url), FIX + 'foto.png');
const ctx = async (w, h, mob = false) => { const c = await b.newContext({ viewport: { width: w, height: h }, hasTouch: mob, isMobile: mob }); const p = await c.newPage(); p.on('pageerror', (e) => errs.push(e.message)); return [c, p]; };
let [c, p] = await ctx(1280, 900);
await p.goto(BASE + 'templates/komponen.html#crop', { waitUntil: 'networkidle' });
// Buat foto landscape lewat canvas di halaman supaya tidak butuh file besar
const land = await p.evaluate(async () => { const c = document.createElement('canvas'); c.width = 1200; c.height = 800; const x = c.getContext('2d'); x.fillStyle = '#0d6cd7'; x.fillRect(0, 0, 1200, 800); x.fillStyle = '#fff'; x.fillRect(560, 360, 80, 80); return c.toDataURL('image/png'); });
fs.writeFileSync(FIX + 'land.png', Buffer.from(land.split(',')[1], 'base64'));
await p.setInputFiles('#k-avatar', FIX + 'land.png');
await p.waitForSelector('.crop-modal[open]');
T('dialog terbuka', await p.isVisible('.crop-modal .crop-stage'));
T('stage difokus', await p.evaluate(() => document.activeElement.classList.contains('crop-stage')));
const tf = () => p.$eval('.crop-stage img', (e) => e.style.transform);
const t0 = await tf();
await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft');
T('panah menggeser', (await tf()) !== t0);
const box = await p.$eval('.crop-stage', (e) => { const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
await p.mouse.move(box[0], box[1]); await p.mouse.down(); await p.mouse.move(box[0] + 2000, box[1], { steps: 4 }); await p.mouse.up();
const x1 = await p.evaluate(() => { const m = document.querySelector('.crop-stage img').style.transform.match(/translate\(([-\d.]+)px/); return +m[1]; });
T('geser dibatasi (foto tetap menutup lingkaran)', x1 > 0 && x1 < 200);
await p.keyboard.press('+'); await p.keyboard.press('+');
T('zoom keyboard', +(await p.inputValue('.crop-modal .slider')) > 1.15);
await p.click('.crop-modal [data-rot]');
T('putar 90', (await tf()).includes('rotate(90deg)'));
await p.click('.crop-modal [data-apply]');
await p.waitForFunction(() => !document.querySelector('.crop-modal').open);
const res = await p.evaluate(async () => { const f = document.getElementById('k-avatar').files[0]; if (!f) return null; const bm = await createImageBitmap(f); return { name: f.name, type: f.type, w: bm.width, h: bm.height }; });
T('file diganti hasil potong 512x512', res && res.w === 512 && res.h === 512 && /foto-profil\./.test(res.name));
T('pratinjau tampil', await p.isVisible('#crop .ac-preview img') && await p.isHidden('#crop .ac-initial'));
// batal mengembalikan file lama
await p.setInputFiles('#k-avatar', FIX + 'foto.png'); await p.waitForSelector('.crop-modal[open]');
await p.click('.crop-modal [data-cancel]');
T('batal: file tetap hasil sebelumnya', (await p.evaluate(() => document.getElementById('k-avatar').files[0]?.name || '')).startsWith('foto-profil'));
// bukan gambar ditolak
fs.writeFileSync(FIX + 'catatan.txt', 'hai');
await p.setInputFiles('#k-avatar', FIX + 'catatan.txt');
T('bukan gambar ditolak', !(await p.$('.crop-modal[open]')));
// keadaan + bilah offline
await p.click('#sim-off'); T('bilah offline muncul', await p.isVisible('#keadaan [data-offline-bar]'));
await p.click('#sim-on'); T('bilah offline hilang', await p.isHidden('#keadaan [data-offline-bar]'));
await c.close();
// pemotong di HP: cubit tidak error, dialog muat di layar
[c, p] = await ctx(375, 667, true);
await p.goto(BASE + 'templates/komponen.html#crop', { waitUntil: 'networkidle' });
await p.setInputFiles('#k-avatar', FIX + 'land.png'); await p.waitForSelector('.crop-modal[open]');
const fit = await p.$eval('.crop-modal', (e) => { const r = e.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; });
T('dialog muat di HP', fit);
await c.close();
// halaman status
for (const pg of ['500', 'offline', 'maintenance']) {
  [c, p] = await ctx(390, 844, true);
  await p.goto(BASE + `templates/${pg}.html`, { waitUntil: 'networkidle' });
  T(pg + ' ada judul dan maskot', await p.isVisible('main h1') && await p.isVisible('main .empty img'));
  T(pg + ' tanpa scroll samping', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await c.close();
}
T('tanpa error JS', errs.length === 0); if (errs.length) console.log(errs.slice(0, 5));
console.log(ok, 'OK', bad, 'FAIL'); await b.close();
