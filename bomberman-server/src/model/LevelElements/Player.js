const LevelElement = require('./LevelElement');

class Player extends LevelElement {
  constructor(playerId) {
    super();
    this.playerId = playerId;
    this.isWalkable = true;
  }
}

Player.key = 'PLAYER';

module.exports = Player;