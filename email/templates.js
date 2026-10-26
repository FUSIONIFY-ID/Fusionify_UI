// FUSIONIFY UI · template email siap pakai, dibangun dari renderEmail().
// Setiap fungsi menerima data + opsi umum ({ merek, aset, alasan }) dan mengembalikan { subject, html, text }.
//
//   import { kodeVerifikasi } from "./templates.js";
//   const mail = kodeVerifikasi({ nama: "Budi", kode: "482913", menit: 10 }, { merek, aset });
//
// Teks ditulis santai dan jelas, tanpa em dash. Ubah kalimatnya di sini, bukan di tiap produk.
import { renderEmail } from "./fy-email.js";

const sapa = (nama) => (nama ? ["Halo ", { b: nama }, ","] : ["Halo,"]);

export function kodeVerifikasi({ nama, kode, menit = 10, layanan = "akunmu" }, opsi = {}) {
  return renderEmail({
    ...opsi,
    subject: `${kode} adalah kode verifikasimu`,
    pratinjau: `Kode berlaku ${menit} menit. Jangan bagikan ke siapa pun.`,
    maskot: "wink",
    kicker: "Verifikasi",
    judul: "Kode verifikasi",
    isi: [
      { p: [...sapa(nama), ` pakai kode ini untuk masuk ke ${layanan}:`] },
      { kode, keterangan: `Berlaku ${menit} menit.` },
      { catatan: { nada: "warn", teks: "Tim kami tidak pernah meminta kode ini. Jangan bagikan ke siapa pun, termasuk yang mengaku admin." } },
      { kecil: "Tidak merasa meminta kode? Abaikan email ini; akunmu tetap aman." },
    ],
  });
}

export function aturUlangPassword({ nama, url, menit = 30 }, opsi = {}) {
  return renderEmail({
    ...opsi,
    subject: "Atur ulang password",
    pratinjau: `Tautan berlaku ${menit} menit.`,
    maskot: "glasses",
    kicker: "Keamanan akun",
    judul: "Atur ulang password",
    isi: [
      { p: [...sapa(nama), " kami menerima permintaan untuk mengganti password akunmu."] },
      { tombol: { teks: "Buat password baru", url } },
      { kecil: [`Tautan berlaku ${menit} menit. Kalau tombol tidak bisa diklik, salin alamat ini: `, { a: url, url }] },
      { catatan: { nada: "info", teks: "Bukan kamu yang meminta? Abaikan email ini. Password lama tetap berlaku." } },
    ],
  });
}

export function selamatDatang({ nama, url, langkah = /** @type {Array<string | object>} */ ([]) }, opsi = {}) {
  return renderEmail({
    ...opsi,
    subject: "Selamat datang",
    pratinjau: "Akunmu sudah siap dipakai.",
    maskot: "welcome",
    kicker: "Akun baru",
    judul: "Selamat datang",
    isi: [
      { p: [...sapa(nama), " akunmu sudah siap. Ini langkah pertama yang bisa kamu coba:"] },
      ...(langkah.length ? [{ daftar: langkah }] : []),
      ...(url ? [{ tombol: { teks: "Buka dashboard", url } }] : []),
    ],
  });
}

export function pengajuanDisetujui({ nama, hal = "Pendaftaran merchant", url, langkah = /** @type {Array<string | object>} */ ([]) }, opsi = {}) {
  return renderEmail({
    ...opsi,
    subject: `${hal} disetujui`,
    pratinjau: "Kabar baik: pengajuanmu sudah disetujui.",
    maskot: "happy",
    kicker: "Disetujui",
    judul: `${hal} disetujui`,
    isi: [
      { p: [...sapa(nama), ` ${hal.toLowerCase()} kamu sudah kami tinjau dan disetujui.`] },
      { status: { teks: "Aktif", nada: "go" } },
      ...(langkah.length ? [{ judul2: "Langkah berikutnya" }, { daftar: langkah }] : []),
      ...(url ? [{ tombol: { teks: "Buka dashboard", url } }] : []),
    ],
  });
}

export function pengajuanDitolak({ nama, hal = "Pendaftaran merchant", alasanTolak, kontakUrl }, opsi = {}) {
  return renderEmail({
    ...opsi,
    subject: `${hal} belum bisa disetujui`,
    pratinjau: "Ada yang perlu dilengkapi dulu.",
    maskot: "confused",
    kicker: "Perlu dilengkapi",
    judul: `${hal} belum disetujui`,
    isi: [
      { p: [...sapa(nama), ` terima kasih sudah mendaftar. Untuk saat ini ${hal.toLowerCase()} kamu belum bisa kami setujui.`] },
      ...(alasanTolak ? [{ catatan: { nada: "danger", teks: ["Alasannya: ", alasanTolak] } }] : []),
      { p: "Kamu bisa memperbaiki datanya lalu mengajukan lagi. Kalau ada yang kurang jelas, balas email ini atau hubungi kami." },
      ...(kontakUrl ? [{ tombol: { teks: "Hubungi kami", url: kontakUrl } }] : []),
    ],
  });
}

