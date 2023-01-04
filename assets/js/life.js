class Life {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0
        this.lifes = 3
        this.points = 0
    }


    draw(health) {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, 60)

        this.ctx.strokeStyle = 'yellow'
        this.ctx.lineWidth = 5
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, 60)

        this.ctx.fillStyle = 'white'
        this.ctx.font = '15px press-start-2p'
        this.ctx.fillText('PRESS 2UP START', 400, 35)
        this.ctx.font = '20px press-start-2p'
        this.ctx.fillText('TIME', 280, 20)

        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(20, 30, 200, 10)

        this.ctx.fillStyle = 'darkred'
        this.ctx.fillRect(20, 30, health, 10)


        this.ctx.fillStyle = 'white'
        this.ctx.font = '18px press-start-2p'
        this.ctx.fillText('1 UP-' + this.points.toString().padStart(6, "0") , 20, 25)

        this.ctx.fillStyle = 'white'
        this.ctx.font = '25px press-start-2p'
        this.ctx.fillText('x' + this.lifes, 223, 40)
    }
}
