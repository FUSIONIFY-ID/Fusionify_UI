// FUSIONIFY UI · token untuk React Native / Expo. Dibuat otomatis dari css/tokens.css oleh scripts/build-tokens.mjs. Jangan diedit manual.
//
//   import { useColorScheme } from "react-native";
//   import { fy, sticker } from "./fusionify-tokens";
//   const c = fy.color[useColorScheme() === "dark" ? "dark" : "light"];
//   <View style={[sticker(c), { padding: 18 }]} />
//
// Font (Expo): useFonts({ "AfacadFlux-ExtraBold": require("./fonts/AfacadFlux-ExtraBold.ttf"), ... }) dari tokens/fonts-ttf/.
export const fy = {
  "color": {
    "light": {
      "blue": "#0d6cd7",
      "blueDeep": "#0261cd",
      "blueLight": "#539de9",
      "ink": "#0b0f1a",
      "ink2": "#3a4458",
      "ink3": "#566175",
      "surface": "#eaf4ff",
      "paper": "#f7fbff",
      "white": "#ffffff",
      "line": "#d3e4f7",
      "night": "#071022",
      "go": "#157f3b",
      "goBg": "#e3f6e9",
      "beta": "#9a5b00",
      "betaBg": "#fff2d8",
      "wip": "#8a4a00",
      "wipBg": "#ffe9d6",
      "plan": "#0261cd",
      "planBg": "#eef7ff",
      "eos": "#5b6475",
      "eosBg": "#eceff4",
      "card": "#ffffff",
      "field": "#ffffff",
      "surface2": "#dcecff",
      "edge": "#0b0f1a",
      "edgeShadow": "#0b0f1a",
      "textBlue": "#0d6cd7",
      "textBlueDeep": "#0261cd",
      "inverseBg": "#0b0f1a",
      "inverseFg": "#ffffff",
      "inverseAccent": "#8cc0ff",
      "navGlass": "#ffffffd1",
      "heroGlow": "#dcedff",
      "sealTint": "#d8eaff",
      "danger": "#b4232c",
      "dangerBg": "#fde8ea",
      "placeholder": "#707a8c",
      "footerTop": "#00000000"
    },
    "dark": {
      "blue": "#0d6cd7",
      "blueDeep": "#0261cd",
      "blueLight": "#539de9",
      "ink": "#eaf3ff",
      "ink2": "#c3d4ea",
      "ink3": "#9db2cf",
      "surface": "#0c1a33",
      "paper": "#071022",
      "white": "#0f2040",
      "line": "#1f3459",
      "night": "#071022",
      "go": "#7fe0a6",
      "goBg": "#0f3324",
      "beta": "#ffd27a",
      "betaBg": "#3a2a08",
      "wip": "#ffb98a",
      "wipBg": "#3c220e",
      "plan": "#a9d0ff",
      "planBg": "#10264a",
      "eos": "#b5c0d0",
      "eosBg": "#1c2638",
      "card": "#10203f",
      "field": "#0b1830",
      "surface2": "#17305a",
      "edge": "#2e5592",
      "edgeShadow": "#02060f",
      "textBlue": "#8cc0ff",
      "textBlueDeep": "#a9d0ff",
      "inverseBg": "#eaf3ff",
      "inverseFg": "#071022",
      "inverseAccent": "#0261cd",
      "navGlass": "#0a162cd1",
      "heroGlow": "#0f2a55",
      "sealTint": "#15315c",
      "danger": "#ff9ba1",
      "dangerBg": "#3d1418",
      "placeholder": "#8597b3",
      "footerTop": "#1f3459"
    }
  },
  "radius": {
    "s": 10,
    "m": 18,
    "l": 28,
    "pill": 999
  },
  "touch": {
    "minTarget": 44,
    "navBarHeight": 76,
    "railWidth": 92,
    "appBarHeight": 64,
    "gutter": 16
  },
  "motion": {
    "ease": [
      0.22,
      1,
      0.36,
      1
    ],
    "spring": [
      0.34,
      1.56,
      0.64,
      1
    ],
    "durationMs": {
      "fast": 200,
      "base": 350,
      "slow": 450
    },
    "note": "Hormati pengaturan kurangi gerakan di HP (iOS Reduce Motion, Android Remove animations)."
  }
} as const;

export type FyPalette = typeof fy.color.light;

export const font = {
  head: "AfacadFlux-ExtraBold",
  body: "Sansation-Regular",
  bodyBold: "Sansation-Bold",
  hand: "Caveat-Regular",
  handBold: "Caveat-Bold",
  num: "Exo2-SemiBold",
  numBold: "Exo2-Bold",
} as const;

/** Gaya stiker FUSIONIFY. Bayangan pejal dibuat dengan shadow tanpa blur (iOS) dan dibantu borderBottomWidth (Android). */
export const sticker = (c: FyPalette, drop = 6, radius = fy.radius.l) => ({
  backgroundColor: c.card,
  borderRadius: radius,
  borderWidth: 2,
  borderColor: c.edge,
  shadowColor: c.edgeShadow,
  shadowOffset: { width: 0, height: drop },
  shadowOpacity: 1,
  shadowRadius: 0,
  borderBottomWidth: 2 + (drop > 3 ? 2 : 0),
});
