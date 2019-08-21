const Move = require('./model/Move');
const Player = require('./model/LevelElements/Player');
const levelStore = require('./levelStore');
const playerStore = require('./playerStore');
const bombStore = require('./bombStore');

const executeMove = (offsetX, offsetY) => (player) => {
  const playerPos = levelStore.getPositionForLevelElement(player);
  if (!playerPos) {
    throw new Error(`Could not find player ${player.id}.`);
  }
  const originStack = levelStore.getStackAt(playerPos.x, playerPos.y);
  const targetStack = levelStore.getStackAt(playerPos.x + offsetX, playerPos.y + offsetY);

  originStack.deleteLevelElement(player);
  targetStack.addLevelElement(player);
};

const executePlantBomb = (player, worldSettings) => {
  const playerPos = levelStore.getPositionForLevelElement(player);
  const targetStack = levelStore.getStackAt(playerPos.x, playerPos.y);

  const bomb = bombStore.createBomb(worldSettings);
  targetStack.addLevelElement(bomb);
};

const moveMap = {
  [Move.UP]: executeMove(0, -1),
  [Move.RIGHT]: executeMove(1, 0),
  [Move.DOWN]: executeMove(0, 1),
  [Move.LEFT]: executeMove(-1, 0),
  [Move.BOMB]: executePlantBomb,
  [Move.DO_NOTHING]: () => {},
};

const executeMoves = (worldSettings) => {
  const players = playerStore.getAlivePlayers();

  players.forEach(player => {
    if (!player.pendingMove) {
      return;
    }
    moveMap[player.pendingMove](player, worldSettings);
  });
};

module.exports = {
  executeMoves,
};
