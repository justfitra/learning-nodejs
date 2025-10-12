const fs = require("fs");

// Membaca File
async function read(params) {}
fs.readFile("built-in-modules/code/notes.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("isi file : ", data);
});

// Membuat File Baru
fs.writeFile("built-in-modules/code/test-write.txt", "Hello Worold", (err) => {
  if (err) throw err;
  console.log("file berhasil dibuat");
});

// Menambah isi File
fs.appendFile(
  "built-in-modules/code/notes.txt",
  "just fitra call you",
  "utf8",
  (err) => {
    if (err) throw err;

    console.log("berhasil menambahkan text baru");
  }
);

fs.unlink("built-in-modules/code/test-write.txt", (err) => {
  if (err) throw err;
  console.log("file berhasil dihapus");
});

fs.mkdir(
  "built-in-modules/code/test-make-folder",
  { recursive: true },
  (err) => {
    if (err) throw err;
    console.log("berhasil membuat folder");
  }
);
