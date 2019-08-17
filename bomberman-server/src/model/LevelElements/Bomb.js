const LevelElement = require('./LevelElement');

class Bomb extends LevelElement {
  constructor() {
    super();
    this.isBreakable = true;
    this.explodes = true;
    this.isWalkable = true;
  }
}

Bomb.key = 'BOMB';

module.exports = Bomb;
