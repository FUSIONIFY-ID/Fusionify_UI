// FUSIONIFY UI · uji otomatis (kursor, menu HP, nav, tema manual). Dijalankan oleh tests/run.mjs
// 1. Kursor segel: cincin garis (bukan cakram progres .ring), mengecil/membesar lewat scale.
// 2. Bingkai foto tim (.person .ph .ring) tidak ikut gaya progres lingkaran.
// 3. Progres lingkaran (.ring di komponen) tetap conic 64px.
// 4. Menu HP: lingkaran biru (pseudo-element, transform) membesar dari tombol menu dan menutup layar.
// 5. Nav: kapsul muncul lewat ::before (opacity), tanpa transisi padding/top/box-shadow.
// 6. Tema gelap lewat tombol [data-theme-toggle]: kontras axe lulus di beberapa halaman.
import { chromium } from 'playwright';
import { BASE, AXE, NM } from './_env.mjs';

const b = await chromium.launch(); let ok = 0, bad = 0;
const T = (n, c, info = '') => { c ? ok++ : (bad++, console.log('FAIL', n, info)); };
const route = (p) => p.route(/cdn\.jsdelivr\.net\/npm\/(gsap|lenis)@[^/]+\/(.*)$/, (r) => { const m = r.request().url().match(/npm\/(gsap|lenis)@[^/]+\/(.*)$/); r.fulfill({ path: NM + m[1] + '/' + m[2], contentType: 'text/javascript' }); });
const open = async (pg, opts) => { const c = await b.newContext(opts); const p = await c.newPage(); await route(p); const err = []; p.on('pageerror', (e) => err.push(e.message)); await p.goto(BASE + pg, { waitUntil: 'networkidle' }); await p.waitForTimeout(400); return { c, p, err }; };

/* ---------- 1-2. Kursor dan foto tim (demo, mouse) ---------- */
for (const pg of ['demo/index.html', 'templates/landing-produk.html']) {
  const { c, p, err } = await open(pg, { viewport: { width: 1366, height: 768 } });
  await p.mouse.move(200, 400); await p.mouse.move(260, 420, { steps: 4 }); await p.waitForTimeout(500);
  const st = () => p.evaluate(() => { const r = document.querySelector('.cursor .ring'); const cs = getComputedStyle(r); return { bg: cs.backgroundImage, before: getComputedStyle(r, '::before').content, w: cs.width, scale: cs.scale, has: document.documentElement.classList.contains('has-cursor') }; });
  const a = await st();
  T(pg + ' kursor aktif', a.has);
  T(pg + ' cincin kursor tanpa latar conic', a.bg === 'none', a.bg);
  T(pg + ' cincin kursor tanpa piringan ::before', a.before === 'none' || a.before === 'normal', a.before);
  T(pg + ' cincin kursor 70px, kecil lewat scale', a.w === '70px' && Math.abs(parseFloat(a.scale) - 0.6286) < 0.01, a.w + ' ' + a.scale);
  const link = await p.$('main a.btn, main .btn, a.btn');
  const box = await link.boundingBox();
  await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 }); await p.waitForTimeout(600);
  const bsr = await st();
  T(pg + ' cincin membesar di atas tautan (scale 1)', parseFloat(bsr.scale) === 1, bsr.scale);
  const trans = await p.evaluate(() => getComputedStyle(document.querySelector('.cursor .ring')).transitionProperty);
  T(pg + ' cincin hanya mentransisikan scale', trans === 'scale', trans);
  if (pg === 'demo/index.html') {
    const ph = await p.evaluate(() => { const r = document.querySelector('.person .ph .ring'); const ph = r.parentElement; const cs = getComputedStyle(r); return { bg: cs.backgroundImage, w: r.getBoundingClientRect().width, pw: ph.getBoundingClientRect().width }; });
    T('bingkai foto tim tanpa latar conic', ph.bg === 'none', ph.bg);
    T('bingkai foto tim mengikuti foto (110%), bukan 64px', Math.abs(ph.w - ph.pw * 1.1) < 2, ph.w + ' vs ' + ph.pw);
  }
  T(pg + ' tanpa error JS', err.length === 0, err.join(' | '));
  await c.close();
}

/* ---------- 3. Progres lingkaran tetap ---------- */
{
  const { c, p } = await open('templates/komponen.html', { viewport: { width: 1366, height: 768 } });
  const r = await p.evaluate(() => { const e = document.querySelector('span.ring[role="progressbar"]'); const cs = getComputedStyle(e); return { bg: cs.backgroundImage, w: cs.width, before: getComputedStyle(e, '::before').content }; });
  T('progres .ring tetap conic', r.bg.includes('conic-gradient'), r.bg);
  T('progres .ring 64px dengan piringan', r.w === '64px' && r.before !== 'none', r.w + ' ' + r.before);
  await c.close();
}

