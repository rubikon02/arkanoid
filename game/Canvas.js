export default class Canvas {
    constructor(game) {
        this.game = game
        this.element = document.getElementById('canvas')
        this.ctx = this.element.getContext('2d');
        this.setSize()
        this.loadImage()
    }

    setSize() {
        this.element.width = 128
        this.element.height = 128
        this.element.style.width = '512px'
        this.element.style.height = '512px'
    }

    loadImage() {
        this.img = new Image();
        this.img.addEventListener('load', () => {
            this.ready = true
            this.createTransparentImg()
            this.createShadowsImg()
            this.clear()
        });
        this.img.src = 'images/arkanoid.png';
    }

    clear() {
        // this.ctx.fillStyle = '#1d2b53'
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, 1000, 1000)
        // this.ctx.drawImage(this.img, 128, 0, 128, 128, 0, 0, 128, 128)
        // this.ctx.drawImage(this.img, 256, 128, 128, 128, 0, 0, 128, 128)
        this.ctx.drawImage(this.img, 2, 128 * 3 + 21, 112, 107, 8, 21, 112, 107)
        const p = this.game.player
        // this.ctx.fillRect(12, 24, 108, 104)
        this.game.player.draw(this)
        for (let b of this.game.board.blocks) {
            b.draw(this)
        }
        this.game.ball.draw(this)
        this.drawPipes()
    }

    drawPipes() {
        const pipes = [
            { x: 0, y: 13, w: 8, h: 115 },
            { x: 0, y: 13, w: 128, h: 8 },
            { x: 120, y: 13, w: 8, h: 115 },
        ]
        for (let p of pipes) {
            this.ctx.drawImage(this.img, 128 + p.x, p.y, p.w, p.h, p.x, p.y, p.w, p.h)
        }
    }

    createTransparentImg() {
        const canvas = document.createElement('canvas');
        canvas.width = this.img.width
        canvas.height = this.img.height
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.img, 0, 0);
        const imgData = ctx.getImageData(0, 0, this.img.width, this.img.height);
        const pix = imgData.data
        let oldColor = { r: 29, g: 43, b: 83 }
        const newColor = { r: 0, g: 0, b: 0, a: 0 };
        for (let i = 0, n = pix.length; i < n; i += 4) {
            const r = pix[i]
            const g = pix[i + 1]
            const b = pix[i + 2]
            if (r == oldColor.r && g == oldColor.g && b == oldColor.b) {
                pix[i] = newColor.r;
                pix[i + 1] = newColor.g;
                pix[i + 2] = newColor.b;
                pix[i + 3] = newColor.a;
            }
        }
        oldColor = { r: 0, g: 0, b: 0 }
        for (let i = 0, n = pix.length; i < n; i += 4) {
            const r = pix[i]
            const g = pix[i + 1]
            const b = pix[i + 2]
            if (r == oldColor.r && g == oldColor.g && b == oldColor.b) {
                pix[i] = newColor.r;
                pix[i + 1] = newColor.g;
                pix[i + 2] = newColor.b;
                pix[i + 3] = newColor.a;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        this.transparentImg = canvas
    }
    createShadowsImg() {
        const canvas = document.createElement('canvas');
        canvas.width = this.transparentImg.width
        canvas.height = this.transparentImg.height
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.transparentImg, 0, 0);
        const imgData = ctx.getImageData(0, 0, this.transparentImg.width, this.transparentImg.height);
        const pix = imgData.data
        const excludeColor = { r: 0, g: 0, b: 0, a: 0 };
        const newColor = { r: 0, g: 0, b: 0, a: 128 };
        for (let i = 0, n = pix.length; i < n; i += 4) {
            const r = pix[i]
            const g = pix[i + 1]
            const b = pix[i + 2]
            if (!(r == excludeColor.r && g == excludeColor.g && b == excludeColor.b)) {
                pix[i] = newColor.r;
                pix[i + 1] = newColor.g;
                pix[i + 2] = newColor.b;
                pix[i + 3] = newColor.a;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        this.shadowsImg = canvas
    }
}