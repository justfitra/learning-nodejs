# AUTHENTICATION & SECURITY

Dokumen ini membahas konsep dan implementasi **authentication dan security** pada aplikasi backend berbasis Node.js (Express). Fokus utama adalah membangun sistem **aman, scalable, dan production-ready**, bukan sekadar login jalan.

---

## Tujuan Pembelajaran

Setelah menyelesaikan level ini, developer mampu:

- Mengamankan kredensial user dengan hashing yang benar
- Menerapkan authentication berbasis token (JWT)
- Membangun authorization berbasis role
- Mengurangi risiko serangan umum pada web application
- Memahami trade-off antara session-based dan stateless auth

---

## 1. Password Hashing dengan bcrypt

### Kenapa Harus Hash?

Password **tidak boleh disimpan dalam bentuk plaintext**.
Jika database bocor dan password tidak di-hash, sistem kamu gagal total.

### bcrypt

bcrypt menggunakan:

- Salt otomatis
- Adaptive hashing (bisa diperkuat seiring waktu)

### Implementasi

```js
import bcrypt from "bcrypt";

const saltRounds = 10;

// Hash
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Compare
const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
```

### Best Practice

- Jangan simpan salt manual
- Jangan pakai MD5 atau SHA
- Gunakan cost 10–12 untuk production

---

## 2. JWT Authentication + Refresh Token Flow

### JWT (JSON Web Token)

Digunakan untuk authentication **stateless**.

Struktur JWT:

- Header
- Payload
- Signature

### Access Token

- Umur pendek (misal 15 menit)
- Dipakai untuk akses API

### Refresh Token

- Umur panjang
- Digunakan untuk menerbitkan access token baru

### Flow Dasar

1. User login
2. Server mengembalikan:

   - Access Token
   - Refresh Token

3. Access token expired
4. Client kirim refresh token
5. Server validasi & kirim access token baru

### Implementasi Singkat

```js
import jwt from "jsonwebtoken";

const accessToken = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
  expiresIn: "15m",
});
```

### Catatan Keamanan

- Jangan simpan JWT di localStorage untuk aplikasi sensitif
- Gunakan HttpOnly Cookie jika memungkinkan
- Simpan refresh token di database

---

## 3. Authorization (Role-Based Access Control)

Authentication ≠ Authorization

- Authentication: siapa kamu
- Authorization: boleh ngapain

### Contoh Role

- user
- admin
- superadmin

### Middleware Authorization

```js
export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
```

### Penggunaan

```js
router.delete("/users/:id", authMiddleware, authorize("admin"), deleteUser);
```

---

## 4. CORS, Helmet, dan Rate Limiting

### CORS

Mengatur siapa yang boleh mengakses API.

```js
import cors from "cors";
app.use(cors({ origin: "https://example.com" }));
```

### Helmet

Mengamankan HTTP headers.

```js
import helmet from "helmet";
app.use(helmet());
```

### Rate Limiting

Mencegah brute-force dan abuse.

```js
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
```

---

## 5. SQL Injection & XSS Prevention

### SQL Injection

Dicegah dengan:

- ORM / Query Builder
- Prepared Statement

### MongoDB Injection

Hindari:

```js
User.find(req.query);
```

Gunakan validasi & whitelist.

---

### XSS (Cross-Site Scripting)

Dicegah dengan:

- Input validation
- Output encoding
- Tidak menyimpan HTML mentah

Gunakan:

- Joi
- validator.js

---

## 6. Secure Config & Environment

### Environment Variable

Rahasia **tidak boleh** di-hardcode.

Gunakan:

```bash
JWT_SECRET=
DATABASE_URL=
```

Di Node.js:

```js
process.env.JWT_SECRET;
```

### Best Practice

- `.env` tidak masuk git
- Secret berbeda untuk dev & prod
- Rotasi secret berkala

---

## 7. Session vs Stateless Authentication

### Session-Based Auth

Ciri:

- Server menyimpan session
- Biasanya pakai cookie

Kelebihan:

- Mudah revoke
- Cocok untuk aplikasi monolit

Kekurangan:

- Sulit scaling horizontal

---

### Stateless Auth (JWT)

Ciri:

- Tidak ada session di server
- Semua info di token

Kelebihan:

- Mudah scaling
- Cocok microservices

Kekurangan:

- Token susah di-revoke
- Harus desain refresh token dengan benar

---

## Kesimpulan

Sistem authentication yang baik:

- Password di-hash
- Token berumur pendek
- Refresh token aman
- Authorization jelas
- Security middleware aktif

---
