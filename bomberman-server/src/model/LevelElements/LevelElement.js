class LevelElement {
  onStart() {}
  onRoundEnd(eventManager) {}
  onRound() {}
  onPlayerEnter(player) {}
  onHitByFire() {}

  setStack(stack) { this.stack = stack; }
  getStack() { return this.stack; }
  setStore(store) { this.store = store; }
  getStore() { return this.store; }
}

module.exports = LevelElement;