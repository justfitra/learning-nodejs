/*
Soal 3 — Error Handling Middleware**

Buat middleware global untuk menangkap error dari seluruh aplikasi.
Skenario:

Buat route `/crash` yang melempar error manual:

  throw new Error("Server meledak");

Middleware error harus menangkap error ini dan membalas:

  { "message": "Terjadi kesalahan server" }

Jangan biarkan server crash.

*/

import express from "express";

const app = express();

const crash = (req, res, next) => {
  if (req.url === "/crash") {
    throw new Error("server meledak");
  }

  next();
};

app.use(crash);
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).send("server meledak");
});

app.get("/", (req, res) => {
  res.send("selamat datang");
});

app.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
