const MUNDO_L = 1600;
const MUNDO_A = 1000;



class Heroi extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "heroi", 4);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setDepth(10);
        this.velocidade = 200;
        this.direcao = "direita";
    }

    mover(cursors, teclas) {
        this.setVelocity(0);

        if (cursors.left.isDown || teclas.A.isDown) {
            this.setVelocityX(-this.velocidade);
        } else if (cursors.right.isDown || teclas.D.isDown) {
            this.setVelocityX(this.velocidade);
        }

        if (cursors.up.isDown || teclas.W.isDown) {
            this.setVelocityY(-this.velocidade);
        } else if (cursors.down.isDown || teclas.S.isDown) {
            this.setVelocityY(this.velocidade);
        }
    }

    animar() {
        const velocidade = this.body.velocity;

        if (velocidade.x < 0) {
            this.direcao = "esquerda";
        } else if (velocidade.x > 0) {
            this.direcao = "direita";
        }

        if (velocidade.x !== 0 || velocidade.y !== 0) {
            this.anims.play(this.direcao, true);
        } else {
            this.anims.play("parado", true);
        }
    }
}

class RondaScene extends Phaser.Scene {
    constructor() {
        super({ key: "RondaScene" });
    }

    preload() {
        this.load.setBaseURL("https://labs.phaser.io");
        this.load.image("fundo", "assets/skies/space3.png");
        this.load.image("ovni", "assets/sprites/ufo.png");
        this.load.spritesheet("heroi", "assets/sprites/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        this.physics.world.setBounds(0, 0, MUNDO_L, MUNDO_A);
        this.add.tileSprite(0, 0, MUNDO_L, MUNDO_A, "fundo").setOrigin(0);

        if (!this.anims.exists("esquerda")) {
            this.anims.create({
                key: "esquerda",
                frames: this.anims.generateFrameNumbers("heroi", { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: "direita",
                frames: this.anims.generateFrameNumbers("heroi", { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: "parado",
                frames: [{ key: "heroi", frame: 4 }]
            });
        }

        this.heroi = new Heroi(this, MUNDO_L / 2, MUNDO_A / 2);
        this.cameras.main.setBounds(0, 0, MUNDO_L, MUNDO_A);
        this.cameras.main.startFollow(this.heroi, true, 0.1, 0.1);

        this.ovniGrande = this.add.sprite (600, 150, "ovni"); 
        this.ovniGrande.setScale(1.5);
        this.ovniGrande.setAngle(-20);

        this.alt = MUNDO_A;
        this.larg = MUNDO_L;

        this.ovni1 = this.add.sprite (60, 60, "ovni");
        this.ovni2 = this.add.sprite (this.larg - 60, 60, "ovni");
        this.ovni3 = this.add.sprite (60, this.alt - 60, "ovni");
        this.ovni4 = this.add.sprite (this.larg - 60, this.alt - 60, "ovni");

        this.add.text (10, this.scale.height - 10, "RONDA ESPACIAL", {
            fontSize: "20px",
            fontFamily: "Arial",
            fontStyle : "bold",
            color : "#FBBF24"
        }).setOrigin(0, 1).setScrollFactor(0).setDepth(20);

        this.hud = this.add.text(16, 16, "", {
            fontSize: "20px",
            fontFamily: "Arial",
            color: "#ffffff"
        }).setScrollFactor(0).setDepth(20);

        this.ovnis = [this.ovni1, this.ovni2, this.ovni3, this.ovni4];

        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclas = this.input.keyboard.addKeys("W,A,S,D");
        this.velocidadeOvni = 120;
    }

    update(time, delta) {
        this.heroi.mover(this.cursors, this.teclas);
        this.heroi.animar();
        this.hud.setText(`x: ${Math.round(this.heroi.x)} · y: ${Math.round(this.heroi.y)}`);

        const s = delta / 1000;
        this.ovniGrande.x += this.velocidadeOvni *s;
        this.ovniGrande.setAngle(90);

        if(this.ovniGrande.x > this.larg + 60){
            this.ovniGrande.x = -60
        }
    }
}

const config = {
    tpye : Phaser.AUTO,
    width : 800,
    height : 500,
    backgroundColor : "#ffff",
    scene : [RondaScene],
    physics: { default: "arcade", 
        arcade: { gravity: { y: 0 }, 
        debug: true } }
}

const game = new Phaser.Game(config);
