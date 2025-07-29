class Layer {
    constructor(image, speedPercent) {
        this.image = image
        this.canvas = canvas1;
        this.ctx = canvas.getContext("2d");
        // this.canvas.width = 900;
        // this.canvas.height = 900;
        this.imagex = 0
        this.imagex2 = 2400
        this.speed = 7 * speedPercent

    }
    draw() {
        this.ctx.drawImage(
            this.image,
            this.imagex,
            0,
            2400,
            this.canvas.height)

        this.ctx.drawImage(
            this.image,
            this.imagex2,
            0,
            2400,
            this.canvas.height)

    }
    move() {
        
        this.imagex -= this.speed
        this.imagex2 -= this.speed
        if (this.imagex < -2400) {
            this.imagex = this.imagex2 + 2400
        }
        if (this.imagex2 < -2400) {
            this.imagex2 = this.imagex + 2400
        }
    }
}
