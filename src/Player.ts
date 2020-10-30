class Player {
    public sprite: Phaser.Physics.Arcade.Sprite;
    public scene: MainScene;
    // public coins: number = 0;
    public lives: number = 3;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(x: number, y: number, scene: MainScene) {
        this.sprite = scene.physics.add.sprite(x, y, 'dude').setDepth(999);
        this.scene = scene;
        this.sprite.setBounce(0.2);
        // this.sprite.setCollideWorldBounds(true);
        this.sprite.setGravityY(this.gravityAcc);
        this.sprite.setSize(GSIZE, GSIZE * 1.25);
        this.sprite.setOffset(0, GSIZE / 4);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'leftair',
            frames: [{ key: 'dude', frame: 1 }],
            frameRate: 20
        });
        this.scene.anims.create({
            key: 'rightair',
            frames: [{ key: 'dude', frame: 8 }],
            frameRate: 20
        });
    }

    private gravityAcc: number = 800;
    private jumpAcc: number = 420;
    private velocity: number = 160;
    private dir: number = 0;

    public update() {
        //EDIT LATER
        let cursors = this.cursors;
        if (cursors.left.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityX(-this.velocity);
            this.sprite.anims.play('left', true);
            this.dir = 1;
        }
        else if (cursors.right.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityX(this.velocity);
            this.sprite.anims.play('right', true);
            this.dir = 2;
        }
        else if (this.sprite.body.touching.down) {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('turn');
            this.dir = 0;
        }
        if ((cursors.up.isDown || cursors.space.isDown) && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-this.jumpAcc);
            this.scene.sound.play('jump');
        }
        if (!this.sprite.body.touching.down) {
            if (this.dir == 1) {
                this.sprite.anims.play('leftair');
            } else if(this.dir == 2) {
                this.sprite.anims.play('rightair');
            } 
        }
        // if (this.sprite.body.touching.down && !this.sprite.body.wasTouching.down) {
        //     this.scene.sound.play('land');
        // }
    }

    floating: boolean;

    public toggleZeroG() {
        if (this.floating) {
            this.sprite.setGravityY(this.gravityAcc);
        } else {
            this.sprite.setGravityY(0);
        }
        this.floating = !this.floating;
    }

    public damage() {
        this.sprite.setTint(0xff0000);
        this.scene.time.addEvent({ delay: 100, loop: false, callback: () => this.sprite.setTint() });
        this.scene.events.emit('loselife');
    }

}