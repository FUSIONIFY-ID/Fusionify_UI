// FUSIONIFY UI · pengaturan bersama untuk uji otomatis.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
export const BASE = (process.env.FY_BASE || "http://localhost:4330") + "/";
export const AXE = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
// GSAP dan Lenis disajikan dari node_modules supaya hasil uji tidak tergantung CDN
export const NM = path.join(ROOT, "node_modules") + "/";
export const FIX = fs.mkdtempSync(path.join(os.tmpdir(), "fy-ui-")) + "/";
// GSAP dan Lenis dari CDN (importmap di template) dialihkan ke node_modules, supaya uji tidak gagal
// saat CDN lambat atau terblokir. Bisa dipasang di page atau context.
export const cdnLokal = (target) => target.route(/cdn\.jsdelivr\.net\/npm\/(gsap|lenis)@[^/]+\/(.*)$/, (r) => {
  const m = r.request().url().match(/npm\/(gsap|lenis)@[^/]+\/(.*)$/);
  r.fulfill({ path: NM + m[1] + "/" + m[2], contentType: "text/javascript" });
});
