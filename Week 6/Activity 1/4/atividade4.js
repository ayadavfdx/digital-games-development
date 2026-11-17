
// a91403
// Fernando Davila

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

var hp = 70;
const HP_MAX = 100;
var vidas = 3;
var pontos = 1250;

function desenharHUD(){
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, W, H);

    // HP
    if(hp > 50){
        ctx.fillStyle = "#56f85b";
    }else if(hp > 25){
        ctx.fillStyle = "#e6d058";
    }else{
        ctx.fillStyle = "#e01e1b";
    }

    ctx.fillRect(20, 20, hp / HP_MAX * 200, 20);
    ctx.strokeStyle = "white";
    ctx.strokeRect(20, 20, 200, 20);

    // Hp Text
    ctx.fillStyle = "white";
    ctx.font = "20px arial";
    ctx.textAlign = "left";
    ctx.fillText("HP " + hp + "/" + HP_MAX, 235, 38);

    // Create circles
    for(let i = 0; i < vidas; i++){
        ctx.beginPath();
        ctx.arc(30 + i * 30, 70, 10, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Score
    ctx.textAlign = "right";
    ctx.fillText("Pontos: " + pontos, W - 20, 36);

    // Game Over
    if(vidas === 0){
        ctx.textAlign = "center";
        ctx.font = "80px arial";
        ctx.fillText("GAME OVER", W / 2, H / 2);
    }
}

// Keyboard
window.addEventListener("keydown", function(evento){

    if(vidas === 0){
        return;
    }

    const tecla = evento.key.toLowerCase();

    // D - Damage
    if(tecla === "d"){
        hp = hp - 10;

        if(hp <= 0){
            hp = HP_MAX;
            vidas--;
        }
    }

    // C - Cure
    else if(tecla === "c"){
        hp = hp + 10;

        if(hp > HP_MAX){
            hp = HP_MAX;
        }
    }

    else{
        return;
    }

    desenharHUD();
});

desenharHUD();
