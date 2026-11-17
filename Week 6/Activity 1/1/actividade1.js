// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

ctx.fillStyle = "#7ccaf7";
ctx.fillRect (0, 0, W, H);
ctx.fillStyle = "#aff786";
ctx.fillRect (0, H-80, W, H);

ctx.fillStyle = "#f1f363";
ctx.beginPath ();
ctx.arc(W - 80, 60, 40, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = "#f7c170";
ctx.fillRect (100, H - 80 - 120, 150, 120);
ctx.strokeRect(120, H - 160, 30, 30);
ctx.fillStyle = "#7a3605";
ctx.fillRect(180, H - 80 - 60, 40, 60);
