class Gun {
    sprite: Phaser.Physics.Arcade.Sprite;
    scene: MainScene;
    level: Level;
    // timer: Phaser.Time.TimerEvent;
    timer: number = 0;
    rotationSpeed: number;
    rateOfFire: number;
    bullets: Phaser.GameObjects.Rectangle[] = new Array;
    bulletColliders: Phaser.Physics.Arcade.Collider[] = new Array;

    // constructor(x: number, y: number, scene: MainScene, level: Level, rotationSpeed: number, startingAngle: number, rateOfFire: number) {
    //     this.sprite = scene.physics.add.sprite(x, y, 'gun').setImmovable(true);

    //     this.scene = scene;
    //     this.level = level;
    //     this.rotationSpeed = rotationSpeed;
    //     this.sprite.angle = startingAngle;
    //     this.rateOfFire = rateOfFire;
    //     // this.timer = this.scene.time.addEvent({ delay: rateOfFire, loop: true, callback: () => this.fire()});
    // }

    constructor(gunJson: any, level: Level) {
        this.sprite = level.scene.physics.add.sprite(
            gunJson.x + GSIZE / 2, 
            gunJson.y + level.yOffset + GSIZE / 2, 
            'gun'
        ).setImmovable(true);

        this.scene = level.scene;
        this.level = level;
        this.rotationSpeed = gunJson.rotationSpeed;
        this.sprite.angle = gunJson.startingAngle;
        this.rateOfFire = gunJson.rateOfFire;
        // this.timer = this.scene.time.addEvent({ delay: rateOfFire, loop: true, callback: () => this.fire()});
    }

    update() {
        this.sprite.angle += this.rotationSpeed;
        if (this.timer <= 0) {
            this.timer = this.rateOfFire;
            this.fire();
        } else {
            this.timer -= 10;
        }
    }

    fire() {
        this.scene.sound.play('pew');
        let xVel = Math.cos(this.sprite.rotation) * 100;
        let yVel = Math.sin(this.sprite.rotation) * 100;
        let bx = this.sprite.x + GSIZE / 2 * Math.cos(this.sprite.rotation);
        let by = this.sprite.y + GSIZE / 2 * Math.sin(this.sprite.rotation);

        // let bullet = this.scene.add.rectangle(bx, by, 10, 4, 0xc70d00);
        let bullet = this.scene.add.rectangle(bx, by, 10, 4, 0xc70d00);
        bullet.rotation = this.sprite.rotation;
        this.scene.physics.add.existing(bullet);
        bullet.body.setVelocity(xVel, yVel);
        bullet.body.setImmovable(true);

        this.bulletColliders.push(this.scene.physics.add.overlap(bullet, this.scene.player.sprite, (bullet, playerSprite: Phaser.Physics.Arcade.Sprite) => {
            this.scene.player.damage();
            bullet.destroy();
            playerSprite.body.touching.down = false;
            this.scene.sound.play('zap');
        }));
        this.bullets.push(bullet);

        //levels to check for collision
        let levelsToCheck: [Level] = [this.level];
        if (this.level.levelPos > 0) {
            levelsToCheck.push(this.scene.levelManager.levelList[this.level.levelPos - this.scene.levelManager.missing - 1]);
        }
        if (this.level.levelPos < this.scene.levelManager.levelList.length - 1) {
            levelsToCheck.push(this.scene.levelManager.levelList[this.level.levelPos - this.scene.levelManager.missing + 1]);
        }
        for (let level of levelsToCheck) {
            let collider1 = this.scene.physics.add.collider(bullet, level.platforms, () => {
                bullet.destroy();
                // collider1.destroy();
            });
            let collider2 = this.scene.physics.add.collider(bullet, level.exit.sprite, () => {
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
    }

    destroy() {
        this.sprite.destroy();
        for (let bullet of this.bullets) {
            bullet.destroy();
        }
        for (let bulletCollider of this.bulletColliders) {
            if (bulletCollider) {
                bulletCollider.destroy();
            }
        }

    }
}