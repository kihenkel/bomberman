const LevelElement = require('./LevelElement');

class Player extends LevelElement {
  constructor(worldSettings, playerId, playerSettings) {
    super();
    this.id = playerId;
    this.isWalkable = true;

    this.maxBombs = 1;
    Object.keys(playerSettings)
      .forEach(setting => this[setting] = playerSettings[setting]);
  }

  onStart() {
    this.alive = true;
    this.pendingMove = undefined;
    this.amountBombs = this.maxBombs;
  }

  onRound() {
    super.onRound();
    this.pendingMove = undefined;
  }

  onHitByFire() {
    this.alive = false;
  }

  registerMove(move) {
    this.pendingMove = move;
  }

  isAlive() {
    return this.alive;
  }

  getPendingMove() {
    return this.pendingMove;
  }

  hasMadeMove() {
    return !!this.pendingMove;
  }
}

Player.key = 'PLAYER';

module.exports = Player;