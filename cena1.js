export default class Cena1 extends Phaser.Scene {
    constructor() {
      super("Cena1");
    }
    preload() {
        this.load.image ("fundoCena1", "assets/background.png");
        this.load.spritesheet ("pescador", "assets/player.png", {frameWidth:64, frameHeight: 64});
        this.load.image("jogar", "assets/play.png");
    }

    create() {
        this.marBg = this.add.image(0, 0, "fundoCena1").setOrigin(0, 0);

        const jogador = this.add.sprite (900, 800, "pescador").setScale(5);
        this.anims.create({ 
            key: "padrao",
            frames: this.anims.generateFrameNumbers("pescador", {start: 0, end: 5}),
            frameRate:7,
            repeat: -1
        });
        this.anims.create({
            key: "jogar",
            frames: this.anims.generateFrameNumbers("pescador", {start: 14, end: 19}),
            frameRate:10,
            repeat:0
        });
        jogador.play("padrao");

        this.add.text(500, 200, "nome do jogo", {font: "130px Arial", fill: "#fff"});
        const playBotao = this.add.image(900, 500, "jogar").setScale(3).setInteractive();
        playBotao.on("pointerdown", () =>{
            jogador.play("jogar");
        });
    }

    update() {

    }
}