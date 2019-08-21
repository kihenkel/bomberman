const arrayFunctions = ['concat', 'forEach', 'every', 'some'];

class Stack {
  constructor(elements) {
    this.elements = [];
    if (!Array.isArray(elements)) {
      this.addLevelElement(elements)
    } else {
      elements.forEach(element => this.addLevelElement(element));
    }

    arrayFunctions.forEach(functionName => {
      this[functionName] = (callback) => this.elements[functionName](callback);
    });
  }

  getTopElement() {
    return this.elements[this.elements.length - 1];
  }

  getBottomElement() {
    return this.elements[0];
  }

  addLevelElement(levelElement) {
    levelElement.setStack(this);
    return this.elements.push(levelElement);
  }

  deleteLevelElement(levelElement) {
    const index = this.elements.findIndex(element => element === levelElement);
    if (index < 0) {
      throw new Error(`Stack.deleteLevelElement: Could not find element ${levelElement} in ${this.elements}.`);
    }
    this.elements.splice(index, 1);
  }
}

module.exports = Stack;