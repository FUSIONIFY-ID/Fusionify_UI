// FUSIONIFY UI · build-tokens.mjs
// Membaca css/tokens.css (sumber kebenaran) lalu membuat token untuk aplikasi native:
//   tokens/tokens.json                       (format umum, bisa dibaca alat apa pun)
//   tokens/flutter/fusionify_tokens.dart     (Flutter)
//   tokens/swift/FusionifyTokens.swift       (iOS SwiftUI / UIKit)
//   tokens/android/FusionifyTokens.kt        (Android Jetpack Compose)
//   tokens/react-native/fusionify-tokens.ts  (React Native / Expo)
// Jalankan setiap tokens.css berubah:  node scripts/build-tokens.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const css = fs.readFileSync(path.join(root, "css/tokens.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

const block = (re) => {
  const m = css.match(re);
  if (!m) throw new Error("Blok tidak ketemu: " + re);
  const out = {};
  for (const [, k, v] of m[1].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) out[k] = v.trim();
  return out;
};
const light = block(/(?:^|\n):root\s*\{([\s\S]*?)\n\}/);
const darkOver = block(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);
const dark = { ...light, ...darkOver };
// Dua blok gelap (tombol tema dan prefers-color-scheme) wajib identik. CSS tidak bisa berbagi isi
// blok tanpa preprocessor, jadi keduanya ditulis dua kali dan dicek di sini (juga di tests/token.mjs).
const darkMedia = block(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)\s*\{([\s\S]*?)\n\s*\}/);
const beda = [...new Set([...Object.keys(darkOver), ...Object.keys(darkMedia)])].filter((k) => darkOver[k] !== darkMedia[k]);
if (beda.length) throw new Error("Blok gelap tokens.css tidak sama: --" + beda.join(", --"));

const resolve = (vars, v, depth = 0) =>
  depth > 8 ? v : v.replace(/var\(--([\w-]+)\)/g, (_, k) => resolve(vars, vars[k] ?? "", depth + 1));

// Ubah warna CSS ke [r, g, b, a]
const toRGBA = (v) => {
  v = v.trim().toLowerCase();
  let m = v.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = [...h].map((c) => c + c).join("");
    const n = parseInt(h.slice(0, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6), 16) / 255 : 1;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, +a.toFixed(3)];
  }
  m = v.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p[3] ?? 1];
  }
  return null;
};
const hex = ([r, g, b, a]) =>
  "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("") + (a < 1 ? Math.round(a * 255).toString(16).padStart(2, "0") : "");
const argb = ([r, g, b, a]) =>
  "0x" + [Math.round(a * 255), r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
const camel = (k) => k.replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/^(\d)/, "c$1");

// Kumpulkan warna (yang benar-benar berupa warna)
const colorKeys = Object.keys(light).filter((k) => toRGBA(resolve(light, light[k])));
const colors = { light: {}, dark: {} };
for (const k of colorKeys) {
  colors.light[k] = toRGBA(resolve(light, light[k]));
  colors.dark[k] = toRGBA(resolve(dark, dark[k] ?? light[k])) || colors.light[k];
}
// Token yang hanya ada di gelap (mis. --footer-top): di terang transparan, sama seperti fallback di CSS
for (const k of Object.keys(darkOver)) {
  if (!colors.light[k] && toRGBA(resolve(dark, darkOver[k]))) {
    colors.dark[k] = toRGBA(resolve(dark, darkOver[k]));
    colors.light[k] = [0, 0, 0, 0];
  }
}
const keys = Object.keys(colors.light);

