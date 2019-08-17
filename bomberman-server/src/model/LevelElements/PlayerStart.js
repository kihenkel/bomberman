const LevelElement = require('./LevelElement');

class PlayerStart extends LevelElement {
  constructor() {
    super();
    this.isWalkable = true;
  }
}

PlayerStart.key = 'PLAYER_START';

module.exports = PlayerStart;