// FUSIONIFY UI · token untuk Flutter. Dibuat otomatis dari css/tokens.css oleh scripts/build-tokens.mjs. Jangan diedit manual.
//
// Pakai:
//   MaterialApp(theme: fyTheme(Brightness.light), darkTheme: fyTheme(Brightness.dark), themeMode: ThemeMode.system)
//   final c = Theme.of(context).extension<FyColors>()!;   // c.blue, c.card, c.edge, ...
//
// Font: salin tokens/fonts-ttf/*.ttf ke assets/fonts/ lalu daftarkan di pubspec.yaml (contoh di tokens/README.md).
import 'package:flutter/material.dart';

class FyColors extends ThemeExtension<FyColors> {
  final Color blue;
  final Color blueDeep;
  final Color blueLight;
  final Color ink;
  final Color ink2;
  final Color ink3;
  final Color surface;
  final Color paper;
  final Color white;
  final Color line;
  final Color night;
  final Color go;
  final Color goBg;
  final Color beta;
  final Color betaBg;
  final Color wip;
  final Color wipBg;
  final Color plan;
  final Color planBg;
  final Color eos;
  final Color eosBg;
  final Color card;
  final Color field;
  final Color surface2;
  final Color edge;
  final Color edgeShadow;
  final Color textBlue;
  final Color textBlueDeep;
  final Color inverseBg;
  final Color inverseFg;
  final Color inverseAccent;
  final Color navGlass;
  final Color heroGlow;
  final Color sealTint;
  final Color danger;
  final Color dangerBg;
  final Color placeholder;
  final Color bintang;
  final Color onDark;
  final Color onDark2;
  final Color dangerFill;
  final Color warnFill;
  final Color online;
  final Color nightInk;
  final Color nightInk2;
  final Color nightInk3;
  final Color nightLink;
  final Color nightLine;
  final Color nightLine2;
  final Color codeFg;
  final Color codeMuted;
  final Color codeLine;
  final Color codeEdge;
  final Color codeBtn;
  final Color codeBtnHover;
  final Color codeStr;
  final Color codeKey;
  final Color codeNum;
  final Color footerTop;

  const FyColors({
    required this.blue,
    required this.blueDeep,
    required this.blueLight,
    required this.ink,
    required this.ink2,
    required this.ink3,
    required this.surface,
    required this.paper,
    required this.white,
    required this.line,
    required this.night,
    required this.go,
    required this.goBg,
    required this.beta,
    required this.betaBg,
    required this.wip,
    required this.wipBg,
    required this.plan,
    required this.planBg,
    required this.eos,
    required this.eosBg,
    required this.card,
    required this.field,
    required this.surface2,
    required this.edge,
    required this.edgeShadow,
    required this.textBlue,
    required this.textBlueDeep,
    required this.inverseBg,
    required this.inverseFg,
    required this.inverseAccent,
    required this.navGlass,
    required this.heroGlow,
    required this.sealTint,
    required this.danger,
    required this.dangerBg,
    required this.placeholder,
    required this.bintang,
    required this.onDark,
    required this.onDark2,
    required this.dangerFill,
    required this.warnFill,
    required this.online,
    required this.nightInk,
    required this.nightInk2,
    required this.nightInk3,
    required this.nightLink,
    required this.nightLine,
    required this.nightLine2,
    required this.codeFg,
    required this.codeMuted,
    required this.codeLine,
    required this.codeEdge,
    required this.codeBtn,
    required this.codeBtnHover,
    required this.codeStr,
    required this.codeKey,
    required this.codeNum,
    required this.footerTop,
  });

  static const light = FyColors(
    blue: Color(0xFF0D6CD7),
    blueDeep: Color(0xFF0261CD),
    blueLight: Color(0xFF539DE9),
    ink: Color(0xFF0B0F1A),
    ink2: Color(0xFF3A4458),
    ink3: Color(0xFF566175),
    surface: Color(0xFFEAF4FF),
    paper: Color(0xFFF7FBFF),
    white: Color(0xFFFFFFFF),
    line: Color(0xFFD3E4F7),
    night: Color(0xFF071022),
    go: Color(0xFF157F3B),
    goBg: Color(0xFFE3F6E9),
    beta: Color(0xFF9A5B00),
    betaBg: Color(0xFFFFF2D8),
    wip: Color(0xFF8A4A00),
    wipBg: Color(0xFFFFE9D6),
    plan: Color(0xFF0261CD),
    planBg: Color(0xFFEEF7FF),
    eos: Color(0xFF5B6475),
    eosBg: Color(0xFFECEFF4),
    card: Color(0xFFFFFFFF),
    field: Color(0xFFFFFFFF),
    surface2: Color(0xFFDCECFF),
    edge: Color(0xFF0B0F1A),
    edgeShadow: Color(0xFF0B0F1A),
    textBlue: Color(0xFF0D6CD7),
    textBlueDeep: Color(0xFF0261CD),
    inverseBg: Color(0xFF0B0F1A),
    inverseFg: Color(0xFFFFFFFF),
    inverseAccent: Color(0xFF8CC0FF),
    navGlass: Color(0xD1FFFFFF),
    heroGlow: Color(0xFFDCEDFF),
    sealTint: Color(0xFFD8EAFF),
    danger: Color(0xFFB4232C),
    dangerBg: Color(0xFFFDE8EA),
    placeholder: Color(0xFF707A8C),
    bintang: Color(0xFFF0A800),
    onDark: Color(0xFFFFFFFF),
    onDark2: Color(0xFFF2F8FF),
    dangerFill: Color(0xFFC4323A),
    warnFill: Color(0xFFE8A33D),
    online: Color(0xFF2FBF63),
    nightInk: Color(0xFFDBE9FB),
    nightInk2: Color(0xFF9FB3CD),
    nightInk3: Color(0xFF8296B2),
    nightLink: Color(0xFFB9CBE3),
    nightLine: Color(0xFF1D2B45),
    nightLine2: Color(0xFF2A3B5C),
    codeFg: Color(0xFFEAF3FF),
    codeMuted: Color(0xFF9DB2CF),
    codeLine: Color(0xFF1F3459),
    codeEdge: Color(0xFF2E5592),
    codeBtn: Color(0xFF10203F),
    codeBtnHover: Color(0xFF17305A),
    codeStr: Color(0xFF7FE0A6),
    codeKey: Color(0xFF8CC0FF),
    codeNum: Color(0xFFFFD27A),
    footerTop: Color(0x00000000),
  );

