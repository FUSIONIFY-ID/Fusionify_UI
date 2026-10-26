// FUSIONIFY UI · controls.js
// Interaksi komponen kontrol (css/controls.css). Tanpa dependensi.
// Dipanggil otomatis oleh initFusionify() (motion.js) dan initApp() (app.js). Aman dipanggil berkali-kali.
//
//   import { initControls, snackbar } from "./fusionify-ui/js/controls.js";
//   initControls();
//   snackbar("Acara diarsipkan", { action: "Batalkan", onAction: () => pulihkan() });
//
// Yang ditangani:
// - Dropdown / split button ([data-dropdown] + .menu berikutnya): klik luar, Esc, panah atas/bawah
// - Modal (<dialog class="modal">): [data-open-modal="id"], [data-close], klik di luar
// - Sheet (<dialog class="sheet|side-sheet">): [data-open-sheet="id"], [data-close], klik di luar, Esc, tarik ke bawah
// - Tab ([data-tabs]), daftar isi yang mengikuti bacaan ([data-toc])
// - Button group ([data-btn-group="single|multi"]), chip filter (.chip-btn[aria-pressed]), chip input (.chip-input .x)
// - FAB menu ([data-fab-menu]), FAB mengecil saat scroll ([data-fab-shrink]), app bar ([data-appbar])
// - Carousel ([data-carousel]), slider (.slider), slider dua ujung ([data-range2])
// - Tooltip (.tip-wrap): Esc menyembunyikan, tekan lama di layar sentuh, tidak keluar layar
// - Search dengan saran ([data-suggest])
// - Date picker ([data-datepicker]) dan time picker ([data-timepicker])
// - OTP ([data-otp]) + otpError(), hitung mundur kirim ulang ([data-countdown]), upload file ([data-upload])
// - Tambah ke kalender ([data-ics], unduh .ics) dan bagikan ([data-share])
// - Chat ([data-chat]): buka/tutup obrolan di HP (ikut tombol back), kolom tulis yang tumbuh, event fy:send
// - Snackbar (snackbar() dan [data-snackbar])
// - Stepper / form bertahap ([data-wizard]), tabel bisa diurutkan (table[data-sort]), pusat notifikasi ([data-notif])
// - Pemotong foto profil bulat ([data-avatar-crop]), bilah offline ([data-offline-bar])
//
// Setiap komponen mengirim event: fy:change (button group, chip, slider, picker), fy:remove (chip input),
// fy:select (saran pencarian), fy:step (stepper), fy:sort (tabel), fy:read (notifikasi). Contoh: el.addEventListener("fy:change", (e) => console.log(e.detail)).

import { cekLisensi } from "./lisensi.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
const once = (el, key) => { if (el[key]) return false; el[key] = true; return true; };
let uid = 0;
const id = (p) => `${p}-${++uid}`;

const ICON = {
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};

/* =========================================================
   SNACKBAR
   ========================================================= */
let sbEl = null;
const sbQueue = [];
let sbBusy = false;
let sbLabels = { close: "Tutup" };

function ensureSnackbar() {
  if (sbEl) return sbEl;
  sbEl = document.createElement("div");
  sbEl.className = "snackbar";
  sbEl.setAttribute("role", "status");
  sbEl.setAttribute("aria-live", "polite");
  sbEl.innerHTML = `<span class="sb-text"></span>`;
  document.body.appendChild(sbEl);
  return sbEl;
}

export function snackbar(text, opts = {}) {
  ensureSnackbar();
  sbQueue.push({ text, ...opts });
  if (!sbBusy) nextSnack();
}

function nextSnack() {
  const item = sbQueue.shift();
  if (!item) { sbBusy = false; return; }
  sbBusy = true;
  const el = ensureSnackbar();
  el.querySelectorAll(".sb-act, .sb-x").forEach((b) => b.remove());
  $(".sb-text", el).textContent = item.text;
  let done = false;
  const finish = (byAction) => {
    if (done) return; done = true;
    clearTimeout(t);
    el.classList.remove("show");
    if (byAction) item.onAction?.();
    item.onClose?.(byAction);
    setTimeout(nextSnack, reduce() ? 0 : 300);
  };
  if (item.action) {
    const a = document.createElement("button");
    a.type = "button"; a.className = "sb-act"; a.textContent = item.action;
    a.addEventListener("click", () => finish(true));
    el.appendChild(a);
  }
  if (item.close !== false && (item.action || item.close)) {
    const x = document.createElement("button");
    x.type = "button"; x.className = "sb-x"; x.setAttribute("aria-label", sbLabels.close); x.innerHTML = ICON.x;
    x.addEventListener("click", () => finish(false));
    el.appendChild(x);
  }
  requestAnimationFrame(() => el.classList.add("show"));
  // Ada tombol aksi: beri waktu lebih lama (minimal 6 detik) supaya sempat ditekan.
  const ms = item.duration ?? (item.action ? 6500 : 3500);
  let t = ms === Infinity ? 0 : setTimeout(() => finish(false), ms);
  // Jeda saat disorot / difokus supaya tidak hilang ketika mau diklik
  el.onpointerenter = el.onfocusin = () => clearTimeout(t);
  el.onpointerleave = el.onfocusout = () => { if (!done && ms !== Infinity) { clearTimeout(t); t = setTimeout(() => finish(false), 2500); } };
}

/* =========================================================
   POPUP (dipakai date & time picker)
   ========================================================= */
let openPop = null;
function closePop(returnFocus = true) {
  if (!openPop) return;
  const { pop, scrim, btn, host } = openPop;
  pop.remove(); scrim.remove();
  btn.setAttribute("aria-expanded", "false");
  host.classList.remove("open");
  openPop = null;
  if (returnFocus) btn.focus();
}
function showPop(host, btn, pop, label) {
  closePop(false);
  pop.classList.add("pop");
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-label", label);
  const scrim = document.createElement("div");
  scrim.className = "pop-scrim";
  scrim.addEventListener("click", () => closePop());
  host.append(scrim, pop);
  host.classList.add("open");
  btn.setAttribute("aria-expanded", "true");
  // Jangan sampai keluar layar di kanan
  const r = pop.getBoundingClientRect();
  if (r.right > innerWidth - 8) pop.classList.add("end");
  pop.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closePop(); }
    if (e.key === "Tab") { // fokus tetap di dalam popup
      const f = $$("button:not([disabled]), [tabindex='0']", pop).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  openPop = { pop, scrim, btn, host };
}
document.addEventListener("pointerdown", (e) => {
  if (openPop && !openPop.host.contains(e.target)) closePop(false);
});

