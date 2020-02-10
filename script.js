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
    // ctx.save();
    // ctx.translate(this.pX, this.pY);
    //ctx.rotate(this.pAngle);
    //ctx.fillRect(this.pWidth / -2, this.pHeight / -2, this.pWidth, this.pHeight);
    ctx.fillRect(this.pX, this.pY, this.pWidth, this.pHeight);
    //this.pAngle += (Math.PI / 180) * 1;
    // ctx.restore();
  }

  increaseSize() {
    this.pWidth += 1;
    this.pHeight += 1;
    this.pX -= 0.5;
    this.pY -= 0.5;
  }
}

// Catch
class Catch {
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

// Enemies
class Enemies {
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

// Game Controller
class Game {
  constructor() {
    this.game = new GameInit();
    this.player = new Player();
    this.directionArray = ["L", "R", "T", "B"];
  }

  startGame() {
    this.game.initializer();
    this.clearVars("beginscreen");
    window.requestAnimationFrame(this.loopGame.bind(this));
    this.addListeners(this.player);
  }

  clearVars(status) {
    this.genCatch = [];
    this.genEnemy = [];
    this.frameCount = 0;
    this.points = 0;
    this.gameStatus = status;
  }

  generateRandomDirection() {
    const randomDirection = this.directionArray[Math.floor(Math.random() * this.directionArray.length)];
    return randomDirection;
  }

  generateRandomSpeed() {
    const randomSpeed = Math.floor(Math.random() * (12 - 4) + 4);
    return randomSpeed;
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

  beginScreen(ctx) {
    this.game.canvas.style.cursor = "default";
    switch (this.frameCount) {
      case 40:
        this.genEnemy.push(
          new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed())
        );
        break;
      case 48:
        this.genCatch.push(
          new Catch(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed())
        );
        this.frameCount = 0;
        break;
    }
    this.frameCount++;

    // Draw enemies and remove them if they are off-screen
    this.genEnemy.forEach((enemy, index) => {
      enemy.moveEnemy();
      enemy.drawEnemy(ctx, 0.2);
      if (enemy.eX > this.game.x + 200 || enemy.eX < -200) {
        this.genEnemy.splice(index, 1);
      }
      if (enemy.eY > this.game.y + 200 || enemy.eY < -200) {
        this.genEnemy.splice(index, 1);
      }
    });

    // Draw the catcher squares and remove them if they are off-screen
    this.genCatch.forEach((catcher, index) => {
      catcher.moveCatch();
      catcher.drawCatch(ctx, 0.2);
      if (catcher.cX > this.game.x + 200 || catcher.cX < -200) {
        this.genCatch.splice(index, 1);
      }
      if (catcher.cY > this.game.y + 200 || catcher.cY < -200) {
        this.genCatch.splice(index, 1);
      }
    });

    // needed to address scoping issues inside the img.onload function
    let parent = this;
    const img = new Image();
    img.onload = function() {

      // Clear the screen
      ctx.clearRect(0, 0, parent.game.x, parent.game.y);
      ctx.drawImage(img, (parent.game.x - this.width) / 2, (parent.game.y - this.height) / 2 - 100);
    };
    img.src = "img/logosmall.png";
    ctx.fillStyle = "black";

    function menuButtons(context) {
      context.beginPath();
      context.font = "40pt Montserrat";
      context.fillStyle = "#000000";
      context.fillText("PLAY", (parent.game.x - img.width) / 2 + 4, (parent.game.y - img.height) / 2 + 230);
      context.fillText("RULES", (parent.game.x - img.width) / 2 + 268, (parent.game.y - img.height) / 2 + 230);
    }
    menuButtons(ctx);

    //The rectangle provides the click area for the buttons
    const buttonRect = {
      pX: (parent.game.x - img.width) / 2 + 4,
      pY: (parent.game.y - img.height) / 2 + 190,
      rX: (parent.game.x - img.width) / 2 + 268,
      rY: (parent.game.y - img.height) / 2 + 190,
      width: 140,
      height: 50
    };

    // Listen for mouse clicks
    const mouseClicks = e => {
      let mouseX;
      let mouseY;
      const rect = this.game.canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Check click for PLAY
      if (
        mouseX > buttonRect.pX &&
        mouseX < buttonRect.pX + buttonRect.width &&
        mouseY < buttonRect.pY + buttonRect.height &&
        mouseY > buttonRect.pY
      ) {
        this.clearVars("playgame");
        this.game.canvas.removeEventListener("click", mouseClicks, false);
      }

      // Check click for RULES
      if (
        mouseX > buttonRect.rX &&
        mouseX < buttonRect.rX + buttonRect.width &&
        mouseY < buttonRect.rY + buttonRect.height &&
        mouseY > buttonRect.rY
      ) {
        console.log("clicked inside rect");
        this.game.canvas.removeEventListener("click", mouseClicks, false);
      }
    };

    this.game.canvas.addEventListener("click", mouseClicks, false);
  }

