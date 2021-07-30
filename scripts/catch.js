export default class Catch {
  constructor(direction, x, y, speed) {
    this.cWidth = 25;
    this.cHeight = 25;
    this.cSpeed = speed;
    this.cDirection = direction;
    this.canvasWidth = x;
    this.canvasHeight = y;
    this.cX = this.getStartingXPos();
    this.cY = this.getStartingYPos();
  }

  drawCatch(ctx, transparency) {
    ctx.fillStyle = `rgba(10, 44, 39, ${transparency})`;
    ctx.fillRect(this.cX, this.cY, this.cWidth, this.cHeight);
  }

  getStartingXPos() {
    switch (this.cDirection) {
      case "L":
        return -200;
      case "R":
        return this.canvasWidth + 200;
      case "T":
        return Math.floor(Math.random() * this.canvasWidth);
      case "B":
        return Math.floor(Math.random() * this.canvasWidth);
    }
  }

  getStartingYPos() {
    switch (this.cDirection) {
      case "L":
        return Math.floor(Math.random() * this.canvasHeight);
      case "R":
        return Math.floor(Math.random() * this.canvasHeight);
      case "T":
        return -200;
      case "B":
        return this.canvasHeight + 200;
    }
  }

  moveCatch() {
    switch (this.cDirection) {
      case "L":
        this.moveHorizontalFromLeft();
        break;
      case "R":
        this.moveHorizontalFromRight();
        break;
      case "T":
        this.moveVerticalFromTop();
        break;
      case "B":
        this.moveVerticalFromBottom();
        break;
    }
  }

  moveHorizontalFromLeft() {
    this.cX += this.cSpeed;
  }
  moveHorizontalFromRight() {
    this.cX -= this.cSpeed;
  }
  moveVerticalFromTop() {
    this.cY += this.cSpeed;
  }
  moveVerticalFromBottom() {
    this.cY -= this.cSpeed;
  }
}