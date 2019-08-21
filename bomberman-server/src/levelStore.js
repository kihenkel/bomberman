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

const getPositionForLevelElement = (levelElement) => {
  let x = -1;
  const y = levelGrid.findIndex((row) => {
    x = row.findIndex(stack =>
      stack.some(element => element === levelElement)
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

const getLevelGridBoundaries = () => {
  return {
    minX: 0,
    minY: 0,
    maxX: levelGrid[0].length - 1,
    maxY: levelGrid.length - 1,
  };
};

module.exports = {
  initLevel,
  getLevelGrid,
  executeForAllLevelElements,
  getPositionForLevelElement,
  getStackAt,
  getStacksWithLevelElement,
  getLevelGridBoundaries,
};
