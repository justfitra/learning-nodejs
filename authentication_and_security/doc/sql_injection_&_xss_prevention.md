# SQL Injection & XSS Prevention

## 1. SQL Injection

### Apa itu (versi jujur)

Penyerang **menyisipkan query berbahaya** lewat input user supaya database menuruti kemauannya.

Bukan hack canggih. Ini bug logika.

---

### Contoh klasik (SALAH TOTAL)

```js
const query = `
  SELECT * FROM users 
  WHERE email = '${email}' 
  AND password = '${password}'
`;
```

Input attacker:

```
email: ' OR 1=1 --
password: apa aja
```

Query jadi:

```sql
SELECT * FROM users WHERE email = '' OR 1=1 --' AND password = ''
```

Database:

> “Oh, benar semua. Masuk.”

---

## Cara Mencegah SQL Injection

### 1️⃣ Gunakan Parameterized Query (WAJIB)

#### PostgreSQL

```js
const result = await pool.query("SELECT * FROM users WHERE email = $1", [
  email,
]);
```

#### MySQL

```js
connection.execute("SELECT * FROM users WHERE email = ?", [email]);
```

Database **tidak akan mengeksekusi input sebagai query**.

---

### 2️⃣ ORM / ODM (Mongoose aman secara default)

```js
User.findOne({ email: req.body.email });
```

Ini **bukan string concat**, jadi aman dari SQL Injection.

❗ Tapi tetap bisa salah kalau:

```js
User.find(req.body); // user ngirim operator Mongo
```

---

### 3️⃣ Jangan izinkan operator injection (MongoDB)

Gunakan sanitization:

```js
import mongoSanitize from "express-mongo-sanitize";

app.use(mongoSanitize());
```

Mencegah:

```json
{ "email": { "$gt": "" } }
```

---

## 2. XSS (Cross-Site Scripting)

### Apa itu

Penyerang **menyisipkan JavaScript** ke input user lalu dieksekusi di browser korban.

Backend aman, frontend kena. Tetap salah backend kalau membiarkan.

---

### Contoh XSS

User input:

```html
<script>
  alert("pwned");
</script>
```

Kalau kamu simpan dan render mentah:

```html
<div>{{ comment }}</div>
```

Browser korban:

> “Baik, saya jalankan.”

---

## Cara Mencegah XSS

### 1️⃣ Jangan percaya input user (selalu)

Sanitize input:

```js
import xss from "xss";

const safeComment = xss(req.body.comment);
```

---

### 2️⃣ Escape output di frontend

Framework modern:

- React → escape otomatis
- Vue → escape otomatis

Bahaya:

```jsx
<div dangerouslySetInnerHTML={{ __html: data }} />
```

Itu namanya minta celaka.

---

### 3️⃣ Gunakan Helmet (CSP)

```js
app.use(
  helmet({
    contentSecurityPolicy: true,
  })
);
```

CSP membatasi script:

- inline JS diblok
- script luar harus whitelist

---

## 3. Validation ≠ Sanitization

| Jenis        | Fungsi                   |
| ------------ | ------------------------ |
| Validation   | input sesuai format      |
| Sanitization | buang karakter berbahaya |

Keduanya **wajib**, tidak saling menggantikan.

---

## 4. Contoh pipeline yang benar

```js
router.post("/comment", validate(commentSchema), sanitizeInput, createComment);
```

Bukan:

```
controller → database → berdoa
```

---

## 5. Kesalahan klasik

- Menganggap ORM kebal injection
- Validasi tapi tidak sanitasi
- Simpan HTML mentah
- Nonaktifkan CSP karena error

---
