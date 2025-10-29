/*
Bonus Soal 6 — Kombinasi Global + Route-Specific

Tambahkan:

Global middleware: logging semua request.

Route /admin: gunakan middleware khusus checkAdmin yang hanya mengizinkan role=admin di query.

/admin?role=admin   → Selamat datang Admin
/admin?role=user    → Kamu tidak punya akses

*/

import express from "express";
import { logger1 } from "./logger1.js";

const app = express();

app.use(logger1);

app.get("/admin", (req, res) => {
  res.send("Selamat datang Admin");
});

app.listen(3000);
