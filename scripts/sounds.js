// Initialize and play the game sounds
export default class Sounds {
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
          this.audioWO.volume = 0.7;
          this.audioWO.play();
          break;
        default:
          this.audioPU.currentTime = 0;
          this.audioPU.volume = 0.8;
          this.audioPU.play();
      }
    }
  }
  