// FUSIONIFY UI · kelas.js
// Kelas ukuran layar (sama dengan window size class Material 3) dan posisi HP lipat.
// Dipanggil otomatis oleh initFusionify() dan initApp(); boleh dipanggil sendiri di produk React/Vue.
//
//   <html data-kelas="ringkas|sedang|lebar|besar|sangat-besar" data-lipat="kiri-kanan|atas-bawah">
//   ringkas < 600 · sedang 600-839 · lebar 840-1199 · besar 1200-1599 · sangat besar >= 1600 (lihat css/tokens.css)
//   data-lipat hanya ada saat layar terbagi engsel (Galaxy Z Fold/Flip setengah terlipat, perangkat dua layar),
//   lewat media query viewport-segments. Di perangkat biasa atribut ini tidak ada.
//
// Event "fy:kelas" di <html> setiap kelas atau posisi lipat berubah: e.detail = { kelas, lipat }.
// CSS sebaiknya tetap memakai @media dengan angka di atas; atribut ini untuk JavaScript dan komponen framework.

export const KELAS = [
  ["sangat-besar", 1600],
  ["besar", 1200],
  ["lebar", 840],
  ["sedang", 600],
  ["ringkas", 0],
];

export function kelasDari(lebar) {
  for (const [nama, min] of KELAS) if (lebar >= min) return nama;
  return "ringkas";
}

const segmen = (arah) => {
  try {
    return matchMedia(`(${arah}-viewport-segments: 2)`).matches;
  } catch {
    return false;
  }
};

export function posisiLipat() {
  if (segmen("horizontal")) return "kiri-kanan";
  if (segmen("vertical")) return "atas-bawah";
  return null;
}

let aktif = false;
export function initKelas() {
  const d = document.documentElement;
  const sinkron = () => {
    const kelas = kelasDari(innerWidth);
    const lipat = posisiLipat();
    if (d.dataset.kelas === kelas && (d.dataset.lipat || null) === lipat) return;
    d.dataset.kelas = kelas;
    if (lipat) d.dataset.lipat = lipat;
    else delete d.dataset.lipat;
    d.dispatchEvent(new CustomEvent("fy:kelas", { detail: { kelas, lipat } }));
  };
  sinkron();
  if (aktif) return;
  aktif = true;
  for (const [, min] of KELAS) if (min) matchMedia(`(min-width: ${min}px)`).addEventListener("change", sinkron);
  for (const arah of ["horizontal", "vertical"]) {
    try {
      matchMedia(`(${arah}-viewport-segments: 2)`).addEventListener("change", sinkron);
    } catch {}
  }
}
