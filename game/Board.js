import Block from "./Block.js";

export default class Board {
    constructor(game) {
        this.game = game
        this.blocks = []
        console.log(this.game.blockTypes[0])
        // this.setBlock(0, 0, this.game.blockTypes[0])
        // this.setBlock(0, 1, this.game.blockTypes[0])
        // this.setBlock(0, 2, this.game.blockTypes[0])
        // this.setBlock(1, 0, this.game.blockTypes[0])
        // this.setBlock(2, 0, this.game.blockTypes[0])
        this.addLoadListener()
    }

    addLoadListener() {
        this.loadInput = document.getElementById('fileInput')
        this.loadInput.type = "file"
        this.loadInput.accept = "application/json"
        this.loadInput.onchange = () => {
            // console.log('change')
            const reader = new FileReader();
            reader.readAsText(this.loadInput.files[0], "utf-8");
            reader.onload = (e) => {
                const blocks = JSON.parse(e.target.result)
                console.log(blocks)
                this.loadNewBlocks(blocks)
            }
        }
    }


    loadNewBlocks(blocks) {
        this.clear()
        for (let b of blocks) {
            this.setBlock(b.x, b.y, b.blockType)
        }
    }

    clear() {
        this.blocks = []
    }

    setBlock(x, y, type) {
        this.blocks.push(new Block(this, x, y, type))
    }
}