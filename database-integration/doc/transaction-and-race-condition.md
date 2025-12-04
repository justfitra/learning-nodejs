# **Transaction & Race Condition in Node.js + MongoDB**

## **1. Overview**

Dalam sistem concurrent (banyak request datang bersamaan), operasi database dapat mengalami inkonsistensi. Contoh klasik:

- User A saldo 100000
- User B saldo 20000
- A transfer 30000 ke B
- Dua request transfer masuk _bersamaan_

Tanpa mekanisme yang benar, hasilnya bisa:

- Saldo A terpotong dua kali
- Saldo B menerima double transfer
- Data menjadi korup dan sulit diperbaiki

Solusi utama:
**Transaction + Concurrency Control**.

---

## **2. Apa itu Race Condition?**

Race condition adalah kondisi ketika dua atau lebih proses berjalan bersamaan dan mengakses data yang sama, sehingga hasil akhirnya tergantung urutan eksekusi yang tidak bisa diprediksi.

Contoh:

Request 1 dan Request 2 sama-sama membaca saldo A = 100000.
Keduanya menghitung saldo terbaru, lalu update.
Hasil akhir bisa salah, meskipun kode program tidak error.

---

## **3. Mengapa MongoDB Perlu Transaksi?**

Pada operasi single-document, MongoDB sudah atomic.
Namun untuk operasi **multi-document**, seperti:

- memindahkan saldo antar user
- update 2 collection sekaligus
- stock barang terpotong di satu collection dan tercatat di collection log

Diperlukan **transaction** agar operasi tersebut:

- Either berhasil semua
- Atau batal semua (rollback)

---

## **4. MongoDB Transaction (Session-Based)**

Untuk membuat transaksi di MongoDB:

1. Membuka session
2. Memulai transaksi
3. Eksekusi semua operasi database
4. Commit
5. Jika error → Rollback

### **Contoh Struktur Kode**

```js
import mongoose from "mongoose";

export const transferService = async (fromUserId, toUserId, amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fromUser = await User.findById(fromUserId).session(session);
    const toUser = await User.findById(toUserId).session(session);

    if (!fromUser || !toUser) {
      throw new Error("User not found");
    }

    if (fromUser.balance < amount) {
      throw new Error("Insufficient balance");
    }

    fromUser.balance -= amount;
    toUser.balance += amount;

    await fromUser.save({ session });
    await toUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      status: "success",
      from: fromUserId,
      to: toUserId,
      amount,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
```

---

## **5. Kapan Race Condition Terjadi?**

Contoh kasus transfer:

```
Request A → baca saldo A = 100000
Request B → baca saldo A = 100000 (hampir bersamaan)
Keduanya mengurangi saldo 30000
Result:
A = 40000 (padahal seharusnya 70000)
```

Jika operasi dilakukan tanpa transaksi, update mereka saling tumpang tindih.

---

## **6. Mengapa Transaction Mencegah Race Condition?**

Dengan transaksi:

1. Semua query pada session tersebut terjadi dalam **atomic operation**.
2. Data yang dibaca session bersifat isolasi.
3. Jika dua transaksi berjalan bersamaan:

   - MongoDB akan mengatur locking di level document.
   - Salah satu transaksi bisa menunggu atau gagal (write conflict).

---

## **7. Write Conflict dan Retry Pattern**

MongoDB bisa melempar error:

```
WriteConflict: Unable to acquire lock
```

Solusi:
Gunakan **retry pattern**, yaitu menjalankan transaksi kembali hingga berhasil.

---

## **8. Best Practices**

### **1. Gunakan transaksi hanya untuk operasi kritis**

Transaksi mahal secara performa.
Gunakan hanya untuk:

- transfer saldo
- pemotongan stok barang
- update banyak koleksi sekaligus

### **2. Jangan simpan session di global scope**

Session harus selalu per-request / per-service call.

### **3. Error harus trigger rollback**

Gunakan try...catch dan selalu panggil:

```js
await session.abortTransaction();
```

### **4. Tambahkan timeout dan retry**

Untuk produksi, gunakan retry 3–5 kali untuk write conflict.

---

## **9. Contoh Response Sukses**

```json
{
  "status": "success",
  "from": "a_user_id",
  "to": "b_user_id",
  "amount": 30000
}
```

---

## **10. Contoh Response Gagal**

```json
{
  "status": "failed",
  "message": "Insufficient balance"
}
```

---

## **11. Tanda Kamu Butuh Transaksi**

Jika operasi kamu:

- Membaca lalu menulis data yang sama
- Menulis beberapa dokumen berbeda
- Bergantung pada nilai sebelumnya (balance, stock, kuota)

Maka kamu harus memakai transaksi, bukan logic manual.

---

## **12. Kesimpulan**

Race condition adalah masalah nyata di backend.
Transaksi adalah alat utama untuk menjaga konsistensi.
Di Node.js + MongoDB, transaksi sudah powerful, namun harus diimplementasikan dengan benar:

- Session-based
- Atomic
- Commit / rollback
- Retry pattern
