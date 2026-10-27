// FUSIONIFY UI · uji otomatis (tata-letak-dan-kontras). Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import { BASE, AXE, NM, FIX } from './_env.mjs';
import fs from 'fs';
const pages=['demo/index.html','templates/landing-produk.html','templates/404.html','templates/auth/masuk.html','templates/auth/daftar.html','templates/auth/lupa-password.html','templates/auth/atur-ulang-password.html','templates/dashboard.html','templates/admin.html','templates/komponen.html','templates/app-mobile.html','templates/chat.html','templates/acara.html','templates/auth/verifikasi.html','templates/500.html','templates/offline.html','templates/maintenance.html','templates/bayar-qris.html','templates/status.html','templates/dokumentasi.html','templates/legal/privasi.html','templates/legal/syarat.html','templates/ikon.html'];
const sizes=[[375,667],[390,844],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]];
const b = await chromium.launch(); const issues=[];
const route = (p)=>p.route(/cdn\.jsdelivr\.net\/npm\/(gsap|lenis)@[^/]+\/(.*)$/, r=>{ const m=r.request().url().match(/npm\/(gsap|lenis)@[^/]+\/(.*)$/); r.fulfill({path: NM+m[1]+'/'+m[2], contentType:'text/javascript'}); });
for (const scheme of ['light','dark']) for (const pg of pages) {
  for (const [w,h] of sizes) {
    const c = await b.newContext({viewport:{width:w,height:h}, colorScheme:scheme}); const p = await c.newPage(); await route(p);
    const bad=[]; p.on('response', r=>{ if(r.status()>=400) bad.push(r.status()+' '+r.url()); }); p.on('pageerror',e=>bad.push('JS '+e.message));
    await p.goto(BASE+''+pg,{waitUntil:'networkidle'}); await p.waitForTimeout(500);
    for (let y=0;y<12000;y+=900){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(50); }
    await p.waitForTimeout(700);
    const r = await p.evaluate((w)=>{ const out=[]; if (document.documentElement.scrollWidth>w) out.push('hscroll '+document.documentElement.scrollWidth);
      const hid=[...document.querySelectorAll('[data-reveal]')].filter(e=>getComputedStyle(e).opacity<0.9).length; if(hid) out.push('reveal-stuck '+hid);
      const noimg=[...document.images].filter(i=>!i.getAttribute('width')||!i.getAttribute('height')).length; if(noimg) out.push('img-no-dims '+noimg);
      return out; }, w);
    if (r.length||bad.length) issues.push(`${scheme} ${pg} @${w}: ${[...r,...bad].join(' | ')}`);
    await c.close();
  }
  for (const w of [1440, 390]) {
    const c = await b.newContext({viewport:{width:w,height:900}, colorScheme:scheme}); const p = await c.newPage(); await route(p);
    await p.goto(BASE+''+pg,{waitUntil:'networkidle'}); await p.waitForTimeout(500);
    await p.addStyleTag({content:'[data-reveal],.split .w>span{opacity:1!important;transform:none!important}'});
    // buka semua panel tab & modal tidak; menu dropdown tertutup
    await p.addScriptTag({content: AXE});
    const res = await p.evaluate(async()=>{ const r = await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa']}}); return r.violations.map(v=>v.id+'('+v.nodes.length+'): '+v.nodes.slice(0,3).map(n=>n.target.join(' ')+' '+(n.any[0]?.message||'').slice(0,90)).join(' || ')); });
    if (res.length) issues.push(`AXE ${scheme} ${pg} @${w}: `+res.join(' ## '));
    await c.close();
  }
}
console.log(issues.length? issues.join('\n') : 'NO ISSUES');
await b.close();
