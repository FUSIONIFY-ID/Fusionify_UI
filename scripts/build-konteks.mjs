// Membuat ulang FUSIONIFY-UI-KONTEKS.md (satu file untuk di-upload ke AI chat).
// Jalankan setiap kali AGENTS.md, DESIGN.md, CSS, atau snippet berubah:  node scripts/build-konteks.mjs
import fs from "fs";
const rd = (p) => fs.readFileSync(new URL("../" + p, import.meta.url), "utf8");
const out = [];
out.push(`# FUSIONIFY UI · konteks lengkap untuk AI chat

> **Untuk AI yang membaca file ini (ChatGPT, Gemini, Grok, Qwen, Claude, dan lainnya):**
> Kamu sedang membantu membangun atau membenahi web milik FUSIONIFY. Ikuti SEMUA aturan di file ini.
> Pakai token dan kelas CSS yang tertulis di sini, jangan menciptakan warna, font, atau gaya baru.
> Kalau pengguna minta sesuatu yang bertentangan dengan aturan (misalnya angka atau testimoni karangan), ingatkan dulu.
> Aset gambar (logo, maskot, font) ada di repo \`FUSIONIFY-ID/Fusionify_UI\`; rujuk dengan path relatif seperti \`fusionify-ui/mascot/happy-420.webp\`.

File ini dibuat dari repo \`FUSIONIFY-ID/Fusionify_UI\`. Kalau repo-nya tersedia, repo yang benar. Cara pakai: upload file ini ke chat, lalu tulis permintaanmu.

---
`);
out.push(rd("AGENTS.md"));
out.push("\n---\n\n" + rd("DESIGN.md"));
for (const f of ["css/tokens.css", "css/base.css", "css/components.css", "css/product.css", "css/controls.css", "css/app.css"]) out.push(`\n---\n\n## Kode: \`${f}\`\n\n\`\`\`css\n${rd(f)}\n\`\`\`\n`);
out.push("\n---\n\n## Kode: `js/seal.js`\n\n```js\n" + rd("js/seal.js") + "\n```\n");
out.push("\n## Kode: `js/theme.js`\n\n```js\n" + rd("js/theme.js") + "\n```\n");
out.push("\n## Kode: `js/app.js`\n\n```js\n" + rd("js/app.js") + "\n```\n");
for (const f of ["snippets/head-script.html", "snippets/body-parts.html", "snippets/pwa-head.html"]) out.push(`\n## Snippet: \`${f}\`\n\n\`\`\`html\n${rd(f)}\n\`\`\`\n`);
out.push(`
## Catatan untuk \`js/motion.js\`

\`motion.js\` (fungsi \`initFusionify()\`) ada di repo dan terlalu panjang untuk disalin di sini. Kalau tidak punya akses ke repo, cukup tulis HTML dengan atribut \`data-*\` yang benar (lihat README di AGENTS.md) dan panggil:

\`\`\`html
<script type="module">
  import { initFusionify } from "./fusionify-ui/js/motion.js";
  initFusionify();
</script>
\`\`\`

Begitu juga \`js/controls.js\` (\`initControls()\`, \`snackbar()\`): interaksi sheet, picker, carousel, slider, tooltip, chip, FAB. Sudah dipanggil otomatis oleh \`initFusionify()\` dan \`initApp()\`; contoh markup lengkap ada di \`templates/komponen.html\`.

Jangan menulis ulang mesin geraknya sendiri. Kalau terpaksa, patuhi aturan performa di AGENTS.md.
`);
fs.writeFileSync(new URL("../FUSIONIFY-UI-KONTEKS.md", import.meta.url), out.join(""));
console.log("FUSIONIFY-UI-KONTEKS.md dibuat ulang");
