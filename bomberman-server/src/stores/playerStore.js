const Store = require('./Store');
const Player = require('./../model/LevelElements/Player');

class PlayerStore extends Store {
  constructor(LevelElement) {
    super(LevelElement);
  }

  getByPlayerId(playerId) {
    return this.levelElements.find(element => element.id === playerId);
  }

  haveAllPlayersMadeMove() {
    return this.levelElements.every(player => player.hasMadeMove());
  }
}

module.exports = new PlayerStore(Player);

