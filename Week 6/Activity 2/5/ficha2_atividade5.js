// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const CHAO = H - 100;

const camadas = [
    { nome: "montanhas", fator: 0.2, offset: 0 },
    { nome: "nuvens", fator: 0.5, offset: 0 },
    { nome: "chao", fator: 1.0, offset: 0 }
];

var velocidade = 2;
var distancia = 0;
var teclas = {};

// Keyboard 
window.addEventListener("keydown", function(evento){
    if(evento.code === "ArrowLeft" || evento.code === "ArrowRight"){
        evento.preventDefault();
        teclas[evento.code] = true;
    }
});

window.addEventListener("keyup", function(evento){
    teclas[evento.code] = false;
});

window.addEventListener("blur", function(){
    teclas.ArrowLeft = false;
    teclas.ArrowRight = false;
});

function desenharMontanhas(x0){
    ctx.fillStyle = "#6B9A79";
    ctx.beginPath();
    ctx.moveTo(x0, CHAO);
    ctx.lineTo(x0 + 100, 170);
    ctx.lineTo(x0 + 200, CHAO);
    ctx.lineTo(x0 + 310, 135);
    ctx.lineTo(x0 + 420, CHAO);
    ctx.lineTo(x0 + 510, 190);
    ctx.lineTo(x0 + W, CHAO);
    ctx.closePath();
    ctx.fill();
}

function desenharNuvens(x0){
    var posicoes = [100, 300, 500];

    ctx.fillStyle = "#F8FAFC";

    for(let i = 0; i < posicoes.length; i++){
        var x = x0 + posicoes[i];
        var y = 85 + (i % 2) * 35;

        ctx.beginPath();
        ctx.arc(x - 18, y + 4, 16, 0, 2 * Math.PI);
        ctx.moveTo(x + 20, y - 12);
        ctx.arc(x, y - 8, 22, 0, 2 * Math.PI);
        ctx.moveTo(x + 40, y + 4);
        ctx.arc(x + 20, y + 4, 16, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function desenharChao(x0){
    ctx.fillStyle = "#202124";
    ctx.fillRect(x0, CHAO, W, H - CHAO);

    ctx.fillStyle = "#FACC15";

    for(let x = 0; x < W; x = x + 60){
        ctx.fillRect(x0 + x, CHAO + 55, 30, 6);
    }
}

function atualizar(){

    // Change speed
    if(teclas.ArrowRight){
        velocidade = velocidade + 0.05;
    }

    if(teclas.ArrowLeft){
        velocidade = velocidade - 0.05;
    }

    if(velocidade > 8){
        velocidade = 8;
    }else if(velocidade < 0){
        velocidade = 0;
    }

    // Move layers
    for(const camada of camadas){
        camada.offset = (camada.offset + velocidade * camada.fator) % W;
    }

    distancia = distancia + velocidade;
}

// Draw game
function desenhar(){

    // Background
    ctx.fillStyle = "#B9DFF2";
    ctx.fillRect(0, 0, W, H);

    // Parallax layers
    for(const camada of camadas){
        var primeiroX = -camada.offset;
        var segundoX = W - camada.offset;

        if(camada.nome === "montanhas"){
            desenharMontanhas(primeiroX);
            desenharMontanhas(segundoX);
        }

        if(camada.nome === "nuvens"){
            desenharNuvens(primeiroX);
            desenharNuvens(segundoX);
        }

        if(camada.nome === "chao"){
            desenharChao(primeiroX);
            desenharChao(segundoX);
        }
    }

    // Player
    ctx.fillStyle = "#C4B5FD";
    ctx.beginPath();
    ctx.arc(155, CHAO - 20, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Speed
    ctx.fillStyle = "#17212B";
    ctx.font = "19px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Velocidade: " + velocidade.toFixed(1), 25, 35);

    // Distance
    ctx.font = "17px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Distância: " + Math.floor(distancia / 10) + " m", W - 25, 35);
}

// Main game loop
function gameLoop(){
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

gameLoop();
