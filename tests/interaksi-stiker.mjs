// FUSIONIFY UI · uji toples stiker (.jar, js/stiker.js): jatuh, tetap di dalam toples, tarik-lempar, loop berhenti, kurangi gerakan, tanpa JS. Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import { BASE } from './_env.mjs';
const b=await chromium.launch(); let ok=0,bad=0; const T=(n,c,x='')=>{c?ok++:(bad++,console.log('FAIL',n,x))}; const errs=[];
const U=BASE+'demo/index.html';
const ctx=async(o)=>{const c=await b.newContext(o);const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));return [c,p];};
const pos=(p)=>p.evaluate(()=>{const box=document.querySelector('[data-jar-box]').getBoundingClientRect();return [...document.querySelectorAll('[data-jar-box] img')].map(i=>{const r=i.getBoundingClientRect();const cx=r.x+r.width/2,cy=r.y+r.height/2;return {cx,cy,in:cx>box.left&&cx<box.right&&cy>box.top&&cy<box.bottom,tr:i.style.transform}})});
const siap=async(p)=>{await p.goto(U,{waitUntil:'networkidle'});await p.evaluate(()=>document.querySelector('[data-jar]').scrollIntoView({block:'center'}));await p.waitForFunction(()=>document.querySelector('[data-jar]').classList.contains('on'),null,{timeout:8000});await p.waitForTimeout(1500);};

for (const [w,h,mob] of [[1280,900,false],[390,844,true]]) {
  const [c,p]=await ctx({viewport:{width:w,height:h},hasTouch:mob,isMobile:mob});
  await siap(p);
  const bx=await (await p.$('[data-jar-box]')).boundingBox();
  T(w+' tiga stiker bawaan', (await pos(p)).length===3);
  for (let i=0;i<5;i++) { await p.click('[data-jar-add]'); await p.waitForTimeout(120); }
  if (!mob) for (let i=0;i<4;i++) { await p.mouse.click(bx.x+bx.width*(0.2+0.2*i), bx.y+30); await p.waitForTimeout(120); }
  await p.waitForTimeout(3500);
  let s=await pos(p);
  T(w+' stiker bertambah', s.length===(mob?8:12), s.length);
  T(w+' semua stiker di dalam toples', s.every(x=>x.in));
  T(w+' stiker jatuh sampai dasar', s.some(x=>x.cy>bx.y+bx.height-60));
  if (!mob) {
    // tarik lalu lempar stiker pertama
    const [a]=s; await p.mouse.move(a.cx,a.cy); await p.mouse.down();
    for (let k=1;k<=6;k++){ await p.mouse.move(a.cx+k*45,a.cy-k*20); await p.waitForTimeout(16); }
    await p.mouse.up(); await p.waitForTimeout(3500);
    s=await pos(p); T(w+' setelah dilempar tetap di dalam', s.every(x=>x.in));
    // batas 14 stiker
    for (let i=0;i<6;i++) { await p.click('[data-jar-add]'); await p.waitForTimeout(60); }
    await p.waitForTimeout(3500);
    T(w+' maksimal 14 stiker', (await pos(p)).length===14, (await pos(p)).length);
  }
  // loop berhenti setelah diam
  await p.waitForTimeout(2000);
  const t1=(await pos(p)).map(x=>x.tr).join(); await p.waitForTimeout(1200); const t2=(await pos(p)).map(x=>x.tr).join();
  T(w+' diam = tidak digambar ulang', t1===t2, t1+' VS '+t2);
  T(w+' tanpa scroll samping', !(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)));
  await c.close();
}

// kurangi gerakan: stiker langsung di dasar, tanpa animasi
{ const [c,p]=await ctx({viewport:{width:1280,height:900},reducedMotion:'reduce'}); await siap(p);
  await p.click('[data-jar-add]'); await p.waitForTimeout(50);
  const bx=await (await p.$('[data-jar-box]')).boundingBox(); const s=await pos(p);
  T('kurangi gerakan: stiker baru langsung diam di dalam', s.length===4 && s.every(x=>x.in && x.cy>bx.y+bx.height/2));
  await c.close(); }

// tanpa JS: tiga stiker diam, tombol disembunyikan
{ const [c,p]=await ctx({viewport:{width:1280,height:900},javaScriptEnabled:false}); await p.goto(U);
  const s=await pos(p); T('tanpa JS: stiker di dalam toples', s.length===3 && s.every(x=>x.in));
  T('tanpa JS: tombol tidak terlihat', await p.evaluate(()=>getComputedStyle(document.querySelector('.jar-head')).visibility==='hidden'));
  await c.close(); }

T('tanpa error JS', errs.length===0, errs.join(' | '));
await b.close();
console.log(ok+' OK '+bad+' FAIL'); process.exit(bad?1:0);
