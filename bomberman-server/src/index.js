const logger = require('./utils/logger');
const server = require('./server');

const levelManager = require('./managers/levelManager');
const playerManager = require('./managers/playerManager');
const storeManager = require('./managers/storeManager');
const gameManager = require('./managers/gameManager');

const settings = require('./../config/settings.json');

logger.setLogLevel(settings.logLevel || 'info');

const init = (settings) => {
  logger.info('Initializing game ...');
  server.start(settings.server);
  storeManager.initStores(settings.world);
  levelManager.initLevel('its_a_trap.map', settings.level);
  playerManager.initPlayers(2, settings.player);
  gameManager.startGame();
};

init(settings);