class Axel {
    constructor (ctx) {
      this.ctx = ctx
      this.x = 20
      this.y = 180
      this.y0 = 180
      this.w = 100
      this.h = 100
      this.vx = 0
      this.vy = 0
      this.ax = 0
      this.ay = 0.5

      this.image = new Image()
      this.image.src ="../assets/resources/axel1.png"

      this.img = new Image()
      this.img.src ="../assets/resources/axelMove.png"
      this.img.frames = 4
      this.img.frameIndex = 0
      this.tick = 0
    }

    drawAxel() {
     if (this.vx === 0) {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
     } else {
      this.ctx.drawImage(
        this.img,
        this.img.frameIndex * this.img.width / this.img.frames,
        0,
        this.img.width / this.img.frames,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h)
        this.animateAxel()
     }
    }

    moveAxel() {
     this.vx += this.ax
     this.vy += this.ay
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
      this.vx = 0
      this.x = this.ctx.canvas.width - this.w
    }
    }

    animateAxel() {
      this.tick++
      
      if (this.tick > 15) {
          this.tick = 0
          this.img.frameIndex++
      
          if (this.img.frameIndex > this.img.frames - 1) {
              this.img.frameIndex = 0
            }  
      }
    }

    jump() {
      if(this.y === this.y0) {
        this.vy = -10
      }
   }

    onKeyDown(key) {
      switch(key) {
        case RIGHT:
          this.vx = 5
          break;
        case LEFT:
          this.vx = -5
          break;
        case UP:
          this.jump()
          break;
      }
    }

    onKeyUp(key) {
       switch(key) {
        case RIGHT:
        case LEFT:
          this.vx = 0
          break;
        }
    }
  
}
