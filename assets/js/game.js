class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.bg = new Background(ctx)
        this.ax = new Axel(ctx)
        this.en = new Enemy(ctx)
        this.lf = new Life(ctx)
        this.interval = null
        // this.audio = new Audio("../assets/resources/Fighting.mp3")
        // this.audio.volume = 0.5
    }

    start() {
      // this.audio.play()
      this.initListeners()
      this.interval = setInterval(() => {
          this.clear()
          this.draw()
          this.checkCollisions()
          this.move()
        }, 1000 / 60)
    }

    initListeners() {
        document.onkeydown = (e) => {
          this.ax.onKeyDown(e.keyCode)
        }
    
        document.onkeyup = (e) => {
          this.ax.onKeyUp(e.keyCode)
        }
      }

    move() {
     this.bg.move()
     this.ax.move() 
     this.en.move()
    }

    draw() {
     this.bg.draw()
     this.ax.draw()
     this.en.draw()
     this.lf.draw()
    }

    clear() {
     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    checkCollisions() {
      const colX = this.en.x -35 === this.ax.x
      const colY = this.ax.y === this.en.y
     if (colX && colY) {
        this.en.vx = 0
        this.ax.vx = 0
        // delete this.en
       }
    }

    
}
