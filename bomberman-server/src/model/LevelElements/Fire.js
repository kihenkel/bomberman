const LevelElement = require('./LevelElement');

class Fire extends LevelElement {
  constructor() {
    super();
    this.isWalkable = true;
  }
}

Fire.key = 'FIRE';

module.exports = Fire;