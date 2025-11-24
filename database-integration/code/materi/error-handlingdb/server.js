/*


 SOAL 1: Validator Beda Layer + Nested Object + Conditional Rule

Buat validator createUser dengan ketentuan:

1. username: wajib string, min 3, huruf kecil semua.
2. email: wajib email.
3. role: hanya boleh user atau admin.
4. Jika role = admin, maka field adminKey wajib dan harus berupa string tertentu.
5. Field profile adalah object:

    age: number min 18
    address: object

      street: string
      city: string
6. Payload tidak boleh mengandung field aneh (stripUnknown harus true).
7. Validator harus disimpan di:

    /validations/userValidator.js
    dan dipasang via middleware validate(schema).

Tugas:

 Buat schema nya.
 Buat router nya.
 Buat contoh payload valid dan invalid.

 

 SOAL 2: Race Condition di Service Layer

Kasus:

Kamu punya service transfer saldo antar user:

txt
User A saldo 100000
User B saldo 20000
A transfer 30000 ke B


Masalah:

Jika permintaan datang 2 kali bersamaan, sistem kamu bisa menyebabkan:

 saldo A menjadi minus
 saldo B mendapatkan double transfer

Tugas:

1. Buat service transferService yang aman dari race condition.
2. Gunakan transaksi MongoDB (session + transaction).
3. Jika salah satu update gagal, rollback semuanya.
4. Kembalikan response seperti:

json
{
  "from": "userA",
  "to": "userB",
  "amount": 30000,
  "status": "success"
}


 

SOAL 3: Service Harus Pure Logic, Controller Tidak Boleh Ada Logika

Kasus:

Kamu punya endpoint untuk update profile user. Mau diapain datanya?

 Jika user update username, huruf besar kecil harus dinormalisasi (toLowerCase).
 Jika user update phone, harus difilter dari karakter non angka.
 Jika user update bio, panjang maksimal 200 char.

Tugas:

 Buat controller updateProfileController yang cuma nerima request dan lempar ke service.
 Buat service updateProfileService yang melakukan seluruh logika transformasi.
 Controller tidak boleh berisi satu pun logika.

 
 SOAL 4: Query Filtering Tingkat Menengah

Buat fitur GET users dengan query seperti:


/users?role=admin&age[gte]=20&age[lte]=30&sort=age, createdAt&limit=10&page=2


Tugas:

1. Buat util parser query menjadi object MongoDB seperti:

js
{
  role: "admin",
  age: { $gte: 20, $lte: 30 }
}


2. Sort harus bisa menerima lebih dari satu field:

    age ascending
    createdAt descending

3. Implementasikan di service getUsersService.

4. Tambahkan pagination.

 

 SOAL 5: Custom Error Handling yang Strict

Buat sistem error handling dengan:

1. Class AppError(status, message)
2. Middleware errorHandler
3. Controller harus selalu men throw error, tidak pernah res.status(...).json(...) di situ.
4. Semua response error standar:

json
{
  "status": 400,
  "message": "Password too weak"
}


Tugas:

 Buat class error
 Buat error middleware
 Buat controller yang melempar AppError
 Buat service yang juga bisa melempar AppError

 

s SOAL BONUS (Level Kamu Harus Naik 1 Tingkat)

Rate Limit berbasis IP manual tanpa library apa pun, menggunakan:

 Map
 Timestamp
 Window time 1 menit
 Limit 10 request

Jika user lewat limit, throw error.

 

*/

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { envConfig } from "./src/config/envConfig.js";
import dotenv from "dotenv";

connectDB();
dotenv.config();

app.listen(envConfig.appPort, () => {
  console.log(
    `Server running at http://${envConfig.appHost}:${envConfig.appPort}`
  );
});
