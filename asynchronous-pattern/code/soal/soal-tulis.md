## 🧩 **Level Dasar (Pemahaman Konsep)**

1. Jelaskan perbedaan utama antara **synchronous** dan **asynchronous** di Node.js.
   - **Synchronous** => kode dieksekusi berurutan satu per satu, baris berikutnya nunggu baris sebelumnya selesai.
   - **Asynchronous** => kode bisa jalan paralel/non-blok; baris berikutnya tetap lanjut meski proses lain belum selesai (misalnya baca file, koneksi HTTP, dsb).
2. Mengapa Node.js menggunakan **non-blocking I/O**?
   - Agar **Node JS** bisa menangani banyak koneksi secara bersamaan tanpa Macet.
3. Apa perbedaan antara **callback**, **Promise**, dan **async/await** dalam menangani proses asynchronous?
   - **callback** => fungsi yang dijalankan setelah operasi async selesai (rawan callback hell)
   - **promise** => objek yang merepresentasikan nilai yang belum tersedia sekarang tapi akan datang nanti (`pending`, `fulfilled`, `rejected`).
   - **async/await** => cara menulis kode asynchronous tapi dengan gaya synchronous, di atas Promise. Lebih rapi dan mudah dibaca.
4. Sebutkan **dua contoh fungsi asynchronous** dalam modul `fs` dan jelaskan kegunaannya.
   - `fs.readFile()` => membaca file tanpa menghentikan program.
   - `fs.writeFile()` => menulis file baru secara asynchronous.
5. Apa yang terjadi jika sebuah operasi asynchronous gagal, tetapi tidak ditangani (`try...catch` atau `.catch()` tidak ada)?
   - Teta0 akan muncul error tapi dan menyulitkan proses debungging

---

## ⚙️ **Level Menengah (Analisis & Debugging)**

6. Perhatikan potongan kode berikut:

   ```js
   const fs = require("fs");

   fs.readFile("data.txt", "utf8", (err, data) => {
     if (err) throw err;
   });

   console.log("File dibaca!");
   ```

   a. Urutan output yang akan muncul di console?

   - file dibaca terlebih dahulu jika ada data.txt
   - erorr jika data.txt tidak ada
     b. Jelaskan mengapa urutan itu terjadi.
   - karena fs asynchronous tidak menunggu selesai untuk lanjut ke baris berikutnya. `console.log()` langsung dieksekusi.

---

7. Kamu punya tiga tugas:

   - Baca file `a.txt`
   - Baca file `b.txt`
   - Setelah keduanya selesai, tampilkan hasil gabungan di console

   Jelaskan bagaimana kamu akan melakukannya:

   - Menggunakan **callback**
   - Menggunakan **Promise**
   - Menggunakan **async/await**

   (Tidak perlu kodenya, cukup logika urutan prosesnya.)

   - Saya akan menggunakan async/await dan membuat function `readfile` menggunakan dua await yang isinya `fs.promises.readfile`

---

## 🚀 **Level Lanjutan (Studi Kasus Mini)**

8. Kamu membuat server Node.js sederhana.
   Setiap kali user mengakses `/save?text=halo`, server harus:

   - Membaca file `log.txt`
   - Menambahkan teks baru di akhir file
   - Menyimpan kembali file tanpa menimpa isi lama

   a. Jelaskan pola asynchronous mana yang paling cocok untuk kasus ini dan kenapa?
   Gunakan `async/await` atau `fs.promises.appendFile` supaya mudah dibaca dan tidak nested.
   b. Apa yang terjadi jika dua user mengakses endpoint itu **secara bersamaan**?
   Bisa terjadi race condition — dua proses tulis bisa bentrok, menyebabkan sebagian data hilang atau file rusak.

   ```js
   async function readFile(data) {
     try {
       await fs.promises.appendFile(filePath, data + "\n", "utf8");

       const getData = await fs.promises.readFile(filePath, "utf8");

       return getData;
     } catch (err) {
       throw new Error(err);
     }
   }
   ```

---

9. Misalkan kamu punya fungsi asynchronous berikut:

   ```js
   async function processData() {
     const data1 = await getDataFromAPI1();
     const data2 = await getDataFromAPI2();
     return data1 + data2;
   }
   ```

   a. Apa kelemahan kode di atas jika kedua API tidak saling bergantung?
   Keduanya jalan berurutan, jadi boros waktu kalau API 1 dan 2 tidak saling tergantung.
   b. Bagaimana cara mempercepatnya agar kedua proses bisa berjalan bersamaan?
   Gunakan `Promise.all([getDataFromAPI1(), getDataFromAPI2()])` agar dua API dipanggil secara paralel.

---

10. Sebutkan **tiga kesalahan umum** yang sering dilakukan pemula saat menggunakan asynchronous pattern di Node.js, dan bagaimana cara menghindarinya.

- **Lupa menangani error** => selalu pakai `try/catch` atau `.catch().`
- **Gunakan readFileSync di server** => bikin server hang; pakai versi async.
- **Campur callback dan async/await** → bikin alur berantakan. Pilih salah satu pola.
