# **Database Error Handling with Mongoose**

Dokumen ini menjelaskan cara menangani error yang muncul saat berinteraksi dengan MongoDB menggunakan Mongoose. Error handling yang baik sangat penting untuk menjaga stabilitas aplikasi, memberikan respon yang jelas ke client, serta memudahkan proses debugging.

---

## **1. Jenis Error dalam Database**

Error yang terjadi saat bekerja dengan database umumnya terbagi menjadi tiga kategori:

### **1.1 Operational Errors**

Error yang disebabkan oleh kondisi eksternal atau permasalahan runtime.

- Koneksi database gagal (`ECONNREFUSED`)
- Timeout query
- Network issue
- Server database mati

Operational errors sebaiknya di-retry atau ditangani secara terkontrol.

### **1.2 Programmer Errors**

Kesalahan yang berasal dari logic kode.

- Query salah
- Field yang diakses tidak ada
- Salah menggunakan operator

Programmer error harus diperbaiki melalui code, bukan ditangani oleh user.

### **1.3 Validation / Constraint Errors**

Error yang disebabkan oleh pelanggaran aturan schema.

- Duplicate key (`E11000`)
- Field tidak sesuai type
- Field wajib tidak dikirim

Jenis error ini harus menghasilkan respons **400 Bad Request**.

---

## **2. Error Penting dalam Mongoose**

### **2.1 CastError**

Terjadi saat parameter tipe ObjectId tidak valid.
Contoh: `/users/abc123`
Mongoose gagal melakukan casting.

### **2.2 ValidationError**

Terjadi saat data yang dikirim user tidak sesuai schema Mongoose.

### **2.3 MongoServerError (Code 11000)**

Duplicate key, biasanya pada field yang memiliki constraint `unique: true`.

### **2.4 Connection Errors**

Contoh:

- `ECONNREFUSED`
- `ETIMEDOUT`
- Lost connection

Aplikasi harus mendeteksi dan memberikan pesan error yang jelas.

---

## **3. Custom Error Class**

Aplikasi yang baik memisahkan error berdasarkan tanggung jawab.

```js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
```

---

## **4. Error Handling Middleware**

```js
export function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);

  if (err.name === "CastError") {
    return res.status(400).json({
      status: 400,
      message: "Invalid ID format",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      status: 400,
      message: "Duplicate field value",
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
}
```

---

## **5. Error Handling pada Database Connection**

### **Contoh koneksi dengan monitoring error**

```js
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
    process.exit(1);
  });

mongoose.connection.on("disconnected", () => {
  console.error("MongoDB disconnected");
});
```

---

## **6. Error Handling pada Controller**

### **Contoh penerapan**

```js
import User from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export async function createUser(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
```

---

## **7. Logging**

Pastikan error penting dicatat menggunakan:

- `console.error`
- Winston
- Pino
- Bunyan

Logging membantu debugging dan monitoring produksi.

---

## **8. Best Practices**

- Jangan tampilkan error detail ke client.
- Simpan error lengkap di log.
- Bedakan error 400 (user salah) vs 500 (server salah).
- Gunakan custom error class untuk konsistensi.
- Tangani koneksi database dengan jelas.
