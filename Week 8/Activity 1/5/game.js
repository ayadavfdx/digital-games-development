
class Jogador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textura, teclas){
        super(scene, x, y, textura);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.teclas = teclas;
        this.velocidade = 220;
    }

    mover(){
        this.setVelocity(0, 0);

        if(this.teclas.cima.isDown){
            this.setVelocityY(-this.velocidade);
        }

        if(this.teclas.baixo.isDown){
            this.setVelocityY(this.velocidade);
        }

        if(this.teclas.esq.isDown){
            this.setVelocityX(-this.velocidade);
        }

        if(this.teclas.dir.isDown){
            this.setVelocityX(this.velocidade);
        }

        this.body.velocity.normalize().scale(this.velocidade);
    }
}

class JogadorScene extends Phaser.Scene {
    constructor(){
        super({key : "JogadorScene"})
    }

    create (){
        var grafico = this.add.graphics();

        grafico.fillStyle(0x3B82F6);
        grafico.fillCircle(20, 20, 20);
        grafico.generateTexture("azul", 40, 40);

        grafico.clear();

        grafico.fillStyle(0xF97316);
        grafico.fillCircle(20, 20, 20);
        grafico.generateTexture("laranja", 40, 40);

        grafico.destroy();

        this.teclasAzul = this.input.keyboard.addKeys({
            cima: "W",
            baixo: "S",
            esq: "A",
            dir: "D"
        });

        this.teclasLaranja = this.input.keyboard.addKeys({
            cima: "UP",
            baixo: "DOWN",
            esq: "LEFT",
            dir: "RIGHT"
        });

        this.jogador1 = new Jogador(
            this, 200, 250, "azul", this.teclasAzul
        );

        this.jogador2 = new Jogador(
            this, 600, 250, "laranja", this.teclasLaranja
        );

        this.distanciaTxt = this.add.text(20, 20, "Distancia:", {
            fontSize: "20px",
            fontFamily: "Arial",
            color: "#FFFFFF"
        });
    }

    update(){
        this.jogador1.mover();
        this.jogador2.mover();

        var distancia = Phaser.Math.Distance.Between(
            this.jogador1.x,
            this.jogador1.y,
            this.jogador2.x,
            this.jogador2.y
        );

        if(distancia < 60){
            this.distanciaTxt.setText("Apanhado!");
            this.distanciaTxt.setColor("#c90808");
        }
        else {
            this.distanciaTxt.setText("Distancia: " + Math.round(distancia) + " px");
            this.distanciaTxt.setColor("#FFFFFF");
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [JogadorScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const jogo = new Phaser.Game(config);
