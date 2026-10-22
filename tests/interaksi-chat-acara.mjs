// FUSIONIFY UI · uji otomatis (interaksi-chat-acara). Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import { BASE, AXE, NM, FIX } from './_env.mjs';
const b=await chromium.launch(); let ok=0,bad=0; const T=(n,c)=>{c?ok++:(bad++,console.log('FAIL',n))};
const U=BASE+'templates/';
// CHAT HP
let c=await b.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true}); let p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto(U+'chat.html',{waitUntil:'networkidle'});
T('hp list visible', await p.isVisible('.convo[data-thread="t-dewi"]'));
await p.click('.convo[data-thread="t-dewi"]');
T('thread open', await p.isVisible('#t-dewi') && await p.evaluate(()=>document.querySelector('[data-chat]').classList.contains('thread-open')));
await p.fill('#t-dewi textarea','Halo dari tes');
await p.click('#t-dewi .send');
T('msg sent', (await p.textContent('#t-dewi .msgs')).includes('Halo dari tes'));
T('preview updated', (await p.textContent('.convo[data-thread="t-dewi"]')).includes('Halo dari tes'));
await p.goBack(); await p.waitForTimeout(200);
T('back closes thread', !(await p.evaluate(()=>document.querySelector('[data-chat]').classList.contains('thread-open'))));
T('no hscroll chat', await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await c.close();
// CHAT DESKTOP
c=await b.newContext({viewport:{width:1366,height:800}}); p=await c.newPage(); p.on('pageerror',e=>errs.push(e.message));
await p.goto(U+'chat.html',{waitUntil:'networkidle'});
T('desk both panes', await p.isVisible('.convo') && (await p.$$eval('.thread',ts=>ts.filter(t=>!t.hidden).length))===1);
await p.click('.convo[data-thread="t-bayu"]'); T('desk switch', await p.isVisible('#t-bayu'));
await p.fill('#t-bayu textarea','Enter kirim'); await p.press('#t-bayu textarea','Enter');
T('enter sends', (await p.textContent('#t-bayu .msgs')).includes('Enter kirim'));
await c.close();
// ACARA
c=await b.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,acceptDownloads:true}); p=await c.newPage(); p.on('pageerror',e=>errs.push(e.message));
await p.goto(U+'acara.html',{waitUntil:'networkidle'});
await p.click('[data-open-sheet="sh-daftar"]'); T('sheet open', await p.isVisible('#sh-daftar'));
await p.click('button[form="f-daftar"]'); T('validation', (await p.$$('#f-daftar [aria-invalid="true"]')).length>=3);
await p.fill('#f-daftar [name=nama]','Rina'); await p.fill('#f-daftar [name=email]','rina@kampus.ac.id'); await p.fill('#f-daftar [name=kampus]','Univ Contoh'); await p.check('#f-daftar [name=setuju]');
await p.click('button[form="f-daftar"]'); await p.waitForTimeout(500);
T('registered: sheet closed', !(await p.isVisible('#sh-daftar')));
T('ticket shown', await p.isVisible('#tiket'));
const [dl]=await Promise.all([p.waitForEvent('download'), p.click('#daftar [data-ics]')]);
const txt=await (await dl.createReadStream()).toArray().then(a=>Buffer.concat(a).toString());
T('ics valid', txt.includes('BEGIN:VEVENT') && txt.includes('DTSTART:20261025T020000Z') && dl.suggestedFilename().endsWith('.ics'));
T('no hscroll acara', await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await c.close();
T('no js errors', errs.length===0); if(errs.length) console.log(errs);
console.log(ok,'OK',bad,'FAIL'); await b.close();
