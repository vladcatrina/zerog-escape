class Menu extends Phaser.Scene {
    private window: Phaser.GameObjects.Image;
    private buttons: Phaser.GameObjects.Image[] = new Array;
    public open: boolean = false;
    // public uiScene: UiScene;
    private sfx: Phaser.GameObjects.Sprite;
    private sfxOn: boolean = true;
    private keys: Phaser.GameObjects.Image;

    constructor(config) {
        super(config);
    }

    public preload() {

        this.load.image('window', assetPath + 'menuwindow.png');
        this.load.image('resume', assetPath + 'menuresume.png');
        this.load.image('settings', assetPath + 'menusettings.png');
        this.load.image('quit', assetPath + 'menuquit.png');
        this.load.image('back', assetPath + 'menuback.png');
        this.load.image('keys', assetPath + 'keys.png');
        this.load.spritesheet('sfx', assetPath + 'sfxinput.png', { frameWidth: 100, frameHeight: 25 });
    }
    create() {
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

        for (let button of this.buttons) {
            button.setAlpha(0.75);
            button.on('pointerover', () => {
                button.setAlpha(1);
            });
            button.on('pointerout', () => {
                button.setAlpha(0.75);
            });
        }
        this.buttons[0].on('pointerdown', () => {
            this.events.emit('closemenu');
        });
        this.buttons[1].on('pointerdown', () => {
            this.openSettings();
        });
        this.buttons[2].on('pointerdown', () => {
            this.events.emit('quit');
        });
        this.buttons[3].setVisible(false);
        this.buttons[3].on('pointerdown', () => {
            this.closeSettings();
        });
        this.sfx.on('pointerdown', () => {
            if (this.sfxOn) {
                this.sfxOn = false;
                this.sfx.anims.play('sfxoff');
            } else {
                this.sfxOn = true;
                this.sfx.anims.play('sfxon');
            }
            this.events.emit('sfx', this.sfxOn);
        });
    }

    openSettings() {
        this.buttons[0].setVisible(false);
        this.buttons[1].setVisible(false);
        this.buttons[2].setVisible(false);
        this.buttons[3].setVisible(true);
        this.sfx.setVisible(true);
        this.keys.setVisible(true);
    }

    closeSettings() {
        this.buttons[0].setVisible(true);
        this.buttons[1].setVisible(true);
        this.buttons[2].setVisible(true);
        this.buttons[3].setVisible(false);
        this.sfx.setVisible(false);
        this.keys.setVisible(false);
    }
}