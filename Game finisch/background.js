class Layer {
    constructor(image, speedPercent, canvas, ctx) {
        this.image = image;
        this.canvas = canvas;
        this.ctx = ctx;
        this.imagex = 0;
        this.imagex2 = 2400;
        this.baseSpeed = 7;
        this.speed = this.baseSpeed * speedPercent;
      }
  
    draw() {
      this.ctx.drawImage(this.image, this.imagex, 0, 2400, this.canvas.height);
      this.ctx.drawImage(this.image, this.imagex2, 0, 2400, this.canvas.height);
    }
  
    move() {
      this.imagex -= this.speed;
      this.imagex2 -= this.speed;
  
      if (this.imagex < -2400) this.imagex = this.imagex2 + 2400;
      if (this.imagex2 < -2400) this.imagex2 = this.imagex + 2400;
    }
    setSpeed(multiplier) {
      this.speed = this.baseSpeed * multiplier;
    }
  }
