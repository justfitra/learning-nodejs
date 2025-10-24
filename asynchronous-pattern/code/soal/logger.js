import fs from "fs";
import process from "process";

const inputs = process.argv;

const data = inputs[2];

const filePath = "log.txt";

async function fileProcess(data) {
  try {
    if (!data) {
      throw new Error("message must be required");
    }

    await fs.promises.appendFile(filePath, data + "\n", "utf8");
    const getData = await fs.promises.readFile(filePath, "utf8");

    return getData;
  } catch (err) {
    console.log(err);
  }
}

fileProcess(data);
