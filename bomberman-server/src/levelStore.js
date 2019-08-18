const Player = require('./model/LevelElements/Player');
const loadLevel = require('./loadLevel');
const fillLevel = require('./fillLevel');

let levelGrid;

const initLevel = (levelName, levelSettings) => {
  levelGrid = loadLevel(levelName, levelSettings);
  levelGrid = fillLevel(levelGrid);
};

const getLevelGrid = () => levelGrid;

const executeForAllLevelElements = (functionName, ...args) => {
  levelGrid.forEach(row => {
    row.forEach(stack => {
      stack.forEach(levelElement => {
        levelElement[functionName](...args);
      });
    });
  });
};

const getPositionForPlayer = (playerId) => {
  let x = -1;
  const y = levelGrid.findIndex((row) => {
    x = row.findIndex(stack =>
      stack.some(levelElement => levelElement instanceof Player && levelElement.id === playerId)
    );
    return x >= 0;
  });

  return x >= 0 && y >= 0 && { x, y };
};

const getStackAt = (x, y) => {
  return levelGrid[y] && levelGrid[y][x];
};

const getStacksWithLevelElement = (LevelElement) => {
  return levelGrid.reduce((acc, row) => {
    const foundStacks = row.filter(stack => {
      return stack.some(levelElement => levelElement instanceof LevelElement);
    });

    if (foundStacks.length > 0) {
      return acc.concat(foundStacks);
    }
    return acc;
  }, []);
};

module.exports = {
  initLevel,
  getLevelGrid,
  executeForAllLevelElements,
  getPositionForPlayer,
  getStackAt,
  getStacksWithLevelElement,
};
