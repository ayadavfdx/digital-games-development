// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

// Player and coin variables
const jogador = {
    x: W / 2 - 20,
    y: H / 2 - 20,
    w: 40,
    h: 40,
    vel: 4
};

const moeda = {
    x: 0,
    y: 0,
    tam: 20
};

const teclas = {};
let pontos = 0;

// Check pressed keys
window.addEventListener("keydown", function(e){
    teclas[e.key] = true;

    if(e.key.startsWith("Arrow")){
        e.preventDefault();
    }
});

window.addEventListener("keyup", function(e){
    teclas[e.key] = false;
});

// Create a coin in a random position
function novaMoeda(){
    moeda.x = Math.random() * (W - moeda.tam);
    moeda.y = Math.random() * (H - moeda.tam);
}

// Check collision 
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

// Update player movement
function atualizar(){

    // Move with arrow keys
    if(teclas.ArrowLeft){
        jogador.x = jogador.x - jogador.vel;
    }

    if(teclas.ArrowRight){
        jogador.x = jogador.x + jogador.vel;
    }

    if(teclas.ArrowUp){
        jogador.y = jogador.y - jogador.vel;
    }

    if(teclas.ArrowDown){
        jogador.y = jogador.y + jogador.vel;
    }

    // Keep the player inside the canvas
    if(jogador.x < 0){
        jogador.x = 0;
    }else if(jogador.x + jogador.w > W){
        jogador.x = W - jogador.w;
    }

    if(jogador.y < 0){
        jogador.y = 0;
    }else if(jogador.y + jogador.h > H){
        jogador.y = H - jogador.h;
    }

    // Check if the player catches a coin
    const areaMoeda = {
        x: moeda.x,
        y: moeda.y,
        w: moeda.tam,
        h: moeda.tam
    };

    if(colide(jogador, areaMoeda)){
        pontos++;
        novaMoeda();
    }
}

// Draw the game
function desenhar(){
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    // Draw the player
    ctx.fillStyle = "#8B5CF6";
    ctx.fillRect(jogador.x, jogador.y, jogador.w, jogador.h);

    // Draw the coin
    ctx.fillStyle = "#F97316";
    ctx.beginPath();
    ctx.arc(moeda.x + moeda.tam / 2, moeda.y + moeda.tam / 2, moeda.tam / 2, 0, 2 * Math.PI);
    ctx.fill();

    // Show the score
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Moedas: " + pontos, W - 25, 35);
}

// Main game loop
function gameLoop(){
    atualizar();
    desenhar();
    requestAnimationFrame(gameLoop);
}

novaMoeda();
gameLoop();