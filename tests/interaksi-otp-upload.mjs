// FUSIONIFY UI · uji otomatis (interaksi-otp-upload). Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import { BASE, AXE, NM, FIX } from './_env.mjs';
import fs from 'fs';
const S=FIX;
fs.writeFileSync(S+'a.png', fs.readFileSync(new URL('../brand/app-icons/icon-192.png', import.meta.url)));
fs.writeFileSync(S+'big.png', Buffer.alloc(3*1024*1024));
fs.writeFileSync(S+'doc.pdf', '%PDF-1.4 tes'); fs.writeFileSync(S+'x.txt','hai');
const b=await chromium.launch(); let ok=0,bad=0; const T=(n,c)=>{c?ok++:(bad++,console.log('FAIL',n))};
const c=await b.newContext({viewport:{width:390,height:844}}); const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto(BASE+'templates/komponen.html',{waitUntil:'networkidle'});
const boxes=p.locator('#k-otp .otp-box');
T('6 boxes', await boxes.count()===6);
await boxes.nth(0).click(); await p.keyboard.type('98');
T('advance', await p.evaluate(()=>document.activeElement===document.querySelectorAll('#k-otp .otp-box')[2]));
await p.keyboard.press('Backspace'); await p.keyboard.press('Backspace');
T('backspace', await p.$eval('#k-otp input[name=kode]',x=>x.value)==='');
// paste
await boxes.nth(0).focus();
await p.evaluate(()=>{const dt=new DataTransfer(); dt.setData('text','12 34 56'); document.querySelector('#k-otp .otp-box').dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));});
T('paste fill', await p.$eval('#k-otp input[name=kode]',x=>x.value)==='123456');
T('error state', await p.getAttribute('#k-otp','aria-invalid')==='true' && (await p.textContent('#k-otp ~ .err, .field .err')).includes('belum cocok'));
// autofill style: whole code into first box input event
await boxes.nth(0).fill('654321');
T('autofill split', await p.$eval('#k-otp input[name=kode]',x=>x.value)==='654321' && await p.getAttribute('#k-otp','aria-invalid')===null && !(await p.$('#otp .err')));
// Snackbar muncul sesaat setelah kode lengkap; di mesin CI yang lambat cek langsung bisa terlalu cepat
T('done snackbar', await p.waitForSelector('.snackbar', { state: 'visible', timeout: 3000 }).then(() => true, () => false));
const cd=p.locator('[data-countdown]'); T('countdown', await cd.isDisabled() && /\(0:\d\d\)/.test(await cd.textContent()));
// alnum
const ab=p.locator('[aria-labelledby=otp-l2] .otp-box'); T('alnum 5', await ab.count()===5);
await ab.nth(0).click(); await p.keyboard.type('ab9xz'); T('alnum upper', await p.$eval('input[name=undangan]',x=>x.value)==='AB9XZ');
// upload single
await p.setInputFiles('#k-foto', S+'a.png');
T('foto preview', await p.locator('#k-foto ~ .upload-list img').count()===1);
await p.setInputFiles('#k-foto', S+'big.png');
T('foto too big', (await p.textContent('#k-foto ~ .err')).includes('2 MB'));
// multi
await p.setInputFiles('#k-berkas', [S+'a.png', S+'doc.pdf', S+'x.txt']);
T('multi accepted 2', await p.locator('#k-dok .up-item').count()===2);
T('txt rejected', (await p.textContent('#k-dok .err')).includes('tidak didukung'));
T('input has files', await p.$eval('#k-berkas',x=>x.files.length)===2);
await p.click('#k-dok [aria-label="Hapus doc.pdf"]');
T('removed', await p.locator('#k-dok .up-item').count()===1 && await p.$eval('#k-berkas',x=>x.files.length)===1);
// progress api
await p.evaluate(()=>{const w=document.getElementById('k-dok'); const f=w._fyUpload.files()[0]; w._fyUpload.progress(f,.5);});
T('progress', await p.locator('#k-dok .progress').count()===1);
await p.evaluate(()=>{const w=document.getElementById('k-dok'); w._fyUpload.done(w._fyUpload.files()[0]);});
T('done text', (await p.textContent('#k-dok .up-item small')).includes('terunggah'));
// drag-drop
await p.evaluate(async()=>{const w=document.getElementById('k-dok'); const dt=new DataTransfer(); dt.items.add(new File(['x'],'foto2.jpg',{type:'image/jpeg'})); w.dispatchEvent(new DragEvent('drop',{dataTransfer:dt,bubbles:true,cancelable:true}));});
T('drop add', await p.locator('#k-dok .up-item').count()===2);
await p.locator('#otp').screenshot({path:S+'otp.png'}); await p.locator('#upload').screenshot({path:S+'upl.png'});
T('no errors', errs.length===0); if(errs.length) console.log(errs);
console.log(ok,'OK',bad,'FAIL'); await b.close();
