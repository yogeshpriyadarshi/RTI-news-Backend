const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, printf, json, colorize, simple } = winston.format;

const isProduction = process.env.NODE_ENV === 'production';

// Define custom formats
const devFormat = combine(
  colorize(),
  simple()
);

const prodFormat = combine(
  timestamp(),
  json()
);

// Daily file logging
const fileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: isProduction ? 'info' : 'debug'  // log more details in dev
});

// Console logging
const consoleTransport = new winston.transports.Console({
  level: isProduction ? 'info' : 'debug',
  format: devFormat
});

// Logger instance
const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  format: isProduction ? prodFormat : devFormat,
  transports: [
     fileTransport, consoleTransport
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});

module.exports = logger;
