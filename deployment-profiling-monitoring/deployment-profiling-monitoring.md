# Level 7 — Deployment, Profiling & Monitoring

Membuat sistem yang siap produksi, efisien, dan terukur.

---

## 1. Environment Management

### Konsep

Pisahkan konfigurasi berdasarkan environment agar data production tidak tercampur dengan development.

| Environment   | Tujuan                          | Database         |
| ------------- | ------------------------------- | ---------------- |
| `development` | coding & eksperimen bebas       | lokal            |
| `staging`     | testing sebelum naik production | mirip production |
| `production`  | data user asli                  | cloud            |

### Implementasi

```
.env.development
.env.staging
.env.production
```

```js
// config/envConfig.js
export const envConfig = {
  node_env: process.env.NODE_ENV || "development",
  db_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
};
```

### Aturan

- Jangan pernah commit `.env` ke GitHub — masukkan ke `.gitignore`
- Setiap environment punya database sendiri
- Production = jangan eksperimen disini

---

## 2. Deployment ke Railway (PaaS)

### Kenapa Railway?

- Tidak perlu setup server manual
- Deploy otomatis dari GitHub
- Free tier cukup untuk project awal
- Cocok sebelum scale ke VPS

### Alur Deploy

```
Push ke GitHub → Railway detect → Build otomatis → App live
```

### Langkah

1. Buat akun Railway → [railway.app](https://railway.app)
2. Connect GitHub repository
3. Tambah environment variables di dashboard Railway
4. Railway otomatis deploy setiap push ke `main`

### Yang Harus Disiapkan

```json
// package.json
{
  "scripts": {
    "start": "node src/app.js", // Railway pakai ini
    "dev": "nodemon --exec tsx src/app.ts"
  }
}
```

---

## 3. VPS: PM2 + Nginx

### PM2 — Process Manager

Kalau app crash di production — PM2 yang otomatis restart. Tidak perlu manual.

```bash
# Install PM2
npm install -g pm2

# Jalankan app
pm2 start src/app.js --name "tabungan-tujuan"

# Auto-restart kalau server reboot
pm2 startup
pm2 save

# Monitor
pm2 monit

# Logs
pm2 logs
```

### Nginx — Reverse Proxy

Nginx duduk di depan app Node.js — nerima request dari internet, forward ke app.

```nginx
# /etc/nginx/sites-available/tabungan-tujuan
server {
  listen 80;
  server_name yourdomain.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### Kenapa Butuh Nginx?

- Handle SSL (HTTPS)
- Serve static files lebih efisien
- Load balancing
- Security layer

---

## 4. CI/CD dengan GitHub Actions

### Masalah Tanpa CI/CD

Setiap push code, harus manual:

1. SSH ke server
2. `git pull`
3. `npm install`
4. `pm2 restart`

20x push sehari = 20x ritual itu. Buang waktu.

### Solusi: GitHub Actions

Setiap push ke `main` → semua langkah jalan otomatis.

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Deploy
        run: echo "Deploy ke Railway otomatis via GitHub integration"
```

---

## 5. Error & Performance Monitoring

### PM2 Logs

```bash
pm2 logs          # semua logs
pm2 logs --err    # error logs only
pm2 monit         # dashboard realtime
```

### Sentry — Error Monitoring

Kalau ada error di production → Sentry kirim notifikasi ke lo.

```bash
npm install @sentry/node
```

```js
// app.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

## 6. API Documentation dengan Swagger

### Masalah Tanpa Docs

50 endpoint → jelasin ke frontend lewat chat/Word → update manual setiap ada perubahan → tidak sinkron.

### Solusi: Swagger

Docs otomatis generate dari kode. Frontend bisa langsung coba endpoint dari browser.

```bash
npm install swagger-ui-express swagger-jsdoc
```

```js
// config/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tabungan Tujuan API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
```

```js
// app.js
import swaggerUi from "swagger-ui-express";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// akses di: http://localhost:3000/api-docs
```

---

## Urutan Belajar yang Disarankan

1. **Environment Management** → setup `.env` yang bener dulu
2. **Railway** → deploy app sederhana, rasain alurnya
3. **Swagger** → dokumentasi API sebelum integrasi frontend
4. **GitHub Actions** → otomasi deployment
5. **PM2 + Nginx** → kalau udah siap pindah ke VPS
6. **Sentry** → monitoring di production

---

## Key Takeaways

- **Environment terpisah** → dev bebas eksperimen, production aman
- **Railway** → PaaS, cocok untuk project awal, deploy cepat
- **PM2** → auto-restart kalau crash, tidak perlu manual
- **Nginx** → reverse proxy, handle SSL dan security
- **CI/CD** → push code = deploy otomatis, tidak ada ritual manual
- **Swagger** → dokumentasi API hidup, selalu sinkron dengan kode
- **Sentry** → tau kalau ada error di production sebelum user komplen
