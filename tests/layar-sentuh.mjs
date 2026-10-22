// FUSIONIFY UI · uji otomatis (layar-sentuh). Dijalankan oleh tests/run.mjs
import { chromium } from 'playwright';
import { BASE, AXE, NM, FIX } from './_env.mjs';
// Target sentuh minimal 24x24 (WCAG 2.2 AA). Tautan di dalam kalimat dan input yang dibungkus <label> dikecualikan, sesuai aturan WCAG.
const b=await chromium.launch(); const out=[];
for (const sc of ['light','dark']) for (const pg of ['app-mobile','komponen','dashboard','admin','auth/daftar','landing-produk','chat','acara','auth/verifikasi','offline']) for (const [w,h] of [[360,740],[375,667],[390,844],[430,932]]) {
 const c=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:true,deviceScaleFactor:2,colorScheme:sc}); const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'templates/'+pg+'.html',{waitUntil:'networkidle'}); await p.waitForTimeout(300);
 for (let y=0;y<9000;y+=800){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(30);}
 const r=await p.evaluate(()=>[document.documentElement.scrollWidth, innerWidth, [...document.querySelectorAll('button, a[href], [role=button], input[type=checkbox], input[type=radio]')].filter(e=>{const s=getComputedStyle(e); const R=e.getBoundingClientRect(); return R.width>0 && s.visibility!=='hidden' && !e.closest('[hidden],.sr-only,.menu,.pop,.suggest,.prose,p,.crumbs,.fbar,.fcols,small,dialog,.side-help,.segment') && !(e.matches('input, a') && e.closest('label, .check')) && !(e.matches('input') && R.width<=1) && (R.width<24||R.height<24)}).map(e=>(e.getAttribute('aria-label')||e.textContent.trim()).slice(0,20)+':'+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)).slice(0,6)]);
 if (r[0]>r[1]||errs.length||r[2].length) out.push(`${sc} ${pg}@${w}: sw=${r[0]} ${errs.join(';')} small=${r[2].join(', ')}`);
 await c.close();
}
console.log(out.length?out.join('\n'):'MOBILE OK'); await b.close();
