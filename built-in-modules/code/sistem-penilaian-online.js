/*
Studi Kasus 2: Sistem Penilaian Online

Kamu diminta bikin server ujian dengan route:

POST /submit → siswa kirim nilai (body JSON berisi { nama, nilai }).

GET /ranking → baca data JSON dari file dan tampilkan 5 siswa nilai tertinggi.

Jika data rusak (misal bukan JSON valid), server harus bisa recovery.

Pertanyaan:

Bagaimana kamu parsing data JSON di body tanpa Express?

Kalau file nilai.json sangat besar, apakah sebaiknya dibaca pakai readFileSync atau streaming? Kenapa?

Bagaimana kamu handle siswa yang mengirim body kosong?
*/

import http from "http";
import fs from "fs";

const filePath = "built-in-modules/code/nilai.json";

const server = http.createServer((req, res) => {
  const { url, method } = req;
  fs.stat(filePath, (err) => {
    if (!err) {
      console.log("File exists");
    } else if (err) {
      fs.writeFile(filePath, "", (err) => {
        if (err) throw err;
        console.log("File berhasil dibuat!");
      });
    } else {
      console.log("Some other error: ", err.code);
    }
  });
  if (url === "/submit" && method === "POST") {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const content = JSON.parse(body);

        if (!content) {
          res
            .writeHead(400, { "contet-type": "text/plain" })
            .end("Must be required");
        }

        fs.appendFile(
          filePath,
          JSON.stringify([...content], null, 2),
          "utf8",
          (err) => {
            if (err) {
              res.writeHead(400, { "content-type": "text/plain" });
              res.end("Masukkan isi Content");
            }
            res.writeHead(200, { "content-type": "text/plain" });
            res.end("Content Sukses Di tambahkan");
          }
        );
      });
    } catch {}
  }
});

server.listen(4000, () => {
  console.log("server running in http://localhost:4000");
});

fetch("http://localhost:4000/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify([
    {
      name: "Fitra d4",
      nilai: 89,
    },
    {
      name: "Tutur ",
      nilai: 87,
    },
  ]),
});
