/*
  isRoot
  isBreakable
  isWalkable
  explodes
  isItem
*/

module.exports = {
  EMPTY: {
    isRoot: true,
    key: 'EMPTY',
    isBreakable: false,
    isWalkable: true,
    explodes: false,
  },
  UNBREAKABLE: {
    key: 'UNBREAKABLE',
    isBreakable: false,
    isWalkable: false,
    explodes: false,
  },
  BREAKABLE: {
    key: 'BREAKABLE',
    isBreakable: true,
    isWalkable: false,
    explodes: false,
  },
  BOMB: {
    key: 'BOMB',
    isBreakable: true,
    isWalkable: false,
    explodes: true,
  },
  TRAP: {
    key: 'TRAP',
    isBreakable: true,
    isWalkable: false,
    explodes: true,
  },
  ITEM_BOMB_RADIUS: {
    key: 'ITEM_BOMB_RADIUS',
    isItem: true,
    isBreakable: true,
    isWalkable: true,
    explodes: false,
  },
  ITEM_BOMB_AMOUNT: {
    key: 'ITEM_BOMB_AMOUNT',
    isItem: true,
    isBreakable: true,
    isWalkable: true,
    explodes: false,
  },
  PLAYER_START: {
    key: 'PLAYER_START',
    isBreakable: false,
    isWalkable: true,
    explodes: false,
  }
};