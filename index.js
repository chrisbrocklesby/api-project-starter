require('dotenv').config();
const express = require('express');
const compression = require('compression');
const logger = require('./helpers/logger');

const http = express();

http.use(express.json());
http.use(compression());

http.all('*', (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

http.use((request, response, next) => {
  response.on('finish', () => {
    const user = (request.user && request.user.pk) ? request.user.pk : null;
    logger.http(`${response.statusCode} - ${request.method} - ${request.originalUrl} - ${request.ip} - user(${user})`);
  });
  next();
});

http.use('/', require('./routes'));

http.use((request, response, next) => {
  response.status(404)
    .json({
      success: false,
      message: 'notFound',
      data: null,
    });
  next();
});

http.use((error, request, response, next) => {
  response.status(error.status || 500)
    .json({
      success: false,
      message: `${error.message}`,
      data: null,
    });
  next();
});

http.disable('x-powered-by');

http.listen(process.env.PORT || 3000);
