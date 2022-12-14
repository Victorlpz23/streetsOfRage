class Enemy {
 constructor(ctx) {
    this.ctx = ctx
    this.x = 500
    this.y = 180
    this.w = 100
    this.h = 100
    this.y0 = 180
    this.vx = -1
    this.vy = 0
    this.ax = 0
    this.ay = 0
    

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

      this.animateEne()
    }
 
 moveEne() {
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
