class Axel {
    constructor (ctx) {
      this.ctx = ctx
      this.x = 50
      this.y = 80
      this.w = 70
      this.h = 70
      this.vx = 0
      this.vy = 0
      this.ax = 0
      this.ay = 0

      this.image = new Image()
      this.image.src ="../assets/resources/axel1.png"
    }

    drawAxel() {
     this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    }

    moveAxel() {
     this.x += this.vx
     this.y += this.vy
    }
}