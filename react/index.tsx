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
import { IKON_DATA, SOSMED_DATA } from "./ikon-data";
import type { NamaIkon, NamaSosmed } from "./ikon-data";
export type { NamaIkon, NamaSosmed } from "./ikon-data";

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

/* ---------- Ikon FUSIONIFY ----------
   <Ikon nama="cari" />                       dekoratif (aria-hidden)
   <Ikon nama="hapus" label="Hapus pesanan" />  berdiri sendiri, dibacakan pembaca layar
   <IkonStiker nama="dompet" nada="biru" />     ubin stiker (kartu fitur, KPI)
   <IkonSosmed nama="instagram" />              logo sosmed satu warna
   Path digambar langsung (tanpa sprite), jadi tidak perlu memuat ikon/ikon.svg. */
type PropsIkon = Omit<SVGProps<SVGSVGElement>, "children"> & { label?: string; polos?: boolean };

export function Ikon({ nama, label, polos = false, className, ...p }: PropsIkon & { nama: NamaIkon }) {
  const i = IKON_DATA[nama] as { d: readonly string[]; t?: string };
  return (
    <svg viewBox="0 0 24 24" className={cx("ikon", polos && "polos", className)} role={label ? "img" : undefined}
      aria-label={label} aria-hidden={label ? undefined : true} focusable="false" {...p}>
      {i.d.map((d) => <path key={d} d={d} />)}
      {i.t ? <path className="t" d={i.t} style={{ fill: "var(--ikon-titik)", stroke: "none" }} /> : null}
    </svg>
  );
}

export function IkonSosmed({ nama, label, className, ...p }: PropsIkon & { nama: NamaSosmed }) {
  const s = SOSMED_DATA[nama];
  return (
    <svg viewBox="0 0 24 24" className={cx("ikon", className)} role={label ? "img" : undefined}
      aria-label={label} aria-hidden={label ? undefined : true} focusable="false" {...p}>
      <path d={s.d} style={{ fill: "currentColor", stroke: "none" }} />
    </svg>
  );
}

export function IkonStiker({ nama, nada = "putih", kecil = false, label, className }:
  { nama: NamaIkon; nada?: "putih" | "biru" | "tint"; kecil?: boolean; label?: string; className?: string }) {
  return (
    <span className={cx("ikon-stiker", nada !== "putih" && nada, kecil && "kecil", className)}>
      <Ikon nama={nama} label={label} />
    </span>
  );
}

export function IkonSegel({ nama, biru = false, label, className }: { nama: NamaIkon; biru?: boolean; label?: string; className?: string }) {
  return (
    <span className={cx("ikon-segel", biru && "biru", className)}>
      <Ikon nama={nama} label={label} />
    </span>
  );
}

/** Daftar tautan sosmed resmi. Isi hanya akun yang benar-benar ada. */
export function TautanSosmed({ akun }: { akun: Array<{ nama: NamaSosmed; url: string; label: string }> }) {
  return (
    <ul className="sosmed">
      {akun.map((a) => (
        <li key={a.nama}><a href={a.url} target="_blank" rel="noopener" aria-label={a.label}><IkonSosmed nama={a.nama} /></a></li>
      ))}
    </ul>
  );
}

/* ---------- Komponen 1.13 ---------- */
const angkaId = (n: number, d = 1) => n.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });
export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");

/** Breadcrumb. Item terakhir = halaman sekarang (tanpa href). */
export function Remah({ item, label = "Lokasi halaman" }: { item: Array<{ teks: string; href?: string }>; label?: string }) {
  return (
    <nav className="breadcrumb" aria-label={label}>
      <ol>{item.map((x, i) => <li key={i}>{x.href && i < item.length - 1 ? <a href={x.href}>{x.teks}</a> : <span aria-current="page">{x.teks}</span>}</li>)}</ol>
    </nav>
  );
}

