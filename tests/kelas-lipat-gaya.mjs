// FUSIONIFY UI · uji kelas ukuran layar, HP lipat, mode padat, dan gaya per kategori. Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import { BASE, NM } from './_env.mjs';

const b = await chromium.launch();
let ok = 0, fail = 0;
const cek = (benar, pesan) => { if (benar) ok++; else { fail++; console.log('FAIL:', pesan); } };
const route = (p) => p.route(/cdn\.jsdelivr\.net\/npm\/(gsap|lenis)@[^/]+\/(.*)$/, (r) => { const m = r.request().url().match(/npm\/(gsap|lenis)@[^/]+\/(.*)$/); r.fulfill({ path: NM + m[1] + '/' + m[2], contentType: 'text/javascript' }); });
const buka = async (url, w, h = 900, extra = {}) => {
  const c = await b.newContext({ viewport: { width: w, height: h }, ...extra });
  const p = await c.newPage(); await route(p);
  const err = []; p.on('pageerror', (e) => err.push(e.message));
  await p.goto(BASE + url, { waitUntil: 'networkidle' }); await p.waitForTimeout(300);
  return { c, p, err };
};

// 1. data-kelas mengikuti lebar, di halaman web (initFusionify) dan aplikasi (initApp)
const harap = [[390, 'ringkas'], [700, 'sedang'], [1000, 'lebar'], [1366, 'besar'], [1700, 'sangat-besar']];
for (const pg of ['templates/landing-produk.html', 'templates/dashboard.html']) {
  for (const [w, kelas] of harap) {
    const { c, p, err } = await buka(pg, w);
    cek((await p.evaluate(() => document.documentElement.dataset.kelas)) === kelas, `${pg} @${w}: data-kelas harus ${kelas}`);
    cek(!(await p.evaluate(() => document.documentElement.hasAttribute('data-lipat'))), `${pg} @${w}: data-lipat tidak boleh ada di layar biasa`);
    cek(err.length === 0, `${pg} @${w}: error JS ${err.join('; ')}`);
    await c.close();
  }
}
// Berubah saat ukuran jendela berubah, dengan event fy:kelas
{
  const { c, p } = await buka('templates/dashboard.html', 1366);
  await p.evaluate(() => { window.__k = []; document.documentElement.addEventListener('fy:kelas', (e) => window.__k.push(e.detail.kelas)); });
  await p.setViewportSize({ width: 700, height: 900 }); await p.waitForTimeout(200);
  cek((await p.evaluate(() => window.__k.at(-1))) === 'sedang', 'fy:kelas terkirim saat lebar berubah ke kelas sedang');
  await c.close();
}

// 2. Sidebar aplikasi: laci di ringkas, rel di sedang, penuh di lebar ke atas (mode padat 232px)
for (const [w, mode] of [[390, 'laci'], [700, 'rel'], [1000, 'penuh'], [1440, 'penuh']]) {
  const { c, p } = await buka('templates/dashboard.html', w);
  const r = await p.evaluate(() => {
    const side = document.querySelector('.side').getBoundingClientRect();
    const tog = document.querySelector('.side-toggle, [data-side-toggle]');
    return { w: side.width, x: side.right, tog: tog ? getComputedStyle(tog).display : 'none', inert: document.querySelector('.side').inert, sw: document.documentElement.scrollWidth };
  });
  if (mode === 'laci') cek(r.x <= 0 && r.tog !== 'none' && r.inert, `dashboard @${w}: sidebar harus laci tertutup (right=${r.x}, toggle=${r.tog}, inert=${r.inert})`);
  if (mode === 'rel') cek(r.w >= 72 && r.w <= 96 && r.tog === 'none' && !r.inert, `dashboard @${w}: sidebar harus rel 72-96px (lebar=${r.w}, toggle=${r.tog})`);
  if (mode === 'penuh') cek(Math.round(r.w) === 232 && r.tog === 'none', `dashboard @${w}: sidebar penuh padat harus 232px (lebar=${r.w})`);
  cek(r.sw <= w, `dashboard @${w}: tidak boleh ada scroll horizontal (${r.sw})`);
  await c.close();
}

// 3. Mode padat: teks 15px, panel datar
{
  const { c, p } = await buka('templates/dashboard.html', 1440);
  const r = await p.evaluate(() => {
    const app = getComputedStyle(document.querySelector('.app'));
    const panel = getComputedStyle(document.querySelector('.panel'));
    return { fs: app.fontSize, shadow: panel.boxShadow, bw: panel.borderTopWidth };
  });
  cek(r.fs === '15px', `padat: teks .app harus 15px (${r.fs})`);
  cek(r.shadow === 'none' && r.bw === '1px', `padat: panel datar bergaris 1px (${r.shadow}, ${r.bw})`);
  await c.close();
}

