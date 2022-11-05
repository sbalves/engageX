import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {

    constructor() {
        super('game')
    }

    preload() {

        this.load.image('bunny', 'src/assets/sprites/bunny2_ready.png')
        this.load.image('tiles', 'src/assets/tiles/desert.png')
        this.load.tilemapTiledJSON('map', 'src/assets/tiles/map1.json')
        this.load.image('vision', 'src/assets/particles/fog.png')

    }

    create() {

        //this.cameras.main.setZoom(0.7)

        // ----------------------------------------------------- TILEMAP CREATION 

        const map = this.make.tilemap({
            key: 'map'
        }, 32, 32)
        const tileset = map.addTilesetImage('desert', 'tiles', 32, 32)
        const layer = map.createLayer('toplayer', tileset)

        // ----------------------------------------------------- DARK EFFECT

        const width = this.scale.width
        const height = this.scale.height
        const rt = this.make.renderTexture({
            width,
            height
        }, true)
        rt.fill(0x000000, 1)
        rt.draw(layer)
        rt.setTint(0x0a2948)

        // ----------------------------------------------------- SPRITES CREATION 

        const player = this.add.image(32 + 16, 32 + 16, 'bunny')
        player.setScale(0.2)

        const vision = this.make.image({
            x: player.x,
            y: player.y,
            key: 'vision',
            add: false
        })
        vision.scale = 0.4

        rt.mask = new Phaser.Display.Masks.BitmapMask(this, vision)
        rt.mask.invertAlpha = true


        // ----------------------------------------------------- BUTTONS 

        //  Left
        this.input.keyboard.on('keydown-A', function (event) {
            const tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);
            if (tile.index === 2) player.x -= 0
            else {
                player.x -= 32
                vision.x -= 32
            }
        })

        //  Right
        this.input.keyboard.on('keydown-D', function (event) {
            const tile = layer.getTileAtWorldXY(player.x + 32, player.y, true)
            if (tile.index === 2) player.x += 0
            else {
                player.x += 32
                vision.x += 32
            }
        })

        //  Up
        this.input.keyboard.on('keydown-W', function (event) {
            const tile = layer.getTileAtWorldXY(player.x, player.y - 32, true)
            if (tile.index === 2) player.y -= 0
            else {
                player.y -= 32
                vision.y -= 32
            }
        })

        //  Down
        this.input.keyboard.on('keydown-S', function (event) {
            const tile = layer.getTileAtWorldXY(player.x, player.y + 32, true)
            if (tile.index === 2) player.y += 0
            else {
                player.y += 32
                vision.y += 32
            }
        })

    }


    update() {

        // nothing for now

    }
}