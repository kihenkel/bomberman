const playerStore = require('./../stores/playerStore');
const bombStore = require('./../stores/bombStore');
const trapStore = require('./../stores/trapStore');

const initStores = (worldSettings) => {
  playerStore.setWorldSettings(worldSettings);
  bombStore.setWorldSettings(worldSettings);
  trapStore.setWorldSettings(worldSettings);
};

module.exports = {
  initStores,
};
