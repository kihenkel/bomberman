const logger = require('./utils/logger');
const handleMove = require('./server/service/handleMove');

const gameState = require('./gameState');

const startGame = (levelGrid) => {
  logger.info('Starting game ...');

  const handlePlayerInput = (playerId, moveInput) => {
    logger.info('Player', playerId, 'sent move', moveInput);

    if (!gameState.isPlayerIdNext(playerId)) {
      throw new Error(`Player ${playerId} is not next! Next player is player ${gameState.getNextPlayer()}.`)
    }
    gameState.setNextPlayer();
  };
  handleMove.registerPlayerInputHandler(handlePlayerInput);

  gameState.setNextPlayer();
};

module.exports = {
  startGame,
};
