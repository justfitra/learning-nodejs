import fs from "fs";
const readStream = fs.createReadStream("video.mp4");
readStream.on("data", (chunk) => console.log("Membaca bagian:", chunk.length));
readStream.on("end", () => console.log("Selesai"));
