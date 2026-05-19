# Unit Testing 

## Tujuan

Memahami konsep dan implementasi unit testing pada backend Node.js untuk:

- memastikan business logic berjalan benar
- mengurangi bug
- mempermudah refactor
- meningkatkan maintainability aplikasi

---

# Pengertian Unit Testing

Unit testing adalah proses menguji:

```text
satu unit kecil dari aplikasi
```

Biasanya berupa:

- function
- service
- utility
- middleware

Unit test harus:

- terisolasi
- cepat
- tidak bergantung pada database asli atau service eksternal

---

# Kenapa Unit Testing Penting

Tanpa testing:

- perubahan kecil dapat merusak fitur lain
- bug sulit ditemukan
- refactor menjadi berisiko
- maintenance semakin sulit

Pada backend production, testing bukan fitur tambahan, tetapi bagian dari quality assurance.

---

# Jenis Testing

| Jenis            | Fokus                         |
| ---------------- | ----------------------------- |
| Unit Test        | Menguji satu unit logic       |
| Integration Test | Menguji integrasi antar layer |
| End-to-End Test  | Menguji alur aplikasi penuh   |

Materi ini fokus pada:

```text
Unit Testing
```

---

# Library yang Digunakan

## Jest

Framework testing paling umum pada Node.js.

Fitur:

- assertion
- mocking
- coverage
- async testing

---

# Instalasi Jest

```bash
npm install --save-dev jest
```

---

# Konfigurasi package.json

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

---

# Struktur Folder

```text
src/
├── services/
├── repositories/
├── controllers/
└── tests/
    ├── services/
    ├── controllers/
    └── utils/
```

---

# Konsep Mocking

## Pengertian

Mocking adalah:

```text
mensimulasikan dependency
```

Tujuannya:

- test tidak bergantung database asli
- test lebih cepat
- hasil lebih stabil

---

# Contoh Service

## product.service.js

```js
import { productRepository } from "../repositories/product.repository.js";

export const getProductsService = async () => {
  return productRepository.findAll();
};
```

---

# Unit Test Service

## tests/services/product.service.test.js

```js
import { getProductsService } from "../../src/services/product.service.js";

import { productRepository } from "../../src/repositories/product.repository.js";

jest.mock("../../src/repositories/product.repository.js");

describe("getProductsService", () => {
  it("should return all products", async () => {
    const mockProducts = [
      {
        name: "Laptop",
        price: 1000,
      },
    ];

    productRepository.findAll.mockResolvedValue(mockProducts);

    const result = await getProductsService();

    expect(result).toEqual(mockProducts);
  });
});
```

---

# Penjelasan

## jest.mock()

```js
jest.mock(...)
```

Mengubah module asli menjadi mock.

Repository tidak benar-benar mengakses database.

---

## mockResolvedValue()

```js
mockResolvedValue(...)
```

Mensimulasikan:

```text
Promise.resolve()
```

Digunakan untuk async function.

---

## expect()

Digunakan untuk assertion.

```js
expect(result).toEqual(data);
```

Memastikan hasil sesuai ekspektasi.

---

# Testing Error Case

## Service

```js
export const getProductByIdService = async (id) => {
  const product = await productRepository.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
```

---

## Test Error

```js
it("should throw error if product not found", async () => {
  productRepository.findById.mockResolvedValue(null);

  await expect(getProductByIdService("123")).rejects.toThrow(
    "Product not found",
  );
});
```

---

# Unit Testing Controller

Controller biasanya menguji:

- response status
- response body
- next(error)

---

# Contoh Controller

```js
export const getProducts = async (req, res, next) => {
  try {
    const products = await getProductsService();

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
```

---

# Test Controller

```js
it("should return products", async () => {
  const req = {};

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const products = [
    {
      name: "Laptop",
    },
  ];

  getProductsService.mockResolvedValue(products);

  await getProducts(req, res, next);

  expect(res.status).toHaveBeenCalledWith(200);

  expect(res.json).toHaveBeenCalledWith(products);
});
```

---

# Mock Function Penting

| Function          | Fungsi                        |
| ----------------- | ----------------------------- |
| jest.fn()         | membuat mock function         |
| mockResolvedValue | async success                 |
| mockRejectedValue | async error                   |
| toHaveBeenCalled  | memastikan function dipanggil |

---

# Async Testing

Karena backend modern banyak menggunakan:

```text
Promise / async-await
```

Maka unit test biasanya menggunakan:

```js
async / await
```

---

# Menjalankan Test

```bash
npm test
```

---

# Coverage Testing

## Menjalankan Coverage

```bash
npm test -- --coverage
```

---

# Output Coverage

```text
Statements : 85%
Functions  : 90%
Branches   : 80%
Lines      : 88%
```

---

# Apakah Coverage 100% Wajib

Tidak.

Coverage tinggi tidak selalu berarti test bagus.

Yang penting:

- business logic utama teruji
- edge case diuji
- error handling diuji

---

# Best Practices

## 1. Fokus pada Business Logic

Prioritaskan testing:

- service
- validation
- utility

---

## 2. Gunakan Mock

Hindari:

- database asli
- Redis asli
- external API

pada unit test.

---

## 3. Satu Test Satu Tujuan

Bagus:

```text
should return products
```

Buruk:

```text
test semua fitur sekaligus
```

---

## 4. Nama Test Harus Jelas

Gunakan format:

```text
should ...
```

Contoh:

```text
should create user successfully
should throw error if email exists
```

---

# Hubungan dengan Clean Architecture

Clean Architecture membuat testing lebih mudah karena:

- dependency terpisah
- service dapat di-mock
- business logic tidak bergantung framework

Tanpa separation of concerns:

```text
unit testing menjadi sulit dilakukan
```

---

# Kesalahan Umum

- Testing langsung ke database
- Tidak menggunakan mock
- Test terlalu besar
- Tidak menguji error case
- Menaruh business logic di controller

---

# Kesimpulan

Unit testing adalah fondasi penting backend modern karena:

- menjaga stabilitas sistem
- mempermudah refactor
- mengurangi bug production

Testing bukan soal mengejar coverage tinggi, tetapi memastikan:

```text
business logic berjalan sesuai ekspektasi
```

Backend tanpa testing mungkin masih berjalan, tetapi akan semakin sulit dipelihara seiring bertambahnya kompleksitas aplikasi.
