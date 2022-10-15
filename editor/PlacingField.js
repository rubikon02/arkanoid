import Field from './Field.js'

export default class PlacingField extends Field {
    constructor(board, x, y) {
        super(board, x, y)
    }

    select() {
        this.classList.add('selected')
    }

    unselect() {
        this.classList.remove('selected')
    }

    isSelected() {
        return this.classList.contains('selected')
    }
}

customElements.define('placing-field', PlacingField);