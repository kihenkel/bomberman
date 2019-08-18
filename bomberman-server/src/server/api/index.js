const express = require('express');
const logger = require('./../../utils/logger');
const handleMove = require('./../service/handleMove');

const processRequest = (handler) => async (req, res) => {
  try {
    const failedResult = await handler(req.params, req.body, req.query);

    if (failedResult) {
      logger.error(failedResult);
      res.status(400).send(failedResult);
    }

    res.status(200).send();
  } catch (error) {
    console.error('Error while handling request', error);
    res.status(500).send(error.message); 
  }
};

module.exports = () => {
  const api = new express.Router();

  api.post('/start', processRequest(() => {}));
  api.post('/:playerId/move/:moveInput', processRequest(handleMove.handler));

  return api;
};