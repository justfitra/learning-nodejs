/*
Studi Kasus 5 (Tingkat Sakit Kepala Sedang):

Server menerima POST /feedback dengan body JSON berisi name dan message.
Server harus menyimpan data ini ke file feedback.json dalam bentuk array JSON.
Jika file belum ada, buat baru.
GET /feedback → tampilkan semua feedback dalam format JSON.

Tujuan: belajar parsing body request (req.on("data")), validasi JSON, dan menulis file dengan format tertentu.
*/

import http from "http";
import fs from "fs";

const hostname = "localhost";
const port = 3000;
const filePath = "feedback.json";
let id = 1;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/feedback" && method === "GET") {
    try {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            res.writeHead(404, { "content-type": "text/plain" });
            return res.end("File Belum tersedia");
          }
          res.writeHead(400, { "content-type": "text/plain" });
          return res.end("Permintaan tidak valid");
        }

        if (!err && data) {
          res.writeHead(200, { "content-type": "text/plain" });
          return res.end(data);
        }
      });
    } catch {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Internal server error");
    }
  } else if (url === "/feedback" && method === "POST") {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const text = JSON.parse(body);

        fs.readFile(filePath, "utf8", (err, data) => {
          let content = [];

          if (!err && data) {
            try {
              content = JSON.parse(data);
            } catch {
              content = [];
            }
          }

          const newContent = {
            id: ++id,
            text: text.text,
          };

          content.push(newContent);

          fs.writeFile(filePath, JSON.stringify(content, null, 2), (err) => {
            if (err) {
              console.log(err);
            }

            console.log(JSON.stringify(content));
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
});

server.listen(3000, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

fetch("http://localhost:3000/feedback", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "fitra" }),
});
