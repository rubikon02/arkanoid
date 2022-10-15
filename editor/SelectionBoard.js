import Board from './Board.js'
import SelectionField from './SelectionField.js'
import BlockType from './BlockType.js'

export default class SelectionBoard extends Board {
    constructor(editor) {
        super(editor, 1, 30, document.getElementById('selectionBoard'))
        this.clickedField = null
        this.createFields(SelectionField)
        this.populateFields()
        this.addListener()
    }

    populateFields() {
        for (let i in this.editor.blockTypes) {
            this.fields[i].setBlock(this.editor.blockTypes[i])
        }
    }

    addListener() {
        this.element.addEventListener("click", e => {
            if (e.target && e.target.nodeName == "SELECTION-FIELD") {
                if (e.target.block) {
                    const clickedField = e.target
                    this.editor.placeBlocks(clickedField.block.type)
                }
            }
        });
    }
}