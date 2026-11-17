// a91403
class SemaforoScene extends Phaser.Scene{
    constructor(){
        super({ key : "SemaforoScene"})
    }
    
    preload(){}
    create(){
        this.add.text(400, 40, "SEMÁFORO", {
            fontSize : "32px",
            color : "#ffff",
            fontFamily : "Arial",
            fontStyle : "bold"
        }).setOrigin(0.5);
        
        this.add.rectangle (400, 420, 20, 80, 0x64748B);
        this.add.rectangle (400, 230, 120 , 300, 0x111827).setStrokeStyle(4,0xFACC15);

        this.add.circle (400, 140, 40, 0xEF4444)
        this.add.circle (400, 230, 40, 0xF59E0B).setAlpha(0.25)
        this.add.circle (400, 320, 40, 0x22C55E).setAlpha(0.25)

        this.add.text (400, 480, "PARE", {
            fontSize : "32px",
            fontStyle : "bold",
            color: "#f70606",
            fontFamily : "Arial"
        }).setOrigin(0.5)
    }

    update(){}
}

const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 500,
    backgroundColor : "#1E293B",
    scene : [SemaforoScene]
};

const jogo = new Phaser.Game(config);