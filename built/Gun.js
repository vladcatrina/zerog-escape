var Gun = /** @class */ (function () {
    // constructor(x: number, y: number, scene: MainScene, level: Level, rotationSpeed: number, startingAngle: number, rateOfFire: number) {
    //     this.sprite = scene.physics.add.sprite(x, y, 'gun').setImmovable(true);
    //     this.scene = scene;
    //     this.level = level;
    //     this.rotationSpeed = rotationSpeed;
    //     this.sprite.angle = startingAngle;
    //     this.rateOfFire = rateOfFire;
    //     // this.timer = this.scene.time.addEvent({ delay: rateOfFire, loop: true, callback: () => this.fire()});
    // }
    function Gun(gunJson, level) {
        // timer: Phaser.Time.TimerEvent;
        this.timer = 0;
        this.bullets = new Array;
        this.bulletColliders = new Array;
        this.sprite = level.scene.physics.add.sprite(gunJson.x + GSIZE / 2, gunJson.y + level.yOffset + GSIZE / 2, 'gun').setImmovable(true);
        this.scene = level.scene;
        this.level = level;
        this.rotationSpeed = gunJson.rotationSpeed;
        this.sprite.angle = gunJson.startingAngle;
        this.rateOfFire = gunJson.rateOfFire;
        // this.timer = this.scene.time.addEvent({ delay: rateOfFire, loop: true, callback: () => this.fire()});
    }
    Gun.prototype.update = function () {
        this.sprite.angle += this.rotationSpeed;
        if (this.timer <= 0) {
            this.timer = this.rateOfFire;
            this.fire();
        }
        else {
            this.timer -= 10;
        }
    };
    Gun.prototype.fire = function () {
        var _this = this;
        this.scene.sound.play('pew');
        var xVel = Math.cos(this.sprite.rotation) * 100;
        var yVel = Math.sin(this.sprite.rotation) * 100;
        var bx = this.sprite.x + GSIZE / 2 * Math.cos(this.sprite.rotation);
        var by = this.sprite.y + GSIZE / 2 * Math.sin(this.sprite.rotation);
        // let bullet = this.scene.add.rectangle(bx, by, 10, 4, 0xc70d00);
        var bullet = this.scene.add.rectangle(bx, by, 10, 4, 0xc70d00);
        bullet.rotation = this.sprite.rotation;
        this.scene.physics.add.existing(bullet);
        bullet.body.setVelocity(xVel, yVel);
        bullet.body.setImmovable(true);
        this.bulletColliders.push(this.scene.physics.add.overlap(bullet, this.scene.player.sprite, function (bullet, playerSprite) {
            _this.scene.player.damage();
            bullet.destroy();
            playerSprite.body.touching.down = false;
            _this.scene.sound.play('zap');
        }));
        this.bullets.push(bullet);
        //levels to check for collision
        var levelsToCheck = [this.level];
        if (this.level.levelPos > 0) {
            levelsToCheck.push(this.scene.levelManager.levelList[this.level.levelPos - this.scene.levelManager.missing - 1]);
        }
        if (this.level.levelPos < this.scene.levelManager.levelList.length - 1) {
            levelsToCheck.push(this.scene.levelManager.levelList[this.level.levelPos - this.scene.levelManager.missing + 1]);
        }
        for (var _i = 0, levelsToCheck_1 = levelsToCheck; _i < levelsToCheck_1.length; _i++) {
            var level = levelsToCheck_1[_i];
            var collider1 = this.scene.physics.add.collider(bullet, level.platforms, function () {
                bullet.destroy();
                // collider1.destroy();
            });
            var collider2 = this.scene.physics.add.collider(bullet, level.exit.sprite, function () {
                bullet.destroy();
                // collider2.destroy();
            });
            if (collider1.active) {
                this.bulletColliders.push(collider1);
            }
            if (collider2.active) {
                this.bulletColliders.push(collider2);
            }
            // this.bulletColliders.push(collider1, collider2);
        }
    };
    Gun.prototype.destroy = function () {
        this.sprite.destroy();
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var bullet = _a[_i];
            bullet.destroy();
        }
        for (var _b = 0, _c = this.bulletColliders; _b < _c.length; _b++) {
            var bulletCollider = _c[_b];
            if (bulletCollider) {
                bulletCollider.destroy();
            }
        }
    };
    return Gun;
}());
