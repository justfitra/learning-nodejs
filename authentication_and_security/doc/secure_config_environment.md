# Secure Config & Environment

## Tujuan

Memahami pentingnya pengelolaan konfigurasi dan environment secara aman pada aplikasi backend, serta menerapkan praktik terbaik untuk mencegah kebocoran kredensial dan kesalahan konfigurasi di lingkungan produksi.

---

## 1. Konsep Dasar Environment

### 1.1 Apa itu Environment?

Environment adalah konteks tempat aplikasi dijalankan, biasanya dibedakan menjadi:

- **development**
- **staging**
- **production**

Setiap environment memiliki konfigurasi yang berbeda, terutama untuk:

- database
- secret key
- API key
- mode logging

---

### 1.2 Masalah Jika Konfigurasi Tidak Dipisah

- Secret bocor ke repository
- Konfigurasi production tertimpa config development
- Aplikasi crash saat deploy
- Risiko keamanan meningkat

---

## 2. Environment Variable

### 2.1 Pengertian

Environment Variable adalah variabel yang disimpan di luar source code dan diakses melalui sistem operasi.

Contoh:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/app
JWT_ACCESS_SECRET=your-secret-key
```

Di Node.js diakses melalui:

```js
process.env.PORT;
```

---

### 2.2 Menggunakan dotenv

Library `dotenv` digunakan untuk memuat environment variable dari file `.env`.

```bash
npm install dotenv
```

```js
import dotenv from "dotenv";
dotenv.config();
```

---

## 3. File `.env`

### 3.1 Contoh Struktur `.env`

```env
NODE_ENV=development
PORT=3000

DB_URI=mongodb://localhost:27017/app

JWT_ACCESS_SECRET=long-random-secret
JWT_REFRESH_SECRET=another-long-secret
```

---

### 3.2 File yang Tidak Boleh Di-Commit

Tambahkan ke `.gitignore`:

```gitignore
.env
.env.local
.env.production
```

---

## 4. Secure Configuration Principles

### 4.1 Jangan Hardcode Secret

❌ Tidak aman:

```js
jwt.sign(payload, "secret123");
```

✅ Aman:

```js
jwt.sign(payload, process.env.JWT_ACCESS_SECRET);
```

---

### 4.2 Gunakan Secret yang Kuat

Karakteristik secret yang baik:

- Panjang minimal 32 karakter
- Random
- Berbeda untuk setiap environment
- Access secret ≠ refresh secret

---

### 4.3 Fail Fast Configuration

Aplikasi seharusnya **gagal start** jika konfigurasi wajib tidak tersedia.

```js
if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is not defined");
}
```

---

## 5. Environment-based Configuration

### 5.1 Contoh Penggunaan NODE_ENV

```js
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
```

---

### 5.2 Logging Berdasarkan Environment

```js
const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  console.log("Debug mode enabled");
}
```

---

## 6. Konfigurasi Database yang Aman

Gunakan environment variable untuk koneksi database:

```js
mongoose.connect(process.env.DB_URI);
```

Jangan:

- menyimpan username/password database di source code
- menggunakan database production di development

---

## 7. Deployment & Secret Management

### 7.1 Platform Hosting

Sebagian besar platform (Render, Railway, VPS, Docker) menyediakan:

- environment variable dashboard
- secret manager bawaan

Secret **tidak perlu** disimpan di `.env` production.

---

### 7.2 Rotasi Secret

Jika secret bocor:

- ganti secret
- invalidate token lama
- redeploy aplikasi

---

## 8. Kesalahan Umum

- Menyimpan `.env` di repository
- Menggunakan secret pendek
- Menggunakan satu secret untuk semua environment
- Tidak memvalidasi konfigurasi saat startup

---

## Kesimpulan

Pengelolaan konfigurasi dan environment yang aman adalah fondasi aplikasi backend yang stabil dan secure.
Dengan memisahkan konfigurasi dari source code dan menggunakan environment variable secara benar, risiko kebocoran data dan kesalahan produksi dapat diminimalkan.
