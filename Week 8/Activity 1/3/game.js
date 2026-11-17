const CEL = 64;
const COLS = 10;
const LINHAS = 7;

class RoboScene extends Phaser.Scene {
    constructor(){
        super({ key : "RoboScene" })
    }

    create (){
        const inicioX = (800 - COLS * CEL) / 2;
        const inicioY = 72;

        for(let i = 0; i < LINHAS; i++){
            for(let j = 0; j < COLS; j++){

                var x = inicioX + j * CEL + CEL / 2;
                var y = inicioY + i * CEL + CEL / 2;

                this.add.rectangle(x, y, CEL, CEL)
                    .setStrokeStyle(3, 0xFFFFFF);
            }
        }

        this.linRobo = 0;
        this.colRobo = 0;

        var posicao = this.centroDe(this.colRobo, this.linRobo);
        this.robo = this.add.rectangle (
            posicao.x, posicao.y, 48, 48, 0x11E63E);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.estrela = this.add.circle (0, 0, 16, 0xFACC15);
        this.moverEstrela ();

        this.movimentoTxt = this.add.text (20, 20 ,"Movimientos: ");
        this.estrelaTxt = this.add.text (20, 38, "Estrelas: ");
        this.mov = 0;
        this.estrelas = 0;
    }

    centroDe(col, lin){
        var x = (800 - COLS * CEL) / 2 + col * CEL + CEL / 2;
        var y = 72 + lin * CEL + CEL / 2;

        return { x, y };
    }

    moverEstrela(){
        this.estrelaCol = Phaser.Math.Between(0, COLS - 1);
        this.estrelaLin = Phaser.Math.Between(0, LINHAS - 1);

        if(this.estrelaCol === this.colRobo && this.estrelaLin === this.linRobo){
            this.estrelaCol = (this.estrelaCol + 1) % COLS;
        }

        var posicao = this.centroDe(this.estrelaCol, this.estrelaLin);
        this.estrela.setPosition(posicao.x, posicao.y);
    }

    update (){

    var colAnterior = this.colRobo;
    var linAnterior = this.linRobo;
    var movAnterior = this.mov;

    if(Phaser.Input.Keyboard.JustDown(this.cursors.right)){
        this.colRobo++;
        this.mov++;
    }

    if(Phaser.Input.Keyboard.JustDown(this.cursors.left)){
        this.colRobo--;
        this.mov++;
    }

    if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
        this.linRobo--;
        this.mov++;
    }

    if(Phaser.Input.Keyboard.JustDown(this.cursors.down)){
        this.linRobo++;
        this.mov++;
    }

    this.linRobo = Phaser.Math.Clamp(this.linRobo, 0, LINHAS - 1);
    this.colRobo = Phaser.Math.Clamp(this.colRobo, 0, COLS -1);

    this.mov = movAnterior +
        Math.abs(this.colRobo - colAnterior) +
        Math.abs(this.linRobo - linAnterior);

    var posicao = this.centroDe(this.colRobo, this.linRobo);

    this.robo.setPosition(posicao.x, posicao.y);
    if(this.colRobo === this.estrelaCol && this.linRobo === this.estrelaLin){
        this.estrelas ++;
        this.moverEstrela();
    }

    this.movimentoTxt.setText("Movimentos: " + this.mov);
    this.estrelaTxt.setText("Estrelas: " + this.estrelas);

    }
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height: 540,
    backgroundColor : "#1E293B",
    scene : [RoboScene]
}

const jogo = new Phaser.Game(config);