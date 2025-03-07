// Define a cena "Cena2" no jogo
export default class Cena2 extends Phaser.Scene {
    
    constructor() {
        super("Cena2"); // Nome da cena
    }

    // Carrega os recursos necessários (imagens e spritesheets)
    preload() {
        this.load.image("fundoCena2", "./assets/fundoMar.png");
        this.load.spritesheet("magikarp", "./assets/magikarp2.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("polvo", "./assets/octopus.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("anzol", "./assets/gancho.png");
    }

    // Cria os objetos da cena (fundo, peixes, polvos, gancho)
    create() {
        // Fundo da cena
        this.seaBG = this.add.image(0, 0, "fundoCena2").setOrigin(0, 0).setScale(3.5);

        // Adiciona o gancho (movimentável)
        this.gancho = this.add.sprite(400, 0, "anzol").setOrigin(0.5, 0);
        this.physics.world.enable(this.gancho);
        this.gancho.setScale(0.5);
        this.gancho.body.setSize(72, 72);
        this.gancho.body.setOffset(94, 102);

        // Adiciona a linha do gancho
        this.corda = this.add.line(0, 0, this.gancho.x, this.gancho.y, this.gancho.x, 0, 0xFFFFFF).setOrigin(0, 0);

        // Adiciona o peixe (Magikarp) e define animação
        this.peixe = this.add.sprite(100, 1100, "magikarp").setFlip(true).setScale(3);
        this.anims.create({
            key: "nadar",
            frames: this.anims.generateFrameNumbers("magikarp", { start: 0, end: 60 }),
            frameRate: 10,
            repeat: -1
        });
        this.peixe.play("nadar");

        this.peixe.ida = true;
        this.physics.world.enable(this.peixe);
        this.peixe.body.setSize(56, 56);
        this.peixe.body.setCollideWorldBounds(true);

        // Adiciona polvos à cena em posições aleatórias
        this.polvos = this.add.group();
        const posicoesPolvos = [
            { x: 300, y: 500 }, { x: 600, y: 300 }, { x: 900, y: 600 },
            { x: 1300, y: 450 }, { x: 1700, y: 800 }, { x: 1400, y: 900 },
            { x: 500, y: 800 }, { x: 1100, y: 200 }, { x: 1500, y: 650 }, { x: 200, y: 900 }
        ];

        // Criação dos polvos
        posicoesPolvos.forEach(pos => {
            let polvo = this.add.sprite(pos.x, pos.y, "polvo").setScale(8);
            this.anims.create({
                key: "parado",
                frames: this.anims.generateFrameNumbers("polvo", { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
            polvo.play("parado");
            this.polvos.add(polvo);
            this.physics.world.enable(polvo);
            polvo.body.setImmovable(true);
            polvo.body.setSize(17, 17);
            polvo.body.setOffset(5, 5);
        });

        // Detecta colisões entre o gancho e o peixe
        this.physics.add.overlap(this.peixe, this.gancho, this.pescarPeixe, null, this);

        // Configura as teclas de movimento
        this.cursors = this.input.keyboard.createCursorKeys();

        // Contador de peixes pescados
        this.contador = 0;
        this.contadorTexto = this.add.text(16, 16, "Peixes pescados: 0", { fontSize: "64px", fill: "#000000" });
    }

    update() {
        let colisaoComPolvo = false;

        // Verifica colisões com polvos
        this.polvos.getChildren().forEach((polvo) => {
            if (this.physics.overlap(this.gancho, polvo)) {
                colisaoComPolvo = true;
            }
        });

        // Movimenta o gancho, evitando colisões com polvos
        if (colisaoComPolvo) {
            this.gancho.y += 1;
            this.gancho.x -= 1;
        } else {
            if (this.cursors.left.isDown) this.gancho.x -= 5;
            else if (this.cursors.right.isDown) this.gancho.x += 5;
            else if (this.cursors.up.isDown) this.gancho.y -= 5;
            else if (this.cursors.down.isDown) this.gancho.y += 5;
        }

        // Atualiza a posição da linha do gancho
        this.corda.setTo(this.gancho.x, this.gancho.y, this.gancho.x, 0);

        // Se o peixe foi pescado, segue o gancho
        if (this.peixe.pescado) {
            this.peixe.x = this.gancho.x;
            this.peixe.y = this.gancho.y + 50;
        }

        // Movimento do peixe de um lado para o outro
        if (this.peixe.x <= 100) {
            this.peixe.setFlip(true, false);
            this.peixe.ida = true;
            this.peixe.play("nadar", true);
        }

        if (this.peixe.x < 1700 && this.peixe.ida) this.peixe.x += 5;
        if (this.peixe.x >= 1700 && this.peixe.ida) {
            this.peixe.setFlip(false, false);
            this.peixe.ida = false;
        }
        if (this.peixe.x > 100 && !this.peixe.ida) this.peixe.x -= 5;
        if (this.peixe.x <= 100 && !this.peixe.ida) {
            this.peixe.setFlip(true, false);
            this.peixe.ida = true;
        }

        // Se o peixe sair da tela, reinicia sua posição
        if (this.peixe.y <= 0) this.resetarPeixe();
    }

    // Reseta a posição do peixe e incrementa o contador
    resetarPeixe() {
        this.incrementarContador();
        this.peixe.setPosition(100, 1100);
        this.peixe.setFlip(true, false);
        this.peixe.ida = true;
        this.peixe.pescado = false;
        this.peixe.play("nadar", true);
        this.peixe.body.setVelocityX(this.peixe.ida ? 5 : -5);
    }

    // Marca o peixe como pescado
    pescarPeixe(peixe, gancho) {
        this.peixe.pescado = true;
    }

    // Incrementa o contador de peixes pescados e verifica se o jogador completou a missão
    incrementarContador() {
        this.contador += 1;
        this.contadorTexto.setText('Peixes pescados: ' + this.contador);

        // Se 5 peixes forem pescados, exibe a mensagem de vitória e reinicia a cena
        if (this.contador === 5) {
            this.add.text(600, 500, "Parabéns!!!", { font: "100px Arial", fill: "#000000" });
            this.add.text(200, 600, "Você não machucou os polvos!", { font: "100px Arial", fill: "#000000" });
            this.peixe.setVisible(false);
            this.polvos.getChildren().forEach(child => child.setVisible(false));
            this.time.delayedCall(2000, () => {
                this.scene.start("Cena1");
            });
        }
    }
}
