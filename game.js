const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i=0; i<collisions.length; i+=80) {
    collisionsMap.push(collisions.slice(i, i + 80))
}

class Boundary {
    static width = 40
    static height = 40
    constructor({position}) {
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -935,
    y: -11225
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 10)
            boundaries.push(new Boundary({position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }}))
    })
})

const map = new Image()
map.src = './img/MapaLabirintofINAL2.png'

const character = new Image()
character.src = './img/Character.png'

class Sprite {
    constructor({position, image, frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload= () => {
            this.width = this.image.width/this.frames.max
            this.height = this.image.height/this.frames.max
        }
    }
    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width/this.frames.max,
            this.image.height/this.frames.max,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height/this.frames.max
        )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - (128 / 4) / 2,
        y: canvas.height / 2 - (128 / 4) / 2
    },
    image: character,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: map
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries]

function Colisao({ret1, ret2}) {
    return(
        ret1.position.x + ret1.width >= ret2.position.x &&
        ret1.position.x <= ret2.position.x + ret2.width &&
        ret1.position.y <= ret2.position.y + ret2.height &&
        ret1.position.y + ret1.height >= ret2.position.y
    )
}
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()

    let mexer = true
    if(keys.w.pressed && lastKey==='w'){
        for (let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                Colisao({
                    ret1: player,
                    ret2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y+4
                    }}
                })
            ){
                mexer = false
                break
            }
        }
        if(mexer) {
            movables.forEach((movable) => {
                movable.position.y += 4
            })
        }
    }
    else if(keys.a.pressed && lastKey==='a'){
        for (let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                Colisao({
                    ret1: player,
                    ret2: {...boundary, position: {
                            x: boundary.position.x+4,
                            y: boundary.position.y
                        }}
                })
            ){
                mexer = false
                break
            }
        }
        if(mexer) {
            movables.forEach((movable) =>{
                movable.position.x += 4
            })
        }
    }
    else if(keys.s.pressed && lastKey==='s'){
        for (let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                Colisao({
                    ret1: player,
                    ret2: {...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y-4
                        }}
                })
            ){
                mexer = false
                break
            }
        }
        if(mexer) {
            movables.forEach((movable) =>{
                movable.position.y -= 4
            })
        }
    }
    else if(keys.d.pressed && lastKey==='d'){
        for (let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                Colisao({
                    ret1: player,
                    ret2: {...boundary, position: {
                            x: boundary.position.x-4,
                            y: boundary.position.y
                        }}
                })
            ){
                mexer = false
                break
            }
        }
        if(mexer) {
            movables.forEach((movable) =>{
                movable.position.x -= 4
            })
        }
    }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

//---------------

//temos que diminuir o scaling do player
//temos que aumentar o scaling do minotauro


/*
//const mino = new Image()
//mino.src = './img/Minotaur - Sprite Sheet.png'
map.onload = () => {
    c.drawImage(player, //source da img
        0, //coordenada x de onde se começa a cortar
        0, //coordenada y de onde se começa a cortar
        player.width/4, //coordenada x de onde se acaba de cortar
        player.height, //coordenada y de onde se acaba de cortar
        //sitio onde a imagem vai ficar
        canvas.width/2-(player.width/4)/2, //posição central da coordenada X do player a contar com o tamanho da imagem e a corped part
        canvas.height/2-player.height/2, //posição central da coordenada y do player a contar com o tamanho da imagem
        player.width/4, //coordenada x do player
        player.height //coordenada y do player)
}
*/
