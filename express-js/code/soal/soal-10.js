/*

### 💥 Soal:

Buat server Express dengan ketentuan berikut:

1. Gunakan **body parser** bawaan Express (`express.json()` dan `express.urlencoded({ extended: true })`) agar server bisa menerima **JSON** dan **form data (URL-encoded)**.
2. Buat route `POST /user` untuk menerima data user:

   ```json
   {
     "name": "Fitra",
     "age": 19
   }
   ```
3. Jika:

   * `name` kosong → lempar error dengan pesan `"Nama wajib diisi"`
   * `age` bukan angka → lempar error dengan pesan `"Umur harus berupa angka"`
4. Jika data valid → kirim response:

   ```json
   {
     "message": "Data diterima",
     "data": { "name": "Fitra", "age": 19 }
   }
   ```
5. Tambahkan **error handling middleware global** agar semua error dijawab dengan format JSON:

   ```json
   { "message": "Terjadi kesalahan server", "detail": "pesan error asli" }
   ```

---

### 🧠 Contoh Output:

#### Request:

```
POST /user
Content-Type: application/json

{
  "name": "",
  "age": "abc"
}
```

#### Response:

```json
{
  "message": "Terjadi kesalahan server",
  "detail": "Nama wajib diisi"
}
```
*/

import express from "express";

const app = express();

app.use(express.json());

const validation = (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;

  if (name === "") {
    throw new Error("Nama wajib diisi");
  }

  if (typeof age !== "number") {
    throw new Error("Umur harus berupa angka");
  }
  next();
};

app.post("/user", validation, (req, res) => {
  res.status(201).json({ message: "Data diterima", data: req.body });
});

app.use((err, req, res, next) => {
  if (req.url === "/user") {
    return res.status(401).json({ message: err.message });
  }
  res.status(500).send("Terjadi kesalahan di server!");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
