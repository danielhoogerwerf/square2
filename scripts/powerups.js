// PowerUp
export default class PowerUps {
    constructor(direction, x, y, speed, poweruptype) {
      this.puWidth = 35;
      this.puHeight = 35;
      this.puSpeed = speed;
      this.puDirection = direction;
      this.canvasWidth = x;
      this.canvasHeight = y;
      this.powerUp = poweruptype;
      this.puX = this.getStartingXPos();
      this.puY = this.getStartingYPos();
    }
  
    drawPowerUp(ctx) {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(this.puX, this.puY, 21, (Math.PI / 180) * 0, (Math.PI / 180) * 360);
      ctx.fill();
      ctx.closePath();
    }
  
    activatePowerUp() {
      return this.powerUp;
    }
  
    getStartingXPos() {
      switch (this.puDirection) {
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
      switch (this.puDirection) {
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
  
    movePowerUp() {
      switch (this.puDirection) {
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
      this.puX += this.puSpeed;
    }
    moveHorizontalFromRight() {
      this.puX -= this.puSpeed;
    }
    moveVerticalFromTop() {
      this.puY += this.puSpeed;
    }
    moveVerticalFromBottom() {
      this.puY -= this.puSpeed;
    }
  }