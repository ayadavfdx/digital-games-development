//a91403
class TabuleiroScene extends Phaser.Scene{
    constructor(){
        super({ key : "TabuleiroScene" });
    }

    create(){
        this.add.text (400, 30, "TABULEIRO", {
            fontSize : "28px",
            color : "#FBBF24",
            fontStyle : "blond"
        }).setOrigin(0.5)

        this.pecas = 0;

        for(let i = 0; i < 8; i ++){
            for(let j = 0; j < 8; j ++){

                if ((i + j) % 2 === 1) {
                    this.cor = 0x334155;
                } else {
                    this.cor = 0xF1F5F1;
                }

                this.tabuleiro = this.add.rectangle (
                    225 + j *50, 
                    95 + i *50, 
                    50, 
                    50, 
                    this.cor);
                
                if ((i + j) % 2 === 1 && i < 3){
                    this.peca = this.add.circle (
                        225 + j *50, 
                        95 + i *50, 
                        18, 
                        0xEF4444)
                    this.pecas++;
                }
            }
        }

        this.add.text (700, 270, "Peças: " + this.pecas, {
            fontSize : "28px",
            color : "#FBBF24",
            fontStyle : "blond"
        }).setOrigin(0.5)

        this.add.rectangle(400, 270, 400, 400).setStrokeStyle(4, 0xFBBF24);
    }
    update(){}
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 500,
    backgroundColor: "#1E293B",
    scene : [TabuleiroScene]
}

const jogo = new Phaser.Game(config);
