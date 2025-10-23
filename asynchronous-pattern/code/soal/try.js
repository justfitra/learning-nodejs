const fs = require("fs");

async function bacafile() {
  try {
    const data1 = await fs.promises.readFile("data.txt", "utf8");
    const data2 = await fs.promises.readFile("data.txt", "utf8");

    console.log(data1, data2);
  } catch (err) {
    console.log(err);
  }
}

bacafile();
