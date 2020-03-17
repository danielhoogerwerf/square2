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

// Initialize and play the game sounds
class Sounds {
  constructor() {
    this.audioCth = new Audio("snd/Catch.m4a");
    this.audioGO = new Audio("snd/Gameover.m4a");
    this.audioWO = new Audio("snd/WatchOut.m4a");
    this.audioPU = new Audio("snd/PowerUp.m4a");
    this.bgMusicBegin = new Audio("snd/BGMusicBegin.m4a");
    this.bgMusicPlay = new Audio("snd/BGMusicPlay.m4a");
    this.bgMusicGO = new Audio("snd/BGMusicGO.m4a");
  }

  audioFilterBegin() {
    // Create a 'Lowpass' filter for the music in the begin screen.
    const contxt = new AudioContext();
    const contxtBgBegin = contxt.createMediaElementSource(this.bgMusicBegin);
    const filter = contxt.createBiquadFilter();
    contxtBgBegin.connect(filter);
    filter.connect(contxt.destination);
    filter.type = "lowpass";
    filter.frequency.value = 280;
    filter.gain.value = 30;
  }

  playMusicBegin() {
    this.bgMusicGO.pause();
    this.bgMusicBegin.currentTime = 0;
    this.bgMusicBegin.volume = 0.75;
    this.bgMusicBegin.loop = true;

    // This is necessary for a more seamless loop.
    this.bgMusicBegin.addEventListener(
      "timeupdate",
      function() {
        const buffer = 0.22;
        if (this.currentTime > this.duration - buffer) {
          this.currentTime = 0;
          this.play();
        }
      },
      false
    );
    this.bgMusicBegin.play();
  }

  playMusicGame() {
    this.bgMusicBegin.pause();
    this.bgMusicGO.pause();
    this.bgMusicPlay.currentTime = 0;
    this.bgMusicPlay.volume = 0.7;
    this.bgMusicPlay.loop = true;

    // This is necessary for a more seamless loop.
    this.bgMusicPlay.addEventListener(
      "timeupdate",
      function() {
        const buffer = 0.22;
        if (this.currentTime > this.duration - buffer) {
          this.currentTime = 0;
          this.play();
        }
      },
      false
    );
    this.bgMusicPlay.play();
  }

  playMusicGameOver() {
    this.audioWO.pause();
    this.audioPU.pause();
    this.bgMusicPlay.pause();
    this.bgMusicGO.currentTime = 0;
    this.bgMusicGO.volume = 0.7;
    this.bgMusicGO.loop = true;

    // This is necessary for a more seamless loop.
    this.bgMusicGO.addEventListener(
      "timeupdate",
      function() {
        const buffer = 0.22;
        if (this.currentTime > this.duration - buffer) {
          this.currentTime = 0;
          this.play();
        }
      },
      false
    );
    this.bgMusicGO.play();
  }

  playCatchSound() {
    this.audioCth.currentTime = 0;
    this.audioCth.volume = 0.8;
    this.audioCth.play();
  }

  playGameOverSound() {
    this.audioGO.currentTime = 0;
    this.audioGO.volume = 0.8;
    this.audioGO.play();
  }

