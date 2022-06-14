

//atributos do inimigo que é preciso
// e o x,y mas esses já vêm da classe sprite
this.positionArray={
    x:10,
    y:10
}

----------------------------------------------------------------------------------------
    ----------------------------------------------------------------------------------------
        ----------------------------------------------------------------------------------------
//Funcão que serve para descobir em que quadrante de inimigo está o player

            function quadrantePlayerAoInimigo(){

                if (Mino.x > player.x && Mino.y>player.y){
                    return 2
                }
                else if (Mino.x < player.x && Mino.y>player.y){
                    return 1
                }
                else if (Mino.x < player.x && Mino.y<player.y){
                    return 4
                }
                else if (Mino.x > player.x && Mino.y<player.y){
                    return 3
                }

                else {
                    return 0
                }

            }
----------------------------------------------------------------------------------------
    ----------------------------------------------------------------------------------------
        ----------------------------------------------------------------------------------------
//Para saber em que posição do array é que está o inimigo e o player
//até agora ainda só utilizo do inimigo
//este bloco está dentro dos for que testam sa colisões
if (TileToPlayerCollsion(enemy.x,enemy.y,enemy.width,enemy.height,x,y)){
    enemy.positionArray.x=f;
    enemy.positionArray.y=i;
}
if (TileToPlayerCollsion(player.x,player.y,player.width,player.height,x,y)){
    player.positionArray.x=f;
    player.positionArray.y=i;
}

-----------------------------------------------------------------------------------------
    -----------------------------------------------------------------------------------------
        -----------------------------------------------------------------------------------------
//São duas funções que levam como parametros a posição em que está no array o inimigo
//retornam sempre um valor numérico
            function rightPathPossible(i,f) {
                let contadorDeEspacos=0;
                //console.log(levelNow[f+1][i])

                for (let x=i;x<30;x++){

                    if (levelNow[f+1][x]===10){

                        contadorDeEspacos++
                    }
                    if (levelNow[f+1][x]===0){

                        return contadorDeEspacos
                    }
                }
                return contadorDeEspacos
            }
function leftPathPossible(i,f) {
    let contadorDeEspacosEsquerda=0;
    //console.log(levelNow[f+1][i])

    for (let x=i;x>0;x--){

        if (levelNow[f+1][x]===10){

            contadorDeEspacosEsquerda++
        }
        if (levelNow[f+1][x]===0){

            return contadorDeEspacosEsquerda
        }


    }
    return contadorDeEspacosEsquerda
}
----------------------------------------------------------------------------------------
    ----------------------------------------------------------------------------------------
        ----------------------------------------------------------------------------------------

//Agora para a magia,portanto usando o a formula do atan2
            enemy.chase(Math.atan2(player.y+player.height/2-enemy.y,player.x + player.width/2 - enemy.x))

//obtemos um angulo, com esse angulo consegues fazer com que o inimigo tente ir na diagonal ao encontro do player, no entanto, se colidir
//ou seja (passa para o else assinalado),  ele primeiro vai ver em quadrante é que está o player, se acima ou abaixo, se for em baixo
//ele vai simultaneamente ver para a linha do array do elemento em que ele está a bater tanto para a direita, tanto para a esquerda o mais pequeno para ele percorrer
//se o da direita for menor ele vai andar para a direita, mas só enquanto em baixo dele ele colidir caso andasse para baixo
//a mesma coisa para a esquerda mas ao contrario
//O código tá muito grande e algo não otimizado mas funciona no nosso caso

chase(angle){
    this.draw()
    if (collision(player.x,player.y,player.width,player.height,this.x+this.width/2,this.y+this.height/2,this.width-this.width/2,this.height-this.height/2)){

        this.attack()

    }
    else
    {
        if (!structuresCollision(this.x + Math.cos(angle) * 2,this.y + Math.sin(angle) * 2  ,this.width,this.height,enemy)){
            this.x += Math.cos(angle) * 2
            this.y+=Math.sin(angle) * 2

        }
        else{
//Este else
            if (quadrantePlayerAoInimigo()==3||quadrantePlayerAoInimigo()==4){

                if (rightPathPossible(this.positionArray.x,this.positionArray.y) <= leftPathPossible(this.positionArray.x,this.positionArray.y)){
                    if (structuresCollision(this.x ,this.y +  2  ,this.width,this.height,enemy)){
                        this.x +=2}

                }
                if (rightPathPossible(this.positionArray.x,this.positionArray.y) > leftPathPossible(this.positionArray.x,this.positionArray.y)){
                    if (structuresCollision(this.x ,this.y +  2  ,this.width,this.height,enemy)){
                        this.x -=2
                    }

                }
                if (!structuresCollision(this.x ,this.y +  2  ,this.width,this.height,enemy)){
                    this.y+=2
                }


            }
            if (quadrantePlayerAoInimigo()==1||quadrantePlayerAoInimigo()==2){

                if (rightPathPossible(this.positionArray.x,this.positionArray.y-4) <= leftPathPossible(this.positionArray.x,this.positionArray.y-4)){
                    if (structuresCollision(this.x ,this.y -  2  ,this.width,this.height,enemy)){

                        this.x +=2
                    }

                }
                if (rightPathPossible(this.positionArray.x,this.positionArray.y-4) > leftPathPossible(this.positionArray.x,this.positionArray.y-4)){
                    if (structuresCollision(this.x ,this.y -  2  ,this.width,this.height,enemy)){
                        this.x -=2
                    }

                }
                if (!structuresCollision(this.x ,this.y - 2  ,this.width,this.height,enemy)){
                    this.y-=2
                }
            }





        }






    }
}
