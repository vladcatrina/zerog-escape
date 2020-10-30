var Exit = /** @class */ (function () {
    // constructor(x: number, y: number, scene: MainScene) {
    function Exit(exitJson, level) {
        this.open = true;
        this.sprite = level.scene.physics.add.sprite(exitJson.x + GSIZE, exitJson.y + level.yOffset + GSIZE / 2, 'exit');
        this.sprite.setSize(GSIZE * 2, GSIZE * 0.75);
        this.scene = level.scene;
    }
    Exit.prototype.update = function () {
        var player = this.scene.player;
        if (player.sprite.y + GSIZE < this.sprite.y) {
            this.shut();
        }
    };
    Exit.prototype.shut = function () {
        if (this.open) {
            this.sprite.anims.play('exitshut');
            this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.sprite);
            this.open = false;
            this.sprite.setImmovable(true);
            this.scene.sound.play('thud');
        }
    };
    Exit.prototype.destroy = function () {
        this.sprite.destroy();
        this.collider.destroy();
    };
    return Exit;
}());
