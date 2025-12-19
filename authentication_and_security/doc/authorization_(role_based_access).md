# Authorization — Role-Based Access Control (RBAC)

## Tujuan

Menerapkan sistem **authorization** berbasis role agar setiap user hanya bisa mengakses resource sesuai haknya.  
Ini bukan soal “sudah login”, tapi **boleh atau tidak melakukan aksi tertentu**.

---

## Konsep Dasar

### Authentication vs Authorization

- **Authentication** → siapa kamu (login, token valid)
- **Authorization** → boleh ngapain (role & permission)

RBAC fokus di **authorization**.

---

## Konsep RBAC

User → Role → Permission

Contoh:

- `user` → baca & update profil sendiri
- `admin` → kelola user
- `superadmin` → kontrol penuh sistem

---

## Penyimpanan Role

### Role disimpan di Database (User Model)

```js
const userSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
```

**Alasan:**

- Role adalah state user
- Bisa diubah tanpa logout massal
- Konsisten dan scalable

---

## Role di Access Token

Role harus dimasukkan ke **access token** saat login:

```js
generateAccessToken({
  userId: user._id,
  role: user.role,
});
```

Payload **minimal**, cukup untuk:

- identifikasi user
- pengecekan hak akses

---

## Struktur Middleware

RBAC **tidak boleh digabung** dengan authentication.

---

### 1. Authentication Middleware

Memastikan user login dan token valid.

```js
export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  req.user = payload;
  next();
};
```

---

### 2. Authorization (RBAC) Middleware

Memastikan role user diizinkan.

```js
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
};
```

---

## Penggunaan di Route

```js
router.delete(
  "/users/:id",
  verifyAccessToken,
  authorizeRoles("admin"),
  deleteUser
);
```

**Urutan penting:**

1. Authentication
2. Authorization
3. Controller

---

## HTTP Status Code yang Benar

| Kondisi                           | Status           |
| --------------------------------- | ---------------- |
| Token tidak ada / invalid         | 401 Unauthorized |
| Token valid tapi role tidak cukup | 403 Forbidden    |

---

## Best Practices

- Pisahkan auth dan RBAC
- Role berasal dari database
- Role dibawa di access token
- Middleware reusable
- Jangan cek role di controller

---

## Kesalahan Umum

- Mengecek role langsung di controller
- Menggabungkan auth + RBAC
- Role hardcoded di banyak file
- Menganggap admin boleh semua tanpa kontrol

---

## Catatan Lanjutan

Untuk sistem besar:

- Role bisa dipecah menjadi permission
- Tambahkan ownership check (user hanya bisa akses datanya sendiri)
- RBAC bisa digabung dengan multi-tenant system

---

## Kesimpulan

RBAC adalah fondasi sistem backend yang aman dan terstruktur.
Tanpa RBAC, aplikasi hanya punya login, bukan kontrol.