/* =========================================================
   DATE PICKER
   ========================================================= */
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (s) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function initDatepicker(host) {
  if (!once(host, "_fyDp")) return;
  const input = $("input:not([type='hidden'])", host);
  const hidden = $("input[type='hidden']", host);
  const btn = $(".picker-btn", host);
  const loc = host.dataset.locale || document.documentElement.lang || "id-ID";
  const range = host.hasAttribute("data-range");
  const weekStart = +(host.dataset.weekStart ?? 0); // 0 = Minggu, 1 = Senin
  const min = parse(host.dataset.min), max = parse(host.dataset.max);
  const L = {
    prev: host.dataset.labelPrev || "Bulan sebelumnya",
    next: host.dataset.labelNext || "Bulan berikutnya",
    clear: host.dataset.labelClear || "Hapus",
    today: host.dataset.labelToday || "Hari ini",
    start: host.dataset.labelStart || "Pilih tanggal mulai",
    end: host.dataset.labelEnd || "Pilih tanggal selesai",
    title: host.dataset.labelTitle || (range ? "Pilih rentang tanggal" : "Pilih tanggal"),
    to: host.dataset.labelTo || "s.d.",
  };
  const fmt = new Intl.DateTimeFormat(loc, { day: "numeric", month: "short", year: "numeric" });
  const fmtLong = new Intl.DateTimeFormat(loc, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const fmtMonth = new Intl.DateTimeFormat(loc, { month: "long", year: "numeric" });
  const wdName = new Intl.DateTimeFormat(loc, { weekday: "short" });

  let [a, b] = (hidden?.value || "").split("/").map(parse);
  let view, focusDay, pickingEnd = false;

  const disabled = (d) => (min && d < min) || (max && d > max);
  const write = () => {
    input.value = a ? (range ? `${fmt.format(a)}${b ? ` ${L.to} ${fmt.format(b)}` : ""}` : fmt.format(a)) : "";
    if (hidden) hidden.value = a ? (range ? `${iso(a)}${b ? "/" + iso(b) : ""}` : iso(a)) : "";
    emit(host, "fy:change", { start: a ? iso(a) : null, end: b ? iso(b) : null, value: hidden?.value ?? null });
  };
  if (a) input.value = range ? `${fmt.format(a)}${b ? ` ${L.to} ${fmt.format(b)}` : ""}` : fmt.format(a);

  const render = (pop) => {
    const y = view.getFullYear(), m = view.getMonth();
    const first = new Date(y, m, 1);
    const offset = (first.getDay() - weekStart + 7) % 7;
    const start = new Date(y, m, 1 - offset);
    const today = new Date();
    let html = `<div class="dp-head"><button type="button" data-nav="-1" aria-label="${L.prev}">${ICON.left}</button><div class="dp-title" aria-live="polite">${fmtMonth.format(first)}</div><button type="button" data-nav="1" aria-label="${L.next}">${ICON.right}</button></div><div class="dp-grid" role="group" aria-label="${fmtMonth.format(first)}">`;
    for (let i = 0; i < 7; i++) {
      const d = new Date(2023, 0, 1 + ((weekStart + i) % 7)); // 1 Jan 2023 = Minggu
      html += `<span class="dp-wd" aria-hidden="true">${wdName.format(d).replace(".", "").slice(0, 3)}</span>`;
    }
    for (let i = 0; i < 42; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const sel = sameDay(d, a) || sameDay(d, b);
      const inR = range && a && b && d > a && d < b;
      const cls = ["dp-day", d.getMonth() !== m ? "out" : "", inR ? "in-range" : ""].filter(Boolean).join(" ");
      html += `<button type="button" class="${cls}" data-d="${iso(d)}" tabindex="${sameDay(d, focusDay) ? 0 : -1}" aria-label="${fmtLong.format(d)}" aria-pressed="${sel}"${sameDay(d, today) ? ' aria-current="date"' : ""}${disabled(d) ? " disabled" : ""}>${d.getDate()}</button>`;
    }
    html += `</div><div class="dp-foot"><button type="button" class="txt-btn" data-act="clear">${L.clear}</button><span class="hint">${range ? (pickingEnd ? L.end : L.start) : ""}</span><button type="button" class="txt-btn" data-act="today">${L.today}</button></div>`;
    pop.innerHTML = html;
  };

  const focusOn = (pop) => $(`[data-d="${iso(focusDay)}"]`, pop)?.focus();

  const open = () => {
    if (openPop?.host === host) { closePop(); return; }
    focusDay = a ? new Date(a) : (min && new Date() < min ? new Date(min) : new Date());
    view = new Date(focusDay.getFullYear(), focusDay.getMonth(), 1);
    pickingEnd = false;
    const pop = document.createElement("div");
    pop.className = "dp";
    render(pop);
    showPop(host, btn, pop, L.title);
    focusOn(pop);

    pop.addEventListener("click", (e) => {
      const nav = e.target.closest("[data-nav]");
      if (nav) { view = new Date(view.getFullYear(), view.getMonth() + +nav.dataset.nav, 1); focusDay = new Date(view); render(pop); $(`[data-nav="${nav.dataset.nav}"]`, pop).focus(); return; }
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "clear") { a = b = null; pickingEnd = false; write(); render(pop); focusOn(pop); return; }
      if (act === "today") { focusDay = new Date(); view = new Date(focusDay.getFullYear(), focusDay.getMonth(), 1); render(pop); focusOn(pop); return; }
      const day = e.target.closest("[data-d]");
      if (!day || day.disabled) return;
      const d = parse(day.dataset.d);
      focusDay = d;
      if (!range) { a = d; write(); closePop(); return; }
      if (!pickingEnd || d < a) { a = d; b = null; pickingEnd = true; render(pop); focusOn(pop); write(); return; }
      b = d; pickingEnd = false; write(); closePop();
    });
    pop.addEventListener("keydown", (e) => {
      if (!e.target.matches("[data-d]")) return;
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      let nd = null;
      if (step) nd = new Date(focusDay.getFullYear(), focusDay.getMonth(), focusDay.getDate() + step);
      if (e.key === "Home") nd = new Date(focusDay.getFullYear(), focusDay.getMonth(), focusDay.getDate() - ((focusDay.getDay() - weekStart + 7) % 7));
      if (e.key === "End") nd = new Date(focusDay.getFullYear(), focusDay.getMonth(), focusDay.getDate() + 6 - ((focusDay.getDay() - weekStart + 7) % 7));
      if (e.key === "PageUp" || e.key === "PageDown") nd = new Date(focusDay.getFullYear(), focusDay.getMonth() + (e.key === "PageUp" ? -1 : 1), Math.min(focusDay.getDate(), 28));
      if (!nd) return;
      e.preventDefault();
      focusDay = nd;
      if (nd.getMonth() !== view.getMonth() || nd.getFullYear() !== view.getFullYear()) { view = new Date(nd.getFullYear(), nd.getMonth(), 1); render(pop); }
      else $$("[data-d]", pop).forEach((x) => (x.tabIndex = x.dataset.d === iso(nd) ? 0 : -1));
      focusOn(pop);
    });
  };
  btn.setAttribute("aria-haspopup", "dialog");
  btn.setAttribute("aria-expanded", "false");
  btn.addEventListener("click", open);
  input.addEventListener("click", open);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") { e.preventDefault(); open(); } });
}

/* =========================================================
   TIME PICKER (24 jam)
   ========================================================= */
function initTimepicker(host) {
  if (!once(host, "_fyTp")) return;
  const input = $("input:not([type='hidden'])", host);
  const hidden = $("input[type='hidden']", host);
  const btn = $(".picker-btn", host);
  const step = Math.max(1, +(host.dataset.step || 5));
  const sep = host.dataset.sep ?? ".";
  const L = {
    title: host.dataset.labelTitle || "Pilih jam",
    hour: host.dataset.labelHour || "Jam",
    minute: host.dataset.labelMinute || "Menit",
    cancel: host.dataset.labelCancel || "Batal",
    ok: host.dataset.labelOk || "Pilih",
  };
  const pad = (n) => String(n).padStart(2, "0");
  let [h, m] = (hidden?.value || "").split(":").map(Number);
  if (hidden?.value) input.value = `${pad(h)}${sep}${pad(m)}`;

  const open = () => {
    if (openPop?.host === host) { closePop(); return; }
    const now = new Date();
    let ch = Number.isFinite(h) ? h : now.getHours();
    let cm = Number.isFinite(m) ? m : Math.ceil(now.getMinutes() / step) * step % 60;
    const pop = document.createElement("div");
    pop.className = "tp";
    const list = (name, max, inc, cur, lab) => {
      let li = "";
      for (let v = 0; v < max; v += inc) li += `<li role="option" id="${name}-${v}" data-v="${v}" aria-selected="${v === cur}">${pad(v)}</li>`;
      return `<div class="tp-col"><span id="${name}-l">${lab}</span><ul class="tp-list" role="listbox" tabindex="0" aria-labelledby="${name}-l" data-k="${name}">${li}</ul></div>`;
    };
    const hid = id("tph"), mid = id("tpm");
    pop.innerHTML = `<div class="tp-cols">${list(hid, 24, 1, ch, L.hour)}<span class="tp-sep" aria-hidden="true">${sep === "." ? "." : ":"}</span>${list(mid, 60, step, cm, L.minute)}</div><div class="tp-foot"><button type="button" class="txt-btn" data-act="cancel">${L.cancel}</button><button type="button" class="btn sm" data-act="ok">${L.ok}</button></div>`;
    showPop(host, btn, pop, L.title);
    const lists = $$(".tp-list", pop);
    const sync = (ul, v) => {
      $$("li", ul).forEach((li) => { const on = +li.dataset.v === v; li.setAttribute("aria-selected", String(on)); li.classList.toggle("active", on); });
      const sel = $(`li[data-v="${v}"]`, ul);
      ul.setAttribute("aria-activedescendant", sel.id);
      sel.scrollIntoView({ block: "center", behavior: "auto" });
      if (ul.dataset.k === hid) ch = v; else cm = v;
    };
    sync(lists[0], ch); sync(lists[1], cm);
    lists.forEach((ul) => {
      ul.addEventListener("click", (e) => { const li = e.target.closest("li"); if (li) { sync(ul, +li.dataset.v); ul.focus(); } });
      ul.addEventListener("keydown", (e) => {
        const items = $$("li", ul);
        const i = items.findIndex((x) => x.getAttribute("aria-selected") === "true");
        let n = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1, PageDown: i + 5, PageUp: i - 5 }[e.key];
        if (e.key === "Enter") { e.preventDefault(); $("[data-act='ok']", pop).click(); return; }
        if (e.key === "ArrowRight" && ul === lists[0]) { e.preventDefault(); lists[1].focus(); return; }
        if (e.key === "ArrowLeft" && ul === lists[1]) { e.preventDefault(); lists[0].focus(); return; }
        if (n === undefined) return;
        e.preventDefault();
        n = (n + items.length) % items.length;
        sync(ul, +items[n].dataset.v);
      });
    });
    pop.addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "cancel") closePop();
      if (act === "ok") {
        h = ch; m = cm;
        input.value = `${pad(h)}${sep}${pad(m)}`;
        if (hidden) hidden.value = `${pad(h)}:${pad(m)}`;
        emit(host, "fy:change", { value: `${pad(h)}:${pad(m)}`, hour: h, minute: m });
        closePop();
      }
    });
    lists[0].focus();
  };
  btn.setAttribute("aria-haspopup", "dialog");
  btn.setAttribute("aria-expanded", "false");
  btn.addEventListener("click", open);
  input.addEventListener("click", open);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") { e.preventDefault(); open(); } });
}

/* =========================================================
   SHEET (bottom / side) dan MODAL
   ========================================================= */
function closeDialog(d, value = "") {
  if (!d.open || d.classList.contains("closing")) return;
  const isSheet = d.matches(".sheet, .side-sheet");
  if (!isSheet || reduce()) { d.close(value); return; }
  d.classList.add("closing");
  let done = false;
  const end = () => { if (done) return; done = true; d.classList.remove("closing"); d.style.transform = ""; d.close(value); };
  d.addEventListener("transitionend", end, { once: true });
  setTimeout(end, 350);
}

