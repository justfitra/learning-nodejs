# **Database Integration Guide — SQL vs NoSQL, MongoDB + Mongoose, PostgreSQL, Validation & Error Handling**

---

## **1. Konsep Dasar: SQL vs NoSQL**

### **1.1 SQL (Relational Database)**

- **Struktur:** data disimpan dalam tabel dengan skema tetap (kolom, relasi).
- **Kelebihan:** mendukung query kompleks (`JOIN`), transaksi ACID, konsistensi tinggi.
- **Kekurangan:** sulit diskalakan secara horizontal.
- **Cocok untuk:** sistem keuangan, akuntansi, dan manajemen stok yang menuntut integritas data.

### **1.2 NoSQL (Non-Relational Database)**

- **Struktur:** data disimpan dalam bentuk dokumen (JSON), key-value, graph, atau wide-column.
- **Kelebihan:** skema fleksibel, mendukung _horizontal scaling_, dan performa tinggi.
- **Kekurangan:** tidak menjamin konsistensi seketat SQL.
- **Cocok untuk:** aplikasi real-time, big data, logging, dan sistem dengan struktur data dinamis.

> 🔹 **Kesimpulan:**
> Gunakan **SQL** saat integritas & relasi penting. Gunakan **NoSQL** saat fleksibilitas dan skala besar lebih dibutuhkan.
> Kombinasi keduanya disebut _polyglot persistence_ — umum pada arsitektur modern.

---

## **2. MongoDB + Mongoose (Document-Oriented Database)**

### **2.1 Mengapa Menggunakan Mongoose**

Mongoose adalah _ODM (Object Document Mapper)_ yang menyediakan:

- Definisi schema (struktur dokumen)
- Validasi data otomatis
- Middleware (pre/post hooks)
- Query helper dan populasi relasi antar dokumen

### **2.2 Instalasi dan Koneksi**

```bash
npm install mongoose
```

```js
// db.js
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

export const connectDB = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(" MongoDB connected");
};
```

### **2.3 Definisi Schema & Model**

```js
// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: "general" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", ProductSchema);
```

### **2.4 Operasi CRUD Dasar**

```js
// services/productService.js
import { Product } from "../models/Product.js";

export const createProduct = async (payload) => new Product(payload).save();
export const getProducts = async () =>
  Product.find().sort({ createdAt: -1 }).lean();
export const getProductById = async (id) => Product.findById(id).lean();
export const updateProduct = async (id, payload) =>
  Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
export const deleteProduct = async (id) => Product.findByIdAndDelete(id);
```

### **2.5 Query Lanjutan**

- Pagination: `Product.find().skip(page*limit).limit(limit)`
- Filter: `Product.find({ category, price: { $gte: minPrice } })`
- Aggregation: `Product.aggregate([...])`

---

## **3. PostgreSQL (Opsional — Relational Database)**

### **3.1 Menggunakan `pg` (Driver SQL Murni)**

```bash
npm install pg
```

```js
// db-pg.js
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
```

```js
export const getUsers = async () => {
  const { rows } = await pool.query("SELECT id, name FROM users ORDER BY id");
  return rows;
};
```

**Transaksi SQL:**

```js
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("INSERT INTO users(name) VALUES($1)", ["Fitra"]);
  await client.query("COMMIT");
} catch (err) {
  await client.query("ROLLBACK");
  throw err;
} finally {
  client.release();
}
```

### **3.2 Menggunakan Sequelize (ORM untuk PostgreSQL)**

```bash
npm install sequelize pg pg-hstore
```

```js
import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

await sequelize.sync();
```

> ORM seperti Sequelize mempercepat pengembangan, tapi perlu perhatian pada performa query dan optimisasi index.

---

## **4. Validation & Sanitization**

### **4.1 Menggunakan Joi (Schema-Based Validation)**

```bash
npm install joi
```

```js
import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).default(0),
});

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error)
    return res.status(400).json({
      message: "Validation Error",
      details: error.details.map((d) => d.message),
    });
  req.body = value;
  next();
};
```

### **4.2 Menggunakan validator.js (String Validation & Sanitization)**

```bash
npm install validator
```

```js
import isEmail from "validator/lib/isEmail";
if (!isEmail(req.body.email || "")) throw new Error("Invalid email address");
```

---

## **5. Error Handling pada Database**

### **5.1 Prinsip Umum**

- Tangkap error di level _service_ atau _controller_.
- Gunakan `next(err)` agar error dikirim ke global handler.
- Jangan kirim stack trace mentah ke client (raw error = risiko keamanan).

### **5.2 Global Error Handler (Express)**

```js
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError")
    return res
      .status(400)
      .json({ message: "Validation Error", detail: err.message });

  if (err.code === 11000)
    return res
      .status(409)
      .json({ message: "Duplicate key", field: Object.keys(err.keyPattern) });

  if (err.code === "23505")
    return res
      .status(409)
      .json({ message: "Duplicate entry", detail: err.detail });

  if (err.message?.includes("connection"))
    return res.status(503).json({ message: "Database connection error" });

  res.status(500).json({ message: "Internal server error" });
};
```

---

## **6. Keamanan dan Praktik Terbaik**

- Gunakan _parameterized queries_ untuk mencegah SQL Injection.
- Batasi field yang dapat diubah oleh user (_whitelisting_).
- Gunakan _rate limiting_ dan _input size limit_.
- Backup data secara berkala & gunakan tool migration.
- Monitoring error menggunakan Sentry atau LogRocket.

---

## **7. Struktur Folder Rekomendasi**

```
src/
├─ controllers/
│  └─ productController.js
├─ services/
│  └─ productService.js
├─ models/
│  └─ Product.js
├─ routes/
│  └─ productRoutes.js
├─ middlewares/
│  └─ validateRequest.js
├─ utils/
│  └─ errorHandler.js
└─ db/
   └─ index.js
```

---

## **8. Sumber Referensi**

- [Node.js Official Docs](https://nodejs.org/en/docs)
- [MongoDB Official Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg)](https://node-postgres.com/)
- [Sequelize ORM](https://sequelize.org/)
- [Joi Validation](https://joi.dev/)
- [validator.js GitHub](https://github.com/validatorjs/validator.js)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [Node.js Error Handling Best Practices](https://nodejs.org/en/docs/guides/error-handling-best-practices/)
