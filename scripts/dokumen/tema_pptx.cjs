// FUSIONIFY UI · tulis warna tema ke file .pptx.
// pptxgenjs hanya menulis huruf tema; palet warnanya tetap bawaan Office. Fungsi ini mengganti
// <a:clrScheme> di ppt/theme/theme*.xml dengan warna FUSIONIFY, jadi warna "Tema" di PowerPoint
// (dan semua bentuk yang memakai warna skema) ikut kit.
const fs = require("fs");

function muatJSZip() {
  // jszip ikut terpasang bersama pptxgenjs
  return require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));
}

const URUTAN = ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function terapkanTema(file, tema) {
  for (const k of URUTAN) {
    if (!/^[0-9A-Fa-f]{6}$/.test(tema.colors[k] || "")) throw new Error(`Warna tema ${k} harus 6 digit hex tanpa #`);
  }
  const JSZip = muatJSZip();
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const bagian = Object.keys(zip.files).filter((f) => /^ppt\/theme\/theme\d+\.xml$/.test(f));
  for (const f of bagian) {
    let xml = await zip.file(f).async("string");
    const skema = `<a:clrScheme name="${esc(tema.name)}">` +
      URUTAN.map((k) => `<a:${k}><a:srgbClr val="${tema.colors[k].toUpperCase()}"/></a:${k}>`).join("") +
      "</a:clrScheme>";
    xml = xml.replace(/<a:clrScheme\b[\s\S]*?<\/a:clrScheme>/, skema);
    xml = xml.replace(/(<a:theme\b[^>]*\bname=")[^"]*(")/, `$1${esc(tema.name)}$2`);
    zip.file(f, xml);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

module.exports = { terapkanTema };
