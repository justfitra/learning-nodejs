import winston from "winston";
import { DailyRotateFile } from "winston/lib/winston/transports";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp} ${level.toUpperCase} : ${message}]`;
    }),
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),

    new DailyRotateFile(),
  ],
});
