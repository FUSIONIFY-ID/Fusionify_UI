# FUSIONIFY UI untuk aplikasi HP

Ada dua jalur, tergantung aplikasinya dibuat pakai apa.

## Jalur 1: isinya tetap HTML (web HP, PWA, Capacitor, WebView)

Kit ini langsung jalan. Semua komponen di `css/controls.css` sudah disiapkan untuk HP: target sentuh minimal 44px, area aman notch (`env(safe-area-inset-*)`), input 16px di layar sentuh supaya iOS tidak memperbesar halaman, dan mode gelap ikut sistem.

1. Mulai dari `templates/app-mobile.html` (app bar, navigation bar bawah, FAB, bottom sheet, carousel, list). Mulai 700px navigation bar otomatis berganti jadi rail.
2. Di `<head>`, setelah `snippets/head-script.html`, tempel `snippets/pwa-head.html`. Salin `snippets/manifest.webmanifest` ke akar situs dan ganti nama serta ikonnya.
3. Ikon contoh FUSIONIFY ada di `brand/app-icons/` (192, 512, maskable, apple-touch-icon 180). Produk memakai ikonnya sendiri dengan ukuran yang sama. Ikon iOS wajib berlatar, jangan transparan.
4. **Capacitor (iOS + Android dari satu kode):**
   ```
   npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
   npx cap init
   npx cap add ios
   npx cap add android
   npx cap sync
   ```
   Folder build web (`dist/` atau `public/`) jadi isi aplikasi. Untuk iOS tetap perlu Mac dengan Xcode.
5. Hal yang beda di aplikasi dibanding web:
   - Matikan `initFusionify()`; pakai `initApp()` saja. Aplikasi tidak butuh smooth scroll, kursor, atau tirai transisi.
   - Tombol kembali Android: tutup sheet/modal yang terbuka dulu sebelum pindah halaman (`dialog.close()`).
   - Warna bar status: `theme-color` di `pwa-head.html` sudah dua versi (terang/gelap). Di Capacitor pakai plugin `@capacitor/status-bar` dengan warna `paper`.

## Jalur 2: aplikasi native (Flutter, SwiftUI, Jetpack Compose, React Native)

CSS tidak bisa dipakai di sana. Yang dibawa adalah **tokennya**, lalu komponen dibangun ulang dengan aturan yang sama (garis stiker 2px, bayangan pejal ke bawah tanpa blur, sudut besar, segel, maskot).

| File | Untuk |
| --- | --- |
| `tokens.json` | Semua token dalam satu file (warna terang dan gelap, radius, huruf, gerak, ukuran sentuh) |
| `flutter/fusionify_tokens.dart` | `FyColors` (ThemeExtension), `fyTheme(Brightness)`, `fySticker()`, `FyRadius`, `FyFonts` |
| `swift/FusionifyTokens.swift` | `Fy.Color.*` (otomatis terang/gelap), `Fy.Font`, `.fySticker()` |
| `android/FusionifyTokens.kt` | Jetpack Compose: `FyTheme { }`, `FyTheme.colors`, `FyRadius`, `FySticker` |
| `android/res/` | **Android Kotlin/Java dengan layout XML** (seperti aplikasi VPN): warna terang + `values-night` gelap, ukuran, huruf, drawable stiker, tema `Theme.Fusionify` |
| `react-native/fusionify-tokens.ts` | `fy.color.light/dark`, `font`, `sticker()` |
| `fonts-ttf/` | Huruf versi TTF statis untuk aplikasi (OFL) |

Semua file di atas dibuat otomatis dari `css/tokens.css`. Kalau token berubah, jalankan:

```
node scripts/build-tokens.mjs
```

### Huruf

| File | Nama PostScript | Pakai untuk |
| --- | --- | --- |
| `AfacadFlux-ExtraBold.ttf` | AfacadFlux-ExtraBold | judul |
| `Sansation-Regular.ttf`, `Sansation-Bold.ttf` | Sansation-Regular, Sansation-Bold | teks dan UI |
| `Caveat-Regular.ttf`, `Caveat-Bold.ttf` | Caveat-Regular, Caveat-Bold | suara maskot |
| `Exo2-Regular.ttf`, `Exo2-SemiBold.ttf`, `Exo2-Bold.ttf` | Exo2-Regular, Exo2-SemiBold, Exo2-Bold | angka dan label kecil kapital |

Isinya subset latin (cukup untuk Bahasa Indonesia dan Inggris).

Flutter, `pubspec.yaml`:
```yaml
flutter:
  fonts:
    - family: Afacad Flux
      fonts: [{ asset: assets/fonts/AfacadFlux-ExtraBold.ttf, weight: 800 }]
    - family: Sansation
      fonts: [{ asset: assets/fonts/Sansation-Regular.ttf }, { asset: assets/fonts/Sansation-Bold.ttf, weight: 700 }]
    - family: Caveat
      fonts: [{ asset: assets/fonts/Caveat-Regular.ttf }, { asset: assets/fonts/Caveat-Bold.ttf, weight: 700 }]
    - family: Exo 2
      fonts: [{ asset: assets/fonts/Exo2-Regular.ttf }, { asset: assets/fonts/Exo2-SemiBold.ttf, weight: 600 }, { asset: assets/fonts/Exo2-Bold.ttf, weight: 700 }]
```

iOS: masukkan file TTF ke target, lalu daftarkan di `Info.plist` pada kunci `UIAppFonts` (Fonts provided by application).

Android: salin isi `tokens/android/res/` ke `app/src/main/res/` (sudah termasuk huruf dengan nama huruf kecil dan font family `@font/fy_body`, `fy_head`, `fy_hand`, `fy_num`).

### Android Kotlin/Java dengan XML (mis. aplikasi VPN)

1. Salin `tokens/android/res/` ke `app/src/main/res/`. Kalau nama file bentrok, semua file kit berawalan `fy_`.
2. Pastikan ada `implementation("com.google.android.material:material:1.12.0")`, lalu di `AndroidManifest.xml`: `android:theme="@style/Theme.Fusionify"`.
3. Mode gelap otomatis lewat `values-night/`. Untuk memaksa: `AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)`.
4. Pakai di layout:
   ```xml
   <TextView style="@style/Fy.Title" android:textSize="32sp" android:text="Halo" />
   <Button style="@style/Fy.Button" android:text="Hubungkan" />
   <LinearLayout style="@style/Fy.Card" ... />
   ```
   Di kode: Kotlin `ContextCompat.getColor(this, R.color.fy_blue)`, Java `ContextCompat.getColor(this, R.color.fy_blue)`.
5. Kartu dan tombol stiker memakai drawable berlapis (`fy_sticker_card`, `fy_sticker_button`, `fy_sticker_button_ghost`, `fy_sticker_field`), tanpa `elevation`.

### Aturan yang tetap berlaku di native

- Mode gelap ikut sistem. Pakai warna dari token, jangan menulis hex sendiri.
- Bayangan stiker itu offset ke bawah **tanpa blur**. Jangan pakai `elevation` atau bayangan blur bawaan platform.
- Biru (`blue`) sebagai warna isi tidak berubah di gelap; teks biru pakai `textBlue`.
- Target sentuh minimal 44pt/48dp, hormati area aman (notch, home indicator).
- Hormati pengaturan kurangi gerakan (iOS Reduce Motion, Android Remove animations).
- Maskot dan logo dari `mascot/` dan `brand/` (WebP bisa dipakai langsung di Android, iOS 14+, dan Flutter).
