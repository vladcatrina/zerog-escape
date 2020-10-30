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
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(config) {
        var _this = _super.call(this, config) || this;
        _this.buttons = new Array;
        _this.open = false;
        _this.sfxOn = true;
        return _this;
    }
    Menu.prototype.preload = function () {
        this.load.image('window', assetPath + 'menuwindow.png');
        this.load.image('resume', assetPath + 'menuresume.png');
        this.load.image('settings', assetPath + 'menusettings.png');
        this.load.image('quit', assetPath + 'menuquit.png');
        this.load.image('back', assetPath + 'menuback.png');
        this.load.image('keys', assetPath + 'keys.png');
        this.load.spritesheet('sfx', assetPath + 'sfxinput.png', { frameWidth: 100, frameHeight: 25 });
    };
    Menu.prototype.create = function () {
        var _this = this;
        this.scene.sleep();
        this.window = this.add.image(GWIDTH / 2, GHEIGHT / 2, 'window');
        this.window.setAlpha(0.75);
        this.buttons.push(this.add.image(GWIDTH / 2, GHEIGHT / 2 - 50, 'resume').setInteractive());
        this.buttons.push(this.add.image(GWIDTH / 2, GHEIGHT / 2, 'settings').setInteractive());
        this.buttons.push(this.add.image(GWIDTH / 2, GHEIGHT / 2 + 50, 'quit').setInteractive());
        this.buttons.push(this.add.image(GWIDTH / 2, GHEIGHT / 2 - 50, 'back').setInteractive());
        this.sfx = this.add.sprite(GWIDTH / 2, GHEIGHT / 2, 'sfx').setInteractive();
        this.keys = this.add.image(GWIDTH / 2, GHEIGHT / 2 + 60, 'keys').setVisible(false);
        this.anims.create({
            key: 'sfxon',
            frames: [{ key: 'sfx', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'sfxoff',
            frames: [{ key: 'sfx', frame: 1 }],
            frameRate: 20
        });
        this.sfx.setVisible(false);
        var _loop_1 = function (button) {
            button.setAlpha(0.75);
            button.on('pointerover', function () {
                button.setAlpha(1);
            });
            button.on('pointerout', function () {
                button.setAlpha(0.75);
            });
        };
        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var button = _a[_i];
            _loop_1(button);
        }
        this.buttons[0].on('pointerdown', function () {
            _this.events.emit('closemenu');
        });
        this.buttons[1].on('pointerdown', function () {
            _this.openSettings();
        });
        this.buttons[2].on('pointerdown', function () {
            _this.events.emit('quit');
        });
        this.buttons[3].setVisible(false);
        this.buttons[3].on('pointerdown', function () {
            _this.closeSettings();
        });
        this.sfx.on('pointerdown', function () {
            if (_this.sfxOn) {
                _this.sfxOn = false;
                _this.sfx.anims.play('sfxoff');
            }
            else {
                _this.sfxOn = true;
                _this.sfx.anims.play('sfxon');
            }
            _this.events.emit('sfx', _this.sfxOn);
        });
    };
    Menu.prototype.openSettings = function () {
        this.buttons[0].setVisible(false);
        this.buttons[1].setVisible(false);
        this.buttons[2].setVisible(false);
        this.buttons[3].setVisible(true);
        this.sfx.setVisible(true);
        this.keys.setVisible(true);
    };
    Menu.prototype.closeSettings = function () {
        this.buttons[0].setVisible(true);
        this.buttons[1].setVisible(true);
        this.buttons[2].setVisible(true);
        this.buttons[3].setVisible(false);
        this.sfx.setVisible(false);
        this.keys.setVisible(false);
    };
    return Menu;
}(Phaser.Scene));
