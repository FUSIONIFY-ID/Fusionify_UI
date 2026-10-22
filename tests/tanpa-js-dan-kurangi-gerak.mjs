// FUSIONIFY UI · uji otomatis (tanpa-js-dan-kurangi-gerak). Dijalankan oleh tests/run.mjs
// Cek: semua ukuran (scroll samping, teks terpotong), tanpa JavaScript (konten terbaca), dan kurangi gerakan (semua langsung tampil).
import { chromium } from 'playwright';
import { BASE, AXE, NM, FIX } from './_env.mjs';
const pages=['demo/index.html','templates/landing-produk.html','templates/404.html','templates/komponen.html','templates/app-mobile.html','templates/dashboard.html','templates/admin.html','templates/auth/masuk.html','templates/chat.html','templates/acara.html','templates/auth/verifikasi.html'];
const sizes=[[375,667],[390,844],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]];
const b = await chromium.launch(); const issues=[];
const route = async (p)=>p.route(/cdn\.jsdelivr\.net\/npm\/(gsap|lenis)@[^/]+\/(.*)$/, r=>{ const m=r.request().url().match(/npm\/(gsap|lenis)@[^/]+\/(.*)$/); r.fulfill({path: NM+m[1]+'/'+m[2], contentType:'text/javascript'}); });
for (const pg of pages) for (const [w,h] of sizes) {
  const p = await b.newPage({viewport:{width:w,height:h}}); await route(p);
  const bad=[]; p.on('response', r=>{ if(r.status()>=400) bad.push(r.status()+' '+r.url()); }); p.on('pageerror',e=>bad.push('JS '+e.message));
  await p.goto(BASE+''+pg,{waitUntil:'networkidle'}); await p.waitForTimeout(900);
  for (let y=0;y<14000;y+=700){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(70); }
  await p.waitForTimeout(900);
  const r = await p.evaluate((w)=>{
    const out=[]; if (document.documentElement.scrollWidth>w) out.push('hscroll '+document.documentElement.scrollWidth);
    // hidden-after-scroll reveals
    const hid=[...document.querySelectorAll('[data-reveal]')].filter(e=>getComputedStyle(e).opacity<0.9).length; if(hid) out.push('reveal-stuck '+hid);
    // text overflow clipped
    const clip=[...document.querySelectorAll('h1,h2,h3,p,a,button,span,b,li,td,th,label')].filter(e=>{ const cs=getComputedStyle(e); if (e.closest('.sr-only') || cs.textOverflow==='ellipsis' || !e.textContent.trim() || e.clientWidth<=2 || cs.overflow==='visible') return false; if (e.scrollWidth<=e.clientWidth+2) return false; /* hiasan aria-hidden yang sengaja keluar (mis. segel) tidak dihitung */ const R=e.getBoundingClientRect(); return [...e.querySelectorAll('*')].some(k=>{ if (k.closest('[aria-hidden=true]')) return false; const r=k.getBoundingClientRect(); return r.width>0 && (r.right>R.right+2 || r.left<R.left-2); }) || e.children.length===0; }).map(e=>e.tagName+'.'+e.className).slice(0,3); if(clip.length) out.push('clip '+clip.join(','));
    const noimg=[...document.images].filter(i=>!i.getAttribute('width')||!i.getAttribute('height')).length; if(noimg) out.push('img-no-dims '+noimg);
    const broken=[...document.images].filter(i=>i.complete && i.naturalWidth===0 && i.loading!=='lazy').map(i=>i.src).slice(0,3); if(broken.length) out.push('broken-img '+broken.join(','));
    return out; }, w);
  if (r.length||bad.length) issues.push(`${pg} @${w}: ${[...r,...bad].join(' | ')}`);
  await p.close();
}
// no-JS and reduced motion
for (const pg of pages) {
  const c1 = await b.newContext({javaScriptEnabled:false, viewport:{width:390,height:844}}); const p1=await c1.newPage(); await p1.goto(BASE+''+pg); await p1.waitForTimeout(500);
  const nojs = await p1.evaluate(()=>[...document.querySelectorAll('[data-reveal], .split .w > span')].filter(e=>getComputedStyle(e).opacity<0.9).length); if(nojs) issues.push(pg+' noJS hidden '+nojs); await c1.close();
  const c2 = await b.newContext({reducedMotion:'reduce', viewport:{width:1440,height:900}}); const p2=await c2.newPage(); await route(p2); await p2.goto(BASE+''+pg,{waitUntil:'networkidle'}); await p2.waitForTimeout(800);
  const rm = await p2.evaluate(()=>({hidden:[...document.querySelectorAll('[data-reveal], .split .w > span')].filter(e=>{const s=getComputedStyle(e); return s.opacity<0.9 || s.transform!=='none'&&s.transform.includes('matrix')&&!s.transform.endsWith(', 0)')}).length, lenis:document.documentElement.classList.contains('lenis'), cursor:document.documentElement.classList.contains('has-cursor')}));
  if (rm.hidden||rm.lenis||rm.cursor) issues.push(pg+' reducedMotion '+JSON.stringify(rm)); await c2.close();
}
console.log(issues.length? issues.join('\n') : 'NO ISSUES');
await b.close();
