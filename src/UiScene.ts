class UiScene extends Phaser.Scene {
    constructor(config, menu: Menu) {
        super(config);
        this.menu = menu;
    }

    private zeroGAlert: Phaser.GameObjects.Text;
    private scoreDisplay: Phaser.GameObjects.Text;
    private gameOver: Phaser.GameObjects.Text;
    // private timer: Phaser.GameObjects.Text;
    private menuButton: Phaser.GameObjects.Sprite;
    // timerEvent: Phaser.Time.TimerEvent;
    // addedTime: number = 0;
    private menu: Menu;
    private lives;
    private score;
    private hearts: Phaser.GameObjects.Image[];

    preload() {
        this.load.spritesheet('menubutton', assetPath + 'menubutton.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('heart', assetPath + 'heart.png');
    }

    create() {
        this.lives = 3;
        this.score = 0;
        this.hearts = new Array;
        this.createAnims();
        let mainScene = this.scene.get('MainScene');
        this.zeroGAlert = this.add.text(GSIZE, 0, '', { fontFamily: 'Courier', color: '#ffffff', fontSize: '36px' });
        // this.timer = this.add.text(GSIZE * 20, 0, '', { fontFamily: 'Courier', color: '#ffffff', fontSize: '36px' });
        this.scoreDisplay = this.add.text(GSIZE * 20, 0, '', { fontFamily: 'Courier', color: '#ffffff', fontSize: '36px' });
        this.gameOver = this.add.text(GWIDTH / 4, GHEIGHT / 4, '', { fontFamily: 'Courier', color: '#ffffff', fontSize: '36px' }).setVisible(false);

        for (let i = 0; i < this.lives; i++) {
            this.hearts.push(this.add.image(GWIDTH / 2 + i * GSIZE, GSIZE / 2, 'heart'));
        }

        mainScene.events.on('loselife', () => {
            if (this.hearts.length) {
                this.hearts.pop().destroy();
            } else {
                this.events.emit('losegame');
            }
        });

        this.menuButton = this.add.sprite(GSIZE * 23 + GSIZE / 2, GSIZE / 2, 'menubutton').setInteractive();
        this.menuButton.on('pointerover', () => {
            this.menuButton.anims.play('menumouseover');
        });
        this.menuButton.on('pointerout', () => {
            this.menuButton.anims.play('menudefault');
        });

        mainScene.events.on('zeroG', (flag: boolean) => {
            this.zeroGAlert.text = flag ? 'Zero G' : '';
        });
        mainScene.events.on('borrowtime', () => {
            this.score += 50;
            this.scoreUpdate();
        });
        mainScene.events.on('takecoin', () => {
            this.score += 10;
            this.scoreUpdate();
        });

        this.menuButton.on('pointerdown', () => {
            this.toggleMenu();
        });

        this.menu.events.on('closemenu', () => {
            this.toggleMenu();
        });

        this.menu.events.on('sfx', (on) => {
            if (on) {
                mainScene.sound.volume = 1;
            } else {
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

        this.events.on('losegame', () => {
            mainScene.scene.setVisible(false);
            this.scoreDisplay.setVisible(false);
            this.gameOver.setText(['GAME OVER', 'Your score is ' + this.score.toString()]);
            this.gameOver.setVisible(true);
            // setTimeout(() => {
            //     mainScene.events.shutdown();
            //     mainScene.scene.restart();
            //     this.events.shutdown();
            //     this.scene.restart();
            //     this.menu.events.shutdown();
            //     this.menu.scene.restart();
            // }, 2000);
        });
    }

    update() {
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
    }

    scoreUpdate() {
        this.scoreDisplay.text = this.score.toString();
    }

    toggleMenu() {
        let mainScene = this.scene.get('MainScene');
        if (this.menu.open) {
            mainScene.scene.resume();
            this.menu.scene.sleep();
            this.menu.open = false;
        } else {
            mainScene.scene.pause();
            this.menu.scene.wake();
            this.menu.open = true;
        }
    }

    createAnims() {
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
    }

}