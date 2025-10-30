/*
Soal 2 — Route-Specific Middleware

Buat dua route:

/public → bisa diakses siapa saja.

/private → hanya bisa diakses jika ada header Authorization: Bearer 12345.

Jika header salah atau tidak ada, balas dengan status 403 dan pesan:

{ "error": "Akses ditolak" }

Pertanyaan: tulis middleware checkAuth dan cara menerapkannya hanya pada route /private.
*/

import express from "express";

const app = express();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Akses ditolak" });
  }
  const token = authHeader.split(" ")[1];
  if (token === "12345") {
    next();
  } else {
    return res.status(403).json({ error: "akses ditolak" });
  }
};

app.get("/", (req, res) => {
  res.status(200).json({ message: "Selamat Datang" });
});

app.get("/public", (req, res) => {
  res
    .status(200)
    .json({ message: `Selamat Datang di [${req.url}] - [${req.method}]` });
});

app.get("/private", auth, (req, res) => {
  res.status(200).json({ message: "Welcome to admins page" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
