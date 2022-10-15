export default class ContextMenu {
    constructor(editor) {
        this.editor = editor
        this.element = document.getElementById('contextMenu')
        this.addListener()
    }

    addListener() {
        document.body.addEventListener('contextmenu', e => {
            e.preventDefault()
            this.element.classList.toggle('hidden')
            this.element.style.left = e.pageX + "px"
            this.element.style.top = e.pageY + "px"
        })
        document.getElementById('undo').addEventListener('click', e => {
            this.hide()
            this.editor.placingBoard.undo()
        })
        document.getElementById('redo').addEventListener('click', e => {
            this.hide()
            this.editor.placingBoard.redo()
        })
        document.getElementById('delete').addEventListener('click', e => {
            this.hide()
            this.editor.placingBoard.deleteSelected()
        })
        document.getElementById('save').addEventListener('click', e => {
            this.hide()
            this.editor.placingBoard.save()
        })
        document.getElementById('load').addEventListener('click', e => {
            this.hide()
            this.editor.placingBoard.load()
        })
    }
    hide() {
        this.element.classList.add('hidden')
    }
}