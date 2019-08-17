const LevelElement = require('./LevelElement');

class ItemBombRadius extends LevelElement {
  constructor() {
    super();
    this.isItem = true;
    this.isBreakable = true;
    this.isWalkable = true;
  }
}

ItemBombRadius.key = 'ITEM_BOMB_RADIUS';

module.exports = ItemBombRadius;