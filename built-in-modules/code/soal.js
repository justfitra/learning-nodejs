import fs from "fs";
import path from "path";
import os from "os";
import http from "http";

const filePath = "built-in-modules/code/notes.txt";
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) throw err;
  console.log("Isi File : ", data);
});

console.log(`Nama File : ${path.basename(filePath)}`);
console.log(`Folder Induk : ${path.dirname(filePath)}`);
console.log(`Extensi : ${path.extname(filePath)}`);

const oneMegabyte = 1024 * 1024;
const totalRam = os.totalmem / oneMegabyte;
const freeRam = os.freemem / oneMegabyte;

console.log(`OS : ${os.type()}`);
console.log(`Total RAM : ${totalRam.toFixed(2)} MB`);
console.log(`Free RAM : ${freeRam.toFixed(2)} MB`);
console.log(`Home DIR : ${os.homedir}`);

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Selamat datang di server Node.js buatan Fitra!");
});

server.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
