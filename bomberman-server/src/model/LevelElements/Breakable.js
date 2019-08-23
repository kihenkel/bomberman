const LevelElement = require('./LevelElement');

class Breakable extends LevelElement {
  constructor() {
    super();
    this.isBreakable = true;
  }

  onHitByFire(eventManager) {
    eventManager.onLevelElementDestroyed(this);
  }
}

Breakable.key = 'BREAKABLE';

module.exports = Breakable;