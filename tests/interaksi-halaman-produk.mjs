// FUSIONIFY UI · uji otomatis (interaksi halaman produk): bayar QRIS, status, dokumentasi, legal.
import { chromium } from "playwright";
import { BASE, NM } from "./_env.mjs";

let lulus = 0, gagal = 0;
const cek = (ok, pesan) => { if (ok) lulus++; else { gagal++; console.log("  ✗ " + pesan); } };
const U = BASE + "templates/";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
await ctx.route(/cdn\.jsdelivr\.net\/npm\/(gsap|lenis)@[^/]+\/(.*)$/, (r) => { const m = r.request().url().match(/npm\/(gsap|lenis)@[^/]+\/(.*)$/); r.fulfill({ path: NM + m[1] + "/" + m[2], contentType: "text/javascript" }); });
const halaman = async (url) => {
  const p = await ctx.newPage();
  const err = [];
  p.on("pageerror", (e) => err.push(e.message));
  await p.goto(url, { waitUntil: "networkidle" });
  p.err = err;
  return p;
};
const terlihat = (p, s) => p.$eval(s, (el) => getComputedStyle(el).display !== "none" && el.getBoundingClientRect().height > 0).catch(() => false);

// 1. Bayar QRIS
let p = await halaman(U + "bayar-qris.html");
cek(await terlihat(p, '[data-show="menunggu"]'), "bayar: panel menunggu tidak tampil");
cek(!(await terlihat(p, '[data-show="berhasil"]')), "bayar: panel berhasil tampil terlalu awal");
cek(/^\d{2}\.\d{2} WIB$/.test(await p.textContent("[data-pay-deadline]")), "bayar: jam batas bayar");
cek(/^1[45]:\d{2}$/.test(await p.textContent("[data-pay-left]")), "bayar: hitung mundur " + (await p.textContent("[data-pay-left]")));
await p.click("[data-copy='150000']");
await p.waitForSelector(".toast.show", { timeout: 3000 }).catch(() => {});
cek(await p.evaluate(() => navigator.clipboard.readText()) === "150000", "bayar: salin jumlah");
await p.click("[data-pay-check]");
await p.waitForFunction(() => document.querySelector("[data-toast-text]").textContent.includes("Belum masuk"), null, { timeout: 3000 }).then(() => cek(true), () => cek(false, "bayar: toast cek status"));
cek(!p.err.length, "bayar: error JS " + p.err.join(" | "));
await p.close();
for (const s of ["berhasil", "kedaluwarsa", "gagal"]) {
  p = await halaman(U + "bayar-qris.html?status=" + s);
  cek(await terlihat(p, `[data-show="${s}"]`) && !(await terlihat(p, '[data-show="menunggu"]')), `bayar: keadaan ${s}`);
  cek(await p.evaluate((s) => document.activeElement?.closest(`[data-show="${s}"]`) !== null, s), `bayar: fokus pindah ke judul ${s}`);
  await p.close();
}
// Waktu habis sungguhan: data-expires di masa lalu
p = await ctx.newPage();
await p.route("**/bayar-qris.html", async (r) => { const res = await r.fetch(); const t = (await res.text()).replace('data-expires=""', `data-expires="${new Date(Date.now() + 1500).toISOString()}"`); r.fulfill({ response: res, body: t }); });
await p.goto(U + "bayar-qris.html", { waitUntil: "networkidle" });
await p.waitForFunction(() => document.querySelector("[data-pay]").dataset.payState === "kedaluwarsa", null, { timeout: 5000 }).then(() => cek(true), () => cek(false, "bayar: tidak kedaluwarsa saat waktu habis"));
await p.close();

// 2. Status
p = await halaman(U + "status.html");
const bars = await p.$$eval(".uptime-bars", (bs) => bs.map((b) => b.children.length));
cek(bars.length >= 3 && bars.every((n) => n === 90), "status: 90 batang per layanan " + bars.join(","));
cek(await p.$(".sample-note") !== null, "status: label Data contoh wajib ada");
await p.setViewportSize({ width: 390, height: 844 });
cek(await p.$eval(".uptime-bars", (b) => [...b.children].filter((x) => getComputedStyle(x).display !== "none").length) === 30, "status: HP menampilkan 30 hari");
await p.close();

// 3. Dokumentasi
p = await halaman(U + "dokumentasi.html");
cek(await p.$eval(".docs-nav", (d) => d.open), "docs: menu terbuka di desktop");
await p.click("#t-js");
cek(await p.isVisible("#p-js") && !(await p.isVisible("#p-curl")), "docs: tab bahasa");
await p.click("#p-js .code-head button");
cek((await p.evaluate(() => navigator.clipboard.readText())).includes("process.env.NP_SECRET_KEY"), "docs: salin kode");
await p.evaluate(() => document.getElementById("webhook").scrollIntoView());
await p.waitForTimeout(600);
cek(await p.$eval(".docs-toc a[aria-current]", (a) => a.getAttribute("href")).catch(() => "") === "#webhook", "docs: daftar isi mengikuti bacaan");
cek(!p.err.length, "docs: error JS " + p.err.join(" | "));
await p.close();
const hp = await b.newContext({ viewport: { width: 390, height: 844 } });
p = await hp.newPage();
await p.goto(U + "dokumentasi.html", { waitUntil: "networkidle" });
cek(!(await p.$eval(".docs-nav", (d) => d.open)), "docs: menu terlipat di HP");
await p.click(".docs-nav summary");
cek(await p.isVisible(".docs-nav nav a[aria-current='page']"), "docs: menu HP bisa dibuka");
await hp.close();

// 4. Legal
for (const f of ["privasi", "syarat"]) {
  p = await halaman(U + "legal/" + f + ".html");
  const r = await p.evaluate(() => ({
    toc: [...document.querySelectorAll(".legal .toc a")].map((a) => a.hash.slice(1)),
    h2: [...document.querySelectorAll(".legal .prose h2")].map((h) => h.id),
    current: document.querySelector(".legal-switch a[aria-current='page']")?.getAttribute("href"),
    kontak: document.body.innerHTML.includes("hello@fusionify.id"),
    tanggal: document.querySelector(".legal-head time")?.getAttribute("datetime"),
  }));
  cek(r.toc.length > 8 && r.toc.join() === r.h2.join(), `${f}: daftar isi sama dengan judul bagian`);
  cek(r.current === f + ".html", `${f}: tombol halaman aktif`);
  cek(r.kontak && /^\d{4}-\d{2}-\d{2}$/.test(r.tanggal || ""), `${f}: kontak dan tanggal diperbarui`);
  await p.close();
}

await b.close();
console.log(`${lulus} lulus, ${gagal} FAIL`);
process.exit(gagal ? 1 : 0);
