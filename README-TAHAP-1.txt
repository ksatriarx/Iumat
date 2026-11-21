IUMAT — Tahap 1: Detail Berita (prototipe awal)

Isi:
- index.html: file homepage master yang diunggah pengguna; tidak diubah.
- berita.html: template halaman detail berita.
- css/berita.css: gaya khusus halaman detail.
- js/berita-data.js: data contoh artikel berbasis slug.
- js/berita.js: renderer artikel, breadcrumb, berbagi, salin tautan, dan menu mobile.

Cara melihat:
1. Ekstrak seluruh ZIP.
2. Buka melalui local web server (disarankan), bukan membuka file berita.html sendirian jika browser membatasi fitur tertentu.
3. Akses berita.html?slug=umkm-lokal-kekuatan-ekonomi-aceh-timur

Catatan:
- Ini masih prototipe tahap pertama dan baru memuat satu artikel contoh.
- Naskah artikel diberi catatan demo dan belum boleh dianggap sebagai berita faktual terverifikasi.
- Homepage sengaja tidak diubah dan belum dihubungkan ke halaman detail. Penghubung kartu berita akan dikerjakan setelah tampilan dan perilaku halaman detail disetujui.
- URL bersih seperti /berita/nama-artikel membutuhkan konfigurasi server/routing saat deployment. Untuk prototipe statis digunakan berita.html?slug=...
