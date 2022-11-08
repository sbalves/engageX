import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: [Game],
    parent: 'main',
    backgroundColor: '#1a1a2d',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        },
    },
    autoCenter: true,
})
