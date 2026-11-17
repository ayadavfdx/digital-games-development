// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const GRAVIDADE = 0.6;
const FORCA_SALTO = -12;
const CHAO = H - 100;

const jogador = {
    x: 80,
    y: CHAO - 40,
    w: 40,
    h: 40,
    vel: 4,
    vy: 0,
    noChao: true
};

const teclas = {};
var saltos = 0;

// Keyboard
window.addEventListener("keydown", function(evento){
    if(evento.code === "ArrowLeft" || evento.code === "ArrowRight" ||
       evento.code === "ArrowUp" || evento.code === "Space"){
        evento.preventDefault();
    }

    teclas[evento.code] = true;

    if(evento.code === "Space" || evento.code === "ArrowUp"){
        if(jogador.noChao === true && evento.repeat === false){
            jogador.vy = FORCA_SALTO;
            jogador.noChao = false;
            saltos++;
        }
    }
});

window.addEventListener("keyup", function(evento){
    teclas[evento.code] = false;
});

window.addEventListener("blur", function(){
    teclas.ArrowLeft = false;
    teclas.ArrowRight = false;
    teclas.ArrowUp = false;
    teclas.Space = false;
});

function atualizar(){

    // Player movement
    if(teclas.ArrowLeft){
        jogador.x = jogador.x - jogador.vel;
    }

    if(teclas.ArrowRight){
        jogador.x = jogador.x + jogador.vel;
    }

    // Canvas limits
    if(jogador.x < 0){
        jogador.x = 0;
    }else if(jogador.x + jogador.w > W){
        jogador.x = W - jogador.w;
    }

    // Gravity
    jogador.vy = jogador.vy + GRAVIDADE;
    jogador.y = jogador.y + jogador.vy;

    // Ground collision
    if(jogador.y + jogador.h >= CHAO){
        jogador.y = CHAO - jogador.h;
        jogador.vy = 0;
        jogador.noChao = true;
    }else{
        jogador.noChao = false;
    }
}

function desenhar(){

    // Background
    ctx.fillStyle = "#a7d0fa";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#62c755";
    ctx.fillRect(0, CHAO, W, H - CHAO);

    // Player shadow
    const altura = CHAO - (jogador.y + jogador.h);
    let larguraSombra = jogador.w - altura * 0.2;
    const centroX = jogador.x + jogador.w / 2;

    if(larguraSombra < 8){
        larguraSombra = 8;
    }

    ctx.fillStyle = "#3838389c";
    ctx.beginPath();
    ctx.ellipse(centroX, CHAO + 5, larguraSombra / 2, 5, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Player
    if(jogador.noChao === true){
        ctx.fillStyle = "#ffee00";
    }else{
        ctx.fillStyle = "#f0730d";
    }

    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    // Jump counter and state
    let estado = "no ar";

    if(jogador.noChao === true){
        estado = "no chão";
    }

    ctx.fillStyle = "#17212b";
    ctx.font = "15px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Saltos: " + saltos, 25, 35);

    ctx.font = "15px Arial";
    ctx.fillText("Estado: " + estado, 25, 62);
}

// Main game loop
function gameLoop(){
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

gameLoop();
