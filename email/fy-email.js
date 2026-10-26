// FUSIONIFY UI · template email transaksional.
// Satu fungsi, tanpa dependensi, jalan di Node, Deno (Supabase Edge Functions), Bun, dan browser.
//
//   import { renderEmail } from "./fy-email.js";
//   const { html, text, subject } = renderEmail({
//     subject: "Pembayaran diterima",
//     pratinjau: "Invoice INV-001 sudah dibayar.",
//     merek: { nama: "FTVPay", logo: "https://ftvpay.fusionify.id/fy/email/ftvpay-mark.png", url: "https://ftvpay.fusionify.id" },
//     aset: "https://ftvpay.fusionify.id/fy/email/",      // folder tempat PNG di email/aset/ di-host
//     maskot: "paid",
//     kicker: "Pembayaran",
//     judul: "Pembayaran diterima",
//     isi: [
//       { p: ["Halo ", { b: "Budi" }, ", pembayaranmu sudah kami terima."] },
//       { rincian: [["Invoice", "INV-001"], ["Jumlah", "Rp100.000"]] },
//       { tombol: { teks: "Lihat invoice", url: "https://…" } },
//     ],
//   });
//
// Blok isi: { p }, { kecil }, { judul2 }, { tombol: { teks, url } }, { rincian: [[label, nilai], …] },
//   { catatan: { teks, nada: "info" | "ok" | "warn" | "danger" } }, { kode: "123456", keterangan? },
//   { daftar: [teks, …] }, { garis: true }, { status: { teks, nada: "go"|"beta"|"wip"|"plan"|"eos" } }.
// Teks boleh string atau array berisi string dan { b: "tebal" } / { a: "teks", url }. Semua di-escape.
//
// Aturan email (berbeda dari web): tabel 600px, gaya inline, gambar PNG dengan width/height/alt,
// tanpa SVG/WebP/box-shadow/web font wajib. Bayangan stiker ditiru dengan border-bottom tebal.

const T = {
  blue: "#0D6CD7", blueDeep: "#0261CD", blueLight: "#539DE9",
  ink: "#0B0F1A", ink2: "#3A4458", ink3: "#566175",
  surface: "#EAF4FF", paper: "#F7FBFF", line: "#D3E4F7", night: "#071022", white: "#FFFFFF",
  go: ["#157F3B", "#E3F6E9"], beta: ["#9A5B00", "#FFF2D8"], wip: ["#8A4A00", "#FFE9D6"], plan: ["#0261CD", "#EEF7FF"], eos: ["#5B6475", "#ECEFF4"],
  danger: ["#B4232C", "#FDE8EA"],
};
const F = {
  head: "'Afacad Flux', 'Arial Black', Arial, Helvetica, sans-serif",
  body: "Sansation, 'Segoe UI', Arial, Helvetica, sans-serif",
  num: "'Exo 2', 'Segoe UI', Arial, Helvetica, sans-serif",
  hand: "Caveat, 'Comic Sans MS', cursive",
};
const NADA = { info: [T.blueDeep, T.surface], ok: T.go, warn: T.beta, danger: T.danger };
const MASKOT = ["happy", "wink", "paid", "pay-failed", "confused", "glasses", "welcome", "loading", "empty", "cry", "offline"];

export const FUSIONIFY = {
  nama: "FUSIONIFY",
  logo: "https://fusionify.id/brand/kit/fusionify-logo-horizontal.png",
  logoLebar: 150,
  logoTinggi: 47,
  url: "https://fusionify.id",
  perusahaan: "PT FUSIONIFY DIGITAL STORE",
  kontak: "hello@fusionify.id · WhatsApp +62 831-1138-0628",
  produkFusionify: false,
};

