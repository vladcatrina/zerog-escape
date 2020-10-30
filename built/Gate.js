var Gate = /** @class */ (function () {
    function Gate(gateJson, level) {
        var _this = this;
        this.open = false;
        this.sprite = level.scene.physics.add.sprite(gateJson.x + GSIZE, gateJson.y + level.yOffset + GSIZE / 2, 'gate');
        if (gateJson.vertical) {
            this.sprite.angle = 90;
            this.sprite.setSize(GSIZE * 0.75, GSIZE * 2);
        }
        else {
            this.sprite.setSize(GSIZE * 2, GSIZE * 0.75);
        }
        this.sprite.anims.play('gateshut');
        this.sprite.setImmovable(true);
        this.collider = level.scene.physics.add.collider(this.sprite, level.scene.player.sprite, function () {
            _this.scene.player.damage();
            _this.scene.sound.play('zap');
        });
        this.button = level.scene.physics.add.sprite(gateJson.unlock.x, gateJson.unlock.y + level.yOffset, 'unlock');
        this.button.anims.play('unlockunused');
        this.scene = level.scene;
    }
    Gate.prototype.unlock = function () {
        if (!this.open) {
            this.collider.destroy();
            this.sprite.anims.play('gateopen');
            this.scene.sound.play('zap');
            this.button.anims.play('unlockused');
        }
        this.open = true;
    };
    Gate.prototype.destroy = function () {
        this.sprite.destroy();
        this.collider.destroy();
        this.button.destroy();
    };
    return Gate;
}());
