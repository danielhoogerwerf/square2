// Game initializer
export default class GameInit {
    constructor() {
      this.x = window.innerWidth;
      this.y = window.innerHeight;
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