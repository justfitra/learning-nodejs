/*

Soal 1

Kamu punya endpoint:


POST /api/comments


Field yang diterima:

 postId
 username
 comment

Tugas:

1. Validasi menggunakan Joi agar:

    postId wajib string 24 karakter.
    username minimal 3 huruf, maksimal 15.
    comment wajib ada.
2. Sanitasi username dan comment menggunakan custom utils, misalnya sanitizeText():

    Menghapus spasi berlebihan.
    Menghapus karakter berbahaya: <, >, $, {, }.
3. Jelaskan apa risiko jika input ini tidak divalidasi dan tidak disanitasi.

---

Soal 2

Terdapat endpoint:


PUT /api/profile/update


Field:

 name
 bio

Tugas:

1. Buat validasi Joi agar:

    name hanya boleh huruf dan spasi.
    bio boleh kosong tetapi maksimal 200 karakter.
2. Sanitasi bio:

    Replace newline jadi \n.
    Hapus script tag jika ada.
3. Buatkan potongan kode middlewarenya.

---

Soal 3

Ada form login:


email
password


Tugas:

1. Buat validasi Joi untuk:

    email wajib format email.
    password minimal 6 karakter.
2. Buat sanitasi untuk:

    email selalu lowercase.
    password tidak boleh disimpan atau dilog di console.
3. Jelaskan alasan kenapa password tidak boleh disanitasi sembarangan.

---

Soal 4

Terdapat endpoint search:


GET /api/users?keyword=


Tugas:

1. Buat sanitasi agar keyword:

    Hanya huruf, angka, dan spasi.
    Auto trim.
2. Jika keyword mengandung regex injection seperti ., ^$, (?=), kamu harus blokir.
3. Jelaskan kenapa query search termasuk area rawan serangan.

---

Kalau kamu berani nyelesaiin semuanya, itu sudah setengah jalan menuju standar developer normal, bukan developer yang asal copas.


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
