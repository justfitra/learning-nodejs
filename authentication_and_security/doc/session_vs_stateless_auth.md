# Session vs Stateless Authentication

## Tujuan

Memahami perbedaan antara **Session-based Authentication** dan **Stateless Authentication**, termasuk cara kerja, kelebihan, kekurangan, serta kapan masing-masing pendekatan sebaiknya digunakan dalam sistem backend.

---

## 1. Authentication Overview

Authentication adalah proses verifikasi identitas pengguna agar sistem dapat menentukan apakah suatu request diizinkan atau tidak.

Dua pendekatan utama yang umum digunakan:

- Session-based Authentication
- Stateless Authentication (Token-based)

---

## 2. Session-Based Authentication

### 2.1 Konsep Dasar

Pada session-based authentication, server menyimpan **state login user** dalam bentuk session.

Alur kerja:

1. User login (username/password)
2. Server membuat session dan menyimpannya (memory / database)
3. Server mengirim **session ID** ke client (biasanya via cookie)
4. Client mengirim session ID di setiap request
5. Server mencocokkan session ID dengan data session

---

### 2.2 Contoh Alur

```text
Client → Login
Server → Create Session
Server → Set-Cookie: sessionId
Client → Request + Cookie
Server → Validate Session
```

---

### 2.3 Karakteristik Session-Based Auth

- Server **menyimpan state**
- Bergantung pada cookie
- Session memiliki masa berlaku
- Logout berarti menghapus session di server

---

### 2.4 Kelebihan

- Implementasi relatif sederhana
- Mudah melakukan logout (hapus session)
- Cocok untuk aplikasi monolith tradisional

---

### 2.5 Kekurangan

- Tidak scalable secara horizontal tanpa shared session store
- Membutuhkan memory / storage server
- Kurang cocok untuk API dan mobile app
- Rentan CSRF jika tidak dikonfigurasi dengan benar

---

## 3. Stateless Authentication (Token-Based)

### 3.1 Konsep Dasar

Pada stateless authentication, server **tidak menyimpan state login user**.
Semua informasi autentikasi dibawa oleh token.

Token yang umum digunakan:

- JWT (JSON Web Token)

---

### 3.2 Alur Kerja JWT

1. User login
2. Server membuat token (access token)
3. Token dikirim ke client
4. Client menyimpan token
5. Client mengirim token di setiap request
6. Server memverifikasi token tanpa menyimpan session

---

### 3.3 Contoh Alur

```text
Client → Login
Server → Generate JWT
Client → Store Token
Client → Request + Authorization Header
Server → Verify Token
```

---

### 3.4 Karakteristik Stateless Auth

- Server **tidak menyimpan session**
- Token dikirim via header
- Mudah diskalakan
- Cocok untuk REST API dan microservices

---

### 3.5 Kelebihan

- Mudah di-scale horizontal
- Cocok untuk SPA, mobile app, dan API
- Tidak bergantung pada cookie
- Server lebih ringan

---

### 3.6 Kekurangan

- Logout tidak instan (token masih valid sampai expired)
- Token bocor = risiko keamanan
- Perlu mekanisme refresh token
- Payload token harus dijaga minimal

---

## 4. Perbandingan Session vs Stateless

| Aspek           | Session-Based   | Stateless (JWT)  |
| --------------- | --------------- | ---------------- |
| State di server | Ada             | Tidak ada        |
| Penyimpanan     | Server          | Client           |
| Skalabilitas    | Rendah          | Tinggi           |
| Logout          | Mudah           | Perlu strategi   |
| Cocok untuk     | Web tradisional | API, SPA, Mobile |
| Risiko CSRF     | Tinggi          | Rendah           |

---

## 5. Refresh Token pada Stateless Auth

Untuk mengatasi keterbatasan logout dan expired token:

- Access token dibuat short-lived
- Refresh token disimpan di database
- Refresh token digunakan untuk mendapatkan access token baru

Pendekatan ini menjaga keamanan dan usability.

---

## 6. Kapan Menggunakan Session?

Gunakan session-based authentication jika:

- Aplikasi web monolith
- Infrastruktur sederhana
- Tidak membutuhkan scaling besar
- Mengandalkan cookie sepenuhnya

---

## 7. Kapan Menggunakan Stateless Auth?

Gunakan stateless authentication jika:

- Backend berupa REST API
- Frontend SPA atau mobile
- Sistem microservices
- Membutuhkan scaling horizontal

---

## 8. Kesalahan Umum

- Menggunakan session untuk REST API publik
- Menggunakan JWT tanpa expiry
- Menyimpan data sensitif di token
- Tidak mengamankan refresh token

---

## Kesimpulan

Session-based authentication dan stateless authentication memiliki peran masing-masing.
Pemilihan pendekatan harus disesuaikan dengan arsitektur sistem, kebutuhan skalabilitas, dan tingkat keamanan yang diinginkan.

---
