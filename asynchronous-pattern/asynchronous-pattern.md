# Asynchronous Pattern di Node.js

Node.js menggunakan **asynchronous programming** untuk menjalankan banyak proses tanpa menunggu satu sama lain selesai.
Konsep ini membuat aplikasi Node.js **lebih cepat dan efisien**, terutama saat bekerja dengan file, database, atau API eksternal.

---

## 1. Callback

Merupakan cara paling dasar untuk menangani proses asynchronous.
Callback dijalankan **setelah** tugas utama selesai.

### Contoh:

```js
const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Terjadi error:", err);
    return;
  }
  console.log("Isi file:", data);
});
```

### Kelebihan:

- Sederhana untuk tugas kecil.

### Kekurangan:

- Sulit dibaca jika bersarang terlalu banyak (_callback hell_).

---

## 2. Promise

`Promise` digunakan untuk menghindari _callback hell_.
Promise memiliki tiga status: **pending**, **fulfilled**, dan **rejected**.

### Contoh:

```js
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) resolve("Data berhasil diambil!");
      else reject("Gagal mengambil data!");
    }, 1000);
  });
}

getData()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### Kelebihan:

- Lebih mudah dibaca daripada callback.
- Mendukung chaining (`.then()` dan `.catch()`).

### Kekurangan:

- Masih bisa jadi rumit jika banyak promise berurutan.

---

## 3. Async / Await

`async/await` adalah cara modern yang lebih bersih untuk menulis kode asynchronous.
Di balik layar, `async/await` tetap menggunakan **Promise**.

### Contoh:

```js
async function getUser() {
  try {
    const data = await getData();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### Kelebihan:

- Lebih mudah dibaca dan ditulis seperti kode synchronous.
- Cocok untuk kode kompleks dengan banyak tahapan asynchronous.

### Kekurangan:

- Harus dijalankan di dalam fungsi `async`.

---

## 4. Event Emitter (Dasar dari Asyc itu sendiri)

Node.js punya sistem event seperti :

```js
req.on("data", chunk => {...});
req.on("end", () => {...});
```

atau buat sendiri :

```js
import { EventEmitter } from "events";

const emitter = new EventEmitter();
emitter.on("pesan", (nama) => console.log(`Halo ${nama}`));
emitter.emit("pesan", "Fitra");
```

---

## 5. Streaming

Async bukan cuma soal waktu, tapi juga soal aliran data besar (misal file 2GB).
Daripada baca semua sekaligus ke RAM, Node pakai stream untuk baca sedikit-sedikit secara async.

```js
const readStream = fs.createReadStream("video.mp4");
readStream.on("data", (chunk) => console.log("Membaca bagian:", chunk.length));
readStream.on("end", () => console.log("Selesai"));
```

---

## 6. Event Loop

Event Loop adalah mekanisme utama Node.js untuk menangani operasi asynchronous.
Ia memastikan JavaScript tetap **non-blocking** meskipun hanya punya satu thread.

### Ilustrasi:

1. Program menjalankan kode synchronous terlebih dahulu.
2. Operasi asynchronous dikirim ke sistem (misal: baca file, HTTP request).
3. Setelah selesai, callback/promise dijalankan lewat event queue.
