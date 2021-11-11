/* Trazendo o canvas para o script */
let canvas = document.getElementById('snake');
let context = canvas.getContext("2d");
let box = 32;

/*Definindo posição da cobrinha  */
let snake = [];
snake[0]= {
    x: 8 * box,
    y: 8 * box
}
/*Definindo a posição da comida*/
let comida = {
    x: Math.floor(Math.random()*15 + 1) * box,
    y: Math.floor(Math.random()*15 +1) * box
}

/*Definindo a direção da cobrinha*/
let direction = "up" ;

/*Função para criar a área do jogo */
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box , 16*box);
    
}

/*Função para criar a cobrinha */
function criarSnake(){
    for(i=0; i < snake.length ; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x , snake[i].y, box , box);
    }
}

/*Função criar comida*/
function criarComida(){
    context.fillStyle = 'darkred';
    context.fillRect(comida.x, comida.y, box, box)
}

/*Capturando o comando do jogador*/
document.addEventListener('keydown', teclaPrecionada);

function teclaPrecionada (event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction ='down';

}

/*voltando a cobrinha no lado oposto à saída do tabuleiro */
function atravessaParede(){
    if(snake[0].x > 15*box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16*box;
    if(snake[0].y >15*box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16*box; 
}

/*Função para atualizar jogo*/
let jogo = setInterval(atualizarJogo, 100); 

function atualizarJogo(){
    criarBG();
    criarSnake();
    criarComida();

    /*Definindo as coordenadas de posição da cobrinha com os valores iniciais*/
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /*Definindo a forma de movimentação da cobrinha*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    atravessaParede();

}


