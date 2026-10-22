# Pose maskot tambahan

Enam pose ini dibuat 22 Oktober 2026 dengan tiga pose asli sebagai acuan (`happy`, `glasses`, `tired`), dihapus latarnya, dicek pemilik maskot, lalu dipasang di kit. File aslinya (PNG transparan 1136x1408 px) ada di desain Canva **"Pose Maskot FUSIONIFY"** milik akun FUSIONIFY, satu pose per halaman: https://canva.link/i44f5h8y8hcouk0

| Pose | Dipakai untuk | File |
| --- | --- | --- |
| Selamat datang (berlari sambil melambai) | layar pertama, selesai daftar | `welcome.webp`, `welcome-420.webp` |
| Memuat (memutar cincin biru di jari) | loading lama, data sedang disiapkan | `loading.webp`, `loading-420.webp` |
| Kosong (nyungsep ke kardus kosong) | belum ada data, hasil pencarian kosong | `empty.webp`, `empty-420.webp` |
| Sukses bayar (melompat, struk centang, konfeti) | pembayaran berhasil | `paid.webp`, `paid-420.webp` |
| Gagal bayar (berlutut lebay, kartu tanda X, awan mendung) | pembayaran gagal, kartu ditolak | `pay-failed.webp`, `pay-failed-420.webp` |
| Offline (jinjit mengangkat HP mencari sinyal) | tidak ada internet | `offline.webp`, `offline-420.webp` |

Ukuran `-420.webp` (tinggi 420px) dipakai di halaman. Tulis `width`/`height` sesuai file, misalnya `offline-420.webp` 282x420.

## Menambah pose berikutnya

1. Buat pose dengan beberapa pose asli sekaligus sebagai acuan, lalu jajarkan dengan pose lama.
2. Hapus latarnya, ekspor PNG transparan, taruh di `mascot/source/`.
3. Jalankan `python3 scripts/mascot-import.py`. Skrip membuat `nama.webp` (tinggi 720px) dan `nama-420.webp` (tinggi 420px).
4. Pindahkan PNG asli keluar dari repo (simpan di Canva atau drive), supaya repo tetap ringan.
5. Cek tampilannya di halaman yang memakai pose itu, di tema terang dan gelap, lalu catat di CHANGELOG.

## Aturan

- Yang wajib sama: wajah, mata abu tua, rambut putih ujung biru dengan satu helai mencuat, pipi merah, garis tebal merah tua.
- Baju bawaan: jaket hitam terbuka (kerah dan ujung lengan abu) dengan kaus putih, celana hitam. Boleh ganti kalau situasinya butuh (jas hujan, jaket tebal, kostum acara).
- Pose dan ekspresi bebas, yang penting hidup dan tidak kaku.
- Kalau ada pose yang wajah atau bajunya meleset dari aslinya, jangan dipasang. Buat ulang atau minta ilustrator.
- Pose ini dibuat dengan AI Canva dari maskot milik FUSIONIFY. Sebelum dipakai di materi promosi besar, cek dulu ketentuan pemakaian gambar AI Canva.
