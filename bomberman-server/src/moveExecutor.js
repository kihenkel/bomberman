const Move = require('./model/Move');
const Player = require('./model/LevelElements/Player');
const levelStore = require('./levelStore');
const playerStore = require('./playerStore');
const bombStore = require('./bombStore');

const executeMove = (offsetX, offsetY) => (player) => {
  const playerPos = levelStore.getPositionForPlayer(player.id);
  if (!playerPos) {
    throw new Error(`Could not find player ${player.id}.`);
  }
  const originStack = levelStore.getStackAt(playerPos.x, playerPos.y);
  const targetStack = levelStore.getStackAt(playerPos.x + offsetX, playerPos.y + offsetY);

  const playerIndex = originStack.findIndex(levelElement => 
    levelElement instanceof Player && levelElement.id === player.id
  );

  if (playerIndex < 0) {
    throw new Error(`Could not find player ${player.id} in stack ${originStack}.`);
  }
  originStack.splice(playerIndex, 1);
  targetStack.push(player);
};

const executePlantBomb = (player) => {
  const playerPos = levelStore.getPositionForPlayer(player.id);
  const targetStack = levelStore.getStackAt(playerPos.x, playerPos.y);

  const bomb = bombStore.createBomb();
  targetStack.push(bomb);
};

const moveMap = {
  [Move.UP]: executeMove(0, -1),
  [Move.RIGHT]: executeMove(1, 0),
  [Move.DOWN]: executeMove(0, 1),
  [Move.LEFT]: executeMove(-1, 0),
  [Move.PLANT_BOMB]: executePlantBomb,
  [Move.DO_NOTHING]: () => successValidation(),
};

const executeMoves = () => {
  const players = playerStore.getAlivePlayers();

  players.forEach(player => {
    if (!player.pendingMove) {
      return;
    }
    moveMap[player.pendingMove](player);
  });
};

module.exports = {
  executeMoves,
};
