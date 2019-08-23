const Store = require('./Store');
const Bomb = require('./../model/LevelElements/Bomb');

class BombStore extends Store {
  constructor(LevelElement) {
    super(LevelElement);
  }
}

module.exports = new BombStore(Bomb);
