# Software Architecture & Advanced Concepts

## Tujuan

Membangun backend Node.js yang:

- terstruktur
- mudah diuji
- siap berkembang
- tidak runtuh saat fitur bertambah

Fokus utama level ini adalah **arsitektur kode dan kesiapan produksi**, bukan sekadar endpoint berjalan.

---

## 1. MVC vs Service Layer Pattern

### Masalah Umum MVC

Pada MVC tradisional, controller sering berisi:

- validasi
- business logic
- query database
- response handling

Contoh controller bermasalah:

```js
export const createUser = async (req, res) => {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) {
    return res.status(409).json({ message: "Email exists" });
  }

  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });

  res.status(201).json(user);
};
```

Controller menjadi terlalu besar dan sulit diuji.

---

### Service Layer Pattern

Business logic dipindahkan ke **service**.

#### Service

```js
export const createUserService = async (payload) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new AppError(409, "Email exists");
  }

  payload.password = await bcrypt.hash(payload.password, 10);
  return User.create(payload);
};
```

#### Controller

```js
export const createUser = async (req, res) => {
  const user = await createUserService(req.body);
  res.status(201).json(user);
};
```

Controller fokus ke HTTP, service fokus ke logic.

---

## 2. Clean Architecture & Dependency Injection

### Prinsip Clean Architecture

- Business logic tidak boleh bergantung pada framework
- Dependency mengarah ke dalam
- Layer luar boleh berganti tanpa merusak core

### Contoh Dependency Injection Sederhana

```js
export const createUserService = ({ userRepository }) => {
  return async (payload) => {
    return userRepository.create(payload);
  };
};
```

Repository bisa diganti (MongoDB, PostgreSQL, mock test) tanpa mengubah service.

---

## 3. File Upload (Multer)

### Konsep Teknis

- Upload menggunakan `multipart/form-data`
- File tidak boleh dipercaya
- Validasi wajib

### Contoh Konfigurasi Dasar

```js
const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});
```

File upload adalah **surface attack**, bukan fitur biasa.

---

## 4. Caching dengan Redis

### Masalah Tanpa Cache

```js
GET /products
→ query database setiap request
```

### Dengan Redis

```js
const cached = await redis.get("products");
if (cached) return JSON.parse(cached);

const products = await Product.find();
await redis.set("products", JSON.stringify(products), "EX", 60);
```

### Konsep Penting

- Cache key design
- TTL
- Cache invalidation saat data berubah

---

## 5. Unit Testing (Jest / Mocha / Supertest)

### Unit Test Service

```js
test("should create user", async () => {
  const user = await createUserService(payload);
  expect(user.email).toBe(payload.email);
});
```

### Integration Test API

```js
await request(app).post("/users").send(payload).expect(201);
```

Testing difokuskan pada:

- service (logic)
- endpoint penting
  bukan pada framework.

---

## 6. Logging dengan Winston

### Masalah console.log

- Tidak ada level
- Tidak terstruktur
- Tidak cocok untuk production

### Winston Dasar

```js
logger.error("Database connection failed", {
  service: "user-service",
});
```

Logging harus:

- konsisten
- terstruktur
- tidak mencetak data sensitif

---

## 7. Cluster, Load Balancing, dan Scaling

### Masalah Default Node.js

- 1 process
- 1 core CPU

### Dengan Cluster / PM2

```bash
pm2 start app.js -i max
```

### Tujuan Scaling

- memanfaatkan semua core
- meningkatkan availability
- menahan lonjakan traffic
