import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
    }),
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),

    new DailyRotateFile({
      filename: "src/logs/applicaiton-%DATE%.log",
      datePattern: "YYYY-MM-DD",

      maxSize: "20m",
      maxFiles: "14d",
    }),
    new winston.transports.File({
      filename: "src/logs/combined.log",
      // format: winston.format.json(), untuk mengganti format ke json biasanya di gunakan di production
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

  exceptionHandlers: [
    new winston.transports.File({
      filename: "src/logs/exceptions.log",
    }),
  ],

  rejectionHandlers: [
    new winston.transports.File({
      filename: "src/logs/rejections.log",
    }),
  ],
});

export default logger;
