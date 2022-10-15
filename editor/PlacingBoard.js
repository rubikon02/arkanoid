import Board from './Board.js'
import PlacingField from './PlacingField.js'

export default class PlacingBoard extends Board {
    constructor(editor) {
        super(editor, 14, 9, document.getElementById('placingBoard'))
        this.createFields(PlacingField)
        this.addListener()
        this.createloadInput()
        this.selectedFields = []
        this.history = [[]]
        this.currentHistory = 0
    }

    addListener() {
        this.element.addEventListener("mousedown", e => this.click(e));
    }

    createloadInput() {
        this.loadInput = document.createElement('input')
        this.loadInput.type = "file"
        this.loadInput.accept = "application/json"
        this.loadInput.onchange = () => {
            const reader = new FileReader();
            reader.readAsText(this.loadInput.files[0], "utf-8");
            reader.onload = (e) => {
                const newFields = JSON.parse(e.target.result)
                this.loadNewFields(newFields)
                this.saveToHistory()
            }
        }
    }

    click(e) {
        if (e.buttons == 1) {
            if (e.target && e.target.nodeName == "PLACING-FIELD") {
                const clickedField = e.target
                if (!e.ctrlKey && !e.metaKey) {
                    this.unselectFields()
                }
                this.toggleField(clickedField)
            }
        }
    }

    selectByBoundingClientRect(selectRect) {
        const fields = this.fields.filter(field => {
            const fieldRect = field.getBoundingClientRect()

            const fLeft = fieldRect.left
            const fRight = fieldRect.left + fieldRect.width
            const fTop = fieldRect.top
            const fBottom = fieldRect.top + fieldRect.height
            const sLeft = selectRect.left
            const sRight = selectRect.left + selectRect.width
            const sTop = selectRect.top
            const sBottom = selectRect.top + selectRect.height

            // field corner inside selection
            const fLeftTopCorner = fLeft >= sLeft && fLeft <= sRight && fTop >= sTop && fTop <= sBottom
            const fRightTopCorner = fRight >= sLeft && fRight <= sRight && fTop >= sTop && fTop <= sBottom
            const fLeftBottomCorner = fLeft >= sLeft && fLeft <= sRight && fBottom >= sTop && fBottom <= sBottom
            const fRightBottomCorner = fRight >= sLeft && fRight <= sRight && fBottom >= sTop && fBottom <= sBottom
            const fieldInsideSelection = fLeftTopCorner || fRightTopCorner || fLeftBottomCorner || fRightBottomCorner

            // selection corner inside field
            const sLeftTopCorner = sLeft >= fLeft && sLeft <= fRight && sTop >= fTop && sTop <= fBottom
            const sRightTopCorner = sRight >= fLeft && sRight <= fRight && sTop >= fTop && sTop <= fBottom
            const sLeftBottomCorner = sLeft >= fLeft && sLeft <= fRight && sBottom >= fTop && sBottom <= fBottom
            const sRightBottomCorner = sRight >= fLeft && sRight <= fRight && sBottom >= fTop && sBottom <= fBottom
            const selectionInsideField = sLeftTopCorner || sRightTopCorner || sLeftBottomCorner || sRightBottomCorner

            // selection passing through the field 
            const crossedHorizontally = ((fLeft > sLeft && fLeft < sRight)
                || (fRight > sLeft && fRight < sRight))
                && (sTop > fTop && sBottom < fBottom)
            const crossedVertically = ((fTop > sTop && fTop < sBottom)
                || (fBottom > sTop && fBottom < sBottom))
                && (sLeft > fLeft && sRight < fRight)
            const selectionPassing = crossedHorizontally || crossedVertically

            return fieldInsideSelection || selectionInsideField || selectionPassing
        })
        const notSelectedFields = fields.filter(field => !field.isSelected())
        for (let field of notSelectedFields) {
            this.selectField(field)
        }
        return notSelectedFields
    }

    // ==================== History ====================

    saveToHistory() {
        this.clearHistoryFuture()
        this.history.push(this.getTakenFields().map(field => {
            return {
                x: field.x,
                y: field.y,
                blockType: field.block.type,
            }
        }))
        this.currentHistory++
        console.log(this.history)
    }

    clearHistoryFuture() {
        this.history.length = this.currentHistory + 1
    }

    loadFromHistory() {
        const newFields = this.history[this.currentHistory]
        this.loadNewFields(newFields)
    }

    loadNewFields(newFields) {
        for (let field of this.fields) {
            const newField = newFields.filter(newField => newField.x == field.x && newField.y == field.y)
            if (newField.length == 0) {
                field.clear()
            } else {
                field.setBlock(newField[0].blockType)
            }
        }
    }

    // ==================== User interaction ====================

    undo() {
        if (this.currentHistory > 0) {
            this.currentHistory--
            this.loadFromHistory()
        }
    }

    redo() {
        if (this.currentHistory < this.history.length - 1) {
            this.currentHistory++
            this.loadFromHistory()
        }
    }

    deleteSelected() {
        const fields = this.selectedFields.filter(field => field.block)
        if (fields.length > 0) {
            console.log('delete')
            for (let field of fields) {
                field.clear()
            }
            this.saveToHistory()
        }
    }

    save() {
        const name = "board.json"
        const data = this.getTakenFields().map(field => {
            return {
                x: field.x,
                y: field.y,
                blockType: field.block.type,
            }
        })
        const blob = new Blob([JSON.stringify(data, null, 4)], { type: "text/javascript" })
        const a = document.createElement("a")
        a.href = URL.createObjectURL(blob)
        a.download = name
        a.click()
    }

    load() {
        this.loadInput.click()
    }

    // ==================== Field ====================

    unselectFields() {
        for (let field of this.selectedFields) {
            field.unselect()
        }
        this.selectedFields = []
    }

    selectField(field) {
        field.select()
        this.selectedFields.push(field)
    }

    unselectField(field) {
        field.unselect()
        this.selectedFields = this.selectedFields.filter(f => f != field)
    }

    toggleField(field) {
        if (field.isSelected()) {
            this.unselectField(field)
        } else {
            this.selectField(field)
        }
    }
}