// FUSIONIFY UI · nama komponen ala lucide-react untuk Ikon FUSIONIFY.
// Untuk memindahkan produk React lama dari lucide-react ke Ikon FUSIONIFY tanpa mengubah kode komponennya:
//   ganti   import { Send, Loader2 } from "lucide-react";
//   dengan  import { Send, Loader2 } from "./fusionify-ui/react/lucide";
// Gambarnya tetap Ikon FUSIONIFY (garis 2px, titik i biru muda); hanya namanya yang mengikuti lucide.
// Nama lucide yang belum dipetakan: tambahkan di daftar bawah. Bentuknya belum ada? Gambar dulu di ikon/sumber.mjs.
// Kode baru sebaiknya langsung memakai <Ikon nama="…" /> dari react/index.tsx.
import { forwardRef, type ComponentType, type SVGProps } from "react";
import { IKON_DATA, type NamaIkon } from "./ikon-data";

export type IkonProps = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string; absoluteStrokeWidth?: boolean; color?: string };
export type LucideIcon = ComponentType<IkonProps>;

export function buatIkon(nama: NamaIkon, tampil: string) {
  const data = IKON_DATA[nama] as { d: readonly string[]; t?: string };
  const K = forwardRef<SVGSVGElement, IkonProps>(({ size = 24, strokeWidth = 2, absoluteStrokeWidth: _a, color = "currentColor", className, children, ...rest }, ref) => (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden={rest["aria-label"] ? undefined : true} className={["ikon", `ikon-${nama}`, className].filter(Boolean).join(" ")} {...rest}>
      {data.d.map((d, i) => <path key={i} d={d} />)}
      {data.t && <path d={data.t} style={{ fill: "var(--ikon-titik, #539DE9)", stroke: "none" }} />}
      {children}
    </svg>
  ));
  K.displayName = tampil;
  return K;
}

/** Pakai langsung dengan nama Ikon FUSIONIFY: <Ikon nama="kirim" className="h-4 w-4" /> */
export const Ikon = forwardRef<SVGSVGElement, IkonProps & { nama: NamaIkon }>(({ nama, ...p }, ref) => { const K = CACHE[nama] ??= buatIkon(nama, nama); return <K ref={ref} {...p} />; });
Ikon.displayName = "Ikon";
const CACHE: Partial<Record<NamaIkon, ReturnType<typeof buatIkon>>> = {};

