// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const CHAO = H - 100;
const COR_CEU = "#101a36";

var estrelas = [];
var estrelaCor = "#ffffff";

for(let i = 0; i < 100; i++){
    var Xrandom = Math.floor(Math.random() * W);
    var Yrandom = Math.floor(Math.random() * CHAO);
    var Rrandom = Math.floor(Math.random() * 3) + 1;

    var estrela = {
        x: Xrandom,
        y: Yrandom,
        r: Rrandom,
        cor: estrelaCor
    };
    estrelas.push(estrela);
}

// Shooting star
const estrelaCadente = {
    x: 0,
    y: Math.random() * (CHAO - 100)
};

function atualizar(){

    // Star blinking
    for(const estrela of estrelas){
        if(Math.random() < 0.02){
            if(estrela.cor === "#ffffff"){
                estrela.cor = "#3c3c3d";
            }else{
                estrela.cor = "#ffffff";
            }
        }
    }

    // Shooting star movement
    estrelaCadente.x = estrelaCadente.x + 3;
    estrelaCadente.y = estrelaCadente.y + 0.45;

    if(estrelaCadente.x > W + 30){
        estrelaCadente.x = 0;
        estrelaCadente.y = Math.random() * (CHAO - 100);
    }
}

function desenhar(){

    ctx.fillStyle = COR_CEU;
    ctx.fillRect(0, 0, W, H);

    // Stars
    for(const estrela of estrelas){
        ctx.fillStyle = estrela.cor;
        ctx.beginPath();
        ctx.arc(estrela.x, estrela.y, estrela.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    // moon
    ctx.fillStyle = "#faecb2";
    ctx.beginPath();
    ctx.arc(W - 100, 80, 32, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = COR_CEU;
    ctx.beginPath();
    ctx.arc(W - 88, 68, 30, 0, 2 * Math.PI);
    ctx.fill();

    // Shooting star
    ctx.strokeStyle = "#f8b944";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(estrelaCadente.x - 30, estrelaCadente.y - 4.5);
    ctx.lineTo(estrelaCadente.x, estrelaCadente.y);
    ctx.stroke();

    // Ground
    ctx.fillStyle = "#1c2925";
    ctx.fillRect(0, CHAO, W, H - CHAO);

    // Star counter
    ctx.fillStyle = "#ffffff";
    ctx.font = "15px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Estrelas: " + estrelas.length, 25, CHAO + 35);
}

// Main game loop
function gameLoop(){
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

gameLoop();
