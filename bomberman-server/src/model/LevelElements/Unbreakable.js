const LevelElement = require('./LevelElement');

class Unbreakable extends LevelElement {
  constructor() {
    super();
    this.isWalkable = true;
  }
}

Unbreakable.key = 'UNBREAKABLE';

module.exports = Unbreakable;