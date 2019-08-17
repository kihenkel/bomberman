const LevelElements = require('./model/LevelElements');

const getInstanceForKey = (key) => {
  if (key === LevelElements.Empty.key) {
    return [new LevelElements.Empty()];
  }

  const LevelElement = LevelElements.find(levelElement => {
    return key === levelElement.key;
  });

  if (!LevelElement) {
    return [];
  }
  return [new LevelElements.Empty(), new LevelElement()];
};

module.exports = (levelGrid) => {
  return levelGrid.map(row => row.map(key => getInstanceForKey(key)));
};
