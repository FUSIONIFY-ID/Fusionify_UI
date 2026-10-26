(function () {
// FUSIONIFY UI · bantuan dokumen cetak (invoice, penawaran, kuitansi).
// Tanpa dependensi, skrip biasa (bukan module) supaya jalan juga saat file HTML dibuka langsung dari disk.
// Fungsi tersedia di window.FYDokumen. Jalan sendiri saat halaman dibuka:
//   <tr data-item data-qty="2" data-harga="1500000">     → kolom [data-jumlah] terisi qty × harga
//   [data-subtotal] [data-diskon="250000"] [data-pajak-persen="11"] [data-total]
//   [data-terbilang]  → total dalam kata ("Satu juta lima ratus ribu rupiah")
//   [data-rupiah="1500000"] → ditulis "Rp1.500.000"
//   [data-tanggal]   → kosong? diisi tanggal hari ini (format Indonesia)
//   .segel           → diisi bentuk segel 12 lekukan (warna = color elemen)

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];

function terbilang(n) {
  n = Math.floor(Math.abs(Number(n) || 0));
  if (n < 12) return SATUAN[n];
  if (n < 20) return `${terbilang(n - 10)} belas`;
  if (n < 100) return `${terbilang(Math.floor(n / 10))} puluh ${terbilang(n % 10)}`.trim();
  if (n < 200) return `seratus ${terbilang(n - 100)}`.trim();
  if (n < 1000) return `${terbilang(Math.floor(n / 100))} ratus ${terbilang(n % 100)}`.trim();
  if (n < 2000) return `seribu ${terbilang(n - 1000)}`.trim();
  const besar = [[1e12, "triliun"], [1e9, "miliar"], [1e6, "juta"], [1e3, "ribu"]];
  for (const [v, nama] of besar) {
    if (n >= v) return `${terbilang(Math.floor(n / v))} ${nama} ${terbilang(n % v)}`.trim();
  }
  return "";
}

function kalimatRupiah(n) {
  const t = terbilang(n) || "nol";
  return `${t.charAt(0).toUpperCase()}${t.slice(1)} rupiah`;
}

const rupiah = (n) => `Rp${Math.round(Number(n) || 0).toLocaleString("id-ID")}`;

function tanggalIndonesia(d = new Date()) {
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const SEGEL = "M0.960 0.500L0.972 0.519L0.981 0.538L0.984 0.557L0.981 0.576L0.971 0.594L0.956 0.609L0.939 0.624L0.922 0.637L0.908 0.651L0.899 0.665L0.895 0.682L0.895 0.701L0.898 0.723L0.900 0.745L0.899 0.767L0.894 0.786L0.883 0.802L0.867 0.813L0.847 0.821L0.825 0.825L0.804 0.828L0.784 0.833L0.768 0.840L0.755 0.851L0.745 0.866L0.736 0.885L0.727 0.905L0.716 0.925L0.703 0.940L0.687 0.951L0.668 0.955L0.647 0.953L0.626 0.947L0.605 0.939L0.586 0.932L0.568 0.928L0.551 0.929L0.534 0.936L0.518 0.947L0.500 0.960L0.481 0.972L0.462 0.981L0.443 0.984L0.424 0.981L0.406 0.971L0.391 0.956L0.376 0.939L0.363 0.922L0.349 0.908L0.335 0.899L0.318 0.895L0.299 0.895L0.277 0.898L0.255 0.900L0.233 0.899L0.214 0.894L0.198 0.883L0.187 0.867L0.179 0.847L0.175 0.825L0.172 0.804L0.167 0.784L0.160 0.768L0.149 0.755L0.134 0.745L0.115 0.736L0.095 0.727L0.075 0.716L0.060 0.703L0.049 0.687L0.045 0.668L0.047 0.647L0.053 0.626L0.061 0.605L0.068 0.586L0.072 0.568L0.071 0.551L0.064 0.534L0.053 0.518L0.040 0.500L0.028 0.481L0.019 0.462L0.016 0.443L0.019 0.424L0.029 0.406L0.044 0.391L0.061 0.376L0.078 0.363L0.092 0.349L0.101 0.335L0.105 0.318L0.105 0.299L0.102 0.277L0.100 0.255L0.101 0.233L0.106 0.214L0.117 0.198L0.133 0.187L0.153 0.179L0.175 0.175L0.196 0.172L0.216 0.167L0.232 0.160L0.245 0.149L0.255 0.134L0.264 0.115L0.273 0.095L0.284 0.075L0.297 0.060L0.313 0.049L0.332 0.045L0.353 0.047L0.374 0.053L0.395 0.061L0.414 0.068L0.432 0.072L0.449 0.071L0.466 0.064L0.482 0.053L0.500 0.040L0.519 0.028L0.538 0.019L0.557 0.016L0.576 0.019L0.594 0.029L0.609 0.044L0.624 0.061L0.637 0.078L0.651 0.092L0.665 0.101L0.682 0.105L0.701 0.105L0.723 0.102L0.745 0.100L0.767 0.101L0.786 0.106L0.802 0.117L0.813 0.133L0.821 0.153L0.825 0.175L0.828 0.196L0.833 0.216L0.840 0.232L0.851 0.245L0.866 0.255L0.885 0.264L0.905 0.273L0.925 0.284L0.940 0.297L0.951 0.313L0.955 0.332L0.953 0.353L0.947 0.374L0.939 0.395L0.932 0.414L0.928 0.432L0.929 0.449L0.936 0.466L0.947 0.482L0.960 0.500Z";

function pasangSegel(root = document) {
  root.querySelectorAll(".segel:not([data-siap])").forEach((el) => {
    el.setAttribute("data-siap", "");
    el.innerHTML = `<svg viewBox="0 0 1 1" aria-hidden="true"><path d="${SEGEL}" fill="currentColor"/></svg>`;
  });
}

function hitung(root = document) {
  pasangSegel(root);
  let subtotal = 0;
  root.querySelectorAll("[data-item]").forEach((tr) => {
    const qty = Number(tr.dataset.qty || 1);
    const harga = Number(tr.dataset.harga || 0);
    const jumlah = qty * harga;
    subtotal += jumlah;
    const q = tr.querySelector("[data-qty-teks]");
    if (q) q.textContent = qty.toLocaleString("id-ID");
    const h = tr.querySelector("[data-harga-teks]");
    if (h) h.textContent = rupiah(harga);
    const j = tr.querySelector("[data-jumlah]");
    if (j) j.textContent = rupiah(jumlah);
  });
  const dEl = root.querySelector("[data-diskon]");
  const diskon = dEl ? Number(dEl.dataset.diskon || 0) : 0;
  const pEl = root.querySelector("[data-pajak-persen]");
  const persen = pEl ? Number(pEl.dataset.pajakPersen || 0) : 0;
  const dasar = Math.max(0, subtotal - diskon);
  const pajak = Math.round((dasar * persen) / 100);
  const total = dasar + pajak;
  root.querySelectorAll("[data-subtotal]").forEach((e) => (e.textContent = rupiah(subtotal)));
  if (dEl) dEl.textContent = diskon ? `−${rupiah(diskon)}` : rupiah(0);
  if (pEl) pEl.textContent = rupiah(pajak);
  root.querySelectorAll("[data-total]").forEach((e) => (e.textContent = rupiah(total)));
  root.querySelectorAll("[data-terbilang]").forEach((e) => {
    const n = e.dataset.terbilang ? Number(e.dataset.terbilang) : total;
    e.textContent = kalimatRupiah(n);
  });
  root.querySelectorAll("[data-rupiah]").forEach((e) => (e.textContent = rupiah(e.dataset.rupiah)));
  root.querySelectorAll("[data-tanggal]").forEach((e) => {
    if (!e.textContent.trim()) e.textContent = tanggalIndonesia();
  });
  return { subtotal, diskon, pajak, total };
}

if (typeof window !== "undefined") window.FYDokumen = { terbilang, kalimatRupiah, rupiah, tanggalIndonesia, hitung, pasangSegel };
if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => hitung());
  else hitung();
}
})();
