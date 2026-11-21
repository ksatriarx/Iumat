IUMAT — TAHAP 1: DETAIL BERITA TERHUBUNG

Isi paket:
- index.html: homepage master dengan perubahan terbatas pada tautan berita utama.
- berita.html: template halaman detail berita.
- css/berita.css: stylesheet khusus halaman detail.
- js/berita-data.js: data artikel contoh berdasarkan slug.
- js/berita.js: renderer halaman detail.

Perubahan pada homepage:
- Hanya berita pertama pada Hero Slider yang dihubungkan ke halaman detail.
- Judul berita dapat diklik.
- Area kartu berita utama dapat diklik, kecuali tombol kontrol slider.
- Tautan tujuan: berita.html?slug=umkm-lokal-kekuatan-ekonomi-aceh-timur
- Slide kedua dan ketiga tidak diarahkan ke artikel ini.
- Tidak mengubah susunan bagian lain, desain navigasi, maupun fungsi slider.

Cara mencoba:
1. Ekstrak seluruh isi ZIP ke satu folder.
2. Pastikan index.html, berita.html, folder css, dan folder js berada pada susunan seperti di dalam ZIP.
3. Buka index.html melalui server lokal atau hosting.
4. Pada Hero Slide pertama, klik judul atau area berita utama (bukan tombol panah/dot).
5. Halaman berita.html akan membuka artikel berdasarkan slug.

Catatan:
Naskah artikel di js/berita-data.js masih merupakan konten demonstrasi dan perlu diganti dengan naskah redaksi yang sudah diverifikasi sebelum publikasi.

Pemeriksaan yang dilakukan:
- HTML berhasil diparse.
- Inline JavaScript berhasil melewati pemeriksaan sintaks Node.js.
- Perbandingan dengan master menunjukkan perubahan hanya pada CSS tautan judul dan JavaScript interaksi Hero.
- Belum dilakukan pengujian browser langsung pada perangkat HP/desktop.
