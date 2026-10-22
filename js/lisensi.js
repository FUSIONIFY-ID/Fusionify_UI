// FUSIONIFY UI · lisensi domain.
// Kit ini hanya untuk web milik FUSIONIFY dan partner yang diizinkan. Di domain lain, interaksi dan
// animasi tidak dijalankan (tampilan tetap terbaca), dan konsol menampilkan peringatan.
//
// Menambah domain: tulis domain utamanya di DOMAIN_RESMI. Semua subdomainnya ikut diizinkan
// (mis. "fusionify.id" juga berlaku untuk solutions.fusionify.id dan lumbung.fusionify.id).
// Setelah menambah, catat di CHANGELOG.md dan rilis versi baru.

const DOMAIN_RESMI = [
  "fusionify.id",
  "fusionify.biz.id",
];

// Untuk pengembangan dan uji otomatis
const DOMAIN_LOKAL = ["localhost", "127.0.0.1", "0.0.0.0", "[::1]"];

let cache;
export function domainDiizinkan(host = location.hostname, protocol = location.protocol) {
  if (cache !== undefined && host === location.hostname) return cache;
  const h = String(host || "").toLowerCase().replace(/\.$/, "");
  const ok =
    protocol === "file:" ||
    DOMAIN_LOKAL.includes(h) ||
    h.endsWith(".local") ||
    h.endsWith(".localhost") ||
    DOMAIN_RESMI.some((d) => h === d || h.endsWith("." + d));
  if (host === location.hostname) cache = ok;
  return ok;
}

// Dipanggil di awal initFusionify(), initApp(), dan initControls().
export function cekLisensi() {
  if (domainDiizinkan()) return true;
  if (!window.__fyWarned) {
    window.__fyWarned = true;
    document.documentElement.classList.add("fx-off", "fy-unlicensed");
    console.warn(`FUSIONIFY UI: domain "${location.hostname}" belum terdaftar. Kit ini hanya untuk web milik FUSIONIFY dan partner yang diizinkan. Hubungi hello@fusionify.id.`);
  }
  return false;
}