const px = (v) => parseFloat(v);
const radius = { s: px(light["r-s"]), m: px(light["r-m"]), l: px(light["r-l"]), pill: 999 };
const fonts = {
  head: { family: "Afacad Flux", file: "AfacadFlux-ExtraBold.ttf", weight: 800, use: "judul", letterSpacingEm: -0.025, lineHeight: 0.98 },
  body: { family: "Sansation", files: { 400: "Sansation-Regular.ttf", 700: "Sansation-Bold.ttf" }, size: 17, lineHeight: 1.6, use: "teks dan UI" },
  hand: { family: "Caveat", files: { 400: "Caveat-Regular.ttf", 700: "Caveat-Bold.ttf" }, use: "suara maskot" },
  num: { family: "Exo 2", files: { 400: "Exo2-Regular.ttf", 600: "Exo2-SemiBold.ttf", 700: "Exo2-Bold.ttf" }, use: "angka (tabular) dan label kecil kapital" },
};
const sticker = {
  borderWidth: 2, borderColor: "edge",
  shadowButton: { x: 0, y: 3, blur: 0, color: "edgeShadow" },
  shadowCard: { x: 0, y: 6, blur: 0, color: "edgeShadow" },
  note: "Bayangan pejal: offset ke bawah tanpa blur. Garis 2px warna edge. Jangan pakai elevation/blur bawaan platform.",
};
const motion = {
  ease: [0.22, 1, 0.36, 1], spring: [0.34, 1.56, 0.64, 1],
  durationMs: { fast: 200, base: 350, slow: 450 },
  note: "Hormati pengaturan kurangi gerakan di HP (iOS Reduce Motion, Android Remove animations).",
};
const touch = { minTarget: 44, navBarHeight: 76, railWidth: 92, appBarHeight: 64, gutter: 16 };

fs.mkdirSync(path.join(root, "tokens/flutter"), { recursive: true });
fs.mkdirSync(path.join(root, "tokens/swift"), { recursive: true });
fs.mkdirSync(path.join(root, "tokens/android"), { recursive: true });
fs.mkdirSync(path.join(root, "tokens/react-native"), { recursive: true });

const header = "Dibuat otomatis dari css/tokens.css oleh scripts/build-tokens.mjs. Jangan diedit manual.";

/* ---------- JSON ---------- */
const json = {
  $description: "Token FUSIONIFY UI. " + header,
  color: { light: Object.fromEntries(keys.map((k) => [camel(k), hex(colors.light[k])])), dark: Object.fromEntries(keys.map((k) => [camel(k), hex(colors.dark[k])])) },
  radius, font: fonts, sticker, motion, touch,
};
fs.writeFileSync(path.join(root, "tokens/tokens.json"), JSON.stringify(json, null, 2) + "\n");

/* ---------- Flutter ---------- */
const dartFields = keys.map((k) => `  final Color ${camel(k)};`).join("\n");
const dartCtor = keys.map((k) => `    required this.${camel(k)},`).join("\n");
const dartInst = (t) => keys.map((k) => `    ${camel(k)}: Color(${argb(colors[t][k])}),`).join("\n");
const dartCopy = keys.map((k) => `${camel(k)}: Color.lerp(${camel(k)}, other.${camel(k)}, t)!`).join(",\n      ");
fs.writeFileSync(path.join(root, "tokens/flutter/fusionify_tokens.dart"), `// FUSIONIFY UI · token untuk Flutter. ${header}
//
// Pakai:
//   MaterialApp(theme: fyTheme(Brightness.light), darkTheme: fyTheme(Brightness.dark), themeMode: ThemeMode.system)
//   final c = Theme.of(context).extension<FyColors>()!;   // c.blue, c.card, c.edge, ...
//
// Font: salin tokens/fonts-ttf/*.ttf ke assets/fonts/ lalu daftarkan di pubspec.yaml (contoh di tokens/README.md).
import 'package:flutter/material.dart';

class FyColors extends ThemeExtension<FyColors> {
${dartFields}

  const FyColors({
${dartCtor}
  });

  static const light = FyColors(
${dartInst("light")}
  );

  static const dark = FyColors(
${dartInst("dark")}
  );

  @override
  FyColors copyWith() => this;

  @override
  FyColors lerp(ThemeExtension<FyColors>? other, double t) {
    if (other is! FyColors) return this;
    return FyColors(
      ${dartCopy},
    );
  }
}

class FyRadius {
  static const double s = ${radius.s};
  static const double m = ${radius.m};
  static const double l = ${radius.l};
  static const double pill = ${radius.pill};
}

class FyFonts {
  static const head = 'Afacad Flux'; // tebal 800, judul
  static const body = 'Sansation';   // 400/700, teks dan UI
  static const hand = 'Caveat';      // suara maskot
  static const numbers = 'Exo 2';    // angka dan label kecil kapital
}

class FyTouch {
  static const double minTarget = ${touch.minTarget};
  static const double navBarHeight = ${touch.navBarHeight};
  static const double railWidth = ${touch.railWidth};
  static const double appBarHeight = ${touch.appBarHeight};
  static const double gutter = ${touch.gutter};
}

/// Gaya stiker FUSIONIFY: garis 2px warna edge + bayangan pejal ke bawah tanpa blur.
BoxDecoration fySticker(FyColors c, {Color? fill, double radius = FyRadius.l, double drop = 6}) => BoxDecoration(
      color: fill ?? c.card,
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(color: c.edge, width: 2),
      boxShadow: [BoxShadow(color: c.edgeShadow, offset: Offset(0, drop), blurRadius: 0)],
    );

const fyEase = Cubic(${motion.ease.join(", ")});
const fySpring = Cubic(${motion.spring.join(", ")});

ThemeData fyTheme(Brightness b) {
  final c = b == Brightness.dark ? FyColors.dark : FyColors.light;
  final scheme = ColorScheme(
    brightness: b,
    primary: c.blue, onPrimary: const Color(0xFFFFFFFF),
    secondary: c.blueLight, onSecondary: const Color(0xFF0B0F1A),
    error: c.danger, onError: b == Brightness.dark ? const Color(0xFF071022) : const Color(0xFFFFFFFF),
    surface: c.paper, onSurface: c.ink,
    surfaceContainerHighest: c.surface2, outline: c.edge, outlineVariant: c.line,
  );
  final base = ThemeData(useMaterial3: true, colorScheme: scheme, scaffoldBackgroundColor: c.paper, fontFamily: FyFonts.body);
  return base.copyWith(
    extensions: [c],
    textTheme: base.textTheme.copyWith(
      displayLarge: TextStyle(fontFamily: FyFonts.head, fontWeight: FontWeight.w800, height: 0.98, letterSpacing: -1.2, color: c.ink),
      headlineMedium: TextStyle(fontFamily: FyFonts.head, fontWeight: FontWeight.w800, height: 1.02, letterSpacing: -0.6, color: c.ink),
      bodyLarge: TextStyle(fontFamily: FyFonts.body, fontSize: 17, height: 1.6, color: c.ink),
      bodyMedium: TextStyle(fontFamily: FyFonts.body, fontSize: 15, height: 1.5, color: c.ink2),
      labelSmall: TextStyle(fontFamily: FyFonts.numbers, fontWeight: FontWeight.w600, letterSpacing: 1.6, color: c.ink3),
    ),
  );
}
`);

