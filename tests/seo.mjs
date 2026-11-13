// FUSIONIFY UI · uji otomatis (paket SEO, GEO, AIO, AEO). Dijalankan oleh tests/run.mjs. Tanpa browser.
// - Halaman publik: robots, canonical, hreflang id/en/x-default, Open Graph 1200x630, twitter:card, JSON-LD valid,
//   satu <h1>, Organization dengan kontak publik resmi, FAQPage sama persis dengan FAQ yang tampil.
// - Halaman lain (masuk, dashboard, admin, error, katalog): noindex.
// - seo/robots.txt mengizinkan bot AI, tanpa Content-Signal; seo/sitemap.xml punya hreflang dan lastmod.
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./_env.mjs";

let ok = 0, fail = 0;
const cek = (benar, pesan) => { if (benar) ok++; else { fail++; console.log("FAIL:", pesan); } };

const PUBLIK = ["landing-produk", "acara", "status", "dokumentasi", "legal/privasi", "legal/syarat", "halaman-perusahaan", "halaman-karya"];
const KONTAK = { email: "hello@fusionify.id", telephone: "+62-831-1138-0628" };
const baca = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const meta = (s, attr, nama) => (s.match(new RegExp(`<meta ${attr}="${nama}" content="([^"]*)"`)) || [])[1];
const teks = (h) => h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const semua = [];
const jalan = (dir) => fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).forEach((e) => {
  const p = path.join(dir, e.name);
  if (e.isDirectory()) jalan(p); else if (e.name.endsWith(".html")) semua.push(p);
});
jalan("templates");
semua.push("demo/index.html");

for (const f of semua) {
  const s = baca(f);
  const nama = f.replace(/^templates\//, "").replace(/\.html$/, "");
  const robots = meta(s, "name", "robots") || "";
  cek(robots, `${f}: meta robots ada`);
  if (!PUBLIK.includes(nama)) { cek(/noindex/.test(robots), `${f}: bukan halaman publik, wajib noindex (${robots})`); continue; }

  cek(/max-snippet:-1/.test(robots) && /max-image-preview:large/.test(robots) && !/noindex/.test(robots), `${f}: robots index + max-snippet + max-image-preview`);
  const canon = (s.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  cek(canon && /^https:\/\//.test(canon), `${f}: canonical https`);
  for (const hl of ["id", "en", "x-default"]) cek(new RegExp(`hreflang="${hl}" href="https://`).test(s), `${f}: hreflang ${hl}`);
  for (const p of ["og:type", "og:title", "og:description", "og:url", "og:image", "og:image:alt", "og:locale"]) cek(meta(s, "property", p), `${f}: ${p}`);
  cek(meta(s, "property", "og:image:width") === "1200" && meta(s, "property", "og:image:height") === "630", `${f}: og:image 1200x630`);
  cek(meta(s, "property", "og:url") === canon, `${f}: og:url sama dengan canonical`);
  cek(meta(s, "name", "twitter:card") === "summary_large_image", `${f}: twitter:card`);
  cek((s.match(/<h1[\s>]/g) || []).length === 1, `${f}: tepat satu <h1>`);
  const desk = meta(s, "name", "description") || "";
  cek(desk.length >= 40 && desk.length <= 170, `${f}: meta description 40-170 karakter (${desk.length})`);
  cek(!/—/.test(s), `${f}: tanpa em dash`);

  const blok = [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  cek(blok.length === 1, `${f}: satu blok JSON-LD`);
  let graf = [];
  try { graf = JSON.parse(blok[0]?.[1] || "{}")["@graph"] || []; } catch (e) { cek(false, `${f}: JSON-LD tidak valid (${e.message})`); }
  const jenis = graf.map((g) => g["@type"]);
  cek(jenis.includes("WebSite") && jenis.includes("Organization"), `${f}: @graph memuat WebSite dan Organization (${jenis.join(", ")})`);
  const org = graf.find((g) => g["@type"] === "Organization") || {};
  cek(org.email === KONTAK.email && org.telephone === KONTAK.telephone, `${f}: Organization memakai kontak publik resmi`);
  if (nama !== "landing-produk") cek(jenis.includes("BreadcrumbList"), `${f}: BreadcrumbList`);

  // FAQPage hanya boleh ada kalau FAQ tampil di halaman, dan isinya wajib sama persis
  const faqTampil = [...s.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<p class="ans">([\s\S]*?)<\/p>/g)].map((m) => [teks(m[1]), teks(m[2])]);
  const faq = graf.find((g) => g["@type"] === "FAQPage");
  if (faq) {
    const di = faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]);
    cek(JSON.stringify(di) === JSON.stringify(faqTampil), `${f}: FAQPage sama dengan FAQ yang tampil`);
  } else cek(!s.includes('class="faq"'), `${f}: halaman punya FAQ tapi tanpa FAQPage`);
}

const robots = baca("seo/robots.txt");
for (const bot of ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"]) cek(new RegExp(`User-agent: ${bot}\\nAllow: /`).test(robots), `robots.txt mengizinkan ${bot}`);
cek(!/^Content-Signal/im.test(robots), "robots.txt tanpa baris Content-Signal");
cek(/^Sitemap: https:\/\//m.test(robots), "robots.txt menyebut Sitemap");
const sitemap = baca("seo/sitemap.xml");
cek(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemap) && /hreflang="x-default"/.test(sitemap), "sitemap.xml punya lastmod dan hreflang");
cek(/^# /.test(baca("seo/llms.txt")), "llms.txt diawali judul");

console.log(`${ok} lulus, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
