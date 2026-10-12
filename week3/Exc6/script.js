// a91403 
// Fernando Davila 
 
// Variables 
const LARGURA = 800;     // largura do ecrã 
const TAMANHO = 50;      // largura do jogador e da moeda 
const VELOCIDADE = 20;   // píxeis por passo 
 
let xMoeda = 80; 
let x = 10; 
 
function moverX(x, direcao){ 
    if(direcao == "direita"){ 
        x += VELOCIDADE; 
        return x; 
    }else if(direcao == "esquerda"){ 
        x -= VELOCIDADE; 
        return x; 
    }else{ 
        return x; 
    } 
} 
 
function limitarAoEcra(x){ 
    if(x < 0){ 
        return 0; 
    }else if(x > LARGURA - TAMANHO){ 
        return 750; 
    }else{ 
        return x; 
    } 
} 
 
function colidiu(xJogador, xMoeda){ 
     
    var distancia = xJogador - xMoeda; 
 
    if(distancia < 0){ 
        distancia = -(distancia); 
 
    if(distancia < TAMANHO){ 
        return true; 
    }else{ 
        return false; 
    } 
} 
} 
 
function passo(numero, x, direcao, xMoeda){ 
 
    var xInicial = x; 
    var andar = moverX(x,direcao); 
    var resultadoAndar = limitarAoEcra(andar) 
    var mostrarColisaoMoeda = "" 
 
    if(colidiu(resultadoAndar,xMoeda) == true) { 
        mostrarColisaoMoeda = "Moeda apanhada" 
    } 
 
    console.log( 
    "Passo " + numero, 
    " | " + direcao, 
    " | x: " + xInicial + "->" + resultadoAndar, 
    " | ", mostrarColisaoMoeda 
    ); 
 
    return resultadoAndar; 
} 
 
x = passo(1, x, "esquerda", xMoeda); 
x = passo(2, x, "direita", xMoeda); 
x = passo(3, x, "direita", xMoeda); 
x = passo(4, x, "esquerda", xMoeda); 
x = passo(5, x, "saltar", xMoeda); 
console.log(limitarAoEcra(751)); 
console.log(colidiu(30,80));