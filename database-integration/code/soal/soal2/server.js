/*

Bagian 1 — QUERY PRAKTIK

Gunakan metode seperti .find(), .findOne(), .sort(), .limit(), .skip(), dan operator $gt, $lt, $in, $regex.

1. Tampilkan semua karyawan dengan gaji > 7000000. ✓
2. Tampilkan semua proyek yang deadline nya masih di masa depan (deadline > Date.now()). ✓
3. Cari semua karyawan yang bekerja di departemen dengan nama “IT”.✓
   (Gunakan dua query: ambil ObjectId departemen IT dulu, lalu cari karyawan berdasarkan itu.)
4. Tampilkan semua karyawan dengan jabatan mengandung kata “Developer” (pakai regex). ✓
5. Urutkan semua karyawan berdasarkan gaji dari yang tertinggi ke terendah, ambil hanya 3 teratas. ✓
6. Hitung berapa jumlah total karyawan dalam setiap departemen (gunakan .aggregate() dengan $group). ✓

 

Bagian 2 — PROJECTION PRAKTIK

> Projection artinya ambil field tertentu aja, bukan semua kolom.
> Gunakan parameter kedua di .find() atau method .select().

1. Ambil semua data karyawan, tapi hanya tampilkan nama dan jabatan (tanpa _id, gaji, dan lainnya). ✓
2. Ambil semua proyek tapi hanya field nama dan deadline. ✓
3. Ambil semua departemen tapi sembunyikan lokasi. ✓
4. Ambil satu karyawan dengan nama = "Fitra" tapi hanya tampilkan nama, jabatan, dan nama departemennya (gunakan query manual tanpa populate).
5. Gabungkan query dan projection:

    Cari karyawan dengan gaji di atas 5 juta,
    Tampilkan hanya nama, jabatan, dan gaji,
    Urutkan gaji secara descending,
    Limit hasilnya hanya 2 orang.

Bonus Challenge (kalau kamu sudah tenang mikir)

Buat query yang menampilkan daftar proyek aktif berisi:

 nama proyek
 nama karyawan
 nama departemen
  (tanpa pakai populate, gunakan kombinasi query + aggregate + $lookup)

*/

import express from "express";
import { dbConnet } from "./db/connection.js";
import dotenv from "dotenv";
import departementRouter from "./routes/departementRouter.js";
import workerRouter from "./routes/workerRouter.js";
import projectRouter from "./routes/projectRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/departement", departementRouter);
app.use("/worker", workerRouter);
app.use("/project", projectRouter);

dbConnet().then(() => {
  app.listen(3000, () => {
    console.log(
      `Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`
    );
  });
});
