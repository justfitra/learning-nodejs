# Logging dengan Winston pada Express.js

## Tujuan

Memahami implementasi logging pada aplikasi backend menggunakan Winston untuk:

* monitoring aplikasi
* debugging error
* audit activity
* observability
* production logging

Logging merupakan bagian penting dari backend modern karena aplikasi production tidak cukup hanya menggunakan:

```js
console.log()
```

---

# Apa Itu Logging

Logging adalah proses mencatat aktivitas aplikasi ke:

* terminal
* file
* database
* monitoring system

Contoh informasi yang biasanya dicatat:

* request masuk
* response error
* authentication gagal
* query database
* crash application
* system warning

---

# Kenapa Logging Penting

Tanpa logging:

* sulit melacak error production
* debugging menjadi lambat
* tidak ada histori aktivitas aplikasi
* sulit monitoring traffic dan issue

Pada production:

```text
error tidak selalu muncul di terminal
```

Karena server biasanya berjalan:

* background service
* Docker
* VPS
* cloud platform

---

# Kenapa Tidak Menggunakan console.log

`console.log()` hanya cocok untuk development sederhana.

Kekurangan:

* tidak ada level logging
* tidak bisa simpan file log
* tidak structured
* sulit difilter
* tidak scalable

Contoh buruk:

```js
console.log("Error");
```

Tidak jelas:

* kapan terjadi
* endpoint mana
* severity level
* stack trace

---

# Apa Itu Winston

Winston adalah library logging populer pada Node.js.

Digunakan untuk:

* structured logging
* log level
* save ke file
* transport logging
* production monitoring

---

# Instalasi

```bash
npm install winston
```

---

# Struktur Folder

```text
src/
├── config/
│   └── logger.js
├── middleware/
│   └── requestLogger.js
├── logs/
│   ├── combined.log
│   └── error.log
├── app.js
```

---

# Membuat Logger

## src/config/logger.js

```js
import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.printf(
      ({ level, message, timestamp }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      }
    )
  ),

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: "src/logs/combined.log",
    }),

    new winston.transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }),
  ],
});

export default logger;
```

---

# Penjelasan

## level

```js
level: "info"
```

Menentukan level minimum logging.

Artinya:

* info dicatat
* warning dicatat
* error dicatat

---

# Level Logging Winston

| Level   | Fungsi          |
| ------- | --------------- |
| error   | error penting   |
| warn    | warning         |
| info    | informasi umum  |
| http    | HTTP request    |
| verbose | detail tambahan |
| debug   | debugging       |
| silly   | sangat detail   |

---

# format.combine

Menggabungkan beberapa formatter.

---

# timestamp()

Menambahkan waktu log.

Contoh:

```text
2026-05-30T10:00:00
```

---

# printf()

Mengatur format output log.

---

# transports

Menentukan tujuan log dikirim.

Contoh:

* terminal
* file
* cloud logging

---

# Console Transport

```js
new winston.transports.Console()
```

Log tampil di terminal.

---

# File Transport

```js
new winston.transports.File()
```

Log disimpan ke file.

---

# Menggunakan Logger

## Contoh Service

```js
import logger from "../config/logger.js";

export const createPostService = async (
  payload
) => {
  logger.info("Creating new post");

  return await Post.create(payload);
};
```

---

# Output

```text
[2026-05-30T12:00:00.000Z] INFO: Creating new post
```

---

# Logging Error

```js
try {
  await Post.create(payload);
} catch (error) {
  logger.error(error.message);

  throw error;
}
```

---

# Logging Request HTTP

Biasanya backend production mencatat:

* method
* endpoint
* status
* response time

---

# Middleware Logger

## src/middleware/requestLogger.js

```js
import logger from "../config/logger.js";

export const requestLogger = (
  req,
  res,
  next
) => {
  logger.http(
    `${req.method} ${req.originalUrl}`
  );

  next();
};
```

---

# Gunakan di app.js

```js
import express from "express";

import { requestLogger }
from "./middleware/requestLogger.js";

const app = express();

app.use(requestLogger);
```

---

# Hasil

```text
HTTP: GET /api/v1/posts
```

---

# Logging Error Middleware

## error.middleware.js

```js
import logger from "../config/logger.js";

export const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  logger.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
};
```

---

# Kenapa Stack Trace Penting

Tanpa stack trace:

```text
hanya tahu error terjadi
```

Tanpa tahu:

* file mana
* line mana
* function mana

---

