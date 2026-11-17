// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// Ball variables
var x = W / 2;
var y = H / 2;
const R = 20;
var dx = 4;
var dy = 3;

const cores = ["#02ffea", "#fa004b", "#f77802", "#fafafa", "#06e4ac"];
var corAtual = 0;
var ressaltos = 0; 
var pausa = false;

// Change color and count bounces
function registarRessalto(){
    corAtual++;

    if(corAtual >= cores.length){
        corAtual = 0;
    }

    ressaltos++;
}

// Update ball position
function atualizar(){
    x = x + dx;
    y = y + dy;

    // Check left and right walls
    if(x - R <= 0 || x + R >= W){
        if(x - R <= 0){
            x = R;
        }else{
            x = W - R;
        }

        dx = -dx;
        registarRessalto();
    }

    // Check top and bottom walls
    if(y - R <= 0 || y + R >= H){
        if(y - R <= 0){
            y = R;
        }else{
            y = H - R;
        }

        dy = -dy;
        registarRessalto();
    }
}

// Draw the game
function desenhar(){
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    // Draw the ball
    ctx.fillStyle = cores[corAtual];
    ctx.beginPath();
    ctx.arc(x, y, R, 0, 2 * Math.PI);
    ctx.fill();

    // Show bounce counter
    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Ressaltos: " + ressaltos, 15, 40);

    // Show pause text
    if(pausa){
        ctx.font = "80px Arial";
        ctx.textAlign = "center";
        ctx.fillText("PAUSA", W / 2, H / 2);
    }
}

// Main game loop
function gameLoop(){
    if(pausa === false){
        atualizar();
    }

    desenhar();
    requestAnimationFrame(gameLoop);
}

// Press Space to pause or resume
window.addEventListener("keydown", function(event){
    if(event.code === "Space"){
        event.preventDefault();

        if(event.repeat === false){
            if(pausa === false){
                pausa = true;
            }else{
                pausa = false;
            }
        }
    }
});

gameLoop();
