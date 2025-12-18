# JWT Authentication + Refresh Token Flow

## Tujuan

Memahami dan mengimplementasikan sistem authentication **stateless** menggunakan JWT dengan **refresh token flow** yang aman, scalable, dan realistis untuk production.

---

## Konsep Dasar

### Apa itu JWT

JWT (JSON Web Token) adalah token berbentuk string yang berisi klaim (claims) dan ditandatangani secara cryptographic.

JWT digunakan untuk:

- Membuktikan identitas user (authentication)
- Mengirim konteks user tanpa menyimpan session di server

JWT **bukan encryption**, tapi **signed**.

---

## Kenapa Perlu Refresh Token

Masalah jika hanya pakai JWT panjang umur:

- Jika token bocor → akses panjang
- Tidak bisa revoke dengan mudah

Solusi:

- **Access Token**: umur pendek
- **Refresh Token**: umur panjang, disimpan & dikontrol server

---

## Komponen Token

### 1. Access Token

- Umur pendek (5–15 menit)
- Dipakai di setiap request API
- Jika bocor, dampak terbatas

### 2. Refresh Token

- Umur panjang (hari / minggu)
- Dipakai hanya untuk mint access token baru
- Disimpan di database

---

## Arsitektur Flow

### Login

1. User login (email + password)
2. Server verifikasi password
3. Server generate:

   - Access Token
   - Refresh Token

4. Refresh token disimpan di database
5. Token dikirim ke client

---

### Akses API

1. Client kirim access token di header
2. Server validasi token
3. Jika valid → request diproses

---

### Access Token Expired

1. Client kirim refresh token
2. Server validasi refresh token
3. Jika valid:

   - Generate access token baru

4. Jika tidak valid:

   - Force login ulang

---

### Logout

1. Client kirim refresh token
2. Server hapus refresh token dari database
3. Token tidak bisa dipakai lagi

---

## Implementasi Teknis

### Generate Access Token

```js
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};
```

---

### Generate Refresh Token

```js
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
```

---

### Login Service

```js
const accessToken = generateAccessToken({
  userId: user._id,
  role: user.role,
});

const refreshToken = generateRefreshToken({
  userId: user._id,
});

// simpan refresh token ke database
await RefreshToken.create({
  userId: user._id,
  token: refreshToken,
});

return { accessToken, refreshToken };
```

---

## Middleware Authentication

```js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
```

---

## Refresh Token Endpoint

```js
export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  const storedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!storedToken) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const newAccessToken = generateAccessToken({
    userId: payload.userId,
  });

  res.json({ accessToken: newAccessToken });
};
```

---

## Penyimpanan Token (Best Practice)

### Access Token

- Authorization header
- Format:

  ```
  Authorization: Bearer <token>
  ```

### Refresh Token

- HttpOnly Cookie (disarankan)
- Atau body (kurang aman)

---

## Kesalahan Umum (Wajib Dihindari)

1. Access token panjang umur
2. Tidak menyimpan refresh token di database
3. Tidak revoke refresh token saat logout
4. Satu secret untuk access & refresh token
5. Menyimpan JWT di localStorage untuk app sensitif

---

## Session vs JWT (Ringkas)

| Aspek       | Session  | JWT                |
| ----------- | -------- | ------------------ |
| State       | Stateful | Stateless          |
| Scaling     | Sulit    | Mudah              |
| Revoke      | Mudah    | Perlu strategi     |
| Cocok untuk | Monolith | API / Microservice |

---

## Security Checklist

- Access token pendek
- Refresh token disimpan server-side
- Secret berbeda
- HTTPS wajib
- Logout revoke refresh token

---

## Ringkasan

- JWT cocok untuk sistem scalable
- Access token pendek = aman
- Refresh token = kontrol
- Stateless bukan berarti tanpa kontrol
- Auth flow yang buruk = bom waktu production
