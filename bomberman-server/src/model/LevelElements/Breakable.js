const LevelElement = require('./LevelElement');

class Breakable extends LevelElement {
  constructor() {
    super();
    this.isBreakable = true;
  }
}

Breakable.key = 'BREAKABLE';

module.exports = Breakable;