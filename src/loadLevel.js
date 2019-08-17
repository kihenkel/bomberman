const path = require('path');
const fs = require('fs');
const levelFolderPath = path.join(__dirname, '..', 'levels');

const hasMapFileExtension = (fileName) => typeof fileName === 'string' && fileName.endsWith('.map');

module.exports = (levelName, levelSettings) => {

};