const logger = require('./utils/logger');
const levelManager = require('./managers/levelManager');

const lifecycles = [
  'onStart',
  'onRoundEnd',
  'onRound',
];

const onLifecycle = (lifecycleName) => (...args) => {
  logger.verbose('Lifecycle:', lifecycleName);
  levelManager.executeForAllLevelElements(lifecycleName, ...args);
};

const moduleExport = {};
lifecycles.forEach(lifecycleName => {
  moduleExport[lifecycleName] = onLifecycle(lifecycleName);
});

module.exports = moduleExport;