export const Activity = buatIkon("aktivitas", "Activity");
export const AlertCircle = buatIkon("awas", "AlertCircle");
export const AlertTriangle = buatIkon("peringatan", "AlertTriangle");
export const ArrowLeft = buatIkon("kembali", "ArrowLeft");
export const ArrowRight = buatIkon("maju", "ArrowRight");
export const ArrowRightLeft = buatIkon("tukar", "ArrowRightLeft");
export const ArrowUp = buatIkon("naik", "ArrowUp");
export const ArrowUpRight = buatIkon("tautan-luar", "ArrowUpRight");
export const Ban = buatIkon("larang", "Ban");
export const Banknote = buatIkon("uang", "Banknote");
export const BarChart3 = buatIkon("grafik-batang", "BarChart3");
export const Bell = buatIkon("lonceng", "Bell");
export const Bold = buatIkon("tebal", "Bold");
export const Bot = buatIkon("bot", "Bot");
export const Box = buatIkon("paket", "Box");
export const Briefcase = buatIkon("kerja", "Briefcase");
export const Building2 = buatIkon("gudang", "Building2");
export const Calendar = buatIkon("kalender", "Calendar");
export const CalendarDays = buatIkon("kalender", "CalendarDays");
export const CalendarIcon = buatIkon("kalender", "CalendarIcon");
export const Check = buatIkon("cek", "Check");
export const CheckCircle = buatIkon("berhasil", "CheckCircle");
export const CheckCircle2 = buatIkon("berhasil", "CheckCircle2");
export const ChevronDown = buatIkon("chevron-bawah", "ChevronDown");
export const ChevronLeft = buatIkon("chevron-kiri", "ChevronLeft");
export const ChevronRight = buatIkon("chevron-kanan", "ChevronRight");
export const ChevronUp = buatIkon("chevron-atas", "ChevronUp");
export const Circle = buatIkon("bulat", "Circle");
export const CircleDot = buatIkon("bulat", "CircleDot");
export const Clock = buatIkon("jam", "Clock");
export const Code = buatIkon("kode", "Code");
export const Code2 = buatIkon("kode", "Code2");
export const Copy = buatIkon("salin", "Copy");
export const Cpu = buatIkon("prosesor", "Cpu");
export const CreditCard = buatIkon("kartu", "CreditCard");
export const Database = buatIkon("database", "Database");
export const DollarSign = buatIkon("uang", "DollarSign");
export const Dot = buatIkon("kurang", "Dot");
export const Download = buatIkon("unduh", "Download");
export const Edit2 = buatIkon("edit", "Edit2");
export const Edit3 = buatIkon("edit", "Edit3");
export const ExternalLink = buatIkon("tautan-luar", "ExternalLink");
export const Eye = buatIkon("lihat", "Eye");
export const EyeOff = buatIkon("sembunyi", "EyeOff");
export const File = buatIkon("dokumen", "File");
export const FileText = buatIkon("dokumen", "FileText");
export const Filter = buatIkon("filter", "Filter");
export const FlaskConical = buatIkon("uji", "FlaskConical");
export const FolderOpen = buatIkon("folder", "FolderOpen");
export const FolderPlus = buatIkon("folder", "FolderPlus");
export const FolderTree = buatIkon("folder", "FolderTree");
export const Frown = buatIkon("galat", "Frown");
export const Globe = buatIkon("web", "Globe");
export const GripVertical = buatIkon("pegangan", "GripVertical");
export const Handshake = buatIkon("fusi", "Handshake");
export const HardDrive = buatIkon("penyimpanan", "HardDrive");
export const Hash = buatIkon("label", "Hash");
export const History = buatIkon("jam", "History");
export const Home = buatIkon("beranda", "Home");
export const Inbox = buatIkon("kotak-masuk", "Inbox");
export const Info = buatIkon("info", "Info");
export const Italic = buatIkon("miring", "Italic");
export const Key = buatIkon("kunci-api", "Key");
export const KeyRound = buatIkon("kunci-api", "KeyRound");
export const Languages = buatIkon("web", "Languages");
export const LayoutDashboard = buatIkon("dasbor", "LayoutDashboard");
export const Lightbulb = buatIkon("ide", "Lightbulb");
export const Link = buatIkon("tautan", "Link");
export const Link2 = buatIkon("tautan", "Link2");
export const List = buatIkon("daftar", "List");
export const ListOrdered = buatIkon("daftar-angka", "ListOrdered");
export const Loader2 = buatIkon("memuat", "Loader2");
export const Lock = buatIkon("kunci", "Lock");
export const LogIn = buatIkon("masuk", "LogIn");
export const LogOut = buatIkon("keluar", "LogOut");
export const Mail = buatIkon("email", "Mail");
export const MapPin = buatIkon("lokasi", "MapPin");
export const Maximize2 = buatIkon("layar-penuh", "Maximize2");
export const Megaphone = buatIkon("pengumuman", "Megaphone");
export const MemoryStick = buatIkon("memori", "MemoryStick");
export const Menu = buatIkon("menu", "Menu");
export const MessageCircle = buatIkon("pesan", "MessageCircle");
export const MessageSquare = buatIkon("pesan", "MessageSquare");
export const MessageSquareWarning = buatIkon("pesan", "MessageSquareWarning");
export const Monitor = buatIkon("layar", "Monitor");
export const Moon = buatIkon("gelap", "Moon");
export const MoreHorizontal = buatIkon("lainnya", "MoreHorizontal");
export const Package = buatIkon("paket", "Package");
export const PanelLeft = buatIkon("menu", "PanelLeft");
export const Pause = buatIkon("jeda", "Pause");
export const Pencil = buatIkon("edit", "Pencil");
export const Phone = buatIkon("telepon", "Phone");
export const PieChart = buatIkon("grafik-donat", "PieChart");
export const Play = buatIkon("putar", "Play");
export const Plus = buatIkon("tambah", "Plus");
export const Printer = buatIkon("cetak", "Printer");
export const QrCode = buatIkon("qr", "QrCode");
export const Quote = buatIkon("kutipan", "Quote");
export const Radio = buatIkon("pengumuman", "Radio");
export const RefreshCw = buatIkon("segarkan", "RefreshCw");
export const Rocket = buatIkon("progres", "Rocket");
export const RotateCcw = buatIkon("segarkan", "RotateCcw");
export const RotateCw = buatIkon("rotasi", "RotateCw");
export const Save = buatIkon("simpan", "Save");
export const ScrollText = buatIkon("dokumen", "ScrollText");
export const Search = buatIkon("cari", "Search");
export const Send = buatIkon("kirim", "Send");
export const Server = buatIkon("server", "Server");
export const Settings = buatIkon("setelan", "Settings");
export const Settings2 = buatIkon("atur", "Settings2");
export const Shield = buatIkon("perisai", "Shield");
export const ShieldAlert = buatIkon("peringatan", "ShieldAlert");
export const ShieldCheck = buatIkon("perisai", "ShieldCheck");
export const ShieldOff = buatIkon("larang", "ShieldOff");
export const ShoppingCart = buatIkon("keranjang", "ShoppingCart");
export const Smartphone = buatIkon("ponsel", "Smartphone");
export const Sparkles = buatIkon("kilau", "Sparkles");
export const Square = buatIkon("berhenti", "Square");
export const Star = buatIkon("bintang", "Star");
export const Strikethrough = buatIkon("coret", "Strikethrough");
export const Sun = buatIkon("terang", "Sun");
export const Tablet = buatIkon("ponsel", "Tablet");
export const Target = buatIkon("target", "Target");
export const Terminal = buatIkon("terminal", "Terminal");
export const Ticket = buatIkon("tiket", "Ticket");
export const TimerOff = buatIkon("jam", "TimerOff");
export const Trash2 = buatIkon("hapus", "Trash2");
export const TrendingUp = buatIkon("grafik-tren", "TrendingUp");
export const User = buatIkon("pengguna", "User");
export const UserPlus = buatIkon("tambah-pengguna", "UserPlus");
export const Users = buatIkon("tim", "Users");
export const Variable = buatIkon("kode", "Variable");
export const Wand2 = buatIkon("kilau", "Wand2");
export const Webhook = buatIkon("tautan", "Webhook");
export const Wifi = buatIkon("sinyal", "Wifi");
export const WifiOff = buatIkon("sinyal-putus", "WifiOff");
export const Wrench = buatIkon("perbaiki", "Wrench");
export const X = buatIkon("tutup", "X");
export const XCircle = buatIkon("galat", "XCircle");
export const Zap = buatIkon("petir", "Zap");
