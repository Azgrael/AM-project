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
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 10)
            boundaries.push(new Boundary({position: {
                x: j * Boundary.width,
                y: i * Boundary.height
            }}))
    })
})

const map = new Image()
map.src = './img/MapaLabirintofINAL2.png'

const player = new Image()
player.src = './img/Character.png'

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: -365,
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

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    c.drawImage(
        player,
        0,
        0,
        player.width/4,
        player.height/4,
        canvas.width/2-(player.width/4)/2,
        canvas.height/2-(player.height/4)/2,
        player.width/4,
        player.height/4)

    if(keys.w.pressed && lastKey==='w')
        background.position.y += 3
    else if(keys.a.pressed && lastKey==='a')
        background.position.x += 3
    else if(keys.s.pressed && lastKey==='s')
        background.position.y -= 3
    else if(keys.d.pressed && lastKey==='d')
        background.position.x -= 3
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
