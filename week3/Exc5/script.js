// a91403 
// Fernando Davila 
 
// Variables 
 
function calcularPreco(precoBase, nivel){ 
 
    var desconto = 0; 
 
    if(nivel >= 10){ 
        desconto = 20; 
        return (precoBase) - ((precoBase) * desconto)/100; 
    }else if(nivel >= 5 && nivel <= 9){ 
        desconto = 10; 
        return (precoBase) - ((precoBase) * desconto)/100; 
    }else if(nivel < 5){ 
        return precoBase; 
    } 
} 
 
function podeComprar(moedas, preco){ 
    if(moedas == preco || moedas > preco){ 
        return true; 
    }else{ 
        return false; 
    } 
} 
 
function moedasEmFalta(moedas, preco){ 
    var devolverMoedas = preco - moedas 
    if(devolverMoedas < 0){ 
        return 0; 
    }else{ 
        return devolverMoedas; 
    } 
     
} 
 
function comprar(nomeitem, precoBase, moedas, nivel){ 
 
    if(typeof moedas !== "number"){ 
        console.log("Erro: moedas deve ser um numero"); 
        return; 
    } 
 
    var mostrarPrecoFinal = calcularPreco(precoBase, nivel); 
    var mostrarMoedasEmFalta = moedasEmFalta(moedas, mostrarPrecoFinal); 
    var moedasRestantes = moedas - mostrarPrecoFinal; 
    var resultado = podeComprar(moedas, mostrarPrecoFinal); 
 
    if(resultado == true){ 
        console.log("===Loja===",  
        "\nItem      : ",  nomeitem, 
        "\nPreco     : ",  precoBase + "->" + mostrarPrecoFinal, 
        "\nMoedas    : ",  moedas, 
        "\nResultado : ",  "Compra feita Restam " + moedasRestantes + " moedas" 
    ); 
    }else{ 
        console.log("===Loja===",  
        "\nItem      : ",  nomeitem, 
        "\nPreco     : ",  precoBase + "->" + mostrarPrecoFinal, 
        "\nMoedas    : ",  moedas, 
        "\nResultado : ",  "Faltam " + mostrarMoedasEmFalta + " moedas"); 
    } 
} 
 
comprar("Espada de Fogo",  250, 300, 7); 
comprar("Espada de Fogo",  250, 200, 2); 
comprar("Espada de Fogo",  250, 200, 12); 
comprar("Poção",  50, "100",  1);