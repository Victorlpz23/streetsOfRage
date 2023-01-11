class Axel {
  constructor(ctx) {
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
    this.health = 200
    this.lf = new Life(ctx)

    this.quiet = new Image()
    this.quiet.src = "assets/resources/Axel1.png"
    this.quiet.frames = 1
    this.quiet.frameIndex = 0
    this.quiet.tick = 0

    this.quietReverse = new Image()
    this.quietReverse.src = "assets/resources/reverseAxel.png"
    this.quietReverse.frames = 1
    this.quietReverse.frameIndex = 0
    this.quietReverse.tick = 0
    this.isReverse = false

    this.walking = new Image()
    this.walking.src = "assets/resources/axelMove.png"
    this.walking.frames = 4
    this.walking.frameIndex = 0
    this.walking.tick = 0

    this.back = new Image()
    this.back.src = "assets/resources/reversemove.png"
    this.back.frames = 4
    this.back.frameIndex = 0
    this.back.tick = 0

    this.jumpImg = new Image()
    this.jumpImg.src = "assets/resources/jump.png"
    this.jumpImg.frames = 2
    this.jumpImg.frameIndex = 0
    this.jumpImg.tick = 0

    this.jumpRe = new Image()
    this.jumpRe.src = "assets/resources/jumpReverse.png"
    this.jumpRe.frames = 2
    this.jumpRe.frameIndex = 0
    this.jumpRe.tick = 0

    this.punching = new Image()
    this.punching.src = "assets/resources/punch.png"
    this.punching.frames = 2
    this.punching.frameIndex = 0
    this.punching.tick = 0
    this.animatePunchTick = 0
    this.isPunching = false


    this.kicking = new Image()
    this.kicking.src = "assets/resources/kick.png"
    this.kicking.frames = 2
    this.kicking.frameIndex = 0
    this.kicking.tick = 0
    this.animateKickTick = 0
    this.isKicking = false


    this.jumpAudio = new Audio('assets/resources/jump.wav')
    this.jumpAudio.volume = 0.3

    this.hitAudio = new Audio('assets/resources/hit.wav')
    this.hitAudio.volume = 0.3 
    
    this.punchAudio = new Audio('assets/resources/punch.wav')
    this.punchAudio.volume = 0.3 

    this.quitLifeAudio = new Audio('assets/resources/quitLife.wav')
    this.quitLifeAudio.volume = 0.3 
    

  }

  draw() {
    this.ctx.imageSmoothingEnabled = false
    if (this.vx === 0 && this.y === this.y0 && this.isPunching === false && this.isKicking === false && this.isReverse === false) {
      this.ctx.drawImage(
        this.quiet,
        this.quiet.frameIndex * this.quiet.width / this.quiet.frames,
        0,
        this.quiet.width / this.quiet.frames,
        this.quiet.height,
        this.x,
        this.y,
        110,
        this.h)
        this.ctx.imageSmoothingEnabled = false

    } if (this.isReverse === true && this.vx === 0 && this.y === this.y0 && this.isPunching === false && this.isKicking === false) {
      this.ctx.drawImage(
        this.quietReverse,
        this.quietReverse.frameIndex * this.quietReverse.width / this.quietReverse.frames,
        0,
        this.quietReverse.width / this.quietReverse.frames,
        this.quietReverse.height,
        this.x,
        this.y,
        110,
        this.h)
       

    } if (this.vx > 0 && this.y === this.y0) {
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
      this.animateWalk()

    } if (this.vx < 0 && this.y === this.y0) {
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
      this.animateBack()

    } if (this.y < this.y0 && this.vx >= 0) {
      this.ctx.drawImage(
        this.jumpImg,
        this.jumpImg.frameIndex * this.jumpImg.width / this.jumpImg.frames,
        0,
        this.jumpImg.width / this.jumpImg.frames,
        this.jumpImg.height,
        this.x,
        this.y,
        this.w,
        this.h)
      this.animateJump()

    } if (this.vx < 0 && this.y < this.y0) {
      this.ctx.drawImage(
        this.jumpRe,
        this.jumpRe.frameIndex * this.jumpRe.width / this.jumpRe.frames,
        0,
        this.jumpRe.width / this.jumpRe.frames,
        this.jumpRe.height,
        this.x,
        this.y,
        this.w,
        this.h)
      this.animateJumpRe()

    } if (this.isPunching === true && this.y === this.y0 && this.vx === 0 && this.isKicking === false) {
      this.punching.tick++
      this.ctx.drawImage(
        this.punching,
        this.punching.frameIndex * this.punching.width / this.punching.frames,
        0,
        this.punching.width / this.punching.frames,
        this.punching.height,
        this.x,
        this.y,
        110,
        this.h)
        if (this.isReverse === true) {
          this.punching.src = "assets/resources/punchReverse.png"
        } else {
          this.punching.src = "assets/resources/punch.png"
        }
        this.punch()

    } if (this.punching.tick > 45) {
      this.punching.tick = 0
      this.isPunching = false
      
    } if (this.isKicking === true && this.y === this.y0 && this.vx === 0) {
      this.kicking.tick++
      this.ctx.drawImage(
      this.kicking,
      this.kicking.frameIndex * this.kicking.width / this.kicking.frames,
      0,
      this.kicking.width / this.kicking.frames,
      this.kicking.height,
      this.x,
      this.y,
      140,
      this.h)

      if (this.isReverse === true) {
        this.kicking.src = "assets/resources/kickReverse.png"
      } else {
        this.kicking.src = "assets/resources/kick.png"
      }
      this.kick()

    } if (this.kicking.tick > 35) {
     this.kicking.tick = 0
     this.isKicking = false
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

    } if (this.x <= 0) {
      this.vx = 0
      this.x = 0

    } if (this.x + this.w >= this.ctx.canvas.width) {
      this.vx = 0
      this.x = this.ctx.canvas.width - this.w
    }

  }

  animateWalk() {
    this.walking.tick++

    if (this.walking.tick > 15) {
      this.walking.tick = 0
      this.walking.frameIndex++

      if (this.walking.frameIndex > this.walking.frames - 1) {
        this.walking.frameIndex = 0
      }
    }
  }

  animateBack() {
    this.back.tick++
    if (this.back.tick > 15) {
      this.back.tick = 0
      this.back.frameIndex++

      if (this.back.frameIndex > this.back.frames - 1) {
        this.back.frameIndex = 0
      }
    }
  }

  animateJump() {
    this.jumpImg.tick++
    if (this.jumpImg.tick > 15) {
      this.jumpImg.tick = 0
      this.jumpImg.frameIndex++

      if (this.jumpImg.frameIndex > this.jumpImg.frames - 1) {
        this.jumpImg.frameIndex = 0
      }
    }
  }

  animateJumpRe() {
    this.jumpRe.tick++
    if (this.jumpRe.tick > 15) {
      this.jumpRe.tick = 0
      this.jumpRe.frameIndex++

      if (this.jumpRe.frameIndex > this.jumpRe.frames - 1) {
        this.jumpRe.frameIndex = 0
      }
    }
  }

  jump() {
    if (this.y === this.y0) {
      this.vy = -10
      this.jumpAudio.play()
    }
  }

  punch() {
    this.animatePunchTick++
    if (this.animatePunchTick > 20) {
      this.animatePunchTick = 0
      this.punching.frameIndex++

      if (this.punching.frameIndex > this.punching.frames - 1) {
        this.punching.frameIndex = 0
      }
    }
  }

  kick() {
    this.animateKickTick++
    if (this.animateKickTick > 20) {
      this.animateKickTick = 0
      this.kicking.frameIndex++

      if (this.kicking.frameIndex > this.kicking.frames - 1) {
        this.kicking.frameIndex = 0
      }
    }
  }



  reduceHealth() {
    if(this.health >= 0) {
      this.health -= 0.5
    }
    if(this.health === 0) {
      this.health = 200
      this.lf.lifes -= 1
      this.quitLifeAudio.play()
    }
  }

  onKeyDown(key) {
    switch (key) {
      case RIGHT:
        this.vx = 5 
        this.isReverse = false
        break;
      case LEFT:
        this.vx = -5
        this.isReverse = true
        break;
      case UP:
        this.jump()
        break;
      case SPACE:
        this.punchAudio.play()
        this.isPunching = true
        break;
      case C:
        this.isKicking = true
        this.punchAudio.play()
        break;
    }
  }

  onKeyUp(key) {
    switch (key) {
      case RIGHT:
      case LEFT:
        this.vx = 0
        break;
    }
  }

}
