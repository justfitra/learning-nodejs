## 1. Apa Itu Data Modeling?

**Data modeling** adalah proses **merancang struktur data** supaya sistem bisa menyimpan, mengambil, dan memproses data **secara efisien dan konsisten**.
Model ini adalah _blueprint_ dari database — kalau kamu backend engineer, inilah pondasi yang menentukan apakah aplikasi tersebut scalable atau sekadar “bisa jalan.”

---

## 2. Data Modeling di SQL — _Entity Relationship Model (ERD)_

### Konsep Dasar

Dalam sistem relasional (SQL), semua data dipecah menjadi **entity (entitas)** dan **relationship (relasi)**.
Entity = tabel
Relationship = koneksi antar tabel

Setiap entitas punya:

- **Primary key (PK):** identitas unik
- **Foreign key (FK):** penghubung antar tabel

---

### Contoh: Sistem Absensi Karyawan

**Entity & Relationship Diagram (ERD):**

```
KARYAWAN (1) —— (N) ABSENSI (N) —— (1) SHIFT
```

Artinya:

- Satu **karyawan** bisa punya banyak catatan **absensi**
- Banyak **absensi** terkait dengan satu **shift**

---

### Contoh Struktur Tabel

**Tabel `karyawan`**

```sql
CREATE TABLE karyawan (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100),
  jabatan VARCHAR(50)
);
```

**Tabel `shift`**

```sql
CREATE TABLE shift (
  id SERIAL PRIMARY KEY,
  nama_shift VARCHAR(50),
  jam_mulai TIME,
  jam_selesai TIME
);
```

**Tabel `absensi`**

```sql
CREATE TABLE absensi (
  id SERIAL PRIMARY KEY,
  karyawan_id INT REFERENCES karyawan(id),
  shift_id INT REFERENCES shift(id),
  tanggal DATE,
  status VARCHAR(20)
);
```

Dengan model ini, bisa pakai **JOIN** buat tarik data antar tabel secara efisien, dan **foreign key** menjaga integritas relasi antar data.

---

## 3. Data Modeling di NoSQL — _Document Structure_

Di NoSQL seperti **MongoDB**, Tidak pakai tabel dan relasi ketat, tapi **koleksi (collection)** berisi **dokumen (document)**.
Dokumen = objek JSON, dan bisa bersarang (_nested_).
Fleksibel, tapi rawan berantakan kalau tidak dirancang dengan logika yang matang.

---

### Contoh: Struktur di MongoDB

```json
{
  "_id": "674f3e80b3c1f",
  "nama": "Fitra",
  "jabatan": "Kasir",
  "shift": {
    "nama_shift": "Sore",
    "jam_mulai": "15:00",
    "jam_selesai": "23:00"
  },
  "absensi": [
    { "tanggal": "2025-11-06", "status": "Hadir" },
    { "tanggal": "2025-11-07", "status": "Izin" }
  ]
}
```

### Penjelasan:

- Semua data karyawan + shift + absensi bisa disimpan **dalam satu dokumen**.
- Tidak perlu _join_ — semua langsung diambil sekaligus.
- Tapi… kalau datanya jutaan, pembaruan nested array bisa bikin performa turun drastis.

---

## 4. Perbandingan

| Aspek           | SQL (ERD)                      | NoSQL (Document)                      |
| --------------- | ------------------------------ | ------------------------------------- |
| Struktur        | Tabel dan relasi tetap         | Dokumen fleksibel                     |
| Integritas data | Dijaga lewat FK dan constraint | Bergantung logika aplikasi            |
| Performa query  | Cepat untuk data konsisten     | Cepat untuk data terpisah per dokumen |
| Skalabilitas    | Vertikal (upgrade server)      | Horizontal (sharding, distribusi)     |
| Ideal untuk     | Keuangan, absensi, inventory   | Log, analitik, social feed            |

---

## Referensi

- [MongoDB Data Modeling Docs](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)
- [PostgreSQL Logical Database Design](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [Fowler, M. — _Patterns of Data Modeling_](https://martinfowler.com/articles/)

---
