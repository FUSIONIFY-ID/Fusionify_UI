// FUSIONIFY UI · theme.js
// Mode terang / gelap. Bawaan: ikut sistem. Pilihan pengguna disimpan di localStorage ("fy-theme").
// Pasang skrip head (snippets/head-script.html) supaya tema sudah benar sebelum halaman tampil (tanpa kedip).
//
// Tombol: <button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="Ganti tema">...</button>
// Web yang ingin selalu terang: <html data-theme="light" data-theme-lock> dan jangan pasang tombolnya.
//
// Aman diimpor di server (SSR Next.js/Astro): document dan matchMedia baru disentuh saat fungsi dipanggil.

const KEY = "fy-theme";
// Warna bilah browser HP (<meta name="theme-color">), sama dengan --paper terang dan gelap.
const WARNA_BILAH = { light: "#f7fbff", dark: "#071022" };

const root = () => document.documentElement;
let mediaGelap = null;
const media = () => (mediaGelap ??= matchMedia("(prefers-color-scheme: dark)"));

export const currentTheme = () => root().dataset.theme || (media().matches ? "dark" : "light");

export function setTheme(t) {
  if (root().hasAttribute("data-theme-lock")) return;
  root().dataset.theme = t;
  try { localStorage.setItem(KEY, t); } catch {}
  sinkron();
  root().dispatchEvent(new CustomEvent("fy:theme", { detail: t }));
}

// Pilihan manual menimpa tema sistem, jadi semua <meta name="theme-color"> (termasuk yang ber-media)
// disamakan dengan tema aktif. Tanpa pilihan manual, meta ber-media dibiarkan bekerja sendiri.
function sinkronBilah(t) {
  if (!root().dataset.theme) return;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
    if (!m.dataset.fyAsli) m.dataset.fyAsli = m.getAttribute("content") || "";
    m.setAttribute("content", WARNA_BILAH[t] || m.dataset.fyAsli);
  });
}

function sinkron() {
  const t = currentTheme();
  document.querySelectorAll("[data-theme-toggle]").forEach((b) => {
    b.setAttribute("aria-pressed", String(t === "dark"));
    const id = b.dataset.labelDark && b.dataset.labelLight ? (t === "dark" ? b.dataset.labelLight : b.dataset.labelDark) : null;
    if (id) b.setAttribute("aria-label", id);
  });
  sinkronBilah(t);
}

let terpasang = false;
export function initTheme() {
  sinkron();
  if (terpasang) return; // dipanggil ulang (navigasi SPA, initApp + initFusionify) tidak menumpuk listener
  terpasang = true;
  document.addEventListener("click", (e) => {
    const b = e.target.closest?.("[data-theme-toggle]");
    if (!b) return;
    // Transisi warna singkat hanya saat ditekan (bukan saat halaman dimuat)
    root().classList.add("theme-switching");
    setTheme(currentTheme() === "dark" ? "light" : "dark");
    setTimeout(() => root().classList.remove("theme-switching"), 350);
  });
  media().addEventListener?.("change", sinkron);
}
