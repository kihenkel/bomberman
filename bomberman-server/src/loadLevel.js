const path = require('path');
const fs = require('fs');
const logger = require('./utils/logger');
const levelFolderPath = path.join(__dirname, '..', 'levels');

const hasMapFileExtension = (fileName) => typeof fileName === 'string' && fileName.endsWith('.map');

const getFilePath = (fileName) => {
  if (hasMapFileExtension(fileName)) {
    return path.join(levelFolderPath, fileName);
  }
  return path.join(levelFolderPath, `${fileName}.map`);
};

const getLevelElementKeyForCharacter = (character, characterMap) => {
  const match = characterMap.find(([key, value]) => {
    return value.includes(character);
  });
  return match && match[0];
};

module.exports = (levelName, levelSettings) => {
  logger.info('Starting level', levelName, '...');
  const filePath = getFilePath(levelName);
  const fileContent = fs.readFileSync(filePath).toString();
  const fileContentByLine = fileContent.split(/\r\n|\n|\r/);

  const characterMap = Object.entries(levelSettings.characterMap);
  const grid = fileContentByLine.map(line =>
    line.split('').map(character => 
      getLevelElementKeyForCharacter(character, characterMap)
    )
  );
  return grid;
};