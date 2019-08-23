const logger = require('../utils/logger');
const levelManager = require('./levelManager');
const PlayerStart = require('../model/LevelElements/PlayerStart');
const playerStore = require('../stores/playerStore');

const initPlayers = (amountPlayers, playerSettings) => {
  logger.info('Adding', amountPlayers, 'players ...');

  const playerStartStacks = levelManager.getStacksWithLevelElement(PlayerStart);
  for (let playerId = 0; playerId < Math.min(amountPlayers, playerStartStacks.length); playerId++) {
    const player = playerStore.create(playerId, playerSettings);
    playerStartStacks[playerId].addLevelElement(player);
  }
};

module.exports = {
  initPlayers,
};