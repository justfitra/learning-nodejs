import fs from "fs";

const filePath = `data.txt`;
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    throw new Error("File Corrupts");
  }

  console.log(data);
});
