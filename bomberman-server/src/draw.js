const levelManager = require('./managers/levelManager');

const settings = require('./../config/settings.json');

module.exports = () => {
  const { characterMap } = settings.level;
  const levelGrid = levelManager.getLevelGrid();
  levelGrid.forEach(row => {
    let line = '';
    row.forEach(stack => {
      const levelElement = stack.getTopElement();
      let levelElementKey = levelElement.constructor.key;

      if (levelElementKey === 'PLAYER_START') {
        levelElementKey = 'EMPTY';
      } 
      
      if (levelElementKey === 'PLAYER') {
        line += levelElement.id;
        return;
      }

      line += characterMap[levelElementKey];
    });
    console.log(line);
  });
};