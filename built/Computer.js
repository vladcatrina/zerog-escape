var Computer = /** @class */ (function () {
    function Computer(computerJson, level) {
        this.on = true;
        this.sprite = level.scene.physics.add.sprite(computerJson.x + GSIZE / 2, computerJson.y + level.yOffset + GSIZE / 2, 'computer').setImmovable(true);
        this.scene = level.scene;
    }
    Computer.prototype.use = function () {
        if (this.on) {
            this.scene.events.emit('borrowtime');
            this.sprite.anims.play('computeroff');
            this.on = false;
            this.scene.sound.play('computer');
        }
    };
    return Computer;
}());
