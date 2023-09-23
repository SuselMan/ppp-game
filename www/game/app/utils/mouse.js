class Mouse {
  static get x() {
    return stage.mouseX / stage.scaleX;
  }

  static get y() {
    return stage.mouseY / stage.scaleY;
  }
}

export default Mouse;