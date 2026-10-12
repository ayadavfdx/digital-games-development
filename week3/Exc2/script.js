// a91403 
// Fernando Davila 

function calcularNivel(pontos) { 
  if (pontos < 0) { 
    return "Negative lvls does not exists"; 
  } else if (pontos == 0 || pontos <= 499) { 
    return "Nivel 1 -- Recruta"; 
  } else if (pontos <= 500 || pontos <= 999){ 
    return "Nivel 2 -- Soldado"; 
  } else if (pontos <= 1000 || pontos <= 2999){ 
    return "Nivel 3 -- Veterano"; 
  } else if (pontos >= 3000){ 
    return "Nivel 4 -- Lenda"; 
  }  
} 

console.log(calcularNivel(250)); 
console.log(calcularNivel(750)); 
console.log(calcularNivel(1500)); 
console.log(calcularNivel(5000));