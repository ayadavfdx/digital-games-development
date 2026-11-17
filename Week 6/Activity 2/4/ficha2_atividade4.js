// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const HUD_ALTURA = 58;
const DURACAO = 30 * 60;

var alvo = { x: 0, y: 0, r: 0 };
var framesRestantes = DURACAO;
var acertos = 0;
var falhas = 0;
var terminado = false;

function reiniciar(){
    framesRestantes = DURACAO;
    acertos = 0;
    falhas = 0;
    terminado = false;
    novoAlvo();
}

function novoAlvo(){
    var Rrandom = Math.floor(Math.random() * 21) + 15;
    var Xrandom = Rrandom + Math.random() * (W - 2 * Rrandom);
    var Yrandom = HUD_ALTURA + Rrandom + Math.random() * (H - HUD_ALTURA - 2 * Rrandom);

    alvo = {
        x: Xrandom,
        y: Yrandom,
        r: Rrandom
    };
}

function desenharAlvo(){
    var cores = ["#e70909", "#fdfafa", "#f31313"];

    for(let i = 0; i < cores.length; i++){
        var raio = alvo.r * (3 - i) / 3;

        ctx.fillStyle = cores[i];
        ctx.beginPath();
        ctx.arc(alvo.x, alvo.y, raio, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function desenhar(){

    // Background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);

    // HUD
    ctx.fillStyle = "#211e77";
    ctx.fillRect(0, 0, W, HUD_ALTURA);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "17px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Acertos: " + acertos + "   Falhas: " + falhas, 22, 36);

    // Timer
    var tempo = Math.ceil(framesRestantes / 60);

    ctx.font = "19px Arial";
    ctx.textAlign = "right";

    if(tempo <= 5){
        ctx.fillStyle = "#fc0808";
    }else{
        ctx.fillStyle = "#FFFFFF";
    }

    ctx.fillText("Tempo: " + tempo, W - 22, 36);

    // Game over screen
    if(terminado === true){
        var total = acertos + falhas;
        var precisao = 0;

        if(total > 0){
            precisao = Math.round(acertos / total * 100);
        }

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";

        ctx.font = "30px Arial";
        ctx.fillText("Tempo esgotado!", W / 2, H / 2 - 40);

        ctx.font = "21px Arial";
        ctx.fillText("Acertos: " + acertos, W / 2, H / 2 + 5);
        ctx.fillText("Precisão: " + precisao + "%", W / 2, H / 2 + 35);

        ctx.font = "18px Arial";
        ctx.fillText("Clica para recomeçar", W / 2, H / 2 + 75);

    }else{
        desenharAlvo();
    }
}

// Mouse controls
canvas.addEventListener("click", function(evento){

    if(terminado === true){
        reiniciar();
        return;
    }

    var rect = canvas.getBoundingClientRect();
    var ratoX = (evento.clientX - rect.left) * W / rect.width;
    var ratoY = (evento.clientY - rect.top) * H / rect.height;

    var dx = ratoX - alvo.x;
    var dy = ratoY - alvo.y;
    var distancia = Math.sqrt(dx * dx + dy * dy);

    if(distancia < alvo.r){
        acertos++;
        novoAlvo();
    }else{
        falhas++;
    }
});

// Update timer
function atualizar(){
    if(terminado === false){
        framesRestantes = framesRestantes - 1;

        if(framesRestantes <= 0){
            framesRestantes = 0;
            terminado = true;
        }
    }
}

// Main game loop
function gameLoop(){
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

reiniciar();
gameLoop();

