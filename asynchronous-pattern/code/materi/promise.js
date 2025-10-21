import fs from "fs";

const filePath = `data.txt`;

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  });
}

getData()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
