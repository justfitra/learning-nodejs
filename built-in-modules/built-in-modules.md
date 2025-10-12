# Built-in Modules di Node.js

Node.js sudah menyediakan banyak **modul bawaan (built-in)** yang bisa langsung digunakan tanpa menginstal apa pun.  
Empat modul paling sering digunakan adalah: **fs**, **path**, **os**, dan **http**.

---

## 1. fs (File System)

Digunakan untuk **membaca, menulis, mengubah, atau menghapus file** di sistem.

### Contoh:

```js
const fs = require("fs");

// Membaca file
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("Isi file:", data);
});

// Menulis file
fs.writeFile("output.txt", "Halo Dunia!", (err) => {
  if (err) throw err;
  console.log("File berhasil dibuat!");
});
```

### Fungsi Penting:

- `fs.readFile()` → membaca file (asynchronous)
- `fs.writeFile()` → menulis file baru
- `fs.appendFile()` → menambah isi file
- `fs.unlink()` → menghapus file
- `fs.mkdir()` → membuat folder

---

## 2. path

Modul ini digunakan untuk **mengelola dan memanipulasi path file atau folder**.

### Contoh:

```js
const path = require("path");

const filePath = "folder/subfolder/file.txt";

console.log(path.basename(filePath)); // file.txt
console.log(path.dirname(filePath)); // folder/subfolder
console.log(path.extname(filePath)); // .txt
console.log(path.join(__dirname, "data", "file.txt"));
// hasil: /Users/.../data/file.txt
```

### Fungsi Penting:

- `path.basename()` → nama file
- `path.dirname()` → nama folder induk
- `path.extname()` → ekstensi file
- `path.join()` → menggabungkan path

---

## 3. os (Operating System)

Memberikan informasi tentang **sistem operasi** tempat Node.js berjalan.

### Contoh:

```js
const os = require("os");

console.log("Tipe OS:", os.type());
console.log("Platform:", os.platform());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("Home Directory:", os.homedir());
```

### Fungsi Penting:

- `os.type()` → nama OS (Windows_NT, Linux, dll)
- `os.platform()` → platform OS
- `os.totalmem()` → total RAM
- `os.freemem()` → sisa RAM
- `os.homedir()` → direktori home user

---

## 4. http

Digunakan untuk **membuat web server sederhana** tanpa framework seperti Express.

### Contoh:

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Halo dari server Node.js!");
});

server.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
```

### Fungsi Penting:

- `http.createServer()` → membuat server
- `server.listen(port)` → menjalankan server di port tertentu
- `req` → data permintaan dari client
- `res` → respon dari server

---

## Kesimpulan

| Modul    | Fungsi Utama        | Contoh Kegunaan              |
| -------- | ------------------- | ---------------------------- |
| **fs**   | File system         | Membaca & menulis file       |
| **path** | Path & direktori    | Mengatur lokasi file         |
| **os**   | Info sistem operasi | Menampilkan detail sistem    |
| **http** | Web server          | Menjalankan API atau website |

---