function initDialog(d) {
  if (!once(d, "_fyDlg")) return;
  d.setAttribute("data-lenis-prevent", "");
  d.addEventListener("click", (e) => { if (e.target === d) closeDialog(d); });
  d.addEventListener("cancel", (e) => { e.preventDefault(); closeDialog(d); });
  d.addEventListener("close", () => {
    document.documentElement.classList.toggle("sheet-open", !!$("dialog.sheet[open], dialog.side-sheet[open]"));
    d._opener?.focus();
  });
  $$("[data-close]", d).forEach((b) => b.addEventListener("click", () => closeDialog(d, b.value || "")));

  // Tarik pegangan ke bawah untuk menutup (bottom sheet)
  const handle = $(".sheet-handle", d);
  if (handle && d.classList.contains("sheet")) {
    let y0 = 0, t0 = 0, dy = 0, drag = false, moved = false;
    handle.addEventListener("pointerdown", (e) => { drag = true; moved = false; y0 = e.clientY; t0 = performance.now(); dy = 0; handle.setPointerCapture(e.pointerId); d.classList.add("dragging"); });
    handle.addEventListener("pointermove", (e) => {
      if (!drag) return;
      dy = Math.max(0, e.clientY - y0);
      if (dy > 4) moved = true;
      d.style.transform = `translateY(${dy}px)`;
    });
    const up = () => {
      if (!drag) return;
      drag = false;
      d.classList.remove("dragging");
      const v = dy / Math.max(1, performance.now() - t0);
      if (dy > 90 || v > 0.6) closeDialog(d);
      else { d.style.transition = "transform .3s cubic-bezier(.22,1,.36,1)"; d.style.transform = ""; setTimeout(() => (d.style.transition = ""), 320); }
    };
    handle.addEventListener("pointerup", up);
    handle.addEventListener("pointercancel", up);
    // Klik biasa (tanpa geser) pada pegangan tetap menutup lewat [data-close]; geser tidak dihitung klik
    handle.addEventListener("click", (e) => { if (moved) e.stopImmediatePropagation(); }, true);
  }
}

function openDialog(d, opener) {
  if (!d?.showModal) return;
  initDialog(d);
  d.showModal();
  d._opener = opener;
  if (d.matches(".sheet, .side-sheet")) document.documentElement.classList.add("sheet-open");
}

/* =========================================================
   OTP
   Input asli (name, maxlength) tetap ada dan menyimpan nilai lengkap untuk form.
   Event: fy:change { value }, fy:complete { value }. Tandai salah: otpError(el, pesan?)
   ========================================================= */
function initOtp(wrap) {
  if (!once(wrap, "_fyOtp")) return;
  const store = $("input", wrap);
  if (!store) return;
  const n = +(store.maxLength > 0 ? store.maxLength : 6);
  const digitsOnly = (store.inputMode || "numeric") === "numeric";
  const clean = (s) => (digitsOnly ? s.replace(/\D/g, "") : s.replace(/\s/g, "").toUpperCase());
  const label = store.getAttribute("aria-label") || "Kode";
  store.classList.add("otp-store");
  store.tabIndex = -1;
  store.setAttribute("aria-hidden", "true");
  wrap.setAttribute("role", "group");
  if (!wrap.hasAttribute("aria-label") && !wrap.hasAttribute("aria-labelledby")) wrap.setAttribute("aria-label", label);
  const split = +(wrap.dataset.split || (n === 6 ? 3 : 0));
  const boxes = [];
  for (let i = 0; i < n; i++) {
    if (split && i === split) { const s = document.createElement("span"); s.className = "otp-sep"; s.setAttribute("aria-hidden", "true"); wrap.appendChild(s); }
    const b = document.createElement("input");
    b.className = "otp-box";
    b.type = "text";
    b.inputMode = digitsOnly ? "numeric" : "text";
    b.autocomplete = i === 0 ? "one-time-code" : "off";
    b.setAttribute("aria-label", `Digit ${i + 1} dari ${n}`);
    b.maxLength = n; // supaya isi otomatis/tempel di kotak mana pun bisa dibagi
    if (digitsOnly) b.pattern = "[0-9]*";
    wrap.appendChild(b);
    boxes.push(b);
  }
  const sync = () => {
    const v = boxes.map((b) => b.value).join("");
    store.value = v;
    boxes.forEach((b) => b.classList.toggle("filled", !!b.value));
    if (wrap.getAttribute("aria-invalid") === "true") {
      wrap.removeAttribute("aria-invalid");
      if (wrap._fyErr) { wrap._fyErr.remove(); wrap._fyErr = null; wrap.removeAttribute("aria-describedby"); }
    }
    wrap.classList.remove("done");
    emit(wrap, "fy:change", { value: v });
    if (v.length === n) { wrap.classList.add("done"); emit(wrap, "fy:complete", { value: v }); }
  };
  const fill = (from, text) => {
    const chars = [...clean(text)];
    let i = from;
    for (const c of chars) { if (i >= n) break; boxes[i++].value = c; }
    boxes[Math.min(i, n - 1)].focus();
    sync();
  };
  boxes.forEach((b, i) => {
    b.addEventListener("input", () => {
      const v = clean(b.value);
      if (v.length > 1) { b.value = ""; fill(i, v); return; }
      b.value = v;
      if (v && i < n - 1) boxes[i + 1].focus();
      sync();
    });
    b.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !b.value && i > 0) { e.preventDefault(); boxes[i - 1].value = ""; boxes[i - 1].focus(); sync(); }
      else if (e.key === "ArrowLeft" && i > 0) { e.preventDefault(); boxes[i - 1].focus(); }
      else if (e.key === "ArrowRight" && i < n - 1) { e.preventDefault(); boxes[i + 1].focus(); }
    });
    b.addEventListener("focus", () => b.select());
    b.addEventListener("paste", (e) => { e.preventDefault(); fill(i, (e.clipboardData || window.clipboardData).getData("text")); });
  });
  // Kalau input asli diisi dari luar (mis. Web OTP API), bagikan ke kotak
  if (store.value) fill(0, store.value);
  wrap._fyOtpClear = () => { boxes.forEach((b) => (b.value = "")); sync(); boxes[0].focus(); };
}
export function otpError(wrap, message) {
  wrap.setAttribute("aria-invalid", "true");
  wrap.classList.remove("shake"); void wrap.offsetWidth;
  if (!reduce()) wrap.classList.add("shake");
  const field = wrap.closest(".field") || wrap.parentElement;
  let err = $(".err", field);
  if (message) {
    if (!err) { err = document.createElement("small"); err.className = "err"; err.id = id("otp-err"); err.setAttribute("role", "alert"); field.appendChild(err); }
    err.textContent = message;
    wrap.setAttribute("aria-describedby", err.id);
    wrap._fyErr = err;
  }
  const first = $(".otp-box", wrap);
  first?.focus();
}

/* =========================================================
   DAFTAR ISI ([data-toc]) · tautan ke bagian yang sedang dibaca diberi aria-current="true".
   <nav class="toc" data-toc><a href="#bagian">…</a></nav>
   ========================================================= */
function initToc(nav) {
  if (!once(nav, "_fyToc") || !("IntersectionObserver" in window)) return;
  const links = $$("a[href^='#']", nav);
  const map = new Map();
  links.forEach((a) => { const t = document.getElementById(decodeURIComponent(a.hash.slice(1))); if (t) map.set(t, a); });
  if (!map.size) return;
  const seen = new Set();
  const heads = [...map.keys()];
  const mark = () => {
    // Judul teratas yang terlihat; kalau tidak ada (di tengah bagian panjang), judul terakhir yang sudah lewat di atas.
    let top = heads.filter((t) => seen.has(t)).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
    if (!top) top = heads.filter((t) => t.getBoundingClientRect().top < 90).pop() || heads[0];
    links.forEach((a) => a.toggleAttribute("aria-current", false));
    map.get(top).setAttribute("aria-current", "true");
  };
  const io = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target))); mark(); }, { rootMargin: "-90px 0px -55% 0px" });
  map.forEach((_, t) => io.observe(t));
}

/* =========================================================
   HITUNG MUNDUR (kirim ulang kode)
   <button type="button" data-countdown="60" data-label="Kirim ulang">Kirim ulang</button>
   Tombol mati sampai waktu habis. Klik memulai lagi dan mengirim event fy:resend.
   ========================================================= */
function initCountdown(btn) {
  if (!once(btn, "_fyCd")) return;
  const secs = +btn.dataset.countdown || 60;
  const base = btn.dataset.label || btn.textContent.trim();
  let t;
  const start = () => {
    let left = secs;
    btn.disabled = true;
    const tick = () => {
      const m = Math.floor(left / 60), s = String(left % 60).padStart(2, "0");
      btn.textContent = `${base} (${m}:${s})`;
      if (left-- <= 0) { clearInterval(t); btn.disabled = false; btn.textContent = base; }
    };
    tick();
    clearInterval(t);
    t = setInterval(tick, 1000);
  };
  btn.addEventListener("click", () => { emit(btn, "fy:resend", {}); start(); });
  if (btn.dataset.start !== "false") start();
}

/* =========================================================
   UPLOAD
   Atribut: data-max-mb (bawaan 5), data-max-files (bawaan 1 kalau tanpa multiple, 10 kalau multiple),
   data-round (pratinjau bulat untuk foto profil). File yang lolos tetap ada di <input type="file"> untuk form biasa.
   Event: fy:files { files }. Progres unggah sendiri: el._fyUpload.progress(file, 0..1), .done(file), .fail(file, pesan)
   ========================================================= */