export function esc(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Hanya http(s), mailto, tel, atau path relatif (untuk pratinjau lokal). javascript: dan sejenisnya jadi "#".
const amanUrl = (u) => (/^(https?:|mailto:|tel:|\.{0,2}\/)/i.test(String(u || "")) ? esc(u) : "#");

function teks(t) {
  if (Array.isArray(t)) return t.map(teks).join("");
  if (t && typeof t === "object") {
    if ("b" in t) return `<strong style="font-weight:700;color:${T.ink}">${esc(t.b)}</strong>`;
    if ("a" in t) return `<a href="${amanUrl(t.url)}" style="color:${T.blueDeep};text-decoration:underline">${esc(t.a)}</a>`;
    return "";
  }
  return esc(t);
}
function polos(t) {
  if (Array.isArray(t)) return t.map(polos).join("");
  if (t && typeof t === "object") return "b" in t ? String(t.b) : "a" in t ? `${t.a} (${t.url})` : "";
  return String(t ?? "");
}

function blok(b) {
  if (b.p !== undefined) return `<p style="margin:0 0 16px;font-family:${F.body};font-size:16px;line-height:1.6;color:${T.ink2}">${teks(b.p)}</p>`;
  if (b.kecil !== undefined) return `<p style="margin:0 0 14px;font-family:${F.body};font-size:13px;line-height:1.6;color:${T.ink3}">${teks(b.kecil)}</p>`;
  if (b.judul2 !== undefined) return `<h2 style="margin:22px 0 10px;font-family:${F.head};font-size:20px;line-height:1.2;font-weight:800;color:${T.ink}">${esc(b.judul2)}</h2>`;
  if (b.garis) return `<div style="height:1px;background:${T.line};margin:20px 0;line-height:1px;font-size:1px">&nbsp;</div>`;
  if (b.tombol) {
    const { teks: label, url } = b.tombol;
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 22px"><tr><td align="center" bgcolor="${T.blue}" style="border:2px solid ${T.ink};border-bottom-width:5px;border-radius:999px;mso-padding-alt:12px 26px">` +
      `<a href="${amanUrl(url)}" target="_blank" style="display:inline-block;padding:12px 26px;font-family:${F.body};font-size:16px;font-weight:700;color:${T.white};text-decoration:none;border-radius:999px">${esc(label)}</a></td></tr></table>`;
  }
  if (b.rincian) {
    const baris = b.rincian.map(([l, v], i) =>
      `<tr><td style="padding:11px 16px;font-family:${F.body};font-size:14px;color:${T.ink3};${i ? `border-top:1px solid ${T.line};` : ""}">${esc(l)}</td>` +
      `<td align="right" style="padding:11px 16px;font-family:${F.num};font-size:15px;font-weight:700;color:${T.ink};${i ? `border-top:1px solid ${T.line};` : ""}">${teks(v)}</td></tr>`).join("");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 22px;border:2px solid ${T.ink};border-bottom-width:5px;border-radius:16px;border-collapse:separate;background:${T.white}">${baris}</table>`;
  }
  if (b.catatan) {
    const [warna, latar] = NADA[b.catatan.nada || "info"] || NADA.info;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px"><tr><td style="background:${latar};border-radius:14px;padding:14px 16px;font-family:${F.body};font-size:14px;line-height:1.55;color:${warna}">${teks(b.catatan.teks)}</td></tr></table>`;
  }
  if (b.kode !== undefined) {
    const huruf = String(b.kode).split("").map((c) => `<td style="padding:0 3px"><div style="width:42px;height:52px;line-height:52px;text-align:center;border:2px solid ${T.ink};border-bottom-width:4px;border-radius:12px;background:${T.white};font-family:${F.num};font-size:26px;font-weight:700;color:${T.ink}">${esc(c)}</div></td>`).join("");
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 10px"><tr>${huruf}</tr></table>` +
      (b.keterangan ? `<p style="margin:0 0 18px;font-family:${F.body};font-size:13px;color:${T.ink3}">${teks(b.keterangan)}</p>` : "");
  }
  if (b.daftar) {
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px">` + b.daftar.map((d) =>
      `<tr><td valign="top" style="padding:7px 10px 0 0"><div style="width:10px;height:10px;border-radius:50%;background:${T.blueLight};border:2px solid ${T.ink};font-size:1px;line-height:1px">&nbsp;</div></td>` +
      `<td style="padding:2px 0 6px;font-family:${F.body};font-size:15px;line-height:1.55;color:${T.ink2}">${teks(d)}</td></tr>`).join("") + `</table>`;
  }
  if (b.status) {
    const [warna, latar] = T[b.status.nada] || T.plan;
    return `<p style="margin:0 0 16px"><span style="display:inline-block;padding:4px 12px;border-radius:999px;background:${latar};color:${warna};font-family:${F.num};font-size:12px;font-weight:700">&#9679; ${esc(b.status.teks)}</span></p>`;
  }
  return "";
}

function blokTeks(b) {
  if (b.p !== undefined || b.kecil !== undefined) return polos(b.p ?? b.kecil);
  if (b.judul2 !== undefined) return String(b.judul2).toUpperCase();
  if (b.garis) return "----";
  if (b.tombol) return `${b.tombol.teks}: ${b.tombol.url}`;
  if (b.rincian) return b.rincian.map(([l, v]) => `${l}: ${polos(v)}`).join("\n");
  if (b.catatan) return polos(b.catatan.teks);
  if (b.kode !== undefined) return `Kode: ${b.kode}${b.keterangan ? `\n${polos(b.keterangan)}` : ""}`;
  if (b.daftar) return b.daftar.map((d) => `- ${polos(d)}`).join("\n");
  if (b.status) return `Status: ${b.status.teks}`;
  return "";
}

