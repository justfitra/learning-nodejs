/*
Struktur Project

project/
├─ app.js
├─ routes/
│  └─ userRoutes.js
├─ controllers/
│  └─ userController.js
├─ services/
│  └─ userService.js
└─ utils/
   └─ errorHandler.js

Ketentuan

1. userRoutes.js

    GET /users → panggil getAllUsers dari controller
    POST /users → panggil createUser dari controller

2. userController.js

    getAllUsers(req, res, next)
     → kirim JSON { message: "Daftar semua user" }
    createUser(req, res, next)
     → ambil name dari req.body

      kalau kosong → next(new Error("Nama wajib diisi"))
      kalau ada → res.json({ message: "User berhasil dibuat", data: { name } })

3. userService.js

    (Untuk latihan, cukup buat fungsi validateUser(name) yang melempar error kalau nama kosong.)

4. errorHandler.js

    Tangani semua error dan kembalikan JSON:

     json
     {
       "message": "Terjadi kesalahan server",
       "detail": "pesan error asli"
     }
    
5. app.js

    Import router & middleware.
    Gunakan express.json().
    Pasang app.use(errorHandler) di paling bawah.
    Jalankan server di port 3000.
*/

import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/users", userRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}`
  );
});
