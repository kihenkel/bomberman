const LevelElement = require('./LevelElement');

class ItemBombAmount extends LevelElement {
  constructor() {
    super();
    this.isItem = true;
    this.isBreakable = true;
    this.isWalkable = true;
  }
}

ItemBombAmount.key = 'ITEM_BOMB_AMOUNT';

module.exports = ItemBombAmount;