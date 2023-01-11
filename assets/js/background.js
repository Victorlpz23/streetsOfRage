class Background {
  constructor(ctx) {
    this.ctx = ctx
    this.xCanvas = 0
    this.yCanvas = 60
    this.w = ctx.canvas.width
    this.h = ctx.canvas.height
    this.xImage = 0
    this.yImage = 0
    this.vx = 0
    this.vy = 0

    this.image = new Image()
    this.image.src = "assets/resources/background.jpg"
  }

  draw() {
    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(this.image, this.xImage, 0, 250, 250, this.xCanvas, this.yCanvas, this.w, this.h)
    this.ctx.drawImage(this.image, this.xImage, 0, 250, 250, this.xCanvas + this.w, this.yCanvas, this.w, this.h)
  }


  move() {
    this.yCanvas += this.vy
    this.xImage += this.vx

    if (this.xImage >= this.w / 2) {
      if(this.image.width <= this.xImage + 250) {
        this.xImage = 0
      }
    }
  }
}