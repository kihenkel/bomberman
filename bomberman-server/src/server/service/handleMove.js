let playerInputHandler = () => { throw new Error('PlayerInputHandler not registered!'); };

module.exports = {
  handler: async (params, body, query) => {
    const playerId = parseInt(params.playerId, 10);
    if (isNaN(playerId)) {
      throw new Error('Param playerId is not valid');
    }
    if (!params.moveInput) {
      throw new Error('Param moveInput does not exist');
    } 

    return playerInputHandler(playerId, params.moveInput);
  },
  registerPlayerInputHandler: (handler) => {
    playerInputHandler = handler;
  },
}; 
