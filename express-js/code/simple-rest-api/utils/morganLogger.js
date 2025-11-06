import fs from "fs";
export const morganLogger = (path) => {
  const acessLog = fs.createWriteStream(path, { flags: "a" });

  return acessLog;
};
