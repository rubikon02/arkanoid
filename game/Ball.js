import Block from "./Block.js"

export default class Board {
    constructor(game) {
        this.game = game
        this.x = 62
        this.y = 102
        this.width = 4
        this.height = 4
        this.r = this.width / 2
        this.speed = {
            x: 1,
            y: 1
            // x: .5,
            // y: .5
        }
        this.collidedLastTime = false
        this.stop = true
    }

    draw(canvas) {
        canvas.ctx.drawImage(
            canvas.transparentImg,
            317,
            225,
            this.width,
            this.height,
            Math.floor(this.x),
            Math.floor(this.y),
            this.width,
            this.height
        )
    }

    update() {
        if (this.stop) return
        this.x += this.speed.x
        this.y += this.speed.y
        if (this.x <= 8 || this.x >= 116) {
            this.speed.x *= -1
        }
        if (this.y <= 21) {
            this.speed.y *= -1
        }
        if (this.y >= 124) {
            this.reset()
        }
        for (let block of this.game.board.blocks) {
            this.bounceIfColliding(block)
        }
        this.bounceIfColliding(this.game.player)
    }

    reset() {
        this.stop = true
        this.y = 103
        this.x = this.game.player.x + this.game.player.width / 2 - 2
    }

    bounceIfColliding(sourceObject) {
        let object = {
            sourceObject: sourceObject,
            x: sourceObject.x,
            y: sourceObject.y,
            w: sourceObject.width,
            h: sourceObject.height,
        }
        if (sourceObject instanceof Block) {
            object.x = sourceObject.realX
            object.y = sourceObject.realY
        }
        if (this.colliding(object)) {
            if (sourceObject instanceof Block) {
                object.sourceObject.hit()
            }
            if (!this.collidedLastTime) {
                const distX = Math.abs(this.x + this.width / 2 - object.x - object.w / 2)
                // if (distX < object.w / 2 + this.width / 2 - 1) {
                if (distX < object.w / 2 + this.width / 2 - 1) {
                    this.speed.y *= -1
                } else {
                    this.speed.x *= -1
                }
            }
            this.x += this.speed.x
            this.y += this.speed.y
            this.collidedLastTime = true
        } else {
            this.collidedLastTime = false
        }
    }

    getCenter() {
        return {
            x: this.x + this.width / 2,
            x: this.y + this.height / 2,
        }
    }

    colliding(rect) {
        const ball = this.getCenter()
        // console.log(ball)
        const distX = Math.abs(this.x + this.width / 2 - rect.x - rect.w / 2)
        const distY = Math.abs(this.y + this.height / 2 - rect.y - rect.h / 2)
        if (distX > (rect.w / 2 + this.r)) { return false }
        if (distY > (rect.h / 2 + this.r)) { return false }

        if (distX <= (rect.w / 2)) { return true }
        if (distY <= (rect.h / 2)) { return true }

        const dx = distX - rect.w / 2
        const dy = distY - rect.h / 2

        return (dx * dx + dy * dy <= (this.r * this.r))
    }
}