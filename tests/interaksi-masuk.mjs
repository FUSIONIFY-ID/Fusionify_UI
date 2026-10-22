// FUSIONIFY UI · uji otomatis (interaksi-masuk). Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import { BASE, AXE, NM, FIX } from './_env.mjs';
const B=BASE+'templates/';
const b = await chromium.launch(); const out=[]; const ok=(n,c)=>out.push((c?'OK   ':'FAIL ')+n);
// --- admin desktop
let c = await b.newContext({viewport:{width:1440,height:900}}); let p = await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto(B+'admin.html',{waitUntil:'networkidle'});
await p.click('.user-chip'); ok('dropdown buka', await p.isVisible('.user-chip + .menu'));
await p.keyboard.press('ArrowDown'); ok('dropdown panah', await p.evaluate(()=>document.activeElement.textContent.includes('Pengaturan')));
await p.keyboard.press('Escape'); ok('dropdown Esc', await p.isHidden('.user-chip + .menu'));
await p.click('[data-open-modal="hapus"]'); ok('modal buka', await p.evaluate(()=>document.getElementById('hapus').open));
await p.click('#hapus .btn.danger'); ok('modal tutup + toast', !(await p.evaluate(()=>document.getElementById('hapus').open)) && await p.evaluate(()=>document.querySelector('[data-toast]').classList.contains('show')));
await p.click('#tab-aman'); ok('tab klik', await p.isVisible('#p-aman') && await p.isHidden('#p-umum'));
await p.keyboard.press('ArrowRight'); ok('tab panah', await p.isVisible('#p-notif'));
await p.check('[data-check-all]'); ok('pilih semua', await p.evaluate(()=>[...document.querySelectorAll('tbody input')].every(i=>i.checked)));
await p.click('[data-theme-toggle]'); ok('tema gelap', await p.evaluate(()=>document.documentElement.dataset.theme==='dark' && localStorage.getItem('fy-theme')==='dark'));
await p.reload({waitUntil:'networkidle'}); ok('tema tersimpan', await p.evaluate(()=>document.documentElement.dataset.theme==='dark'));
await p.click('[data-theme-toggle]'); ok('tema terang lagi', await p.evaluate(()=>document.documentElement.dataset.theme==='light'));
ok('tanpa error JS admin', errs.length===0); await c.close();
// --- admin mobile sidebar
c = await b.newContext({viewport:{width:390,height:844}}); p = await c.newPage();
await p.goto(B+'admin.html',{waitUntil:'networkidle'});
ok('sidebar tertutup awal', await p.evaluate(()=>document.querySelector('[data-side]').getBoundingClientRect().right<=0 && document.querySelector('[data-side]').inert));
await p.click('[data-side-toggle]'); await p.waitForTimeout(500); ok('sidebar buka', await p.evaluate(()=>document.querySelector('[data-side]').getBoundingClientRect().left>=-1 && !document.querySelector('[data-side]').inert));
await p.keyboard.press('Escape'); await p.waitForTimeout(500); ok('sidebar Esc', await p.evaluate(()=>document.querySelector('[data-side]').getBoundingClientRect().right<=0));
await p.click('[data-side-toggle]'); await p.waitForTimeout(500); await p.mouse.click(380,400); await p.waitForTimeout(500); ok('sidebar klik scrim', await p.evaluate(()=>!document.querySelector('[data-app]').classList.contains('side-open')));
await c.close();
// --- auth
c = await b.newContext({viewport:{width:1440,height:900}}); p = await c.newPage();
await p.goto(B+'auth/daftar.html',{waitUntil:'networkidle'});
await p.click('button[type=submit]'); ok('validasi kosong', await p.evaluate(()=>document.querySelectorAll('[aria-invalid="true"]').length>=4 && document.activeElement.id==='nama'));
await p.fill('#nama','Jundy'); await p.fill('#email','salah'); await p.fill('#pw','abc'); await p.fill('#pw2','abd');
await p.click('button[type=submit]'); ok('pesan email salah', (await p.textContent('#email-err'))?.includes('email'));
ok('pesan password pendek', (await p.textContent('#pw-err'))?.includes('8'));
ok('meter lemah', await p.evaluate(()=>document.querySelector('[data-pw-meter]').dataset.level==='1'));
await p.fill('#email','jundy@contoh.id'); await p.fill('#pw','Rahasia#2026kuat'); await p.fill('#pw2','Rahasia#2026kuat');
ok('meter kuat', await p.evaluate(()=>document.querySelector('[data-pw-meter]').dataset.level==='4'));
await p.click('.pw-toggle'); ok('tampil password', await p.evaluate(()=>document.getElementById('pw').type==='text'));
await p.check('input[name=setuju]'); await p.click('button[type=submit]'); ok('daftar berhasil', await p.isVisible('#daftar-ok'));
await p.goto(B+'auth/lupa-password.html'); await p.fill('#email','a@b.co'); await p.click('button[type=submit]'); ok('lupa password terkirim', await p.isVisible('#lupa-ok'));
await p.goto(B+'auth/atur-ulang-password.html'); await p.fill('#pw','Baru#12345'); await p.fill('#pw2','Beda#12345'); await p.click('button[type=submit]'); ok('reset: password beda ditolak', await p.isVisible('#pw2-err'));
await p.fill('#pw2','Baru#12345'); await p.click('button[type=submit]'); ok('reset berhasil', await p.isVisible('#reset-ok'));
await c.close(); await b.close();
console.log(out.join('\n'));
