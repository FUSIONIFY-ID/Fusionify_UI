// FUSIONIFY UI · token untuk Android Jetpack Compose. Dibuat otomatis dari css/tokens.css oleh scripts/build-tokens.mjs. Jangan diedit manual.
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
    val blue: Color,
    val blueDeep: Color,
    val blueLight: Color,
    val ink: Color,
    val ink2: Color,
    val ink3: Color,
    val surface: Color,
    val paper: Color,
    val white: Color,
    val line: Color,
    val night: Color,
    val go: Color,
    val goBg: Color,
    val beta: Color,
    val betaBg: Color,
    val wip: Color,
    val wipBg: Color,
    val plan: Color,
    val planBg: Color,
    val eos: Color,
    val eosBg: Color,
    val card: Color,
    val field: Color,
    val surface2: Color,
    val edge: Color,
    val edgeShadow: Color,
    val textBlue: Color,
    val textBlueDeep: Color,
    val inverseBg: Color,
    val inverseFg: Color,
    val inverseAccent: Color,
    val navGlass: Color,
    val heroGlow: Color,
    val sealTint: Color,
    val danger: Color,
    val dangerBg: Color,
    val placeholder: Color,
    val footerTop: Color,
)

val FyLight = FyColors(
    blue = Color(0xFF0D6CD7),
    blueDeep = Color(0xFF0261CD),
    blueLight = Color(0xFF539DE9),
    ink = Color(0xFF0B0F1A),
    ink2 = Color(0xFF3A4458),
    ink3 = Color(0xFF566175),
    surface = Color(0xFFEAF4FF),
    paper = Color(0xFFF7FBFF),
    white = Color(0xFFFFFFFF),
    line = Color(0xFFD3E4F7),
    night = Color(0xFF071022),
    go = Color(0xFF157F3B),
    goBg = Color(0xFFE3F6E9),
    beta = Color(0xFF9A5B00),
    betaBg = Color(0xFFFFF2D8),
    wip = Color(0xFF8A4A00),
    wipBg = Color(0xFFFFE9D6),
    plan = Color(0xFF0261CD),
    planBg = Color(0xFFEEF7FF),
    eos = Color(0xFF5B6475),
    eosBg = Color(0xFFECEFF4),
    card = Color(0xFFFFFFFF),
    field = Color(0xFFFFFFFF),
    surface2 = Color(0xFFDCECFF),
    edge = Color(0xFF0B0F1A),
    edgeShadow = Color(0xFF0B0F1A),
    textBlue = Color(0xFF0D6CD7),
    textBlueDeep = Color(0xFF0261CD),
    inverseBg = Color(0xFF0B0F1A),
    inverseFg = Color(0xFFFFFFFF),
    inverseAccent = Color(0xFF8CC0FF),
    navGlass = Color(0xD1FFFFFF),
    heroGlow = Color(0xFFDCEDFF),
    sealTint = Color(0xFFD8EAFF),
    danger = Color(0xFFB4232C),
    dangerBg = Color(0xFFFDE8EA),
    placeholder = Color(0xFF707A8C),
    footerTop = Color(0x00000000),
)

val FyDark = FyColors(
    blue = Color(0xFF0D6CD7),
    blueDeep = Color(0xFF0261CD),
    blueLight = Color(0xFF539DE9),
    ink = Color(0xFFEAF3FF),
    ink2 = Color(0xFFC3D4EA),
    ink3 = Color(0xFF9DB2CF),
    surface = Color(0xFF0C1A33),
    paper = Color(0xFF071022),
    white = Color(0xFF0F2040),
    line = Color(0xFF1F3459),
    night = Color(0xFF071022),
    go = Color(0xFF7FE0A6),
    goBg = Color(0xFF0F3324),
    beta = Color(0xFFFFD27A),
    betaBg = Color(0xFF3A2A08),
    wip = Color(0xFFFFB98A),
    wipBg = Color(0xFF3C220E),
    plan = Color(0xFFA9D0FF),
    planBg = Color(0xFF10264A),
    eos = Color(0xFFB5C0D0),
    eosBg = Color(0xFF1C2638),
    card = Color(0xFF10203F),
    field = Color(0xFF0B1830),
    surface2 = Color(0xFF17305A),
    edge = Color(0xFF2E5592),
    edgeShadow = Color(0xFF02060F),
    textBlue = Color(0xFF8CC0FF),
    textBlueDeep = Color(0xFFA9D0FF),
    inverseBg = Color(0xFFEAF3FF),
    inverseFg = Color(0xFF071022),
    inverseAccent = Color(0xFF0261CD),
    navGlass = Color(0xD10A162C),
    heroGlow = Color(0xFF0F2A55),
    sealTint = Color(0xFF15315C),
    danger = Color(0xFFFF9BA1),
    dangerBg = Color(0xFF3D1418),
    placeholder = Color(0xFF8597B3),
    footerTop = Color(0xFF1F3459),
)

val LocalFyColors = staticCompositionLocalOf { FyLight }

object FyRadius { val s = 10.dp; val m = 18.dp; val l = 28.dp }
object FyTouch { val minTarget = 44.dp; val navBarHeight = 76.dp; val gutter = 16.dp }
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