/* ---------- Swift ---------- */
const sw = (rgba) => `UIColor(red: ${(rgba[0] / 255).toFixed(4)}, green: ${(rgba[1] / 255).toFixed(4)}, blue: ${(rgba[2] / 255).toFixed(4)}, alpha: ${rgba[3]})`;
fs.writeFileSync(path.join(root, "tokens/swift/FusionifyTokens.swift"), `// FUSIONIFY UI · token untuk iOS (SwiftUI + UIKit). ${header}
//
// Warna otomatis ikut mode terang/gelap sistem:  Text("Halo").foregroundStyle(Fy.Color.ink)
// Gaya stiker:  someView.fySticker()
// Font: tambahkan tokens/fonts-ttf/*.ttf ke target lalu ke Info.plist (UIAppFonts). Nama PostScript: AfacadFlux-ExtraBold, Sansation-Regular, Sansation-Bold, Caveat-Regular, Caveat-Bold, Exo2-Regular, Exo2-SemiBold, Exo2-Bold.
import SwiftUI
import UIKit

private func dyn(_ light: UIColor, _ dark: UIColor) -> UIColor {
    UIColor { $0.userInterfaceStyle == .dark ? dark : light }
}

public enum Fy {
    public enum UI {
${keys.map((k) => `        public static let ${camel(k)} = dyn(${sw(colors.light[k])}, ${sw(colors.dark[k])})`).join("\n")}
    }

    public enum Color {
${keys.map((k) => `        public static let ${camel(k)} = SwiftUI.Color(uiColor: UI.${camel(k)})`).join("\n")}
    }

    public enum Radius {
        public static let s: CGFloat = ${radius.s}
        public static let m: CGFloat = ${radius.m}
        public static let l: CGFloat = ${radius.l}
    }

    public enum Touch {
        public static let minTarget: CGFloat = ${touch.minTarget}
        public static let navBarHeight: CGFloat = ${touch.navBarHeight}
        public static let gutter: CGFloat = ${touch.gutter}
    }

    public enum Font {
        public static func head(_ size: CGFloat) -> SwiftUI.Font { .custom("AfacadFlux-ExtraBold", size: size) }
        public static func body(_ size: CGFloat = 17, bold: Bool = false) -> SwiftUI.Font { .custom(bold ? "Sansation-Bold" : "Sansation-Regular", size: size) }
        public static func hand(_ size: CGFloat, bold: Bool = false) -> SwiftUI.Font { .custom(bold ? "Caveat-Bold" : "Caveat-Regular", size: size) }
        public static func num(_ size: CGFloat, weight: Int = 600) -> SwiftUI.Font {
            .custom(weight >= 700 ? "Exo2-Bold" : weight >= 600 ? "Exo2-SemiBold" : "Exo2-Regular", size: size).monospacedDigit()
        }
    }

    public static let ease = Animation.timingCurve(${motion.ease.join(", ")}, duration: 0.35)
    public static let spring = Animation.timingCurve(${motion.spring.join(", ")}, duration: 0.45)
}

public struct FyStickerModifier: ViewModifier {
    var fill: SwiftUI.Color = Fy.Color.card
    var radius: CGFloat = Fy.Radius.l
    var drop: CGFloat = 6
    public func body(content: Content) -> some View {
        content
            .background(RoundedRectangle(cornerRadius: radius).fill(fill))
            .overlay(RoundedRectangle(cornerRadius: radius).stroke(Fy.Color.edge, lineWidth: 2))
            .background(RoundedRectangle(cornerRadius: radius).fill(Fy.Color.edgeShadow).offset(y: drop))
    }
}

public extension View {
    /// Gaya stiker FUSIONIFY: garis 2px + bayangan pejal ke bawah tanpa blur.
    func fySticker(fill: SwiftUI.Color = Fy.Color.card, radius: CGFloat = Fy.Radius.l, drop: CGFloat = 6) -> some View {
        modifier(FyStickerModifier(fill: fill, radius: radius, drop: drop))
    }
}
`);

