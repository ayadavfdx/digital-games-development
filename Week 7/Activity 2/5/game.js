//a91403
class TurboScene extends Phaser.Scene{
    constructor(){
        super({ key : "TurboScene" })
    }

    create(){
        this.add.text (400, 300, "Setas: mover · SHIFT: turbo",{
            fontSize : "18px",
            color : "#ffff",
            fontStyle : "bold",
            fontFamily: "Arial"
        }).setOrigin(0.5);

        this.nave = this.add.rectangle (400, 460, 70, 24, 0x22D3EE);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.velocidadeBase = 5;

        this.velocidade = this.add.text (20, 60, "Velocidade: ",{
            fontSize : "18px",
            color : "#ffff",
            fontStyle : "bold",
            fontFamily: "Arial"
        });
    }
    update(){
        if(this.cursors.left.isDown){
            this.nave.x -= this.velocidadeBase;
            if(this.nave.x < 0 + 35){
                this.nave.x = 0 + 35;
            }
        }
        if(this.cursors.right.isDown){
            this.nave.x += this.velocidadeBase;
            if(this.nave.x > config.width - 35){
                this.nave.x = config.width - 35
            }
        }
        if(this.cursors.shift.isDown){
            this.velocidadeBase = 10;
            this.nave.setFillStyle(0xF97316);
        }else{
            this.velocidadeBase = 5
            this.nave.setFillStyle(0x22D3EE);
        }

        if(this.velocidadeBase === 10){
            this.velocidade.setText("Velocidade: " + this.velocidadeBase + "(TURBO)")
        }
        else{this.velocidade.setText("Velocidade: " + this.velocidadeBase)}
    }
}




const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [TurboScene]
};

const jogo = new Phaser.Game(config);
