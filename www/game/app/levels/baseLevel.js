class BaseLevel {
  constructor(options) {
    const { stage, lib, name } = options;
    this.stage = stage;
    this.lib = lib;
    this.name = name;
  }

  start() {
    this.level = new this.lib[this.name];
    setTimeout(() => {
      this.stage.addChild(this.level);
      setTimeout(() => {
        this.onLevelReady();
      }, 100)
    }, 100);
  }

  destroy() {
    this.stage.removeChild(this.level);
  }

  onLevelReady() {
    // implemented in level
  }
}

export default BaseLevel;