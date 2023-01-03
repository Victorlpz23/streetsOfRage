class Enemy {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 600
    this.y = 200
    this.y0 = 200
    this.w = 90
    this.h = 100
    this.y0 = 200
    this.vx = -1
    this.vy = 0
    this.ax = 0
    this.ay = 0


    this.img = new Image()
    this.img.src = "../assets/resources/enemy1.png"
    this.img.frames = 4
    this.img.frameIndex = 0
    this.tick = 0

    this.punch = new Image()
    this.punch.src = "../../assets/resources/ePunch.png"
    this.punch.frames = 2
    this.punch.frameIndex = 0
    this.punch.tick = 0


  }

  draw() {
    this.ctx.imageSmoothingEnabled = false
    if (this.vx < 0) {
      this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.img.width / this.img.frames,
        0,
        this.img.width / this.img.frames,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
      this.animateWalk()
    }

    if (this.vx === 0) {
      this.ctx.drawImage(
        this.punch,
        this.punch.frameIndex * this.punch.width / this.punch.frames,
        0,
        this.punch.width / this.punch.frames,
        this.punch.height,
        this.x,
        this.y,
        140,
        this.h,
      )
      this.animatePunch()
    }

  }

  move() {
    this.x += this.vx
    this.y += this.vy

    if (this.y >= this.y0) {
      this.y = this.y0
      this.vy = 0
    }

    if (this.x <= 0) {
      this.vx = 0
      this.x = 0
    }

    if (this.x + this.w >= this.ctx.canvas.width) {
      this.vx = -1

    }

    if (this.x === this.ax.x && this.y === this.ax.y) {
      this.vx = 0
    }
  }


  animateWalk() {
    this.tick++

    if (this.tick > 15) {
      this.tick = 0
      this.img.frameIndex++

      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0
      }
    }
  }

  animatePunch() {
    this.punch.tick++

    if (this.punch.tick > 20) {
      this.punch.tick = 0
      this.punch.frameIndex++

      if (this.punch.frameIndex > this.punch.frames - 1) {
        this.punch.frameIndex = 0
      }
    }
  }





  isVisible() {
    return this.x + this.w >= 0 && this.x <= this.ctx.canvas.width
  }
}
