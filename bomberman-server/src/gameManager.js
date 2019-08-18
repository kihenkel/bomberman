const logger = require('./utils/logger');
const handleMove = require('./server/service/handleMove');

const gameState = require('./gameState');
const moveRules = require('./moveRules');
const lifecycle = require('./lifecycle');

const playerStore = require('./playerStore');
const moveExecutor = require('./moveExecutor');

const draw = require('./draw');

const executeMoves = () => {
  moveExecutor.executeMoves();
};

const nextRound = () => {
  logger.info('=== NEW ROUND ===');
  gameState.setNextRound();
  logger.info(`Round ${gameState.getCurrentRound()}!`);
  lifecycle.onRound();

  draw();
};

const startGame = () => {
  logger.info('Starting game ...');

  const handlePlayerInput = (playerId, move) => {
    logger.info('Player', playerId, 'sent move', move);

    const moveValidationResult = moveRules.validateMoveForPlayer(playerId, move);
    if (!moveValidationResult.success) {
      return moveValidationResult.reason;
    }
    playerStore.registerMove(playerId, move);

    if (playerStore.haveAllPlayersMadeMove()) {
      executeMoves();
      nextRound();
    }
  };
  handleMove.registerPlayerInputHandler(handlePlayerInput);

  lifecycle.onStart();
  nextRound();
};

module.exports = {
  startGame,
};
