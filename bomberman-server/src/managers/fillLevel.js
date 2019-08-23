const LevelElements = require('./../model/LevelElements');
const Stack = require('./../model/Stack');

const bombStore = require('./../stores/bombStore');
const trapStore = require('./../stores/trapStore');

const createLevelElementInstance = (LevelElement) => {
  switch (LevelElement.key) {
    case 'BOMB': return bombStore.create();
    case 'TRAP': return trapStore.create();
    default: return new LevelElement();
  }
};

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
  const levelElement = createLevelElementInstance(LevelElement);
  return new Stack([new LevelElements.Empty(), levelElement]);
};

module.exports = (levelGrid) => {
  return levelGrid.map(row => row.map(key => getInstanceForKey(key)));
};
