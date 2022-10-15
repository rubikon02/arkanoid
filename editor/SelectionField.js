import Field from './Field.js'

export default class SelectionField extends Field {
    constructor(board, x, y) {
        super(board, x, y)
    }

    // select() {
    //     this.classList.add('selected')
    // }

    // unselect() {
    //     this.classList.remove('selected')
    // }




    // setBlock(blockType) {
    //     super.setBlock(blockType)
    //     this.addEventListener('click', this.click)
    // }

    // removeBlock() {
    //     super.removeBlock()
    //     this.removeEventListener('click', this.click)
    // }

    // click() {
    //     this.editor.selectedBlockType = this.block.type
    //     console.log(this.editor.selectedBlockType)
    // }
}

customElements.define('selection-field', SelectionField);