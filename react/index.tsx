// FUSIONIFY UI · komponen React (TypeScript).
// Pembungkus tipis di atas kelas CSS kit: gaya tetap di css/*.css, komponen hanya menyusun markup
// yang benar (kelas, width/height gambar, alt, aria). Wajib memuat css/fusionify.css di aplikasi.
//
//   import { FyAset, Tombol, Chip, Kartu, Maskot, Keadaan } from "./fusionify-ui/react";
//   <FyAset base="/fusionify-ui">…</FyAset>   // tempat folder kit di-host (untuk gambar maskot, badge)
//
// Interaksi (reveal, kursor, sheet, OTP, dll.) tetap dari js/motion.js, js/app.js, js/controls.js.
import { createContext, useContext } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ImgHTMLAttributes, ReactNode, SVGProps } from "react";
import { SEAL_PATH } from "../js/seal.js";

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

/* ---------- Lokasi aset kit ---------- */
const AsetCtx = createContext("/fusionify-ui");
/** Tempat folder kit di-host, mis. "/fusionify-ui" (folder public) atau URL CDN. Tanpa garis miring di akhir. */
export function FyAset({ base, children }: { base: string; children: ReactNode }) {
  return <AsetCtx.Provider value={base.replace(/\/+$/, "")}>{children}</AsetCtx.Provider>;
}
export const useFyAset = () => useContext(AsetCtx);

/* ---------- Tata letak ---------- */
export function Wrap({ className, ...p }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("wrap", className)} {...p} />;
}

type NadaSeksi = "biasa" | "tint" | "blue";
/** Seksi halaman. nada "tint" untuk ritme selang-seling, "blue" untuk seksi biru (teks otomatis terang). */
export function Seksi({ nada = "biasa", className, ...p }: HTMLAttributes<HTMLElement> & { nada?: NadaSeksi }) {
  return <section className={cx("sec", nada === "tint" && "tint", nada === "blue" && "blue", className)} {...p} />;
}

/* ---------- Tipografi ---------- */
export function Kicker({ className, ...p }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("kicker", className)} {...p} />;
}

/** Judul dengan titik biru muda di akhir (titik huruf i FUSIONIFY). besar = judul hero. */
export function Judul({ as: Tag = "h2", besar = false, titik = true, className, children, ...p }:
  HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3"; besar?: boolean; titik?: boolean }) {
  return (
    <Tag className={cx(besar ? "h-hero" : "h-sec", className)} {...p}>
      {children}
      {titik && <span className="dot">.</span>}
    </Tag>
  );
}

export function Lead({ className, ...p }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("lead", className)} {...p} />;
}

/* ---------- Tombol ---------- */
type VarianTombol = "utama" | "ghost" | "danger";
type TombolDasar = { varian?: VarianTombol; kecil?: boolean; penuh?: boolean };
type TombolSebagaiTautan = TombolDasar & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type TombolSebagaiButton = TombolDasar & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Tombol stiker. Dengan href jadi <a>, tanpa href jadi <button type="button">. */
export function Tombol(props: TombolSebagaiTautan | TombolSebagaiButton) {
  const { varian = "utama", kecil, penuh, className, ...rest } = props;
  const kelas = cx("btn", varian === "ghost" && "ghost", varian === "danger" && "danger", kecil && "sm", penuh && "block", className);
  if (typeof rest.href === "string") return <a className={kelas} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={b.type ?? "button"} className={kelas} {...b} />;
}

/* ---------- Chip status ---------- */
export type Status = "go" | "beta" | "wip" | "plan" | "eos";
const LABEL_STATUS: Record<Status, string> = {
  go: "Aktif", beta: "Beta", wip: "Dalam pengembangan", plan: "Direncanakan", eos: "Layanan berakhir",
};
/** Status produk apa adanya. Tanpa children, label bawaan bahasa Indonesia dipakai. */
export function Chip({ status, className, children, ...p }: HTMLAttributes<HTMLSpanElement> & { status: Status }) {
  return <span className={cx("chip", status, className)} {...p}>{children ?? LABEL_STATUS[status]}</span>;
}

/* ---------- Kartu ---------- */
type NadaKartu = "putih" | "tint" | "blue";
/** Kartu stiker. Dengan href jadi tautan (terangkat saat hover). */
export function Kartu({ nada = "putih", href, className, ...p }: HTMLAttributes<HTMLElement> & { nada?: NadaKartu; href?: string }) {
  const kelas = cx("card", nada === "tint" && "tint", nada === "blue" && "blue", className);
  return href ? <a href={href} className={kelas} {...(p as HTMLAttributes<HTMLAnchorElement>)} /> : <div className={kelas} {...p} />;
}

/* ---------- Segel ---------- */
/** Segel 12 lekukan (viewBox 0 0 100 100), warna dari currentColor. Hiasan, jadi aria-hidden. */
export function Segel({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cx("fx-oversize", className)} {...p}>
      <path d={SEAL_PATH} fill="currentColor" />
    </svg>
  );
}

