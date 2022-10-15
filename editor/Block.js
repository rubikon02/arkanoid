import BlockType from './BlockType.js'

export default class Block {
    constructor(field, type) {
        this.field = field
        this.type = type

        // const t = this.type
        this.hp = this.type.hp
        // this.background = `url(${t.image}) -${t.x}px -${t.y}px`
    }

    getBackground() {
        const t = this.type
        console.log(`url(${t.image}) -${t.x * t.imageScale}px -${t.y * t.imageScale}px`)
        return `url(${t.image}) -${t.x * t.imageScale}px -${t.y * t.imageScale}px`
    }
}