/* ---------- Android Compose ---------- */
const kt = (rgba) => `Color(${argb(rgba)})`;
fs.writeFileSync(path.join(root, "tokens/android/FusionifyTokens.kt"), `// FUSIONIFY UI · token untuk Android Jetpack Compose. ${header}
//
// Pakai:  FyTheme { ... }  lalu  FyTheme.colors.blue / LocalFyColors.current.card
// Font: salin tokens/fonts-ttf/*.ttf ke res/font/ dengan nama huruf kecil (afacadflux_extrabold.ttf, sansation_regular.ttf, ...).
package id.fusionify.ui

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Immutable
data class FyColors(
${keys.map((k) => `    val ${camel(k)}: Color,`).join("\n")}
)

val FyLight = FyColors(
${keys.map((k) => `    ${camel(k)} = ${kt(colors.light[k])},`).join("\n")}
)

val FyDark = FyColors(
${keys.map((k) => `    ${camel(k)} = ${kt(colors.dark[k])},`).join("\n")}
)

val LocalFyColors = staticCompositionLocalOf { FyLight }

object FyRadius { val s = ${radius.s}.dp; val m = ${radius.m}.dp; val l = ${radius.l}.dp }
object FyTouch { val minTarget = ${touch.minTarget}.dp; val navBarHeight = ${touch.navBarHeight}.dp; val gutter = ${touch.gutter}.dp }
object FySticker { val border = 2.dp; val dropButton = 3.dp; val dropCard = 6.dp } // bayangan pejal: offset ke bawah tanpa blur

@Composable
fun FyTheme(dark: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
    val c = if (dark) FyDark else FyLight
    val scheme = if (dark)
        darkColorScheme(primary = c.blue, onPrimary = Color.White, background = c.paper, onBackground = c.ink, surface = c.card, onSurface = c.ink, outline = c.edge, error = c.danger)
    else
        lightColorScheme(primary = c.blue, onPrimary = Color.White, background = c.paper, onBackground = c.ink, surface = c.card, onSurface = c.ink, outline = c.edge, error = c.danger)
    CompositionLocalProvider(LocalFyColors provides c) { MaterialTheme(colorScheme = scheme, content = content) }
}

object FyTheme { val colors: FyColors @Composable get() = LocalFyColors.current }
`);

