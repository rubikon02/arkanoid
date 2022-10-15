import BlockType from './BlockType.js'
import SelectionBoard from './SelectionBoard.js'
import PlacingBoard from './PlacingBoard.js'
import ContextMenu from './ContextMenu.js'

export default class Editor {
    constructor() {
        this.selectedBlockType = null
        this.selectionFields = []
        this.createBlockTypes()
        this.selectionBoard = new SelectionBoard(this)
        this.placingBoard = new PlacingBoard(this)
        this.contextMenu = new ContextMenu(this)
        this.addListener()
    }

    createBlockTypes() {
        this.blockTypes = []
        for (let sprite of this.nextSprite()) {
            // console.log(sprite)
            this.blockTypes.push(
                new BlockType(1, sprite.x, sprite.y)
            )
        }
    }

    * nextSprite() {
        // const imageScale = 5
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 5; x++) {
                // const x1 = -(5 + x * 10) * imageScale
                // const y1 = -(216 + y * 5) * imageScale
                // const x1 = (5 + x * 10) * imageScale
                // const y1 = (216 + y * 5) * imageScale
                const x1 = (5 + x * 10)
                const y1 = (216 + y * 5)
                // yield `url(images/arkanoid.png) ${x1}px ${y1}px`
                yield { x: x1, y: y1 }
            }
        }
    }

    placeBlocks(type) {
        if (this.placingBoard.selectedFields.length > 0) {
            let anyBlockSet = false
            for (let field of this.placingBoard.selectedFields) {
                if (!field.block || field.block.type != type) {
                    anyBlockSet = true
                    field.setBlock(type)
                }
            }
            if (anyBlockSet) {
                this.placingBoard.saveToHistory()
            }
        }
    }

    addListener() {
        let createRectangleInNextMove = false
        let clickX, clickY
        addEventListener('mousemove', e => {
            if (createRectangleInNextMove) {
                createRectangleInNextMove = false
                this.removeSelectionDiv()
                this.selectionFields = []
                if (!e.ctrlKey && !e.metaKey) {
                    this.placingBoard.unselectFields()
                }
                this.selectionDiv = document.createElement('div')
                this.selectionDiv.id = "selection"
                document.body.appendChild(this.selectionDiv)
                clickX = e.pageX
                clickY = e.pageY
                this.selectionDiv.style.left = clickX + 'px'
                this.selectionDiv.style.top = clickY + 'px'
            }
            if (this.selectionDiv) {
                const width = e.pageX - clickX
                const height = e.pageY - clickY
                this.selectionDiv.style.width = Math.abs(width) + 'px'
                this.selectionDiv.style.height = Math.abs(height) + 'px'
                if (width < 0) {
                    this.selectionDiv.style.left = e.pageX + 'px'
                }
                if (height < 0) {
                    this.selectionDiv.style.top = e.pageY + 'px'
                }
                if (this.selectionFields) {
                    for (let field of this.selectionFields) {
                        this.placingBoard.unselectField(field)
                    }
                }
                this.selectionFields = this.placingBoard.selectByBoundingClientRect(this.selectionDiv.getBoundingClientRect())
            }
        })
        addEventListener('mousedown', e => {
            if (e.buttons == 1) {
                if (!e.target || (e.target &&
                    e.target.nodeName != "SELECTION-FIELD" &&
                    e.target.id != "contextMenu" &&
                    e.target.parentNode?.id != "contextMenu" &&
                    e.target.parentNode?.parentNode?.id != "contextMenu"
                )) {
                    createRectangleInNextMove = true
                    this.contextMenu.hide()
                }
            }
        })
        addEventListener('mouseup', e => {
            createRectangleInNextMove = false
            this.removeSelectionDiv()
        })
        addEventListener('keydown', e => {
            // console.log(e.key)
            if (e.key == "Delete") {
                this.placingBoard.deleteSelected()
            }
            if (e.ctrlKey || e.metaKey) {
                if (e.key == "z") {
                    e.preventDefault()
                    this.placingBoard.undo()
                } else if (e.key == "y") {
                    e.preventDefault()
                    this.placingBoard.redo()
                } else if (e.key == "s") {
                    e.preventDefault()
                    this.placingBoard.save()
                } else if (e.key == "l") {
                    e.preventDefault()
                    this.placingBoard.load()
                }
            }
        })
    }

    removeSelectionDiv() {
        if (this.selectionDiv) {
            this.selectionDiv.remove()
            this.selectionDiv = null
        }
    }
}

window.onload = () => {
    new Editor()
}