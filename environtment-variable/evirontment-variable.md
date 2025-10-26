# Environment Variable di Node.js

## 1. Apa Itu Environment Variable?

Environment variable adalah **nilai konfigurasi eksternal** yang digunakan aplikasi untuk menyimpan data penting seperti:

- Port server
- Kredensial database
- API key
- Mode aplikasi (`development`, `production`, dll)

Tujuannya:
Supaya **data sensitif tidak ditulis langsung di kode**, dan **konfigurasi mudah diubah tanpa ubah source code.**

---

## 2. Cara Menggunakan di Node.js

### a. Instalasi dotenv

Pertama, install library `dotenv`:

```bash
npm install dotenv
```

---

### b. Buat file `.env`

```bash
PORT=3000
DB_USER=fitra
DB_PASS=supersecret
```

---

### c. Gunakan di file `index.js` atau `server.js`

```js
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
```

---

## 3. Praktik Aman

### a. Jangan Upload `.env`

Tambahkan `.env` ke file `.gitignore`:

```
# Environment
.env
```

Ini mencegah data sensitif ikut ke GitHub.

---

### b. Buat Template `.env.example`

Supaya developer lain tahu variabel yang dibutuhkan tanpa lihat isi `.env` kamu.

```bash
PORT=
DB_USER=
DB_PASS=
```

---

## 4. Mengakses di Kode

Contoh penggunaan di server Node.js:

```js
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Server running on port ${PORT}`);
});

server.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
```
