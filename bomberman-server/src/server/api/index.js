const express = require('express');

const handleMove = require('./../service/handleMove');

const processRequest = (handler) => async (req, res) => {
  try {
    const result = await handler(req.params, req.body, req.query);
    res.status(200).send(result);
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