// FUSIONIFY UI · bantuan rilis bernomor versi.
//   npm run release            → cek versi, lalu tampilkan perintah git untuk membuat tag
//   node scripts/release.mjs --check v1.5.0   → gagal kalau tag tidak sama dengan package.json dan CHANGELOG (dipakai GitHub Actions)
//   node scripts/release.mjs --notes v1.5.0   → cetak catatan rilis versi itu dari CHANGELOG.md
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const pkg = JSON.parse(fs.readFileSync(new URL("package.json", root), "utf8"));
const log = fs.readFileSync(new URL("CHANGELOG.md", root), "utf8");
const [, flag, tagArg] = process.argv.slice(1);
const version = pkg.version;
const top = log.match(/^## (\d+\.\d+\.\d+)/m)?.[1];

const section = (v) => {
  const m = log.match(new RegExp(`^## ${v.replace(/\./g, "\\.")}[^\\n]*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, "m"));
  return m ? m[1].trim() : "";
};

if (flag === "--notes") {
  const v = (tagArg || "").replace(/^v/, "");
  console.log(section(v) || `Rilis ${v}. Lihat CHANGELOG.md.`);
  console.log(`\n**Cara memakai versi ini:** lihat bagian "Versi" di README.md.`);
  process.exit(0);
}

const problems = [];
if (top !== version) problems.push(`Versi teratas di CHANGELOG.md (${top}) tidak sama dengan package.json (${version}).`);
if (flag === "--check" && (tagArg || "").replace(/^v/, "") !== version) problems.push(`Tag ${tagArg} tidak sama dengan versi package.json (${version}).`);
if (!/^\d+\.\d+\.\d+$/.test(version)) problems.push(`Versi "${version}" bukan format x.y.z.`);
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
if (flag === "--check") { console.log(`Versi ${version} cocok.`); process.exit(0); }

console.log(`Siap rilis v${version}. Jalankan satu per satu (PowerShell juga bisa):\n`);
console.log(`git add .`);
console.log(`git commit -m "Fusionify UI ${version}"`);
console.log(`git push`);
console.log(`git tag v${version}`);
console.log(`git push origin v${version}`);
console.log(`\nGitHub Actions akan menguji, membuat zip, dan menerbitkan rilis v${version}.`);
