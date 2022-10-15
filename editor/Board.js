// abstract
export default class Board {
    constructor(editor, width, height, element) {
        this.editor = editor
        this.width = width
        this.height = height
        this.element = element

        this.fieldWidth = 40
        this.fieldHeight = 20
        this.fieldSpacing = 5

        this.element.style.width = this.width * this.fieldWidth + (this.width - 1) * this.fieldSpacing + "px"
        this.element.style.height = this.height * this.fieldHeight + (this.height - 1) * this.fieldSpacing + "px"

        this.fields = []
    }

    createFields(fieldType) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.fields.push(new fieldType(this, x, y))
            }
        }
    }

    getField(x, y) {
        if (x < 0) return null
        if (y < 0) return null
        if (x >= this.width) return null
        if (y >= this.height) return null
        return this.fields.filter(field => field.x == x && field.y == y)[0]
    }

    getTakenFields() {
        return this.fields.filter(field => field.block)
    }

    // getNotSelectedFields() {
    //     return this.fields.filter(field => !field.isSelected())
    // }
}