/* Trazendo o canvas para o script */
let canvas = document.getElementById('snake');
let context = canvas.getContext("2d");
let txtPonto = document.getElementById('ponto');
let txtPassos = document.getElementById('passo');
let txtScore = document.getElementById('score');
let txtRecord = document.getElementById('record');
let box = 32;
let ponto = 0;
let passos = 0;
let score = 0;
let record = parseInt(sessionStorage.getItem("recordSession"));

txtRecord.innerText = "Record desta Sessão de Jogo: Score =" + sessionStorage.getItem("recordSession"); 
  

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

function pontuar(){
    ponto = ponto +1;
    txtPonto.innerText = "Pontução: " + ponto;
    comida.x = Math.floor(Math.random()*15 + 1) * box;
    comida.y = Math.floor(Math.random()*15 +1) * box;
}

/*voltando a cobrinha no lado oposto à saída do tabuleiro/
function atravessaParede(){
    if(snake[0].x > 15*box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16*box;
    if(snake[0].y >15*box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16*box; 
}*/

function terminaJogo(){
/*Parando o jogo se a cobrinha colidir com o seu corpo ou bater nas paredes*/
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            if(record < score){
                sessionStorage.setItem('recordSession', score); 
            }
            clearInterval(jogo);
            alert("Gamer Over :(");
        }
    }
    if(snake[0].x > 15*box || snake[0].x < 0 || snake[0].y >15*box || snake[0].y < 0  ){
        if(record < score){
            sessionStorage.setItem('recordSession', score); 
        }
        clearInterval(jogo);
        alert("Gamer Over :(");
    }
}
/*Função para atualizar jogo*/
let jogo = setInterval(atualizarJogo, 150); 

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

    /*Verificando o número de passos dados para calcular Score */
    passos = passos + 1;
    txtPassos.innerText = "Passos dados = " + passos;
    score = parseInt((ponto/passos)*100*ponto);
    txtScore.innerText = "Score do Jogo = " + score;
    if(record < score){
       txtRecord.innerText = "Record desta Sessão de Jogo: Score = " + score; 
       
    }else{
        txtRecord.innerText = "Record desta Sessão de Jogo: Score = " + record;
    }
    
    /*Verifica os critérios que determina o fim do jogo*/
    terminaJogo();
 
    /*Fazendo a cobrinha aumentar de tamanho ao comer e pontuar*/
    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    }else{
       pontuar();
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

//atravessaParede();

}


