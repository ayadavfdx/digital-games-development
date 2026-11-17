class Espelho extends Phaser.Scene{
    constructor(){
        super({ key : "Espelho" })
    }

    preload (){
        this.load.setBaseURL ("https://labs.phaser.io");
        this.load.image ("boneco", "assets/sprites/phaser-dude.png");
    }
    create (){
        this.moneco = this.add.sprite (400, 250, "boneco");
        this.moneco.setScale(2);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.estado = this.add.text(20, 20, "", {
            fontSize: "18px",
            fontFamily: "Arial",
            color: "#ffffff"
        });
        this.atualizarEstado();
    }

    atualizarEstado() {
        let espelhado;

        if (this.moneco.flipX) {
            espelhado = "true";
        } else {
            espelhado = "false";
        }

        this.estado.setText(
            "Escala: " + this.moneco.scaleX +
            " | Ângulo: " + this.moneco.angle +
            "  | Espelhado: " + espelhado
        );
    }

    update (){
        const justDown = Phaser.Input.Keyboard.JustDown;

        if (justDown(this.cursors.left)) {
            this.moneco.setFlipX(true);
        }
        if (justDown(this.cursors.right)) {
            this.moneco.setFlipX(false);
        }
        if (justDown(this.cursors.up)) {
            let escala = this.moneco.scaleX + 0.5;
            if (escala > 4) {
                escala = 4;
            }
            this.moneco.setScale(escala);
        }
        if (justDown(this.cursors.down)) {
            let escala = this.moneco.scaleX - 0.5;

            if (escala < 0.5) {
                escala = 0.5;
            }
            this.moneco.setScale(escala);
        }
        if (justDown(this.cursors.space)) {
            this.moneco.setAngle(this.moneco.angle + 45);
        }
        this.atualizarEstado();
    }
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height: 500,
    backgroundColor : "#1E293B",
    scene : [Espelho]
}

const jogo = new Phaser.Game(config);
