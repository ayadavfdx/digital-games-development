// a91403 
// Fernando Davila 
 
// Variables 
const PONTOS_MOEDA = 10; 
const PONTOS_INIMIGO = 50; 
 
let jogador = "Jogador 1"; 
let moedas = 35; 
let inimigos = 12; 
let segundos = 95; 
 
function calcularPontos(moedas, inimigos){ 
    var pontos = (moedas * PONTOS_MOEDA) + (inimigos * PONTOS_INIMIGO); 
    return pontos; 
} 
 
function bonusTempo(segundos){ 
 
    var pontos = 0 
 
    if(segundos < 0){ 
        return 0 
    }else if(segundos >= 0 && segundos <= 60){ 
        pontos = 500; 
        return pontos; 
    }else if(segundos > 60 && segundos <= 120){ 
        pontos = 200; 
        return pontos 
    }else{ 
        pontos = 0; 
        return pontos; 
    } 
} 
 
function atribuirMedalha(pontuacao){ 
    var getPontuacao = pontuacao; 
 
    if(getPontuacao >= 2000){ 
        return "Ouro"; 
    }else if(getPontuacao >= 1000){ 
        return "Prata"; 
    }else if(getPontuacao >= 500){ 
        return "Bronze"; 
    }else{ 
        return "Sem medalha"; 
    } 
} 
 
function formatarTempo(segundos){ 
    var formatarMinutos = Math.trunc(segundos / 60); 
    var formatarSegundos = segundos % 60; 
 
    var tempo = formatarMinutos + "min" + " " + formatarSegundos + "s"; 
 
    return tempo; 
} 
 
var mostrarTempo = formatarTempo(segundos); 
var mostrarPontos = calcularPontos(moedas, inimigos); 
var mostrarBonus = bonusTempo(segundos); 
var mostrarPontosTotais = mostrarPontos + mostrarBonus; 
var mostrarMedalha = atribuirMedalha(mostrarPontosTotais); 
 
console.log("=== Fim de Partida ===", 
 
    "\nJogador : ", jogador, 
    "\nTempo   : ", mostrarTempo, 
    "\nPontos  : ", mostrarPontos + " + " + mostrarBonus + " de bonus = " + 
mostrarPontosTotais, 
    "\nMedalha : ", mostrarMedalha 
);