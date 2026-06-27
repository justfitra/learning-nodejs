# Cluster, Load Balancing, dan Scaling pada Node.js

## Tujuan

Memahami bagaimana Node.js menangani banyak request dengan:

- Cluster
- Load Balancing
- Scaling

Materi ini sangat penting karena Node.js secara default hanya menggunakan satu CPU core.

---

# Studi Kasus

Misalkan server memiliki:

```text
8 CPU Core
```

Tetapi aplikasi berjalan seperti ini:

```js
app.listen(3000);
```

Node.js hanya menggunakan:

```text
1 Process
1 CPU Core
```

Akibatnya:

```text
CPU 1 : bekerja
CPU 2 : idle
CPU 3 : idle
CPU 4 : idle
CPU 5 : idle
CPU 6 : idle
CPU 7 : idle
CPU 8 : idle
```

Resource server terbuang.

---

# Arsitektur Dasar

## Tanpa Cluster

```text
Client
   │
   ▼
Server (1 Process)
```

Semua request diproses oleh satu process.

Jika process sibuk:

```text
request menumpuk
```

Jika process crash:

```text
aplikasi mati
```

---

# Apa Itu Cluster

Cluster adalah fitur bawaan Node.js yang memungkinkan satu aplikasi dijalankan oleh banyak process.

Setiap process disebut:

```text
Worker
```

---

# Arsitektur Cluster

```text
                 Primary Process
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼

      Worker 1       Worker 2       Worker 3
      Port 3001      Port 3002      Port 3003
```

Semua worker menjalankan aplikasi yang sama.

---

# Apa Itu Load Balancer

Load Balancer bertugas:

```text
membagi request ke worker
```

---

# Arsitektur Lengkap

```text
                Client
                   │
                   ▼

             Load Balancer
                   │

        ┌──────────┼──────────┐
        ▼          ▼          ▼

     Worker1    Worker2    Worker3
```

Tanpa load balancer:

```text
semua request masuk ke satu worker
```

Dengan load balancer:

```text
beban dibagi rata
```

---

# Struktur Folder

```text
src/

├── app.js
├── server.js
└── load_balancer.js
```

---

# Membuat Aplikasi

## app.js

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    pid: process.pid,
    message: "Server Running",
  });
});

export default app;
```

---

# Membuat Worker

## server.js

```js
import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Worker ${process.pid} running on port ${PORT}`);
});
```

---

# Penjelasan

Setiap worker akan berjalan pada port berbeda.

Contoh:

```text
Worker 1 -> 3001
Worker 2 -> 3002
Worker 3 -> 3003
```

---

# Menjalankan Worker

Terminal 1

```bash
PORT=3001 node server.js
```

Terminal 2

```bash
PORT=3002 node server.js
```

Terminal 3

```bash
PORT=3003 node server.js
```

---

# Membuat Load Balancer

## load_balancer.js

```js
import httpProxy from "http-proxy";
import http from "http";

const proxy = httpProxy.createProxyServer();

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

let current = 0;

const server = http.createServer((req, res) => {
  const target = servers[current];

  current = (current + 1) % servers.length;

  proxy.web(req, res, {
    target,
  });
});

server.listen(3000, () => {
  console.log("Load Balancer running on port 3000");
});
```

---

# Instalasi

```bash
npm install http-proxy
```

---

# Cara Kerja

Ketika request datang:

Request 1

```text
localhost:3000
      ↓
Worker 3001
```

Request 2

```text
localhost:3000
      ↓
Worker 3002
```

Request 3

```text
localhost:3000
      ↓
Worker 3003
```

Request 4

```text
localhost:3000
      ↓
Worker 3001
```

---

# Algoritma Ini Disebut

```text
Round Robin
```

Karena pembagian dilakukan bergiliran.

---

# Visualisasi

```text
Request 1 -> Worker A
Request 2 -> Worker B
Request 3 -> Worker C
Request 4 -> Worker A
Request 5 -> Worker B
Request 6 -> Worker C
```

