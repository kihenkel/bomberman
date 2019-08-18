const Move = require('./model/Move');
const levelStore = require('./levelStore');
const playerStore = require('./playerStore');

const successValidation = () => ({ success: true });
const failedValidation = (reason) => ({ success: false, reason });
const failedValidationWithContext = (move, reason) => failedValidation(`Cannot perform move ${move}! ${reason}`);

const validateMove = (move, offsetX, offsetY) => (playerId) => {
  const playerPos = levelStore.getPositionForPlayer(playerId);
  if (!playerPos) {
    throw new Error(`Could not find player ${playerId}.`);
  }
  const targetStack = levelStore.getStackAt(playerPos.x + offsetX, playerPos.y + offsetY);
  if (!targetStack) {
    return failedValidationWithContext(move, 'No levelElement at target position.');
  }
  if (targetStack.some(levelElement => !levelElement.isWalkable)) {
    return failedValidationWithContext(move, 'Target position is blocked.');
  }
  return successValidation();
};

const validatePlantBomb = (playerId) => {
  const player = playerStore.getPlayer(playerId);
  if (player.amountBombs <= 0) {
    return failedValidationWithContext(Move.PLANT_BOMB, 'Not enough bombs.');
  }
  return successValidation();
};

const validationMap = {
  [Move.UP]: validateMove(Move.UP, 0, -1),
  [Move.RIGHT]: validateMove(Move.RIGHT, 1, 0),
  [Move.DOWN]: validateMove(Move.DOWN, 0, 1),
  [Move.LEFT]: validateMove(Move.LEFT, -1, 0),
  [Move.PLANT_BOMB]: validatePlantBomb,
  [Move.DO_NOTHING]: () => successValidation(),
};

const validateMoveForPlayer = (playerId, move) => {
  if (!playerStore.playerExists(playerId)) {
    return failedValidation(`PlayerId ${playerId} does not exist!`);
  }
  if (!playerStore.isPlayerAlive(playerId)) {
    return failedValidation(`PlayerId ${playerId} is not alive!`);
  }
  if (playerStore.hasPlayerMadeMove(playerId)) {
    return failedValidation(`Player ${playerId} already made move for this round!`);
  }
  
  const moves = Object.keys(Move);
  if (!moves.includes(move)) {
    return failedValidation(`Could not recognize move input ${params.moveInput}!`);
  }

  return validationMap[move] ? validationMap[move](playerId) : failedValidation(`Move ${move} not supported for validation.`);
};

module.exports = {
  validateMoveForPlayer,
};
