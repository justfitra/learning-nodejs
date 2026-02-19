# Clean Architecture & Dependency Injection

Belajar tentang bagaimana menyusun kode backend yang bersih, fleksibel, dan mudah di-maintain menggunakan **Repository Pattern** dan **Dependency Injection** di atas arsitektur berlapis.

---

## Masalah yang Diselesaikan

Tanpa Clean Architecture, kode mudah jadi berantakan:

```js
// ❌ Controller langsung sentuh database — susah diganti, susah dites
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id); // Mongoose langsung di controller
  res.json(user);
};
```

Kalau mau ganti MongoDB ke PostgreSQL, harus ubah semua controller satu-satu. Menyakitkan.

---

## Solusi: Layered Architecture + Repository Pattern

Dengan memisahkan tanggung jawab tiap layer, perubahan database cukup dilakukan di **satu tempat** — repository.

---

## Struktur Folder

```
src/
├── controllers/    → urusan HTTP: ambil request, kirim response
├── services/       → urusan bisnis: hash password, validasi, logic
├── repositories/   → urusan database: query, simpan, ambil data
├── models/         → schema & koneksi ke database
└── routes/         → hubungkan endpoint ke controller
```

---

## Penjelasan Tiap Layer

| Layer      | Tanggung Jawab        | Boleh Sentuh |
| ---------- | --------------------- | ------------ |
| Controller | HTTP request/response | Service      |
| Service    | Business logic        | Repository   |
| Repository | Database query        | Model        |
| Model      | Schema database       | Database     |

---

## Contoh Implementasi

### Model

```js
// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
```

### Repository

```js
// repositories/userRepository.js
import { User } from "../models/userModel.js";

export const get = async (id) => {
  return await User.findById(id);
};

export const create = async (payload) => {
  return await User.create(payload);
};
```

### Service

```js
// services/userService.js — tidak tau MongoDB atau PostgreSQL
import { hashPassword } from "../utils/hashPassword.js";

export const get = async (repository, id) => {
  return await repository.get(id);
};

export const create = async (repository, payload) => {
  const password = await hashPassword(payload.password);
  const user = await repository.create({ ...payload, password });
  return { id: user._id, name: user.name };
};
```

### Controller

```js
// controllers/userController.js
import * as userService from "../services/userService.js";
import * as userRepository from "../repositories/userRepository.js";

export const get = async (req, res, next) => {
  try {
    const user = await userService.get(userRepository, req.params.id);
    res.status(200).json({ status: 200, message: "Success", data: user });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const user = await userService.create(userRepository, req.body);
    res.status(201).json({ status: 201, message: "Success", data: user });
  } catch (err) {
    next(err);
  }
};
```

---

## Dependency Injection

Service **tidak mengambil sendiri** dependency-nya — melainkan **dikasihin dari luar** oleh controller.

```js
// ❌ Tanpa DI — service import langsung, susah diganti
import * as userRepository from "../repositories/userRepository.js"

// ✅ Dengan DI — repository dikasihin dari controller
export const get = async (repository, id) => { ... }
```

**Keuntungan:** Kalau ganti database, cukup ubah 1 baris import di controller. Service tidak perlu disentuh.

---

## Key Takeaways

- **Repository Pattern** → isolasi semua kode database di satu tempat
- **Service Layer** → tempat business logic, bukan controller, bukan repository
- **Dependency Injection** → dependency dikasihin dari luar, bukan diambil sendiri
- **Single Responsibility** → tiap layer punya 1 tanggung jawab, tidak lebih
