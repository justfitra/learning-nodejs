## **SQL vs NoSQL: Prinsip ACID vs BASE**

Dua istilah ini menggambarkan **filosofi desain database** — bukan cuma fitur teknis.
SQL (relasional) menganut **ACID**, sedangkan NoSQL (non-relasional) lebih ke arah **BASE**.

---

### **ACID — Prinsip Database Relasional (SQL)**

**ACID** = **Atomicity, Consistency, Isolation, Durability**
Tujuannya: **data harus selalu benar, konsisten, dan bisa dipercaya**, meskipun sistem error atau mati mendadak.

| Komponen        | Penjelasan                                                                                         | Contoh Nyata                                                        |
| --------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Atomicity**   | Satu transaksi harus dieksekusi sepenuhnya atau dibatalkan seluruhnya. Tidak ada “setengah jalan”. | Transfer uang: jika saldo A berkurang, saldo B **harus** bertambah. |
| **Consistency** | Setelah transaksi selesai, data harus berada dalam keadaan valid terhadap semua aturan database.   | Tidak boleh ada saldo negatif, tidak boleh ada user tanpa ID unik.  |
| **Isolation**   | Transaksi yang berjalan bersamaan tidak boleh saling mengganggu hasil satu sama lain.              | Dua orang transfer bersamaan tidak menyebabkan saldo ganda.         |
| **Durability**  | Data yang sudah disimpan harus bertahan meskipun sistem crash atau listrik mati.                   | Setelah transaksi `COMMIT`, data tetap ada walau server restart.    |

> ACID cocok untuk: sistem keuangan, banking, akuntansi, ERP — **tempat di mana “angka salah satu digit” bisa bikin masalah besar.**

---

### **BASE — Prinsip Database Non-Relasional (NoSQL)**

**BASE** = **Basically Available, Soft-state, Eventual Consistency**
Tujuannya: **skalabilitas dan ketersediaan lebih penting daripada konsistensi sesaat.**

| Komponen                 | Penjelasan                                                                                                             | Contoh Nyata                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Basically Available**  | Sistem tetap bisa merespons permintaan walau sebagian node sedang gagal.                                               | Di e-commerce besar, sebagian data bisa dilayani dari cache saat node lain down. |
| **Soft-state**           | Status data bisa berubah dari waktu ke waktu, bahkan tanpa input user (karena replikasi atau sinkronisasi antar node). | Data di satu server bisa belum sama dengan server lain sementara waktu.          |
| **Eventual Consistency** | Dalam waktu tertentu, semua data akan menjadi konsisten — **akhirnya**.                                                | Postingan baru di media sosial mungkin belum langsung muncul di semua region.    |

> BASE cocok untuk: aplikasi besar dan real-time seperti **Facebook, Twitter, Netflix, dan e-commerce** yang butuh kecepatan dan skalabilitas lebih tinggi daripada konsistensi instan.

---

### **Perbandingan ACID vs BASE**

| Aspek                  | ACID (SQL)                                | BASE (NoSQL)                      |
| ---------------------- | ----------------------------------------- | --------------------------------- |
| **Konsistensi**        | Ketat dan langsung                        | Longgar, dicapai secara bertahap  |
| **Skalabilitas**       | Vertikal (naikkan spesifikasi server)     | Horizontal (tambah banyak server) |
| **Ketersediaan**       | Kadang dikorbankan demi konsistensi       | Lebih diutamakan                  |
| **Model Data**         | Terstruktur, tabel dan relasi             | Fleksibel, dokumen / key-value    |
| **Transaksi Kompleks** | Sangat mendukung (JOIN, COMMIT, ROLLBACK) | Terbatas atau disimulasikan       |
| **Cocok untuk**        | Keuangan, sistem akurat                   | Media sosial, big data, analytics |

---

### **Keterkaitan dengan CAP Theorem**

Prinsip ACID dan BASE sebenarnya **berakar dari teori CAP**:

- **C** — Consistency
- **A** — Availability
- **P** — Partition tolerance

> Menurut teori CAP, dalam sistem terdistribusi kamu **tidak bisa memiliki semuanya secara bersamaan**.
> Kamu hanya bisa memilih dua:
>
> - **CA**: konsistensi + ketersediaan (SQL tradisional)
> - **AP**: ketersediaan + toleransi partisi (NoSQL modern)

Itu sebabnya MongoDB, Cassandra, DynamoDB, dll memilih BASE — karena mereka beroperasi di lingkungan terdistribusi dengan prioritas ketersediaan tinggi.

---

### **Kesimpulan **

| Tujuan                                       | Pilih                 | Alasannya                                                |
| -------------------------------------------- | --------------------- | -------------------------------------------------------- |
| Integritas data tinggi (keuangan, transaksi) | **SQL (ACID)**        | Transaksi aman, data konsisten                           |
| Skalabilitas besar & performa tinggi         | **NoSQL (BASE)**      | Toleransi kesalahan dan ketersediaan lebih baik          |
| Kombinasi sistem besar                       | **Hybrid (Polyglot)** | Gunakan SQL untuk transaksi, NoSQL untuk caching/logging |

---

### **Sumber Resmi & Rekomendasi Bacaan**

1. **PostgreSQL Docs - Transaction Concepts**
   [https://www.postgresql.org/docs/current/tutorial-transactions.html](https://www.postgresql.org/docs/current/tutorial-transactions.html)
2. **MongoDB Docs - Data Consistency and Transactions**
   [https://www.mongodb.com/docs/manual/core/read-isolation-consistency-recency/](https://www.mongodb.com/docs/manual/core/read-isolation-consistency-recency/)
3. **CAP Theorem Overview - ACM Queue (Eric Brewer)**
   [https://queue.acm.org/detail.cfm?id=1394128](https://queue.acm.org/detail.cfm?id=1394128)
4. **RisingStack: Understanding ACID and BASE**
   [https://blog.risingstack.com/the-basics-of-acid-and-base/](https://blog.risingstack.com/the-basics-of-acid-and-base/)

---
