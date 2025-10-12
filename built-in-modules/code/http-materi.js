const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello World");
  res.end("Halo dari server Node.js!");
});

server.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