  static const dark = FyColors(
    blue: Color(0xFF0D6CD7),
    blueDeep: Color(0xFF0261CD),
    blueLight: Color(0xFF539DE9),
    ink: Color(0xFFEAF3FF),
    ink2: Color(0xFFC3D4EA),
    ink3: Color(0xFF9DB2CF),
    surface: Color(0xFF0C1A33),
    paper: Color(0xFF071022),
    white: Color(0xFF0F2040),
    line: Color(0xFF1F3459),
    night: Color(0xFF071022),
    go: Color(0xFF7FE0A6),
    goBg: Color(0xFF0F3324),
    beta: Color(0xFFFFD27A),
    betaBg: Color(0xFF3A2A08),
    wip: Color(0xFFFFB98A),
    wipBg: Color(0xFF3C220E),
    plan: Color(0xFFA9D0FF),
    planBg: Color(0xFF10264A),
    eos: Color(0xFFB5C0D0),
    eosBg: Color(0xFF1C2638),
    card: Color(0xFF10203F),
    field: Color(0xFF0B1830),
    surface2: Color(0xFF17305A),
    edge: Color(0xFF2E5592),
    edgeShadow: Color(0xFF02060F),
    textBlue: Color(0xFF8CC0FF),
    textBlueDeep: Color(0xFFA9D0FF),
    inverseBg: Color(0xFFEAF3FF),
    inverseFg: Color(0xFF071022),
    inverseAccent: Color(0xFF0261CD),
    navGlass: Color(0xD10A162C),
    heroGlow: Color(0xFF0F2A55),
    sealTint: Color(0xFF15315C),
    danger: Color(0xFFFF9BA1),
    dangerBg: Color(0xFF3D1418),
    placeholder: Color(0xFF8597B3),
    bintang: Color(0xFFFFC93D),
    onDark: Color(0xFFFFFFFF),
    onDark2: Color(0xFFF2F8FF),
    dangerFill: Color(0xFFC4323A),
    warnFill: Color(0xFFE8A33D),
    online: Color(0xFF3FD277),
    nightInk: Color(0xFFDBE9FB),
    nightInk2: Color(0xFF9FB3CD),
    nightInk3: Color(0xFF8296B2),
    nightLink: Color(0xFFB9CBE3),
    nightLine: Color(0xFF1D2B45),
    nightLine2: Color(0xFF2A3B5C),
    codeFg: Color(0xFFEAF3FF),
    codeMuted: Color(0xFF9DB2CF),
    codeLine: Color(0xFF1F3459),
    codeEdge: Color(0xFF2E5592),
    codeBtn: Color(0xFF10203F),
    codeBtnHover: Color(0xFF17305A),
    codeStr: Color(0xFF7FE0A6),
    codeKey: Color(0xFF8CC0FF),
    codeNum: Color(0xFFFFD27A),
    footerTop: Color(0xFF1F3459),
  );

  @override
  FyColors copyWith() => this;

