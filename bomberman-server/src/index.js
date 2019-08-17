const logger = require('./utils/logger');
const server = require('./server');

const loadLevel = require('./loadLevel');
const fillLevel = require('./fillLevel');
const fillPlayers = require('./fillPlayers');

const gameManager = require('./gameManager');

const settings = require('./../config/settings.json');

logger.setLogLevel(settings.logLevel || 'info');

const init = (settings) => {
  logger.info('Initializing game ...');
  server.start(settings.server);

  let levelGrid;
  levelGrid = loadLevel('standard.map', settings.level);
  levelGrid = fillLevel(levelGrid);
  levelGrid = fillPlayers(levelGrid, 2);

  gameManager.startGame(levelGrid);
};

init(settings);