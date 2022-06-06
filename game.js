const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height) //cria um retangulo com as propriedades X, Y, largura, altura (por esta ordem)

const map = new Image()
map.src = './img/MapaLabirintofINAL2.png'

const player = new Image()
player.src = './img/playerDown.png'

//const mino = new Image()
//mino.src = './img/Minotaur - Sprite Sheet.png'

map.onload = () => {
  c.drawImage(map, -380, -6600)
  c.drawImage(player, 0, 0, player.width/4, player.height, canvas.width/2-(player.width/4)/2, canvas.height/2-player.height/2, player.width/4, player.height)
  // c.drawImage(mino, 550, 252)
}
//temos que diminuir o scaling do player
//temos que aumentar o scaling do minotauro

//---------------
/*
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
