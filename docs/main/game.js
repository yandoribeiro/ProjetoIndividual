import Cena1 from './cena1.js'; // Importa a cena 1 de outro arquivo (cena1.js)
import Cena2 from './cena2.js'; // Importa a cena 2 de outro arquivo (cena2.js)
import Cena3 from "./cena3.js"; // importa a cena 3 de outro arquivo (cena3.js)

const config = {
    type: Phaser.AUTO, // O Phaser escolhe automaticamente entre WebGL e Canvas conforme a compatibilidade do navegador
    width: 1800,                  // Define a largura do jogo (resolução fixa)
    height: 1200,                 // Define a altura do jogo (resolução fixa)
    scale: {
      mode: Phaser.Scale.FIT,    // Ajusta o jogo para caber na janela, mantendo a proporção original
      autoCenter: Phaser.Scale.CENTER_BOTH  // Centraliza o canvas na tela, tanto horizontalmente quanto verticalmente
    },
    physics: {
      default: 'arcade', // Define que o sistema de física usado é o Arcade
        arcade: {
            gravity: { y: 0 }, // Define a gravidade
            debug: false // Ativa/desativa o modo de depuração
      }
    },
    scene: [Cena1, Cena2, Cena3] // Define as cenas do jogo (Cena1, Cena2 e Cena3) que serão carregadas
  };

  const Game = new Phaser.Game(config); // Cria uma nova instância do jogo com a configuração fornecida
