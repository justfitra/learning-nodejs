import fs from "fs";

const filePath = "data.txt";

async function getUser(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");

    return data;
  } catch (err) {
    console.log(err);
  }
}
getUser(filePath);
