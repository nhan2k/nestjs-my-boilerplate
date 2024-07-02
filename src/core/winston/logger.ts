import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

// Define custom colors for each log level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'gray',
};

// Add colors to winston
winston.addColors(colors);
const logFormat = printf(({ context, level, message, timestamp }) => {
  return `${timestamp} [${level}] [${context}]: ${message}`;
});

const configService: ConfigService = new ConfigService();

export const winstonConfig = {
  level: 'silly', // Log all levels
  format: combine(
    colorize({ all: true }), // Apply colors to all log levels
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: configService.get<string>('WINSTON_LOG_FILE_NAME'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d', // Keep logs for 14 days
    }),
  ],
};