/* ---------- 4-5. Menu HP dan nav ---------- */
for (const [w, h] of [[375, 667], [390, 844], [820, 1180]]) {
  const { c, p } = await open('demo/index.html', { viewport: { width: w, height: h } });
  const trans = await p.evaluate(() => { const d = document.querySelector('[data-drawer]'); return { d: getComputedStyle(d).transitionProperty, b: getComputedStyle(d, '::before').transitionProperty, nav: getComputedStyle(document.querySelector('[data-nav]')).transitionProperty }; });
  T(`@${w} drawer tidak mentransisikan clip-path`, !trans.d.includes('clip-path') && trans.b === 'transform', JSON.stringify(trans));
  T(`@${w} nav hanya mentransisikan transform`, trans.nav === 'transform', trans.nav);
  await p.click('[data-menu]'); await p.waitForTimeout(1000);
  const s = await p.evaluate(() => {
    const d = document.querySelector('[data-drawer]'); const cs = getComputedStyle(d, '::before');
    const btn = document.querySelector('[data-menu]').getBoundingClientRect();
    // pusat lingkaran = pusat kotak ::before (300vmax), lalu jari-jari setelah scale
    const vm = Math.max(innerWidth, innerHeight) / 100; const R = 150 * vm * new DOMMatrix(cs.transform).a;
    const cx = innerWidth - parseFloat(cs.right) - 150 * vm, cy = parseFloat(cs.top) + 150 * vm;
    const far = Math.max(...[[0, 0], [innerWidth, 0], [0, innerHeight], [innerWidth, innerHeight]].map(([x, y]) => Math.hypot(x - cx, y - cy)));
    return { vis: getComputedStyle(d).visibility, scale: new DOMMatrix(cs.transform).a, cover: R >= far, cx, cy, bx: btn.left + btn.width / 2, by: btn.top + btn.height / 2, ul: getComputedStyle(d.querySelector('ul')).opacity };
  });
  T(`@${w} menu terbuka penuh`, s.vis === 'visible' && s.scale === 1 && s.cover, JSON.stringify(s));
  T(`@${w} lingkaran berpusat di tombol menu (±4px)`, Math.abs(s.cx - s.bx) < 4 && Math.abs(s.cy - s.by) < 4, JSON.stringify(s));
  T(`@${w} isi menu tampil`, +s.ul === 1, s.ul);
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  T(`@${w} saat menutup menu masih terlihat (menunggu animasi)`, (await p.evaluate(() => getComputedStyle(document.querySelector('[data-drawer]')).visibility)) === 'visible');
  await p.waitForTimeout(900);
  T(`@${w} menu tertutup`, (await p.evaluate(() => getComputedStyle(document.querySelector('[data-drawer]')).visibility)) === 'hidden');
  await p.evaluate(() => scrollTo(0, 200)); await p.waitForTimeout(700);
  const nv = await p.evaluate(() => { const n = document.querySelector('[data-nav]'); return { cls: n.className, op: getComputedStyle(n, '::before').opacity }; });
  T(`@${w} nav jadi kapsul setelah scroll`, nv.cls.includes('scrolled') && +nv.op === 1, JSON.stringify(nv));
  await c.close();
}

/* ---------- 6. Tema gelap manual (tombol) + kontras ---------- */
for (const pg of ['demo/index.html', 'templates/landing-produk.html', 'templates/dashboard.html', 'templates/auth/masuk.html', 'templates/bayar-qris.html', 'templates/dokumentasi.html', 'templates/komponen.html', 'templates/chat.html']) {
  for (const w of [1440, 390]) {
    const { c, p } = await open(pg, { viewport: { width: w, height: 900 }, colorScheme: 'light' });
    const tombol = await p.$$('[data-theme-toggle]');
    const terlihat = []; for (const t of tombol) if (await t.isVisible()) terlihat.push(t);
    if (terlihat.length) await terlihat[0].click();
    else await p.evaluate(() => document.querySelector('[data-theme-toggle]').click()); // tombol di menu tersembunyi: klik lewat DOM
    await p.waitForTimeout(500);
    T(`${pg} @${w} tema gelap lewat tombol`, (await p.getAttribute('html', 'data-theme')) === 'dark');
    await p.addStyleTag({ content: '[data-reveal],.split .w>span{opacity:1!important;transform:none!important}' });
    await p.addScriptTag({ content: AXE });
    const v = await p.evaluate(async () => (await axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast'] } })).violations.map((x) => x.nodes.slice(0, 3).map((n) => n.target.join(' ') + ' ' + (n.any[0]?.message || '').slice(0, 80)).join(' || ')));
    T(`${pg} @${w} kontras tema gelap manual`, v.length === 0, v.join(' ## '));
    await c.close();
  }
}

console.log(`${ok} OK ${bad} FAIL`);
await b.close();
process.exit(bad ? 1 : 0);
