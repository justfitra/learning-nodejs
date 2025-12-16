# Password Hashing dengan bcrypt

## Tujuan

Memahami dan mengimplementasikan **penyimpanan password yang aman** menggunakan bcrypt pada aplikasi backend Node.js. Materi ini menekankan alasan teknis, praktik yang benar, dan kesalahan umum yang harus dihindari.

---

## Kenapa Password Tidak Boleh Disimpan Plaintext

Menyimpan password tanpa hashing berarti:

- Kebocoran database = kebocoran semua akun
- User biasanya menggunakan password yang sama di banyak platform
- Dampak hukum dan reputasi sangat besar

**Rule utama:**

> Jika kamu bisa membaca password user, berarti sistemmu gagal secara desain.

---

## Apa Itu bcrypt

bcrypt adalah algoritma hashing yang dirancang khusus untuk password.

Karakteristik utama:

- **One-way hashing** (tidak bisa dibalik)
- **Salt otomatis** (mencegah rainbow table)
- **Adaptive cost** (bisa diperlambat seiring waktu)

bcrypt **sengaja dibuat lambat** agar brute-force mahal.

---

## Instalasi

```bash
npm install bcrypt
```

---

## Cara Kerja bcrypt (Singkat & Teknis)

1. Password dikombinasikan dengan salt acak
2. Dilakukan hashing berulang sesuai cost factor
3. Hasil hash menyimpan:

   - algoritma
   - cost
   - salt
   - hash

Contoh hasil:

```
$2b$10$uYH8...Rzq
```

---

## Implementasi Dasar

### Hash Password Saat Register

```js
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};
```

### Simpan ke Database

```js
const hashedPassword = await hashPassword(req.body.password);

await User.create({
  email: req.body.email,
  password: hashedPassword,
});
```

---

## Verifikasi Password Saat Login

```js
import bcrypt from "bcrypt";

export const verifyPassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
```

Penggunaan:

```js
const isValid = await verifyPassword(password, user.password);

if (!isValid) {
  throw new AppError(401, "Invalid credentials");
}
```

---

## Salt Rounds (Cost Factor)

| Cost | Dampak                   |
| ---- | ------------------------ |
| 8    | Cepat, kurang aman       |
| 10   | Seimbang (recommended)   |
| 12   | Lebih aman, lebih lambat |
| 14+  | Biasanya overkill        |

Rekomendasi:

- Development: 10
- Production: 10–12

---

## Kesalahan Umum (Wajib Dihindari)

### 1. Hash di Controller

Hashing adalah **business logic**, taruh di service layer.

### 2. Double Hash

Jangan pernah:

```js
bcrypt.hash(bcrypt.hash(password));
```

### 3. Membandingkan String Manual

```js
password === hashedPassword; // SALAH
```

Gunakan `bcrypt.compare`.

---

## bcrypt vs Algoritma Lain

| Algoritma | Cocok untuk Password |
| --------- | -------------------- |
| MD5       | Tidak                |
| SHA-1     | Tidak                |
| SHA-256   | Tidak                |
| bcrypt    | Ya                   |
| argon2    | Ya (lebih modern)    |

bcrypt masih **sangat layak** untuk production.

---

## Contoh Struktur Project

```
src/
  services/
    auth.service.js
  utils/
    password.js
```

**utils/password.js**

```js
import bcrypt from "bcrypt";

export const hashPassword = (password) => bcrypt.hash(password, 10);

export const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);
```

---

## Security Checklist

- Password selalu di-hash
- Tidak pernah dikirim balik ke client
- Tidak pernah di-log
- Salt tidak disimpan manual
- Cost factor disesuaikan

---

## Ringkasan

- bcrypt adalah standar industri untuk hashing password
- Hash bersifat satu arah
- bcrypt.compare adalah satu-satunya cara validasi
- Cost factor menentukan keamanan vs performa
- Kesalahan kecil di auth bisa jadi bencana besar

---