---

# Menguji Load Balancer

Buka browser:

```text
http://localhost:3000
```

Refresh beberapa kali.

Hasil:

```json
{
  "pid": 1001
}
```

Refresh lagi:

```json
{
  "pid": 1002
}
```

Refresh lagi:

```json
{
  "pid": 1003
}
```

Artinya request berpindah-pindah worker.

---

# Apa Itu Scaling

Scaling adalah meningkatkan kapasitas aplikasi.

---

# Vertical Scaling

Menambah resource server.

Contoh:

```text
2 CPU
↓
8 CPU
```

atau

```text
4 GB RAM
↓
16 GB RAM
```

---

# Ilustrasi

```text
Server Kecil
     ↓
Server Lebih Besar
```

---

# Kelebihan

- mudah dilakukan
- tidak mengubah kode

---

# Kekurangan

- ada batas hardware
- biaya semakin mahal

---

# Horizontal Scaling

Menambah jumlah server.

---

# Sebelum

```text
Client
  │
  ▼
Server A
```

---

# Sesudah

```text
Client
   │
   ▼

Load Balancer
   │

 ┌─┼─┐
 ▼ ▼ ▼

A B C
```

---

# Kelebihan

- lebih scalable
- lebih tahan terhadap crash

---

# Contoh

Server A mati:

```text
A ❌
B ✅
C ✅
```

Aplikasi tetap berjalan.

---

# Masalah Session

Misal login:

```text
User
 ↓
Server A
```

Session disimpan:

```text
Memory Server A
```

Request berikutnya:

```text
User
 ↓
Server B
```

Session tidak ditemukan.

---

# Solusi

Gunakan:

```text
Redis
```

---

# Arsitektur Session Production

```text
            User
              │
              ▼

       Load Balancer
              │

     ┌────────┼────────┐
     ▼        ▼        ▼

 ServerA  ServerB  ServerC

     │        │        │
     └────────┼────────┘

              ▼

            Redis
```

---

# JWT dan Scaling

Karena masalah session, banyak API modern menggunakan:

```text
JWT
```

Karena token berada di client.

Worker mana pun dapat memverifikasi token.

Tidak perlu berbagi session memory.

---

# Cluster vs Load Balancer

## Cluster

Tugas:

```text
membuat banyak process
```

Contoh:

```text
Worker 1
Worker 2
Worker 3
Worker 4
```

---

## Load Balancer

Tugas:

```text
membagi request
```

Contoh:

```text
Request
 ↓
Worker 1

Request
 ↓
Worker 2
```

---

# Hubungan Keduanya

Cluster membuat banyak worker.

Load Balancer membagi request ke worker tersebut.

Keduanya hampir selalu digunakan bersamaan.

---

# Arsitektur Production Modern

```text
Internet
    │
    ▼

Cloudflare
    │
    ▼

Nginx
    │
    ▼

PM2 Cluster
    │
    ▼

Express.js
    │
    ▼

Redis
    │
    ▼

MongoDB
```

---

# Best Practices

1. Gunakan PM2 untuk cluster production.
2. Gunakan Nginx sebagai reverse proxy dan load balancer.
3. Simpan session di Redis.
4. Gunakan JWT untuk REST API.
5. Monitor CPU dan memory.
6. Jangan simpan state di memory process.

---

# Kesimpulan

Cluster digunakan untuk memanfaatkan seluruh CPU core.

Load Balancer digunakan untuk membagi request.

Scaling digunakan untuk meningkatkan kapasitas aplikasi.

Urutan pemahaman yang disarankan:

```text
Express App
      ↓
Cluster
      ↓
Load Balancer
      ↓
Redis
      ↓
PM2
      ↓
Nginx
      ↓
Horizontal Scaling
```

Jika memahami alur tersebut, maka fondasi deployment backend modern sudah terbentuk dengan baik.
