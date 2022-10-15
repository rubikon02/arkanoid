import Board from './Board.js'
import Canvas from './Canvas.js'
import Player from './Player.js'
import Ball from './Ball.js'
import BlockType from './BlockType.js'

export default class Game {
    constructor() {
        this.createBlockTypes()
        this.player = new Player(this)
        this.canvas = new Canvas(this)
        this.board = new Board(this)
        this.ball = new Ball(this)
        this.addKeyboardListener()
        this.update()
    }

    createBlockTypes() {
        this.blockTypes = []
        for (let sprite of this.nextSprite()) {
            this.blockTypes.push(
                new BlockType(1, sprite.x, sprite.y)
            )
        }
    }

    * nextSprite() {
        // const imageScale = 5
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 5; x++) {
                const x1 = (5 + x * 10)
                const y1 = (216 + y * 5)
                yield { x: x1, y: y1 }
            }
        }
    }

    addKeyboardListener() {
        this.keys = {}
        addEventListener('keydown', e => {
            this.keys[e.key] = true
        })
        addEventListener('keyup', e => {
            this.keys[e.key] = false
        })
        addEventListener('keydown', e => {
            if (e.code == "Space") {
                this.ball.stop = false
            }
        })
    }

    update() {
        if (this.keys.ArrowLeft) {
            this.player.moveX(-1)
        }
        // console.log(this.keys)
        if (this.keys.ArrowRight) {
            this.player.moveX(1)
        }

        this.ball.update()

        if (this.canvas.ready) {
            this.canvas.clear()
        }
        requestAnimationFrame(() => this.update())
    }
}

window.onload = () => {
    new Game()
}