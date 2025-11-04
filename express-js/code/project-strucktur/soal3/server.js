/*

Ketentuan:

1. Buat struktur project berikut:

   
   project/
   ├─ app.js
   ├─ routes/
   │   ├─ authRoutes.js
   ├─ controllers/
   │   ├─ authController.js
   ├─ services/
   │   ├─ authService.js
   ├─ middleware/
   │   ├─ logger.js
   │   ├─ errorHandler.js
   ├─ utils/
   │   ├─ responseFormatter.js
   

2. authRoutes.js

    POST /login → panggil controller loginUser.

3. authController.js

    Panggil fungsi dari authService.js.
    Kirim hasilnya dalam format JSON melalui responseFormatter.js.

4. authService.js

    Validasi: kalau req.body.username atau req.body.password kosong, lempar error (throw new Error("Username dan password wajib diisi")).
    Kalau valid, kembalikan data { username: req.body.username, token: "123abc" }.

5. logger.js

    Middleware sederhana yang log method dan URL setiap request.

6. errorHandler.js

    Tangani semua error dengan format JSON { success: false, message: err.message }.

7. responseFormatter.js

    Export fungsi successResponse(data) → return { success: true, data }.

8. Jalankan server di port 4000.



Output yang diharapkan:

 Jika body kosong → {"success": false, "message": "Username dan password wajib diisi"}
 Jika benar → {"success": true, "data": { "username": "fitra", "token": "123abc" }}


*/

import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/authRoutes.js";
import { logger } from "./middleware/logger.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(logger);
app.use("/users", userRouter);
app.use("/login", authRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}`
  );
});
