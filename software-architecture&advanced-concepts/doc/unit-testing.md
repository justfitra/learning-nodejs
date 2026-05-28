# Unit Testing pada Express.js

## Tujuan

Memahami implementasi testing modern pada backend Express.js menggunakan:

- Jest
- Supertest
- Mocking
- Dependency Isolation

Testing digunakan untuk:

- memastikan endpoint stabil
- menjaga business logic tetap benar
- mengurangi regression bug
- mempermudah refactor
- mendukung scalable architecture

---

# Konsep Dasar Testing

Testing backend modern dibagi menjadi beberapa level:

| Jenis Testing       | Fokus                         |
| ------------------- | ----------------------------- |
| Unit Testing        | Menguji satu unit logic       |
| Integration Testing | Menguji integrasi antar layer |
| End-to-End Testing  | Menguji aplikasi secara penuh |
| Performance Testing | Mengukur performa sistem      |

Pada Express.js:

- Jest → testing framework
- Supertest → HTTP testing
- Mocking → simulasi dependency

---

# Filosofi Testing Modern

Testing bukan sekadar:

```text
"apakah function berjalan"
```

Tetapi:

```text
"apakah sistem tetap aman saat kode berubah"
```

Karena backend production selalu berubah:

- fitur baru
- refactor
- scaling
- optimization
- developer baru masuk

Tanpa testing:

```text
setiap deploy menjadi spekulasi
```

---

# Arsitektur Testing

Backend modern biasanya memiliki struktur:

```text
Route
 → Controller
   → Service
     → Repository
       → Database
```

---

# Layer yang Diuji

| Layer        | Jenis Test         |
| ------------ | ------------------ |
| Service      | Unit Test          |
| Controller   | Unit / Integration |
| Route        | Integration        |
| Database     | Integration        |
| External API | Mocked             |

---

# Kenapa Service Layer Paling Penting

Karena business logic biasanya berada di:

```text
service layer
```

Contoh:

- login
- payment
- stock validation
- transaction
- authorization
- RBAC

Jika service salah:

```text
seluruh sistem ikut salah
```

---

# Tools yang Digunakan

## Jest

Digunakan untuk:

- assertion
- mocking
- coverage
- async testing
- test runner

---

## Supertest

Digunakan untuk:

- simulasi HTTP request
- testing endpoint Express
- testing middleware
- testing upload file

---

# Instalasi

```bash
npm install --save-dev jest supertest
```

---

# Struktur Folder Modern

```text
src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middleware/
├── app.js
└── server.js

tests/
├── unit/
│   ├── services/
│   ├── middleware/
│   └── utils/
│
├── integration/
│   ├── auth/
│   └── products/
│
└── setup/
```

---

# Kenapa app.js dan server.js Dipisah

## app.js

Berisi:

- middleware
- routes
- express app

```js
import express from "express";

const app = express();

app.use(express.json());

export default app;
```

---

## server.js

Berisi:

- app.listen()

```js
import app from "./app.js";

app.listen(3000, () => {
  console.log("Server running");
});
```

---

# Kenapa Harus Dipisah

Karena Supertest membutuhkan:

```js
request(app);
```

Bukan:

```text
server sungguhan
```

Jika tidak dipisah:

- port conflict
- testing lambat
- sulit diisolasi

---

# Integration Testing

## Contoh Endpoint

### Route

```js
router.get("/", async (req, res) => {
  res.json([
    {
      name: "Laptop",
    },
  ]);
});
```

---

# Test Endpoint

```js
import request from "supertest";

import app from "../../src/app.js";

describe("GET /products", () => {
  it("should return products", async () => {
    const response = await request(app).get("/products");

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual([
      {
        name: "Laptop",
      },
    ]);
  });
});
```

---

# Penjelasan

## request(app)

Mensimulasikan request HTTP.

---

## response.statusCode

Memastikan status response benar.

---

## response.body

Memastikan data response benar.

---

# Testing POST Endpoint

## Route

```js
router.post("/", (req, res) => {
  res.status(201).json(req.body);
});
```

---

# Test

```js
describe("POST /products", () => {
  it("should create product", async () => {
    const payload = {
      name: "Keyboard",
      price: 500,
    };

    const response = await request(app).post("/products").send(payload);

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual(payload);
  });
});
```

---

# Testing Upload File

Supertest mendukung multipart/form-data.

---

# Contoh Upload

```js
describe("POST /posts", () => {
  it("should upload image", async () => {
    const response = await request(app)
      .post("/posts")
      .field("title", "Post")
      .attach("image", "./tests/test.jpg");

    expect(response.statusCode).toBe(201);
  });
});
```

---

