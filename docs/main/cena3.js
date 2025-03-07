// Define a cena "Cena3" no jogo
export default class Cena3 extends Phaser.Scene {
    
    constructor() {
        super("Cena3"); // Nome da cena
    }

    // Carrega os recursos necessários (imagens e spritesheets)
    preload() {
        this.load.image("fundoMar", "./assets/fundoMar.png");
        this.load.spritesheet("mae", "./assets/polvoMae.png", { frameWidth: 48, frameHeight: 48 });
        this.load.image("fala", "./assets/balaoFala.png");
        this.load.image("setas", "./assets/setas.png");
        this.load.image("enter", "./assets/enter.png");
    }

    // Cria os objetos da cena (fundo, mãe polvo, texto, imagens)
    create() {
        // Fundo da cena
        this.seaBG = this.add.image(0, 0, "fundoMar").setOrigin(0, 0).setScale(3.5);

        // Balao de fala
        this.balao = this.add.image(900, 550, "fala").setScale(2.1);

        // Adiciona o sprite da mãe polvo e sua animação
        this.mae = this.add.sprite(500, 1000, "mae").setScale(10);
        this.anims.create({
            key: "falar",
            frames: this.anims.generateFrameNumbers("mae", { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.mae.play("falar");

        // Texto explicativo para o jogador
        this.add.text(750, 350, "Olá pescador!!!", { font: "50px Arial", fill: "##000000" });
        this.add.text(430, 400, "Não queria atrapalhar seu momento,", { font: "50px Arial", fill: "##000000" });
        this.add.text(430, 450, "mas meus filhos estão brincando no mar.", { font: "50px Arial", fill: "##000000" });
        this.add.text(430, 500, "Utilize as setas do teclado para não", { font: "50px Arial", fill: "##000000" });
        this.add.text(430, 550, "machucá-los:", { font: "50px Arial", fill: "##000000" });

        // Exibe imagem das setas e instrução
        this.add.image(850, 600, "setas").setScale(0.2);

        // Exibe imagem e texto para pressionar Enter
        this.add.image(1050, 1100, "enter");
        this.add.text(750, 1100, "Pressione           quando estiver pronto!", { font: "50px Arial", fill: "##000000" });

        // Ação de pressionar Enter para voltar à Cena1
        this.input.keyboard.on("keydown-ENTER", () => {
            console.log("Voltando para a Cena1");
            this.scene.start("Cena1");
        });
    }

    // Método update não utilizado nesta cena
    update() {
        
    }
}
