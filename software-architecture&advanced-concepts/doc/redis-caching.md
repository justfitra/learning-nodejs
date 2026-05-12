# Redis — Caching & In-Memory Data Store

## Tujuan

Memahami penggunaan Redis pada backend Node.js untuk:

- meningkatkan performa
- mengurangi beban database
- menyimpan data sementara
- mendukung sistem scalable

---

## Apa itu Redis

Redis adalah:

```text
Remote Dictionary Server
```

Redis merupakan:

- in-memory database
- key-value store
- sangat cepat
- sering digunakan sebagai cache

Karena data disimpan di memory (RAM), akses Redis jauh lebih cepat dibanding database biasa.

---

## Kegunaan Redis

Redis umum digunakan untuk:

- caching data
- session store
- rate limiting
- queue system
- pub/sub
- token blacklist
- realtime analytics

---

## Instalasi Redis

### Docker

```bash
docker run -d --name redis -p 6379:6379 redis
```

---

### Local Installation

Linux:

```bash
sudo apt install redis
```

Cek Redis:

```bash
redis-cli ping
```

Output:

```bash
PONG
```

---

## Install Redis Client di Node.js

Gunakan package resmi:

```bash
npm install redis
```

---

## Membuat Redis Client

```js
import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

await redisClient.connect();
```

---

## Konsep Dasar Redis

Redis bekerja dengan:

```text
key → value
```

Contoh:

```text
"user:1" → "{ name: 'Fitra' }"
```

---

## Operasi Dasar Redis

### Set Data

```js
await redisClient.set("name", "Fitra");
```

---

### Get Data

```js
const value = await redisClient.get("name");

console.log(value);
```

---

### Delete Data

```js
await redisClient.del("name");
```

---

### Expired / TTL

```js
await redisClient.set("token", "abc123", {
  EX: 60,
});
```

Artinya:

- data otomatis dihapus setelah 60 detik

---

## Redis sebagai Cache

### Masalah Tanpa Cache

```text
Request
 → Query Database
 → Response
```

Jika request tinggi:

- database overload
- response melambat

---

## Dengan Redis Cache

```text
Request
 → Redis
    → ada data → response
    → tidak ada → query DB → simpan cache
```

---

## Contoh Implementasi Cache

### Tanpa Cache

```js
const products = await Product.find();

res.json(products);
```

Database selalu dipanggil.

---

### Dengan Redis

```js
const cachedProducts = await redisClient.get("products");

if (cachedProducts) {
  return res.json(JSON.parse(cachedProducts));
}

const products = await Product.find();

await redisClient.set("products", JSON.stringify(products), {
  EX: 60,
});

res.json(products);
```

---

## Penjelasan Alur

### Request Pertama

- Redis kosong
- ambil dari database
- simpan ke Redis

### Request Berikutnya

- data diambil langsung dari Redis
- database tidak dipanggil

---

## Cache Invalidation

### Masalah

Jika data database berubah:

```text
Database ≠ Cache
```

Data menjadi stale.

---

## Solusi

Hapus cache saat data berubah.

```js
await Product.create(data);

await redisClient.del("products");
```

---

## Naming Convention Key

Gunakan key yang konsisten.

Contoh:

```text
user:1
product:15
products:all
session:userId
```

Hindari:

```text
data1
cachebaru
produkAneh
```

Manusia sudah cukup membingungkan tanpa key random.

---

## Redis untuk Session Store

Tanpa Redis:

- session hilang saat server restart

Dengan Redis:

- session tersimpan terpusat
- cocok untuk multi-server

Contoh:

```js
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
    }),
  }),
);
```

---

## Redis untuk Rate Limiting

Redis dapat menyimpan:

- jumlah request
- waktu request

Digunakan untuk:

- anti spam
- anti brute force
- API protection

---

## Redis Data Types

| Type       | Kegunaan        |
| ---------- | --------------- |
| String     | cache sederhana |
| List       | queue           |
| Set        | unique values   |
| Hash       | object data     |
| Sorted Set | ranking         |

---

## Best Practices

### Gunakan TTL

```js
EX: 60;
```

Cache tanpa expired bisa menjadi sampah permanen.

---

### Jangan Cache Semua

Cache hanya:

- query mahal
- data sering dibaca
- data jarang berubah

---

### Serialize JSON

Redis menyimpan string.

```js
JSON.stringify(data);
JSON.parse(data);
```

---

### Pisahkan Cache Key

Gunakan namespace:

```text
product:
user:
session:
```

---

## Kesalahan Umum

- Tidak menggunakan TTL
- Cache tidak dihapus saat update data
- Menyimpan data terlalu besar
- Menganggap Redis pengganti database utama
- Menyimpan password plain text di Redis

Jangan lakukan itu. Dunia backend sudah cukup menderita.

---

## Kapan Menggunakan Redis

Gunakan Redis jika:

- response API mulai lambat
- database sering query berulang
- membutuhkan session terpusat
- membutuhkan realtime feature
- traffic mulai meningkat

---

## Kesimpulan

Redis adalah komponen penting dalam backend modern karena:

- sangat cepat
- ringan
- fleksibel

Redis bukan pengganti database utama, tetapi pelengkap untuk:

- performa
- scalability
- efisiensi sistem
