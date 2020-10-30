class Exit {
    public sprite: Phaser.Physics.Arcade.Sprite;
    public open: boolean = true;
    private scene: MainScene;
    private collider: Phaser.Physics.Arcade.Collider;

    // constructor(x: number, y: number, scene: MainScene) {
    constructor(exitJson: any, level: Level) {

        this.sprite = level.scene.physics.add.sprite(
            exitJson.x + GSIZE, 
            exitJson.y + level.yOffset + GSIZE / 2, 
            'exit'
        );

        this.sprite.setSize(GSIZE * 2, GSIZE * 0.75);

        this.scene = level.scene;
    }

    update() {
        let player = this.scene.player;

        if (player.sprite.y + GSIZE < this.sprite.y) {
            this.shut();
        }
    }

    shut() {
        if (this.open) {
            this.sprite.anims.play('exitshut');
            this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.sprite);
            this.open = false;
            this.sprite.setImmovable(true);
            this.scene.sound.play('thud');
        }
    }

    destroy() {
        this.sprite.destroy();
        this.collider.destroy();
    }
}