# Unit Testing Service

## Service

```js
export const calculateDiscount = (price, discount) => {
  return price - price * discount;
};
```

---

# Test

```js
import { calculateDiscount } from "../../src/services/product.service.js";

describe("calculateDiscount", () => {
  it("should calculate discount correctly", () => {
    const result = calculateDiscount(100, 0.1);

    expect(result).toBe(90);
  });
});
```

---

# Mocking Dependency

## Kenapa Mocking Penting

Pada backend:

- database
- Redis
- external API

tidak boleh benar-benar dipanggil saat unit test.

Karena:

- lambat
- tidak stabil
- dependency tinggi

---

# Contoh Mock Repository

## Service

```js
import { productRepository } from "../repositories/product.repository.js";

export const getProductsService = async () => {
  return productRepository.findAll();
};
```

---

# Test

```js
import { getProductsService } from "../../src/services/product.service.js";

import { productRepository } from "../../src/repositories/product.repository.js";

jest.mock("../../src/repositories/product.repository.js");

describe("getProductsService", () => {
  it("should return products", async () => {
    const mockProducts = [
      {
        name: "Laptop",
      },
    ];

    productRepository.findAll.mockResolvedValue(mockProducts);

    const result = await getProductsService();

    expect(result).toEqual(mockProducts);
  });
});
```

---

# Penjelasan Mocking

## mockResolvedValue()

Mensimulasikan:

```js
Promise.resolve();
```

---

## mockRejectedValue()

Mensimulasikan:

```js
Promise.reject();
```

---

# Error Testing

Backend production lebih sering gagal di:

- validation
- authorization
- edge case
- invalid state

Maka testing error sangat penting.

---

# Contoh Error Test

```js
it("should throw unauthorized", async () => {
  await expect(loginService({})).rejects.toThrow("Unauthorized");
});
```

---

# Testing Middleware

## Contoh Middleware

```js
export const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};
```

---

# Test Middleware

```js
it("should return 401", async () => {
  const response = await request(app).get("/products");

  expect(response.statusCode).toBe(401);
});
```

---

# Async Testing

Karena backend modern menggunakan:

```text
async / await
```

Maka testing juga harus async.

---

# Coverage

## Menjalankan Coverage

```bash
npm test -- --coverage
```

---

# Output Coverage

```text
Statements : 90%
Functions  : 88%
Branches   : 84%
Lines      : 91%
```

---

# Apakah Coverage 100% Wajib

Tidak.

Coverage tinggi:

```text
≠ testing bagus
```

Yang lebih penting:

- business logic teruji
- error handling teruji
- edge case diuji

---

# Best Practice 2026

## 1. Fokus pada Service Layer

Business logic harus mudah di-test.

---

## 2. Gunakan Dependency Injection

Dependency yang injectable:

- lebih mudah di-mock
- lebih mudah di-test

---

## 3. Jangan Testing Database Asli pada Unit Test

Gunakan:

- mock
- fake repository
- isolated environment

---

## 4. Pisahkan Unit dan Integration Test

```text
tests/unit
tests/integration
```

---

## 5. Test Error Case

Minimal:

- validation error
- unauthorized
- forbidden
- not found
- conflict

---

## 6. Gunakan Environment Khusus Testing

Contoh:

```env
NODE_ENV=test
```

---

# Kesalahan Umum

- Testing langsung ke production DB
- Tidak menggunakan mock
- Controller terlalu banyak logic
- Test terlalu besar
- Tidak menguji error path

---

# CI/CD dan Testing

Pada production modern:

```text
Developer push code
 → CI/CD berjalan
   → Testing otomatis
      → Deploy jika semua test sukses
```

Karena bug production:

- mahal
- merusak user trust
- sulit diperbaiki saat live traffic

---

# Kapan Menggunakan Supertest

Gunakan Supertest untuk:

- testing endpoint
- testing middleware
- testing auth flow
- testing upload file
- testing cookie/session

---

# Kapan Menggunakan Mock

Gunakan mock untuk:

- database
- Redis
- email service
- external API
- payment gateway

---

# Kesimpulan

Testing pada Express.js adalah fondasi backend modern.

Jest dan Supertest menjadi kombinasi populer karena:

- ringan
- fleksibel
- cepat
- mudah diintegrasikan dengan CI/CD

Testing bukan sekadar formalitas.

Pada sistem production:

```text
testing adalah alat untuk menjaga stabilitas sistem
```

Karena semakin besar aplikasi:

- semakin kompleks flow
- semakin banyak edge case
- semakin mahal biaya bug production

Dan backend tanpa testing cepat atau lambat akan berubah menjadi sistem yang ditakuti developernya sendiri.
