// FUSIONIFY UI · uji otomatis (komponen 1.13: jumlah, rating, galeri, pengumuman, cookie, hitung mundur, breadcrumb). Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import { BASE } from './_env.mjs';
const b=await chromium.launch(); let ok=0,bad=0; const T=(n,c)=>{c?ok++:(bad++,console.log('FAIL',n))}; const errs=[];
const U=BASE+'templates/komponen.html';
const ctx=async(w,h,mob=false,sc='light')=>{const c=await b.newContext({viewport:{width:w,height:h},hasTouch:mob,isMobile:mob,colorScheme:sc});const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});return [c,p];};
let [c,p]=await ctx(1280,900);
await p.goto(U,{waitUntil:'networkidle'});

// jumlah
const q='#form-plus [data-qty]';
T('qty awal 1', await p.inputValue(q+' input')==='1');
T('qty kurang nonaktif di min', await p.isDisabled(q+' [data-qty-step="-1"]'));
let ev=0; await p.evaluate(()=>{window._qty=[];document.querySelector('#form-plus [data-qty]').addEventListener('fy:change',e=>window._qty.push(e.detail.value));});
for (let i=0;i<4;i++) await p.click(q+' [data-qty-step="1"]');
T('qty berhenti di max 5', await p.inputValue(q+' input')==='5');
T('qty tambah nonaktif di max', await p.isDisabled(q+' [data-qty-step="1"]'));
T('qty event fy:change', JSON.stringify(await p.evaluate(()=>window._qty))==='[2,3,4,5]');
await p.fill(q+' input','99'); await p.press(q+' input','Tab');
T('qty ketik dijepit ke max', await p.inputValue(q+' input')==='5');
await p.focus(q+' input'); await p.press(q+' input','ArrowDown');
T('qty panah bawah', await p.inputValue(q+' input')==='4');

// rating input
await p.click('#rating label[for=rt2]');
T('rating pilih 2', await p.isChecked('#rt2') && !(await p.isChecked('#rt4')));
T('rating tampil ukuran wajar', await p.$eval('#rating .rating .stars', e=>Math.round(e.getBoundingClientRect().width))===130);

// hitung mundur
await p.waitForTimeout(1200);
const cd=await p.$$eval('#toko [data-cd]', es=>es.map(e=>e.textContent));
T('hitung mundur terisi', cd[0]==='3' && ['04','05'].includes(cd[1]) && /^\d\d$/.test(cd[3]));
T('hitung mundur teks pembaca layar', (await p.$eval('#toko .countdown .sr-only', e=>e.textContent)).startsWith('Sisa 3 hari'));
await p.evaluate(()=>{ const el=document.createElement('div'); el.className='countdown'; el.id='cd-lewat'; el.dataset.tenggat='2020-01-01T00:00:00Z'; el.innerHTML='<span class="cd-unit"><b data-cd="detik">--</b></span>'; document.body.append(el); });
await p.evaluate(async()=>{ const m=await import('/js/controls.js'); m.initControls(document.getElementById('cd-lewat').parentNode); });
await p.waitForTimeout(100);
T('hitung mundur lewat = selesai', await p.evaluate(()=>document.getElementById('cd-lewat').classList.contains('selesai')));

// galeri
await p.click('#galeri a:nth-child(2)');
T('lightbox terbuka', await p.isVisible('dialog.lightbox'));
T('lightbox gambar kedua', (await p.getAttribute('dialog.lightbox img','src')).endsWith('welcome.webp'));
T('lightbox hitungan', (await p.textContent('dialog.lightbox .lb-count'))==='2 / 4');
await p.keyboard.press('ArrowRight');
T('lightbox panah kanan', (await p.textContent('dialog.lightbox .lb-count'))==='3 / 4');
await p.click('dialog.lightbox .lb-next'); await p.click('dialog.lightbox .lb-next');
T('lightbox berputar ke awal', (await p.textContent('dialog.lightbox .lb-count'))==='1 / 4');
T('lightbox caption dari alt', (await p.textContent('dialog.lightbox .lb-cap'))==='Maskot senang');
await p.keyboard.press('Escape');
T('lightbox tutup Esc', !(await p.isVisible('dialog.lightbox')));
T('fokus kembali ke thumbnail', await p.evaluate(()=>document.activeElement===document.querySelector('#galeri a:nth-child(1)')||document.activeElement===document.querySelector('#galeri a:nth-child(2)')));

// pengumuman dan cookie
T('cookie tampil awal', await p.isVisible('#promo [data-consent]'));
await p.click('#promo .announce-close');
T('pengumuman tertutup', await p.isHidden('#promo [data-announce]'));
let cons=p.evaluate(()=>new Promise(r=>addEventListener('fy:consent',e=>r(e.detail.pilihan),{once:true})));
await p.click('#promo [data-consent-pilih="penting"]');
T('event fy:consent', await cons==='penting');
T('cookie tersimpan', await p.evaluate(()=>JSON.parse(localStorage.getItem('fy-consent')).pilihan)==='penting');
await p.reload({waitUntil:'networkidle'});
T('pengumuman tetap tertutup', await p.isHidden('#promo [data-announce]'));
T('cookie tidak muncul lagi', await p.isHidden('#promo [data-consent]'));
await p.click('#reset-promo');
T('contoh bisa ditampilkan lagi', await p.isVisible('#promo [data-consent]') && await p.isVisible('#promo [data-announce]'));
await c.close();

// HP
[c,p]=await ctx(375,667,true);
await p.goto(U,{waitUntil:'networkidle'});
T('breadcrumb HP 2 tingkat', await p.$$eval('#navigasi-web .breadcrumb li', ls=>ls.filter(l=>getComputedStyle(l).display!=='none').length)===2);
T('pagination HP tanpa nomor lain', await p.$$eval('#navigasi-web .pagination a', as=>as.filter(a=>getComputedStyle(a).display!=='none').length)===3);
T('kartu produk 2 kolom di HP', await p.$$eval('#toko .product-grid > li', ls=>new Set(ls.map(l=>Math.round(l.getBoundingClientRect().top))).size)===2);
await p.tap('#galeri a:nth-child(1)');
T('lightbox HP terbuka', await p.isVisible('dialog.lightbox'));
T('tanpa scroll horizontal', await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await c.close();

await b.close();
T('tanpa error JS', errs.length===0); if (errs.length) console.log(errs.slice(0,5));
console.log(`${ok} OK ${bad} FAIL`); process.exit(bad?1:0);
