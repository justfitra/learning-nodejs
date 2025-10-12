import path from "path";

const filePath = "folder/subfolder/file.txt";
const __dirname = import.meta.dirname;

// Nama file
console.log(`nama file : ${path.basename(filePath)}`);

// Nama folder induk
console.log(`nama folder induk : ${path.dirname(filePath)}`);

// Extensi file
console.log(`extensi file : ${path.extname(filePath)}`);

console.log(path.join(__dirname, "data", "file.txt"));
