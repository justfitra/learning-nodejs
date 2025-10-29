/*
Soal 4 — Middleware Berantai

Buat dua middleware:

verifyToken → cek apakah ada query ?token=12345

showUser → kirim response "User terverifikasi"

Hubungkan keduanya secara berurutan di route /profile.
Kalau token salah atau tidak ada → kirim "Token invalid!"
*/

import express from "express";

const app = express();

const verifyToken = (req, res, next) => {
  const token = req.query.token;

  if (token && token === "12345") {
    next();
  } else {
    res.status(403).send("Token invalid");
  }
};

app.use(verifyToken);

app.get("/profile", (req, res) => {
  res.send("User Terverifikasi");
});

app.listen(3000);
