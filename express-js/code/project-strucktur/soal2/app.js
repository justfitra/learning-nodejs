/*
Ketentuan:

1. Buat server Express baru (app.js).

2. Tambahkan middleware berikut:

   a. requestLogger

   Log ke console tiap request masuk:
     [GET] /users - 2025-10-18 22:00:00


     (Gunakan new Date().toLocaleString())

   b. timeChecker

    Jika waktu sekarang antara jam 00.00–05.00, kirim:

json
     { "message": "Server istirahat, coba lagi pagi" }


     (Jangan lanjut ke route berikutnya.)

   c. randomFail

    Gunakan Math.random()
    Jika hasil < 0.3, lempar error pakai next(new Error("Koneksi gagal mendadak")).

3. Buat route:

    GET /users → kirim JSON { "message": "Data user berhasil diambil" }

4. Buat global error handling middleware yang mengembalikan JSON:

   json
   {
     "message": "Terjadi kesalahan server",
     "detail": "pesan error asli"
   }
   

*/

import express from "express";
import {
  errorHandling,
  logger,
  randomFail,
  timeChecker,
} from "./middleware.js";

const app = express();

app.use(express.json());
app.use("/users", logger);
app.use("/users", timeChecker);
app.use("/users", randomFail);
app.use(errorHandling);

app.get("/users", (req, res) => {
  res.status(200).json({ message: "Data user berhasil diambil" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