  playGame(ctx) {
    // Clear the screen
    ctx.clearRect(0, 0, this.game.x, this.game.y);

    // make a counter and then kick off a new enemy and catcher - calculated with 60FPS
    switch (this.frameCount) {
      case 40:
        this.genEnemy.push(
          new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed())
        );
        break;
      case 48:
        this.genCatch.push(
          new Catch(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed())
        );
        this.frameCount = 0;
        break;
    }
    this.frameCount++;

    // Draw the score
    this.drawScore(ctx, this.points);

    // Draw player
    this.player.drawPlayer(ctx);
    this.game.canvas.style.cursor = "none";

    // Draw enemies and remove them if they are off-screen
    this.genEnemy.forEach((enemy, index) => {
      enemy.moveEnemy();
      enemy.drawEnemy(ctx, 1);
      if (enemy.eX > this.game.x + 200 || enemy.eX < -200) {
        this.genEnemy.splice(index, 1);
      }
      if (enemy.eY > this.game.y + 200 || enemy.eY < -200) {
        this.genEnemy.splice(index, 1);
      }

      // Check for collision and if so, it's game over :-)
      if (this.collisionDetection(enemy.eX, enemy.eY, enemy.eWidth, enemy.eHeight)) {
        this.gameStatus = "gameover";
      }
    });

    // Draw the catcher squares and remove them if they are off-screen
    this.genCatch.forEach((catcher, index) => {
      catcher.moveCatch();
      catcher.drawCatch(ctx, 1);
      if (catcher.cX > this.game.x + 200 || catcher.cX < -200) {
        this.genCatch.splice(index, 1);
      }
      if (catcher.cY > this.game.y + 200 || catcher.cY < -200) {
        this.genCatch.splice(index, 1);
      }

      // Check for collision and if so, remove the catcher and add a point
      if (this.collisionDetection(catcher.cX, catcher.cY, catcher.cWidth, catcher.cHeight)) {
        this.points++;
        this.player.increaseSize();
        this.genCatch.splice(index, 1);
      }
    });
  }

  endGame(ctx) {
    ctx.clearRect(0, 0, this.game.x, this.game.y);
    ctx.font = "80pt Montserrat";
    ctx.fillText("Game Over!", this.game.x / 2, this.game.y / 2);
    this.gameStatus = "stopgame";
  }

  helpScreen(ctx) {}

  loopGame() {
    // Set up the canvas elements
    const ctx = this.game.context;
    // ctx.clearRect(0, 0, this.game.x, this.game.y);
    // disabled because it's moved.

    switch (this.gameStatus) {
      case "beginscreen":
        this.beginScreen(ctx);
        break;
      case "playgame":
        this.playGame(ctx);
        break;
      case "gameover":
        this.endGame(ctx);
        break;
      case "helpscreen":
        this.helpScreen(ctx);
    }

    // Loop, except when it's game over
    if (this.gameStatus !== "stopgame") {
      window.requestAnimationFrame(this.loopGame.bind(this));
    }
  }
}

// Running the game

const sqSquared = new Game();
sqSquared.startGame();
