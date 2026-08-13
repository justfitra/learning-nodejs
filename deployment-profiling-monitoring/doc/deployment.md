# Deployment Express.js

## Tujuan

Memahami cara menjalankan aplikasi Express.js di server production menggunakan:

- Render
- Railway
- VPS
- PM2
- Nginx
- Environment Variables
- Reverse Proxy
- Process Management

Setelah mempelajari materi ini, aplikasi tidak hanya berjalan menggunakan:

```bash
npm run dev
```

tetapi dapat berjalan pada server dan diakses melalui internet.

---

# 1. Apa Itu Deployment?

Deployment adalah proses memindahkan aplikasi dari environment development ke environment yang dapat digunakan oleh user.

Development:

```text
Laptop Developer
      |
      v
Express.js
      |
      v
localhost:3000
```

Production:

```text
Internet
    |
    v
Server
    |
    v
Express.js
    |
    v
Database
```

---

# 2. Development vs Production

## Development

Biasanya:

```text
localhost
nodemon
debug log
.env
database lokal
```

Contoh:

```bash
npm run dev
```

---

## Production

Biasanya:

```text
Domain
HTTPS
PM2
Nginx
Database production
Environment variables
Monitoring
```

Contoh:

```text
https://api.example.com
```

---

# 3. Pilihan Deployment

Secara umum ada dua pendekatan:

```text
                    Deployment
                        |
              ┌─────────┴─────────┐
              |                   |
          Managed              VPS
          Platform
              |                   |
       Render / Railway      PM2 + Nginx
```

---

# 4. Managed Platform

Platform seperti Render dan Railway menangani sebagian pekerjaan server untuk developer.

Developer cukup menyediakan:

```text
Source Code
Environment Variables
Build Command
Start Command
```

Platform akan menangani:

- provisioning server
- menjalankan aplikasi
- networking
- deployment
- restart
- sebagian konfigurasi infrastructure

Ini cocok untuk belajar deployment tanpa harus langsung mengurus Linux server.

---

# 5. Deployment Menggunakan Render

## Persiapan Project

Pastikan project memiliki:

```text
package.json
src/
.env
```

Contoh:

```text
project/
├── src/
│   ├── app.js
│   └── server.js
├── package.json
└── .gitignore
```

---

# 6. package.json

Contoh:

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "test": "jest"
  }
}
```

Production akan menjalankan:

```bash
npm start
```

---

# 7. Jangan Hardcode PORT

Jangan:

```js
app.listen(3000);
```

Gunakan:

```js
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Kenapa?

Platform deployment biasanya menentukan port melalui environment variable.

---

# 8. Environment Variables

Contoh `.env`:

```env
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/myapp

JWT_ACCESS_SECRET=your-secret

JWT_REFRESH_SECRET=your-refresh-secret

REDIS_URL=redis://localhost:6379
```

Jangan upload `.env` ke Git.

---

# 9. .gitignore

```gitignore
node_modules/
.env
.env.*
logs/
uploads/
```

Jika terdapat file:

```text
.env
```

jangan commit ke repository.

---

# 10. Git Repository

Project sebaiknya berada di repository Git.

Contoh:

```text
GitHub
   |
   v
Express.js Project
```

Platform deployment kemudian mengambil source code dari repository tersebut.

---

# 11. Render Deployment Flow

Secara konsep:

```text
Developer
    |
    v
GitHub
    |
    v
Render
    |
    v
Build
    |
    v
npm start
    |
    v
Express API
```

---

# 12. Build Command

Untuk project Node.js sederhana:

```bash
npm install
```

Biasanya platform akan menjalankan proses instalasi dependency secara otomatis.

---

# 13. Start Command

Gunakan:

```bash
npm start
```

atau:

```bash
node src/server.js
```

---

# 14. Environment Variables di Render

Jangan upload `.env`.

Masukkan variable melalui konfigurasi environment platform.

Contoh:

```text
NODE_ENV=production

MONGO_URI=...

JWT_ACCESS_SECRET=...

JWT_REFRESH_SECRET=...

REDIS_URL=...
```

---

# 15. Railway

Konsep Railway hampir sama:

```text
GitHub
   |
   v
Railway
   |
   v
Build
   |
   v
Node.js
   |
   v
Express
```

