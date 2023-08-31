# Aplikasi API Penggajian

API Penggajian ini dibuat dengan Node.js menggunakan framework Express.js untuk membangun API backend. Aplikasi ini bertujuan untuk mengelola data penggajian karyawan. Data tersebut disimpan dan diolah menggunakan MongoDB sebagai database.

## Instalasi

1. Pastikan Node.js telah terinstal di komputer Anda. Anda dapat mengunduhnya dari [https://nodejs.org](https://nodejs.org) dan mengikuti petunjuk instalasinya.
2. Pastikan MongoDB telah terinstal dan berjalan di komputer Anda. Anda dapat mengunduh MongoDB dari [https://www.mongodb.com](https://www.mongodb.com) dan mengikuti dokumentasinya untuk melakukan instalasi dan konfigurasi.
3. Salin repositori ini ke komputer Anda dengan cara cloning atau mengunduh ZIP.
4. Buka terminal dan arahkan ke direktori aplikasi.
5. Install semua dependensi dengan menjalankan perintah berikut:

   ```shell
   npm install
   ```

6. Konfigurasi pengaturan aplikasi yang diperlukan seperti URL MongoDB di file `.env`, Anda bisa mengubah file `.env-copy` menjadi `.env`.

## Penggunaan

1. Jalankan aplikasi dengan perintah:

   ```shell
   npm start
   ```

   Aplikasi akan berjalan pada `http://localhost:4001` atau port yang telah dikonfigurasi.

2. Anda dapat menggunakan Postman atau alat serupa untuk melakukan permintaan ke API yang disediakan oleh aplikasi. Berikut adalah beberapa contoh endpoint yang tersedia **(coming soon)**:

   - **GET /employees**: Mendapatkan daftar karyawan .
   - **GET /employees/:id**: Mendapatkan data karyawan berdasarkan ID.
   - **POST /employees**: Menambahkan karyawan baru.
   - **PUT /employees/:id**: Mengubah data karyawan berdasarkan ID.
   - **DELETE /employees/:id**: Menghapus karyawan berdasarkan ID.

   Pastikan untuk melihat dokumentasi API untuk informasi lebih lanjut mengenai endpoint dan payload yang dibutuhkan (coming soon).

## Lisensi

Aplikasi ini dilisensikan di bawah [MIT LICENSE](./LICENSE).
