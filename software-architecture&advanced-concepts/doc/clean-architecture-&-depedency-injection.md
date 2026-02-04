# Clean Architecture & Dependency Injection

## Tujuan

Memahami dan menerapkan **Clean Architecture** agar sistem backend:

- mudah dirawat
- mudah diuji
- tidak bergantung pada framework
- siap berkembang dalam jangka panjang

Dependency Injection digunakan sebagai mekanisme utama untuk menjaga **loose coupling** antar layer.

---

## Masalah Arsitektur Konvensional

Pada banyak aplikasi backend, sering ditemukan:

- business logic bercampur dengan Express / HTTP
- service langsung bergantung pada database
- sulit melakukan unit testing
- perubahan kecil berdampak ke banyak file

Masalah ini muncul karena **dependency mengarah ke luar**, bukan ke dalam.

---

## Konsep Clean Architecture

Clean Architecture diperkenalkan oleh Robert C. Martin (Uncle Bob).

### Prinsip Utama

1. **Independence of Frameworks**  
   Framework (Express, Mongoose) hanyalah detail, bukan inti sistem.

2. **Separation of Concerns**  
   Setiap layer memiliki tanggung jawab tunggal.

3. **Dependency Rule**  
   Dependency hanya boleh mengarah ke **inner layer**.

---

## Layer dalam Clean Architecture

```

┌──────────────────────────┐
│   Framework / Driver     │  (Express, DB, Redis)
├──────────────────────────┤
│   Interface Adapter      │  (Controller, Repository)
├──────────────────────────┤
│   Use Case / Service     │  (Business Logic)
├──────────────────────────┤
│   Entity / Domain        │  (Core Rules)
└──────────────────────────┘

```

---

## Penjelasan Layer

### 1. Entity / Domain

- Berisi aturan bisnis inti
- Tidak tahu database atau HTTP
- Pure JavaScript logic

Contoh:

```js
export class User {
  constructor(email, password) {
    if (!email) throw new Error("Email required");
    this.email = email;
    this.password = password;
  }
}
```

---

### 2. Use Case / Service

- Mengatur alur bisnis
- Memanggil repository
- Tidak tahu Express atau Mongoose

```js
export const createUserUseCase = (userRepo) => {
  return async (payload) => {
    const existing = await userRepo.findByEmail(payload.email);
    if (existing) throw new Error("Email exists");

    return userRepo.create(payload);
  };
};
```

---

### 3. Interface Adapter

Menghubungkan dunia luar ke core logic.

#### Controller

```js
export const createUserController = (createUser) => {
  return async (req, res) => {
    const user = await createUser(req.body);
    res.status(201).json(user);
  };
};
```

#### Repository

```js
export const userRepositoryMongo = {
  findByEmail: (email) => UserModel.findOne({ email }),
  create: (data) => UserModel.create(data),
};
```

---

### 4. Framework / Driver

- Express
- Mongoose
- Redis
- External service

Layer ini boleh berubah tanpa mengubah business logic.

---

## Dependency Injection (DI)

### Definisi

Dependency Injection adalah teknik **memberikan dependency dari luar**, bukan membuatnya sendiri di dalam fungsi atau class.

---

## Masalah Tanpa DI

```js
import User from "./model";

export const createUser = async (payload) => {
  return User.create(payload);
};
```

Service tidak bisa:

- diuji tanpa database
- diganti repository-nya

---

## Dengan Dependency Injection

```js
export const createUser = (userRepository) => {
  return async (payload) => {
    return userRepository.create(payload);
  };
};
```

Dependency disuntikkan dari luar.

---

## Composition Root

Semua dependency dirangkai di satu tempat.

```js
const createUser = createUserUseCase(userRepositoryMongo);
const createUserController = createUserController(createUser);
```

Ini disebut **composition root**.

---

## Manfaat Clean Architecture + DI

- Unit testing tanpa database
- Business logic reusable
- Framework bisa diganti
- Sistem lebih stabil
- Mudah dikembangkan oleh tim

---

## Kesalahan Umum

- Mengira Clean Architecture harus rumit
- Membuat terlalu banyak layer tanpa alasan
- Mencampur HTTP logic ke service
- Tidak konsisten dalam dependency injection

---

## Kapan Menggunakan Clean Architecture

Disarankan jika:

- proyek jangka panjang
- sistem kompleks
- banyak developer
- perlu testing serius

Tidak wajib untuk proyek kecil atau prototype cepat.