  playPowerUpSound(powerup) {
    // If powerup is evil, play 'Watch Out' sound, otherwise the normal PowerUp sound
    switch (powerup) {
      case "evil":
        this.audioWO.currentTime = 0;
        this.audioWO.volume = 0.8;
        this.audioWO.play();
        break;
      default:
        this.audioPU.currentTime = 0;
        this.audioPU.volume = 0.8;
        this.audioPU.play();
    }
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

// PowerUp
class PowerUps {
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

// Game Controller
class Game {
  constructor() {
    // Initialize objects
    this.game = new GameInit();
    this.player = new Player();
    this.sounds = new Sounds();

    // Define directions for the objects and powerup types
    this.directionArray = ["L", "R", "T", "B"];
    this.powerUpType = ["resetplayer", "invincibility", "evil", "points"];

    // Reset the first points, status and square rotating angle (for the gameover screen)
    this.points = 0;
    this.powerUpStatus = "";
    this.pAngle = 0;
  }

  loadingGame() {
    // Preloader. Necessary for the correct workings of the music and just handy to have :-)
    this.game.initializer();
    const ctx = this.game.context;

    // Clear the screen
    ctx.clearRect(0, 0, this.game.x, this.game.y);

    // Draw 'loading' text
    ctx.font = "300 36px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Loading...", this.game.x / 2, this.game.y / 2);
    this.gameStatus = "preload";

    // Check if everything is loaded and if so, start the listeners and create a button to start the game
    window.addEventListener("load", event => {
      this.addMousemoveListener(this.player);
      this.addClickListener();

      // Clear the screen and draw the loaded text
      ctx.clearRect(0, 0, this.game.x, this.game.y);
      ctx.font = "300 36px Arial";
      ctx.fillText("Game is loaded. Press PLAY GAME to start.", this.game.x / 2, this.game.y / 2);
      ctx.font = "700 40px Arial";
      ctx.fillText("PLAY GAME", this.game.x / 2, this.game.y / 1.5);
      ctx.font = "300 14px Arial";
      ctx.textAlign = "right"
      ctx.fillStyle = "rgba(56, 56, 56, 0.50)";
      ctx.fillText("Square2 v1.2, made by Daniel Hoogerwerf", this.game.x / 1.02, this.game.y / 1.02);
      ctx.textAlign = "left";
    });
  }

  startGame() {
    // Start the game and initialize the game variables and start the music
    this.clearVars("beginscreen");
    window.requestAnimationFrame(this.loopGame.bind(this));
    this.sounds.audioFilterBegin();
    this.sounds.playMusicBegin();
  }

  clearVars(status) {
    // Reset the status of the game
    this.genCatch = [];
    this.genEnemy = [];
    this.genPowerUp = [];
    this.frameCount = 0;
    this.powerUpRandom = Math.floor(Math.random() * (480 - 300 + 1) + 300);
    this.powerUpCounter = 0;
    this.speedCounter = 0;
    this.points = 0;
    this.pointsSet = false;
    this.squarePoints = 0;
    this.powerUpProgressBar = 301;
    this.player.pWidth = 25;
    this.player.pHeight = 25;
    this.powerUpStatus = "";
    this.gameStatus = status;
  }

  generateRandomDirection() {
    const randomDirection = this.directionArray[Math.floor(Math.random() * this.directionArray.length)];
    return randomDirection;
  }

  generateRandomSpeed(multi) {
    const randomSpeed = Math.floor(Math.random() * (10 - 4) + 4);
    return multi > 0 ? randomSpeed + multi : randomSpeed;
  }

  generateRandomPowerUp() {
    return this.powerUpType[Math.floor(Math.random() * this.powerUpType.length)];
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

  setPowerUp(ctx, ptype) {
    // Set the powerup type based on the return value of activatePowerUp() method
    // and this.powerUpStatus
    switch (ptype) {
      case "resetplayer":
        this.player.decreaseSize();
        this.speedCounter = 0;
        ctx.fillStyle = "black";
        ctx.fillText("Reducing your square!", this.game.x / 2, this.game.y / 3);
        break;
      case "invincibility":
        this.powerUpStatus = "invincibility";
        this.player.playerTranslucentColor();
        ctx.fillStyle = "rgba(56, 56, 56, 0.30)";
        this.powerUpProgressBar--;
        ctx.fillRect(this.game.x / 2.6, this.game.y / 2.7, this.powerUpProgressBar, 20);
        ctx.fillStyle = "black";
        ctx.fillText("Invincibility!", this.game.x / 2, this.game.y / 3);
        break;
      case "points":
        ctx.fillStyle = "black";
        ctx.fillText("100 Points!", this.game.x / 2, this.game.y / 3);
        if (this.pointsSet === false) {
          this.points += 100;
          this.pointsSet = true;
        }
        break;
      case "evil":
        this.powerUpStatus = "evil";
        ctx.fillStyle = "rgba(240, 44, 39, 1.0";
        ctx.fillText("Watch Out!", this.game.x / 2, this.game.y / 3);
        this.genCatch.forEach(e => {
          this.genEnemy.push(
            new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0)),
            new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0))
          );
        });
        this.genCatch = [];
        ctx.fillStyle = "black";
        break;
    }
  }

  addMousemoveListener() {
    // Listen for mouse movement and adjust the Player square position
    document.addEventListener("mousemove", e => {
      const rect = this.game.canvas.getBoundingClientRect();
      this.player.pX = e.clientX - rect.left;
      this.player.pY = e.clientY - rect.top;
    });
  }

  addClickListener() {
    // Needs the bind otherwise it listens to the window object.
    // Listens for mouse clicks to activate the button system
    document.addEventListener("click", this.listenerDefinitions.bind(this));
  }

  listenerDefinitions(e) {
    // Connected to addClickListener()
    const gameState = this.gameStatus;
    let mouseX;
    let mouseY;
    const rect = this.game.canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // Define the clickable areas for the game sections
    const preloadButton = {
      pX: this.game.x / 2.7,
      pY: this.game.y / 1.7 + 20,
      width: 235,
      height: 35
    };

    const beginScreenButtons = {
      pX: this.game.x / 3 - 80,
      pY: this.game.y / 2.5 + 140,
      rX: this.game.x / 3 + 190,
      rY: this.game.y / 2.5 + 140,
      width: 180,
      height: 45
    };

    const rulesScreenButton = {
      pX: this.game.x / 2.8,
      pY: this.game.y / 1.15 - 35,
      width: 250,
      height: 60
    };

    const gameOverButton = {
      pX: this.game.x / 4,
      pY: this.game.y / 1.4,
      rX: this.game.x / 1.4,
      rY: this.game.y / 1.12,
      width: 420,
      height: 60
    };

    switch (gameState) {
      case "preload":
        // The click area for the button START GAME on the rules screen
        if (
          mouseX > preloadButton.pX &&
          mouseX < preloadButton.pX + preloadButton.width &&
          mouseY < preloadButton.pY + preloadButton.height &&
          mouseY > preloadButton.pY
        ) {
          this.startGame();
        }
        break;
      case "beginscreen":
        // The click area for the buttons PLAY & RULES on the begin screen
        if (
          mouseX > beginScreenButtons.pX &&
          mouseX < beginScreenButtons.pX + beginScreenButtons.width &&
          mouseY < beginScreenButtons.pY + beginScreenButtons.height &&
          mouseY > beginScreenButtons.pY
        ) {
          this.clearVars("playgame");
          this.sounds.playMusicGame();
        } else if (
          mouseX > beginScreenButtons.rX &&
          mouseX < beginScreenButtons.rX + beginScreenButtons.width &&
          mouseY < beginScreenButtons.rY + beginScreenButtons.height &&
          mouseY > beginScreenButtons.rY
        ) {
          this.gameStatus = "rulesscreen";
        }
        break;
      case "rulesscreen":
        // The click area for the button RETURN on the rules screen
        if (
          mouseX > rulesScreenButton.pX &&
          mouseX < rulesScreenButton.pX + rulesScreenButton.width &&
          mouseY < rulesScreenButton.pY + rulesScreenButton.height &&
          mouseY > rulesScreenButton.pY
        ) {
          this.gameStatus = "beginscreen";
        }
        break;
      case "gameover":
        // The click area for the button RETURN TO MENU on the game over screen
        if (
          mouseX > gameOverButton.pX &&
          mouseX < gameOverButton.pX + gameOverButton.width &&
          mouseY < gameOverButton.pY + gameOverButton.height &&
          mouseY > gameOverButton.pY
        ) {
          this.clearVars("playgame");
          this.sounds.playMusicGame();
        } else if (
          mouseX > gameOverButton.rX &&
          mouseX < gameOverButton.rX + gameOverButton.width &&
          mouseY < gameOverButton.rY + gameOverButton.height &&
          mouseY > gameOverButton.rY
        ) {
          this.clearVars("beginscreen");
          this.sounds.playMusicBegin();
        }
        break;
    }
  }

  beginScreen(ctx) {
    // Needed for scoping
    const parent = this;

    // Reset the mouse cursor to normal
    this.game.canvas.style.cursor = "default";

    // Create background squares
    switch (this.frameCount) {
      case 40:
        this.genEnemy.push(
          new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0))
        );
        break;
      case 48:
        this.genCatch.push(
          new Catch(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0))
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

    const img = new Image();
    img.onload = function() {
      // Clear the screen
      ctx.clearRect(0, 0, parent.game.x, parent.game.y);
      ctx.drawImage(img, (parent.game.x - 456) / 2, (parent.game.y - 450) / 2);

      // Draw menu buttons
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.font = "40pt Montserrat";
      ctx.fillStyle = "rgba(10, 44, 39, 1)";
      ctx.fillText("PLAY", (parent.game.x - 456) / 2 + 4, (parent.game.y - 250) / 2 + 230);
      ctx.fillStyle = "rgba(10, 44, 39, 1)";
      ctx.fillText("RULES", (parent.game.x - 456) / 2 + 268, (parent.game.y - 250) / 2 + 230);
    };
    img.src = "img/logosmall.png";
    ctx.fillStyle = "black";
  }

  rulesScreen(ctx) {
    // Create background squares
    switch (this.frameCount) {
      case 40:
        this.genEnemy.push(
          new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0))
        );
        break;
      case 48:
        this.genCatch.push(
          new Catch(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0))
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
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 15, 15, this.width / 2, this.height / 2);
    };
    img.src = "img/logosmall.png";
    ctx.fillStyle = "black";

    // Place 'How to play' text and draw vertical line
    ctx.textAlign = "left";
    ctx.fillStyle = "black";
    ctx.font = "700 14pt Montserrat";
    ctx.fillText("How to play", 20, 185);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(60, 211);
    ctx.lineTo(60, 428);
    ctx.strokeStyle = "rgba(216, 44, 40, 0.7)";
    ctx.stroke();
    ctx.closePath();

    // Draw Catch rectangle
    ctx.fillStyle = "rgba(10, 44, 39, 1)";
    ctx.fillRect(20, 212, 25, 25);

    // Draw Enemy rectangle
    ctx.fillStyle = "rgba(240, 44, 39, 1)";
    ctx.fillRect(20, 262, 25, 25);

    // Draw PowerUp
    ctx.beginPath();
    ctx.arc(32, 325, 13, (Math.PI / 180) * 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    // Place rules text
    ctx.fillStyle = "black";
    ctx.font = "14pt Montserrat";

    ctx.fillText("Catching this square gives you points, but it increases the size of your square.", 70, 226);
    ctx.fillText("Touching this square means 'game over'.", 70, 276);
    ctx.fillText("Hitting this powerup can give you one of the following options:", 70, 326);
    ctx.fillText("- Resets your square size and reduces the speed back to normal", 70, 351);
    ctx.fillText("- Gives your square invincibility for a few seconds", 70, 375);
    ctx.fillText("- Adds 100 points to your total", 70, 399);
    ctx.fillText("- Causes that all the squares change to red for a few seconds (the evil powerup 😈)", 70, 423);

    // Place RETURN text
    ctx.font = "40pt Montserrat";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText("RETURN", this.game.x / 2, this.game.y / 1.15);
  }

  playGame(ctx) {
    // Clear the screen
    ctx.clearRect(0, 0, this.game.x, this.game.y);

    // make a counter and then kick off a new enemy and catcher at fixed intervals - calculated with roughly 60FPS
    switch (this.frameCount) {
      case 20:
        if (this.powerUpStatus === "evil") {
          this.genEnemy.push(
            new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0)),
            new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0))
          );
        }
        break;
      case 30:
        if (this.speedCounter > 5 || this.points >= 500) {
          this.genEnemy.push(
            new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0))
          );
        }
        break;
      case 35:
        if (this.powerUpStatus !== "evil" && this.speedCounter > 10) {
          this.genCatch.push(
            new Catch(
              this.generateRandomDirection(),
              this.game.x,
              this.game.y,
              this.generateRandomSpeed(this.speedCounter)
            ),
            new Catch(
              this.generateRandomDirection(),
              this.game.x,
              this.game.y,
              this.generateRandomSpeed(this.speedCounter)
            )
          );
        }
      case 40:
        this.genEnemy.push(
          new Enemies(
            this.generateRandomDirection(),
            this.game.x,
            this.game.y,
            this.generateRandomSpeed(this.speedCounter)
          )
        );
        break;
      case 48:
        if (this.powerUpStatus !== "evil") {
          this.genCatch.push(
            new Catch(
              this.generateRandomDirection(),
              this.game.x,
              this.game.y,
              this.generateRandomSpeed(this.speedCounter)
            ),
            new Catch(
              this.generateRandomDirection(),
              this.game.x,
              this.game.y,
              this.generateRandomSpeed(this.speedCounter)
            )
          );
        }
        this.frameCount = 0;
        this.points++;
        break;
      case 50:
        if (this.speedCounter > 10 || this.points >= 800) {
          this.genEnemy.push(
            new Enemies(this.generateRandomDirection(), this.game.x, this.game.y, this.generateRandomSpeed(0))
          );
        }
        break;
    }
    this.frameCount++;

    // Use this variable to make it more complicated later in the game
    this.speedCounter += 0.001;

    // Perform a count of frames and kick-off a PowerUp at random intervals in frames
    if (this.powerUpCounter >= 300) {
      this.powerUpProgressBar = 301;
      this.powerUpStatus = "";
      this.pointsSet = false;
      this.player.playerNormalColor();
      if (this.powerUpCounter === this.powerUpRandom) {
        this.genPowerUp.push(
          new PowerUps(
            this.generateRandomDirection(),
            this.game.x,
            this.game.y,
            this.generateRandomSpeed(0),
            this.generateRandomPowerUp()
          )
        );
        this.powerUpRandom = Math.floor(Math.random() * (900 - 300 + 1) + 300);
        this.powerUpCounter = 0;
      }
    }
    this.powerUpCounter++;

    // Check for PowerUp State
    this.setPowerUp(ctx, this.powerUpStatus);

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
      if (
        this.collisionDetection(enemy.eX, enemy.eY, enemy.eWidth, enemy.eHeight) &&
        this.powerUpStatus !== "invincibility"
      ) {
        // Play 'Game Over' Sound
        this.sounds.playGameOverSound();
        this.sounds.playMusicGameOver();

        // End game
        this.gameStatus = "gameover";
      }
    });

    // Draw the catcher squares and remove them if they are off-screen
    if (this.powerUpStatus !== "evil") {
      this.genCatch.forEach((catcher, index) => {
        catcher.moveCatch();
        catcher.drawCatch(ctx, 1);
        if (catcher.cX > this.game.x + 200 || catcher.cX < -200) {
          this.genCatch.splice(index, 1);
        }
        if (catcher.cY > this.game.y + 200 || catcher.cY < -200) {
          this.genCatch.splice(index, 1);
        }

        // Check for collision and if so, remove the catcher, play a sound, add 20 points and
        // count the amount of collected catchers
        if (this.collisionDetection(catcher.cX, catcher.cY, catcher.cWidth, catcher.cHeight)) {
          this.squarePoints++;
          this.points += 20;
          this.player.increaseSize();
          this.sounds.playCatchSound();
          this.genCatch.splice(index, 1);
        }
      });
    }

    // Draw the PowerUps and remove them if they are off-screen
    this.genPowerUp.forEach((powerup, index) => {
      powerup.movePowerUp();
      powerup.drawPowerUp(ctx);
      if (powerup.puX > this.game.x + 200 || powerup.puX < -200) {
        this.genPowerUp.splice(index, 1);
      }
      if (powerup.puY > this.game.y + 200 || powerup.puY < -200) {
        this.genPowerUp.splice(index, 1);
      }

      // Check for collision and if so, have fun (or not)!
      // Checks PowerUp type returned from activatePowerUp(), plays the correct sound,
      // provides the correct length for the 'Invincibility' progress bar and removes the PowerUp
      if (this.collisionDetection(powerup.puX, powerup.puY, powerup.puWidth, powerup.puHeight)) {
        this.powerUpStatus = powerup.activatePowerUp();
        this.powerUpProgressBar -= this.powerUpCounter;
        this.sounds.playPowerUpSound(this.powerUpStatus);
        this.genPowerUp.splice(index, 1);
      }
    });
  }

  endGame(ctx) {
    // Bring back the cursor again
    this.game.canvas.style.cursor = "default";

    // Clear screen
    ctx.clearRect(0, 0, this.game.x, this.game.y);

    // Draw 'Game Over' text
    ctx.fillStyle = "black";
    ctx.font = "60pt Montserrat";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", this.game.x / 2, this.game.y / 3);
    ctx.font = "300 30pt Montserrat";
    ctx.fillText("Final score: " + this.points, this.game.x / 2, this.game.y / 2.1);
    ctx.font = "300 26pt Montserrat";
    ctx.fillText("Squares caught: " + this.squarePoints, this.game.x / 2, this.game.y / 1.8);

    // Place rotating square
    ctx.save();
    ctx.translate(this.game.x / 3.5, this.game.y / 1.3 - 4);
    ctx.rotate(this.pAngle);
    ctx.fillRect(25 / -2, 25 / -2, 25, 25);
    this.pAngle += (Math.PI / 180) * -4;
    ctx.restore();

    // Place 'PLAY AGAIN' text
    ctx.font = "700 40pt Montserrat";
    ctx.fillStyle = "black";
    ctx.moveTo(this.game.x / 3, this.game.y / 1.3);
    ctx.fillText("PLAY AGAIN", this.game.x / 1.95, this.game.y / 1.3);

    // Place 'BACK TO MENU' text
    ctx.font = "300 18pt Montserrat";
    ctx.fillText("BACK TO MENU", this.game.x / 1.15, this.game.y / 1.05);
  }

  loopGame() {
    // Main game loop, connected to requestAnimationFrame loop

    // Set up the canvas elements
    const ctx = this.game.context;

    // Evaluate game state and run correct method
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
      case "rulesscreen":
        this.rulesScreen(ctx);
    }

    // Loop over loopGame()
    window.requestAnimationFrame(this.loopGame.bind(this));
  }
}

// MAIN CODE
// Start the preloader and take it from there

const sqSquared = new Game();
sqSquared.loadingGame();
