class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.bg = new Background(ctx)
    this.ax = new Axel(ctx)
    this.en = []
    this.tick = 60 * 5

    this.lf = new Life(ctx)
    this.interval = null

    // this.audioFight = new Audio("../assets/resources/Fighting.mp3")
    // this.audioFight.volume = 0.5

    // this.audioOver = new Audio("../../assets/resources/19 Game Over.mp3")
    // this.audioOver.volume = 0.5
  }

  start() {
    this.stop()
    // this.audioFight.play()
    this.initListeners()

    this.interval = setInterval(() => {
      this.clear()
      this.draw()
      this.checkCollisions()
      this.move()
      this.addEnemy()
    }, 1000 / 60)
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.ax.onKeyDown(e.keyCode)
      this.checkCollisions(e.keyCode)
    }

    document.onkeyup = (e) => {
      this.ax.onKeyUp(e.keyCode)
    }
  }

  addEnemy() {
    this.tick--
    if (this.tick <= 0) {
      this.tick = 400 + Math.random() * 40
      this.en.push(new Enemy(this.ctx))
    }
  }

  move() {
    this.bg.move()
    this.ax.move()
    this.en.forEach(e => e.move())

    if (this.ax.x >= 400 && this.ax.vx > 0) {
      this.bg.vx = 1.5
      this.ax.vx = 1
      this.ax.x = 400
    } else {
      this.bg.vx = 0
    }
  }

  draw() {
    this.bg.draw()
    this.ax.draw()
    this.en.forEach(e => e.draw())
    this.lf.draw(this.ax.health)
  }

  clear() {
    this.en = this.en.filter(e => e.isVisible())
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  checkCollisions(keyCode) {
    for (let i = 0; i < this.en.length; i++) {
      const e = this.en[i]
      const colX = e.x - 35 <= this.ax.x && this.ax.x <= e.x + 35
      const colY = this.ax.y === e.y
      if (colX && colY) {
        e.vx = 0
        this.ax.vx = 0
        this.reduceHealth()
        

        if (keyCode === SPACE || keyCode === C) {
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }).then(() => {
            this.en.splice(i, 1);
            this.lf.points += 100
          });
        }
      }
    }
  }

  reduceHealth() {
    if(this.ax.health >= 0) {
      this.ax.health -= 0.5
    }
    if(this.ax.health === 0) {
      this.ax.health = 200
      this.lf.lifes -= 1
    }
    if (this.lf.lifes < 0){
      this.gameOver()
    }
  }

  stop() {
      clearInterval(this.interval)
  }

  gameOver() {
    this.stop()
    this.ctx.fillStyle = 'white'
    this.ctx.font = '80px press-start-2p'
    this.ctx.fillText('GAME OVER', 70, 200)
    // this.audioFight.pause()
    // this.audioOver.play()
  }


}
