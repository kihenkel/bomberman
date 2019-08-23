const logger = require('./../utils/logger');
const handleMove = require('./../server/service/handleMove');

const gameState = require('./../gameState');
const moveRules = require('./../moveRules');
const lifecycle = require('./../lifecycle');

const playerStore = require('./../stores/playerStore');

const moveExecutor = require('./../moveExecutor');
const eventManager = require('./../eventManager');

const draw = require('./../draw');

const executeMoves = () => {
  moveExecutor.executeMoves();
};

const nextRound = () => {
  lifecycle.onRoundEnd(eventManager);
  logger.info('=== NEW ROUND ===');
  gameState.setNextRound();
  logger.info(`Round ${gameState.getCurrentRound()}!`);
  lifecycle.onRound(eventManager);

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
    
    const player = playerStore.getByPlayerId(playerId);
    player.registerMove(move);

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
