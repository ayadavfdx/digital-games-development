// a91403 
// Fernando Davila 
 
// Variables 
var nomeInimigo = "Goblin"; 
var vidaInimigo = 30; 
var forca = 12 ; 
var defesa = 4; 
var critico = true; 
var dano = calcularDano(forca, defesa, critico); 
 
function calcularDano(forca, defesa, critico){ 
    var danoBase = forca - defesa; 
    var danoFinal = 0; 
 
    if(danoBase <= 0){ 
        danoBase = 1; 
        return danoBase; 
    } 
    if(critico == true && danoBase > 0){ 
        danoBase *= 2; 
        danoFinal = danoBase; 
        return danoFinal; 
    }else{ 
        danoFinal = danoBase; 
        return danoFinal; 
    } 
} 
 
function aplicarDano(vidaAtual, dano){ 
    var vida = vidaAtual; 
    vida -= dano; 
    if(vida < 0){ 
        vida = 0; 
    } 
    return vida; 
} 
 
function verificarEstado(vida){ 
    if(vida > 0){ 
        return "Vivo"; 
    } else if (vida <= 0){ 
        return "Derrotado"; 
    } 
} 
 
function relatorioCombate(nomeInimigo, vidaInicial, vidaFinal, dano, critico){ 
 
    dizerCritico = ""; 
 
    if(critico == true){ 
        dizerCritico = "Critico!"; 
    }else{ 
        dizerCritico = "Sem Critico"; 
    } 
 
    console.log("=== Relatório de Combate ===",  
"\nInimigo:",  nomeInimigo,  
"\nVida    :",  vidaInicial + "->" + aplicarDano(vidaInicial, dano),  
"\nDano    :",  dano + " " + dizerCritico, 
"\nEstado  :",verificarEstado(vidaFinal) 
); 
} 
 
relatorioCombate(nomeInimigo,vidaInimigo,vidaInimigo,dano, critico);