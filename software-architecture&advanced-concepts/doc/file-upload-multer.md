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

## CRUD file upload (multer)

### 1. Create

Controller

```js
const create = async (req, res, next) => {
  try {
    const product = await productService.create(productRepository, req);

    res.status(201).json(formatResposne(201, "Success", product));
  } catch (err) {
    next(err);
  }
};
```

Service

```js
const create = async (repository, payload) => {
  try {
    const product = await repository.create({
      ...payload.body,
      image: payload.file.filename,
    });

    await deleteProductCache();

    return product;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};
```

Repository

```js
const create = async (payload) => {
  const product = await Products.create(payload);

  return product;
};
```

### 2. Read

Controller

```js
const show = async (req, res, next) => {
  try {
    const product = await productService.show(
      productRepository,
      req.params.title,
    );

    res.status(200).json(formatResposne(200, "Success", product));
  } catch (err) {
    next(err);
  }
};
```

Service

```js
const show = async (repository, title) => {
  try {
    const cached = await getProductCache();

    if (cached) {
      return cached;
    }
    const product = await repository.show(title);
    await setProductCache(product);

    return product;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};
```

Repository

```js
const show = async (title) => {
  const product = await Products.find({ title: title });

  return product;
};
```

### 3. Update

Controller

```js
const update = async (req, res, next) => {
  try {
    const product = await productService.update(
      productRepository,
      req,
      req.params.title,
    );

    res.status(201).json(formatResposne(201, "Success", product));
  } catch (err) {
    next(err);
  }
};
```

Service

```js
const update = async (repository, payload, title) => {
  try {
    const product = await Products.findOne({ title: title });

    if (!product) throw new AppError("Product not found", 404);

    let imgPath = product.image;

    if (payload.file) {
      if (product.image) {
        const oldPath = path.join(__dirname, "../uploads", product.image);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      imgPath = payload.file.filename;
    }

    const { name, price, description } = payload;

    const updated = await repository.update(title, {
      name,
      price,
      description,
      image: imgPath,
    });

    await deleteProductCache();

    return updated;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};
```

Repository

```js
const update = async (title, payload) => {
  const product = await Products.findOneAndUpdate(
    { title: title },
    { ...payload },
    { new: true, runValidators: true },
  );

  return product;
};
```

### 4. Delete

Controller

```js
const del = async (req, res, next) => {
  try {
    const product = await productService.del(
      productRepository,
      req.params.title,
    );

    res.status(200).json(formatResposne(200, "Success"));
  } catch (err) {
    next(err);
  }
};
```

Service

```js
const del = async (repository, title) => {
  try {
    const product = await Products.findOne({ title: title });

    if (product.image) {
      const imgPath = path.join(__dirname, "../uploads", product.image);
      fs.unlinkSync(imgPath);
    }
    await repository.del(title);

    return "Success";
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};
```

Repository

```js
const del = async (title) => {
  const product = await Products.deleteOne({ title: title });

  return product;
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
