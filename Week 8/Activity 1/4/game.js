class CarroScene extends Phaser.Scene {
    constructor(){
        super({key : "CarroScene"})
    }

    create(){
    var graf = this.add.graphics();

    graf.fillStyle(0xEF4444);
    graf.fillRoundedRect(0, 0, 46, 26, 10);

    graf.fillStyle(0x111827);
    graf.fillRoundedRect(36, 4, 5, 18, 3);

    graf.generateTexture("carro", 46, 26);
    graf.destroy();

    this.carro = this.physics.add.sprite(400, 250, "carro");
    this.carro.setCollideWorldBounds(true);

    this.velocidade = 0;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.velocidadeTxt = this.add.text(20, 20, "Velocidade: 0 px/s", {
    fontFamily: "Arial",
    fontSize: "20px",
    color: "#FFFFFF"
        });
    }


    update(time, delta){

    var vx = delta / 1000;

    if(this.cursors.up.isDown){
        this.velocidade += 300 * vx;
    }
    else if(this.cursors.down.isDown){
        this.velocidade -= 300 * vx;
    }
    else {
        if(this.velocidade > 0){
            this.velocidade -= 200 * vx;
            this.velocidade = Math.max(0, this.velocidade);
        }
        else if(this.velocidade < 0){
            this.velocidade += 200 * vx;
            this.velocidade = Math.min(0, this.velocidade);
        }
    }

    this.velocidade = Phaser.Math.Clamp(this.velocidade, -150, 300);

    if(Math.abs(this.velocidade) > 10){
        if(this.cursors.left.isDown){
            this.carro.setAngularVelocity(-180);
    }
    else if(this.cursors.right.isDown){
        this.carro.setAngularVelocity(180);
    }
    else {
        this.carro.setAngularVelocity(0);
    }

    } else {
    this.carro.setAngularVelocity(0);
        }

    this.physics.velocityFromRotation(
    this.carro.rotation,
    this.velocidade,
    this.carro.body.velocity);

    this.velocidadeTxt.setText("Velocidade: " + Math.round(this.velocidade) + " px/s");
    }
}



const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#1E293B",
    scene: [CarroScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const jogo = new Phaser.Game(config);