//a91403
class EstrelaScene extends Phaser.Scene{
    constructor(){
        super({ key : "EstrelaScene" })
    };

    moverEstrela(){
        const distancia = this.estrela.radius + 30;
        this.estrela.x = Phaser.Math.Between(distancia, config.width - distancia);
        this.estrela.y = Phaser.Math.Between(distancia, config.height - distancia);
    };

    create(){
        this.jogador = this.add.rectangle (400, 250, 36, 36, 0x3B82F6);
        this.estrela = this.add.circle (0, 0, 14, 0xFACC15)
        this.moverEstrela();

        this.pontos = this.add.text (20, 20, "Pontos: ", {
            fontSize : "25px",
            fontFamily : "Arial",
            fontStyle : "bold",
            color : "#ffff"
        });

        this.velocidade = 5;
        this.cursors = this.input.keyboard.createCursorKeys()
        this.contarPontos = 0;
    };
    update(){

        const limiteXRight = config.width - Math.floor(this.jogador.width/2);
        const limiteXLeft = 0 + Math.floor(this.jogador.width/2);
        const limiteYUp = 0 + Math.floor(this.jogador.height/2);
        const limiteYDown = config.height - Math.floor(this.jogador.height/2);

        if(this.cursors.right.isDown){
            this.jogador.x += this.velocidade;
            if(this.jogador.x > limiteXRight){
                this.jogador.x = limiteXRight;
            }
        }
        if(this.cursors.left.isDown){
            this.jogador.x -= this.velocidade;
            if(this.jogador.x < limiteXLeft){
                this.jogador.x = limiteXLeft;
            }
        }
        if(this.cursors.up.isDown){
            this.jogador.y -= this.velocidade;
            if(this.jogador.y < limiteYUp){
                this.jogador.y = limiteYUp;
            }
        }
        if(this.cursors.down.isDown){
            this.jogador.y += this.velocidade;
            if(this.jogador.y > limiteYDown){
                this.jogador.y = limiteYDown;
            }
        }

        var estrelaX = this.estrela.x;
        var estrelaY = this.estrela.y;
        var jogadorX = this.jogador.x;
        var jogadorY = this.jogador.y;
        this.terminou = false;

        if(Phaser.Math.Distance.Between(jogadorX, jogadorY, estrelaX, estrelaY) < 32){
            this.contarPontos++;
            this.pontos.setText("Pontos: " + this.contarPontos);
            this.moverEstrela();
        }

        if(this.contarPontos === 10){
            this.terminou = true;
        }

        if(this.terminou){
            this.estrela.setVisible(false);
            this.add.text (400, 250, "Ganhaste!", {
                fontSize : "80px",
                fontFamily : "Arial",
                fontStyle: "bold",
                color : "#12e60bdc"
            }).setOrigin(0.5);
            this.scene.pause();
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width : 800,
    height : 500,
    backgroundColor : "#1E293B",
    scene: [EstrelaScene]
}

const jogo = new Phaser.Game(config)
