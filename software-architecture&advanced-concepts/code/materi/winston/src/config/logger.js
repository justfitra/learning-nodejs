import winston from "winston";
const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
    }),
  ),

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: "src/logs/combined.log",
    }),

    new winston.transports.File({
      filename: "src/logs/errr.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "src/logs/req.log",
      level: "http",
    }),
  ],
});

export default logger;
