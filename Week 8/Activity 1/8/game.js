const MUNDO_L = 2400;

class HeroiScene extends Phaser.Scene{
    constructor(){
        super({ key : "HeroiScene" })
    }

    preload(){
        this.load.setBaseURL("https://labs.phaser.io");
        this.load.image("fundo","assets/skies/space3.png");
        this.load.spritesheet("heroi", "assets/sprites/dude.png", {
            frameWidth : 32,
            frameHeight : 48
        })
    }
    create(){
        this.physics.world.setBounds(0, 0, MUNDO_L, 500);

        this.add.tileSprite(0, 0, MUNDO_L, 500, "fundo")
        .setOrigin(0, 0);

        for(let i = 0; i <= MUNDO_L; i += 400){

            this.add.text(i, 450, i + " px", {
                fontSize: "20px",
                fontFamily: "Arial",
                color: "#FFFFFF"
            });
        }

        this.anims.create({
            key: "esquerda",
            frames: this.anims.generateFrameNumbers("heroi", {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "direita",
            frames: this.anims.generateFrameNumbers("heroi", {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "parado",
            frames: [{ key: "heroi", frame: 4 }],
            frameRate: 10
        });

        this.heroi = this.physics.add.sprite(100, 400, "heroi");
        this.cameras.main.setBounds(0, 0, MUNDO_L, 500);
        this.cameras.main.startFollow(this.heroi, true, 0.05, 0.05);
        this.heroi.setScale(2);
        this.heroi.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.estadoTxt = this.add.text(20, 20, "Parado", {
            fontSize: "20px",
            fontFamily: "Arial",
            color: "#FFFFFF"
        }).setScrollFactor(0);
    }
    update(){

        var velocidade = 160;

        if(this.cursors.shift.isDown){
            velocidade = 320;
            this.heroi.anims.timeScale = 2;
        }
        else {
            this.heroi.anims.timeScale = 1;
        }

        if(this.cursors.left.isDown){
            this.heroi.setVelocityX(-velocidade);
            this.heroi.anims.play("esquerda", true);
        }
        else if(this.cursors.right.isDown){
            this.heroi.setVelocityX(velocidade);
            this.heroi.anims.play("direita", true);
        }
        else {
            this.heroi.setVelocityX(0);
            this.heroi.anims.play("parado", true);
        }

        if(this.cursors.left.isDown || this.cursors.right.isDown){

            if(this.cursors.shift.isDown){
                this.estadoTxt.setText("A correr");
            }
            else {
                this.estadoTxt.setText("A andar");
            }
        }
        else {
        this.estadoTxt.setText("Parado");
        }
    }
}




const config = {
    type: Phaser.AUTO,
    width: 800,
    height : 500,
    backgroundColor : "#1E293B",
    scene : [HeroiScene],
    physics : {
        default : "arcade",
        arcade : {
            gravity : { y : 0 },
            debug : false
        }
    }
}

const jogo = new Phaser.Game(config);