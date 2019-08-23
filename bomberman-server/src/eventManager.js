const Fire = require('./model/LevelElements/Fire');
const levelManager = require('./managers/levelManager');

const addFireRadius = (base, offset, radius, baseOther, isX, boundaries) => {
  let stopFire = false;
  for (let pos = base + offset; (offset < 0 && pos >= base - radius) || (offset > 0 && pos <= base + radius); pos = pos + offset) {
    if (!stopFire) {
      const stack = isX ? levelManager.getStackAt(pos, baseOther) : levelManager.getStackAt(baseOther, pos);
      stopFire = stack.some(levelElement => !levelElement.isBreakable && !levelElement.isWalkable);
      if (!stopFire && 
        ((isX && pos >= boundaries.minX && pos <= boundaries.maxX) || 
        (!isX && pos >= boundaries.minY && pos <= boundaries.maxY))
      ) {
        if (!stack.includesLevelElement(Fire)) {
          stack.addLevelElement(new Fire());
        }
        stopFire = stack.some(levelElement => levelElement.isBreakable && !levelElement.isWalkable);
      }
    }
  }
};

const onLevelElementDestroyed = (levelElement) => {
  levelElement.getStack().deleteLevelElement(levelElement);
  const store = levelElement.getStore();
  if (store) {
    store.remove(levelElement);
  }
};

const onExplode = (explosive) => {
  const explosivePosition = levelManager.getPositionForLevelElement(explosive);
  if (!explosivePosition) {
    throw new Error(`Could not find position for explosive ${explosive.getRadius()}.`)
  }

  levelManager.getStackAt(explosivePosition.x, explosivePosition.y).addLevelElement(new Fire());

  const explosiveRadius = explosive.getRadius();
  const boundaries = levelManager.getLevelGridBoundaries();
  
  addFireRadius(explosivePosition.y, -1, explosiveRadius, explosivePosition.x, false, boundaries); // TOP
  addFireRadius(explosivePosition.y, 1, explosiveRadius, explosivePosition.x, false, boundaries); // BOTTOM
  addFireRadius(explosivePosition.x, -1, explosiveRadius, explosivePosition.y, true, boundaries); // LEFT
  addFireRadius(explosivePosition.x, 1, explosiveRadius, explosivePosition.y, true, boundaries); // RIGHT

  onLevelElementDestroyed(explosive);
};

module.exports = {
  onLevelElementDestroyed,
  onExplode,
};
