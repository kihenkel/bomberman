const LevelElement = require('./LevelElement');

class Trap extends LevelElement {
  constructor(worldSettings) {
    super();
    this.isBreakable = true;
    this.isWalkable = true;

    this.radius = worldSettings.trapRadius;
  }

  onRound(eventManager) {
    if (this.aboutToExplode) {
      eventManager.onExplode(this);
    }
  }

  onHitByFire() {
    console.log('hitBYFIRE');
    this.aboutToExplode = true;
  }

  getRadius() {
    return this.radius;
  }
}

Trap.key = 'TRAP';

module.exports = Trap;