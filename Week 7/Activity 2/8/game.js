//a91403
class TituloScene extends Phaser.Scene{
    constructor(){
        super({ key : "TituloScene" })
    }

    create(){
        this.add.text (400, 150, "DESAFIO DOS 5 SEGUNDOS", {
            fontSize : "50px",
            fontFamily : "Arial",
            fontStyle : "bold",
            color : "#07fc89f1"
        }).setOrigin(0.5)

        this.add.text (400, 250, "Carrega ESPAÇO para começar", {
            fontSize : "20px",
            fontFamily : "Arial",
            fontStyle : "italic",
            color : "#ffff"
        }).setOrigin(0.5)

        this.input.keyboard.once ("keydown-SPACE",() => {
            this.scene.start("JogoScene")
        })
    }

}

class JogoScene extends Phaser.Scene{
    constructor(){
        super({ key : "JogoScene" })
    }

    create(){
        this.frames = 0;
        this.toques = 0;

        this.add.text (400, 150, "Clica espaço tantas vezes quanto conseguires", {
            fontSize : "30px",
            fontFamily : "Arial",
            color : "#ffff"
        }).setOrigin(0.5);

        this.contador = this.add.text (400, 250, "5",{
            fontSize : "96px",
            fontFamily : "Arial",
            color : "#ffff"
        }).setOrigin(0.5);

        this.textoToques = this.add.text (400, 360, "Toques: " + this.toques, {
            fontSize : "28px",
            fontFamily : "Arial",
            color : "#ffff"
        }).setOrigin(0.5);

        this.input.keyboard.on ("keydown-SPACE", () => {
            this.toques ++;
        })



    }
    update(){
        this.textoToques.setText("Toques: " + this.toques)
        this.frames ++;
        var segundos = 5 - Math.floor(this.frames / 60);
        this.contador.setText(segundos);

        if(segundos === 0){
            this.scene.start("FimScene", {toques : this.toques})
        }
    }
}

class FimScene extends Phaser.Scene{
    constructor(){
        super({ key : "FimScene" })
    }
    
    create(dados){
        this.add.text (400, 150, "Tempo esgotado!" ,{
            fontSize : "35px",
            fontFamily : "Arial",
            color : "#fffc46"
        }).setOrigin(0.5);

        this.add.text (400, 250, "Fizeste " + dados.toques + " toques e R: repetir · M: menu" ,{
            fontSize : "25px",
            fontFamily : "Arial",
            color : "#46ff46"
        }).setOrigin(0.5);

        this.input.keyboard.once ("keydown-R", () => {
            this.scene.start("JogoScene");
        })
        this.input.keyboard.once ("keydown-M", () => {
            this.scene.start("TituloScene");
        })
        
    }
}

const config = {
    type : Phaser.AUTO,
    width: 800,
    height : 500,
    backgroundColor : "#1E293B",
    scene : [TituloScene, JogoScene, FimScene]
};

const jogo = new Phaser.Game(config)
