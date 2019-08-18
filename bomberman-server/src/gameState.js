let round = 0;

const setNextRound = () => {
  round =+ 1;
};

module.exports = {
  setNextRound,
  getCurrentRound: () => round,
};
