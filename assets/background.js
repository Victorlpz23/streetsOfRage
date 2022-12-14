class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.w = ctx.canvas.width
        this.h = ctx.canvas.height
        this.vx = -0.5
        this.vy = 0 

        this.image = new Image()
        this.image.src ="../assets/resources/background.jpg"
    }

    drawBack() {
     this.ctx.drawImage(this.image, 0, 0, 400, 400, this.x, this.y, this.w, this.h)
     this.ctx.drawImage(this.image, 0, 0, 400, 400, this.x + this.w, this.y, this.w, this.h)
    }

    moveBack() {
     this.x += this.vx
     this.y += this.vy

     if (this.x <= -this.w) {
        this.x = 0
      }
    }
}