// FUSIONIFY UI · token untuk iOS (SwiftUI + UIKit). Dibuat otomatis dari css/tokens.css oleh scripts/build-tokens.mjs. Jangan diedit manual.
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
        public static let blue = dyn(UIColor(red: 0.0510, green: 0.4235, blue: 0.8431, alpha: 1), UIColor(red: 0.0510, green: 0.4235, blue: 0.8431, alpha: 1))
        public static let blueDeep = dyn(UIColor(red: 0.0078, green: 0.3804, blue: 0.8039, alpha: 1), UIColor(red: 0.0078, green: 0.3804, blue: 0.8039, alpha: 1))
        public static let blueLight = dyn(UIColor(red: 0.3255, green: 0.6157, blue: 0.9137, alpha: 1), UIColor(red: 0.3255, green: 0.6157, blue: 0.9137, alpha: 1))
        public static let ink = dyn(UIColor(red: 0.0431, green: 0.0588, blue: 0.1020, alpha: 1), UIColor(red: 0.9176, green: 0.9529, blue: 1.0000, alpha: 1))
        public static let ink2 = dyn(UIColor(red: 0.2275, green: 0.2667, blue: 0.3451, alpha: 1), UIColor(red: 0.7647, green: 0.8314, blue: 0.9176, alpha: 1))
        public static let ink3 = dyn(UIColor(red: 0.3373, green: 0.3804, blue: 0.4588, alpha: 1), UIColor(red: 0.6157, green: 0.6980, blue: 0.8118, alpha: 1))
        public static let surface = dyn(UIColor(red: 0.9176, green: 0.9569, blue: 1.0000, alpha: 1), UIColor(red: 0.0471, green: 0.1020, blue: 0.2000, alpha: 1))
        public static let paper = dyn(UIColor(red: 0.9686, green: 0.9843, blue: 1.0000, alpha: 1), UIColor(red: 0.0275, green: 0.0627, blue: 0.1333, alpha: 1))
        public static let white = dyn(UIColor(red: 1.0000, green: 1.0000, blue: 1.0000, alpha: 1), UIColor(red: 0.0588, green: 0.1255, blue: 0.2510, alpha: 1))
        public static let line = dyn(UIColor(red: 0.8275, green: 0.8941, blue: 0.9686, alpha: 1), UIColor(red: 0.1216, green: 0.2039, blue: 0.3490, alpha: 1))
        public static let night = dyn(UIColor(red: 0.0275, green: 0.0627, blue: 0.1333, alpha: 1), UIColor(red: 0.0275, green: 0.0627, blue: 0.1333, alpha: 1))
        public static let go = dyn(UIColor(red: 0.0824, green: 0.4980, blue: 0.2314, alpha: 1), UIColor(red: 0.4980, green: 0.8784, blue: 0.6510, alpha: 1))
        public static let goBg = dyn(UIColor(red: 0.8902, green: 0.9647, blue: 0.9137, alpha: 1), UIColor(red: 0.0588, green: 0.2000, blue: 0.1412, alpha: 1))
        public static let beta = dyn(UIColor(red: 0.6039, green: 0.3569, blue: 0.0000, alpha: 1), UIColor(red: 1.0000, green: 0.8235, blue: 0.4784, alpha: 1))
        public static let betaBg = dyn(UIColor(red: 1.0000, green: 0.9490, blue: 0.8471, alpha: 1), UIColor(red: 0.2275, green: 0.1647, blue: 0.0314, alpha: 1))
        public static let wip = dyn(UIColor(red: 0.5412, green: 0.2902, blue: 0.0000, alpha: 1), UIColor(red: 1.0000, green: 0.7255, blue: 0.5412, alpha: 1))
        public static let wipBg = dyn(UIColor(red: 1.0000, green: 0.9137, blue: 0.8392, alpha: 1), UIColor(red: 0.2353, green: 0.1333, blue: 0.0549, alpha: 1))
        public static let plan = dyn(UIColor(red: 0.0078, green: 0.3804, blue: 0.8039, alpha: 1), UIColor(red: 0.6627, green: 0.8157, blue: 1.0000, alpha: 1))
        public static let planBg = dyn(UIColor(red: 0.9333, green: 0.9686, blue: 1.0000, alpha: 1), UIColor(red: 0.0627, green: 0.1490, blue: 0.2902, alpha: 1))
        public static let eos = dyn(UIColor(red: 0.3569, green: 0.3922, blue: 0.4588, alpha: 1), UIColor(red: 0.7098, green: 0.7529, blue: 0.8157, alpha: 1))
        public static let eosBg = dyn(UIColor(red: 0.9255, green: 0.9373, blue: 0.9569, alpha: 1), UIColor(red: 0.1098, green: 0.1490, blue: 0.2196, alpha: 1))
        public static let card = dyn(UIColor(red: 1.0000, green: 1.0000, blue: 1.0000, alpha: 1), UIColor(red: 0.0627, green: 0.1255, blue: 0.2471, alpha: 1))
        public static let field = dyn(UIColor(red: 1.0000, green: 1.0000, blue: 1.0000, alpha: 1), UIColor(red: 0.0431, green: 0.0941, blue: 0.1882, alpha: 1))
        public static let surface2 = dyn(UIColor(red: 0.8627, green: 0.9255, blue: 1.0000, alpha: 1), UIColor(red: 0.0902, green: 0.1882, blue: 0.3529, alpha: 1))
        public static let edge = dyn(UIColor(red: 0.0431, green: 0.0588, blue: 0.1020, alpha: 1), UIColor(red: 0.1804, green: 0.3333, blue: 0.5725, alpha: 1))
        public static let edgeShadow = dyn(UIColor(red: 0.0431, green: 0.0588, blue: 0.1020, alpha: 1), UIColor(red: 0.0078, green: 0.0235, blue: 0.0588, alpha: 1))
        public static let textBlue = dyn(UIColor(red: 0.0510, green: 0.4235, blue: 0.8431, alpha: 1), UIColor(red: 0.5490, green: 0.7529, blue: 1.0000, alpha: 1))
        public static let textBlueDeep = dyn(UIColor(red: 0.0078, green: 0.3804, blue: 0.8039, alpha: 1), UIColor(red: 0.6627, green: 0.8157, blue: 1.0000, alpha: 1))
        public static let inverseBg = dyn(UIColor(red: 0.0431, green: 0.0588, blue: 0.1020, alpha: 1), UIColor(red: 0.9176, green: 0.9529, blue: 1.0000, alpha: 1))
        public static let inverseFg = dyn(UIColor(red: 1.0000, green: 1.0000, blue: 1.0000, alpha: 1), UIColor(red: 0.0275, green: 0.0627, blue: 0.1333, alpha: 1))
        public static let inverseAccent = dyn(UIColor(red: 0.5490, green: 0.7529, blue: 1.0000, alpha: 1), UIColor(red: 0.0078, green: 0.3804, blue: 0.8039, alpha: 1))
        public static let navGlass = dyn(UIColor(red: 1.0000, green: 1.0000, blue: 1.0000, alpha: 0.82), UIColor(red: 0.0392, green: 0.0863, blue: 0.1725, alpha: 0.82))
        public static let heroGlow = dyn(UIColor(red: 0.8627, green: 0.9294, blue: 1.0000, alpha: 1), UIColor(red: 0.0588, green: 0.1647, blue: 0.3333, alpha: 1))
        public static let sealTint = dyn(UIColor(red: 0.8471, green: 0.9176, blue: 1.0000, alpha: 1), UIColor(red: 0.0824, green: 0.1922, blue: 0.3608, alpha: 1))
        public static let danger = dyn(UIColor(red: 0.7059, green: 0.1373, blue: 0.1725, alpha: 1), UIColor(red: 1.0000, green: 0.6078, blue: 0.6314, alpha: 1))
        public static let dangerBg = dyn(UIColor(red: 0.9922, green: 0.9098, blue: 0.9176, alpha: 1), UIColor(red: 0.2392, green: 0.0784, blue: 0.0941, alpha: 1))
        public static let placeholder = dyn(UIColor(red: 0.4392, green: 0.4784, blue: 0.5490, alpha: 1), UIColor(red: 0.5216, green: 0.5922, blue: 0.7020, alpha: 1))
        public static let bintang = dyn(UIColor(red: 0.9412, green: 0.6588, blue: 0.0000, alpha: 1), UIColor(red: 1.0000, green: 0.7882, blue: 0.2392, alpha: 1))
        public static let onDark = dyn(UIColor(red: 1.0000, green: 1.0000, blue: 1.0000, alpha: 1), UIColor(red: 1.0000, green: 1.0000, blue: 1.0000, alpha: 1))
        public static let onDark2 = dyn(UIColor(red: 0.9490, green: 0.9725, blue: 1.0000, alpha: 1), UIColor(red: 0.9490, green: 0.9725, blue: 1.0000, alpha: 1))
        public static let dangerFill = dyn(UIColor(red: 0.7686, green: 0.1961, blue: 0.2275, alpha: 1), UIColor(red: 0.7686, green: 0.1961, blue: 0.2275, alpha: 1))
        public static let warnFill = dyn(UIColor(red: 0.9098, green: 0.6392, blue: 0.2392, alpha: 1), UIColor(red: 0.9098, green: 0.6392, blue: 0.2392, alpha: 1))
        public static let online = dyn(UIColor(red: 0.1843, green: 0.7490, blue: 0.3882, alpha: 1), UIColor(red: 0.2471, green: 0.8235, blue: 0.4667, alpha: 1))
        public static let nightInk = dyn(UIColor(red: 0.8588, green: 0.9137, blue: 0.9843, alpha: 1), UIColor(red: 0.8588, green: 0.9137, blue: 0.9843, alpha: 1))
        public static let nightInk2 = dyn(UIColor(red: 0.6235, green: 0.7020, blue: 0.8039, alpha: 1), UIColor(red: 0.6235, green: 0.7020, blue: 0.8039, alpha: 1))
        public static let nightInk3 = dyn(UIColor(red: 0.5098, green: 0.5882, blue: 0.6980, alpha: 1), UIColor(red: 0.5098, green: 0.5882, blue: 0.6980, alpha: 1))
        public static let nightLink = dyn(UIColor(red: 0.7255, green: 0.7961, blue: 0.8902, alpha: 1), UIColor(red: 0.7255, green: 0.7961, blue: 0.8902, alpha: 1))
        public static let nightLine = dyn(UIColor(red: 0.1137, green: 0.1686, blue: 0.2706, alpha: 1), UIColor(red: 0.1137, green: 0.1686, blue: 0.2706, alpha: 1))
        public static let nightLine2 = dyn(UIColor(red: 0.1647, green: 0.2314, blue: 0.3608, alpha: 1), UIColor(red: 0.1647, green: 0.2314, blue: 0.3608, alpha: 1))
        public static let codeFg = dyn(UIColor(red: 0.9176, green: 0.9529, blue: 1.0000, alpha: 1), UIColor(red: 0.9176, green: 0.9529, blue: 1.0000, alpha: 1))
        public static let codeMuted = dyn(UIColor(red: 0.6157, green: 0.6980, blue: 0.8118, alpha: 1), UIColor(red: 0.6157, green: 0.6980, blue: 0.8118, alpha: 1))
        public static let codeLine = dyn(UIColor(red: 0.1216, green: 0.2039, blue: 0.3490, alpha: 1), UIColor(red: 0.1216, green: 0.2039, blue: 0.3490, alpha: 1))
        public static let codeEdge = dyn(UIColor(red: 0.1804, green: 0.3333, blue: 0.5725, alpha: 1), UIColor(red: 0.1804, green: 0.3333, blue: 0.5725, alpha: 1))
        public static let codeBtn = dyn(UIColor(red: 0.0627, green: 0.1255, blue: 0.2471, alpha: 1), UIColor(red: 0.0627, green: 0.1255, blue: 0.2471, alpha: 1))
        public static let codeBtnHover = dyn(UIColor(red: 0.0902, green: 0.1882, blue: 0.3529, alpha: 1), UIColor(red: 0.0902, green: 0.1882, blue: 0.3529, alpha: 1))
        public static let codeStr = dyn(UIColor(red: 0.4980, green: 0.8784, blue: 0.6510, alpha: 1), UIColor(red: 0.4980, green: 0.8784, blue: 0.6510, alpha: 1))
        public static let codeKey = dyn(UIColor(red: 0.5490, green: 0.7529, blue: 1.0000, alpha: 1), UIColor(red: 0.5490, green: 0.7529, blue: 1.0000, alpha: 1))
        public static let codeNum = dyn(UIColor(red: 1.0000, green: 0.8235, blue: 0.4784, alpha: 1), UIColor(red: 1.0000, green: 0.8235, blue: 0.4784, alpha: 1))
        public static let footerTop = dyn(UIColor(red: 0.0000, green: 0.0000, blue: 0.0000, alpha: 0), UIColor(red: 0.1216, green: 0.2039, blue: 0.3490, alpha: 1))
    }

    public enum Color {
        public static let blue = SwiftUI.Color(uiColor: UI.blue)
        public static let blueDeep = SwiftUI.Color(uiColor: UI.blueDeep)
        public static let blueLight = SwiftUI.Color(uiColor: UI.blueLight)
        public static let ink = SwiftUI.Color(uiColor: UI.ink)
        public static let ink2 = SwiftUI.Color(uiColor: UI.ink2)
        public static let ink3 = SwiftUI.Color(uiColor: UI.ink3)
        public static let surface = SwiftUI.Color(uiColor: UI.surface)
        public static let paper = SwiftUI.Color(uiColor: UI.paper)
        public static let white = SwiftUI.Color(uiColor: UI.white)
        public static let line = SwiftUI.Color(uiColor: UI.line)
        public static let night = SwiftUI.Color(uiColor: UI.night)
        public static let go = SwiftUI.Color(uiColor: UI.go)
        public static let goBg = SwiftUI.Color(uiColor: UI.goBg)
        public static let beta = SwiftUI.Color(uiColor: UI.beta)
        public static let betaBg = SwiftUI.Color(uiColor: UI.betaBg)
        public static let wip = SwiftUI.Color(uiColor: UI.wip)
        public static let wipBg = SwiftUI.Color(uiColor: UI.wipBg)
        public static let plan = SwiftUI.Color(uiColor: UI.plan)
        public static let planBg = SwiftUI.Color(uiColor: UI.planBg)
        public static let eos = SwiftUI.Color(uiColor: UI.eos)
        public static let eosBg = SwiftUI.Color(uiColor: UI.eosBg)
        public static let card = SwiftUI.Color(uiColor: UI.card)
        public static let field = SwiftUI.Color(uiColor: UI.field)
        public static let surface2 = SwiftUI.Color(uiColor: UI.surface2)
        public static let edge = SwiftUI.Color(uiColor: UI.edge)
        public static let edgeShadow = SwiftUI.Color(uiColor: UI.edgeShadow)
        public static let textBlue = SwiftUI.Color(uiColor: UI.textBlue)
        public static let textBlueDeep = SwiftUI.Color(uiColor: UI.textBlueDeep)
        public static let inverseBg = SwiftUI.Color(uiColor: UI.inverseBg)
        public static let inverseFg = SwiftUI.Color(uiColor: UI.inverseFg)
        public static let inverseAccent = SwiftUI.Color(uiColor: UI.inverseAccent)
        public static let navGlass = SwiftUI.Color(uiColor: UI.navGlass)
        public static let heroGlow = SwiftUI.Color(uiColor: UI.heroGlow)
        public static let sealTint = SwiftUI.Color(uiColor: UI.sealTint)
        public static let danger = SwiftUI.Color(uiColor: UI.danger)
        public static let dangerBg = SwiftUI.Color(uiColor: UI.dangerBg)
        public static let placeholder = SwiftUI.Color(uiColor: UI.placeholder)
        public static let bintang = SwiftUI.Color(uiColor: UI.bintang)
        public static let onDark = SwiftUI.Color(uiColor: UI.onDark)
        public static let onDark2 = SwiftUI.Color(uiColor: UI.onDark2)
        public static let dangerFill = SwiftUI.Color(uiColor: UI.dangerFill)
        public static let warnFill = SwiftUI.Color(uiColor: UI.warnFill)
        public static let online = SwiftUI.Color(uiColor: UI.online)
        public static let nightInk = SwiftUI.Color(uiColor: UI.nightInk)
        public static let nightInk2 = SwiftUI.Color(uiColor: UI.nightInk2)
        public static let nightInk3 = SwiftUI.Color(uiColor: UI.nightInk3)
        public static let nightLink = SwiftUI.Color(uiColor: UI.nightLink)
        public static let nightLine = SwiftUI.Color(uiColor: UI.nightLine)
        public static let nightLine2 = SwiftUI.Color(uiColor: UI.nightLine2)
        public static let codeFg = SwiftUI.Color(uiColor: UI.codeFg)
        public static let codeMuted = SwiftUI.Color(uiColor: UI.codeMuted)
        public static let codeLine = SwiftUI.Color(uiColor: UI.codeLine)
        public static let codeEdge = SwiftUI.Color(uiColor: UI.codeEdge)
        public static let codeBtn = SwiftUI.Color(uiColor: UI.codeBtn)
        public static let codeBtnHover = SwiftUI.Color(uiColor: UI.codeBtnHover)
        public static let codeStr = SwiftUI.Color(uiColor: UI.codeStr)
        public static let codeKey = SwiftUI.Color(uiColor: UI.codeKey)
        public static let codeNum = SwiftUI.Color(uiColor: UI.codeNum)
        public static let footerTop = SwiftUI.Color(uiColor: UI.footerTop)
    }

    public enum Radius {
        public static let s: CGFloat = 10
        public static let m: CGFloat = 18
        public static let l: CGFloat = 28
    }

    public enum Touch {
        public static let minTarget: CGFloat = 44
        public static let navBarHeight: CGFloat = 76
        public static let gutter: CGFloat = 16
    }

    public enum Font {
        public static func head(_ size: CGFloat) -> SwiftUI.Font { .custom("AfacadFlux-ExtraBold", size: size) }
        public static func body(_ size: CGFloat = 17, bold: Bool = false) -> SwiftUI.Font { .custom(bold ? "Sansation-Bold" : "Sansation-Regular", size: size) }
        public static func hand(_ size: CGFloat, bold: Bool = false) -> SwiftUI.Font { .custom(bold ? "Caveat-Bold" : "Caveat-Regular", size: size) }
        public static func num(_ size: CGFloat, weight: Int = 600) -> SwiftUI.Font {
            .custom(weight >= 700 ? "Exo2-Bold" : weight >= 600 ? "Exo2-SemiBold" : "Exo2-Regular", size: size).monospacedDigit()
        }
    }

    public static let ease = Animation.timingCurve(0.22, 1, 0.36, 1, duration: 0.35)
    public static let spring = Animation.timingCurve(0.34, 1.56, 0.64, 1, duration: 0.45)
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
