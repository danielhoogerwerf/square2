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
    //ctx.save();
    //ctx.translate(this.pX, this.pY);
    //ctx.rotate(this.pAngle);
    //ctx.fillRect(this.pWidth / -2, this.pHeight / -2, this.pWidth, this.pHeight);
    ctx.fillRect(this.pX, this.pY, this.pWidth, this.pHeight);
    //this.pAngle += (Math.PI / 180) * 1;
    //ctx.restore();
  }
}

// Catch
class Catch {
  constructor(direction, x, y) {
    this.cWidth = 25;
    this.cHeight = 25;
    this.cSpeed = 4;
    this.cDirection = direction;
    this.canvasWidth = x;
    this.canvasHeight = y;
    this.cX = this.getStartingXPos();
    this.cY = this.getStartingYPos();
  }

  drawCatch(ctx) {
    ctx.fillStyle = "green";
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
    this.genCatch = [];
    this.genEnemy = [];
    this.directionArray = ["L", "R", "T", "B"];
    this.frameCount = 0;
    this.points = 0;
    this.gameStatus = 'playgame';
  }

  startGame() {
    this.game.initializer();
    window.requestAnimationFrame(this.loopGame.bind(this));
    this.addListeners(this.player);
  }

  generateRandomDirection() {
    let randomDirection = this.directionArray[Math.floor(Math.random() * this.directionArray.length)];
    return randomDirection;
  }

  collisionDetection(x, y, w, h) {
    if (
      this.player.pX < x + w &&
      this.player.pX + this.player.pWidth > x &&
      this.player.pY < y + h &&
      this.player.pY + this.player.pHeight > y
    ) {
      return true;
    }
  }

  drawScore(ctx, amount) {
    ctx.font = "300 40px Montserrat";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(56, 56, 56, 0.30)";
    ctx.fillText("Score: " + amount, this.game.x / 2, this.game.y / 2);
  }

  addListeners() {
    document.addEventListener("mousemove", e => {
      const rect = this.game.canvas.getBoundingClientRect();
      this.player.pX = e.clientX - rect.left;
      this.player.pY = e.clientY - rect.top;
    });
  }

  beginScreen(ctx) {}

  playGame(ctx) {
    // make a counter and then kick off a new enemy and catcher - calculated with 60FPS
    switch (this.frameCount) {
      case 40:
        this.genEnemy.push(new Enemies(this.generateRandomDirection(), this.game.x, this.game.y));
        break;
      case 48:
        this.genCatch.push(new Catch(this.generateRandomDirection(), this.game.x, this.game.y));
        this.frameCount = 0;
        break;
    }
    this.frameCount++;

    // Draw the score
    this.drawScore(ctx, this.points);

    // Draw player
    this.player.drawPlayer(ctx);

    // Draw enemies and remove them if they are off-screen
    this.genEnemy.forEach((enemy, index) => {
      enemy.moveEnemy();
      enemy.drawEnemy(ctx);
      if (enemy.eX > this.game.x + 200 || enemy.eX < -200) {
        this.genEnemy.splice(index, 1);
      }
      if (enemy.eY > this.game.y + 200 || enemy.eY < -200) {
        this.genEnemy.splice(index, 1);
      }

      // Check for collision and if so, it's game over :-)
      if (this.collisionDetection(enemy.eX, enemy.eY, enemy.eWidth, enemy.eHeight)) {
        console.log("Game over!");
        this.gameStatus = 'gameover';
      }
    });

    // Draw the catcher squares and remove them if they are off-screen
    this.genCatch.forEach((catcher, index) => {
      catcher.moveCatch();
      catcher.drawCatch(ctx);
      if (catcher.cX > this.game.x + 200 || catcher.cX < -200) {
        this.genCatch.splice(index, 1);
      }
      if (catcher.cY > this.game.y + 200 || catcher.cY < -200) {
        this.genCatch.splice(index, 1);
      }

      // Check for collision and if so, remove the catcher and add a point
      if (this.collisionDetection(catcher.cX, catcher.cY, catcher.cWidth, catcher.cHeight)) {
        this.points++;
        this.genCatch.splice(index, 1);
      }
    });
  }

  endGame(ctx) {
    this.gameStatus = 'stopgame';
  }
  
  helpScreen(ctx) {}

  loopGame() {
    // Set up the canvas elements
    const ctx = this.game.context;
    ctx.clearRect(0, 0, this.game.x, this.game.y);

    switch (this.gameStatus) {
      case '':
        this.beginScreen(ctx)
        break;
      case 'playgame':
        this.playGame(ctx);
        break;
      case 'gameover':
        this.endGame(ctx);
        break;
      case 'helpscreen':
        this.helpScreen(ctx);
    }

    console.log(this.gameStatus)

    // Loop, except when it's game over
    if (this.gameStatus !== 'stopgame') {
      window.requestAnimationFrame(this.loopGame.bind(this));
    }
  }
}

// Running the game

const sqSquared = new Game();
sqSquared.startGame();
