const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// ============================
const {
  time: { getTime, showTime },
} = require('./middlewares');

const handlerError = require('./handlerError/handler');
// ============================
const router = require('./routers');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/public', express.static('public'));

app.use(getTime, showTime);

app.use(logger('dev'));

app.use('/api', router);

app.use(handlerError);

module.exports = app;
