## 1. CORS (Cross-Origin Resource Sharing)

### Masalah yang diselesaikan

Browser itu cerewet.

Frontend di:

```
https://frontend.com
```

Backend di:

```
https://api.backend.com
```

Browser bilang:

> “Kamu beda origin. Gue curiga.”

Tanpa CORS → request **diblock di browser**, bukan di server.

---

### Cara kerja singkat

Server mengirim header:

```
Access-Control-Allow-Origin
```

Browser membaca:

- cocok → lanjut
- tidak cocok → stop

---

### Implementasi (Express)

```js
import cors from "cors";

app.use(
  cors({
    origin: ["https://frontend.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
```

### Catatan keras

- ❌ `origin: "*"` di production itu malas
- CORS **bukan security server**, hanya aturan browser
- Postman, curl, server-to-server **tidak peduli CORS**

---

## 2. Helmet (HTTP Security Headers)

### Masalah yang diselesaikan

Browser itu polos.
Tanpa header tambahan, dia terlalu percaya.

Helmet = kumpulan **HTTP security headers**.

---

### Apa yang dipasang Helmet?

Contoh:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy`
- `Referrer-Policy`

Ini mencegah:

- XSS
- clickjacking
- MIME sniffing
- embed iframe sembarangan

---

### Implementasi

```js
import helmet from "helmet";

app.use(helmet());
```

Selesai. Tidak ribet. Kalau tidak pakai, itu pilihan hidup kamu.

---

### Kesalahan umum

- Mematikan CSP karena “frontend error”
- Padahal CSP-nya yang tidak dikonfigurasi

---

## 3. Rate Limiting

### Masalah yang diselesaikan

API kamu itu **bukan buffet bebas ambil**.

Tanpa rate limit:

- brute force login
- spam request
- DoS murahan

---

### Konsep

```
IP / user → max request → waktu tertentu
```

Contoh:

- 100 request / 15 menit
- lewat → **429 Too Many Requests**

---

### Implementasi (express-rate-limit)

```js
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later",
});

app.use("/api", limiter);
```

---

### Rate limit login (WAJIB)

```js
app.use(
  "/auth/login",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
  })
);
```

Kalau login tidak dilimit, brute force tinggal nunggu kopi.

---

## 4. Hubungan ketiganya

| Layer      | Fungsi                              |
| ---------- | ----------------------------------- |
| CORS       | Atur siapa boleh akses dari browser |
| Helmet     | Amankan browser behavior            |
| Rate Limit | Lindungi server dari abuse          |

Mereka **tidak saling menggantikan**.

---

## 5. Urutan middleware yang benar

```js
app.use(helmet());
app.use(cors(corsConfig));
app.use(rateLimiter);
```

Auth & RBAC **setelah ini**.

---

## 6. Kesalahan

- Mengira CORS = security backend
- Tidak pakai rate limit di login
- Menonaktifkan helmet karena “ribet”
- Rate limit global tanpa pengecualian health check

---
