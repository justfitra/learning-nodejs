**Module System di Node.js**

Node.js punya dua jenis sistem modul utama: **CommonJS** dan **ES Modules (ESM)**.
Tujuannya sama: membagi kode jadi bagian-bagian kecil yang bisa digunakan ulang.

---

### 1. CommonJS

CommonJS adalah sistem modul **bawaan Node.js**.
Semua file dianggap modul secara otomatis.
Untuk mengimpor, pakai `require()`.
Untuk mengekspor, pakai `module.exports`.

**Contoh:**

export.js

```js
const name = "Fitra";
const sayHello = () => console.log(`Halo, ${name}!`);

module.exports = { name, sayHello };
```

import.js

```js
const { name, sayHello } = require("./export");
sayHello(); // Output: Halo, Fitra!
```

**Ciri-ciri:**

- Pakai `require()` dan `module.exports`
- Sinkron (dibaca baris demi baris)
- Default di semua versi Node.js
- Umum dipakai di library lama

---

### 2. ES Modules (ESM)

ESM adalah sistem modul versi baru (standar JavaScript modern).
Gunakan `import` dan `export`.

**Contoh:**

export.mjs

```js
export const name = "Fitra";
export function sayHello() {
  console.log(`Halo, ${name}!`);
}
```

import.mjs

```js
import { name, sayHello } from "./export.mjs";
sayHello(); // Output: Halo, Fitra!
```

**Ciri-ciri:**

- Pakai `import` dan `export`
- Asinkron
- Harus menambahkan `"type": "module"` di `package.json` atau ubah file jadi `.mjs`

---

**Perbandingan Singkat:**

| Fitur              | CommonJS               | ES Modules                        |
| ------------------ | ---------------------- | --------------------------------- |
| Sintaks            | require/module.exports | import/export                     |
| Default di Node.js | Ya                     | Tidak (harus aktifkan)            |
| Eksekusi           | Sinkron                | Asinkron                          |
| Bisa di browser    | Tidak                  | Ya                                |
| Ekstensi file      | .js                    | .mjs atau .js (jika type: module) |

---

**Kesimpulan:**

- CommonJS → cocok untuk proyek lama.
- ES Modules → cocok untuk proyek modern yang ingin kompatibel dengan browser dan framework seperti React atau Next.js.

---
