// a91403
// Fernando Davila

/*
GDD: Salta-Caixas é um jogo de reflexos onde o jogador salta por cima
de obstáculos que vêm na sua direção. O objetivo é fazer a maior pontuação possível.
O jogador perde quando toca num obstáculo.
O desafio aumenta porque os obstáculos vêm cada vez mais depressa.
*/

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const CHAO = H - 100;
const GRAVIDADE = 0.6;
const FORCA_SALTO = -12;

const jogador = {
    x: 80,
    y: CHAO - 40,
    w: 40,
    h: 40,
    vy: 0,
    noChao: true
};

var obstaculos = [];
var framesAteProximo = 0;
var velocidade = 4;
var pontos = 0;
var recorde = 0;
var novoRecorde = false;
var gameOver = false;

function intervaloAleatorio(){
    return Math.floor(Math.random() * 61) + 60;
}

function reiniciar(){
    jogador.y = CHAO - jogador.h;
    jogador.vy = 0;
    jogador.noChao = true;

    obstaculos = [];
    framesAteProximo = intervaloAleatorio();
    velocidade = 4;
    pontos = 0;
    novoRecorde = false;
    gameOver = false;
}

function criarObstaculo(){
    var largura = Math.floor(Math.random() * 21) + 20;
    var altura = Math.floor(Math.random() * 41) + 30;

    var obstaculo = {
        x: W,
        y: CHAO - altura,
        w: largura,
        h: altura
    };

    obstaculos.push(obstaculo);
}

function colide(a, b){
    if(a.x >= b.x + b.w){
        return false;
    }

    if(a.x + a.w <= b.x){
        return false;
    }

    if(a.y >= b.y + b.h){
        return false;
    }

    if(a.y + a.h <= b.y){
        return false;
    }

    return true;
}

// Keyboard 
window.addEventListener("keydown", function(evento){
    if(evento.code === "Space" || evento.code === "ArrowUp"){
        evento.preventDefault();
    }

    if(evento.repeat){
        return;
    }

    if(gameOver === true){
        if(evento.code === "Space"){
            reiniciar();
        }
        return;
    }

    if(evento.code === "Space" || evento.code === "ArrowUp"){
        if(jogador.noChao === true){
            jogador.vy = FORCA_SALTO;
            jogador.noChao = false;
        }
    }
});

function atualizar(){
    if(gameOver === true){
        return;
    }

    // Gravity
    jogador.vy = jogador.vy + GRAVIDADE;
    jogador.y = jogador.y + jogador.vy;

    if(jogador.y + jogador.h >= CHAO){
        jogador.y = CHAO - jogador.h;
        jogador.vy = 0;
        jogador.noChao = true;
    }else{
        jogador.noChao = false;
    }

    // New obstacles
    framesAteProximo = framesAteProximo - 1;

    if(framesAteProximo <= 0){
        criarObstaculo();
        framesAteProximo = intervaloAleatorio();
    }

    // Move obstacles
    for(let i = obstaculos.length - 1; i >= 0; i--){
        var obstaculo = obstaculos[i];
        obstaculo.x = obstaculo.x - velocidade;

        if(colide(jogador, obstaculo)){
            gameOver = true;

            if(pontos > recorde){
                recorde = pontos;
                novoRecorde = true;
            }

            return;
        }

        if(obstaculo.x + obstaculo.w < 0){
            obstaculos.splice(i, 1);
            pontos = pontos + 1;

            if(pontos % 5 === 0){
                velocidade = velocidade + 0.5;
            }
        }
    }
}


function desenhar(){
    // Background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);

    // Ground line
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, CHAO, W, 4);

    // Player
    ctx.fillStyle = "#39FF14";
    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    // Obstacles
    ctx.fillStyle = "#FFFFFF";

    for(const obstaculo of obstaculos){
        ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.w, obstaculo.h);
    }

    // HUD
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Pontos: " + pontos, 25, 35);

    ctx.textAlign = "right";
    ctx.fillText("Recorde: " + recorde, W - 25, 35);

    // Game over
    if(gameOver === true){
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, W, H);

        ctx.textAlign = "center";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "80px Arial";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 50);

        ctx.font = "28px Arial";
        ctx.fillText("Pontuação: " + pontos, W / 2, H / 2 + 15);

        if(novoRecorde === true){
            ctx.fillStyle = "#A855F7";
            ctx.fillText("NOVO RECORDE!", W / 2, H / 2 + 55);
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "22px Arial";
        ctx.fillText("Espaço para recomeçar", W / 2, H / 2 + 95);
    }
}

// Main loop
function gameLoop(){
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

reiniciar();
gameLoop();