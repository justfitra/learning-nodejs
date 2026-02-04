# MVC vs Service Layer Pattern

## Tujuan

Memahami perbedaan antara arsitektur **MVC (Model–View–Controller)** dan **Service Layer Pattern**, serta mengetahui kapan dan mengapa Service Layer diperlukan pada aplikasi backend skala menengah hingga besar.

---

## Latar Belakang

Pada tahap awal belajar backend, banyak aplikasi dibangun menggunakan pola MVC. Pola ini cukup efektif untuk aplikasi kecil, namun sering menimbulkan masalah ketika aplikasi berkembang, terutama karena **business logic menumpuk di controller**.

Service Layer Pattern hadir untuk memecahkan masalah tersebut dengan memisahkan logic bisnis dari controller.

---

## MVC (Model–View–Controller)

### Konsep Dasar

MVC membagi aplikasi menjadi tiga komponen utama:

- **Model**  
  Mengelola data dan interaksi dengan database

- **View**  
  Menyajikan data ke pengguna (HTML, JSON, dsb)

- **Controller**  
  Menangani request, memanggil model, dan mengembalikan response

### Alur MVC

```

Client → Controller → Model → Controller → Response

```

### Contoh MVC Sederhana

```js
export const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};
```

### Kelebihan MVC

- Mudah dipahami
- Cocok untuk aplikasi kecil
- Cepat untuk prototyping

### Kekurangan MVC

- Controller mudah menjadi terlalu besar
- Business logic tercampur dengan HTTP logic
- Sulit diuji secara unit test
- Sulit dikembangkan dalam jangka panjang

---

## Service Layer Pattern

### Definisi

Service Layer Pattern adalah pendekatan arsitektur di mana **business logic dipindahkan ke layer khusus (service)**, sehingga controller hanya bertugas mengelola request dan response.

### Tujuan Utama

- Memisahkan tanggung jawab
- Meningkatkan keterbacaan kode
- Memudahkan testing
- Mendukung scalability

---

## Struktur Folder

```
src/
 ├─ controllers/
 │   └─ user.controller.js
 ├─ services/
 │   └─ user.service.js
 ├─ models/
 │   └─ user.model.js
 ├─ routes/
 │   └─ user.routes.js
```

---

## Pembagian Tanggung Jawab

### Controller

- Mengambil data dari request
- Memanggil service
- Mengembalikan response

Controller tidak berisi logic bisnis.

### Service

- Business logic
- Validasi domain
- Aturan aplikasi
- Orkestrasi data

### Model

- Skema data
- Query database
- Tidak bergantung pada HTTP

---

## Contoh Implementasi

### Service Layer

```js
export const createUserService = async (data) => {
  if (!data.email) {
    throw new Error("Email wajib diisi");
  }

  return await User.create(data);
};
```

### Controller

```js
import { createUserService } from "../services/user.service.js";

export const createUser = async (req, res) => {
  const user = await createUserService(req.body);
  res.status(201).json(user);
};
```

---

## Perbandingan MVC vs Service Layer

| Aspek             | MVC Tradisional      | Service Layer |
| ----------------- | -------------------- | ------------- |
| Business Logic    | Controller           | Service       |
| Ukuran Controller | Besar                | Kecil         |
| Reusability       | Rendah               | Tinggi        |
| Testing           | Sulit                | Mudah         |
| Scalability       | Terbatas             | Baik          |
| Maintainability   | Buruk jangka panjang | Stabil        |

---

## Kapan Menggunakan Service Layer

Disarankan menggunakan Service Layer jika:

- Aplikasi lebih dari CRUD sederhana
- Terdapat banyak aturan bisnis
- Ada sistem role dan authorization
- Proyek dikerjakan oleh tim
- Aplikasi direncanakan berkembang

Untuk aplikasi kecil atau latihan dasar, MVC masih dapat digunakan.

---

## Hubungan dengan Arsitektur Lanjutan

Service Layer adalah fondasi untuk:

- Clean Architecture
- Domain-Driven Design (DDD)
- Hexagonal Architecture
- Microservices Architecture

---

## Kesimpulan

MVC adalah titik awal yang baik, namun tidak cukup untuk aplikasi skala menengah dan besar.
Service Layer Pattern membantu memisahkan business logic dari HTTP layer sehingga kode lebih terstruktur, mudah diuji, dan mudah dikembangkan.

Arsitektur yang baik bukan soal gaya, tetapi soal keberlanjutan sistem.
