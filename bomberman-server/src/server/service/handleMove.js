const Move = require('./../../model/Move');
const gameState = require('./../../gameState');

let playerInputHandler = () => { throw new Error('PlayerInputHandler not registered!'); };

module.exports = {
  handler: async (params, body, query) => {
    const moves = Object.keys(Move);

    const playerId = parseInt(params.playerId, 10);
    if (isNaN(playerId)) {
      throw new Error('Param playerId is not valid');
    }
    if (!gameState.isPlayerIdActive(playerId)) {
      throw new Error(`PlayerId ${playerId} is not active or does not exist`);
    }
    if (!params.moveInput) {
      throw new Error('Param moveInput does not exist');
    } 
    if (!moves.includes(params.moveInput)) {
      throw new Error(`Could not recognize move input ${params.moveInput}`);
    }

    playerInputHandler(playerId, params.moveInput);
  
  },
  registerPlayerInputHandler: (handler) => {
    playerInputHandler = handler;
  },
}; 
