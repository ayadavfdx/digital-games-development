// O contador volta a 0 porque 
// o programa não dispõe de nenhum sistema que guarde o estado 
// e, por isso, reinicia sempre tudo para os valores predefinidos

class MenuScene extends Phaser.Scene{
    constructor(){
        super({ key : "MenuScene"})
    }

    create(){

        this.add.text(400, 40, "ARENA ESTELAR", {
            fontSize : "56px",
            color : "#FBBF24",
            fontFamily : "Arial",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(400, 100, "Carrega ESPAÇO para começar", {
            fontSize : "24px",
            color : "#E2E8F0",
            fontFamily : "Arial",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.input.keyboard.once("keydown-SPACE", () =>{
            this.scene.start("ArenaScene");
        })
    }
}



class ArenaScene extends Phaser.Scene{
    constructor(){
        super({ key: "ArenaScene"})
    }

    preload(){
        this.load.setBaseURL("https://labs.phaser.io")
        this.load.image("fundo", "assets/skies/space3.png")
        this.load.image("logo", "assets/sprites/phaser3-logo.png")
    }
    create(){
        this.add.image(400, 250, "fundo");
        this.add.image(400, 250, "logo").setAlpha(0.25);
        
        this.add.text(400, 40, "ARENA ESTELAR", {
            fontSize: "36px",
            color: "#FBBF24",
            fontFamily: "Arial",
            fontStyle: "bold"
        }).setOrigin(0.5);
        this.add.text(400, 475, "Usa as setas para mover a nave", {
            fontSize: "18px",
            color: "#E2E8F0",
            fontFamily: "Arial"
        }).setOrigin(0.5);

        this.jogador = this.add.rectangle(400, 300, 40, 40, 0x3B82F6).setStrokeStyle(3, 0xFFFFFF);
        this.inimigo1 = this.add.circle(150, 150, 25, 0xEF4444);
        this.inimigo2 = this.add.circle(650, 150, 25, 0xEF4444);
        this.inimigo3 = this.add.circle(650, 380, 25, 0xEF4444);

        this.inimigos = [this.inimigo1, this.inimigo2, this.inimigo3];

        this.frames = 0;
        this.textoTempo = this.add.text(20, 20, "Tempo: 0s  ", {
            fontSize: "20px",
            color: "#ffff",
            fontFamily: "Arial"
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.velocidade = 4;

        this.input.keyboard.once("keydown-ESC", () => {

            this.scene.start("MenuScene");
        });
        
    }

    update(){
        this.frames ++;
        this.textoTempo.setText("Tempo: " + Math.floor(this.frames/60) + "s");
        
        if(this.cursors.left.isDown){
            this.jogador.x -= this.velocidade;
        }
        if(this.cursors.right.isDown){
            this.jogador.x += this.velocidade;
        }
        if(this.cursors.up.isDown){
            this.jogador.y -= this.velocidade;
        }
        if(this.cursors.down.isDown){
            this.jogador.y += this.velocidade;
        }

        this.jogador.x = Phaser.Math.Clamp(
            this.jogador.x, 
            this.jogador.width / 2,
            this.scale.width - this.jogador.width / 2);

        this.jogador.y = Phaser.Math.Clamp(
            this.jogador.y, 
            this.jogador.height / 2, 
            this.scale.height - this.jogador.height / 2);
    }



}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 500,
    backgroundColor: "#1E293B",
    scene : [MenuScene, ArenaScene]
}

const jogo = new Phaser.Game(config);
