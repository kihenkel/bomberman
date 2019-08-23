const Move = require('./model/Move');
const Player = require('./model/LevelElements/Player');
const levelManager = require('./managers/levelManager');
const playerStore = require('./stores/playerStore');
const bombStore = require('./stores/bombStore');

const executeMove = (offsetX, offsetY) => (player) => {
  const playerPos = levelManager.getPositionForLevelElement(player);
  if (!playerPos) {
    throw new Error(`Could not find player ${player.id}.`);
  }
  const originStack = levelManager.getStackAt(playerPos.x, playerPos.y);
  const targetStack = levelManager.getStackAt(playerPos.x + offsetX, playerPos.y + offsetY);

  originStack.deleteLevelElement(player);
  targetStack.addLevelElement(player);
};

const executePlantBomb = (player) => {
  const playerPos = levelManager.getPositionForLevelElement(player);
  const targetStack = levelManager.getStackAt(playerPos.x, playerPos.y);

  const bomb = bombStore.create();
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

const executeMoves = () => {
  const players = playerStore.getAll().filter(player => player.isAlive());

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
