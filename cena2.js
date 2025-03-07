export default class Cena2 extends Phaser.Scene {
    constructor() {
        super("Cena2");
    }

    preload() {
        this.load.image("fundoCena2", "assets/fundoMar.png");
        this.load.spritesheet("magikarp", "assets/magikarp2.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("polvo", "assets/octopus.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("anzol", "assets/gancho.png");
    }

    create() {
        this.seaBG = this.add.image(0, 0, "fundoCena2").setOrigin(0, 0).setScale(3.5);

        this.gancho = this.add.sprite(400, 0, "anzol").setOrigin(0.5, 0);
        this.gancho.setScale(0.5);

        this.corda = this.add.line(0, 0, this.gancho.x, this.gancho.y, this.gancho.x, 0, 0xFFFFFF).setOrigin(0, 0);

        // Adicionando o peixe, definindo a escala e flip inicial
        this.peixe = this.add.sprite(100, 1100, "magikarp").setFlip(true).setScale(3);
        // Criando a animação do peixe
        this.anims.create({
            key: "nadar",
            frames: this.anims.generateFrameNumbers("magikarp", { start: 0, end: 60 }),
            frameRate: 10,
            repeat: -1
        });

        this.peixe.play("nadar");

        // Definindo a propriedade 'ida' para o movimento do peixe
        this.peixe.ida = true;

        // Adicionando a física para o peixe e o gancho
        this.physics.world.enable(this.peixe);  // Habilitando física no peixe
        this.peixe.body.setSize(64, 64);
        this.physics.world.enable(this.gancho); // Habilitando física no gancho

        // Criando polvos como obstáculos
        this.polvos = this.add.group();
        const posicoesPolvos = [
            { x: 300, y: 500 },
            { x: 600, y: 300 },
            { x: 900, y: 600 },
            { x: 1300, y: 450 },
            { x: 1700, y: 800 },
            { x: 1400, y: 900 },
            { x: 500, y: 800 },
            { x: 1100, y: 200 },
            { x: 1500, y: 650 },
            { x: 200, y: 900 }
        ];

        for (let i = 0; i < posicoesPolvos.length; i++) {
            let pos = posicoesPolvos[i];
            let polvo = this.add.sprite(pos.x, pos.y, "polvo").setScale(8);
            this.anims.create({
                key: "parado",
                frames: this.anims.generateFrameNumbers("polvo", { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
            polvo.play("parado");

            // Adicionando polvo ao grupo de polvos
            this.polvos.add(polvo);

            // Habilitando física para o polvo
            this.physics.world.enable(polvo);
            polvo.body.setImmovable(true);
            polvo.body.setSize(16, 16);
            polvo.body.setOffset(8, 8);
        }

        // Colisão entre peixe e polvos
        if (this.physics) {
            this.physics.add.collider(this.peixe, this.polvos, this.colisaoComPolvo, null, this);
        }

        // Verificar se o gancho tocou o peixe para pescar
        this.physics.add.overlap(this.gancho, this.peixe, this.pescarPeixe, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Movimentação do gancho
        if (this.cursors.left.isDown) {
            this.gancho.x -= 5; // Move o gancho para a esquerda
        } else if (this.cursors.right.isDown) {
            this.gancho.x += 5; // Move o gancho para a direita
        } else if (this.cursors.up.isDown) {
            this.gancho.y -= 5; // Move o gancho para cima
        } else if (this.cursors.down.isDown) {
            this.gancho.y += 5; // Move o gancho para baixo
        }

        // Atualizar a posição da corda com o movimento do gancho
        this.corda.setTo(this.gancho.x, this.gancho.y, this.gancho.x, 0);

        // Se o peixe foi pescado, ele segue o gancho
        if (this.peixe.pescado) {
            this.peixe.x = this.gancho.x;  // Alinhar com a posição do gancho horizontalmente
            this.peixe.y = this.gancho.y + 50; // Um pequeno deslocamento vertical
        }

        // Movimento do peixe
        if (this.peixe.x <= 100) {
            this.peixe.setFlip(true, false); // Deixa o peixe virado para a direita
            this.peixe.ida = true;
            this.peixe.play("nadar", true); // Inicia a animação de nadar (segundo parâmetro true para loop)
        }

        if (this.peixe.x < 1700 && this.peixe.ida === true) {
            this.peixe.x += 5;
        }

        if (this.peixe.x >= 1700 && this.peixe.ida === true) {
            this.peixe.setFlip(false, false); // Inverte o flip para a esquerda
            this.peixe.ida = false; // Muda a direção
        }

        if (this.peixe.x > 100 && this.peixe.ida === false) {
            this.peixe.x -= 5;
        }

        if (this.peixe.x <= 100 && this.peixe.ida === false) {
            this.peixe.setFlip(true, false); // Deixa o peixe virado para a direita
            this.peixe.ida = true;
        }
    }

    colisaoComPolvo(peixe, polvo) {
        console.log("Colisão detectada entre o peixe e o polvo!");
        if (this.peixe.ida) {
            this.peixe.x -= 10; // Faz o peixe retroceder um pouco
        } else {
            this.peixe.x += 10; // Faz o peixe retroceder um pouco
        }
    }

    // Função chamada quando o gancho pesca o peixe
    pescarPeixe(peixe, gancho) {
        this.peixe.pescado = true;
    }
}
