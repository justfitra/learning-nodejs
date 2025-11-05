/*
 Ketentuan:
1. Buat project Express baru.
2. Install dan gunakan Morgan.
   npm install morgan
3. Gunakan format log "combined" tapi simpan hasil log ke file access.log (bukan cuma tampil di console).
4. Buat dua route:

    GET / → kirim JSON { message: "Selamat datang di server" }
    POST /login → kirim JSON { message: "Login berhasil" }
5. Jalankan server di port 4000.
6. Setelah server jalan, kirim request GET / dan POST /login lalu buka file access.log.
   Isinya harus mencatat kedua request tersebut dalam format lengkap (IP, tanggal, metode, status, user agent, dll).
*/

import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";

dotenv.config();
const app = express();
const accessLog = fs.createWriteStream("access.log", { flags: "a" });

app.use(express.json());
app.use(morgan("combined", { stream: accessLog }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Selamat datang di server" });
});

app.post("/login", (req, res) => {
  res.status(200).json({ message: "Login Berhasil" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}`
  );
});
