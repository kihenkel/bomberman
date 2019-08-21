const logger = require('./utils/logger');
const levelStore = require('./levelStore');

const onStart = () => {
  logger.verbose('Lifecycle: onStart');
  levelStore.executeForAllLevelElements('onStart');
};

const onRoundEnd = (eventManager) => {
  logger.verbose('Lifecycle: onRoundEnd');
  levelStore.executeForAllLevelElements('onRoundEnd', eventManager);
};

const onRound = () => {
  logger.verbose('Lifecycle: onRound');
  levelStore.executeForAllLevelElements('onRound');
};

module.exports = {
  onStart,
  onRoundEnd,
  onRound,
};