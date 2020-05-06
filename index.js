require('dotenv').config();
const express = require('express');
const compression = require('compression');
const routes = require('./routes');

const http = express();

http.use(express.json());
http.use(compression());
http.disable('x-powered-by');

http.all('*', (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

http.use('/', routes);

http.use((request, response, next) => {
  response.status(404)
    .json({
      status: 'fail',
      message: 'notFound',
      data: null,
    });
  next();
});

http.use((error, request, response, next) => {
  response.status(error.statusCode || 500)
    .json({
      status: error.status || 'error',
      message: error.message || 'serverError',
      data: error.data || null,
    });
  next();
});

http.listen(process.env.PORT || 3000);
