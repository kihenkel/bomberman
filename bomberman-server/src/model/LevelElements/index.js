const Empty = require('./Empty');
const Breakable = require('./Breakable');
const Unbreakable = require('./Unbreakable');
const Bomb = require('./Bomb');
const Trap = require('./Trap');
const ItemBombAmount = require('./ItemBombAmount');
const ItemBombRadius = require('./ItemBombRadius');
const PlayerStart = require('./PlayerStart');

module.exports = [
  Breakable,
  Unbreakable,
  Bomb,
  Trap,
  ItemBombAmount,
  ItemBombRadius,
  PlayerStart,
];
module.exports.Empty = Empty;
