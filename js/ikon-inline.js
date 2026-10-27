// Dibuat otomatis oleh scripts/build-ikon.mjs dari ikon/sumber.mjs. Jangan diedit langsung.
// Ikon FUSIONIFY lengkap (tanpa sprite) untuk elemen yang dibuat JavaScript.
export const IKON_INLINE = {
  "chevron-kiri": "<svg class=\"ikon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M14.5 6 8.5 12l6 6\"/></svg>",
  "chevron-kanan": "<svg class=\"ikon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M9.5 6 15.5 12l-6 6\"/></svg>",
  "tutup": "<svg class=\"ikon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 6l12 12\"/><path d=\"M18 6 6 18\"/></svg>",
  "dibaca": "<svg class=\"ikon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2.5 12.8l3.6 3.7L13 8.5\"/><path d=\"M11.5 15.6l1 .9L20 8\"/></svg>",
  "cari": "<svg class=\"ikon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 10.5a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0z\"/><path d=\"M15.4 15.4 20 20\"/><path class=\"t\" d=\"M7 8.4a1.4 1.4 0 1 0 2.8 0a1.4 1.4 0 1 0 -2.8 0z\" style=\"fill:var(--ikon-titik,#539DE9);stroke:none\"/></svg>",
  "segarkan": "<svg class=\"ikon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 11a8 8 0 0 0-14.6-4.4\"/><path d=\"M4.5 3.5v4h4\"/><path d=\"M4 13a8 8 0 0 0 14.6 4.4\"/><path d=\"M19.5 20.5v-4h-4\"/><path class=\"t\" d=\"M10.4 12a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0z\" style=\"fill:var(--ikon-titik,#539DE9);stroke:none\"/></svg>"
};
/** Ikon sebagai string SVG. kelas tambahan opsional, mis. "read". */
export const ikon = (nama, kelas = "") => kelas ? IKON_INLINE[nama].replace('class="ikon"', `class="ikon ${kelas}"`) : IKON_INLINE[nama];
