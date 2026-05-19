# Unit Testing pada Express.js (Jest & Supertest)

## Tujuan

Memahami implementasi testing pada aplikasi Express.js menggunakan:

- Jest
- Supertest

Testing digunakan untuk:

- memastikan endpoint berjalan benar
- menguji business logic
- mengurangi bug
- mempermudah refactor

---

# Konsep Dasar Testing

Pada backend Express.js terdapat beberapa level testing:

| Jenis            | Fokus                         |
| ---------------- | ----------------------------- |
| Unit Test        | Menguji satu unit logic       |
| Integration Test | Menguji integrasi endpoint    |
| End-to-End Test  | Menguji aplikasi secara penuh |

Pada Express.js:

- Jest → testing framework
- Supertest → testing HTTP endpoint

---

# Kenapa Testing Penting

Tanpa testing:

- perubahan kecil bisa merusak endpoint lain
- bug sering lolos ke production
- refactor menjadi berbahaya

Testing membantu developer memastikan:

```text
fitur tetap berjalan setelah perubahan kode
```

---

# Tools yang Digunakan

## Jest

Digunakan untuk:

- assertion
- mocking
- test runner
- coverage

---

## Supertest

Digunakan untuk:

- testing request HTTP
- testing Express endpoint
- simulasi client request

---

# Instalasi

```bash id="dz3nv0"
npm install --save-dev jest supertest
```

---

# Struktur Folder

```text id="5dt6o0"
src/
├── controllers/
├── services/
├── routes/
├── app.js
└── server.js

tests/
├── unit/
└── integration/
```

---

# Konfigurasi package.json

```json id="7u8k8n"
{
  "scripts": {
    "test": "jest"
  }
}
```

---

# Setup Express App

## app.js

```js id="1i7f7i"
import express from "express";
import productRoute from "./routes/product.route.js";

const app = express();

app.use(express.json());

app.use("/products", productRoute);

export default app;
```

---

# Kenapa app dan server dipisah?

Karena:

- Supertest membutuhkan instance Express
- server.listen() tidak boleh ikut saat testing

---

# server.js

```js id="n6f11o"
import app from "./app.js";

app.listen(3000, () => {
  console.log("Server running");
});
```

---

# Contoh Endpoint

## product.route.js

```js id="9pt2zv"
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      name: "Laptop",
    },
  ]);
});

export default router;
```

---

# Integration Testing dengan Supertest

## tests/integration/product.test.js

```js id="22my4d"
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

```js id="p1qzqg"
request(app);
```

Mensimulasikan HTTP request ke Express app.

---

## response.statusCode

Memastikan status response benar.

```js id="tt7s14"
expect(response.statusCode).toBe(200);
```

---

## response.body

Memastikan body response sesuai.

```js id="9fr5wx"
expect(response.body).toEqual(...)
```

---

# Testing POST Endpoint

## Route

```js id="mwoc8l"
router.post("/", (req, res) => {
  res.status(201).json(req.body);
});
```

---

# Test

```js id="4dtz52"
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

# Testing Error Response

## Route

```js id="z0m7f4"
router.post("/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name required",
    });
  }

  res.status(201).json(req.body);
});
```

---

# Test

```js id="3z9h1s"
it("should return 400 if name missing", async () => {
  const response = await request(app).post("/products").send({});

  expect(response.statusCode).toBe(400);

  expect(response.body.message).toBe("Name required");
});
```

---

# Unit Testing Service Layer

## product.service.js

```js id="6g8s8k"
export const calculateDiscount = (price, discount) => {
  return price - price * discount;
};
```

---

# Test

```js id="r3p2d9"
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

Pada backend:

- database
- Redis
- external API

biasanya di-mock.

---

# Contoh Mock Repository

## Service

```js id="83u7go"
import { productRepository } from "../repositories/product.repository.js";

export const getProductsService = async () => {
  return productRepository.findAll();
};
```

---

# Test

```js id="h8x4jg"
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

# Async Testing

Karena Express banyak menggunakan:

```text
async / await
```

Maka testing juga harus async.

---

# Menjalankan Test

```bash id="x8w4v9"
npm test
```

---

# Coverage

## Menjalankan Coverage

```bash id="9twl0q"
npm test -- --coverage
```

---

# Output Coverage

```text id="5bctq4"
Statements : 90%
Functions  : 88%
Branches   : 84%
Lines      : 91%
```

---

# Best Practices

## 1. Pisahkan Unit dan Integration Test

```text id="75j2dr"
tests/unit
tests/integration
```

---

## 2. Mock Dependency Eksternal

Jangan gunakan:

- database asli
- Redis asli
- external API

untuk unit testing.

---

## 3. Test Success dan Error Case

Minimal:

- happy path
- validation error
- unauthorized
- not found

---

## 4. Gunakan Nama Test Jelas

Bagus:

```text id="5y7hd8"
should return products
```

Buruk:

```text id="d8cdlt"
test1
```

---

# Kesalahan Umum

- Testing langsung ke production database
- Tidak memisahkan app dan server
- Tidak menguji error response
- Test terlalu besar
- Tidak menggunakan mock

---

# Kapan Supertest Digunakan

Gunakan Supertest untuk:

- testing endpoint Express
- testing middleware
- testing authentication flow
- testing request/response

---

# Kesimpulan

Testing pada Express.js membantu memastikan:

- endpoint stabil
- logic berjalan benar
- refactor lebih aman

Jest dan Supertest menjadi kombinasi umum karena:

- ringan
- sederhana
- powerful
