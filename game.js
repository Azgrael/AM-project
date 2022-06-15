const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i=0; i<collisions.length; i+=80) {
    collisionsMap.push(collisions.slice(i, i + 80))
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

const fore = new Image()
fore.src = './img/MapaLabirintofINAL2ForeGroundIMG.png'

const MEsquerda = new Image()
MEsquerda.src = './img/Personagens/Minotauro/minotauroEsquerda.png'
const MDireita = new Image()
MDireita.src = './img/Personagens/Minotauro/minotauroDireita.png'
const MAtaque = new Image()
MAtaque.src = './img/Personagens/Minotauro/minotauroAtack.png'


const Pcima = new Image()
Pcima.src = './img/Personagens/Hero/cima.png'
const Pesquerda = new Image()
Pesquerda.src = './img/Personagens/Hero/esquerda.png'
const Pdireita = new Image()
Pdireita.src = './img/Personagens/Hero/direita.png'
const Pbaixo = new Image()
Pbaixo.src = './img/Personagens/Hero/baixo.png'

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 40,
        y: canvas.height / 2 - (128 / 4) / 2
    },
    image: Pbaixo,
    frames: {
        max: 4
    },
    sprites: {
    	up: Pcima,
    	left: Pesquerda,
    	right: Pdireita,
    	down: Pbaixo
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: map
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: fore
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

const movables = [background, ...boundaries, foreground]

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
    foreground.draw()

    let mexer = true
    player.moving = false
    if(keys.w.pressed && lastKey==='w'){
    	player.moving = true
    	player.image = player.sprites.up
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
    	player.moving = true
    	player.image = player.sprites.left
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
    	player.moving = true
    	player.image = player.sprites.down
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
    	player.moving = true
    	player.image = player.sprites.right
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
    if(background.position.y >= -415){
    	if(confirm("You win!!!\nDo you wish to reset the game?")===true){
    		window.location.reload();
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
