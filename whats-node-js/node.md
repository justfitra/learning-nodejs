## Apa Itu Node.js?

Node.js adalah runtime environment (bukan bahasa pemrograman) yang memungkinkan kita menjalankan JavaScript di luar browser, biasanya untuk membuat aplikasi backend (server).
Artinya, kalau di browser JavaScript dipakai untuk manipulasi DOM (frontend),
maka di Node.js kamu bisa :

- mengelola database,
- membuat server API,
- meng-handle file system,
- bahkan membangun full-stack app.

### Komponen Utama Node.js

1. V8 Engine

- Mesin JavaScript buatan Google yang juga digunakan oleh Chrome.
- Fungsinya : menjalankan kode JavaScript dan mengubahnya jadi machine code (C++) agar cepat diproses CPU.
- Karena pakai V8, Node.js bisa sangat cepat dan efisien meskipun hanya pakai satu thread.

Analogi :
Bayangkan V8 itu mesin mobil — Node.js adalah mobilnya. Tanpa V8, mobil (Node.js) nggak bisa jalan.

2. Event Loop

Jantung Node.js yang mengatur proses asynchronous (non-blocking).
Node.js tidak menunggu satu proses selesai sebelum lanjut ke yang lain.
Event loop akan terus berputar, menangani event (seperti request, callback, timer, dsb).

Contoh :
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");

Output-nya :
1
3
2

Karena setTimeout diserahkan ke Event Loop untuk dieksekusi nanti (non-blocking). 3. Non-Blocking I/O (Input/Output)
Node.js tidak “menunggu” operasi berat seperti baca file atau request database.
Sementara proses itu berjalan, Node.js bisa melanjutkan tugas lain.
Setelah selesai, hasilnya dikembalikan lewat callback atau Promise.

Contoh :

const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
if (err) throw err;
console.log("Isi file :", data);
});

console.log("Baris ini dijalankan duluan");

Output :

Baris ini dijalankan duluan
Isi file : ...

Karena readFile() adalah operasi I/O non-blocking.

Intinya :

- Node.js = JavaScript versi server.
- V8 = Mesin eksekusi cepatnya.
- Event Loop = Otaknya yang multitasking.
- Non-blocking I/O = Rahasia kenapa Node.js efisien.
- Bedanya dari browser = bisa akses sistem dan database.
