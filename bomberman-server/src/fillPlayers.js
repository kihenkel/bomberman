const logger = require('./utils/logger');
const gameState = require('./gameState');
const PlayerStart = require('./model/LevelElements/PlayerStart');
const Player = require('./model/LevelElements/Player');

const getPlayerStartStacks = (levelGrid) => {
  return levelGrid.reduce((acc, row) => {
    const foundStacks = row.filter(stack => {
      return stack.some(levelElement => levelElement instanceof PlayerStart);
    });

    if (foundStacks.length > 0) {
      return acc.concat(foundStacks);
    }
    return acc;
  }, []);
};

module.exports = (levelGrid, amountPlayers) => {
  logger.info('Adding', amountPlayers, 'players ...');
  const playerStartStacks = getPlayerStartStacks(levelGrid);

  for(let playerId = 0; playerId < Math.min(amountPlayers, playerStartStacks.length); playerId++) {
    playerStartStacks[playerId].push(new Player(playerId));
    gameState.addPlayerId(playerId);
  }

  return levelGrid;
};