/* ---------- React Native ---------- */
fs.writeFileSync(path.join(root, "tokens/react-native/fusionify-tokens.ts"), `// FUSIONIFY UI · token untuk React Native / Expo. ${header}
//
//   import { useColorScheme } from "react-native";
//   import { fy, sticker } from "./fusionify-tokens";
//   const c = fy.color[useColorScheme() === "dark" ? "dark" : "light"];
//   <View style={[sticker(c), { padding: 18 }]} />
//
// Font (Expo): useFonts({ "AfacadFlux-ExtraBold": require("./fonts/AfacadFlux-ExtraBold.ttf"), ... }) dari tokens/fonts-ttf/.
export const fy = ${JSON.stringify({ color: json.color, radius, touch, motion }, null, 2)} as const;

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
`);

/* ---------- Android XML (aplikasi Kotlin/Java dengan View/XML, mis. aplikasi VPN) ---------- */
const snake = (k) => "fy_" + k.replace(/-/g, "_");
const androidHex = ([r, g, b, a]) =>
  "#" + (a < 1 ? Math.round(a * 255).toString(16).padStart(2, "0").toUpperCase() : "") + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
const resDir = path.join(root, "tokens/android/res");
for (const d of ["values", "values-night", "font", "drawable"]) fs.mkdirSync(path.join(resDir, d), { recursive: true });
const colorsXml = (t) => `<?xml version="1.0" encoding="utf-8"?>
<!-- FUSIONIFY UI · warna ${t === "light" ? "terang" : "gelap"}. ${header}
     Android otomatis memakai values-night/ saat mode gelap. Kotlin: R.color.fy_blue · Java: R.color.fy_blue · XML: @color/fy_blue -->
<resources>
${keys.map((k) => `    <color name="${snake(k)}">${androidHex(colors[t][k])}</color>`).join("\n")}
</resources>
`;
fs.writeFileSync(path.join(resDir, "values/fy_colors.xml"), colorsXml("light"));
fs.writeFileSync(path.join(resDir, "values-night/fy_colors.xml"), colorsXml("dark"));
fs.writeFileSync(path.join(resDir, "values/fy_dimens.xml"), `<?xml version="1.0" encoding="utf-8"?>
<!-- FUSIONIFY UI · ukuran. ${header} -->
<resources>
    <dimen name="fy_radius_s">${radius.s}dp</dimen>
    <dimen name="fy_radius_m">${radius.m}dp</dimen>
    <dimen name="fy_radius_l">${radius.l}dp</dimen>
    <dimen name="fy_border">2dp</dimen>
    <dimen name="fy_drop_button">3dp</dimen>
    <dimen name="fy_drop_card">6dp</dimen>
    <dimen name="fy_touch_min">48dp</dimen>
    <dimen name="fy_gutter">${touch.gutter}dp</dimen>
    <dimen name="fy_text_body">17sp</dimen>
</resources>
`);
// Huruf: nama file Android wajib huruf kecil + garis bawah
const fontMap = {
  "AfacadFlux-ExtraBold.ttf": "afacadflux_extrabold.ttf", "Sansation-Regular.ttf": "sansation_regular.ttf", "Sansation-Bold.ttf": "sansation_bold.ttf",
  "Caveat-Regular.ttf": "caveat_regular.ttf", "Caveat-Bold.ttf": "caveat_bold.ttf",
  "Exo2-Regular.ttf": "exo2_regular.ttf", "Exo2-SemiBold.ttf": "exo2_semibold.ttf", "Exo2-Bold.ttf": "exo2_bold.ttf",
};
for (const [src, dst] of Object.entries(fontMap)) fs.copyFileSync(path.join(root, "tokens/fonts-ttf", src), path.join(resDir, "font", dst));
const family = (name, items) => fs.writeFileSync(path.join(resDir, "font", name + ".xml"), `<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:app="http://schemas.android.com/apk/res-auto">
${items.map(([w, f]) => `    <font app:fontStyle="normal" app:fontWeight="${w}" app:font="@font/${f}" />`).join("\n")}
</font-family>
`);
family("fy_head", [[800, "afacadflux_extrabold"]]);
family("fy_body", [[400, "sansation_regular"], [700, "sansation_bold"]]);
family("fy_hand", [[400, "caveat_regular"], [700, "caveat_bold"]]);
family("fy_num", [[400, "exo2_regular"], [600, "exo2_semibold"], [700, "exo2_bold"]]);
// Kartu dan tombol bergaya stiker: dua lapis (bayangan pejal di bawah, kartu bergaris di atas). Tanpa elevation.
const stickerDrawable = (name, fill, drop, r) => fs.writeFileSync(path.join(resDir, "drawable", name + ".xml"), `<?xml version="1.0" encoding="utf-8"?>
<!-- FUSIONIFY UI · ${name}: garis 2dp + bayangan pejal ${drop}dp ke bawah tanpa blur. Pakai sebagai android:background. -->
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:top="${drop}dp">
        <shape android:shape="rectangle"><corners android:radius="${r}dp" /><solid android:color="@color/fy_edge_shadow" /></shape>
    </item>
    <item android:bottom="${drop}dp">
        <shape android:shape="rectangle"><corners android:radius="${r}dp" /><solid android:color="@color/${fill}" /><stroke android:width="2dp" android:color="@color/fy_edge" /></shape>
    </item>
</layer-list>
`);
stickerDrawable("fy_sticker_card", "fy_card", 6, radius.l);
stickerDrawable("fy_sticker_button", "fy_blue", 3, 999);
stickerDrawable("fy_sticker_button_ghost", "fy_card", 3, 999);
stickerDrawable("fy_sticker_field", "fy_field", 3, radius.m);
fs.writeFileSync(path.join(resDir, "values/fy_themes.xml"), `<?xml version="1.0" encoding="utf-8"?>
<!-- FUSIONIFY UI · tema Material 3 DayNight (otomatis terang/gelap). ${header}
     Butuh: implementation("com.google.android.material:material:1.12.0")
     Pakai di AndroidManifest.xml: android:theme="@style/Theme.Fusionify" -->
<resources>
    <style name="Theme.Fusionify" parent="Theme.Material3.DayNight.NoActionBar">
        <item name="colorPrimary">@color/fy_blue</item>
        <item name="colorOnPrimary">#FFFFFF</item>
        <item name="colorSecondary">@color/fy_blue_light</item>
        <item name="colorError">@color/fy_danger</item>
        <item name="android:colorBackground">@color/fy_paper</item>
        <item name="colorSurface">@color/fy_card</item>
        <item name="colorOnSurface">@color/fy_ink</item>
        <item name="colorOnSurfaceVariant">@color/fy_ink_2</item>
        <item name="colorOutline">@color/fy_edge</item>
        <item name="colorOutlineVariant">@color/fy_line</item>
        <item name="android:textColorPrimary">@color/fy_ink</item>
        <item name="android:textColorSecondary">@color/fy_ink_2</item>
        <item name="android:textColorHint">@color/fy_placeholder</item>
        <item name="android:windowBackground">@color/fy_paper</item>
        <item name="android:statusBarColor">@color/fy_paper</item>
        <item name="android:navigationBarColor">@color/fy_card</item>
        <item name="android:fontFamily">@font/fy_body</item>
        <item name="fontFamily">@font/fy_body</item>
    </style>

    <style name="Fy.Title" parent="">
        <item name="android:fontFamily">@font/fy_head</item>
        <item name="android:textColor">@color/fy_ink</item>
        <item name="android:letterSpacing">-0.025</item>
    </style>
    <style name="Fy.Body" parent="">
        <item name="android:fontFamily">@font/fy_body</item>
        <item name="android:textSize">@dimen/fy_text_body</item>
        <item name="android:textColor">@color/fy_ink</item>
    </style>
    <style name="Fy.Label" parent="">
        <item name="android:fontFamily">@font/fy_num</item>
        <item name="android:textAllCaps">true</item>
        <item name="android:letterSpacing">0.12</item>
        <item name="android:textColor">@color/fy_ink_3</item>
    </style>
    <style name="Fy.Button" parent="">
        <item name="android:background">@drawable/fy_sticker_button</item>
        <item name="android:textColor">#FFFFFF</item>
        <item name="android:fontFamily">@font/fy_body</item>
        <item name="android:textStyle">bold</item>
        <item name="android:minHeight">@dimen/fy_touch_min</item>
        <item name="android:paddingStart">22dp</item>
        <item name="android:paddingEnd">22dp</item>
        <item name="android:paddingBottom">3dp</item>
        <item name="android:stateListAnimator">@null</item>
        <item name="android:elevation">0dp</item>
    </style>
    <style name="Fy.Card" parent="">
        <item name="android:background">@drawable/fy_sticker_card</item>
        <item name="android:padding">18dp</item>
        <item name="android:paddingBottom">24dp</item>
        <item name="android:elevation">0dp</item>
    </style>
</resources>
`);

console.log("Token dibuat:", keys.length, "warna x 2 tema");
