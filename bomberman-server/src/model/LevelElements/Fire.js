const LevelElement = require('./LevelElement');

class Fire extends LevelElement {
  constructor() {
    super();
    this.isWalkable = true;
  }

  onRoundEnd(eventManager) {
    if (this.isOneRoundOld) {
      eventManager.onLevelElementDestroyed(this);
    } else {
      const stack = this.getStack();
      stack.forEach((levelElement) => {
        if (levelElement === this) {
          return;
        }
        levelElement.onHitByFire(eventManager);
      });
    }
    this.isOneRoundOld = true;
  }
}

Fire.key = 'FIRE';

module.exports = Fire;