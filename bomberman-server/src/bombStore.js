const Bomb = require('./model/LevelElements/Bomb');
const Trap = require('./model/LevelElements/Trap');

const bombs = [];
const traps = [];

const createBomb = () => {
  const bomb = new Bomb();
  bombs.push(bomb);
  return bomb;
};

module.exports = {
  createBomb,
};
