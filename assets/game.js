class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.bg = new Background(ctx)
        this.ax = new Axel(ctx)
        this.en = new Enemy(ctx)
        this.interval = null
        this.tick = 60 * 5
    }

    start() {
        this.initListeners()
        this.interval = setInterval(() => {
            this.clear()
            this.draw()
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
     this.bg.moveBack()
     this.ax.moveAxel() 
     this.en.moveEne()
    //  this.ax.animateAxel()
    }

    draw() {
     this.bg.drawBack()
     this.ax.drawAxel()
     this.en.drawEne()
    }

    clear() {
     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
}