/** Rating tampil (0 sampai 5). Jumlah ulasan wajib asli. */
export function Rating({ nilai, ulasan, besar = false, className }: { nilai: number; ulasan?: number; besar?: boolean; className?: string }) {
  const v = Math.max(0, Math.min(5, nilai));
  return (
    <span className={cx("rating", besar && "lg", className)} style={{ ["--nilai" as string]: v }} role="img" aria-label={`Rating ${angkaId(v)} dari 5${ulasan != null ? `, ${ulasan} ulasan` : ""}`}>
      <span className="stars" aria-hidden="true" />{angkaId(v)}{ulasan != null ? <small>({ulasan.toLocaleString("id-ID")})</small> : null}
    </span>
  );
}

/** Harga dalam Rupiah, dengan harga coret opsional. Angka wajib asli. */
export function Harga({ harga, coret, besar = false, className }: { harga: number; coret?: number; besar?: boolean; className?: string }) {
  return (
    <p className={cx("harga", besar && "lg", className)}>
      {rupiah(harga)}{coret ? <s><span className="sr-only">Harga sebelumnya </span>{rupiah(coret)}</s> : null}
    </p>
  );
}

/** Kartu produk. Gambar wajib punya width/height; tombol aksi lewat children. */
export function KartuProduk({ judul, href, gambar, kategori, harga, coret, nilai, habis = false, contain = false, children }:
  { judul: string; href: string; gambar: { src: string; width: number; height: number; alt?: string }; kategori?: string; harga: number; coret?: number; nilai?: number; habis?: boolean; contain?: boolean; children?: ReactNode }) {
  const diskon = coret && coret > harga ? Math.round((1 - harga / coret) * 100) : 0;
  return (
    <article className={cx("product-card", habis && "habis")}>
      <div className={cx("pc-media", contain && "contain")}>
        <img src={gambar.src} alt={gambar.alt ?? ""} width={gambar.width} height={gambar.height} loading="lazy" />
        {diskon > 0 ? <span className="pc-diskon">-{diskon}%</span> : null}
      </div>
      <div className="pc-body">
        {kategori ? <span className="pc-cat">{kategori}</span> : null}
        <h3 className="pc-title"><a href={href}>{judul}</a></h3>
        {nilai != null ? <Rating nilai={nilai} /> : null}
        <Harga harga={harga} coret={coret} />
        {children ? <div className="pc-actions">{children}</div> : null}
      </div>
    </article>
  );
}

/** Linimasa. status: "done" (selesai), "now" (sedang), "fail" (gagal), atau kosong (belum). */
export function Linimasa({ langkah }: { langkah: Array<{ judul: string; waktu?: string; teks?: string; status?: "done" | "now" | "fail" }> }) {
  return (
    <ol className="timeline">
      {langkah.map((l, i) => (
        <li key={i} className={l.status} aria-current={l.status === "now" ? "step" : undefined}>
          {l.waktu ? <span className="tl-time">{l.waktu}</span> : null}<b className="tl-title">{l.judul}</b>{l.teks ? <p>{l.teks}</p> : null}
        </li>
      ))}
    </ol>
  );
}

/** Hitung mundur. Angka diisi js/controls.js (initControls) dari atribut data-tenggat. */
export function HitungMundur({ tenggat, label = "Sisa waktu" }: { tenggat: string | Date; label?: string }) {
  const iso = typeof tenggat === "string" ? tenggat : tenggat.toISOString();
  const unit: Array<[string, string]> = [["hari", "hari"], ["jam", "jam"], ["menit", "menit"], ["detik", "detik"]];
  return (
    <div className="countdown" data-tenggat={iso} role="timer" aria-label={label}>
      {unit.map(([k, t]) => <span className="cd-unit" key={k}><b data-cd={k}>--</b><small>{t}</small></span>)}
    </div>
  );
}

/** Tombol keyboard, mis. <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> */
export function Kbd({ className, ...p }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cx("kbd", className)} {...p} />;
}