export function renderEmail(o) {
  const m = { ...FUSIONIFY, ...(o.merek || {}) };
  if ((o.maskot || m.produkFusionify) && !o.aset) throw new Error('Isi "aset": URL folder tempat PNG dari email/aset/ di-host (maskot dan badge).');
  const aset = String(o.aset || "").replace(/\/?$/, "/");
  if (o.maskot && !MASKOT.includes(o.maskot)) throw new Error(`Maskot "${o.maskot}" tidak ada. Pilih: ${MASKOT.join(", ")}`);
  const isi = o.isi || [];

  const logo = m.logo
    ? `<img src="${amanUrl(m.logo)}" width="${m.logoLebar}" height="${m.logoTinggi}" alt="${esc(m.nama)}" style="display:block;border:0;outline:none;height:${m.logoTinggi}px;width:${m.logoLebar}px">`
    : "";
  const namaMerek = m.namaTeks ? `<td style="padding-left:10px;font-family:${F.head};font-size:22px;font-weight:800;color:${T.ink};letter-spacing:-0.3px">${esc(m.namaTeks)}</td>` : "";
  const maskot = o.maskot
    ? `<td width="120" valign="bottom" align="right" style="padding-left:12px"><img src="${amanUrl(aset + "maskot-" + o.maskot + ".png")}" width="110" height="138" alt="" style="display:block;border:0;width:110px;height:138px"></td>`
    : "";
  const kicker = o.kicker
    ? `<p style="margin:0 0 8px;font-family:${F.num};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${T.blueDeep}">&#9679;&nbsp; ${esc(o.kicker)}</p>`
    : "";
  const kaki = [
    m.produkFusionify ? `<a href="https://fusionify.id" style="text-decoration:none"><img src="${amanUrl(aset + "produk-fusionify-id-light.png")}" width="170" height="50" alt="Sebuah produk dari FUSIONIFY" style="display:block;margin:0 auto 12px;border:0;width:170px;height:50px"></a>` : "",
    `<p style="margin:0 0 6px;font-family:${F.body};font-size:12px;line-height:1.6;color:${T.ink3}">${esc(m.perusahaan)}<br>${esc(m.kontak)}</p>`,
    o.alasan ? `<p style="margin:0;font-family:${F.body};font-size:12px;line-height:1.6;color:${T.ink3}">${teks(o.alasan)}</p>` : "",
  ].join("");

  const html = `<!doctype html>
<html lang="id" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(o.subject || o.judul || m.nama)}</title>
<style>
  @media (max-width: 620px) { .fy-wrap { width: 100% !important; } .fy-pad { padding: 24px 20px !important; } .fy-maskot { display: none !important; } }
  a { color: ${T.blueDeep}; }
</style>
</head>
<body style="margin:0;padding:0;background:${T.paper};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(o.pratinjau || "")}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${T.paper}" style="background:${T.paper}">
<tr><td align="center" style="padding:28px 12px">
  <table role="presentation" class="fy-wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px">
    <tr><td style="padding:0 4px 16px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td><a href="${amanUrl(m.url)}" style="text-decoration:none">${logo}</a></td>${namaMerek}</tr></table>
    </td></tr>
    <tr><td bgcolor="${T.white}" class="fy-pad" style="background:${T.white};border:2px solid ${T.ink};border-bottom-width:6px;border-radius:24px;padding:30px 32px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="bottom">${kicker}<h1 style="margin:0 0 4px;font-family:${F.head};font-size:30px;line-height:1.1;font-weight:800;letter-spacing:-0.5px;color:${T.ink}">${esc(o.judul || "")}<span style="color:${T.blueLight}">.</span></h1></td>
        ${maskot ? maskot.replace("<td ", '<td class="fy-maskot" ') : ""}
      </tr></table>
      <div style="height:18px;line-height:18px;font-size:1px">&nbsp;</div>
      ${isi.map(blok).join("\n      ")}
    </td></tr>
    <tr><td align="center" style="padding:22px 16px 0">${kaki}</td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `${o.judul || ""}`.trim(),
    "",
    ...isi.map(blokTeks).filter(Boolean).flatMap((x) => [x, ""]),
    "--",
    m.perusahaan,
    m.kontak,
    o.alasan ? polos(o.alasan) : "",
  ].join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";

  return { subject: o.subject || o.judul || m.nama, html, text };
}
