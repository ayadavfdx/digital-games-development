// a91403
// Fernando Davila


// GDD - Dodge Master
// Dodge Master é um jogo de reflexos onde o jogador move um
// quadrado para evitar círculos que caem. O objetivo é sobreviver
// o máximo de tempo possível. O jogador perde quando um círculo
// toca no quadrado. O desafio aumenta porque os círculos caem
// cada vez mais rápido.

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// Game variables
var jogador = {
    x: W / 2 - 20,
    y: H - 60,
    w: 40,
    h: 40,
    vel: 5
};

var teclas = {};
var inimigos = [];
var frames = 0;
var velQueda = 2;
var pontos = 0;
var gameOver = false;

// Restart game
function reiniciar(){
    jogador.x = W / 2 - jogador.w / 2;
    inimigos = [];
    frames = 0;
    velQueda = 2;
    pontos = 0;
    gameOver = false;
    teclas = {};
}

// Keyboard controls
window.addEventListener("keydown", function(evento){

    if(evento.key === "ArrowLeft" || evento.key === "ArrowRight"){
        evento.preventDefault();
        teclas[evento.key] = true;
    }

    if(evento.key === "Enter"){
        if(gameOver === true && evento.repeat === false){
            reiniciar();
        }
    }
});

window.addEventListener("keyup", function(evento){
    teclas[evento.key] = false;
});

window.addEventListener("blur", function(){
    teclas = {};
});

// Create enemies
function criarInimigo(){
    var raio = 12 + Math.floor(Math.random() * 11);
    var x = raio + Math.random() * (W - 2 * raio);

    inimigos.push({
        x: x,
        y: -raio,
        r: raio
    });
}

// Check collision
function colide(circulo, quadrado){
    var pontoX = circulo.x;
    var pontoY = circulo.y;

    if(circulo.x < quadrado.x){
        pontoX = quadrado.x;
    }else if(circulo.x > quadrado.x + quadrado.w){
        pontoX = quadrado.x + quadrado.w;
    }

    if(circulo.y < quadrado.y){
        pontoY = quadrado.y;
    }else if(circulo.y > quadrado.y + quadrado.h){
        pontoY = quadrado.y + quadrado.h;
    }

    var distanciaX = circulo.x - pontoX;
    var distanciaY = circulo.y - pontoY;

    var distancia = distanciaX * distanciaX + distanciaY * distanciaY;
    var raio = circulo.r * circulo.r;

    if(distancia <= raio){
        return true;
    }else{
        return false;
    }
}

// Update game
function atualizar(){
    if(gameOver === true){
        return;
    }

    // Player movement
    if(teclas.ArrowLeft){
        jogador.x = jogador.x - jogador.vel;
    }

    if(teclas.ArrowRight){
        jogador.x = jogador.x + jogador.vel;
    }

    if(jogador.x < 0){
        jogador.x = 0;
    }else if(jogador.x + jogador.w > W){
        jogador.x = W - jogador.w;
    }

    frames++;

    // Enemy spawn and speed
    if(frames % 40 === 0){
        criarInimigo();
    }

    if(frames % 300 === 0){
        velQueda = velQueda + 0.5;
    }

    // Update enemies
    for(var i = inimigos.length - 1; i >= 0; i--){
        inimigos[i].y = inimigos[i].y + velQueda;

        if(colide(inimigos[i], jogador)){
            gameOver = true;
            break;
        }

        if(inimigos[i].y - inimigos[i].r > H){
            inimigos.splice(i, 1);
            pontos++;
        }
    }
}

// Draw game
function desenhar(){
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, W, H);

    // Player
    ctx.fillStyle = "#F472B6";
    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    // Enemies
    ctx.fillStyle = "#8B5CF6";

    for(var i = 0; i < inimigos.length; i++){
        ctx.beginPath();
        ctx.arc(inimigos[i].x, inimigos[i].y, inimigos[i].r, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Score and speed
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Evitados: " + pontos, 25, 35);

    ctx.textAlign = "right";
    ctx.fillText("Velocidade: " + velQueda.toFixed(1), W - 25, 35);

    // Game over screen
    if(gameOver === true){
        ctx.fillStyle = "#0000";
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.font = "80px Arial";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 25);

        ctx.font = "22px Arial";
        ctx.fillText("Evitados: " + pontos, W / 2, H / 2 + 15);

        ctx.font = "18px Arial";
        ctx.fillText("Enter para reiniciar", W / 2, H / 2 + 55);
    }
}

// Main game loop
function gameLoop(){
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

gameLoop();
