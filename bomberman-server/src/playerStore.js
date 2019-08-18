const logger = require('./utils/logger');
const levelStore = require('./levelStore');
const PlayerStart = require('./model/LevelElements/PlayerStart');
const Player = require('./model/LevelElements/Player');

const players = [];

const getAlivePlayers = (playerId) => {
  return players.filter(player => player.isAlive);
};

const getPlayer = (playerId) => {
  return players.find(player => player.id === playerId);
};

const fillPlayers = (amountPlayers, playerSettings) => {
  logger.info('Adding', amountPlayers, 'players ...');

  const playerStartStacks = levelStore.getStacksWithLevelElement(PlayerStart);
  for (let playerId = 0; playerId < Math.min(amountPlayers, playerStartStacks.length); playerId++) {
    const player = new Player(playerId, playerSettings);
    players.push(player);
    playerStartStacks[playerId].push(player);
  }
};

const playerExists = (playerId) => {
  return !!getPlayer(playerId);
};

const isPlayerAlive = (playerId) => {
  return getPlayer(playerId).isAlive;
};

const haveAllPlayersMadeMove = () => {
  return players.every(player => player.pendingMove);
};

const hasPlayerMadeMove = (playerId) => {
  const player = getPlayer(playerId);
  return !!player.pendingMove;
};

const registerMove = (playerId, move) => {
  const player = getPlayer(playerId);
  player.registerMove(move);
};

module.exports = {
  getAlivePlayers,
  getPlayer,
  fillPlayers,
  playerExists,
  isPlayerAlive,
  haveAllPlayersMadeMove,
  hasPlayerMadeMove,
  registerMove,
};
