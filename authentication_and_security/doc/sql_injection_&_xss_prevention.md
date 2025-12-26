# SQL Injection & XSS Prevention

## Tujuan

Memahami dan menerapkan teknik pencegahan serangan **SQL Injection** dan **Cross-Site Scripting (XSS)** pada aplikasi backend berbasis Node.js agar sistem aman dari manipulasi input pengguna.

---

## 1. SQL Injection

### 1.1 Pengertian

SQL Injection adalah serangan dengan cara menyisipkan perintah SQL berbahaya melalui input pengguna, sehingga query database dapat dimanipulasi untuk mengakses atau merusak data.

---

### 1.2 Contoh SQL Injection

Contoh implementasi yang **tidak aman**:

```js
const query = `
  SELECT * FROM users
  WHERE email = '${email}'
  AND password = '${password}'
`;
```

Input berbahaya:

```
' OR 1=1 --
```

Query yang dieksekusi:

```sql
SELECT * FROM users WHERE email = '' OR 1=1 --'
```

Akibatnya, penyerang dapat login tanpa kredensial yang valid.

---

### 1.3 Pencegahan SQL Injection

#### a. Parameterized Query

Gunakan query berparameter agar input tidak dieksekusi sebagai SQL.

**PostgreSQL**

```js
await pool.query("SELECT * FROM users WHERE email = $1", [email]);
```

**MySQL**

```js
await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
```

---

#### b. Menggunakan ORM / ODM

ORM seperti Sequelize atau ODM seperti Mongoose secara default menggunakan query aman.

```js
User.findOne({ email: req.body.email });
```

Namun, tetap perlu berhati-hati terhadap operator injection pada MongoDB.

---

#### c. Mencegah Operator Injection (MongoDB)

```js
import mongoSanitize from "express-mongo-sanitize";

app.use(mongoSanitize());
```

---

## 2. Cross-Site Scripting (XSS)

### 2.1 Pengertian

XSS adalah serangan dengan menyisipkan script JavaScript ke dalam input pengguna, yang kemudian dieksekusi di browser pengguna lain.

---

### 2.2 Contoh XSS

Input pengguna:

```html
<script>
  alert("XSS");
</script>
```

Jika disimpan dan dirender tanpa sanitasi, script tersebut akan dijalankan di browser korban.

---

### 2.3 Pencegahan XSS

#### a. Sanitasi Input

```js
import xss from "xss";

const cleanInput = xss(req.body.comment);
```

---

#### b. Escape Output

Framework frontend modern seperti React dan Vue melakukan escape output secara otomatis.
Hindari penggunaan render HTML mentah tanpa sanitasi.

---

#### c. Content Security Policy (CSP)

Gunakan Helmet untuk menambahkan security headers.

```js
import helmet from "helmet";

app.use(
  helmet({
    contentSecurityPolicy: true,
  })
);
```

---

## 3. Perbedaan Validation dan Sanitization

| Aspek  | Validation            | Sanitization                    |
| ------ | --------------------- | ------------------------------- |
| Fungsi | Mengecek format input | Membersihkan karakter berbahaya |
| Contoh | Email valid           | Menghapus script                |
| Wajib  | Ya                    | Ya                              |

Validation dan sanitization harus digunakan bersamaan.

---

## 4. Alur Penanganan Input yang Disarankan

```text
Request
  → Validation
  → Sanitization
  → Business Logic
  → Database
```

---

## 5. Kesalahan Umum

- Menggabungkan query SQL dengan string
- Menganggap ORM sepenuhnya aman tanpa sanitasi
- Menyimpan dan merender HTML mentah
- Tidak menerapkan CSP

---

## Kesimpulan

SQL Injection dan XSS merupakan serangan yang umum namun berbahaya.
Dengan penggunaan query berparameter, sanitasi input, serta pengamanan header HTTP, risiko serangan dapat diminimalkan secara signifikan.

```

```
