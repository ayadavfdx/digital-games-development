//a91403
class BolaScene extends Phaser.Scene{
    constructor(){
        super({ key : "BolaScene" });
    }

    create(){
        this.bola = this.add.circle (400, 250, 20, 0xFBBF24);
        this.vx = 4;
        this.vy = 3;

        this.mostrarRessaltos= this.add.text (20, 20, "Ressaltos:", {
            fontSize : "25px",
            color : "#ffff"
        });

        this.contador = 0;
    }
    update(){

        this.bola.x += this.vx
        this.bola.y += this.vy

        if(this.bola.x > config.width - 20 ){
            this.bola.x = config.width - 20;
            this.vx *= -1;
            this.contador ++
            this.bola.setFillStyle(Phaser.Math.Between(0x000000, 0xFFFFFF));

        }else if(this.bola.x < 0 + 20){
            this.bola.x = 0 + 20;
            this.vx *= -1;
            this.contador ++
            this.bola.setFillStyle(Phaser.Math.Between(0x000000, 0xFFFFFF));
        }

        if(this.bola.y > config.height - 20 ){
            this.bola.y = config.height - 20;
            this.vy *= -1;
            this.contador ++
            this.bola.setFillStyle(Phaser.Math.Between(0x000000, 0xFFFFFF));

        }else if(this.bola.y < 0 + 20){
            this.bola.y = 0 + 20;
            this.vy *= -1;
            this.contador ++
            this.bola.setFillStyle(Phaser.Math.Between(0x000000, 0xFFFFFF));
        }

        this.mostrarRessaltos.setText("Ressaltos: " + this.contador)
        


    }
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 500,
    backgroundColor: "#1E293B",
    scene : [BolaScene]
};

const jogo = new Phaser.Game(config);