# Struktur Log Production

Backend modern biasanya memisahkan:

```text
combined.log
error.log
```

---

# Contoh

## combined.log

```text
INFO: User login
INFO: GET /posts
WARN: Invalid token
ERROR: Database failed
```

---

## error.log

```text
ERROR: Database failed
ERROR: Redis connection timeout
```

---

# Logging JSON Format

Pada production modern biasanya menggunakan JSON log.

---

# Contoh

```js
format: winston.format.json();
```

---

# Output

```json
{
  "level": "info",
  "message": "User login",
  "timestamp": "2026-05-30T10:00:00"
}
```

---

# Kenapa JSON Logging Penting

Karena:

* mudah dibaca monitoring tools
* mudah difilter
* cocok untuk ELK Stack
* cocok untuk Grafana/Loki

---

# Environment Based Logging

Biasanya development dan production berbeda.

---

# Contoh

```js
const isProduction =
  process.env.NODE_ENV === "production";
```

---

# Development

Readable log:

```text
INFO: Server running
```

---

# Production

JSON structured log.

---

# Menambahkan Warna pada Console

## logger.js

```js
format: winston.format.combine(
  winston.format.colorize(),
  winston.format.simple()
)
```

---

# Hasil

Console:

* error merah
* warn kuning
* info hijau

---

# Exception Handling

Winston dapat menangani uncaught exception.

---

# Contoh

```js
exceptionHandlers: [
  new winston.transports.File({
    filename: "src/logs/exceptions.log",
  }),
],
```

---

# Unhandled Rejection

```js
rejectionHandlers: [
  new winston.transports.File({
    filename: "src/logs/rejections.log",
  }),
],
```

---

# Contoh Error Async

```js
Promise.reject("Database error");
```

Tanpa rejection handler:

```text
aplikasi bisa crash tanpa jejak
```

---

# Rotating Log File

Masalah:

```text
file log bisa sangat besar
```

Solusi:

* rotate per hari
* rotate per ukuran file

Biasanya menggunakan:

```bash
npm install winston-daily-rotate-file
```

---

# Contoh Daily Rotate

```js
import DailyRotateFile
from "winston-daily-rotate-file";

new DailyRotateFile({
  filename: "src/logs/application-%DATE%.log",

  datePattern: "YYYY-MM-DD",

  maxSize: "20m",

  maxFiles: "14d",
});
```

---

# Penjelasan

## maxSize

Jika file mencapai:

```text
20 MB
```

akan dibuat file baru.

---

## maxFiles

Log lama otomatis dihapus setelah:

```text
14 hari
```

---

# Best Practices

## 1. Jangan Gunakan console.log di Production

Gunakan:

* Winston
* Pino
* structured logging

---

## 2. Pisahkan Error Log

Agar mudah monitoring issue.

---

## 3. Jangan Log Sensitive Data

Jangan mencatat:

* password
* token
* access secret
* credit card

Contoh buruk:

```js
logger.info(req.body.password);
```

---

## 4. Gunakan Structured Logging

JSON logging lebih scalable.

---

## 5. Gunakan Request ID

Untuk tracing request antar service.

---

# Contoh Request ID

```js
logger.info({
  requestId: "abc123",
  endpoint: "/posts",
});
```

---

# Logging pada Architecture Modern

Pada production modern:

* log dikirim ke cloud
* log dianalisis realtime
* log digunakan monitoring system

Biasanya menggunakan:

* ELK Stack
* Grafana Loki
* Datadog
* New Relic

---

# Perbedaan Logging dan Monitoring

| Logging        | Monitoring      |
| -------------- | --------------- |
| mencatat event | memantau system |
| detail request | status server   |
| debugging      | alerting        |

---

# Kesalahan Umum

* menggunakan console.log di production
* tidak menyimpan error log
* log terlalu verbose
* mencatat password/token
* tidak memisahkan log file

---

# Kapan Winston Digunakan

Gunakan Winston untuk:

* Express.js backend
* REST API
* microservices
* production logging
* audit logging

---

# Kesimpulan

Logging adalah bagian penting backend modern.

Tanpa logging:

* debugging production sulit
* error sulit dilacak
* monitoring terbatas

Winston membantu:

* structured logging
* file logging
* error tracking
* production observability

Backend production yang baik bukan hanya:

* endpoint berjalan

Tetapi juga:

* aktivitas dapat ditelusuri
* error dapat dianalisis
* sistem dapat dimonitors
