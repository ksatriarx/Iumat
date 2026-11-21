IUMAT — TAHAP 1 LANJUTAN: SEMUA KARTU BERITA TERHUBUNG

Isi paket:
- index.html: homepage dari master yang sudah diperbaiki offset desktop, dengan tautan untuk Hero, Top 10, Berita Pilihan, dan Berita Terkini.
- berita.html: satu template untuk seluruh artikel.
- css/berita.css: stylesheet khusus halaman detail.
- js/berita-data.js: data artikel berdasarkan slug.
- js/berita.js: renderer halaman detail dan tautan berita terkait.

Yang sekarang dapat diklik:
1. Semua slide Hero (setiap slide menuju artikel masing-masing).
2. Kedua kartu Top 10 yang terlihat; tautannya ikut berubah sesuai slide Top 10 yang sedang tampil. Seluruh 10 item Top 10 memiliki slug.
3. Empat kartu Berita Pilihan.
4. Tiga item Berita Terkini.
5. Berita terkait pada halaman detail.

Cara memasang:
1. Cadangkan folder proyek IUMAT terlebih dahulu.
2. Ekstrak ZIP ini.
3. Ganti index.html dengan index.html dari ZIP.
4. Salin berita.html serta folder css dan js ke folder proyek. Gabungkan folder; jangan menghapus file lama lain yang tidak disebutkan.
5. Pastikan struktur berita.html, css/berita.css, js/berita.js, dan js/berita-data.js berada sejajar seperti di dalam ZIP.
6. Buka homepage melalui hosting atau server lokal, lalu klik kartu-kartu berita.

Format tautan: berita.html?slug=nama-artikel

Catatan konten:
- Artikel utama sebelumnya tetap dipertahankan.
- Artikel tambahan dibuat sebagai konten demonstrasi agar setiap kartu dapat diuji dan menuju artikel yang tepat.
- Konten demonstrasi bukan laporan jurnalistik terverifikasi. Redaksi perlu mengganti/memeriksa naskah, tanggal, dan foto sebelum publikasi.

Perubahan homepage dibatasi pada data slug, tautan/interaksi kartu berita, dan fokus keyboard. Perbaikan offset desktop 145px yang sudah disetujui tetap dipertahankan; offset mobile tetap 88px.

Validasi yang dilakukan: parsing HTML, pemeriksaan sintaks JavaScript, pemeriksaan slug/link antarhalaman, dan uji browser lokal desktop/mobile jika runtime browser tersedia.
