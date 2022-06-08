
class Sprite{
    constructor({position, velocity, image frames = { max: 1}}){
        this.position = position;
        this.image= image;
        this.frames = {...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.with = this.image.with / this.frames.max
            this.heigth = this.image.heigth
        }
       this.moving = false
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width, / this.frames.max,
            this.image.heigth,
            this.position.x,
            this.position.y,
            this.image.with / this.frames.max,
            this.image.heigth
        )

        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % 10 == 0) {
                if (this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val++
            }
        }
    }
}