const fmtSize = (b) => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1).replace(".", ",")} MB`);
function initUpload(wrap) {
  if (!once(wrap, "_fyUp")) return;
  const input = $("input[type='file']", wrap);
  const drop = $(".drop", wrap);
  let list = $(".upload-list", wrap);
  if (!input || !drop) return;
  if (!list) { list = document.createElement("ul"); list.className = "upload-list"; wrap.appendChild(list); }
  list.setAttribute("aria-live", "polite");
  const maxMb = +(wrap.dataset.maxMb || 5);
  const maxFiles = +(wrap.dataset.maxFiles || (input.multiple ? 10 : 1));
  const round = wrap.hasAttribute("data-round");
  const accept = (input.accept || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  const okType = (f) => !accept.length || accept.some((a) => (a.startsWith(".") ? f.name.toLowerCase().endsWith(a) : a.endsWith("/*") ? f.type.startsWith(a.slice(0, -1)) : f.type === a));
  let files = [];
  const rows = new Map();
  let errEl = null;
  const say = (msg) => {
    if (!msg) { errEl?.remove(); errEl = null; return; }
    if (!errEl) { errEl = document.createElement("small"); errEl.className = "err"; errEl.setAttribute("role", "alert"); wrap.insertBefore(errEl, list); }
    errEl.textContent = msg;
  };
  const writeInput = () => {
    try { const dt = new DataTransfer(); files.forEach((f) => dt.items.add(f)); input.files = dt.files; } catch (e) { /* browser lama: nilai input tetap pilihan terakhir */ }
    wrap.classList.toggle("full", input.multiple && files.length >= maxFiles);
    drop.classList.toggle("has", files.length > 0);
    wrap.classList.toggle("single", !input.multiple);
    emit(wrap, "fy:files", { files: [...files] });
  };
  const remove = (f) => {
    files = files.filter((x) => x !== f);
    const li = rows.get(f);
    const next = li?.nextElementSibling?.querySelector("button") || li?.previousElementSibling?.querySelector("button");
    if (li?._url) URL.revokeObjectURL(li._url);
    li?.remove(); rows.delete(f);
    say("");
    writeInput();
    (next || input).focus();
  };
  const row = (f) => {
    const li = document.createElement("li");
    li.className = "up-item";
    let thumb;
    if (f.type.startsWith("image/")) {
      thumb = document.createElement("img");
      li._url = URL.createObjectURL(f);
      thumb.src = li._url; thumb.alt = ""; thumb.width = 52; thumb.height = 52;
    } else {
      thumb = document.createElement("span");
      thumb.textContent = (f.name.split(".").pop() || "file").slice(0, 4);
      thumb.setAttribute("aria-hidden", "true");
    }
    thumb.className = "up-thumb" + (round ? " round" : "");
    const meta = document.createElement("div");
    meta.className = "up-meta";
    const name = document.createElement("b"); name.textContent = f.name;
    const info = document.createElement("small"); info.textContent = fmtSize(f.size);
    meta.append(name, info);
    const del = document.createElement("button");
    del.type = "button"; del.className = "icon-btn";
    del.setAttribute("aria-label", `Hapus ${f.name}`);
    del.innerHTML = ICON.x;
    del.addEventListener("click", () => remove(f));
    li.append(thumb, meta, del);
    li._info = info; li._meta = meta;
    return li;
  };
  const add = (incoming) => {
    const rejected = [];
    for (const f of incoming) {
      if (!okType(f)) { rejected.push(`${f.name}: jenis file tidak didukung`); continue; }
      if (f.size > maxMb * 1024 * 1024) { rejected.push(`${f.name}: lebih dari ${maxMb} MB`); continue; }
      if (!input.multiple) { files.forEach((x) => { rows.get(x)?.remove(); rows.delete(x); }); files = []; }
      if (files.length >= maxFiles) { rejected.push(`Maksimal ${maxFiles} file`); break; }
      if (files.some((x) => x.name === f.name && x.size === f.size)) continue;
      files.push(f);
      const li = row(f); rows.set(f, li); list.appendChild(li);
    }
    say(rejected.length ? rejected.join(". ") + "." : "");
    writeInput();
  };
  input.addEventListener("change", () => { const picked = [...input.files]; add(picked.filter((f) => !files.includes(f))); });
  ["dragenter", "dragover"].forEach((t) => wrap.addEventListener(t, (e) => { if (![...(e.dataTransfer?.types || [])].includes("Files")) return; e.preventDefault(); wrap.classList.add("over"); }));
  ["dragleave", "dragend"].forEach((t) => wrap.addEventListener(t, (e) => { if (!wrap.contains(e.relatedTarget)) wrap.classList.remove("over"); }));
  wrap.addEventListener("drop", (e) => { e.preventDefault(); wrap.classList.remove("over"); add([...e.dataTransfer.files]); });
  const progressEl = (f) => {
    const li = rows.get(f); if (!li) return null;
    let p = $(".progress", li);
    if (!p) { p = document.createElement("div"); p.className = "progress"; p.setAttribute("role", "progressbar"); p.setAttribute("aria-label", `Mengunggah ${f.name}`); p.innerHTML = "<span></span>"; li._meta.appendChild(p); }
    return p;
  };
  wrap._fyUpload = {
    files: () => [...files],
    progress(f, v) { const p = progressEl(f); if (!p) return; p.style.setProperty("--v", v); p.setAttribute("aria-valuenow", String(Math.round(v * 100))); },
    done(f) { const li = rows.get(f); if (!li) return; $(".progress", li)?.remove(); li._info.textContent = `${fmtSize(f.size)} · terunggah`; },
    fail(f, msg = "Gagal diunggah") { const li = rows.get(f); if (!li) return; $(".progress", li)?.remove(); li.classList.add("error"); li._info.textContent = msg; },
    clear() { [...files].forEach(remove); },
  };
}

/* =========================================================
   CHAT ([data-chat])
   - .convo[data-thread="id"] membuka <section class="thread" id="id">. Di HP isi obrolan jadi layar penuh
     dan masuk riwayat browser, jadi tombol back Android/gestur kembali menutupnya.
   - form.composer: textarea tumbuh sendiri, Enter kirim (Shift+Enter baris baru, di layar sentuh Enter = baris baru),
     event fy:send { text, thread }. Tambah pesan: el._fyChat.add(threadId, { text, me, time })
   ========================================================= */
const CHECKS = '<svg class="read" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 13l4 4 8-9"/><path d="M10 15l2 2 8-9"/></svg>';
function initChat(chat) {
  if (!once(chat, "_fyChat")) return;
  const wide = matchMedia("(min-width: 900px)");
  const convos = $$(".convo[data-thread]", chat);
  const threads = $$(".thread", chat);
  const scrollEnd = (t) => { const m = $(".msgs", t); if (m) m.scrollTop = m.scrollHeight; };
  let current = null;
  const show = (tid, push = true) => {
    const t = document.getElementById(tid);
    if (!t) return;
    threads.forEach((x) => (x.hidden = x !== t));
    convos.forEach((c) => {
      const on = c.dataset.thread === tid;
      c.setAttribute("aria-current", String(on));
      if (on) { c.classList.remove("unread"); $(".badge", c)?.remove(); }
    });
    current = tid;
    if (!wide.matches) {
      chat.classList.add("thread-open");
      if (push && history.state?.fyThread !== tid) history.pushState({ fyThread: tid }, "", "#" + tid);
      $(".back", t)?.focus({ preventScroll: true });
    }
    scrollEnd(t);
    emit(chat, "fy:thread", { thread: tid });
  };
  const close = () => {
    chat.classList.remove("thread-open");
    const c = convos.find((x) => x.dataset.thread === current);
    c?.focus({ preventScroll: true });
  };
  convos.forEach((c) => c.addEventListener("click", () => show(c.dataset.thread)));
  $$(".thread .back", chat).forEach((b) => b.addEventListener("click", () => { if (history.state?.fyThread) history.back(); else close(); }));
  addEventListener("popstate", () => { if (chat.classList.contains("thread-open") && !history.state?.fyThread) close(); });
  chat.addEventListener("keydown", (e) => { if (e.key === "Escape" && chat.classList.contains("thread-open") && !e.target.closest("dialog, .menu")) { e.preventDefault(); history.state?.fyThread ? history.back() : close(); } });
  wide.addEventListener("change", () => { if (wide.matches) chat.classList.remove("thread-open"); });
  // Awal: di layar lebar buka obrolan yang aria-current (atau pertama); di HP tampilkan daftar
  const first = convos.find((c) => c.getAttribute("aria-current") === "true") || convos[0];
  if (first) { threads.forEach((x) => (x.hidden = x.id !== first.dataset.thread)); current = first.dataset.thread; if (wide.matches) show(current, false); }
  if (location.hash && document.getElementById(location.hash.slice(1))?.classList.contains("thread")) show(location.hash.slice(1), false);

  const now = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(":", ".");
  const add = (tid, { text, me = true, time = now() }) => {
    const t = document.getElementById(tid);
    const msgs = t && $(".msgs", t);
    if (!msgs) return;
    const m = document.createElement("div");
    m.className = "msg " + (me ? "me" : "them");
    const p = document.createElement("p"); p.textContent = text;
    const tm = document.createElement("time"); tm.textContent = time;
    if (me) tm.insertAdjacentHTML("beforeend", CHECKS.replace('class="read"', 'class="sent"'));
    m.append(p, tm);
    const typing = $(".typing", msgs);
    msgs.insertBefore(m, typing || null);
    scrollEnd(t);
    const c = convos.find((x) => x.dataset.thread === tid);
    const prev = c && $(".convo-txt span", c);
    if (prev) prev.textContent = (me ? "Kamu: " : "") + text;
    const ct = c && $(".convo-meta time", c);
    if (ct) ct.textContent = time;
    return m;
  };
  $$("form.composer", chat).forEach((f) => {
    const ta = $("textarea", f);
    const send = $(".send", f);
    const grow = () => { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight + 4, 140) + "px"; if (send) send.disabled = !ta.value.trim(); };
    ta.addEventListener("input", grow);
    grow();
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing && !matchMedia("(pointer: coarse)").matches) { e.preventDefault(); f.requestSubmit(); }
    });
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = ta.value.trim();
      if (!text) return;
      const tid = f.closest(".thread")?.id;
      const ev = new CustomEvent("fy:send", { bubbles: true, cancelable: true, detail: { text, thread: tid } });
      f.dispatchEvent(ev);
      if (!ev.defaultPrevented) add(tid, { text }); // panggil e.preventDefault() kalau mau menambah pesan sendiri setelah server menjawab
      ta.value = ""; grow(); ta.focus();
    });
  });
  chat._fyChat = { open: show, close, add };
}

/* =========================================================
   TAMBAH KE KALENDER ([data-ics]) dan BAGIKAN ([data-share])
   <button data-ics data-title=".." data-start="2026-10-25T09:00:00+07:00" data-end="..." data-location=".." data-details="..">
     → mengunduh file .ics (bisa dibuka Google Calendar, Kalender iPhone, Outlook)
   <button data-share data-title=".." data-url="..">  → menu bagikan bawaan HP, atau salin tautan di laptop
   ========================================================= */
const icsDate = (s) => new Date(s).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsText = (s = "") => s.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
function initIcs(btn) {
  if (!once(btn, "_fyIcs")) return;
  btn.addEventListener("click", () => {
    const d = btn.dataset;
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//FUSIONIFY UI//ID", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@fusionify-ui`,
      `DTSTAMP:${icsDate(new Date().toISOString())}`,
      `DTSTART:${icsDate(d.start)}`, `DTEND:${icsDate(d.end || d.start)}`,
      `SUMMARY:${icsText(d.title)}`, d.location ? `LOCATION:${icsText(d.location)}` : "", d.details ? `DESCRIPTION:${icsText(d.details)}` : "",
      d.url ? `URL:${d.url}` : "",
      "END:VEVENT", "END:VCALENDAR",
    ].filter(Boolean).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    a.download = (d.file || d.title || "acara").replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-").toLowerCase() + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    emit(btn, "fy:ics", {});
  });
}
function initShare(btn) {
  if (!once(btn, "_fyShare")) return;
  btn.addEventListener("click", async () => {
    const url = btn.dataset.url || location.href;
    const title = btn.dataset.title || document.title;
    if (navigator.share && matchMedia("(pointer: coarse)").matches) {
      try { await navigator.share({ title, url }); return; } catch (e) { if (e.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(url); snackbar(btn.dataset.copied || "Tautan disalin"); }
    catch (e) { snackbar("Salin tautan ini: " + url); }
  });
}

/* =========================================================
   STEPPER / FORM BERTAHAP ([data-wizard])
   Langkah = fieldset.wizard-step[data-title]. Tombol [data-wizard-next] (type=submit) mengecek langkah aktif;
   di langkah terakhir form dikirim seperti biasa (atau tampil [data-done] kalau ada).
   API: el._fyWizard.go(i). Event: fy:step { index, total }
   ========================================================= */
const fieldMsg = (f) => {
  const d = f.dataset;
  if (f.validity.valueMissing) return d.msgRequired || "Wajib diisi.";
  if (f.validity.typeMismatch) return d.msgType || "Formatnya belum benar.";
  if (f.validity.tooShort) return d.msgShort || `Minimal ${f.minLength} karakter.`;
  if (f.validity.patternMismatch) return d.msgPattern || "Formatnya belum benar.";
  if (f.validity.rangeUnderflow || f.validity.rangeOverflow) return d.msgRange || "Di luar batas yang boleh.";
  if (d.match && f.value !== document.querySelector(d.match)?.value) return d.msgMatch || "Belum sama.";
  return "";
};
const markField = (f) => {
  const m = fieldMsg(f);
  const field = f.closest(".field, .check") || f.parentElement;
  let err = field.querySelector(".err");
  if (m) {
    if (!err) { err = document.createElement("small"); err.className = "err"; err.id = (f.id || f.name || id("f")) + "-err"; field.appendChild(err); }
    err.textContent = m;
    f.setAttribute("aria-invalid", "true");
    f.setAttribute("aria-describedby", err.id);
  } else { err?.remove(); f.removeAttribute("aria-invalid"); }
  return !m;
};
function initWizard(form) {
  if (!once(form, "_fyWizard")) return;
  form.noValidate = true;
  const steps = $$(".wizard-step", form);
  const total = steps.length;
  if (!total) return;
  const prev = $("[data-wizard-prev]", form);
  const next = $("[data-wizard-next]", form);
  const nextLabel = next?.textContent.trim() || "Lanjut";
  const lastLabel = next?.dataset.last || "Kirim";
  let list = $(".stepper", form);
  if (list && !list.children.length) {
    steps.forEach((s, i) => {
      const li = document.createElement("li");
      li.textContent = s.dataset.title || `Langkah ${i + 1}`;
      list.appendChild(li);
    });
  }
  const items = list ? $$("li", list) : [];
  let count = $(".wizard-count", form);
  if (!count && list) { count = document.createElement("p"); count.className = "wizard-count"; count.setAttribute("aria-live", "polite"); list.after(count); }
  // Hapus pesan error begitu pengguna mengetik perbaikannya
  form.addEventListener("input", (e) => { if (e.target.getAttribute?.("aria-invalid") === "true") markField(e.target); });
  form.addEventListener("change", (e) => { if (e.target.getAttribute?.("aria-invalid") === "true") markField(e.target); });
  let cur = Math.max(0, steps.findIndex((s) => !s.hidden));
  const go = (i, focus = true) => {
    cur = Math.min(Math.max(i, 0), total - 1);
    steps.forEach((s, j) => (s.hidden = j !== cur));
    items.forEach((li, j) => {
      li.classList.toggle("done", j < cur);
      if (j === cur) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
      const label = steps[j].dataset.title || `Langkah ${j + 1}`;
      li.setAttribute("aria-label", `Langkah ${j + 1} dari ${total}: ${label}${j < cur ? " (selesai)" : ""}`);
    });
    if (count) count.textContent = `Langkah ${cur + 1} dari ${total} · ${steps[cur].dataset.title || ""}`;
    if (prev) prev.hidden = cur === 0;
    if (next) next.textContent = cur === total - 1 ? lastLabel : nextLabel;
    if (focus) {
      const head = $("legend, h2, h3", steps[cur]);
      if (head) { head.tabIndex = -1; head.focus({ preventScroll: true }); }
      const top = form.getBoundingClientRect().top;
      if (top < 0) form.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
    }
    emit(form, "fy:step", { index: cur, total });
  };
  const valid = () => {
    const bad = $$("input, select, textarea", steps[cur]).filter((f) => f.willValidate && f.type !== "hidden" && !markField(f));
    if (bad.length) bad[0].focus();
    return !bad.length;
  };
  prev?.addEventListener("click", () => go(cur - 1));
  form.addEventListener("submit", (e) => {
    if (!valid()) { e.preventDefault(); e.stopImmediatePropagation(); return; }
    if (cur < total - 1) { e.preventDefault(); e.stopImmediatePropagation(); go(cur + 1); return; }
    const done = form.dataset.done && document.querySelector(form.dataset.done);
    if (done) { e.preventDefault(); e.stopImmediatePropagation(); form.hidden = true; done.hidden = false; const h = $("h2, h1", done); if (h) { h.tabIndex = -1; h.focus(); } }
  }, true);
  go(cur, false);
  form._fyWizard = { go, get index() { return cur; } };
}

/* =========================================================
   TABEL BISA DIURUTKAN (table[data-sort] th[data-sort-key])
   ========================================================= */
const SORT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="sort-arrow" d="M12 19V5M6 11l6-6 6 6"/><path class="sort-both" d="M8 9l4-4 4 4M8 15l4 4 4-4"/></svg>';
const parseDateID = (s) => {
  const bulan = { jan: 0, feb: 1, mar: 2, apr: 3, mei: 4, may: 4, jun: 5, jul: 6, agu: 7, agt: 7, aug: 7, sep: 8, okt: 9, oct: 9, nov: 10, des: 11, dec: 11 };
  const m = s.trim().toLowerCase().match(/^(\d{1,2})\s+([a-z]+)\.?\s+(\d{4})/);
  if (m && bulan[m[2].slice(0, 3)] !== undefined) return new Date(+m[3], bulan[m[2].slice(0, 3)], +m[1]).getTime();
  const t = Date.parse(s);
  return isNaN(t) ? 0 : t;
};
function initSort(table) {
  if (!once(table, "_fySort")) return;
  const heads = $$("thead th", table);
  const tbody = table.tBodies[0];
  if (!tbody) return;
  const coll = new Intl.Collator("id", { numeric: true, sensitivity: "base" });
  heads.forEach((th, col) => {
    if (!th.hasAttribute("data-sort-key")) return;
    const type = th.dataset.sortKey || "text";
    th.setAttribute("aria-sort", th.getAttribute("aria-sort") || "none");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sort-btn";
    btn.innerHTML = `<span>${th.innerHTML}</span>${SORT_ICON}`;
    th.textContent = "";
    th.appendChild(btn);
    const val = (tr) => {
      const td = tr.cells[col];
      if (!td) return "";
      const raw = td.dataset.value ?? td.textContent.trim();
      if (type === "num") return parseFloat(String(raw).replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".")) || 0;
      if (type === "date") return td.dataset.value ? Date.parse(td.dataset.value) || 0 : parseDateID(raw);
      return raw;
    };
    btn.addEventListener("click", () => {
      const dir = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";
      heads.forEach((h) => { if (h.hasAttribute("aria-sort")) h.setAttribute("aria-sort", "none"); });
      th.setAttribute("aria-sort", dir);
      const rows = Array.from(tbody.rows);
      const sign = dir === "ascending" ? 1 : -1;
      rows.sort((a, b) => {
        const x = val(a), y = val(b);
        return sign * (typeof x === "number" ? x - y : coll.compare(x, y));
      });
      tbody.append(...rows);
      emit(table, "fy:sort", { column: col, dir });
    });
  });
}

/* =========================================================
   PUSAT NOTIFIKASI ([data-notif])
   Klik item = tandai dibaca. "Tandai semua dibaca". Filter Semua / Belum dibaca (btn-group, value all|unread).
   Badge angka di tombol lonceng ikut berubah. API: el._fyNotif.add({ html, href, unread }), .count()
   ========================================================= */
function initNotif(wrap) {
  if (!once(wrap, "_fyNotif")) return;
  const btn = $("button[aria-controls]", wrap);
  const panel = btn && document.getElementById(btn.getAttribute("aria-controls"));
  if (!panel) return;
  const list = $(".notif-list", panel);
  panel.tabIndex = -1;
  const empty = $(".notif-empty", panel);
  const readAll = $(".notif-readall", panel);
  const filter = $(".notif-filter [data-btn-group]", panel) || $("[data-btn-group]", panel);
  const baseLabel = btn.dataset.label || "Notifikasi";
  let mode = "all";
  let scrim = $(".notif-scrim", wrap);
  if (!scrim) { scrim = document.createElement("div"); scrim.className = "notif-scrim"; wrap.appendChild(scrim); }
  const items = () => $$(".notif-item", list);
  const sync = () => {
    const n = items().filter((i) => i.classList.contains("unread")).length;
    let badge = $(".badge", btn);
    if (n) {
      if (!badge) { badge = document.createElement("span"); badge.className = "badge"; btn.appendChild(badge); btn.classList.add("has-badge"); }
      badge.textContent = n > 99 ? "99+" : String(n);
      badge.setAttribute("aria-hidden", "true");
    } else badge?.remove();
    btn.setAttribute("aria-label", n ? `${baseLabel}, ${n} belum dibaca` : baseLabel);
    if (readAll) readAll.disabled = !n;
    let shown = 0;
    items().forEach((i) => { const vis = mode === "all" || i.classList.contains("unread"); i.hidden = !vis; if (vis) shown++; });
    if (empty) empty.hidden = shown > 0;
    list.hidden = shown === 0;
    return n;
  };
  const markRead = (item) => {
    if (!item.classList.contains("unread")) return;
    item.classList.remove("unread");
    $(".sr-unread", item)?.remove();
    emit(wrap, "fy:read", { item });
  };
  const open = (show) => {
    panel.hidden = !show;
    panel.classList.toggle("open", show);
    wrap.classList.toggle("open", show);
    btn.setAttribute("aria-expanded", String(show));
    if (show) {
      sync();
      ($(".notif-item:not([hidden]) a, .notif-item:not([hidden]) button", panel) || readAll || panel).focus({ preventScroll: true });
    }
  };
  btn.addEventListener("click", (e) => { e.stopPropagation(); open(panel.hidden); });
  scrim.addEventListener("click", () => { open(false); btn.focus(); });
  document.addEventListener("pointerdown", (e) => { if (!panel.hidden && !wrap.contains(e.target) && !panel.contains(e.target)) open(false); });
  panel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.stopPropagation(); open(false); btn.focus(); }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const links = $$(".notif-item:not([hidden]) > a, .notif-item:not([hidden]) > button", panel);
      const i = links.indexOf(document.activeElement);
      if (i === -1) return;
      e.preventDefault();
      links[(i + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length].focus();
    }
  });
  list.addEventListener("click", (e) => { const it = e.target.closest(".notif-item"); if (it) { markRead(it); sync(); } });
  readAll?.addEventListener("click", () => { items().forEach(markRead); emit(wrap, "fy:read", { all: true }); sync(); panel.focus({ preventScroll: true }); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden && !panel.contains(document.activeElement)) { open(false); btn.focus(); } });
  filter?.addEventListener("fy:change", (e) => { mode = (e.detail.value[0] || "all").toLowerCase().includes("belum") || e.detail.value[0] === "unread" ? "unread" : "all"; sync(); });
  // Teks pembaca layar untuk item belum dibaca
  items().forEach((i) => { if (i.classList.contains("unread") && !$(".sr-unread", i)) { const s = document.createElement("span"); s.className = "sr-only sr-unread"; s.textContent = "Belum dibaca. "; ($("a, button", i) || i).prepend(s); } });
  const add = ({ html, href = "#", unread = true, icon = "" }) => {
    const li = document.createElement("li");
    li.className = "notif-item" + (unread ? " unread" : "");
    li.innerHTML = `<a href="${href}">${unread ? '<span class="sr-only sr-unread">Belum dibaca. </span>' : ""}<span class="notif-ico">${icon}</span><span class="notif-txt">${html}</span><span class="notif-dot" aria-hidden="true"></span></a>`;
    list.prepend(li);
    sync();
    return li;
  };
  sync();
  wrap._fyNotif = { open: () => open(true), close: () => open(false), add, count: () => items().filter((i) => i.classList.contains("unread")).length };
}


