# Express.js — Pengertian Dasar

**Express.js** adalah framework web untuk **Node.js** yang berfungsi mempermudah pembuatan **server dan API**.
Tanpa Express, kamu harus menulis banyak kode manual untuk menangani request dan response HTTP.
Dengan Express, semua jadi lebih sederhana dan terstruktur.

---

## Fungsi Utama Express.js

1. **Routing** — Menentukan bagaimana server merespons permintaan berdasarkan URL dan metode HTTP (GET, POST, PUT, DELETE).
2. **Middleware** — Menjalankan logika tambahan seperti autentikasi, logging, parsing body, sebelum permintaan dikirim ke route utama.
3. **Static File Handling** — Mempermudah mengirim file HTML, CSS, JS ke browser.
4. **Template Engine Integration** — Bisa digabung dengan EJS, Pug, Handlebars untuk membuat tampilan dinamis.

---

## 1. Instalasi Singkat

```bash
npm install express
```

Contoh program sederhana:

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Halo dari Express.js!");
});

app.listen(3000, () => console.log("Server berjalan di http://localhost:3000"));
```

---

## 2. Routing (GET, POST, PUT, DELETE)

Routing adalah cara menentukan bagaimana server merespons permintaan berdasarkan URL dan metode HTTP.

```js
app.get("/users", (req, res) => {
  res.send("GET semua user");
});

app.post("/users", (req, res) => {
  res.send("POST user baru");
});

app.put("/users/:id", (req, res) => {
  res.send(`PUT update user dengan ID ${req.params.id}`);
});

app.delete("/users/:id", (req, res) => {
  res.send(`DELETE user dengan ID ${req.params.id}`);
});
```

### Response method

| Method             | Deskripsi                                                                             |
| ------------------ | ------------------------------------------------------------------------------------- |
| `res.download()`   | Meminta browser untuk mengunduh sebuah file.                                          |
| `res.end()`        | Mengakhiri proses respons.                                                            |
| `res.json()`       | Mengirim respons dalam format JSON.                                                   |
| `res.jsonp()`      | Mengirim respons JSON dengan dukungan JSONP.                                          |
| `res.redirect()`   | Mengarahkan (redirect) permintaan ke URL lain.                                        |
| `res.render()`     | Merender tampilan (view template).                                                    |
| `res.send()`       | Mengirim respons dengan berbagai tipe data.                                           |
| `res.sendFile()`   | Mengirim file sebagai _octet stream_ (biasanya untuk unduhan).                        |
| `res.sendStatus()` | Menetapkan kode status respons dan mengirim representasi teksnya sebagai isi respons. |

---

## 3. Middleware

Middleware adalah fungsi yang berjalan **sebelum** route utama dijalankan.
Bisa untuk logging, validasi, autentikasi, dsb.

### a. Global Middleware

```js
app.use((req, res, next) => {
  console.log(`Request ke ${req.method} ${req.url}`);
  next();
});
```

### b. Route-Specific Middleware

```js
function cekToken(req, res, next) {
  if (req.query.token !== "1234") {
    return res.status(403).send("Token salah");
  }
  next();
}

app.get("/secure", cekToken, (req, res) => {
  res.send("Akses diterima");
});
```

### c. Custom Middleware

Bisa dibuat di file terpisah, misalnya `middlewares/logger.js`

```js
export function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}
```

Lalu import:

```js
import { logger } from "./middlewares/logger.js";
app.use(logger);
```

---

## 4. Body Parser (JSON & URL-encoded)

Untuk membaca data dari body (misalnya dari form atau API request):

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.send(`User: ${username}, Password: ${password}`);
});
```

---

## 5. Error Handling Middleware

Diletakkan paling bawah agar menangani semua error yang terjadi di route lain.

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Terjadi kesalahan di server!");
});
```

Contoh penggunaan:

```js
app.get("/error", (req, res) => {
  throw new Error("Simulasi error");
});
```

---

## 6. Struktur Project Modular

Struktur folder umum untuk Express project yang rapi:

```
project/
│
├── server.js
├── routes/
│   └── userRoutes.js
├── controllers/
│   └── userController.js
├── services/
│   └── userService.js
├── utils/
│   └── logger.js
└── middlewares/
    └── auth.js
```

**Contoh alur modular:**

```js
// server.js
import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.listen(3000);
```

```js
// routes/userRoutes.js
import express from "express";
import { getAllUsers } from "../controllers/userController.js";
const router = express.Router();

router.get("/", getAllUsers);
export default router;
```

```js
// controllers/userController.js
export function getAllUsers(req, res) {
  res.send(["Fitra", "Budi", "Sinta"]);
}
```

---

## 7. Logging dengan Morgan

`morgan` digunakan untuk mencatat aktivitas HTTP di console.

### Instalasi

```bash
npm install morgan
```

### Penggunaan

```js
import morgan from "morgan";
app.use(morgan("dev"));
```

Output di terminal:

```
GET /users 200 15.432 ms - 28
POST /login 201 12.123 ms - 12
```

---

## Kesimpulan

Express.js memberikan pondasi kuat untuk membangun **server modern berbasis Node.js** dengan fitur:

- Routing fleksibel
- Middleware powerful
- Struktur modular yang scalable
- Integrasi mudah dengan tools seperti Morgan dan Body Parser

---
