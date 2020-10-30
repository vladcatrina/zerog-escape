class Gate {
    public sprite: Phaser.Physics.Arcade.Sprite;
    public open: boolean = false;
    private scene: MainScene;
    public button: Phaser.Physics.Arcade.Sprite;
    private collider: Phaser.Physics.Arcade.Collider;

    constructor(gateJson: any, level: Level) {
        this.sprite = level.scene.physics.add.sprite(
            gateJson.x + GSIZE, 
            gateJson.y + level.yOffset + GSIZE / 2, 
            'gate'
        );
        if (gateJson.vertical) {
            this.sprite.angle = 90;
            this.sprite.setSize(GSIZE * 0.75, GSIZE * 2);
        } else {
            this.sprite.setSize(GSIZE * 2, GSIZE * 0.75);
        }
        
        this.sprite.anims.play('gateshut');
        this.sprite.setImmovable(true);
        this.collider = level.scene.physics.add.collider(this.sprite, level.scene.player.sprite, () => {
            this.scene.player.damage();
            this.scene.sound.play('zap');
        });

        this.button = level.scene.physics.add.sprite(gateJson.unlock.x, gateJson.unlock.y + level.yOffset, 'unlock');
        this.button.anims.play('unlockunused');

        this.scene = level.scene;
    }

    unlock() {
        if (!this.open) {
            this.collider.destroy();
            this.sprite.anims.play('gateopen');
            this.scene.sound.play('zap');
            this.button.anims.play('unlockused');
        }
        this.open = true;
    }

    destroy() {
        this.sprite.destroy();
        this.collider.destroy();
        this.button.destroy();
    }
}