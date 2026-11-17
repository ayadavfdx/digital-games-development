// ═══════════════════════════════════════════════════════════════
// Desenvolvimento de Jogos Digitais · LEEC · ISE/UAlg
// Ficha · Arena de Treino — JavaScript e DOM
//  Fernando Davila
//  a91403
// ═══════════════════════════════════════════════════════════════
// Completa o código de cada tarefa. As tarefas são independentes.
// Se uma tarefa tiver um erro, as seguintes param — vê a consola (F12).

// ── Tarefa 1 · Barra de vida ─────────────────────────────────────
// Variável vida, função desenharBarra() e botões Dano / Poção.
let vida = 100;
let barraVida = document.getElementById("barra-vida");
let vidaTexto = document.getElementById("vida-texto");
let btnDano = document.getElementById("btn-dano");
let btnPocao = document.getElementById("btn-pocao");

function desenharBarra() {
    barraVida.style.width = vida + "%";
    vidaTexto.innerHTML = "HP: " + vida + "/100";

    if(vida >= 60){
        barraVida.style.backgroundColor = "#22C55E";
    } else if(vida >= 30){
        barraVida.style.backgroundColor = "#F59E0B";
    } else{
        barraVida.style.backgroundColor = "#EF4444";
    }

}
desenharBarra();

btnDano.addEventListener("click", function() {
    vida -= 10;
    if(vida < 0) vida = 0;
    desenharBarra();
    });

btnPocao.addEventListener("click", function() {
    vida += 10;
    if(vida > 100) vida = 100;
    desenharBarra();
    });


// ── Tarefa 2 · Abrir e fechar o inventário ───────────────────────
// Botão que abre e fecha o painel do inventário (toggle + contains).
let btnInventario = document.getElementById("btn-inventario");
let painelInventario = document.getElementById("painel-inventario");

btnInventario.addEventListener("click" , function(){
    painelInventario.classList.toggle("escondido");

    if(painelInventario.classList.contains("escondido")){
        btnInventario.innerHTML = "🎒 Abrir inventário";
    }else {
        btnInventario.innerHTML = "🎒 Fechar inventário";
    }
});

// ── Tarefa 3 · Mover o herói com as setas ────────────────────────
// Setas ← → movem o herói entre 0 e 360 px.
let posicao = 0;
let heroi = document.getElementById("heroi");
let posicaoTexto = document.getElementById("posicao-texto");

document.addEventListener("keydown", function(event){
    if(event.key === "ArrowRight"){
        posicao += 20;

        if(posicao > 360){
            posicao = 360;
        }}

    if(event.key === "ArrowLeft"){
        posicao -= 20;

        if(posicao < 0){
            posicao = 0;
        }
    }

    heroi.style.left = posicao + "px";
    posicaoTexto.innerHTML = "Posição: " + posicao;
});


// ── Tarefa 4 · Nome do herói ─────────────────────────────────────
// Evento input: saudação com o nome e contador de caracteres.
let nomeInput = document.getElementById("nome-input");
let saudacao = document.getElementById("saudacao");
let contador = document.getElementById("contador"); 


nomeInput.addEventListener("input", function(){
    let nome = nomeInput.value;
    if(nome === ""){
        saudacao.innerHTML = "Escreve o nome do herói";
    }else{
        saudacao.innerHTML = "Olá, " + nome + "! Pronto para a aventura?"
    }

    let nomeChars = nomeInput.value.length;
    contador.innerHTML = nomeChars + "/12"
    if(nomeChars >= 10){
        contador.classList.add("aviso");
    }else{
        contador.classList.remove("aviso");
    }

})

// ── Tarefa 5 · Lista do inventário a partir de um array ──────────
// Função mostrarInventario() a partir do array + botão Apanhar Elmo.
let inventario = [
    { nome: "Espada", valor: 150 },
    { nome: "Escudo", valor: 80 },
    { nome: "Poção",  valor: 25 }
];

let listaItems = document.getElementById("lista-itens");
let totalItens = document.getElementById("total-itens");
let btnApanha = document.getElementById("btn-apanhar");

function mostrarInventario(){
    let total = 0;
    listaItems.innerHTML = "";

    for(let itens of inventario){
        listaItems.innerHTML += "<li>" + itens.nome + " — " + itens.valor + " moedas" +"</li>";

        total += itens.valor;
    }

    totalItens.innerHTML = inventario.length + " itens · valor total: " + total;
}

mostrarInventario();

btnApanha.addEventListener("click", function(){
    inventario.push({ nome: "Elmo", valor: 200 });
    mostrarInventario();
    btnApanha.style.display = "none";
}, {once: true});


// ── Tarefa 6 · Caça ao tesouro ───────────────────────────────────
// Ciclo for com eventos de clique nos 9 baús.
let tesouro    = Math.floor(Math.random() * 9);   // posição do tesouro (0 a 8)
let tentativas = 3;
let terminado  = false;
let tesouroEstado = document.getElementById("tesouro-estado");

for (let i = 0; i < 9; i++){
    let bau = document.getElementById("bau-" + i)

    bau.addEventListener("click", function(){
        if(bau.classList.contains("aberto") || terminado){
            return;
        }else {bau.classList.add("aberto");}

        if(i === tesouro){
            bau.innerHTML = "💰";
            tesouroEstado.innerHTML = "Encontraste o tesouro! 🎉";
            terminado = true;
        }else {
            bau.innerHTML = "❌";
            tentativas -= 1;
            tesouroEstado.innerHTML = "Vazio! Tentativas restantes: " + tentativas;
        }

        if(tentativas === 0){
            terminado = true;

            tesouroEstado.innerHTML = "Sem tentativas! O tesouro estava no baú " + (tesouro + 1);
            let bauTesouro = document.getElementById("bau-" + tesouro);
            bauTesouro.innerHTML = "💰";
            bauTesouro.classList.add("aberto");
        }
    });
}
