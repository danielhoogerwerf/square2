// Player
export default class Player {
    constructor() {
      this.pWidth = 25;
      this.pHeight = 25;
      this.pX = 450;
      this.pY = 300;
      this.pAngle = 0;
      this.fillStyle = "black";
    }
  
    drawPlayer(ctx) {
      ctx.fillStyle = this.fillStyle;
      ctx.fillRect(this.pX, this.pY, this.pWidth, this.pHeight);
    }
  
    increaseSize() {
      this.pWidth += 1;
      this.pHeight += 1;
      this.pX -= 0.5;
      this.pY -= 0.5;
    }
  
    decreaseSize() {
      this.pWidth > 25 ? ((this.pWidth -= 0.25), (this.pHeight -= 0.25), (this.pX += 0.125), (this.pY += 0.125)) : false;
    }
  
    playerTranslucentColor() {
      this.fillStyle = "rgba(132, 132, 132, 1.0)";
    }
  
    playerNormalColor() {
      this.fillStyle = "black";
    }
  }