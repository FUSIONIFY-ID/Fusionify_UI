// FUSIONIFY UI · motion.js
// Mesin gerak inti fusionify.id dalam satu modul: smooth scroll, nav, menu HP, kursor segel,
// judul naik per kata, kartu muncul/dirakit, angka naik, magnet, tombol salin + toast,
// transisi halaman segel biru, suara sintesis, dan jeda animasi di luar layar.
//
// Pemakaian (dengan bundler: npm i gsap lenis):
//   import { initFusionify } from "./fusionify-ui/js/motion.js";
//   const fy = initFusionify();          // panggil sekali setelah DOM siap
//   fy.toast("Email disalin!");
//
// Aturan yang dijaga modul ini (jangan dilanggar saat menambah fitur):
// - Hanya animasikan transform dan opacity.
// - Jangan menulis left/top/width atau membaca ukuran elemen di setiap frame.
// - Hormati prefers-reduced-motion: semua efek dimatikan, konten tetap tampil.
// - Animasi CSS tanpa henti dijeda saat seksinya tidak terlihat (kelas .idle).

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initTheme } from "./theme.js";
import { initControls, snackbar, otpError } from "./controls.js";
import { cekLisensi } from "./lisensi.js";

gsap.registerPlugin(ScrollTrigger);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  sget: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  sset: (k, v) => { try { sessionStorage.setItem(k, v); } catch {} },
};

/* ---------- Suara: disintesis Web Audio, tanpa file, MATI secara bawaan ---------- */
function createSfx() {
  let ctx = null;
  let on = store.get("fx-sound") === "1";
  let last = 0;
  const ensure = () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
  const tone = (f0, f1, dur, type, vol, delay = 0) => {
    const c = ensure(); const t = c.currentTime + delay;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
  };
  const noise = (dur, vol, from, to) => {
    const c = ensure();
    const b = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const s = c.createBufferSource(); s.buffer = b;
    const f = c.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 0.8;
    f.frequency.setValueAtTime(from, c.currentTime);
    f.frequency.exponentialRampToValueAtTime(to, c.currentTime + dur);
    const g = c.createGain(); g.gain.value = vol;
    s.connect(f).connect(g).connect(c.destination); s.start();
  };
  const sounds = {
    tick: () => tone(1800, 1400, 0.04, "sine", 0.03),
    plop: () => tone(520, 180, 0.16, "sine", 0.18),
    poke: () => { tone(700, 1200, 0.09, "triangle", 0.12); tone(1200, 900, 0.08, "sine", 0.06, 0.07); },
    ting: () => { tone(1320, 1320, 0.25, "sine", 0.08); tone(1760, 1760, 0.35, "sine", 0.06, 0.09); },
    bloop: () => tone(300, 760, 0.14, "sine", 0.12),
    whoosh: () => noise(0.45, 0.25, 400, 2600),
  };
  return {
    get on() { return on; },
    set(v) { on = v; store.set("fx-sound", v ? "1" : "0"); if (v) { ensure(); sounds.ting(); } },
    play(name) {
      if (!on || !sounds[name]) return;
      const now = performance.now();
      if (name === "tick" && now - last < 60) return;
      last = now;
      try { sounds[name](); } catch {}
    },
  };
}

/* ---------- Pecah judul jadi kata (untuk animasi naik per kata) ---------- */
function splitWords(el) {
  const walk = (node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (n.textContent || "").split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span"); w.className = "w";
          const i = document.createElement("span"); i.textContent = p;
          w.appendChild(i); frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag, n);
      } else if (n.nodeType === 1 && !n.classList.contains("dot")) walk(n);
    });
  };
  walk(el);
  // Titik biru di akhir judul ikut kata terakhir, supaya tidak turun sendirian ke baris baru
  el.querySelectorAll(".dot").forEach((dot) => {
    const prev = dot.previousElementSibling;
    if (prev && prev.classList.contains("w") && prev.firstElementChild) prev.firstElementChild.appendChild(dot);
  });
}

// Nilai kembali di domain yang belum terdaftar: bentuknya sama dengan nilai kembali normal,
// tapi semua fungsinya tidak melakukan apa-apa (kode seperti fy.toast(...) tidak melempar error).
const noop = () => {};
const stub = () => ({ sfx: { on: false, set: noop, play: noop }, toast: noop, snackbar: noop, otpError: noop, lenis: null, lockScroll: noop, scrollTo: noop, gsap, ScrollTrigger });

