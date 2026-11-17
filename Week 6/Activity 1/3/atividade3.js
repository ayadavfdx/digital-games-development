const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// Background

ctx.fillRect(0, 0, W, H);

// Ground
const TAM = 40;
var COL = W / TAM;

// Squares
for (let linha = 0; linha < 3; linha++) {
    for (let col = 0; col < COL; col++) {
        var x = col * TAM;
        var y = H - (linha + 1) * TAM;

        if ((linha + col) % 2 === 0) {
            ctx.fillStyle = "#f5c764";
        } else {
            ctx.fillStyle = "#b3780c";
        }

        ctx.fillRect(x, y, TAM, TAM);
        ctx.strokeStyle = "#080808";
        ctx.strokeRect(x, y, TAM, TAM);
    }
}

// Coins
let moedas = 0;
for (let i = 0; i < 10; i++) {
    if (i % 3 === 0) {
        ctx.fillStyle = "#f32424";
    } else {
        ctx.fillStyle = "#fffb01";
    }

    ctx.beginPath();
    ctx.arc(75 + i * 50, 150, 12, 0, 2 * Math.PI);
    ctx.fill();
    moedas++;
}

ctx.fillStyle = "#f8f6f6";
ctx.font = "20px arial";
ctx.fillText("Moedas: " + moedas, 10, 25);
