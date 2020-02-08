// Game initializer
class GameInit {
  constructor() {
    this.x = 900;
    this.y = 600;
    this.canvas = document.createElement("canvas");
  }

  initializer() {
    const scriptTag = document.getElementsByTagName("script")[0];
    const canvasDiv = document.createElement("div");
    // const canvas = document.createElement("canvas");
    this.canvas.style.cursor = "none";
    this.canvas.width = this.x;
    this.canvas.height = this.y;
    this.canvas.id = "new-canvas";
    canvasDiv.id = "canvas-container";
    document.body.insertBefore(canvasDiv, scriptTag);
    canvasDiv.appendChild(this.canvas);
    const context = this.canvas.getContext("2d");
    this.context = context;
  }
}

// Player
class Player {
  constructor() {
    this.pWidth = 25;
    this.pHeight = 25;
    this.pX = 450;
    this.pY = 300;
    this.pAngle = 0;
  }

  drawPlayer(ctx) {
    ctx.fillStyle = "black";
    ctx.save();
    ctx.translate(this.pX, this.pY);
    ctx.rotate(this.pAngle);
    ctx.fillRect(this.pWidth / -2, this.pHeight / -2, this.pWidth, this.pHeight);
    this.pAngle += (Math.PI / 180) * 1;
    ctx.restore();
  }
}

// Enemies
class Enemies {
  constructor(direction, x, y) {
    this.eWidth = 25;
    this.eHeight = 25;
    this.eSpeed = 4;
    this.eDirection = direction;
    this.canvasWidth = x;
    this.canvasHeight = y;
    this.eX = this.getStartingXPos();
    this.eY = this.getStartingYPos();
  }

  drawEnemy(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.eX, this.eY, this.eWidth, this.eHeight);
    // console.log(`X: ${this.eX}, Y: ${this.eY}`)
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

// Game Controller
class Game {
  constructor() {
    this.game = new GameInit();
    this.player = new Player();
    this.genEnemy = [];
    this.eDirectionArray = ["L", "R", "T", "B"];
  }

  startGame() {
    this.game.initializer();
    window.requestAnimationFrame(this.loopGame.bind(this));
    this.addListeners(this.player);
    setInterval(() => {
      this.genEnemy.push(new Enemies(this.generateEnemy(), this.game.x, this.game.y));
    }, 300);
  }

  generateEnemy() {
    let randomDirection = this.eDirectionArray[Math.floor(Math.random() * this.eDirectionArray.length)];
    return randomDirection;
  }

  loopGame() {
    const ctx = this.game.context;
    ctx.clearRect(0, 0, this.game.x, this.game.y);
    this.player.drawPlayer(ctx);

    this.genEnemy.forEach((enemy, index) => {
      enemy.moveEnemy();
      enemy.drawEnemy(ctx);
      if (enemy.eX > this.game.x + 200 || enemy.eX < -200) {
        this.genEnemy.splice(index, 1);
      }
      if (enemy.eY > this.game.y + 200 || enemy.eY < -200) {
        this.genEnemy.splice(index, 1);
      }
    });
    window.requestAnimationFrame(this.loopGame.bind(this));
  }

  addListeners() {
    document.addEventListener("mousemove", e => {
      let rect = this.game.canvas.getBoundingClientRect();
      this.player.pX = e.clientX - rect.left;
      this.player.pY = e.clientY - rect.top;
    });
  }
}

// Running the game

const sqSquared = new Game();
sqSquared.startGame();
