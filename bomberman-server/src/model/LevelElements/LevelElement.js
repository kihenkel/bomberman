class LevelElement {
  onStart() {}
  onRoundEnd(eventManager) {}
  onRound() {}
  onPlayerEnter(player) {}
  onHitByFire() {}

  setStack(stack) {
    this.stack = stack;
  }

  getStack() {
    return this.stack;
  }
}

module.exports = LevelElement;