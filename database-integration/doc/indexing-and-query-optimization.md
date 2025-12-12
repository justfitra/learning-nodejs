# Materi Lengkap: Indexing dan Query Optimization (Pengantar)

## 1. Apa Itu Index

Index adalah struktur data tambahan (biasanya B-Tree atau Hash) yang disimpan oleh database untuk mempercepat pencarian data.

Tanpa index:

- Database harus melakukan _full collection/table scan_.
- Semakin besar data, semakin lambat query.

Dengan index:

- Database dapat langsung melompat ke posisi data.
- Waktu pencarian jauh lebih cepat.

**Analogi:** Index seperti daftar isi buku. Tanpa itu, kamu harus baca semuanya dulu baru ketemu halaman yang dicari.

---

## 2. Cara Kerja Index

Kebanyakan database menggunakan **B-Tree index** (balanced tree).

**Cara kerjanya:**

1. Data dimasukkan ke struktur pohon terurut.
2. Node disusun berlapis agar kedalaman minimal.
3. Semua pencarian dilakukan dari root ke leaf secara terurut.
4. Jumlah langkah pencarian sangat kecil meskipun data jutaan.

**Hash index**:

- Cocok untuk query equal `=`, bukan range `> <`.

---

## 3. Jenis Index

### 1. Single Field Index

Index pada satu kolom saja.
Contoh:
MongoDB: `db.users.createIndex({ email: 1 })`
Postgres: `CREATE INDEX idx_user_email ON users(email);`

### 2. Compound Index

Index pada beberapa kolom.
MongoDB: `{ age: 1, name: 1 }`
Catatan: Urutan kolom **sangat penting**.

### 3. Unique Index

Mencegah data duplikat.
Contoh: unique email.

### 4. Text Index

Digunakan untuk pencarian kata / kalimat.

### 5. Full-Text Search Index

Lebih canggih, cocok untuk pencarian seperti search engine.

### 6. Geospatial Index

Dipakai untuk aplikasi maps, jarak, dan posisi.

---

## 4. Query Optimization Dasar

### 4.1 Hindari Full Scan

Jika query seperti:

```sql
SELECT * FROM users WHERE age = 20;
```

Tanpa index pada `age`, database akan scan seluruh tabel.

### 4.2 Gunakan Explain Plan

Semua database punya tool untuk melihat bagaimana query dieksekusi.

Contoh MongoDB:

```js
db.users.find({ age: 20 }).explain("executionStats");
```

Postgres:

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE age = 20;
```

Perhatikan:

- `COLLSCAN` (MongoDB) atau `Seq Scan` (Postgres) artinya tidak pakai index.
- Harusnya muncul `IXSCAN`, `Index Scan`, atau `Bitmap Index Scan`.

### 4.3 Limit Data

Selalu gunakan:

- `LIMIT`
- `SELECT column_saja`
- `Projection` (MongoDB)

### 4.4 Hindari wildcard di depan

Contoh buruk:

```sql
WHERE name LIKE "%lan"
```

Index tidak bekerja karena wildcard di awal.

---

## 5. Contoh Index di Beberapa Database

### 5.1 MongoDB

```js
db.users.createIndex({ email: 1 }); // single
db.users.createIndex({ age: 1, name: 1 }); // compound
db.products.createIndex({ description: "text" }); // text index
```

### 5.2 PostgreSQL

```sql
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_age_name ON users(age, name);
CREATE UNIQUE INDEX idx_unique_email ON users(email);
```

### 5.3 MySQL

```sql
ALTER TABLE users ADD INDEX (email);
ALTER TABLE users ADD UNIQUE (username);
```

---

## 6. Best Practice Indexing

- Index hanya kolom yang sering dipakai untuk:

  - WHERE
  - JOIN
  - ORDER BY
  - GROUP BY

- Jangan membuat index terlalu banyak, karena:

  - INSERT/UPDATE akan makin lambat.
  - Index butuh ruang penyimpanan.

- Kolom yang kardinalitasnya tinggi (misal: email, username) cocok untuk index.
- Kolom dengan nilai rendah (misal gender, boolean) biasanya buruk untuk index.

---

## 7. Tools Analisis Query

### MongoDB

- `explain()`
- MongoDB Compass Query Profiler

### PostgreSQL

- `EXPLAIN ANALYZE`
- pgAdmin dashboard
- `auto_explain` extension

### MySQL/MariaDB

- `EXPLAIN`
- Slow query log

---
