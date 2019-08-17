const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('./../utils/logger');
const api = require('./api');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use('/api', api());

const start = (serverConfig) => {
  const PORT = serverConfig.port || 3000;
  logger.info('Listening to port', PORT, '...');
  app.listen(PORT);
};

module.exports = {
  start,
};
