// FUSIONIFY UI · toples stiker (.jar): disalin dari fusionify.id (src/scripts/stiker.ts).
// Toples stiker: kepala maskot yang jatuh, memantul, saling dorong, dan bisa ditarik lalu dilempar.
// Mesin fisikanya kecil dan ditulis sendiri (lingkaran + gravitasi), tanpa dependensi.
// Aturan performa: posisi lewat transform saja, ukuran toples diukur sekali (dan saat resize), loop rAF hanya jalan
// selama ada yang bergerak dan toples terlihat. Mode "kurangi gerakan": stiker langsung diam di tempatnya, tanpa animasi.

const FACES = ["smile", "happy", "wink", "shy", "glasses", "confused", "tired", "angry"];
const MAX = 14;
const G = 2400; // gravitasi, px/detik²
const BOUNCE = 0.42; // pantulan ke lantai/dinding
const BOUNCE_BODY = 0.3; // pantulan antar stiker
const AIR = 0.999; // hambatan udara per langkah
const FLOOR = 12; // tebal lantai (pita --surface di dasar toples)
const ROLL = 0.86; // gesekan lantai (stiker menggelinding, lama-lama berhenti)

export function stickerJar(root = document, opts = {}) {
  const jar = root.querySelector("[data-jar]");
  const box = jar?.querySelector("[data-jar-box]");
  if (!jar || !box || jar.classList.contains("on")) return null;
  const reduce = opts.reduce ?? matchMedia("(prefers-reduced-motion: reduce)").matches;
  const play = opts.play || (() => {});
  // Alamat gambar kepala maskot: data-jar-src="…/head-{wajah}-120.webp" (bawaan /fusionify-ui/mascot/…)
  const src = (face) => (jar.dataset.jarSrc || "/fusionify-ui/mascot/head-{wajah}-120.webp").replace("{wajah}", face);
  const faces = jar.dataset.jarFaces ? jar.dataset.jarFaces.split(",").map((f) => f.trim()) : FACES;

  let W = 0, H = 0, R = 34;
  let rect = box.getBoundingClientRect();
  const measure = () => {
    rect = box.getBoundingClientRect();
    W = box.clientWidth;
    H = box.clientHeight - FLOOR;
    R = W < 600 ? 28 : 34;
  };
  measure();

  const bodies = [];
  const render = (b) => {
    b.el.style.transform = `translate3d(${(b.x - b.r).toFixed(1)}px,${(b.y - b.r).toFixed(1)}px,0) rotate(${b.a.toFixed(3)}rad)`;
  };

  const make = (el, x, y, vx = 0, vy = 0) => {
    el.style.width = el.style.height = `${R * 2}px`;
    const b = { el, x, y, vx, vy, a: (Math.random() - 0.5) * 0.6, va: (Math.random() - 0.5) * 6, r: R, drag: false, born: performance.now() };
    bodies.push(b);
    render(b);
    return b;
  };

  // Stiker bawaan dari HTML (terlihat juga tanpa JavaScript) diambil alih jadi benda fisik.
  box.querySelectorAll("img").forEach((el, i, all) => {
    const gap = W / (all.length + 1);
    make(el, gap * (i + 1) + (Math.random() - 0.5) * 20, H - R - Math.random() * 4);
  });

  const add = (x, vx = 0) => {
    if (bodies.length >= MAX) {
      const old = bodies.shift();
      old.el.style.opacity = "0";
      setTimeout(() => old.el.remove(), 300);
    }
    const el = document.createElement("img");
    el.src = src(faces[Math.floor(Math.random() * faces.length)]);
    el.alt = "";
    el.width = 114;
    el.height = 120;
    el.decoding = "async";
    el.draggable = false;
    box.appendChild(el);
    make(el, Math.min(Math.max(x, R), W - R), -R - 10, vx, 120);
    play("plop");
    wake();
  };

  // ---------- langkah fisika ----------
  const step = (dt) => {
    for (const b of bodies) {
      if (b.drag) continue;
      b.vy += G * dt;
      b.vx *= AIR;
      b.vy *= AIR;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.a += b.va * dt;
      // lantai
      if (b.y > H - b.r) {
        b.y = H - b.r;
        if (b.vy > 0) {
          if (b.vy > 520) play("tick");
          b.vy = -b.vy * BOUNCE;
          if (Math.abs(b.vy) < 40) b.vy = 0;
        }
        b.vx *= ROLL;
        if (Math.abs(b.vx) > 20) b.va += (b.vx / b.r - b.va) * 0.25; // ikut menggelinding sesuai kecepatannya
      }
      // Kepala berat di dagu (seperti boneka roly-poly): pelan-pelan kembali tegak saat sudah melambat.
      if (b.y > H - b.r - 2 * b.r && Math.abs(b.vy) < 300) b.va += (-Math.sin(b.a) * 40 - b.va * 5) * dt;
      if (b.a > Math.PI) b.a -= Math.PI * 2; else if (b.a < -Math.PI) b.a += Math.PI * 2;
      // dinding kiri/kanan (atas terbuka)
      if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * BOUNCE; b.va = -b.va * 0.5; }
      else if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * BOUNCE; b.va = -b.va * 0.5; }
      if (b.y < -H) { b.y = -H; b.vy = Math.max(b.vy, 0); }
    }
    // tumbukan antar stiker (dua putaran supaya tumpukan stabil)
    for (let it = 0; it < 2; it++) {
      for (let i = 0; i < bodies.length; i++) {
        const p = bodies[i];
        for (let j = i + 1; j < bodies.length; j++) {
          const q = bodies[j];
          const dx = q.x - p.x, dy = q.y - p.y;
          const min = p.r + q.r;
          const d2 = dx * dx + dy * dy;
          if (d2 >= min * min || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const nx = dx / d, ny = dy / d;
          const over = min - d;
          // dorong keluar (stiker yang dipegang tidak ikut terdorong)
          const wp = p.drag ? 0 : q.drag ? 1 : 0.5;
          const wq = q.drag ? 0 : p.drag ? 1 : 0.5;
          p.x -= nx * over * wp; p.y -= ny * over * wp;
          q.x += nx * over * wq; q.y += ny * over * wq;
          // impuls
          const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
          if (rv < 0) {
            const jimp = -(1 + BOUNCE_BODY) * rv / ((p.drag ? 0 : 1) + (q.drag ? 0 : 1) || 1);
            if (!p.drag) { p.vx -= jimp * nx; p.vy -= jimp * ny; p.va -= jimp * 0.004; }
            if (!q.drag) { q.vx += jimp * nx; q.vy += jimp * ny; q.va += jimp * 0.004; }
          }
        }
      }
    }
  };

  const quiet = () => bodies.every((b) => !b.drag && Math.abs(b.vx) < 6 && Math.abs(b.vy) < 6 && Math.abs(b.va) < 0.05 && b.y >= -b.r);

  // ---------- loop: hanya jalan saat perlu ----------
  let raf = 0, last = 0, still = 0, visible = false;
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    const n = 3; // sub-langkah supaya tumpukan tidak tembus
    for (let i = 0; i < n; i++) step(dt / n);
    bodies.forEach(render);
    still = quiet() ? still + dt : 0;
    if (still > 0.6 || !visible) { raf = 0; return; }
    raf = requestAnimationFrame(frame);
  };
  const settle = () => { // kurangi gerakan: hitung sampai diam, gambar sekali
    for (let i = 0; i < 900 && !(i > 30 && quiet()); i++) step(1 / 120);
    bodies.forEach((b) => { b.vx = b.vy = b.va = 0; render(b); });
  };
  function wake() {
    if (reduce) return settle();
    still = 0;
    if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { measure(); wake(); } }, { rootMargin: "80px" }).observe(box);
  new ResizeObserver(() => {
    measure();
    bodies.forEach((b) => { b.r = R; b.el.style.width = b.el.style.height = `${R * 2}px`; b.x = Math.min(Math.max(b.x, R), W - R); b.y = Math.min(b.y, H - R); });
    wake();
  }).observe(box);
  window.addEventListener("scroll", () => { if (drag) rect = box.getBoundingClientRect(); }, { passive: true });

  // ---------- tarik dan lempar ----------
  let grabbed = false;
  let drag = null;
  box.addEventListener("pointerdown", (e) => {
    rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    // stiker paling atas yang kena
    let hit = null;
    for (let i = bodies.length - 1; i >= 0; i--) {
      const b = bodies[i];
      if ((b.x - x) ** 2 + (b.y - y) ** 2 <= b.r * b.r) { hit = b; break; }
    }
    grabbed = !!hit;
    if (!hit) return; // area kosong: stiker baru ditambahkan lewat "click", supaya menggulir di HP tidak ikut menambah
    e.preventDefault();
    box.setPointerCapture(e.pointerId);
    hit.drag = true;
    hit.vx = hit.vy = 0;
    hit.el.classList.add("held");
    bodies.push(bodies.splice(bodies.indexOf(hit), 1)[0]); // pindah ke paling atas
    box.appendChild(hit.el);
    drag = { b: hit, id: e.pointerId, ox: hit.x - x, oy: hit.y - y, px: x, py: y, t: performance.now(), vx: 0, vy: 0 };
    play("poke");
    wake();
  });
  box.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const now = performance.now();
    const dt = Math.max((now - drag.t) / 1000, 1 / 240);
    // kecepatan dihaluskan supaya lemparan tidak tergantung satu gerakan terakhir
    drag.vx = drag.vx * 0.6 + ((x - drag.px) / dt) * 0.4;
    drag.vy = drag.vy * 0.6 + ((y - drag.py) / dt) * 0.4;
    drag.px = x; drag.py = y; drag.t = now;
    const b = drag.b;
    b.x = Math.min(Math.max(x + drag.ox, b.r), W - b.r);
    b.y = Math.min(y + drag.oy, H - b.r);
    if (reduce) render(b);
    else wake();
  });
  const release = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const b = drag.b;
    const lim = 2600;
    b.vx = Math.max(-lim, Math.min(lim, drag.vx));
    b.vy = Math.max(-lim, Math.min(lim, drag.vy));
    b.va = b.vx / b.r * 0.3;
    b.drag = false;
    b.el.classList.remove("held");
    if (Math.hypot(b.vx, b.vy) > 1700) { b.el.src = src("angry"); play("grr"); } // dilempar keras: ngambek
    else if (Math.hypot(b.vx, b.vy) > 500) play("whoosh");
    drag = null;
    wake();
  };
  box.addEventListener("pointerup", release);
  box.addEventListener("click", (e) => {
    if (grabbed) return;
    add(e.clientX - rect.left, (Math.random() - 0.5) * 200);
  });
  box.addEventListener("pointercancel", release);

  jar.querySelector("[data-jar-add]")?.addEventListener("click", () => add(W * (0.2 + Math.random() * 0.6), (Math.random() - 0.5) * 300));
  jar.classList.add("on");
  wake();
  return { add };
}
