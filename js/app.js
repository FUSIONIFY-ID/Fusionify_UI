// FUSIONIFY UI · app.js
// Interaksi halaman aplikasi (dashboard, admin, masuk/daftar). Tanpa dependensi, tanpa GSAP.
//
//   import { initApp } from "./fusionify-ui/js/app.js";
//   const app = initApp();
//   app.toast("Tersimpan!");
//
// Yang ditangani:
// - Tema terang/gelap ([data-theme-toggle])
// - Sidebar di HP ([data-side-toggle], .app.side-open, Esc, klik scrim)
// - Semua komponen kontrol lewat initControls() (js/controls.js): dropdown, modal, sheet, tab,
//   button group, chip, FAB, carousel, slider, tooltip, search, date/time picker, snackbar
// - Tampil/sembunyi password ([data-pw-toggle]) dan meter kekuatan ([data-pw-meter])
// - Validasi form ([data-validate]): required, email, minlength, [data-match="#id"], tampil pesan .err
// - Pilih semua baris tabel ([data-check-all])
// - Toast (pakai markup .toast dari snippets/body-parts.html)

import { initTheme } from "./theme.js";
import { cekLisensi } from "./lisensi.js";
import { initControls, snackbar, otpError } from "./controls.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

export function initApp() {
  if (!cekLisensi()) return { toast() {}, snackbar() {}, otpError() {}, setSide() {} };
  window.__fx = true; // supaya fallback .fx-off di <head> tidak aktif
  initTheme();
  initControls(); // dropdown, modal, sheet, tab, chip, picker, snackbar, dll. (js/controls.js)

  /* ---------- Sidebar HP ---------- */
  const app = $("[data-app]");
  const side = $("[data-side]");
  const sideBtns = $$("[data-side-toggle]");
  const setSide = (open) => {
    if (!app) return;
    app.classList.toggle("side-open", open);
    sideBtns.forEach((b) => b.setAttribute("aria-expanded", String(open)));
    if (side && matchMedia("(max-width: 960px)").matches) side.inert = !open;
    if (open) $("a", side)?.focus({ preventScroll: true });
  };
  const syncSide = () => { if (side) side.inert = matchMedia("(max-width: 960px)").matches && !app?.classList.contains("side-open"); };
  sideBtns.forEach((b) => b.addEventListener("click", () => setSide(!app.classList.contains("side-open"))));
  $(".scrim", app || document)?.addEventListener("click", () => setSide(false));
  matchMedia("(max-width: 960px)").addEventListener("change", () => { setSide(false); syncSide(); });
  syncSide();

  /* ---------- Password ---------- */
  $$("[data-pw-toggle]").forEach((b) => b.addEventListener("click", () => {
    const input = b.parentElement.querySelector("input");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    b.setAttribute("aria-pressed", String(show));
    b.setAttribute("aria-label", show ? (b.dataset.hide || "Sembunyikan password") : (b.dataset.show || "Tampilkan password"));
  }));
  $$("[data-pw-meter]").forEach((meter) => {
    const input = document.querySelector(meter.dataset.pwMeter);
    const label = meter.nextElementSibling;
    const words = (meter.dataset.words || "Terlalu pendek|Lemah|Lumayan|Kuat|Sangat kuat").split("|");
    input?.addEventListener("input", () => {
      const v = input.value;
      let lvl = 0;
      if (v.length >= 8) lvl++;
      if (/[A-Z]/.test(v) && /[a-z]/.test(v)) lvl++;
      if (/\d/.test(v)) lvl++;
      if (/[^A-Za-z0-9]/.test(v) || v.length >= 14) lvl++;
      if (v.length < 8) lvl = Math.min(lvl, 1);
      meter.dataset.level = String(v ? Math.max(lvl, 1) : 0);
      if (label) label.textContent = v ? words[Math.max(lvl, 1)] : "";
    });
  });

  /* ---------- Validasi form ---------- */
  $$("form[data-validate]").forEach((form) => {
    form.noValidate = true;
    const msg = (f) => {
      const d = f.dataset;
      if (f.validity.valueMissing) return d.msgRequired || "Wajib diisi.";
      if (f.validity.typeMismatch) return d.msgType || "Formatnya belum benar.";
      if (f.validity.tooShort) return d.msgShort || `Minimal ${f.minLength} karakter.`;
      if (d.match && f.value !== document.querySelector(d.match)?.value) return d.msgMatch || "Belum sama.";
      return "";
    };
    const check = (f) => {
      const m = msg(f);
      const field = f.closest(".field") || f.parentElement;
      let err = field.querySelector(".err");
      if (m) {
        if (!err) { err = document.createElement("small"); err.className = "err"; err.id = (f.id || f.name) + "-err"; field.appendChild(err); }
        err.textContent = m;
        f.setAttribute("aria-invalid", "true");
        f.setAttribute("aria-describedby", err.id);
      } else {
        err?.remove();
        f.removeAttribute("aria-invalid");
      }
      return !m;
    };
    const fields = () => $$("input, select, textarea", form).filter((f) => f.willValidate && f.type !== "hidden");
    // Pesan error hilang saat pengguna mengetik perbaikannya (bukan saat blur), supaya tata letak
    // tidak bergeser tepat ketika pengguna mengklik tombol lain. Error baru hanya ditambah saat blur.
    fields().forEach((f) => {
      f.addEventListener("input", () => { if (f.getAttribute("aria-invalid") === "true") check(f); });
      f.addEventListener("change", () => { if (f.getAttribute("aria-invalid") === "true") check(f); });
      f.addEventListener("blur", (e) => {
        if (!f.value || f.getAttribute("aria-invalid") === "true") return;
        if (e.relatedTarget && f.closest(".pw-field")?.contains(e.relatedTarget)) return;
        check(f);
      });
    });
    form.addEventListener("submit", (e) => {
      const bad = fields().filter((f) => !check(f));
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      // Template: tampilkan keadaan berhasil kalau ada [data-done]. Di proyek nyata, kirim ke server di sini.
      const done = form.dataset.done && document.querySelector(form.dataset.done);
      if (done) { e.preventDefault(); form.hidden = true; done.hidden = false; done.querySelector("h2, h1")?.focus?.(); }
    });
  });

  /* ---------- Pilih semua baris ---------- */
  $$("[data-check-all]").forEach((all) => {
    const table = all.closest("table");
    const boxes = () => $$("tbody input[type='checkbox']", table);
    const sync = () => boxes().forEach((b) => b.closest("tr").setAttribute("aria-selected", String(b.checked)));
    all.addEventListener("change", () => { boxes().forEach((b) => (b.checked = all.checked)); sync(); });
    table.addEventListener("change", (e) => { if (e.target !== all) { const bs = boxes(); all.checked = bs.every((b) => b.checked); all.indeterminate = !all.checked && bs.some((b) => b.checked); sync(); } });
  });

  /* ---------- Esc menutup sidebar dan menu ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (app?.classList.contains("side-open")) { setSide(false); sideBtns[0]?.focus(); }
  });

  /* ---------- Toast ---------- */
  const toast = (text) => {
    const el = $("[data-toast]");
    if (!el) return;
    $("[data-toast-text]", el).textContent = text;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2600);
  };
  $$("[data-toast-msg]").forEach((b) => b.addEventListener("click", () => toast(b.dataset.toastMsg)));

  return { toast, snackbar, otpError, setSide };
}