/* ---------- Maskot ---------- */
export type Ekspresi = "angry" | "confused" | "cry" | "empty" | "glasses" | "happy" | "loading" | "offline" | "paid" | "pay-failed" | "shy" | "sign" | "tired" | "welcome" | "wink";
/** Lebar asli versi -420 (tinggi 420). Dipakai untuk width/height supaya tata letak tidak meloncat. */
const LEBAR_420: Record<Ekspresi, number> = {
  angry: 366, confused: 330, cry: 373, empty: 349, glasses: 321, happy: 337, loading: 336, offline: 282,
  paid: 324, "pay-failed": 327, shy: 341, sign: 306, tired: 327, welcome: 305, wink: 325,
};
export type EkspresiKepala = "angry" | "confused" | "cry" | "glasses" | "happy" | "shy" | "smile" | "tired" | "wink";
const KEPALA_120: Record<EkspresiKepala, [number, number]> = {
  angry: [120, 118], confused: [118, 120], cry: [120, 105], glasses: [118, 120], happy: [120, 118],
  shy: [120, 117], smile: [116, 120], tired: [120, 117], wink: [114, 120],
};

type ImgTanpaSrc = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height">;

/** Maskot badan penuh. Ganti ekspresi dengan menukar gambar, jangan menempel kepala. alt kosong = hiasan. */
export function Maskot({ ekspresi, alt = "", loading = "lazy", ...p }: ImgTanpaSrc & { ekspresi: Ekspresi }) {
  const base = useFyAset();
  return <img src={`${base}/mascot/${ekspresi}-420.webp`} width={LEBAR_420[ekspresi]} height={420} alt={alt} loading={loading} decoding="async" {...p} />;
}

/** Kepala maskot kecil (notifikasi, toast, catatan). */
export function KepalaMaskot({ ekspresi, alt = "", loading = "lazy", ...p }: ImgTanpaSrc & { ekspresi: EkspresiKepala }) {
  const base = useFyAset();
  const [w, h] = KEPALA_120[ekspresi];
  return <img src={`${base}/mascot/head-${ekspresi}-120.webp`} width={w} height={h} alt={alt} loading={loading} decoding="async" {...p} />;
}

/** Gelembung bicara maskot (huruf Caveat). Jangan menutupi wajah atau judul. */
export function Gelembung({ kiri = false, className, ...p }: HTMLAttributes<HTMLSpanElement> & { kiri?: boolean }) {
  return <span className={cx("bubble", kiri && "left", className)} {...p} />;
}

/** Panggung maskot: segel di belakang, cincin putus-putus, gelembung opsional. */
export function PanggungMaskot({ ekspresi = "happy", kata, alt = "Maskot FUSIONIFY", className, eager = false }:
  { ekspresi?: Ekspresi; kata?: ReactNode; alt?: string; className?: string; eager?: boolean }) {
  return (
    <div className={cx("mascot-stage", className)}>
      <Segel className="seal-bg" />
      <svg className="seal-ring fx-oversize" viewBox="0 0 100 100" aria-hidden="true">
        <path d={SEAL_PATH} fill="none" strokeWidth={0.4} strokeDasharray="1.5 2.5" />
      </svg>
      {kata && <Gelembung>{kata}</Gelembung>}
      <Maskot ekspresi={ekspresi} alt={alt} className="body" loading={eager ? "eager" : "lazy"} />
    </div>
  );
}

/* ---------- Keadaan kosong, error, offline ---------- */
export type JenisKeadaan = "kosong" | "memuat" | "error" | "offline" | "bayar-berhasil" | "bayar-gagal";
const MASKOT_KEADAAN: Record<JenisKeadaan, Ekspresi> = {
  kosong: "empty", memuat: "loading", error: "cry", offline: "offline", "bayar-berhasil": "paid", "bayar-gagal": "pay-failed",
};
/** Satu maskot, satu judul, satu kalimat, satu tombol. Error wajib punya aksi "Coba lagi". */
export function Keadaan({ jenis, judul, teks, aksi, kecil = true, className }:
  { jenis: JenisKeadaan; judul: ReactNode; teks?: ReactNode; aksi?: ReactNode; kecil?: boolean; className?: string }) {
  const nada = jenis === "error" || jenis === "bayar-gagal" ? "error" : jenis === "offline" ? "offline" : undefined;
  return (
    <div className={cx("state", kecil && "sm", nada, className)} aria-busy={jenis === "memuat" || undefined} role={nada === "error" ? "alert" : undefined}>
      <Maskot ekspresi={MASKOT_KEADAAN[jenis]} />
      <h3>{judul}</h3>
      {teks && <p>{teks}</p>}
      {aksi && <div className="actions">{aksi}</div>}
    </div>
  );
}

/* ---------- Badge produk ---------- */
/** "Sebuah produk dari FUSIONIFY" untuk footer web produk. */
export function BadgeProduk({ bahasa = "id", tema = "dark" }: { bahasa?: "id" | "en"; tema?: "light" | "dark" }) {
  const base = useFyAset();
  const alt = bahasa === "id" ? "Sebuah produk dari FUSIONIFY" : "A product by FUSIONIFY";
  return (
    <a className="fy-badge" href="https://fusionify.id" rel="noopener">
      <img src={`${base}/badge/produk-fusionify-${bahasa}-${tema}.png`} alt={alt} width={340} height={100} loading="lazy" />
    </a>
  );
}