/* =========================================================
   BILAH OFFLINE ([data-offline-bar])
   Muncul otomatis saat koneksi putus, hilang saat tersambung lagi (plus snackbar). Event: fy:online / fy:offline di window.
   ========================================================= */
function initOffline(bar) {
  if (!once(bar, "_fyOff")) return;
  const set = (off, announce) => {
    bar.hidden = !off;
    document.documentElement.classList.toggle("is-offline", off);
    if (announce && !off) snackbar(bar.dataset.online || "Sudah tersambung lagi");
    dispatchEvent(new CustomEvent(off ? "fy:offline" : "fy:online"));
  };
  addEventListener("offline", () => set(true, true));
  addEventListener("online", () => set(false, true));
  if (!navigator.onLine) set(true, false);
}

/* =========================================================
   FOTO PROFIL + PEMOTONG BULAT ([data-avatar-crop])
   Atribut: data-size (bawaan 512), data-max-mb (bawaan 10), data-type (bawaan image/webp).
   Event: fy:crop { file, blob, url }. Dibatalkan: input dikembalikan ke file sebelumnya.
   ========================================================= */
const CROP_ICON = {
  zoomOut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M8 11h6M20 20l-4-4"/></svg>',
  zoomIn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M8 11h6M11 8v6M20 20l-4-4"/></svg>',
  rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>',
};
function initAvatarCrop(wrap) {
  if (!once(wrap, "_fyCrop")) return;
  const input = $("input[type='file']", wrap);
  if (!input) return;
  // Gambar pratinjau dibuat saat foto pertama dipilih (supaya tidak ada <img> kosong di HTML)
  let prevImg = $(".ac-preview img", wrap);
  const initial = $(".ac-initial", wrap);
  const N = +(wrap.dataset.size || 512);
  const maxMb = +(wrap.dataset.maxMb || 10);
  const type = wrap.dataset.type || "image/webp";
  let lastFiles = null; // file hasil potong terakhir (untuk dikembalikan kalau batal)

  const dlg = document.createElement("dialog");
  dlg.className = "modal crop-modal";
  const tid = id("crop");
  dlg.setAttribute("aria-labelledby", tid);
  dlg.innerHTML = `<div class="m-body">
      <h2 id="${tid}">Atur foto profil</h2>
      <div class="crop-stage" tabindex="0" role="application" aria-label="Area potong foto. Geser dengan panah, perbesar dengan plus dan minus."><img alt="" width="1" height="1" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><span class="crop-ring"></span></div>
      <div class="crop-tools">
        <button class="icon-btn" type="button" data-z="-1" aria-label="Perkecil">${CROP_ICON.zoomOut}</button>
        <input class="slider" type="range" min="1" max="4" step="0.01" value="1" aria-label="Perbesar foto">
        <button class="icon-btn" type="button" data-z="1" aria-label="Perbesar">${CROP_ICON.zoomIn}</button>
        <button class="icon-btn" type="button" data-rot aria-label="Putar 90 derajat">${CROP_ICON.rotate}</button>
      </div>
      <p class="crop-hint">Geser foto supaya wajah ada di tengah lingkaran.</p>
    </div>
    <div class="m-foot"><button class="btn ghost" type="button" data-cancel>Batal</button><button class="btn" type="button" data-apply>Pakai foto</button></div>`;
  document.body.appendChild(dlg);
  const stage = $(".crop-stage", dlg);
  const img = $("img", stage);
  const zoomEl = $(".slider", dlg);
  let st = { x: 0, y: 0, z: 1, r: 0, w: 1, h: 1, S: 300, url: "" };

  const dims = () => (st.r % 180 ? [st.h, st.w] : [st.w, st.h]);
  const base = () => { const [w, h] = dims(); return st.S / Math.min(w, h); };
  const clamp = () => {
    const [w, h] = dims();
    const sc = base() * st.z;
    const mx = Math.max(0, (w * sc - st.S) / 2), my = Math.max(0, (h * sc - st.S) / 2);
    st.x = Math.min(mx, Math.max(-mx, st.x));
    st.y = Math.min(my, Math.max(-my, st.y));
  };
  const draw = () => {
    clamp();
    const sc = base() * st.z;
    img.style.transform = `translate(-50%, -50%) translate(${st.x}px, ${st.y}px) rotate(${st.r}deg) scale(${sc})`;
    zoomEl.value = String(st.z);
    zoomEl.style.setProperty("--p", ((st.z - 1) / 3) * 100 + "%");
    zoomEl.setAttribute("aria-valuetext", Math.round(st.z * 100) + "%");
  };
  const setZoom = (z, cx = 0, cy = 0) => {
    const nz = Math.min(4, Math.max(1, z));
    // zoom ke arah titik (cx, cy) relatif pusat stage
    st.x = cx - (cx - st.x) * (nz / st.z);
    st.y = cy - (cy - st.y) * (nz / st.z);
    st.z = nz; draw();
  };

  // Geser dan cubit
  const pts = new Map();
  let start = null;
  stage.addEventListener("pointerdown", (e) => {
    stage.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    start = { x: st.x, y: st.y, z: st.z, pts: new Map(pts) };
  });
  stage.addEventListener("pointermove", (e) => {
    if (!pts.has(e.pointerId) || !start) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const a = [...pts.values()], s0 = [...start.pts.values()];
    if (a.length === 1 && s0.length >= 1) {
      st.x = start.x + (a[0].x - s0[0].x); st.y = start.y + (a[0].y - s0[0].y); draw();
    } else if (a.length >= 2 && s0.length >= 2) {
      const d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y), d0 = Math.hypot(s0[0].x - s0[1].x, s0[0].y - s0[1].y) || 1;
      st.z = start.z; st.x = start.x; st.y = start.y;
      setZoom(start.z * (d / d0));
    }
  });
  const up = (e) => { pts.delete(e.pointerId); start = pts.size ? { x: st.x, y: st.y, z: st.z, pts: new Map(pts) } : null; };
  stage.addEventListener("pointerup", up);
  stage.addEventListener("pointercancel", up);
  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    setZoom(st.z * (e.deltaY < 0 ? 1.08 : 1 / 1.08), e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
  }, { passive: false });
  stage.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? 40 : 10;
    const k = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] }[e.key];
    if (k) { e.preventDefault(); st.x += k[0]; st.y += k[1]; draw(); }
    if (e.key === "+" || e.key === "=") { e.preventDefault(); setZoom(st.z + 0.1); }
    if (e.key === "-" || e.key === "_") { e.preventDefault(); setZoom(st.z - 0.1); }
  });
  zoomEl.addEventListener("input", () => setZoom(+zoomEl.value));
  $$("[data-z]", dlg).forEach((b) => b.addEventListener("click", () => setZoom(st.z + 0.25 * +b.dataset.z)));
  $("[data-rot]", dlg).addEventListener("click", () => { st.r = (st.r + 90) % 360; draw(); });

  const restore = () => {
    if (lastFiles) input.files = lastFiles; else input.value = "";
  };
  const close = () => { dlg.close(); if (st.url) URL.revokeObjectURL(st.url); st.url = ""; };
  $("[data-cancel]", dlg).addEventListener("click", () => { restore(); close(); input.focus?.(); });
  dlg.addEventListener("cancel", () => { restore(); if (st.url) URL.revokeObjectURL(st.url); st.url = ""; });
  $("[data-apply]", dlg).addEventListener("click", () => {
    const c = document.createElement("canvas");
    c.width = c.height = N;
    const ctx = c.getContext("2d");
    const k = N / st.S, sc = base() * st.z;
    ctx.imageSmoothingQuality = "high";
    ctx.translate(N / 2 + st.x * k, N / 2 + st.y * k);
    ctx.rotate((st.r * Math.PI) / 180);
    ctx.scale(sc * k, sc * k);
    ctx.drawImage(img, -st.w / 2, -st.h / 2);
    c.toBlob((blob) => {
      if (!blob) { snackbar("Foto gagal diproses. Coba foto lain."); return; }
      const ext = blob.type.split("/")[1] || "png";
      const file = new File([blob], `foto-profil.${ext}`, { type: blob.type });
      try { const dt = new DataTransfer(); dt.items.add(file); input.files = dt.files; lastFiles = input.files; } catch (_) { /* browser lama: pakai event fy:crop */ }
      const url = URL.createObjectURL(blob);
      const box = $(".ac-preview", wrap);
      if (!prevImg && box) { prevImg = document.createElement("img"); prevImg.alt = wrap.dataset.alt || "Foto profil"; prevImg.width = prevImg.height = 88; box.prepend(prevImg); }
      if (prevImg) { prevImg.src = url; prevImg.hidden = false; }
      if (initial) initial.hidden = true;
      close();
      emit(wrap, "fy:crop", { file, blob, url });
      snackbar(wrap.dataset.done || "Foto profil siap disimpan");
    }, type, 0.9);
  });

  input.addEventListener("change", () => {
    const f = input.files?.[0];
    if (!f || f === lastFiles?.[0]) return;
    if (!f.type.startsWith("image/")) { snackbar("Pilih file gambar ya (JPG, PNG, atau WebP)."); restore(); return; }
    if (f.size > maxMb * 1024 * 1024) { snackbar(`Fotonya kebesaran. Maksimal ${maxMb} MB.`); restore(); return; }
    st.url = URL.createObjectURL(f);
    img.onload = () => {
      st = { ...st, x: 0, y: 0, z: 1, r: 0, w: img.naturalWidth, h: img.naturalHeight };
      img.style.width = st.w + "px"; img.style.height = st.h + "px";
      dlg.showModal();
      st.S = stage.clientWidth || 300;
      draw();
      stage.focus({ preventScroll: true });
    };
    img.onerror = () => { snackbar("Foto ini tidak bisa dibuka. Coba foto lain."); restore(); URL.revokeObjectURL(st.url); };
    img.src = st.url;
  });
  wrap._fyCrop = { open: () => input.click() };
}

