var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var assetPath = './src/assets/';
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene(config) {
        return _super.call(this, config) || this;
    }
    MainScene.prototype.preload = function () {
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
    };
    MainScene.prototype.create = function () {
        var _this = this;
        this.createAnims();
        this.player = new Player(GSIZE * 6, GHEIGHT - GSIZE * 6, this);
        this.levelManager = new LevelManager(this);
        this.levelManager.generate();
        //EDIT LATER
        var arbitraryY = 999999;
        this.cameras.main.setBounds(0, -arbitraryY, 0, arbitraryY + GHEIGHT + GSIZE);
        this.cameras.main.startFollow(this.player.sprite);
        this.input.keyboard.on('keydown-A', function () {
            _this.player.toggleZeroG();
            _this.cameras.main.flash();
            _this.events.emit('zeroG', _this.player.floating);
        });
        this.input.keyboard.on('keydown-F', function () {
            for (var _i = 0, _a = _this.levelManager.levelList[_this.levelManager.currentLevel - _this.levelManager.missing].computers; _i < _a.length; _i++) {
                var computer = _a[_i];
                if (_this.physics.overlap(_this.player.sprite, computer.sprite)) {
                    computer.use();
                }
            }
            for (var _b = 0, _c = _this.levelManager.levelList[_this.levelManager.currentLevel - _this.levelManager.missing].gates; _b < _c.length; _b++) {
                var gate = _c[_b];
                if (_this.physics.overlap(_this.player.sprite, gate.button)) {
                    gate.unlock();
                }
            }
        });
    };
    MainScene.prototype.update = function () {
        this.player.update();
        this.levelManager.locatePlayer();
        this.levelManager.levelList.forEach(function (lvl) {
            lvl.update();
        });
    };
    MainScene.prototype.createAnims = function () {
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
    };
    return MainScene;
}(Phaser.Scene));
