# File Upload dengan Multer (Node.js + Express)

## Tujuan

Memahami dan mengimplementasikan upload file menggunakan **Multer** di Express dengan:

- validasi file
- pembatasan ukuran
- pengamanan dasar
- struktur kode yang rapi

---

## Apa itu Multer

Multer adalah middleware untuk Express yang digunakan untuk menangani:

```

multipart/form-data

```

Biasanya digunakan untuk:

- upload gambar
- upload dokumen
- upload file dari form

---

## Instalasi

```bash
npm install multer
```

---

## Konsep Dasar

Request upload file:

```
Content-Type: multipart/form-data
```

Multer akan:

- membaca file dari request
- menyimpannya (disk/memory)
- menambahkan file ke `req.file` atau `req.files`

---

## Struktur Dasar

```
src/
 ├─ uploads/
 ├─ middleware/
 │   └─ upload.js
 ├─ routes/
 └─ controllers/
```

---

## Konfigurasi Multer

### 1. Storage (Disk Storage)

```js
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
```

---

### 2. Upload Single File

```js
router.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    file: req.file,
  });
});
```

---

### 3. Upload Multiple Files

```js
router.post("/upload-multiple", upload.array("images", 5), (req, res) => {
  res.json({
    files: req.files,
  });
});
```

---

## Validasi File

### 1. Validasi Tipe File

```js
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only images allowed"), false);
  }
  cb(null, true);
};
```

---

### 2. Validasi Ukuran File

```js
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});
```

---

## Mengakses File di Controller

```js
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File required" });
  }

  res.status(200).json({
    filename: req.file.filename,
    path: req.file.path,
  });
};
```

---

## Error Handling Multer

```js
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
});
```

---

## Security Best Practices

### 1. Jangan percaya `mimetype`

Gunakan validasi tambahan jika perlu:

- cek ekstensi
- gunakan library seperti `file-type`

---

### 2. Batasi ukuran file

```js
limits: { fileSize: 2MB }
```

---

### 3. Jangan simpan di public folder langsung

Hindari:

```
/public/uploads
```

Lebih aman:

```
/uploads (akses terbatas)
```

---

### 4. Rename file

Jangan gunakan nama asli user:

```js
Date.now() + "-" + file.originalname;
```

---

### 5. Hindari upload executable

Blok:

- `.exe`
- `.js`
- `.sh`

---

## Disk vs Memory Storage

| Tipe   | Kelebihan    | Kekurangan         |
| ------ | ------------ | ------------------ |
| Disk   | Stabil, aman | I/O lebih lambat   |
| Memory | Cepat        | Risiko memory leak |

Gunakan:

- Disk → default
- Memory → untuk upload ke cloud (S3, dll)

---

## Integrasi dengan Service Layer

Controller hanya menerima file:

```js
export const uploadController = async (req, res) => {
  const result = await uploadService(req.file);
  res.json(result);
};
```

Service mengurus logic:

- simpan metadata
- kirim ke cloud
- validasi lanjutan

---

## Kesalahan Umum

- Tidak membatasi ukuran file
- Tidak validasi tipe file
- Menyimpan file dengan nama asli
- Menaruh semua logic di controller
- Menganggap upload file sebagai fitur sederhana

---

## Kesimpulan

Upload file adalah salah satu titik rawan dalam sistem backend.
Multer membantu menangani parsing file, tetapi keamanan tetap tanggung jawab developer.

Implementasi yang benar harus mencakup:

- validasi
- pembatasan
- pengamanan
- struktur kode yang rapi

---

```

```
