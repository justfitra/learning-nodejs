/*
 Tantangan Singkat: “Form vs JSON Hell”

Instruksi:

1. Buat satu server Express baru.
2. Aktifkan `express.json()` dan `express.urlencoded({ extended: true })`.
3. Buat dua route:
   * `POST /json` → kirim data JSON `{ "title": "Belajar", "level": 3 }`
   * `POST /form` → kirim data form `title=Belajar&level=3`
4. Kedua route harus **menampilkan hasil parsing body-nya di console** dan **balas response JSON** seperti:

   ```json
   {
     "received": { "title": "Belajar", "level": 3 }
   }
   ```
5. Kalau salah satu body kosong, kirim:

   ```json
   { "error": "Data tidak boleh kosong" }
   ```

---


*/

import express from "express";

const app = express();

app.use("/json", express.json());
app.use("/form", express.urlencoded({ extended: true }));

app.post("/json", (req, res) => {
  if (!req.body.title && !req.body.content) {
    req
      .status(400)
      .json({ message: "Error title and content must be required" });
  }
  res.status(201).json(req.body);
});

app.post("/form", (req, res) => {
  res.status(201).json(req.body);
});

app.listen(3000);
