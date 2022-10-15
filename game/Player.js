export default class Player {
    constructor(game) {
        this.game = game
        // this.width = 30
        // this.height = 10
        this.height = 6
        this.width = 27
        this.sourceX = 271
        this.sourceY = 239
        this.minX = 8
        this.maxX = 128 - this.minX - this.width
        this.x = this.minX + 112 / 2 - Math.ceil(this.width / 2)
        this.y = 106
    }

    draw(canvas) {
        canvas.ctx.drawImage(
            canvas.shadowsImg,
            this.sourceX,
            this.sourceY,
            this.width,
            this.height,
            this.x + 3,
            this.y + 3,
            this.width,
            this.height
        )
        canvas.ctx.drawImage(
            // canvas.img,
            canvas.transparentImg,
            // canvas.shadowsImg,
            this.sourceX,
            this.sourceY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
    moveX(value) {
        if (value < 0 && this.x + value < this.minX) return
        if (value > 0 && this.x + value > this.maxX) return
        this.x += value
        if (this.game.ball.stop) {
            this.game.ball.x = this.x + this.width / 2 - 1
        }
    }
}
