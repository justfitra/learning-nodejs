/*
Schema & Model

Buat model Mahasiswa dengan struktur:

{
  nama: String,
  nim: String,
  jurusan: String,
  angkatan: Number,
  aktif: Boolean
}

Create (POST)

Buat endpoint:

POST /mahasiswa

yang menerima body JSON seperti:

{
  "nama": "Fitra Maulana",
  "nim": "RPL2024001",
  "jurusan": "Rekayasa Perangkat Lunak",
  "angkatan": 2024,
  "aktif": true
}


Read (GET)

Buat dua endpoint:

GET /mahasiswa
GET /mahasiswa/:id

Update (PUT)

Buat endpoint:

PUT /mahasiswa/:id

Delete (DELETE)

Buat endpoint:

DELETE /mahasiswa/:id

*/

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/conection.js";
import studentRouter from "./routes/studentRoutes.js";
import morgan from "morgan";
import facultyRouter from "./routes/facultyRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
// app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

app.use("/students", studentRouter);
app.use("/faculty", facultyRouter);

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(
      `Server running at http://${process.env.HOST}:${process.env.PORT}`
    )
  );
});
