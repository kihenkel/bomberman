const Move = require('./../Move');
const LevelElement = require('./LevelElement');

class Player extends LevelElement {
  constructor(playerId, playerSettings) {
    super();
    this.id = playerId;
    this.isWalkable = true;

    this.maxBombs = 1;
    Object.keys(playerSettings)
      .forEach(setting => this[setting] = playerSettings[setting]);
  }

  onStart() {
    this.isAlive = true;
    this.pendingMove = undefined;
    this.amountBombs = this.maxBombs;
  }

  onRound() {
    super.onRound();
    this.pendingMove = undefined;
  }

  registerMove(move) {
    this.pendingMove = move;
  }
}

Player.key = 'PLAYER';

module.exports = Player;