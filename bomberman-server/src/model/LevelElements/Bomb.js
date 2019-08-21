const LevelElement = require('./LevelElement');

class Bomb extends LevelElement {
  constructor(worldSettings) {
    super();
    this.isBreakable = true;
    this.isWalkable = true;

    this.roundsUntilExplode = worldSettings.roundsUntilBombExplodes;
    this.radius = worldSettings.bombRadius;
  }

  onRoundEnd(eventManager) {
    this.roundsUntilExplode -= 1;

    if (this.roundsUntilExplode < 0) {
      eventManager.onBombExplode(this);
    }
  }

  onHitByFire() {
    if (this.roundsUntilExplode > 0) {
      this.roundsUntilExplode = 0;
    }
  }

  getRadius() {
    return this.radius;
  }
}

Bomb.key = 'BOMB';

module.exports = Bomb;
