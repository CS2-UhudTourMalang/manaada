# UmrohPas MVP

Bahasa Indonesia marketplace demo untuk mencari dan membandingkan paket umroh dari berbagai agen. Dibuat sebagai aplikasi statis tanpa dependensi build agar bisa langsung dijalankan di live preview.

## Menjalankan lokal

Dari direktori proyek, jalankan server statis:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Lalu buka `http://localhost:4173`.

## Fitur demo

- Rentang tanggal keberangkatan berbentuk kalender dan durasi program wajib dipilih sebelum hasil ditampilkan.
- Filter multi-select untuk tipe penerbangan bertingkat, bandara, maskapai, kategori bintang, serta hotel.
- Rentang jarak hotel 0–2.000 meter dengan dua handle; hotel yang tidak sesuai tetap ditampilkan dalam keadaan nonaktif.
- 74 pilihan jadwal simulasi dari seluruh 32 bandara yang dicantumkan, dengan sorting, detail paket, dan perbandingan hingga tiga paket.
- Paket, harga, agen, rating, jadwal, dan ketersediaan di dalam MVP adalah data simulasi.
