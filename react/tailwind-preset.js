// FUSIONIFY UI · preset Tailwind CSS v3 dari token kit.
//   // tailwind.config.js / .ts
//   import fusionify from "./fusionify-ui/react/tailwind-preset.js";
//   export default { presets: [fusionify], content: ["./src/**/*.{ts,tsx}"] };
//
// Warna memakai variabel CSS dari css/tokens.css, jadi ikut mode gelap kit dengan sendirinya.
// Wajib memuat css/tokens.css (atau css/fusionify.css) di aplikasi.
// Catatan: karena berbasis var(), modifier opasitas (bg-blue/50) tidak berlaku untuk warna kit.
// Jangan menambah warna hex sendiri di config proyek; tambahkan dulu ke css/tokens.css.

const v = (name) => `var(--${name})`;

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        blue: { DEFAULT: v("blue"), deep: v("blue-deep"), light: v("blue-light") },
        ink: { DEFAULT: v("ink"), 2: v("ink-2"), 3: v("ink-3") },
        surface: { DEFAULT: v("surface"), 2: v("surface-2") },
        paper: v("paper"),
        line: v("line"),
        night: v("night"),
        card: v("card"),
        field: v("field"),
        edge: { DEFAULT: v("edge"), shadow: v("edge-shadow") },
        "text-blue": { DEFAULT: v("text-blue"), deep: v("text-blue-deep") },
        inverse: { bg: v("inverse-bg"), fg: v("inverse-fg") },
        danger: { DEFAULT: v("danger"), bg: v("danger-bg") },
        go: { DEFAULT: v("go"), bg: v("go-bg") },
        beta: { DEFAULT: v("beta"), bg: v("beta-bg") },
        wip: { DEFAULT: v("wip"), bg: v("wip-bg") },
        plan: { DEFAULT: v("plan"), bg: v("plan-bg") },
        eos: { DEFAULT: v("eos"), bg: v("eos-bg") },
      },
      fontFamily: {
        head: v("f-head"),
        body: v("f-body"),
        num: v("f-num"),
        hand: v("f-hand"),
      },
      borderRadius: { s: v("r-s"), m: v("r-m"), l: v("r-l"), pill: v("r-pill") },
      borderWidth: { edge: "2px" },
      boxShadow: { pop: v("shadow-pop"), sticker: v("shadow-sticker"), soft: v("shadow") },
      transitionTimingFunction: { fy: v("ease"), spring: v("spring") },
      maxWidth: { wrap: "1240px" },
      letterSpacing: { judul: "-0.025em", kicker: "0.16em" },
    },
  },
};
