const Fire = require('./model/LevelElements/Fire');
const levelStore = require('./levelStore');
const bombStore = require('./bombStore');

const addFireRadius = (base, offset, radius, baseOther, isX, boundaries) => {
  let stopFire = false;
  for (let pos = base + offset; (offset < 0 && pos >= base - radius) || (offset > 0 && pos <= base + radius); pos = pos + offset) {
    if (!stopFire) {
      const stack = isX ? levelStore.getStackAt(pos, baseOther) : levelStore.getStackAt(baseOther, pos);
      stopFire = stack.some(levelElement => !levelElement.isBreakable && !levelElement.isWalkable);
      if (!stopFire && 
        ((isX && pos >= boundaries.minX && pos <= boundaries.maxX) || 
        (!isX && pos >= boundaries.minY && pos <= boundaries.maxY))
      ) {
        stack.addLevelElement(new Fire());
        stopFire = stack.some(levelElement => levelElement.isBreakable && !levelElement.isWalkable);
      }
    }
  }
};

const onBombExplode = (bomb) => {
  const bombPosition = levelStore.getPositionForLevelElement(bomb);
  if (!bombPosition) {
    throw new Error(`Could not find position for bomb ${bomb.getRadius()}.`)
  }

  levelStore.getStackAt(bombPosition.x, bombPosition.y).addLevelElement(new Fire());

  const bombRadius = bomb.getRadius();
  const boundaries = levelStore.getLevelGridBoundaries();

  
  addFireRadius(bombPosition.y, -1, bombRadius, bombPosition.x, false, boundaries); // TOP
  addFireRadius(bombPosition.y, 1, bombRadius, bombPosition.x, false, boundaries); // BOTTOM
  addFireRadius(bombPosition.x, -1, bombRadius, bombPosition.y, true, boundaries); // LEFT
  addFireRadius(bombPosition.x, 1, bombRadius, bombPosition.y, true, boundaries); // RIGHT
  
  bomb.getStack().deleteLevelElement(bomb);
  bombStore.removeBomb(bomb);
};

module.exports = {
  onBombExplode,
};
