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

        fs.writeFile(
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
    } catch {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("Data Harus Valid");
    }
  } else if (url === "/ranking" && method === "GET") {
    try {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(400, { "content-type": "text/plain" });
          res.end("File Kosong");
        }

        res.writeHead(200, { "content-type": "text/plain" });
        const student = JSON.parse(data);
        const highValue = student.filter((res) => res.nilai >= 70);

        return res.end(
          `Siswa Dengan Nilai Tertinggi ${highValue.map((res) => res.name)}`
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
      name: "Fitra ",
      nilai: 89,
    },
    {
      name: "Tutur ",
      nilai: 85,
    },
    {
      name: "Andik",
      nilai: 60,
    },
    {
      name: "Fajar ",
      nilai: 70,
    },
    {
      name: "Nur",
      nilai: 86,
    },
    {
      name: "Alfian ",
      nilai: 87,
    },
  ]),
});
