const Move = require('./model/Move');
const levelManager = require('./managers/levelManager');
const playerStore = require('./stores/playerStore');

const successValidation = () => ({ success: true });
const failedValidation = (reason) => ({ success: false, reason });
const failedValidationWithContext = (move, reason) => failedValidation(`Cannot perform move ${move}! ${reason}`);

const validateMove = (move, offsetX, offsetY) => (player) => {
  const playerPos = levelManager.getPositionForLevelElement(player);
  if (!playerPos) {
    throw new Error(`Could not find player ${playerId}.`);
  }
  const targetStack = levelManager.getStackAt(playerPos.x + offsetX, playerPos.y + offsetY);
  if (!targetStack) {
    return failedValidationWithContext(move, 'No levelElement at target position.');
  }
  if (targetStack.some(levelElement => !levelElement.isWalkable)) {
    return failedValidationWithContext(move, 'Target position is blocked.');
  }
  return successValidation();
};

const validatePlantBomb = (player) => {
  if (player.amountBombs <= 0) {
    return failedValidationWithContext(Move.BOMB, 'Not enough bombs.');
  }
  return successValidation();
};

const validationMap = {
  [Move.UP]: validateMove(Move.UP, 0, -1),
  [Move.RIGHT]: validateMove(Move.RIGHT, 1, 0),
  [Move.DOWN]: validateMove(Move.DOWN, 0, 1),
  [Move.LEFT]: validateMove(Move.LEFT, -1, 0),
  [Move.BOMB]: validatePlantBomb,
  [Move.DO_NOTHING]: () => successValidation(),
};

const validateMoveForPlayer = (playerId, move) => {
  const player = playerStore.getByPlayerId(playerId);
  if (!player) {
    return failedValidation(`Player ${playerId} does not exist!`);
  }
  if (!player.isAlive()) {
    return failedValidation(`Player ${playerId} is not alive!`);
  }
  if (player.hasMadeMove()) {
    return failedValidation(`Player ${playerId} already made move for this round!`);
  }
  
  const moves = Object.keys(Move);
  if (!moves.includes(move)) {
    return failedValidation(`Could not recognize move input ${params.moveInput}!`);
  }

  return validationMap[move] ? validationMap[move](player) : failedValidation(`Move ${move} not supported for validation.`);
};

module.exports = {
  validateMoveForPlayer,
};