  @override
  FyColors lerp(ThemeExtension<FyColors>? other, double t) {
    if (other is! FyColors) return this;
    return FyColors(
      blue: Color.lerp(blue, other.blue, t)!,
      blueDeep: Color.lerp(blueDeep, other.blueDeep, t)!,
      blueLight: Color.lerp(blueLight, other.blueLight, t)!,
      ink: Color.lerp(ink, other.ink, t)!,
      ink2: Color.lerp(ink2, other.ink2, t)!,
      ink3: Color.lerp(ink3, other.ink3, t)!,
      surface: Color.lerp(surface, other.surface, t)!,
      paper: Color.lerp(paper, other.paper, t)!,
      white: Color.lerp(white, other.white, t)!,
      line: Color.lerp(line, other.line, t)!,
      night: Color.lerp(night, other.night, t)!,
      go: Color.lerp(go, other.go, t)!,
      goBg: Color.lerp(goBg, other.goBg, t)!,
      beta: Color.lerp(beta, other.beta, t)!,
      betaBg: Color.lerp(betaBg, other.betaBg, t)!,
      wip: Color.lerp(wip, other.wip, t)!,
      wipBg: Color.lerp(wipBg, other.wipBg, t)!,
      plan: Color.lerp(plan, other.plan, t)!,
      planBg: Color.lerp(planBg, other.planBg, t)!,
      eos: Color.lerp(eos, other.eos, t)!,
      eosBg: Color.lerp(eosBg, other.eosBg, t)!,
      card: Color.lerp(card, other.card, t)!,
      field: Color.lerp(field, other.field, t)!,
      surface2: Color.lerp(surface2, other.surface2, t)!,
      edge: Color.lerp(edge, other.edge, t)!,
      edgeShadow: Color.lerp(edgeShadow, other.edgeShadow, t)!,
      textBlue: Color.lerp(textBlue, other.textBlue, t)!,
      textBlueDeep: Color.lerp(textBlueDeep, other.textBlueDeep, t)!,
      inverseBg: Color.lerp(inverseBg, other.inverseBg, t)!,
      inverseFg: Color.lerp(inverseFg, other.inverseFg, t)!,
      inverseAccent: Color.lerp(inverseAccent, other.inverseAccent, t)!,
      navGlass: Color.lerp(navGlass, other.navGlass, t)!,
      heroGlow: Color.lerp(heroGlow, other.heroGlow, t)!,
      sealTint: Color.lerp(sealTint, other.sealTint, t)!,
      danger: Color.lerp(danger, other.danger, t)!,
      dangerBg: Color.lerp(dangerBg, other.dangerBg, t)!,
      placeholder: Color.lerp(placeholder, other.placeholder, t)!,
      bintang: Color.lerp(bintang, other.bintang, t)!,
      onDark: Color.lerp(onDark, other.onDark, t)!,
      onDark2: Color.lerp(onDark2, other.onDark2, t)!,
      dangerFill: Color.lerp(dangerFill, other.dangerFill, t)!,
      warnFill: Color.lerp(warnFill, other.warnFill, t)!,
      online: Color.lerp(online, other.online, t)!,
      nightInk: Color.lerp(nightInk, other.nightInk, t)!,
      nightInk2: Color.lerp(nightInk2, other.nightInk2, t)!,
      nightInk3: Color.lerp(nightInk3, other.nightInk3, t)!,
      nightLink: Color.lerp(nightLink, other.nightLink, t)!,
      nightLine: Color.lerp(nightLine, other.nightLine, t)!,
      nightLine2: Color.lerp(nightLine2, other.nightLine2, t)!,
      codeFg: Color.lerp(codeFg, other.codeFg, t)!,
      codeMuted: Color.lerp(codeMuted, other.codeMuted, t)!,
      codeLine: Color.lerp(codeLine, other.codeLine, t)!,
      codeEdge: Color.lerp(codeEdge, other.codeEdge, t)!,
      codeBtn: Color.lerp(codeBtn, other.codeBtn, t)!,
      codeBtnHover: Color.lerp(codeBtnHover, other.codeBtnHover, t)!,
      codeStr: Color.lerp(codeStr, other.codeStr, t)!,
      codeKey: Color.lerp(codeKey, other.codeKey, t)!,
      codeNum: Color.lerp(codeNum, other.codeNum, t)!,
      footerTop: Color.lerp(footerTop, other.footerTop, t)!,
    );
  }
}

class FyRadius {
  static const double s = 10;
  static const double m = 18;
  static const double l = 28;
  static const double pill = 999;
}

class FyFonts {
  static const head = 'Afacad Flux'; // tebal 800, judul
  static const body = 'Sansation';   // 400/700, teks dan UI
  static const hand = 'Caveat';      // suara maskot
  static const numbers = 'Exo 2';    // angka dan label kecil kapital
}

class FyTouch {
  static const double minTarget = 44;
  static const double navBarHeight = 76;
  static const double railWidth = 92;
  static const double appBarHeight = 64;
  static const double gutter = 16;
}

/// Gaya stiker FUSIONIFY: garis 2px warna edge + bayangan pejal ke bawah tanpa blur.
BoxDecoration fySticker(FyColors c, {Color? fill, double radius = FyRadius.l, double drop = 6}) => BoxDecoration(
      color: fill ?? c.card,
      borderRadius: BorderRadius.circular(radius),
      border: Border.all(color: c.edge, width: 2),
      boxShadow: [BoxShadow(color: c.edgeShadow, offset: Offset(0, drop), blurRadius: 0)],
    );

const fyEase = Cubic(0.22, 1, 0.36, 1);
const fySpring = Cubic(0.34, 1.56, 0.64, 1);

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
