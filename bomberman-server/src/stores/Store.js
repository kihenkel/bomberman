class Store {
  constructor(LevelElement) {
    this.LevelElement = LevelElement;
    this.levelElements = [];
  }

  setWorldSettings(worldSettings) {
    this.worldSettings = worldSettings;
  }

  create(...args) {
    const levelElement = new this.LevelElement(this.worldSettings, ...args);
    levelElement.setStore(this);
    this.levelElements.push(levelElement);
    return levelElement;
  }

  remove(levelElement) {
    const index = this.levelElements.findIndex(element => element === levelElement);
    if (index < 0) {
      throw new Error(`Store.remove: Could not find levelElement ${levelElement} in ${this.levelElements}.`);
    }
    this.levelElements.splice(index, 1);
  }

  get(levelElement) {
    return this.levelElements.find(element => element === levelElement);
  }

  getAll() {
    return this.levelElements;
  }
}

module.exports = Store;