const logger = require('./utils/logger');
const server = require('./server');

const levelStore = require('./levelStore');
const playerStore = require('./playerStore');
const gameManager = require('./gameManager');

const settings = require('./../config/settings.json');

logger.setLogLevel(settings.logLevel || 'info');

const init = (settings) => {
  logger.info('Initializing game ...');
  server.start(settings.server);
  levelStore.initLevel('standard.map', settings.level);
  playerStore.fillPlayers(2, settings.player);
  gameManager.startGame(settings.world);
};

init(settings);