export function initFusionify(opts = {}) {
  if (!cekLisensi()) return stub();
  const o = {
    smooth: true,          // Lenis smooth scroll
    cursor: true,          // kursor segel (hanya mouse)
    transitions: true,     // transisi halaman segel biru
    darkAreas: ".sec.blue, .footer, .drawer, [data-dark]", // kursor jadi putih di area ini
    pauseSelector: "main > section, main > div, footer, [data-pause]",
    ...opts,
  };
  window.__fx = true; // menandai JS berjalan (dipakai fallback .fx-off di <head>)
  initTheme();
  initControls(); // komponen kontrol (js/controls.js)
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const sfx = createSfx();

  /* Tombol suara: <button data-sound aria-pressed="false"> */
  const soundBtn = $("[data-sound]");
  if (soundBtn) {
    soundBtn.setAttribute("aria-pressed", String(sfx.on));
    soundBtn.addEventListener("click", () => { sfx.set(!sfx.on); soundBtn.setAttribute("aria-pressed", String(sfx.on)); });
  }
  document.addEventListener("pointerover", (e) => {
    const el = e.target.closest?.("a, button, summary, [data-sfx]");
    if (el && !el.contains(e.relatedTarget)) sfx.play("tick");
  });
  document.addEventListener("click", (e) => {
    const el = e.target.closest?.("[data-sfx]");
    if (el) sfx.play(el.dataset.sfx || "plop");
  });

  /* Smooth scroll: Lenis hanya untuk mouse/trackpad. Di layar sentuh (termasuk HP dalam mode
     "Situs desktop") Lenis tidak menghaluskan apa pun, tapi tetap menambah kerja tiap event scroll
     dan membuat ScrollTrigger di-update dua kali. Layar sentuh memakai scroll bawaan browser. */
  const touchFirst = matchMedia("(pointer: coarse)").matches;
  let lenis = null;
  if (o.smooth && !reduce && !touchFirst) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  // Address bar HP muncul/hilang saat scroll: jangan hitung ulang semua trigger (dan pin) tiap kali.
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Kunci scroll halaman (menu terbuka, loader): lewat Lenis kalau ada, kalau tidak lewat kelas di <html>.
  const lockScroll = (on) => {
    if (lenis) { if (on) lenis.stop(); else lenis.start(); }
    else document.documentElement.classList.toggle("scroll-lock", on);
  };
  const scrollToEl = (target) => {
    if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.4 });
    else if (typeof target === "number") window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 20, behavior: reduce ? "auto" : "smooth" });
  };

  /* Nav: .scrolled setelah 24px, .hide saat scroll turun. <nav class="nav" data-nav> */
  const nav = $("[data-nav]");
  const drawer = $("[data-drawer]");
  const menuBtn = $("[data-menu]");
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const open = !!drawer?.classList.contains("open");
    if (nav) {
      nav.classList.toggle("hide", y > lastY && y > 300 && !open);
      nav.classList.toggle("scrolled", y > 24 || open);
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu HP: <button data-menu aria-expanded="false"> + <div class="drawer" data-drawer> */
  const setDrawer = (open) => {
    if (!drawer) return;
    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    drawer.inert = !open;
    menuBtn?.setAttribute("aria-expanded", String(open));
    if (open) setTimeout(() => $("a", drawer)?.focus({ preventScroll: true }), 350);
    else if (drawer.contains(document.activeElement)) menuBtn?.focus({ preventScroll: true });
    lockScroll(open);
    sfx.play(open ? "bloop" : "plop");
    onScroll();
  };
  if (drawer) drawer.inert = true;
  menuBtn?.addEventListener("click", () => setDrawer(!drawer?.classList.contains("open")));
  drawer?.addEventListener("click", (e) => { if (e.target.closest("a")) setDrawer(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer?.classList.contains("open")) setDrawer(false); });
  matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });

  /* Tautan #jangkar di halaman yang sama: scroll halus + fokus untuk aksesibilitas */
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = url.hash === "#top" ? 0 : $(url.hash);
    if (target === null) return;
    e.preventDefault();
    scrollToEl(target);
    if (target !== 0) { if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
    history.replaceState(null, "", url.hash === "#top" ? location.pathname : url.hash);
  });

  /* Kursor segel. Markup: lihat demo (<div class="cursor" data-cursor-el>). */
  const cur = $("[data-cursor-el]");
  if (o.cursor && cur && fine && !reduce) {
    document.documentElement.classList.add("has-cursor");
    const dot = $(".dot", cur), ring = $(".ring", cur), label = $(".label", cur);
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, px = -1, py = -1;
    window.addEventListener("pointermove", (e) => {
      if (!cur.classList.contains("ready")) { rx = e.clientX; ry = e.clientY; cur.classList.add("ready"); }
      x = e.clientX; y = e.clientY;
    }, { passive: true });
    gsap.ticker.add(() => {
      const dx = x - rx, dy = y - ry;
      if (x === px && y === py && Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return; // diam: jangan sentuh DOM
      rx += dx * 0.18; ry += dy * 0.18;
      if (x !== px || y !== py) {
        dot.style.transform = `translate3d(${x}px,${y}px,0)`;
        if (label) label.style.translate = `${x + 18}px ${y + 16}px`;
        px = x; py = y;
      }
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    });
    // data-cursor="view" / "poke" + data-cursor-label="lihat" memunculkan label tulisan tangan
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest?.("[data-cursor], a, button, summary, input, textarea");
      cur.classList.remove("link", "labelled");
      if (!el || el.matches("input, textarea")) return;
      const kind = el.dataset.cursor;
      if (label && el.dataset.cursorLabel) { label.textContent = el.dataset.cursorLabel; cur.classList.add("labelled"); }
      if (kind !== "poke") cur.classList.add("link");
    });
    document.addEventListener("pointerdown", () => cur.classList.add("down"));
    document.addEventListener("pointerup", () => cur.classList.remove("down"));
    document.documentElement.addEventListener("mouseleave", () => cur.classList.remove("ready"));
    $$(o.darkAreas).forEach((el) => {
      el.addEventListener("pointerenter", () => cur.classList.add("dark"));
      el.addEventListener("pointerleave", () => cur.classList.remove("dark"));
    });
  }

  /* Muncul saat scroll */
  $$("[data-split]").forEach(splitWords);
  if (!reduce) {
    $$("[data-split]").forEach((el) => {
      gsap.to($$(".w > span", el), { y: 0, duration: 1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 90%", once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
      onLeave: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.3, overwrite: true }),
    });
    // Kartu "dirakit": anak-anak elemen masuk dari arah acak lalu rapi.
    // Jangan dipakai pada elemen yang punya transform saat hover (bentrok).
    $$("[data-assemble]").forEach((wrap) => {
      gsap.from(Array.from(wrap.children), {
        y: () => gsap.utils.random(60, 140), x: () => gsap.utils.random(-40, 40), rotate: () => gsap.utils.random(-10, 10),
        opacity: 0, duration: 1.1, ease: "back.out(1.4)", stagger: 0.07,
        scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
      });
    });
    // Angka naik: <span data-count-to="120" data-suffix="+">120+</span>
    $$("[data-count-to]").forEach((el) => {
      const to = Number(el.dataset.countTo); const suf = el.dataset.suffix || "";
      if (!to) return;
      const from = to > 1900 && to < 2100 ? to - 30 : 0; // tahun: naik dari 30 tahun sebelumnya
      ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => {
        const n = { v: from };
        gsap.to(n, { v: to, duration: 1.6, ease: "power3.out", onUpdate: () => (el.textContent = `${Math.round(n.v)}${suf}`) });
      } });
    });
  }

  /* Efek magnet (mouse saja): <a data-magnetic> */
  if (fine && !reduce) {
    $$("[data-magnetic]").forEach((el) => {
      const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * 0.22);
        qy((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      el.addEventListener("pointerleave", () => { qx(0); qy(0); });
    });
  }

  /* Toast: <div class="toast" role="status" aria-live="polite" data-toast><img ...><span data-toast-text></span></div> */
  const toast = (msg) => {
    const el = $("[data-toast]");
    if (!el) return;
    $("[data-toast-text]", el).textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2600);
  };
  /* Tombol salin: <button data-copy="hello@fusionify.id" data-copied="Email disalin!">
     data-copy kosong di dalam .code-block = salin isi <pre> di blok itu. */
  $$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy || b.closest(".code-block")?.querySelector("pre")?.innerText || "");
      toast(b.dataset.copied || "OK"); sfx.play("ting");
      b.classList.add("done"); setTimeout(() => b.classList.remove("done"), 2000);
    } catch {}
  }));

  /* Transisi halaman segel biru. Markup .veil di <body>, skrip kecil di <head> (lihat README). */
  const veil = $("[data-veil]");
  const blob = veil ? $(".blob", veil) : null;
  const veilImg = veil ? $("img", veil) : null;
  if (o.transitions && blob && !reduce) {
    if (store.sget("fx-nav") === "1") {
      store.sset("fx-nav", "0");
      gsap.set(blob, { scale: 1, rotate: 0 });
      gsap.set(veilImg, { opacity: 1, scale: 1 });
      gsap.timeline({ delay: 0.05, onComplete: () => document.documentElement.classList.remove("arriving") })
        .to(veilImg, { scale: 0.4, opacity: 0, duration: 0.35, ease: "back.in(2)" })
        .to(blob, { scale: 0, rotate: 90, duration: 0.8, ease: "expo.inOut" }, 0.1);
    }
    document.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("data-no-veil")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      sfx.play("whoosh");
      store.sset("fx-nav", "1");
      gsap.set(blob, { scale: 0, rotate: -90 });
      gsap.timeline({ onComplete: () => { location.href = url.href; } })
        .to(blob, { scale: 1, rotate: 0, duration: 0.7, ease: "expo.inOut" })
        .fromTo(veilImg, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" }, 0.4);
    });
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) { document.documentElement.classList.remove("arriving"); gsap.set(blob, { scale: 0 }); gsap.set(veilImg, { opacity: 0 }); }
    });
  }

  /* Jeda animasi CSS tanpa henti saat seksinya di luar layar */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("idle", !e.isIntersecting)), { rootMargin: "50% 0px" });
    $$(o.pauseSelector).forEach((el) => io.observe(el));
  }

  addEventListener("load", () => ScrollTrigger.refresh());
  return { sfx, toast, snackbar, otpError, lenis, lockScroll, scrollTo: scrollToEl, gsap, ScrollTrigger };
}
