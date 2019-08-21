const logger = require('./utils/logger');
const handleMove = require('./server/service/handleMove');

const gameState = require('./gameState');
const moveRules = require('./moveRules');
const lifecycle = require('./lifecycle');

const playerStore = require('./playerStore');
const moveExecutor = require('./moveExecutor');
const eventManager = require('./eventManager');

const draw = require('./draw');

const executeMoves = (worldSettings) => {
  moveExecutor.executeMoves(worldSettings);
};

const nextRound = () => {
  lifecycle.onRoundEnd(eventManager);
  logger.info('=== NEW ROUND ===');
  gameState.setNextRound();
  logger.info(`Round ${gameState.getCurrentRound()}!`);
  lifecycle.onRound();

  draw();
};

const startGame = (worldSettings) => {
  logger.info('Starting game ...');

  const handlePlayerInput = (playerId, move) => {
    logger.info('Player', playerId, 'sent move', move);

    const moveValidationResult = moveRules.validateMoveForPlayer(playerId, move);
    if (!moveValidationResult.success) {
      return moveValidationResult.reason;
    }
    playerStore.registerMove(playerId, move);

    if (playerStore.haveAllPlayersMadeMove()) {
      executeMoves(worldSettings);
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
