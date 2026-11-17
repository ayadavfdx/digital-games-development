//a91403
class CronometroScene extends Phaser.Scene{
    constructor(){
        super({ key : "CronometroScene"})
    }

    create(){

        this.add.text (400, 150, "CRONÓMETRO", {
            fontSize : "32px",
            fontFamily : "Arial",
            color : "#E2E8F0"
        }).setOrigin(0.5);

        this.textoTempo = this.add.text (400, 260, "00:00", {
            fontSize: "96px",
            fontFamily: "Courier New",
            color: "#22D3EE"
        }).setOrigin(0.5);

        this.frames = 0;
    }


    update(){
        this.frames ++

        var framesParaSegundos = Math.floor(this.frames / 60);
        var minutos = Math.floor(framesParaSegundos / 60);
        var segundosRestante = framesParaSegundos % 60;

        var minutoTxt = String(minutos).padStart(2, "0");
        var segundoTxt = String(segundosRestante).padStart(2, "0");

        if(framesParaSegundos === 10){
            this.textoTempo.setColor("#EF4444")
        }
        
        this.textoTempo.setText(minutoTxt + ":" + segundoTxt);
    }
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 500,
    backgroundColor : "#1E293B",
    scene : [CronometroScene]
}

const jogo = new Phaser.Game(config)