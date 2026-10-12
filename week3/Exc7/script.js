// a91403 
// Fernando Davila 
 
// Variables 
const VIDA_DRAGAO = 150; 
let forca = 10; 
let vida = VIDA_DRAGAO; 
 
function calcularAtaque(arma, forca){ 
 
    var forca = forca ; 
 
    if(arma == "espada"){ 
        forca *= 3; 
        return forca 
    }else if(arma == "arco"){ 
        forca *= 2; 
        return forca; 
    }else if(arma == "magia"){ 
        forca *= 4; 
        return forca; 
    }else{ 
        forca = 0; 
        return forca; 
    } 
} 
 
function eCritico(numeroTurno){ 
    if(numeroTurno % 3 == 0){ 
        return true; 
    }else{ 
        return false; 
    } 
} 
 
function estadoDragao(vida){ 
    if(vida > 60){ 
        return "Furioso"; 
    }else if(vida >= 1 && vida <= 60){ 
        return "Ferido"; 
    }else { 
        return "Derrotado"; 
    } 
} 
 
function turno(numero, vida, arma, forca){ 
 
    var ataque = calcularAtaque(arma, forca); 
    var vidaInicial = vida; 
    var critico = eCritico(numero); 
    var vidaFinal = vidaInicial - ataque; 
    var estado = estadoDragao(vidaFinal); 
    var texto = ""; 
 
    if(critico == true){ 
        ataque *= 2; 
        vidaFinal = vidaInicial - ataque; 
        texto = "Critico"; 
    } 
 
    if(vidaFinal < 0 ){ 
        vidaFinal = 0; 
    } 
 
    console.log( 
    "Turno " + numero, 
    " | " + arma, 
    " | dano " + ataque + " " + texto, 
    " | vida " + vidaInicial + " ->" + vidaFinal, 
    " | " + estado 
    ); 
 
    return vidaFinal; 
} 
 
console.log("=== Batalha contra o Dragão ==="); 
vida = turno(1, vida, "arco", forca); 
vida = turno(2, vida, "espada", forca); 
vida = turno(3, vida, "magia", forca); 
vida = turno(4, vida, "pedra", forca); 
vida = turno(5, vida, "espada", forca);