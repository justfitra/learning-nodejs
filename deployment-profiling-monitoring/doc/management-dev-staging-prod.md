# Environment Management (dev, staging, prod)

Memisahkan konfigurasi berdasarkan environment agar data production tidak tercampur dengan development.

---

## Kenapa Butuh Environment Terpisah?

| Masalah                    | Akibat                                         |
| -------------------------- | ---------------------------------------------- |
| Satu `.env` untuk semua    | Config production bisa keubah saat development |
| `.env` ke-commit ke GitHub | Secret key & database URL exposed ke publik    |
| `NODE_ENV` tidak diset     | App tidak tau lagi jalan di environment mana   |

---

## Struktur File

```
project/
├── .env.development     → config lokal
├── .env.staging         → config testing
├── .env.production      → config production
└── .gitignore           → ketiga file ini wajib masuk sini
```

---

## Contoh `.env.development`

```env
APP_HOST=localhost
APP_PORT=3000
DB_HOST=mongodb://localhost:27017
DB_NAME=winston_db
REDIS_URL=redis://:root@localhost:6379
JWT_ACCESS_SECRET=kerrekkkk
JWT_REFRESH_SECRET=kerrekkkk_refresh
```

## Contoh `.env.production`

```env
APP_HOST=production-host
APP_PORT=4000
DB_HOST=mongodb://production-host:27017
DB_NAME=management_db
REDIS_URL=redis://:root@production-host:6379
JWT_ACCESS_SECRET=a3f8c2e1d4b7f9e6a1c3d8b2e5f7a4c9d1e3f6b8a2c4d7e9f1b3c5d8e2f4a6
JWT_REFRESH_SECRET=a3f8c2e1d4b7f9e6a1c3d8b2e5f7a4c9d1e3f6b8a2c4d7e9f1b3c5d8e2f4a6
APP_NAME=management-prod
```

> ⚠️ **Perhatian:** `NODE_ENV` **TIDAK BOLEH** ada di dalam `.env` file.
> Kenapa? Karena urutan eksekusinya:
>
> 1. Node.js start
> 2. Baca `NODE_ENV` → untuk tau file `.env` mana yang di-load
> 3. Load `.env.{NODE_ENV}`
>
> Kalau `NODE_ENV` ada di dalam `.env.production` — app belum bisa baca file itu
> sebelum tau `NODE_ENV` nya. Ayam dan telur. 😂
> `NODE_ENV` harus di-set dari **luar** — terminal atau dashboard platform.

---

## Generate JWT Secret yang Aman

Jangan pakai kata-kata yang bisa ditebak. Generate random string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Implementasi di Kode

```js
// config/envConfig.js
import dotenv from "dotenv";

// 1. Baca NODE_ENV yang sudah di-set dari luar
const env = process.env.NODE_ENV || "development";

// 2. Load file .env sesuai environment
// NODE_ENV=production → load .env.production
// NODE_ENV=staging    → load .env.staging
// (tidak di-set)      → load .env.development
dotenv.config({ path: `.env.${env}` });

// 3. Export semua config agar bisa dipakai di seluruh app
export const envConfig = {
  node_env: process.env.NODE_ENV,
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  redis_url: process.env.REDIS_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
};
```

---

## Cara Set NODE_ENV dari Luar

### Di Terminal / VPS

```bash
# development — NODE_ENV tidak perlu di-set, default ke development
node server.js

# production
NODE_ENV=production node server.js

# staging
NODE_ENV=staging node server.js

# dengan PM2
NODE_ENV=production pm2 start server.js
```

### Di Railway / Platform Cloud

Tidak perlu set di terminal — set di **dashboard**:

```
Railway → Project → Variables → Add Variable
NODE_ENV = production
```

### Di GitHub Actions (CI/CD)

```yaml
- name: Deploy
  env:
    NODE_ENV: production
  run: node server.js
```

---

## Cara Pakai envConfig di Seluruh App

```js
// app.js atau server.js — import envConfig PERTAMA sebelum yang lain
import { envConfig } from "./config/envConfig.js";
import express from "express";

const app = express();
const PORT = envConfig.app_port;

app.listen(PORT, () => {
  console.log(`Server running in ${envConfig.node_env} mode on port ${PORT}`);
});
```

```js
// db.js — pakai envConfig untuk koneksi database
import mongoose from "mongoose";
import { envConfig } from "../config/envConfig.js";

export const connectDB = async () => {
  await mongoose.connect(`${envConfig.db_host}/${envConfig.db_name}`);
  console.log(`Database connected: ${envConfig.db_name}`);
};
```

---

## Wajib Masuk `.gitignore`

```gitignore
.env
.env.development
.env.staging
.env.production
```

---

## Alur Lengkap

```
Terminal: NODE_ENV=production node server.js
                    ↓
         Node.js baca NODE_ENV = "production"
                    ↓
         dotenv.config({ path: ".env.production" })
                    ↓
         Semua variable di .env.production masuk process.env
                    ↓
         envConfig export nilai-nilai itu ke seluruh app
                    ↓
         app.js, db.js, dll pakai envConfig
```

---

## Key Takeaways

- **3 file terpisah** → dev bebas eksperimen, production aman
- **NODE_ENV di-set dari luar** → bukan dari dalam `.env` file
- **`dotenv.config({ path })`** → load file `.env` sesuai `NODE_ENV`
- **JWT secret production** → harus random, panjang, tidak bisa ditebak
- **Jangan commit `.env`** → secret key tidak boleh masuk GitHub