Railway juga menyediakan environment variables untuk konfigurasi production.

---

# 16. Kelebihan Managed Platform

Kelebihan:

- setup cepat
- tidak perlu mengurus Linux secara manual
- deployment relatif sederhana
- cocok untuk project kecil
- cocok untuk belajar CI/CD dasar

---

# 17. Kekurangan

Kamu tidak memiliki kontrol penuh terhadap server.

Misalnya:

```text
kernel
systemd
firewall
nginx
filesystem
process management
```

tidak kamu kelola secara langsung seperti pada VPS.

---

# 18. Deployment Menggunakan VPS

VPS memberikan kontrol lebih besar.

Contoh:

```text
Developer
    |
    v
VPS
    |
    ├── Nginx
    |
    ├── PM2
    |
    └── Node.js
```

---

# 19. Arsitektur VPS

Arsitektur sederhana:

```text
             Internet
                 |
                 v
              Nginx
                 |
                 v
            PM2 Process
                 |
                 v
            Express.js
                 |
        ┌────────┴────────┐
        v                 v
    MongoDB             Redis
```

---

# 20. Kenapa Tidak Langsung Node.js?

Misalnya:

```text
Internet
   |
   v
Node.js :3000
```

Masalahnya:

- port aplikasi terekspos
- tidak ada reverse proxy
- process management belum ada
- restart manual
- konfigurasi HTTPS lebih merepotkan

Karena itu digunakan:

```text
Nginx + PM2
```

---

# 21. Apa Itu PM2?

PM2 adalah process manager untuk aplikasi Node.js.

PM2 membantu:

- menjalankan aplikasi
- restart aplikasi
- auto restart ketika crash
- menjalankan cluster
- monitoring process
- mengelola log

---

# 22. Instalasi PM2

Pada VPS:

```bash
npm install -g pm2
```

Cek:

```bash
pm2 --version
```

---

# 23. Menjalankan Express

Misalnya:

```text
src/server.js
```

Jalankan:

```bash
pm2 start src/server.js --name express-api
```

---

# 24. Melihat Process

```bash
pm2 list
```

Contoh:

```text
┌────┬─────────────┬─────────┬────────┐
│ id │ name        │ status  │ cpu    │
├────┼─────────────┼─────────┼────────┤
│ 0  │ express-api │ online  │ 0.5%   │
└────┴─────────────┴─────────┴────────┘
```

---

# 25. Melihat Log

```bash
pm2 logs express-api
```

---

# 26. Restart

```bash
pm2 restart express-api
```

---

# 27. Stop

```bash
pm2 stop express-api
```

---

# 28. Delete

```bash
pm2 delete express-api
```

---

# 29. Auto Restart

Jika aplikasi crash:

```text
Express
   |
   X
Crash
   |
   v
PM2
   |
   v
Restart
```

Ini salah satu alasan process manager digunakan.

---

# 30. PM2 Cluster Mode

Jika VPS memiliki beberapa CPU core:

```bash
pm2 start src/server.js \
  --name express-api \
  -i max
```

`-i max` meminta PM2 menggunakan jumlah worker berdasarkan CPU yang tersedia.

Contoh:

```text
CPU: 4 Core

Worker 1
Worker 2
Worker 3
Worker 4
```

---

# 31. Apa Itu Nginx?

Nginx dapat digunakan sebagai:

- reverse proxy
- load balancer
- static file server
- HTTPS termination

Dalam arsitektur Express, fungsi utamanya sering menjadi reverse proxy.

---

# 32. Reverse Proxy

Tanpa Nginx:

```text
Client
   |
   v
:3000
   |
   v
Express
```

Dengan Nginx:

```text
Client
   |
   v
Nginx :80/:443
   |
   v
Express :3000
```

User tidak perlu mengakses:

```text
http://server-ip:3000
```

tetapi dapat menggunakan:

```text
https://api.example.com
```

---

# 33. Instalasi Nginx

Pada Ubuntu:

```bash
sudo apt update
sudo apt install nginx
```

Cek:

```bash
sudo systemctl status nginx
```

---

# 34. Konfigurasi Nginx

Contoh:

```nginx
server {
    listen 80;

    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;

        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

# 35. Cara Kerjanya

User mengakses:

```text
https://api.example.com/users
```

Request masuk:

```text
Internet
   |
   v
