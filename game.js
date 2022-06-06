const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height) //cria um retangulo com as propriedades X, Y, largura, altura (por esta ordem)

const map = new Image()
map.src = './img/O Mapa Labirinto Final.png'

map.onload = () => {
  c.drawImage(map, 0, 0)
}
