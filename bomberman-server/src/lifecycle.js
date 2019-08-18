const logger = require('./utils/logger');
const levelStore = require('./levelStore');

const onStart = () => {
  logger.verbose('Lifecycle: onStart');
  levelStore.executeForAllLevelElements('onStart');
};

const onRound = () => {
  logger.verbose('Lifecycle: onRound');
  levelStore.executeForAllLevelElements('onRound');
};

module.exports = {
  onStart,
  onRound,
};