Nginx
   |
   v
127.0.0.1:3000
   |
   v
Express
```

Express tetap berjalan pada port:

```text
3000
```

tetapi user tidak perlu mengetahui port tersebut.

---

# 36. Kenapa Express Menggunakan 127.0.0.1?

Dengan:

```nginx
proxy_pass http://127.0.0.1:3000;
```

Express dapat dibuat hanya menerima koneksi dari server lokal.

Nginx menjadi pintu masuk utama.

```text
Internet
   |
   X
Express :3000

Internet
   |
   v
Nginx :443
   |
   v
Express :3000
```

---

# 37. HTTPS

Production sebaiknya menggunakan HTTPS.

Arsitektur:

```text
Client
  |
  | HTTPS
  v
Nginx
  |
  | HTTP internal
  v
Express
```

Salah satu pilihan populer untuk sertifikat TLS adalah Let's Encrypt.

---

# 38. DNS

Agar domain mengarah ke VPS:

```text
api.example.com
        |
        v
    VPS IP Address
```

DNS record biasanya berupa:

```text
Type: A
Name: api
Value: VPS_IP
```

---

# 39. Alur Request Production

Ketika user mengakses:

```text
https://api.example.com/posts
```

alur lengkapnya:

```text
                Internet
                    |
                    v
                  DNS
                    |
                    v
                  VPS
                    |
                    v
                 Nginx
                    |
                    v
                  PM2
                    |
                    v
               Express.js
                    |
             ┌──────┴──────┐
             v             v
          MongoDB        Redis
```

---

# 40. Deployment Workflow

Setelah melakukan perubahan kode:

```text
Developer
    |
    v
Git commit
    |
    v
Git push
    |
    v
VPS
    |
    v
git pull
    |
    v
npm install
    |
    v
PM2 restart
```

---

# 41. Contoh Deployment Manual

Masuk ke VPS:

```bash
ssh user@server-ip
```

Masuk project:

```bash
cd my-api
```

Ambil perubahan:

```bash
git pull
```

Install dependency:

```bash
npm install
```

Restart:

```bash
pm2 restart express-api
```

---

# 42. Jangan Jalankan npm run dev di Production

Development:

```bash
npm run dev
```

Biasanya menggunakan:

```text
nodemon
```

Production:

```bash
pm2 start src/server.js
```

---

# 43. Environment Production

Contoh:

```env
NODE_ENV=production

PORT=3000

MONGO_URI=mongodb://...

REDIS_URL=redis://...

JWT_ACCESS_SECRET=...

JWT_REFRESH_SECRET=...
```

Secret jangan ditulis langsung di source code.

Buruk:

```js
const secret = "123456";
```

Lebih baik:

```js
const secret = process.env.JWT_ACCESS_SECRET;
```

---

# 44. File .env di VPS

`.env` harus berada di server tetapi tidak di repository public.

Contoh:

```text
my-api/
├── src/
├── package.json
├── .env
└── node_modules/
```

`.env` tidak masuk Git.

---

# 45. PM2 dan Environment Variable

PM2 akan menjalankan process dengan environment variable yang tersedia pada server.

Cek:

```bash
pm2 env 0
```

Gunakan sesuai kebutuhan dan jangan menampilkan secret ke log atau repository.

---

# 46. Scaling dengan PM2

Satu process:

```text
VPS
 |
 └── Express
```

Cluster:

```text
VPS
 |
 ├── Worker 1
 ├── Worker 2
 ├── Worker 3
 └── Worker 4
```

PM2 dapat mengelola worker tersebut.

---

# 47. Nginx + PM2 Cluster

Arsitektur:

```text
                  Client
                     |
                     v
                   Nginx
                     |
             ┌───────┼───────┐
             v       v       v
          Worker  Worker  Worker
             \       |       /
              \      |      /
                   PM2
                     |
                     v
                 Express
```

Nginx menjadi reverse proxy.

PM2 mengelola process Node.js.

---

# 48. Horizontal Scaling

Jika satu VPS tidak cukup:

```text
                  Load Balancer
                  /     |     \
                 /      |      \
               VPS1    VPS2    VPS3
                |       |       |
              Node    Node    Node
