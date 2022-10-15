export default class Block {
    constructor(board, x, y, type) {
        // console.log(type)
        this.board = board
        this.x = x
        this.y = y
        this.type = type
        this.width = 8
        this.height = 4
        this.realX = this.x * this.width + 8
        this.realY = this.y * this.height + 33
        // this.type.sprite = {

        // }
        this.hp = this.type.hp
    }
    draw(canvas) {
        if (this.hp <= 0) {
            this.destroy()
            return
        }
        canvas.ctx.globalAlpha = 0.5
        canvas.ctx.fillStyle = "rgba(0, 0, 0, 128)";
        canvas.ctx.fillRect(
            this.realX + 4,
            this.realY + 4,
            this.width,
            this.height
        )
        canvas.ctx.globalAlpha = 1
        canvas.ctx.drawImage(
            canvas.img,
            this.type.x,
            this.type.y,
            this.width,
            this.height,
            this.realX,
            this.realY,
            this.width,
            this.height
        )
    }

    hit() {
        this.hp--
    }

    destroy() {
        this.board.blocks = this.board.blocks.filter(block => block != this)
    }
}