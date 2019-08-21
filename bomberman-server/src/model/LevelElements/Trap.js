const LevelElement = require('./LevelElement');

class Trap extends LevelElement {
  constructor() {
    super();
    this.isBreakable = true;
    this.isWalkable = true;
  }
}

Trap.key = 'TRAP';

module.exports = Trap;