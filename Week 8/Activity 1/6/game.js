const MUNDO_L = 3200;

class AralaxeScene extends Phaser.Scene {
    constructor(){
        super({key : "AralaxeScene" })
    }

    create(){
        this.cameras.main.setBounds(0, 0, MUNDO_L, 500);

        for(let i = 0; i < 150; i++){
            var x = Phaser.Math.Between(0, 800 + 0.2 * (MUNDO_L - 800));
            var y = Phaser.Math.Between(0, 500);

            this.add.circle(x, y, 1, 0x64748B)
                .setScrollFactor(0.2, 0);
        }

        for(let i = 0; i < 100; i++){
            var x = Phaser.Math.Between(0, 800 + 0.5 * (MUNDO_L - 800));
            var y = Phaser.Math.Between(0, 500);

            this.add.circle(x, y, 2, 0xCBD5E1)
                .setScrollFactor(0.5, 0);
        }

        for(let i = 0; i < 40; i++){
            var x = Phaser.Math.Between(0, 800 + 1 * (MUNDO_L - 800));
            var y = Phaser.Math.Between(0, 500);

            this.add.circle(x, y, 3, 0xFFFFFF)
                .setScrollFactor(1, 0);
        }

        for(let i = 0; i < 4; i++){
            var x = 400 + i * 800;
            var y = 250;

            this.add.circle(x, y, 40, 0xF97316)
                .setScrollFactor(1, 0);
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameraTxt = this.add.text(20, 20, "Câmara: x = 0", {
            fontSize: "20px",
            fontFamily: "Arial",
            color: "#FFFFFF"
        }).setScrollFactor(0);
    }

    update(time, delta){
        var dt = delta / 1000;
        var velocidade = 300;

        if(this.cursors.shift.isDown){
            velocidade = 900;
        }

        if(this.cursors.right.isDown){
            this.cameras.main.scrollX += velocidade * dt;
        }

        if(this.cursors.left.isDown){
            this.cameras.main.scrollX -= velocidade * dt;
        }

        this.cameraTxt.setText("Câmara: x = " + Math.round(this.cameras.main.scrollX));
    }
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height: 540,
    backgroundColor : "#1E293B",
    scene : [AralaxeScene]
}

const jogo = new Phaser.Game(config);