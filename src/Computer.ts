class Computer {
    public sprite: Phaser.Physics.Arcade.Sprite;
    public on: boolean = true;
    private scene: MainScene;

    constructor(computerJson: any, level: Level) {
        this.sprite = level.scene.physics.add.sprite(
            computerJson.x + GSIZE / 2,
            computerJson.y + level.yOffset + GSIZE / 2,
            'computer'
        ).setImmovable(true);


        this.scene = level.scene;
    }

    use() {
        if (this.on) {
            this.scene.events.emit('borrowtime');
            this.sprite.anims.play('computeroff');
            this.on = false;
            this.scene.sound.play('computer');
        }
    }
}