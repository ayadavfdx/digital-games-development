class NaveScene extends Phaser.Scene {
    constructor(){
        super({ key : "NaveScene" })
    }

    create(){
        var grafico = this.add.graphics();

        grafico.fillStyle(0x3AE2F6);
        grafico.fillTriangle(0,0, 40,20, 0, 30);

        grafico.generateTexture("nave", 40, 30);
        grafico.destroy();

        this.nave = this.physics.add.sprite(400, 250, "nave");

        this.input.on("pointerdown", (pointer) => {

            this.destinoX = pointer.worldX;
            this.destinoY = pointer.worldY;

            if(this.circulo){
                this.circulo.destroy();
            }

            this.circulo = this.add.circle(this.destinoX, this.destinoY, 12)
                .setStrokeStyle(2, 0xFACC15);

            this.physics.moveTo(
                this.nave,
                this.destinoX,
                this.destinoY,
                250
            );

            var angulo = Phaser.Math.Angle.Between(
                this.nave.x,
                this.nave.y,
                this.destinoX,
                this.destinoY
            );

            this.nave.setRotation(angulo);
        });
    }
    update(){
        if(this.destinoX !== undefined && this.destinoY !== undefined){

            var distancia = Phaser.Math.Distance.Between(
                this.nave.x,
                this.nave.y,
                this.destinoX,
                this.destinoY
            );

            if(distancia < 5){
                this.nave.body.reset(this.destinoX, this.destinoY);
                this.circulo.setVisible(false);
            }
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height : 500,
    backgroundColor : "#1E293B",
    scene : [NaveScene],
    physics : {
        default : "arcade",
        arcade : {
            gravity : { y : 0 },
            debug : false
        }
    }
}

const jogo = new Phaser.Game(config);
