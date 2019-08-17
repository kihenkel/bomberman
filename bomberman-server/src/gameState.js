const logger = require('./utils/logger');

const activePlayerIds = [];
let currentPlayer;

module.exports = {
  isPlayerIdActive: (playerId) => Number.isInteger(playerId) && activePlayerIds.includes(playerId),
  addPlayerId: (playerId) => activePlayerIds.push(playerId),
  setNextPlayer: () => {
    if (!activePlayerIds.length) {
      throw new Error('No active players!');
    }
    if (!Number.isInteger(currentPlayer) || currentPlayer === activePlayerIds.length - 1) {
      currentPlayer = activePlayerIds[0];
    } else {
      currentPlayer = activePlayerIds[currentPlayer + 1];
    }
    logger.info(`Next player is player ${currentPlayer}!`)
  },
  isPlayerIdNext: (playerId) => Number.isInteger(playerId) && currentPlayer === playerId,
  getNextPlayer: () => currentPlayer,
};
