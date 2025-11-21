# Query, Populate, dan Projection di MongoDB (Mongoose)

Dokumentasi ini menjelaskan tiga konsep penting saat bekerja dengan MongoDB menggunakan Mongoose: **Query**, **Populate**, dan **Projection**.  
Ketiganya digunakan untuk mengambil, menampilkan, dan mengelola data antar koleksi (collection) dengan efisien.

---

## 1. Query

**Query** digunakan untuk mengambil data dari koleksi berdasarkan kondisi tertentu.  
Fungsinya mirip dengan `SELECT ... WHERE ...` di SQL.

### Contoh Dasar

```js
// Ambil semua data karyawan
const karyawan = await Karyawan.find();

// Ambil karyawan dengan nama tertentu
const karyawan = await Karyawan.find({ nama: "Fitra" });

// Ambil satu data karyawan
const satuKaryawan = await Karyawan.findOne({
  _id: "6759bfc41e203b6fdc8c1e7b",
});
```

### Operator Penting

| Operator | Keterangan                  |
| -------- | --------------------------- |
| `$gt`    | Lebih besar dari            |
| `$lt`    | Lebih kecil dari            |
| `$in`    | Ada di dalam array tertentu |
| `$or`    | Salah satu kondisi benar    |
| `$and`   | Semua kondisi benar         |

### Contoh Penggunaan Operator

```js
// Ambil karyawan dengan umur > 25
const hasil = await Karyawan.find({ umur: { $gt: 25 } });
```

---

## 2. Populate

**Populate** digunakan untuk mengambil data dari koleksi lain yang berelasi dengan field `ref`.
MongoDB tidak memiliki join seperti SQL, tetapi Mongoose menyediakan `populate()` untuk menggantikannya.

### Contoh Skema Relasi

```js
// Model Departemen
const DepartemenSchema = new mongoose.Schema({
  nama: String,
});
const Departemen = mongoose.model("Departemen", DepartemenSchema);

// Model Karyawan
const KaryawanSchema = new mongoose.Schema({
  nama: String,
  jabatan: String,
  departemen: { type: mongoose.Schema.Types.ObjectId, ref: "Departemen" },
});
const Karyawan = mongoose.model("Karyawan", KaryawanSchema);
```

### Contoh Populate

```js
// Ambil semua karyawan beserta data departemen-nya
const hasil = await Karyawan.find().populate("departemen");
```

#### Tanpa Populate

```json
{
  "nama": "Fitra",
  "departemen": "6759bfc41e203b6fdc8c1e7b"
}
```

#### Dengan Populate

```json
{
  "nama": "Fitra",
  "departemen": {
    "_id": "6759bfc41e203b6fdc8c1e7b",
    "nama": "IT"
  }
}
```

### Populate dengan Kondisi dan Select

```js
const hasil = await Karyawan.find().populate({
  path: "departemen",
  match: { nama: "IT" },
  select: "nama",
});
```

---

## 3. Projection

**Projection** digunakan untuk menentukan field apa yang ditampilkan atau disembunyikan dari hasil query.

### Contoh Dasar

```js
// Ambil hanya nama dan umur
const karyawan = await Karyawan.find({}, "nama umur");

// Sembunyikan _id
const karyawan = await Karyawan.find({}, { _id: 0, nama: 1 });
```

### Penjelasan

- `1` berarti field ditampilkan.
- `0` berarti field disembunyikan.

---

## Contoh Kasus Lengkap

Menampilkan semua karyawan di departemen **IT**, dengan field **nama** dan **jabatan** saja, serta menampilkan **nama departemen** melalui populate.

```js
const hasil = await Karyawan.find()
  .populate({
    path: "departemen",
    match: { nama: "IT" },
    select: "nama",
  })
  .select("nama jabatan");
```

Output (contoh):

```json
{
  "nama": "Fitra",
  "jabatan": "Backend Developer",
  "departemen": {
    "nama": "IT"
  }
}
```

---

## Referensi

- [Mongoose Query Documentation](https://mongoosejs.com/docs/queries.html)
- [Mongoose Populate Documentation](https://mongoosejs.com/docs/populate.html)
- [Mongoose Select (Projection)](https://mongoosejs.com/docs/api/query.html#Query.prototype.select)

---

📘 **Catatan:**
Gunakan `async/await` di dalam `try...catch` untuk menangani error pada query database, misalnya koneksi gagal atau dokumen tidak ditemukan.
