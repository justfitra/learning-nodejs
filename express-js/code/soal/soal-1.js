/*
Soal 1 — Global Middleware

Kamu punya server Express sederhana seperti ini:

import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(3000);

Tugas:
Tambahkan middleware global yang akan:

Menampilkan waktu (Date.now()) dan method request di terminal.

Pastikan semua route akan melewatinya.
*/

import express from "express";
const app = express();

app.use((req, res, next) => {
  console.log(new Date().toISOString());

  next();
});

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(3000);
