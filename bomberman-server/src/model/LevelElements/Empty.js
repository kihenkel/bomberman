const LevelElement = require('./LevelElement');

class Empty extends LevelElement {
  constructor() {
    super();
    this.isWalkable = true;
  }
}

Empty.key = 'EMPTY';

module.exports = Empty;