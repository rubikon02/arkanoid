import Block from "./Block.js"

// abstract
export default class Field extends HTMLElement {
    constructor(board, x, y) {
        super()
        this.board = board
        this.x = x
        this.y = y

        this.editor = this.board.editor

        this.block = null
        this.board.element.appendChild(this)
    }

    connectedCallback() {
        this.style.width = this.board.fieldWidth + "px"
        this.style.height = this.board.fieldHeight + "px"
        this.style.left = (this.board.fieldWidth + this.board.fieldSpacing) * this.x + "px"
        this.style.top = (this.board.fieldHeight + this.board.fieldSpacing) * this.y + "px"
    }

    setBlock(blockType) {
        console.log('set')
        this.block = new Block(this, blockType)
        console.log(blockType)
        console.log(this.block)
        // this.style.backgroundColor = this.block.color
        // this.style.background = this.block.background
        this.style.background = this.block.getBackground()
        this.classList.add('block')
    }

    clear() {
        this.block = null
        this.style.removeProperty('background-image')
        this.classList.remove('block')
    }

    // getCorners() {
    //     const rect = this.getBoundingClientRect()
    //     return [
    //         { x: rect.x, y: rect.y },
    //         { x: rect.x, y: rect.y + rect.height },
    //         { x: rect.x + rect.width, y: rect.y },
    //         { x: rect.x + rect.width, y: rect.y + rect.height },
    //     ]
    // }

    // containsPoint(point) {
    //     const rect = this.getBoundingClientRect()
    //     if (point.x >= rect.x && point.x <= rect.x + rect.width) {
    //         if (point.y >= rect.y && point.y <= rect.y + rect.height) {
    //             return true
    //         }
    //     }
    //     return false
    // }
}

// customElements.define('editor-field', Field);