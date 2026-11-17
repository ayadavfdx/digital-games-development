// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;
var yPlayer = H - 60 - 70;

ctx.fillStyle = "#000000";
ctx.fillRect (0, 0, W, H);

ctx.fillStyle = "#9ae58a";
ctx.fillRect (0, H - 60, W, H);

function circulo(x ,y , r , cor){

    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

function desenharPersonagem(x, y, cor) {
    // Head
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, 40, 50);
    circulo(x + 20, y - 18, 18, cor);

    // Eyes
    circulo(x + 15, y - 15, 4, "#ffff");
    circulo(x + 30, y - 15, 4, "#ffff");

    // Legs
    ctx.fillStyle = "#646262";
    ctx.fillRect(x + 7, y + 50, 10, 20);
    ctx.fillRect(x + 27, y + 50, 10, 20);
}

desenharPersonagem(67, yPlayer, "#f8b806");
desenharPersonagem(129, yPlayer, "#59f511");
desenharPersonagem(360, yPlayer, "#c85ff1");
