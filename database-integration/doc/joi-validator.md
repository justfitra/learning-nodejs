# Validation & Sanitization with Joi and Validator.js

## Overview

Pada proses pengembangan backend, **validasi** dan **sanitasi** merupakan tahap penting untuk memastikan data yang masuk ke sistem adalah data yang benar, aman, dan sesuai standar bisnis. Tanpa validasi dan sanitasi, aplikasi rentan terhadap data korup, bug, dan celah keamanan seperti XSS atau injection.

Dokumen ini menjelaskan konsep dasar, contoh penggunaan, dan best practice penggunaan library **Joi** dan **validator.js** dalam Node.js.

---

## Objectives

1. Memastikan input data sesuai format, aturan, dan kebutuhan bisnis.
2. Mencegah penyimpanan data tidak valid ke database.
3. Menangkal kemungkinan eksploitasi input berbahaya.
4. Mengimplementasikan pola validasi yang mudah di-maintain dan scalable.

---

## Libraries Used

### 1. Joi

Digunakan untuk mendefinisikan dan menerapkan schema validasi berbasis aturan.

Installasi:

```bash
npm install joi
```

Contoh kode:

```js
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(60),
});

const validateUser = (data) => {
  const result = userSchema.validate(data);
  return result;
};

export default validateUser;
```

---

### 2. Validator.js

Digunakan untuk sanitasi string dan validasi format data tertentu.

Instalasi:

```bash
npm install validator
```

Contoh kode:

```js
import validator from "validator";

const sanitizeEmail = (email) => {
  const normalized = validator.normalizeEmail(email);
  return normalized;
};

const isValidEmail = (email) => {
  return validator.isEmail(email);
};
```

---

## Best Practices

1. Validasi harus selalu ada di sisi backend.
2. Jangan menyimpan atau memproses data sebelum validasi selesai.
3. Gabungkan validasi dan sanitasi untuk hasil optimal.
4. Tampilkan pesan error yang jelas, tanpa membocorkan detail teknis.
5. Gunakan schema reuseable agar mudah di-maintain.

---

## Folder Structure (Recommendation)

```
project/
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── validations/
│   │   └── user.validation.js
│   └── utils/
│
└── README.md
```

---

## Sample Implementation (Express)

```js
import express from "express";
import validateUser from "./validations/user.validation.js";
import validator from "validator";

const app = express();
app.use(express.json());

app.post("/register", (req, res) => {
  const cleanEmail = validator.normalizeEmail(req.body.email);
  const payload = { ...req.body, email: cleanEmail };

  const { error } = validateUser(payload);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  return res.status(200).json({ message: "User data valid" });
});

app.listen(3000);
```

---

## References

- [https://joi.dev/](https://joi.dev/)
- [https://www.npmjs.com/package/validator](https://www.npmjs.com/package/validator)
- [https://owasp.org/www-community/Input_Validation](https://owasp.org/www-community/Input_Validation)
