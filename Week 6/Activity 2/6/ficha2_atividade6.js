// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const raquete = {
    x: W / 2 - 50,
    y: H - 30,
    w: 100,
    h: 12,
    vel: 7
};

const bola = {
    x: W / 2,
    y: H / 2,
    r: 10,
    dx: 0,
    dy: 0
};

const teclas = {};
var pontos = 0;
var vidas = 3;
var velocidadeBola = 6;
var gameOver = false;

function lancarBola(){
    bola.x = W / 2;
    bola.y = H / 2;
    bola.dx = velocidadeBola * 0.5;
    bola.dy = -Math.sqrt(velocidadeBola * velocidadeBola - bola.dx * bola.dx);
}

function reiniciar(){
    pontos = 0;
    vidas = 3;
    velocidadeBola = 6;
    gameOver = false;
    raquete.x = W / 2 - raquete.w / 2;
    lancarBola();
}

// Keyboard 
window.addEventListener("keydown", function(evento){
    if(evento.code === "ArrowLeft" || evento.code === "ArrowRight"){
        evento.preventDefault();
        teclas[evento.code] = true;
    }

    if(evento.code === "Enter"){
        if(gameOver === true){
            reiniciar();
        }
    }
});

window.addEventListener("keyup", function(evento){
    teclas[evento.code] = false;
});

window.addEventListener("blur", function(){
    teclas.ArrowLeft = false;
    teclas.ArrowRight = false;
});

// Update game
function atualizar(){
    if(gameOver === true){
        return;
    }

    // Paddle movement
    if(teclas.ArrowLeft){
        raquete.x = raquete.x - raquete.vel;
    }

    if(teclas.ArrowRight){
        raquete.x = raquete.x + raquete.vel;
    }

    if(raquete.x < 0){
        raquete.x = 0;
    }else if(raquete.x + raquete.w > W){
        raquete.x = W - raquete.w;
    }

    // Ball movement
    var yAnterior = bola.y;
    bola.x = bola.x + bola.dx;
    bola.y = bola.y + bola.dy;

    // Wall collisions
    if(bola.x - bola.r <= 0){
        bola.x = bola.r;
        bola.dx = Math.abs(bola.dx);
    }

    if(bola.x + bola.r >= W){
        bola.x = W - bola.r;
        bola.dx = -Math.abs(bola.dx);
    }

    if(bola.y - bola.r <= 0){
        bola.y = bola.r;
        bola.dy = Math.abs(bola.dy);
    }

    // Paddle collision
    if(bola.dy > 0 &&
       yAnterior + bola.r <= raquete.y &&
       bola.y + bola.r >= raquete.y &&
       bola.x + bola.r >= raquete.x &&
       bola.x - bola.r <= raquete.x + raquete.w){

        bola.y = raquete.y - bola.r;
        pontos++;

        if(pontos % 5 === 0){
            velocidadeBola = velocidadeBola * 1.1;
        }

        var centro = raquete.x + raquete.w / 2;
        var impacto = (bola.x - centro) / (raquete.w / 2);

        if(impacto < -1){
            impacto = -1;
        }else if(impacto > 1){
            impacto = 1;
        }

        bola.dx = impacto * 5 * (velocidadeBola / 6);
        bola.dy = -Math.sqrt(velocidadeBola * velocidadeBola - bola.dx * bola.dx);
    }

    // Check lives
    if(bola.y - bola.r > H){
        vidas--;

        if(vidas <= 0){
            gameOver = true;
        }else{
            lancarBola();
        }
    }
}

function desenhar(){

    // Background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);

    // Score and lives
    ctx.fillStyle = "#fcfcfc";
    ctx.font = "22px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Pontos: " + pontos, 25, 35);

    ctx.font = "22px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Vidas: " + vidas, W - 25, 35);

    // Paddle
    ctx.fillStyle = "#49f591";
    ctx.fillRect(raquete.x, raquete.y, raquete.w, raquete.h);

    // Ball
    ctx.fillStyle = "#f507ae";
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.r, 0, 2 * Math.PI);
    ctx.fill();

    // Game over screen
    if(gameOver === true){
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";

        ctx.font = "90px Arial";
        ctx.fillText("GAME OVER", W / 2, H / 2 - 35);

        ctx.font = "22px Arial";
        ctx.fillText("Pontuação: " + pontos, W / 2, H / 2 + 10);

        ctx.font = "15px Arial";
        ctx.fillText("Enter para recomeçar", W / 2, H / 2 + 50);
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
