## ** UJIAN PRAKTIK ASYNCHRONOUS NODE.JS — LEVEL MENENGAH KE ATAS**

---

### **Soal 1 — File Logger Otomatis**

> Buat program bernama `logger.js` yang:
>
> 1. Menerima input dari terminal (CLI) berupa teks (pakai `process.argv[2]`)
> 2. Menulis teks itu ke file `log.txt` tanpa menimpa isi lama (gunakan `fs.promises.appendFile`)
> 3. Setelah menulis, tampilkan seluruh isi `log.txt` ke console.

**Ketentuan:**

- Gunakan `async/await`
- Tangani jika file `log.txt` belum ada
- Jika user tidak memberi argumen (tidak mengetik teks), tampilkan pesan error

**Contoh eksekusi:**

```
node logger.js "Belajar Node itu seru"
```

**Output:**

```
 Log berhasil ditulis!
Isi file log:
Belajar Node itu seru
```

---

### **Soal 2 — Server Catatan Async**

> Buat server di `server.js` dengan dua route:

1. **POST /save?text=...**

   - Menyimpan `text` ke file `notes.txt` (tanpa menghapus isi lama)
   - Format tiap baris: `2025-10-18 | teks pengguna`

2. **GET /notes**

   - Membaca dan menampilkan seluruh isi `notes.txt`

**Ketentuan:**

- Gunakan `fs.promises` (jangan callback)
- Tangani jika file belum dibuat
- Semua operasi bersifat asynchronous
- Gunakan status code HTTP yang benar (201, 404, 500)

**Contoh:**

```
GET  /notes      → tampilkan isi notes
POST /save?text=halo dunia → tambah catatan baru
```

---

### **Soal 3 — Simulasi API dengan Delay**

> Buat file `api-sim.js` untuk mensimulasikan permintaan data API secara asynchronous.

Buat tiga fungsi:

1. `getUser()` → return data user setelah 2 detik
2. `getPosts()` → return data postingan setelah 3 detik
3. `getComments()` → return data komentar setelah 1 detik

Lalu buat function `main()` untuk menampilkan semua hasil tersebut **dengan dua cara:**

- **Berurutan** (pakai `await` biasa)
- **Bersamaan** (pakai `Promise.all()`)

**Output yang diharapkan:**

```
=== Eksekusi Berurutan ===
Waktu total: ~6 detik

=== Eksekusi Bersamaan ===
Waktu total: ~3 detik
```

---

### **Bonus Soal (Kalau kamu kuat mental)**

> Ubah **Soal 2** menjadi versi “multi-user”:
>
> - Setiap user punya file sendiri `notes_{username}.txt`
> - Username diambil dari query `/save?user=fitra&text=halo`
> - Tambahkan middleware sederhana untuk validasi user wajib diisi
