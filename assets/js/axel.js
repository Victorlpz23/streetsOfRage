class Axel {
    constructor (ctx) {
      this.ctx = ctx
      this.x = 20
      this.y = 200
      this.y0 = 200
      this.w = 100
      this.h = 100
      this.vx = 0
      this.vy = 0
      this.ax = 0
      this.ay = 0.5

      this.quiet = new Image()
      this.quiet.src ="../assets/resources/Axel1.png"
      this.quiet.frames = 3
      this.quiet.frameIndex = 0
      this.tick2 = 0

      this.walking = new Image()
      this.walking.src ="../assets/resources/axelMove.png"
      this.walking.frames = 4
      this.walking.frameIndex = 0
      this.tick = 0

      this.back = new Image()
      this.back.src ="../assets/resources/reversemove.png"
      this.back.frames = 4
      this.back.frameIndex = 0
      this.tick = 0

      this.jumpImg = new Image()
      this.jumpImg.src ="../resources/jump.png"
      this.jumpImg.frames = 2
      this.jumpImg.frameIndex = 0
      this.tick = 0

      this.jumpAudio = new Audio('../assets/resources/jump.wav')
      this.jumpAudio.volume = 0.5
    }

    draw() {
      this.ctx.imageSmoothingEnabled = false
     if (this.vx === 0) {
      this.ctx.drawImage(this.quiet,
        this.quiet.frameIndex * this.quiet.width / this.quiet.frames,
        0,
        this.quiet.width / this.quiet.frames,
        this.quiet.height,
        this.x,
        this.y,
        this.w,
        this.h)
       
     } if (this.vx > 0) {
      this.ctx.drawImage(
        this.walking,
        this.walking.frameIndex * this.walking.width / this.walking.frames,
        0,
        this.walking.width / this.walking.frames,
        this.walking.height,
        this.x,
        this.y,
        this.w,
        this.h)
        this.animate()
     }
     if (this.vx < 0) {
      this.ctx.drawImage(
        this.back,
        this.back.frameIndex * this.back.width / this.back.frames,
        0,
        this.back.width / this.back.frames,
        this.back.height,
        this.x,
        this.y,
        this.w,
        this.h)
        this.animate3()
    }
    if(this.vy < -10) {
      this.ctx.drawImage(this.jumpImg,
        this.jumpImg.frameIndex * this.jumpImg.width / this.jumpImg.frames,
        0,
        this.jumpImg.width / this.jumpImg.frames,
        this.jumpImg.height,
        this.x,
        this.y,
        this.w,
        this.h)
        this.animateJump()
    }
  }

    move() {
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

    animate() {
      this.tick++
      
      if (this.tick > 15) {
          this.tick = 0
          this.walking.frameIndex++
      
          if (this.walking.frameIndex > this.walking.frames - 1) {
              this.walking.frameIndex = 0
            }  
      }
    }

    // animate2() {
    //   this.tick2++
    //   if (this.tick2 > 15) {
    //     this.tick2 = 0
    //     this.quiet.frameIndex++
    
    //     if (this.quiet.frameIndex > this.quiet.frames - 1) {
    //         this.quiet.frameIndex = 0
    //       }  
    // }
    // }

    animate3() {
      this.tick2++
      if (this.tick2 > 15) {
        this.tick2 = 0
        this.back.frameIndex++
    
        if (this.back.frameIndex > this.back.frames - 1) {
            this.back.frameIndex = 0
          }  
    }
    }

    animateJump() {
      this.tick++
      if (this.tick > 15) {
          this.tick = 0
          this.jumpImg.frameIndex++
      
          if (this.jumpImg.frameIndex > this.jumpImg.frames - 1) {
              this.jumpImg.frameIndex = 0
            }  
      }
    }

    jump() {
      if(this.y === this.y0) {
        this.vy = -10
        this.jumpAudio.play()
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
