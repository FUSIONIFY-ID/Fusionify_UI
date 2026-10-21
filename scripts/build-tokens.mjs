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

console.log("Token dibuat:", keys.length, "warna x 2 tema");
