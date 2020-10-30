const assetPath: string = './src/assets/';

class MainScene extends Phaser.Scene {
    public player: Player;
    public levelManager: LevelManager;
    constructor(config: Phaser.Types.Scenes.SettingsConfig) {
        super(config);
    }
    public preload() {
        this.load.image('background', assetPath + 'background.png');
        this.load.image('floor', assetPath + 'floor.png');
        this.load.spritesheet('dude', assetPath + 'dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('exit', assetPath + 'exit.png', { frameWidth: 64, frameHeight: 32 });
        this.load.spritesheet('gate', assetPath + 'gate.png', { frameWidth: 64, frameHeight: 32 });
        this.load.spritesheet('unlock', assetPath + 'unlock.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('computer', assetPath + 'computer.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('gun', assetPath + 'gun.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('coin', assetPath + 'coin.png', { frameWidth: 16, frameHeight: 16 });
        this.load.json('level1', assetPath + '1.json');
        this.load.json('level2', assetPath + '2.json');
        this.load.json('level3', assetPath + '3.json');
        this.load.json('level4', assetPath + '4.json');
        this.load.json('level5', assetPath + '5.json');
        this.load.audio('jump', assetPath + 'jump.mp3');
        this.load.audio('pew', assetPath + 'pew.wav');
        this.load.audio('zap', assetPath + 'zap.wav');
        this.load.audio('thud', assetPath + 'thud.wav');
        this.load.audio('land', assetPath + 'land.wav');
        this.load.audio('coin', assetPath + 'coin.wav');
        this.load.audio('computer', assetPath + 'computer.wav');
    }

    public create() {
        this.createAnims();
        this.player = new Player(GSIZE * 6, GHEIGHT - GSIZE * 6, this);
        this.levelManager = new LevelManager(this);
        this.levelManager.generate();

        //EDIT LATER
        const arbitraryY = 999999;
        this.cameras.main.setBounds(0, -arbitraryY, 0, arbitraryY + GHEIGHT + GSIZE);
        this.cameras.main.startFollow(this.player.sprite);

        this.input.keyboard.on('keydown-A', () => {
            this.player.toggleZeroG();
            this.cameras.main.flash();
            this.events.emit('zeroG', this.player.floating);
        });

        this.input.keyboard.on('keydown-F', () => {
            for (let computer of this.levelManager.levelList[this.levelManager.currentLevel - this.levelManager.missing].computers) {
                if (this.physics.overlap(this.player.sprite, computer.sprite)) {
                    computer.use();
                }
            }

            for (let gate of this.levelManager.levelList[this.levelManager.currentLevel - this.levelManager.missing].gates) {
                if (this.physics.overlap(this.player.sprite, gate.button)) {
                    gate.unlock();
                }
            }
        });
    }

    public update() {
        this.player.update();

        this.levelManager.locatePlayer();

        this.levelManager.levelList.forEach(lvl => {
            lvl.update();
        });
    }

    private createAnims() {
        this.anims.create({
            key: 'computeron',
            frames: [{ key: 'computer', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'computeroff',
            frames: [{ key: 'computer', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'gateopen',
            frames: [{ key: 'gate', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'gateshut',
            frames: [{ key: 'gate', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'gun',
            frames: [{ key: 'gun', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'exitopen',
            frames: [{ key: 'exit', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'exitshut',
            frames: [{ key: 'exit', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'unlockunused',
            frames: [{ key: 'unlock', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'unlockused',
            frames: [{ key: 'unlock', frame: 1 }],
            frameRate: 20
        });
    }
}
