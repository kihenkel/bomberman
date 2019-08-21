const Bomb = require('./model/LevelElements/Bomb');
const Trap = require('./model/LevelElements/Trap');

const bombs = [];
const traps = [];

const createBomb = (worldSettings) => {
  const bomb = new Bomb(worldSettings);
  bombs.push(bomb);
  return bomb;
};

const removeBomb = (bomb) => {
  const index = bombs.findIndex(element => element === bomb);
  if (index < 0) {
    throw new Error(`BombStore.removeBomb: Could not find bomb ${bomb} in ${bombs}.`);
  }
  bombs.splice(index, 1);
};

module.exports = {
  createBomb,
  removeBomb,
};
