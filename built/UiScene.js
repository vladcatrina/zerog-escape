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
var UiScene = /** @class */ (function (_super) {
    __extends(UiScene, _super);
    function UiScene(config, menu) {
        var _this = _super.call(this, config) || this;
        _this.menu = menu;
        return _this;
    }
    UiScene.prototype.preload = function () {
        this.load.spritesheet('menubutton', assetPath + 'menubutton.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('heart', assetPath + 'heart.png');
    };
    UiScene.prototype.create = function () {
        var _this = this;
        this.lives = 3;
        this.score = 0;
        this.hearts = new Array;
        this.createAnims();
        var mainScene = this.scene.get('MainScene');
        this.zeroGAlert = this.add.text(GSIZE, 0, '', { fontFamily: 'Courier', color: '#ffffff', fontSize: '36px' });
        // this.timer = this.add.text(GSIZE * 20, 0, '', { fontFamily: 'Courier', color: '#ffffff', fontSize: '36px' });
        this.scoreDisplay = this.add.text(GSIZE * 20, 0, '', { fontFamily: 'Courier', color: '#ffffff', fontSize: '36px' });
        this.gameOver = this.add.text(GWIDTH / 4, GHEIGHT / 4, '', { fontFamily: 'Courier', color: '#ffffff', fontSize: '36px' }).setVisible(false);
        for (var i = 0; i < this.lives; i++) {
            this.hearts.push(this.add.image(GWIDTH / 2 + i * GSIZE, GSIZE / 2, 'heart'));
        }
        mainScene.events.on('loselife', function () {
            if (_this.hearts.length) {
                _this.hearts.pop().destroy();
            }
            else {
                _this.events.emit('losegame');
            }
        });
        this.menuButton = this.add.sprite(GSIZE * 23 + GSIZE / 2, GSIZE / 2, 'menubutton').setInteractive();
        this.menuButton.on('pointerover', function () {
            _this.menuButton.anims.play('menumouseover');
        });
        this.menuButton.on('pointerout', function () {
            _this.menuButton.anims.play('menudefault');
        });
        mainScene.events.on('zeroG', function (flag) {
            _this.zeroGAlert.text = flag ? 'Zero G' : '';
        });
        mainScene.events.on('borrowtime', function () {
            _this.score += 50;
            _this.scoreUpdate();
        });
        mainScene.events.on('takecoin', function () {
            _this.score += 10;
            _this.scoreUpdate();
        });
        this.menuButton.on('pointerdown', function () {
            _this.toggleMenu();
        });
        this.menu.events.on('closemenu', function () {
            _this.toggleMenu();
        });
        this.menu.events.on('sfx', function (on) {
            if (on) {
                mainScene.sound.volume = 1;
            }
            else {
                mainScene.sound.volume = 0;
            }
        });
        // this.menu.events.on('quit', () => {
        //     this.toggleMenu();
        //     mainScene.scene.restart();
        //     this.scene.restart();
        //     this.menu.scene.restart();
        //     this.menu.events.shutdown();
        // });
        this.events.on('losegame', function () {
            mainScene.scene.setVisible(false);
            _this.scoreDisplay.setVisible(false);
            _this.gameOver.setText(['GAME OVER', 'Your score is ' + _this.score.toString()]);
            _this.gameOver.setVisible(true);
            // setTimeout(() => {
            //     mainScene.events.shutdown();
            //     mainScene.scene.restart();
            //     this.events.shutdown();
            //     this.scene.restart();
            //     this.menu.events.shutdown();
            //     this.menu.scene.restart();
            // }, 2000);
        });
    };
    UiScene.prototype.update = function () {
        // if (!this.timer) {
        //     return;
        // }
        // let mainScene = this.scene.get('MainScene');
        // let now = 120 - Math.floor(mainScene.time.now / 1000) + Math.floor(this.addedTime / 1000);
        // let minutes = Math.floor(now / 60);
        // let seconds = now % 60;
        // this.timer.text = minutes + (seconds < 10 ? ':0' : ':') + seconds;
        // if (minutes == 0 && seconds == 0 || minutes < 0) {
        //     console.log('game over bruh');
        //     this.timer.destroy();
        //     this.timer = undefined;
        // }
    };
    UiScene.prototype.scoreUpdate = function () {
        this.scoreDisplay.text = this.score.toString();
    };
    UiScene.prototype.toggleMenu = function () {
        var mainScene = this.scene.get('MainScene');
        if (this.menu.open) {
            mainScene.scene.resume();
            this.menu.scene.sleep();
            this.menu.open = false;
        }
        else {
            mainScene.scene.pause();
            this.menu.scene.wake();
            this.menu.open = true;
        }
    };
    UiScene.prototype.createAnims = function () {
        this.anims.create({
            key: 'menudefault',
            frames: [{ key: 'menubutton', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'menumouseover',
            frames: [{ key: 'menubutton', frame: 1 }],
            frameRate: 20
        });
    };
    return UiScene;
}(Phaser.Scene));