export function pembayaranBerhasil({ nama, nomor, jumlah, metode = "QRIS", waktu, url }, opsi = {}) {
  return renderEmail({
    ...opsi,
    subject: `Pembayaran ${nomor} diterima`,
    pratinjau: `${jumlah} sudah kami terima.`,
    maskot: "paid",
    kicker: "Pembayaran",
    judul: "Pembayaran diterima",
    isi: [
      { p: [...sapa(nama), " pembayaranmu sudah kami terima. Terima kasih!"] },
      { rincian: [["Nomor", nomor], ["Jumlah", jumlah], ["Metode", metode], ...(waktu ? [["Waktu", waktu]] : [])] },
      ...(url ? [{ tombol: { teks: "Lihat bukti pembayaran", url } }] : []),
    ],
  });
}

export function pembayaranGagal({ nama, nomor, jumlah, alasanGagal, url }, opsi = {}) {
  return renderEmail({
    ...opsi,
    subject: `Pembayaran ${nomor} belum berhasil`,
    pratinjau: "Pembayaran belum masuk. Coba lagi lewat tautan di email ini.",
    maskot: "pay-failed",
    kicker: "Pembayaran",
    judul: "Pembayaran belum berhasil",
    isi: [
      { p: [...sapa(nama), " pembayaran untuk tagihan ini belum berhasil."] },
      { rincian: [["Nomor", nomor], ["Jumlah", jumlah]] },
      ...(alasanGagal ? [{ catatan: { nada: "danger", teks: alasanGagal } }] : []),
      ...(url ? [{ tombol: { teks: "Coba bayar lagi", url } }] : []),
      { kecil: "Saldo atau uangmu terpotong tapi status belum berubah? Balas email ini dengan bukti transfer, kami bantu cek." },
    ],
  });
}

// status: "diproses" | "selesai" (uang sudah dikirim) | "ditolak". Nomor rekening otomatis disamarkan (4 digit terakhir).
export function statusPenarikan({ nama, status, jumlah, diterima, bank, rekening, atasNama, catatan: cat, url }, opsi = {}) {
  const selesai = status === "selesai";
  const ok = selesai || status === "diproses" || status === "disetujui";
  const samar = rekening ? `•••• ${String(rekening).replace(/\s/g, "").slice(-4)}` : "-";
  return renderEmail({
    ...opsi,
    subject: !ok ? "Penarikan saldo ditolak" : selesai ? "Penarikan saldo berhasil" : "Penarikan saldo diproses",
    pratinjau: !ok ? "Saldo dikembalikan ke akunmu." : selesai ? `${diterima || jumlah} sudah dikirim ke rekeningmu.` : `${jumlah} sedang diproses.`,
    maskot: !ok ? "confused" : selesai ? "paid" : "happy",
    kicker: "Penarikan saldo",
    judul: !ok ? "Penarikan ditolak" : selesai ? "Penarikan berhasil" : "Penarikan diproses",
    isi: [
      { p: [...sapa(nama), !ok ? " pengajuan penarikan saldomu belum bisa diproses. Saldonya sudah dikembalikan ke akunmu."
        : selesai ? " dana penarikanmu sudah kami kirim ke rekening tujuan." : " pengajuan penarikan saldomu sudah disetujui dan sedang diproses."] },
      { status: { teks: !ok ? "Ditolak" : selesai ? "Selesai" : "Diproses", nada: !ok ? "eos" : "go" } },
      { rincian: [["Jumlah", jumlah], ...(ok && diterima ? [["Diterima", diterima]] : []), ["Bank", bank || "-"], ["Rekening", samar], ["Atas nama", atasNama || "-"]] },
      ...(cat ? [{ catatan: { nada: ok ? "info" : "danger", teks: cat } }] : []),
      ...(selesai ? [{ kecil: "Waktu dana masuk mengikuti bank tujuan. Belum masuk dalam 1 x 24 jam? Balas email ini." }] : []),
      ...(url ? [{ tombol: { teks: "Lihat riwayat saldo", url } }] : []),
    ],
  });
}

export function pemberitahuan({ nama, judul, kicker = "Pemberitahuan", paragraf = /** @type {Array<string | object>} */ ([]), tombol, maskot = "glasses" }, opsi = {}) {
  return renderEmail({
    ...opsi,
    subject: judul,
    pratinjau: paragraf[0] ? String(paragraf[0]).slice(0, 110) : judul,
    maskot,
    kicker,
    judul,
    isi: [{ p: sapa(nama) }, ...paragraf.map((p) => ({ p })), ...(tombol ? [{ tombol }] : [])],
  });
}
