/*
Soal 1 — Middleware Validasi

Buatlah sebuah route POST /register yang menggunakan custom middleware bernama validateUser.
Middleware itu harus memastikan:

req.body berisi username dan password.

Jika salah satu kosong, kirim response:
*/

import express from "express";

const app = express();

app.use(express.json());

const validateUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({ error: "Data tidak lengkap" });
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.json({ message: "allogai" });
});

app.post("/register", validateUser, (req, res) => {
  res
    .status(201)
    .json({ message: "user berhasil ditambahkan", data: req.body });
});

app.listen(3000);
