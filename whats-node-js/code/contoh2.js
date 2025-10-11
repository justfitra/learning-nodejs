const fs = require("fs");

fs.readFile("whats-node-js/code/data.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("Isi file:", data);
});

console.log("Baris ini dijalankan duluan");
