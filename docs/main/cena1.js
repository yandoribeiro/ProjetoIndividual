// Define a cena "Cena1" no jogo
export default class Cena1 extends Phaser.Scene {
    
    constructor() {
        super("Cena1"); // Nome da cena
    }

    // Carrega os recursos necessários (imagens e spritesheets)
    preload() {
        this.load.image("fundoCena1", "./assets/background.png");
        this.load.spritesheet("pescador", "./assets/player.png", {frameWidth: 64, frameHeight: 64});
        this.load.image("jogar", "./assets/play.png");
        this.load.image("tutorial", "./assets/tutorial.png");
    }

    // Cria os objetos da cena (fundo, jogador, animações, botões)
    create() {
        // Fundo da cena
        this.marBg = this.add.image(0, 0, "fundoCena1").setOrigin(0, 0);

        // Adiciona o jogador (spritesheet)
        const jogador = this.add.sprite(900, 800, "pescador").setScale(5);

        // Criação das animações do jogador
        this.anims.create({
            key: "padrao",
            frames: this.anims.generateFrameNumbers("pescador", {start: 0, end: 5}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: "jogar",
            frames: this.anims.generateFrameNumbers("pescador", {start: 14, end: 19}),
            frameRate: 10,
            repeat: 0
        });

        jogador.play("padrao"); // Inicia a animação padrão

        // Título do jogo
        this.add.text(230, 100, "The Octopus Challenge", {font: "130px Arial", fill: "##000000"});

        // Botão "Jogar"
        const playBotao = this.add.image(900, 400, "jogar").setScale(3).setInteractive();
        playBotao.setDepth(2);
        playBotao.on("pointerdown", () => {
            jogador.play("jogar"); // Executa animação de "jogar"
            jogador.once("animationcomplete", (anim) => {
                if (anim.key === "jogar") {
                    this.scene.start("Cena2"); // Vai para a Cena2
                }
            });
        });

        // Botão "Tutorial"
        const tutorialBotao = this.add.image(930, 620, "tutorial").setScale(1).setInteractive();
        tutorialBotao.setDepth(1);
        tutorialBotao.on("pointerdown", () => {
            this.scene.start("Cena3"); // Vai para a Cena3
        });
    }

    // Método update não utilizado nesta cena
    update() {}
}
