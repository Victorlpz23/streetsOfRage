class Game {
  constructor(ctx) {
    this.ctx = ctx
    this.bg = new Background(ctx)
    this.ax = new Axel(ctx)
    this.en = []
    this.enG = []
    this.tick = 60 * 5
    this.tickGirl = 40 * 5



    this.interval = null

    this.audioFight = new Audio("assets/resources/Fighting.mp3")
    this.audioFight.volume = 0.2

    this.audioOver = new Audio("assets/resources/19 Game Over.mp3")
    this.audioOver.volume = 0.2

    this.audioDie = new Audio("assets/resources/enemyDie.wav")
    this.audioDie.volume = 0.2

    this.audioDieGirl = new Audio("assets/resources/girlDie.wav")
    this.audioDieGirl.volume = 0.2

    this.audioHit = new Audio("assets/resources/hit.wav")
    this.audioHit.volume = 0.3 
  }

  start() {
    this.stop()
    this.audioFight.play()
    this.initListeners()

    this.interval = setInterval(() => {
      this.clear()
      this.draw()
      this.checkCollisions()
      this.move()
      this.addEnemy()
      this.addEnemyGirl()
      this.gameOver()
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

  addEnemyGirl() {
    this.tickGirl--
    if (this.tickGirl <= 0) {
      this.tickGirl = 400 + Math.random() * 40
      this.enG.push(new EnemyGirl(this.ctx))
    }
  }

  move() {
    this.bg.move()
    this.ax.move()
    this.en.forEach(e => e.move())
    this.enG.forEach(eg => eg.move())

    if (this.ax.x >= 250 && this.ax.vx > 0) {
      this.bg.vx = 1.5
      this.ax.vx = 1
      this.ax.x = 250
    } else {
      this.bg.vx = 0
    }
  }

  draw() {
    this.bg.draw()
    this.en.forEach(e => e.draw())
    this.enG.forEach(eg => eg.draw())
    this.ax.draw()
    this.ax.lf.draw(this.ax.health)
  }

  clear() {
    this.en = this.en.filter(e => e.isVisible())
    this.enG = this.enG.filter(eg => eg.isVisible())
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  checkCollisions(keyCode) {
    for (let i = 0; i < this.en.length; i++) {
      const e = this.en[i]
      const colX = e.x - 45 <= this.ax.x && this.ax.x <= e.x + 45
      const colY = this.ax.y === e.y 
      if (colX && colY && !e.isDeath) {
        e.vx = 0
        this.ax.vx = 0
        if (e.checkCollisions(this.ax)){
          this.ax.reduceHealth()
        } 

        if (keyCode === SPACE || keyCode === C) {
          e.isDeath = true;
          this.audioHit.play()
          this.audioDie.play()
          this.ax.lf.points += 100
        }
         
      }
      if (e.isDeath && e.isDeathCounter < ENEMY_DEATH_DURATION){
        e.isDeathCounter++
      }
    }

    for (let i = 0; i < this.enG.length; i++) {
      const eg = this.enG[i] 
      const colXg = eg.x - 45 <= this.ax.x && this.ax.x <= eg.x + 45
      const colYg = this.ax.y === eg.y
      if (colXg && colYg && !eg.isDeath) {
        eg.vx = 0
        this.ax.vx = 0
        if (eg.checkCollisions(this.ax)){
          this.ax.reduceHealth()
        } 

        if (keyCode === SPACE || keyCode === C) {
          eg.isDeath = true;
          this.audioHit.play()
          this.audioDieGirl.play()
          this.ax.lf.points += 100
        }
         
      }
      if (eg.isDeath && eg.isDeathCounter < ENEMY_DEATH_DURATION){
        eg.isDeathCounter++
      }
    }
  }


  stop() {
      clearInterval(this.interval)
  }

  gameOver() {
    if (this.ax.lf.lifes < 0){
      this.stop()
      this.ctx.fillStyle = 'white'
      this.ctx.font = '80px press-start-2p'
      this.ctx.fillText('GAME OVER', 70, 200)
      this.audioFight.pause()
      this.audioOver.play()
    }
  }

}
