import winston from "winston";
import DialyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp} ${level.toUpperCase()} : ${message}]`;
    }),
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),

    new DialyRotateFile({
      filename: "src/logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",

      maxSize: "20m",
      maxFiles: "14d",
    }),

    new winston.transports.File({
      filename: "src/logs/combined.log",
    }),

    new winston.transports.File({
      filename: "src/logs/err.log",
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
