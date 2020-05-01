const fs = require('fs');

const logger = {};

const httpLog = fs.createWriteStream('logs/http.log', { flags: 'a' });
const infoLog = fs.createWriteStream('logs/info.log', { flags: 'a' });
const errorLog = fs.createWriteStream('logs/error.log', { flags: 'a' });
const debugLog = fs.createWriteStream('logs/debug.log', { flags: 'a' });

logger.http = (log) => {
  httpLog.write(`${new Date()} : ${String(log)} \n`);
};

logger.info = (log) => {
  infoLog.write(`${new Date()} : ${String(log)} \n`);
};

logger.debug = (log) => {
  debugLog.write(`${new Date()} : ${String(log)} \n`);
};

logger.error = (log) => {
  errorLog.write(`${new Date()} : ${JSON.stringify(log)} \n`);
};

module.exports = logger;
