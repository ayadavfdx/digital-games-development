class Relogio extends Phaser.Scene {
    constructor(){
        super({ key : "Relogio" })
    }

    create (){
        this.add.circle (400, 250, 180, 0x1E223B).setStrokeStyle(2, 0xFFFFFF);

        for(let i = 0; i < 12; i++){
            var angulo = Phaser.Math.DegToRad(i * 30);

            var x = 400 + Math.sin(angulo) * 160;
            var y = 250 - Math.cos(angulo) * 160;

            this.add.circle(x, y, 5, 0xFAEC15);
        }

        this.ponteiroMin = this.add.rectangle (
            400, 250, 8, 130, 0xFFFFFF).setOrigin(0.5,1);

        this.ponteiroSeg = this.add.rectangle (
            400, 250, 4, 160, 0xF94C15).setOrigin(0.5,1);

        this.tempoTexto = this.add.text (20, 20, "Tempo: ", {
            fontSize : "18px",
            fontFamily : "Arial",
            color : "#ffff"
        })

        this.segundos = 0;
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update (time, delta){

        if(this.cursors.space.isDown){
            this.segundos += (delta / 1000) *60;
        }else{
            this.segundos += delta / 1000;
        }

        var anguloSeg = this.segundos * 6;
        var anguloMin = this.segundos * 0.1;

        this.ponteiroSeg.setRotation(Phaser.Math.DegToRad(anguloSeg));
        this.ponteiroMin.setRotation(Phaser.Math.DegToRad(anguloMin));

        var mostrarSegundos = Math.floor(this.segundos)
        this.tempoTexto.setText ("Tempo: " + mostrarSegundos + "s");
    }
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height: 500,
    backgroundColor : "#1E293B",
    scene : [Relogio]
}

const jogo = new Phaser.Game(config);