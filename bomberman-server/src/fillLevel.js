const LevelElements = require('./model/LevelElements');
const Stack = require('./model/Stack');

const getInstanceForKey = (key) => {
  if (key === LevelElements.Empty.key) {
    return new Stack(new LevelElements.Empty());
  }

  const LevelElement = LevelElements.find(levelElement => {
    return key === levelElement.key;
  });

  if (!LevelElement) {
    return new Stack();
  }
  return new Stack([new LevelElements.Empty(), new LevelElement()]);
};

module.exports = (levelGrid) => {
  return levelGrid.map(row => row.map(key => getInstanceForKey(key)));
};
