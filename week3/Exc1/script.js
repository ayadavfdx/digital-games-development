// a91403 
// Fernando Davila 

let forca = 15; 
nivelArma = 3; 
critico = true; 

function calcularDano(forca, nivelArma, critico){ 
    var danoBase = forca * nivelArma; 
    var danoFinal = 0; 

    if(critico == true){ 
        danoBase *= 2; 
        danoFinal = danoBase; 
        console.log("Dano causado:", danoFinal); 
    }else if(critico == false){ 
        danoFinal = danoBase; 
        console.log("Dano causado:", danoFinal) 
    } 
} 

console.log(calcularDano(10,2,false)); 
console.log(calcularDano(20,5,true)); 
console.log(calcularDano(8,4,false)); 