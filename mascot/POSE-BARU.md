# Pose maskot baru (draf, menunggu dipasang)

Enam pose ini dibuat 22 Oktober 2026 dengan tiga pose asli sebagai acuan (`happy`, `glasses`, `tired`) dan sudah dihapus latarnya. Ukuran aslinya 1136x1408 px. Filenya masih di akun Canva FUSIONIFY dan belum masuk repo, karena harus dicek dulu oleh pemilik maskot: wajah, rambut, hoodie, dan garisnya harus sama dengan pose lama.

| Pose | Dipakai untuk | Nama file di repo | Canva (latar transparan) |
| --- | --- | --- | --- |
| Selamat datang (berlari sambil melambai) | layar pertama, selesai daftar | `welcome.webp` | MAHYtFXPDdY |
| Memuat (memutar cincin biru di jari) | loading lama, proses | `loading.webp` | MAHYtNH7n18 |
| Kosong (menyelam ke kardus kosong) | belum ada data, hasil pencarian kosong | `empty.webp` | MAHYtMETDf0 |
| Sukses bayar (melompat, struk centang, konfeti) | pembayaran berhasil | `paid.webp` | MAHYtCmKGnE |
| Gagal bayar (berlutut lebay, kartu tanda X, awan mendung) | pembayaran gagal, kartu ditolak | `pay-failed.webp` | MAHYtBUBx_U |
| Offline (jinjit mencari sinyal) | tidak ada internet | `offline.webp` | MAHYtKpgyvo |

Tautan Canva: `https://www.canva.com/M/<kode di atas>`

## Cara memasang

1. Buka tiap tautan Canva, unduh sebagai PNG (latar transparan).
2. Kirim PNG-nya ke Claude, atau taruh di `mascot/source/` lalu jalankan `python3 scripts/mascot-import.py`.
3. Skrip membuat `nama.webp` (tinggi 720px) dan `nama-420.webp` (tinggi 420px), sama seperti pose lama.
4. Cek tampilannya di halaman yang memakai pose itu, di tema terang dan gelap.

## Aturan

- Yang wajib sama: wajah, mata abu tua, rambut putih ujung biru dengan satu helai mencuat, pipi merah, garis tebal merah tua.
- Baju bawaan: jaket hitam terbuka (kerah dan ujung lengan abu) dengan kaus putih, celana hitam. Boleh ganti kalau situasinya butuh (jas hujan, jaket tebal, kostum acara).
- Pose dan ekspresi bebas, yang penting hidup dan tidak kaku.
- Kalau ada pose yang wajah atau bajunya meleset dari aslinya, jangan dipasang. Buat ulang atau minta ilustrator.
- Pose ini dibuat dengan AI Canva dari maskot milik FUSIONIFY. Sebelum dipakai di materi promosi besar, cek dulu ketentuan pemakaian gambar AI Canva.
