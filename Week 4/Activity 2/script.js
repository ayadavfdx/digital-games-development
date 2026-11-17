// a91403
// Fernando Davila

let projeteis = [];

projeteis.push("seta");
projeteis.push("bola de fogo");
projeteis.push("seta");

var removido = projeteis.pop();

console.log(
    "No ecra: "+ projeteis.length,
    "\nRemovido: " + removido,
    "\nNo ecra: "+ projeteis.length,
    "\nUltimo: " + projeteis[projeteis.length - 1],
);

