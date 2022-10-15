export default class BlockType {
    // constructor(hp, sprite) {
    //     this.hp = hp
    //     this.sprite = sprite
    // }
    constructor(hp, x, y) {
        this.hp = hp
        this.imageScale = 5
        this.x = x
        this.y = y
        // this.x = x * this.imageScale
        // this.y = y * this.imageScale
        this.image = 'images/arkanoid.png'
    }

    getBackground() {
        return `url(${this.image}) -${this.x * this.imageScale}px -${this.y * this.imageScale}px`
    }
}