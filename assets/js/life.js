class Life {
    constructor (ctx) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0
    }


    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, 60)
        this.ctx.strokeStyle = 'yellow'
        this.ctx.lineWidth = 5
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, 60)
        this.ctx.fillStyle = 'white'
        this.ctx.font = '15px sans-serif'
        this.ctx.fillText('PRESS 2UP START', 400, 35)
        this.ctx.font = '20px sans-serif'
        this.ctx.fillText('TIME', 280, 20)
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(20, 30, 200, 10)
        this.ctx.fillStyle = 'darkred'
        this.ctx.fillRect(20, 30, 100, 10)

    }



}
