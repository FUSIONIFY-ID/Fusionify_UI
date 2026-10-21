// FUSIONIFY UI · theme.js
// Mode terang / gelap. Bawaan: ikut sistem. Pilihan pengguna disimpan di localStorage ("fy-theme").
// Pasang skrip head (snippets/head-script.html) supaya tema sudah benar sebelum halaman tampil (tanpa kedip).
//
// Tombol: <button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="Ganti tema">...</button>
// Web yang ingin selalu terang: <html data-theme="light" data-theme-lock> dan jangan pasang tombolnya.

const KEY = "fy-theme";
const root = document.documentElement;
const media = matchMedia("(prefers-color-scheme: dark)");

export const currentTheme = () => root.dataset.theme || (media.matches ? "dark" : "light");

export function setTheme(t) {
  if (root.hasAttribute("data-theme-lock")) return;
  root.dataset.theme = t;
  try { localStorage.setItem(KEY, t); } catch {}
  syncButtons();
  root.dispatchEvent(new CustomEvent("fy:theme", { detail: t }));
}

function syncButtons() {
  const t = currentTheme();
  document.querySelectorAll("[data-theme-toggle]").forEach((b) => {
    b.setAttribute("aria-pressed", String(t === "dark"));
    const id = b.dataset.labelDark && b.dataset.labelLight ? (t === "dark" ? b.dataset.labelLight : b.dataset.labelDark) : null;
    if (id) b.setAttribute("aria-label", id);
  });
}

export function initTheme() {
  document.addEventListener("click", (e) => {
    const b = e.target.closest?.("[data-theme-toggle]");
    if (!b) return;
    // Transisi warna singkat hanya saat ditekan (bukan saat halaman dimuat)
    root.classList.add("theme-switching");
    setTheme(currentTheme() === "dark" ? "light" : "dark");
    setTimeout(() => root.classList.remove("theme-switching"), 350);
  });
  media.addEventListener?.("change", syncButtons);
  syncButtons();
}