// 4. Gaya per kategori: tebal garis dan bayangan ikut atribut, markup sama
const gaya = { '': ['2px', true], toko: ['2px', true], tenang: ['1px', false], jasa: ['1px', false], teknis: ['1px', false] };
for (const [g, [garis, pejal]] of Object.entries(gaya)) {
  const { c, p, err } = await buka('templates/gaya.html' + (g ? '?gaya=' + g : ''), 1440);
  const r = await p.evaluate(() => {
    const kartu = getComputedStyle(document.querySelector('#komponen .svc'));
    const tampil = [...document.querySelectorAll('.hero.contoh')].filter((s) => getComputedStyle(s).display !== 'none').length;
    return { bw: kartu.borderTopWidth, shadow: kartu.boxShadow, tampil, gaya: document.documentElement.dataset.gaya || '' };
  });
  cek(r.gaya === g, `gaya.html?gaya=${g}: atribut data-gaya terpasang (${r.gaya})`);
  cek(r.bw === garis, `gaya ${g || 'stiker'}: garis kartu harus ${garis} (${r.bw})`);
  cek(pejal ? /\d+px 0px/.test(r.shadow) : !/ 0px 0px rgb/.test(r.shadow) || r.shadow === 'none', `gaya ${g || 'stiker'}: bayangan pejal ${pejal ? 'ada' : 'tidak ada'} (${r.shadow})`);
  cek(r.tampil === 1, `gaya ${g || 'stiker'}: tepat satu hero contoh tampil (${r.tampil})`);
  cek(err.length === 0, `gaya ${g || 'stiker'}: error JS ${err.join('; ')}`);
  await c.close();
}
// Gaya tenang dan teknis tanpa kursor segel
for (const g of ['tenang', 'teknis']) {
  const { c, p } = await buka('templates/gaya.html?gaya=' + g, 1440);
  cek(!(await p.evaluate(() => document.documentElement.classList.contains('has-cursor'))), `gaya ${g}: kursor segel harus mati`);
  await c.close();
}

// 5. HP lipat setengah terbuka (engsel di tengah, layar terbagi kiri-kanan), lewat emulasi Chromium
{
  const { c, p } = await buka('templates/gaya.html', 1346, 841);
  let didukung = true;
  try {
    const cdp = await c.newCDPSession(p);
    // Engsel tegak di x=663, lebar 20px: layar kiri 0-663, layar kanan 683-1346
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1346, height: 841, deviceScaleFactor: 1, mobile: false, displayFeature: { orientation: 'vertical', offset: 663, maskLength: 20 } });
    await p.waitForTimeout(400);
  } catch { didukung = false; }
  if (didukung && (await p.evaluate(() => matchMedia('(horizontal-viewport-segments: 2)').matches))) {
    const r = await p.evaluate(() => {
      const kiri = document.querySelector('.hero.contoh[data-untuk="stiker"] .hero-copy').getBoundingClientRect();
      const kanan = document.querySelector('.hero.contoh[data-untuk="stiker"] .hero-media').getBoundingClientRect();
      return { lipat: document.documentElement.dataset.lipat, kiriKanan: kiri.right, kananKiri: kanan.left, sw: document.documentElement.scrollWidth };
    });
    cek(r.lipat === 'kiri-kanan', `lipat: data-lipat harus kiri-kanan (${r.lipat})`);
    cek(r.kiriKanan <= 663 && r.kananKiri >= 683, `lipat: teks dan media tidak boleh menyeberangi engsel (teks s/d ${r.kiriKanan}, media dari ${r.kananKiri})`);
    cek(r.sw <= 1346, `lipat: tidak ada scroll horizontal (${r.sw})`);
    // Chat: daftar di layar kiri, isi obrolan di layar kanan
    await p.goto(BASE + 'templates/chat.html', { waitUntil: 'networkidle' }); await p.waitForTimeout(300);
    const cdp2 = await c.newCDPSession(p);
    await cdp2.send('Emulation.setDeviceMetricsOverride', { width: 1346, height: 841, deviceScaleFactor: 1, mobile: false, displayFeature: { orientation: 'vertical', offset: 663, maskLength: 20 } });
    await p.waitForTimeout(400);
    const ch = await p.evaluate(() => ({ list: document.querySelector('.chat-list').getBoundingClientRect().right, thread: document.querySelector('.thread').getBoundingClientRect().left }));
    cek(ch.list <= 663 && ch.thread >= 683, `lipat: daftar obrolan di kiri engsel, isi di kanan (daftar s/d ${ch.list}, isi dari ${ch.thread})`);
  } else {
    console.log('INFO: Chromium ini tidak mendukung emulasi engsel, uji lipat dilewati');
  }
  await c.close();
}

// 6. Hero sama dengan fusionify.id: judul dua baris, angka, maskot papan yang bereaksi
{
  const { c, p, err } = await buka('demo/index.html', 1440);
  const r = await p.evaluate(() => {
    const l2 = document.querySelector('.hero h1 .l2');
    return { l2: l2 && getComputedStyle(l2).display === 'block', meta: document.querySelectorAll('.hero-meta > div').length, hint: getComputedStyle(document.querySelector('.scroll-hint')).display !== 'none', sign: document.querySelector('[data-sign] span')?.textContent };
  });
  cek(r.l2 && r.meta === 3 && r.hint, `hero demo: judul dua baris, 3 angka, ajakan gulir (${JSON.stringify(r)})`);
  const m = p.locator('[data-mascot]');
  await m.hover(); await p.waitForTimeout(700);
  cek(await p.evaluate(() => document.querySelector('.pose[data-pose="shy"]').classList.contains('on')), 'maskot: malu saat didekati kursor');
  for (let i = 0; i < 4; i++) { await m.click(); await p.waitForTimeout(520); }
  await p.waitForTimeout(400);
  const marah = await p.evaluate(() => ({ on: document.querySelector('.pose[data-pose="angry"]').classList.contains('on'), say: document.querySelector('[data-bubble]').textContent }));
  cek(marah.on && /geli/.test(marah.say), `maskot: ngambek setelah dicolek 4 kali (${JSON.stringify(marah)})`);
  await p.waitForTimeout(3000);
  cek((await p.evaluate(() => document.querySelector('[data-sign] span:last-child')?.textContent)) !== r.sign, 'maskot: papan berganti tulisan');
  cek(err.length === 0, 'hero demo: error JS ' + err.join('; '));
  await c.close();
}

console.log(`${ok} OK ${fail} FAIL`);
await b.close();