/* =========================================================
   INIT
   ========================================================= */
export function initControls(root = document) {
  if (!cekLisensi()) return api;
  if (root === document && !once(document, "_fyControls")) return api;

  /* ---------- Dropdown / split button ---------- */
  const closeMenus = (except) => $$("[data-dropdown][aria-expanded='true']").forEach((b) => {
    if (b === except) return;
    b.setAttribute("aria-expanded", "false");
    b.nextElementSibling?.setAttribute("hidden", "");
  });
  $$("[data-dropdown]", root).forEach((btn) => {
    if (!once(btn, "_fyDd")) return;
    const menu = btn.nextElementSibling;
    if (!menu) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = btn.getAttribute("aria-expanded") !== "true";
      closeMenus(btn);
      btn.setAttribute("aria-expanded", String(open));
      menu.toggleAttribute("hidden", !open);
      if (open) {
        // Buka ke atas kalau tidak muat di bawah
        menu.classList.remove("up");
        const r = menu.getBoundingClientRect();
        if (r.bottom > innerHeight - 8 && btn.getBoundingClientRect().top > r.height + 16) menu.classList.add("up");
        $("a, button", menu)?.focus();
      }
    });
    menu.addEventListener("keydown", (e) => {
      const items = $$("a, button", menu);
      const i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closeMenus(); btn.focus(); }
      if (e.key === "Tab") closeMenus();
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a, button")) closeMenus(); });
  });

  /* ---------- Modal & sheet ---------- */
  $$("dialog.modal, dialog.sheet, dialog.side-sheet", root).forEach(initDialog);
  $$("[data-open-modal], [data-open-sheet]", root).forEach((b) => {
    if (!once(b, "_fyOpen")) return;
    b.addEventListener("click", () => openDialog(document.getElementById(b.dataset.openModal || b.dataset.openSheet), b));
  });

  /* ---------- Tab ---------- */
  $$("[data-tabs]", root).forEach((wrap) => {
    if (!once(wrap, "_fyTabs")) return;
    const tabs = $$("[role='tab']", wrap);
    const select = (t) => tabs.forEach((x) => {
      const on = x === t;
      x.setAttribute("aria-selected", String(on));
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute("aria-controls"))?.toggleAttribute("hidden", !on);
    });
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          const n = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
          select(n); n.focus();
        }
      });
    });
  });

  /* ---------- Button group ---------- */
  $$("[data-btn-group]", root).forEach((g) => {
    if (!once(g, "_fyBg")) return;
    const multi = g.dataset.btnGroup === "multi";
    g.addEventListener("click", (e) => {
      const b = e.target.closest("button[aria-pressed]");
      if (!b || !g.contains(b)) return;
      if (multi) b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
      else $$("button[aria-pressed]", g).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      emit(g, "fy:change", { value: $$("button[aria-pressed='true']", g).map((x) => x.value || x.textContent.trim()) });
    });
  });

  /* ---------- Chip filter & chip input ---------- */
  $$(".chip-btn[aria-pressed]", root).forEach((c) => {
    if (!once(c, "_fyChip")) return;
    c.addEventListener("click", () => {
      const single = c.closest("[data-single]");
      const on = c.getAttribute("aria-pressed") !== "true";
      if (single) $$(".chip-btn[aria-pressed]", single).forEach((x) => x.setAttribute("aria-pressed", "false"));
      c.setAttribute("aria-pressed", String(single ? true : on));
      emit(c, "fy:change", { value: c.value || c.textContent.trim(), pressed: c.getAttribute("aria-pressed") === "true" });
    });
  });
  $$(".chip-input .x", root).forEach((x) => {
    if (!once(x, "_fyX")) return;
    x.addEventListener("click", () => {
      const chip = x.closest(".chip-input");
      const set = chip.parentElement;
      const sib = chip.nextElementSibling?.querySelector?.(".x") || chip.previousElementSibling?.querySelector?.(".x");
      emit(chip, "fy:remove", { value: chip.dataset.value || chip.textContent.replace(x.textContent, "").trim() });
      chip.remove();
      (sib || set.closest("[data-chip-focus]")?.querySelector("input") || set.querySelector("input"))?.focus();
    });
  });

  /* ---------- FAB menu ---------- */
  $$("[data-fab-menu]", root).forEach((wrap) => {
    if (!once(wrap, "_fyFab")) return;
    const btn = wrap.querySelector(":scope > .fab");
    const list = document.getElementById(btn.getAttribute("aria-controls"));
    let scrim = null;
    const set = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      list.hidden = !open;
      const items = $$(".fab-action", list);
      items.forEach((it, i) => it.style.setProperty("--i", items.length - 1 - i));
      if (open && !scrim) { scrim = document.createElement("div"); scrim.className = "fab-scrim"; scrim.addEventListener("click", () => set(false)); wrap.parentElement.before(scrim); }
      scrim?.classList.toggle("on", open);
      if (open) items[items.length - 1]?.focus();
    };
    btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
    wrap.addEventListener("keydown", (e) => { if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { e.preventDefault(); e.stopPropagation(); set(false); btn.focus(); } });
    list.addEventListener("click", (e) => { if (e.target.closest(".fab-action")) set(false); });
  });

  /* ---------- Scroll: FAB mengecil, app bar ---------- */
  const shrinkers = $$("[data-fab-shrink]", root);
  const appbars = $$("[data-appbar]", root);
  if (shrinkers.length || appbars.length) {
    let last = scrollY, ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        if (Math.abs(y - last) > 6) { shrinkers.forEach((f) => f.classList.toggle("shrink", y > last && y > 80)); last = y; }
        appbars.forEach((a) => a.classList.toggle("scrolled", y > 4));
        ticking = false;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Carousel ---------- */
  $$("[data-carousel]", root).forEach((c) => {
    if (!once(c, "_fyCar")) return;
    const track = $(".carousel-track", c);
    const slides = $$(".slide", track);
    const prev = $("[data-prev]", c), next = $("[data-next]", c);
    const dotsWrap = $(".carousel-dots", c);
    const total = slides.length;
    slides.forEach((s, i) => {
      s.setAttribute("role", "group");
      s.setAttribute("aria-roledescription", s.getAttribute("aria-roledescription") || "slide");
      if (!s.hasAttribute("aria-label")) s.setAttribute("aria-label", `${i + 1} / ${total}`);
    });
    let dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((s, i) => `<button type="button" aria-label="${s.getAttribute("aria-label")}"></button>`).join("");
      dots = $$("button", dotsWrap);
      dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
    }
    const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth);
    const index = () => Math.round(track.scrollLeft / Math.max(1, step()));
    const go = (i) => track.scrollTo({ left: Math.max(0, Math.min(total - 1, i)) * step(), behavior: reduce() ? "auto" : "smooth" });
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      const i = track.scrollLeft >= max ? total - 1 : index();
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
    };
    prev?.addEventListener("click", () => go(index() - 1));
    next?.addEventListener("click", () => go(index() + 1));
    track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
    track.addEventListener("keydown", (e) => {
      if (e.target !== track) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(index() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index() - 1); }
    });
    addEventListener("resize", sync);
    sync();
  });

  /* ---------- Slider ---------- */
  const pct = (inp) => {
    const min = +inp.min || 0, max = inp.max === "" ? 100 : +inp.max;
    return (inp.value - min) / ((max - min) || 1);
  };
  // Posisi isian mengikuti tengah kenop (kenop 26px), bukan tepi kotak
  const pos = (f) => `calc(13px + (100% - 26px) * ${f.toFixed(4)})`;
  const output = (inp) => {
    const out = inp.id && document.querySelector(`output[for~="${inp.id}"]`);
    if (!out) return;
    const fmt = inp.dataset.format;
    const v = (x) => (fmt ? fmt.replace("{v}", Number(x).toLocaleString(document.documentElement.lang || "id-ID")) : x);
    const r2 = inp.closest("[data-range2]");
    if (r2 && out.htmlFor.length > 1) { const [a, b] = $$(".slider", r2); out.textContent = `${v(a.value)} – ${v(b.value)}`.replace(" – ", " s.d. "); }
    else out.textContent = v(inp.value);
  };
  $$(".slider", root).forEach((inp) => {
    if (!once(inp, "_fySl") || inp.closest("[data-range2]")) return;
    const upd = () => { inp.style.setProperty("--p", pos(pct(inp))); output(inp); };
    inp.addEventListener("input", () => { upd(); emit(inp, "fy:change", { value: +inp.value }); });
    upd();
  });
  $$("[data-range2]", root).forEach((w) => {
    if (!once(w, "_fyR2")) return;
    const [a, b] = $$(".slider", w);
    const gap = +(w.dataset.gap || 0);
    const upd = (src) => {
      if (+a.value > +b.value - gap) { if (src === a) a.value = +b.value - gap; else b.value = +a.value + gap; }
      w.style.setProperty("--a", pos(pct(a)));
      w.style.setProperty("--b", pos(pct(b)));
      output(a);
    };
    [a, b].forEach((x) => x.addEventListener("input", () => { upd(x); emit(w, "fy:change", { min: +a.value, max: +b.value }); }));
    upd(a);
  });

  /* ---------- Tooltip ---------- */
  $$(".tip-wrap", root).forEach((w) => {
    if (!once(w, "_fyTip")) return;
    const tip = $(".tip", w);
    if (!tip) return;
    const place = () => {
      tip.style.setProperty("--dx", "0px");
      const r = tip.getBoundingClientRect();
      let dx = 0;
      if (r.left < 8) dx = 8 - r.left;
      else if (r.right > innerWidth - 8) dx = innerWidth - 8 - r.right;
      tip.style.setProperty("--dx", `${Math.round(dx)}px`);
    };
    w.addEventListener("pointerenter", place);
    w.addEventListener("focusin", place);
    w.addEventListener("pointerleave", () => w.classList.remove("tip-off"));
    w.addEventListener("focusout", () => w.classList.remove("tip-off", "tip-on"));
    w.addEventListener("keydown", (e) => { if (e.key === "Escape" && !w.classList.contains("tip-off")) { w.classList.add("tip-off"); if (w.closest("dialog")) e.preventDefault(); } });
    // Tekan lama di layar sentuh
    let t;
    w.addEventListener("touchstart", () => { t = setTimeout(() => { place(); w.classList.add("tip-on"); }, 450); }, { passive: true });
    const end = () => { clearTimeout(t); setTimeout(() => w.classList.remove("tip-on"), 1500); };
    w.addEventListener("touchend", end); w.addEventListener("touchcancel", end);
  });

  /* ---------- Search dengan saran ---------- */
  $$("[data-suggest]", root).forEach((w) => {
    if (!once(w, "_fySg")) return;
    const input = $("input", w);
    const list = $(".suggest", w);
    const opts = $$("[role='option']", list);
    opts.forEach((o) => { if (!o.id) o.id = id("opt"); });
    let none = $(".none", list);
    if (!none) { none = document.createElement("li"); none.className = "none"; none.setAttribute("role", "presentation"); none.textContent = w.dataset.empty || "Tidak ada hasil"; none.hidden = true; list.appendChild(none); }
    let active = -1;
    const visible = () => opts.filter((o) => !o.hidden);
    const setActive = (i) => {
      const v = visible();
      active = v.length ? (i + v.length) % v.length : -1;
      opts.forEach((o) => o.setAttribute("aria-selected", "false"));
      if (active >= 0) { v[active].setAttribute("aria-selected", "true"); input.setAttribute("aria-activedescendant", v[active].id); v[active].scrollIntoView({ block: "nearest" }); }
      else input.removeAttribute("aria-activedescendant");
    };
    const show = (on) => { list.hidden = !on; input.setAttribute("aria-expanded", String(on)); if (!on) setActive(-1); };
    const filter = () => {
      const q = input.value.trim().toLowerCase();
      opts.forEach((o) => (o.hidden = q && !o.textContent.toLowerCase().includes(q)));
      none.hidden = visible().length > 0;
      show(true); active = -1; setActive(-1);
    };
    const choose = (o) => { input.value = o.dataset.value || o.textContent.trim(); show(false); emit(w, "fy:select", { value: input.value }); };
    input.addEventListener("input", filter);
    input.addEventListener("focus", filter);
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); if (list.hidden) filter(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter" && active >= 0) { e.preventDefault(); choose(visible()[active]); }
      else if (e.key === "Escape") { if (!list.hidden) { e.preventDefault(); e.stopPropagation(); show(false); } }
    });
    list.addEventListener("pointerdown", (e) => e.preventDefault()); // fokus tetap di input
    list.addEventListener("click", (e) => { const o = e.target.closest("[role='option']"); if (o) choose(o); });
    document.addEventListener("pointerdown", (e) => { if (!w.contains(e.target)) show(false); });
  });

  /* ---------- Date & time picker ---------- */
  $$("[data-datepicker]", root).forEach(initDatepicker);
  $$("[data-timepicker]", root).forEach(initTimepicker);

  /* ---------- OTP, upload, hitung mundur ---------- */
  $$("[data-otp]", root).forEach(initOtp);
  $$("[data-upload]", root).forEach(initUpload);
  $$("[data-countdown]", root).forEach(initCountdown);
  $$("[data-chat]", root).forEach(initChat);
  $$("[data-ics]", root).forEach(initIcs);
  $$("[data-share]", root).forEach(initShare);
  $$("form[data-wizard]", root).forEach(initWizard);
  $$("table[data-sort]", root).forEach(initSort);
  $$("[data-notif]", root).forEach(initNotif);
  $$("[data-offline-bar]", root).forEach(initOffline);
  $$("[data-avatar-crop]", root).forEach(initAvatarCrop);
  $$("[data-toc]", root).forEach(initToc);

  /* ---------- Snackbar deklaratif ---------- */
  $$("[data-snackbar]", root).forEach((b) => {
    if (!once(b, "_fySb")) return;
    b.addEventListener("click", () => snackbar(b.dataset.snackbar, { action: b.dataset.snackbarAction, onAction: () => b.dispatchEvent(new CustomEvent("fy:snackbar-action", { bubbles: true })) }));
  });

  /* ---------- Global: klik luar dan Esc ---------- */
  if (root === document) {
    document.addEventListener("click", (e) => { if (!e.target.closest(".menu")) closeMenus(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenus(); });
  }
  return api;
}

const api = { snackbar, openDialog, closeDialog, otpError, closePopup: closePop, init: initControls };
export { openDialog, closeDialog };
// otpError(el, pesan) diekspor di atas
