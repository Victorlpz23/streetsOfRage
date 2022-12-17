class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.bg = new Background(ctx)
        this.ax = new Axel(ctx)
        this.en = new Enemy(ctx)
        this.lf = new Life(ctx)
        this.interval = null
        this.tick = 60 * 5
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
     this.ax.animate()
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
        if (this.en.x === this.ax.x +35 && this.en.y === this.ax.y) {
            this.en.vx = 0
          }
        if (this.ax.x === this.en.x -3535 && this.ax.y === this.en.y) {
            this.ax.vx = 0
        }
    }
}