/*
Soal 2 — Route-Specific Middleware

Kamu diminta membuat middleware bernama checkLogin yang hanya boleh mengizinkan user dengan query ?user=admin untuk mengakses route /dashboard.

Jika bukan “admin”, tampilkan "Akses ditolak!".
Jika “admin”, kirim "Selamat datang di dashboard!".

GET /dashboard?user=admin   → Selamat datang di dashboard!
GET /dashboard?user=fitra   → Akses ditolak!
*/

import express from "express";

const app = express();

const user = {
  name: "Fitra Maulana",
  role: "admin",
};
const checkLogin = (req, res, next) => {
  const role = req.query.role;
  if (role === user.role) {
    next();
  } else {
    res.status(403).send("Akses ditolak");
  }
};

app.get(`/dashboard`, checkLogin, (req, res) => {
  res.send("Selamat datang di dashboard");
});

app.listen(3000);
