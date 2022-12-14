class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.bg = new Background(ctx)
        this.ax = new Axel(ctx)
        this.en = new Enemy(ctx)
        this.interval = null
    }

    start() {
        this.interval = setInterval(() => {
            this.clear()
            this.draw()
            this.move()
        }, 1000 / 60)
    }

    move() {
     this.bg.moveBack()
     this.ax.moveAxel() 
     this.en.moveEne()
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