/*

Ketentuan:

1. Buat struktur project seperti ini:

   ```
   project/
   ├─ app.js
   ├─ routes/
   │   ├─ userRoutes.js
   │   └─ productRoutes.js
   ```

2. Di **`userRoutes.js`**, buat 2 endpoint:

   * `GET /users` → kirim JSON `{ message: "Daftar semua user" }`
   * `POST /users` → kirim JSON `{ message: "User baru ditambahkan" }`

3. Di **`productRoutes.js`**, buat 2 endpoint:

   * `GET /products` → kirim JSON `{ message: "Daftar produk tersedia" }`
   * `POST /products` → kirim JSON `{ message: "Produk baru ditambahkan" }`

4. Di **`app.js`**:

   * Import kedua router.
   * Gunakan `app.use("/users", userRoutes)` dan `app.use("/products", productRoutes)`.
   * Tambahkan `express.json()` agar bisa parsing body JSON.
   * Jalankan server di port 3000.

*/

import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.use("/product", productRoutes);

app.listen(3000, () => {
  console.log("server runnig at http://localhost:3000");
});
