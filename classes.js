
class Sprite{
    constructor({position, velocity, image frames = { max: 1}}){
        this.position = position;
        this.image= image;
        this.frames = frames;

        this.image.onload = () => {
            this.with = this.image.with / this.frames.max
            this.heigth = this.image.heigth
        }
    }

    draw() {
            c.drawImage(
                this.image,
                0,
                0,
                this.image.width, / this.frames.max,
                this.image.heigth,
                this.position.x,
                this.position.y,
                this.image.with / this.frames.max,
                this.image.heigth
        )
    }
}

class Boundary {
    static width = 32;
    static heigth = 32;
    constructor() {
        this.position = position;
        this.width = 32;
        this.height = 32;
    }



}