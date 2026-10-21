// FUSIONIFY UI · seal.js
// Bentuk segel bergelombang khas FUSIONIFY (12 lekukan), sebagai path SVG.
// Contoh: <svg viewBox="0 0 100 100"><path d={seal()} /></svg>
//
// cx, cy  : titik tengah
// r       : jari-jari rata-rata
// amp     : tinggi gelombang (3.2 pada r 44 = proporsi resmi)
// waves   : jumlah lekukan (resmi: 12)
// steps   : kehalusan garis

export function seal(cx = 50, cy = 50, r = 44, amp = 3.2, waves = 12, steps = 160) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rr = r + amp * Math.sin(waves * a);
    d += (i ? "L" : "M") + (cx + rr * Math.cos(a)).toFixed(3) + " " + (cy + rr * Math.sin(a)).toFixed(3);
  }
  return d + "Z";
}

// Path resmi siap pakai untuk viewBox 0 0 100 100
export const SEAL_PATH = seal(50, 50, 44, 3.2, 12);
