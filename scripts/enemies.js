// Enemies
export default class Enemies {
    constructor(direction, x, y, speed) {
      this.eWidth = 25;
      this.eHeight = 25;
      this.eSpeed = speed;
      this.eDirection = direction;
      this.canvasWidth = x;
      this.canvasHeight = y;
      this.eX = this.getStartingXPos();
      this.eY = this.getStartingYPos();
    }
  
    drawEnemy(ctx, transparency) {
      ctx.fillStyle = `rgba(240, 44, 39, ${transparency})`;
      ctx.fillRect(this.eX, this.eY, this.eWidth, this.eHeight);
    }
  
    getStartingXPos() {
      switch (this.eDirection) {
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
      switch (this.eDirection) {
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
  
    moveEnemy() {
      switch (this.eDirection) {
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
      this.eX += this.eSpeed;
    }
    moveHorizontalFromRight() {
      this.eX -= this.eSpeed;
    }
    moveVerticalFromTop() {
      this.eY += this.eSpeed;
    }
    moveVerticalFromBottom() {
      this.eY -= this.eSpeed;
    }
  }