// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;
const CHAO = H - 100;

ctx.fillStyle = "#90e9f8";
ctx.fillRect(0, 0, W, H);

ctx.fillStyle = "#befa7a";
ctx.fillRect(0, CHAO, W, H);

function triangulo(x1, y1, x2, y2, x3, y3, cor){
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
}

// Snow
var alturaNeve = 90;
var proporcao = (alturaNeve - 30) / (CHAO - 30);
var xEsquerda = 410 - 160 * proporcao;
var xDireita = 410 + 150 * proporcao;

triangulo(0, CHAO, 180, 100, 375, CHAO, "#9b9797");
triangulo(250, CHAO, 410, 30, 560, CHAO, "#898a8a");
triangulo(xEsquerda, alturaNeve, 410, 30, xDireita, alturaNeve, "#fafdfd");

// Line
ctx.strokeStyle = "#111111";
ctx.beginPath();
ctx.moveTo(0, CHAO);
ctx.lineTo(W, CHAO);
ctx.stroke();

// Road
const estradaY = H - 45;
ctx.fillStyle = "#34383c";
ctx.fillRect(0, estradaY, W, 45);
ctx.fillStyle = "#ffffff";
for (let x = 0; x < W; x += 60) {
    ctx.fillRect(x, estradaY + 20, 30, 5);
}

function arvore(x){
    // Trunk
    ctx.fillStyle = "#975a32";
    ctx.fillRect(x - 5, CHAO - 30, 10, 30);

    // Leaves
    for(let i = 0; i < 3; i++){
        const base = CHAO - 30 - i * 18;

        triangulo(x - 25, base, x, base - 40,x + 25, base, "#137e33");
    }
}

arvore(60);
arvore(250);
arvore(420);
