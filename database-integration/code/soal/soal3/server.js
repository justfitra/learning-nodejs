/*

Data user minimal:

 name
 email
 password
 age (opsional)
 website (opsional)
 bio (opsional)

 Aturan Validasi

1. name: string, minimal 3 karakter, maksimal 60, tidak boleh hanya whitespace
2. email: harus valid format email, auto normalize
3. password: minimal 8 karakter, harus mengandung angka dan huruf
4. age: jika diisi, harus angka 13 sampai 60
5. website: jika diisi, harus valid URL, otomatis dinormalisasi (contoh: tambah protocol jika hilang)
6. bio: maksimal 200 karakter, sanitize untuk cegah XSS sederhana

 Tugas

 Soal 1

Buat file userValidation.js yang berisi dua schema Joi:

 registerSchema (fields: name, email, password, age(optional), website(optional), bio(optional))
 updateProfileSchema (boleh partial update / gunakan .optional())

 Soal 2

Buat middleware validate.js yang:

 Mengembalikan status 400 dan list error jika validation gagal
 Strip unknown fields
 Return value url dan email yang sudah dinormalisasi

 Soal 3

Implement ke router:


POST /auth/register
PATCH /user/profile


 Soal 4

Gunakan validator.js di salah satu field, bukan hanya Joi.
Contoh: normalize email, sanitize HTML bio

 Soal 5

Buat minimal 3 request uji coba via Postman/Thunder Client:

1. Request gagal validasi
2. Request berhasil
3. Request yang mencurigakan (malicious input)

Berikan saya hasil response JSON untuk ketiganya.


*/

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { dotenvConfig } from "./src/config/dotenv.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

app.listen(dotenvConfig.port, () => {
  console.log(`http://${dotenvConfig.host}:${dotenvConfig.port}`);
});