```

Ini disebut horizontal scaling.

Jumlah server bertambah.

---

# 49. Vertical Scaling

Jika VPS:

```text
2 CPU
4 GB RAM
```

kemudian upgrade:

```text
8 CPU
16 GB RAM
```

Ini disebut vertical scaling.

---

# 50. Managed Platform vs VPS

| Aspek                  | Render / Railway      | VPS                           |
| ---------------------- | --------------------- | ----------------------------- |
| Setup                  | mudah                 | lebih kompleks                |
| Linux                  | tidak perlu banyak    | perlu                         |
| Nginx                  | biasanya tidak perlu  | perlu                         |
| PM2                    | biasanya tidak perlu  | perlu                         |
| Kontrol                | terbatas              | tinggi                        |
| Maintenance            | lebih sedikit         | lebih banyak                  |
| Belajar infrastructure | terbatas              | sangat baik                   |
| Cocok untuk            | project kecil/belajar | production dan belajar server |

---

# 51. Urutan Belajar yang Disarankan

Mulai dari:

```text
Express
   ↓
Environment Variables
   ↓
Git
   ↓
Render / Railway
   ↓
VPS
   ↓
PM2
   ↓
Nginx
   ↓
HTTPS
   ↓
Redis
   ↓
Scaling
```

Jangan langsung lompat ke Kubernetes.

Kubernetes sebelum memahami process, port, reverse proxy, dan server biasanya menghasilkan konfigurasi YAML yang panjang tanpa benar-benar tahu apa yang sedang terjadi. Manusia memang memiliki bakat luar biasa untuk mengotomatisasi sesuatu sebelum memahami dasarnya.

---

# 52. Checklist Deployment

## Application

- [ ] `npm start` berjalan
- [ ] PORT menggunakan `process.env.PORT`
- [ ] `NODE_ENV=production`
- [ ] error handling aktif
- [ ] logging aktif

## Security

- [ ] `.env` tidak di-commit
- [ ] JWT secret aman
- [ ] HTTPS aktif
- [ ] CORS dikonfigurasi
- [ ] Helmet digunakan
- [ ] Rate limiting digunakan

## VPS

- [ ] Node.js terinstall
- [ ] Git terinstall
- [ ] PM2 terinstall
- [ ] Nginx terinstall
- [ ] firewall dikonfigurasi
- [ ] domain mengarah ke VPS

## Database

- [ ] MongoDB production tersedia
- [ ] Redis production tersedia
- [ ] connection string aman

---

# 53. Kesimpulan

Deployment bukan hanya menjalankan:

```bash
node server.js
```

Pada production, kita membutuhkan beberapa komponen:

```text
                    Internet
                       |
                       v
                     DNS
                       |
                       v
                    Nginx
                       |
                       v
                     PM2
                       |
              ┌────────┴────────┐
              v                 v
         Express Worker     Express Worker
              |                 |
              └────────┬────────┘
                       |
              ┌────────┴────────┐
              v                 v
            Redis           MongoDB
```

Peran setiap komponen:

### Render / Railway

Mempermudah deployment tanpa mengelola server secara manual.

### VPS

Memberikan kontrol penuh terhadap server.

### PM2

Mengelola process Node.js.

### Nginx

Menjadi reverse proxy dan dapat menjadi load balancer.

### Redis

Menyimpan data yang perlu dibagikan antar instance, seperti session atau cache.

### MongoDB

Menyimpan data utama aplikasi.

---

# Final Architecture

Untuk aplikasi Express.js yang sudah berkembang:

```text
                         Internet
                            |
                            v
                         Domain
                            |
                            v
                     Nginx / LB
                            |
              ┌─────────────┼─────────────┐
              v             v             v
           Server 1      Server 2      Server 3
              |             |             |
            PM2           PM2           PM2
              |             |             |
           Node.js       Node.js       Node.js
              |             |             |
              └─────────────┼─────────────┘
                            |
                 ┌──────────┴──────────┐
                 v                     v
               Redis                MongoDB
```

Konsep yang perlu benar-benar dipahami:

```text
Deployment
    ↓
Process Management
    ↓
Reverse Proxy
    ↓
Load Balancing
    ↓
Horizontal Scaling
```

Setelah memahami alur tersebut, barulah tools seperti Docker, CI/CD, cloud load balancer, container orchestration, dan Kubernetes masuk akal untuk dipelajari.
