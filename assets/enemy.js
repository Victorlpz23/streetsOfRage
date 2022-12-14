class Enemy {
 constructor(ctx) {
    this.ctx = ctx
    this.x = 650
    this.y = 80
    this.y0 = 80
    this.vx = -0.5
    this.vy = 0
    this.ax = 0
    this.ay = 1
    this.w = 60
    this.h = 60

    this.img = new Image()
    this.img.src = "../assets/resources/enemy1.png"
    this.img.frames = 4
    this.img.frameIndex = 0
    this.tick = 0
 }
 
 drawEne() {
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
    }
 
 moveEne() {
    this.vx += this.ax
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy

    if (this.y >= this.y0) {
      this.y = this.y0
      this.vy = 0
    }
  }
 

 animateEne() {
    this.tick++
    
    if (this.tick > 15) {
        this.tick = 0
        this.img.frameIndex++
    
        if (this.img.frameIndex > this.img.frames - 1) {
            this.img.frameIndex = 0
          }  
        }
      }

 }
