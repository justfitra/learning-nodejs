import winston from "winston";

// Railway containers use ephemeral, read-only-ish filesystems — anything
// written to disk is lost on restart/redeploy. Only log to the console so
// Railway's log aggregation can pick it up.
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
  ],
});

export default logger;
