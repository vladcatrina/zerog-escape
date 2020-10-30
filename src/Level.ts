class Level {
    public scene: MainScene;
    private jsonMap: any;
    public levelPos: number;
    public exit: Exit;
    public computers: Computer[] = new Array;
    public guns: Gun[] = new Array();
    public gates: Gate[] = new Array;
    public coins: Phaser.Physics.Arcade.StaticGroup;
    public platforms: Phaser.Physics.Arcade.StaticGroup;
    private background: Phaser.GameObjects.Group;
    private coinCollider: Phaser.Physics.Arcade.Collider;
    private platformCollider: Phaser.Physics.Arcade.Collider;
    public yOffset: number;

    constructor(scene: MainScene, levelNumber: number, levelPos: number) {
        this.scene = scene;
        this.jsonMap = scene.cache.json.get('level' + levelNumber);

        this.levelPos = levelPos;
        this.yOffset = - GHEIGHT * levelPos;

        this.create();
    }

    create() {
        const yOffset: number = - GHEIGHT * this.levelPos;
        this.background = this.scene.add.group();
        for (let x = GSIZE / 2; x < GWIDTH; x += GSIZE) {
            for (let y = GSIZE / 2 + yOffset; y < GHEIGHT + yOffset; y += GSIZE) {
                // this.scene.add.image(x, y, 'background');
                this.background.create(x, y, 'background');
            }
        }

        this.platforms = this.scene.physics.add.staticGroup();

        //Adding one hardcoded line of floor before level 0
        if (this.levelPos == 0) {
            for (let i = 0; i < GWIDTH / GSIZE; i++) {
                this.platforms.create(i * GSIZE + GSIZE / 2, GHEIGHT + GSIZE / 2, 'floor');
            }
        }

        this.jsonMap.floor.forEach(e => {
            let x: number, y: number;
            x = e.start.x + GSIZE / 2;
            y = e.start.y + GSIZE / 2 + yOffset;
            for (let i = 0; i < e.length; i++) {
                this.platforms.create(x, y, 'floor');
                if (e.vertical) {
                    y += GSIZE;
                } else {
                    x += GSIZE;
                }
            }
        });

        this.platformCollider = this.scene.physics.add.collider(this.scene.player.sprite, this.platforms, () => {
            if (!this.scene.player.sprite.body.wasTouching.down) {
                this.scene.sound.play('land');
            }
        });

        this.exit = new Exit(
            this.jsonMap.exit,
            this
        );

        for (let computerJson of this.jsonMap.computers) {
            this.computers.push(new Computer(
                computerJson,
                this
            ));
        }

        for (let gunJson of this.jsonMap.guns) {
            this.guns.push(new Gun(
                gunJson,
                this
            ));
        }

        for (let gateJson of this.jsonMap.gates) {
            this.gates.push(new Gate(
                gateJson,
                this
            ));
        }

        this.coins = this.scene.physics.add.staticGroup();
        for (let coin of this.jsonMap.coins) {
            this.coins.create(
                coin.x,
                coin.y + yOffset,
                'coin'
            );
        }
        this.coins.playAnimation('coin');
        this.coinCollider = this.scene.physics.add.overlap(this.coins, this.scene.player.sprite, (playerSprite: Phaser.Physics.Arcade.Sprite, coin) => {
            // coin.destroy();
            // coin.disableBody(true, true);
            coin.destroy();
            this.scene.sound.play('coin');
            playerSprite.body.touching.down = false;
            // this.scene.player.coins++;
            this.scene.events.emit('takecoin');
        });
    }

    update() {
        this.exit.update();
        if (this.scene.levelManager.currentLevel == this.levelPos) {
            for (let gun of this.guns) {
                gun.update();
            }
        }
    }

    destroy() {
        // let promise: Promise<string>;
        // promise = new Promise<string>((resolve, reject) => {
        //     console.log('trying to destroy');
        //     this.background.destroy(true);
        //     this.coinCollider.destroy();
        //     this.platforms.destroy();
        //     this.platformCollider.destroy();
        //     this.coins.destroy(true);
        //     for (let gun of this.guns) {
        //         gun.destroy();
        //     }
        //     resolve('level destroyed');
        // });
        // return promise;

        // this.background.destroy(true);
        // this.coinCollider.destroy();
        // // this.platforms.destroy();
        // this.platformCollider.destroy();
        // this.coins.destroy(true);
        // for (let gun of this.guns) {
        //     gun.destroy();
        // }
        this.scene.physics.world.destroy();
        // console.log('destroying but dumb');
    }
}