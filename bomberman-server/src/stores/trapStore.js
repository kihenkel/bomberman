const Store = require('./Store');
const Trap = require('./../model/LevelElements/Trap');

class TrapStore extends Store {
  constructor(LevelElement) {
    super(LevelElement);
  }
}

module.exports = new TrapStore(Trap);
