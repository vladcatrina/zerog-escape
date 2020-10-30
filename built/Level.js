var Level = /** @class */ (function () {
    function Level(scene, levelNumber, levelPos) {
        this.computers = new Array;
        this.guns = new Array();
        this.gates = new Array;
        this.scene = scene;
        this.jsonMap = scene.cache.json.get('level' + levelNumber);
        this.levelPos = levelPos;
        this.yOffset = -GHEIGHT * levelPos;
        this.create();
    }
    Level.prototype.create = function () {
        var _this = this;
        var yOffset = -GHEIGHT * this.levelPos;
        this.background = this.scene.add.group();
        for (var x = GSIZE / 2; x < GWIDTH; x += GSIZE) {
            for (var y = GSIZE / 2 + yOffset; y < GHEIGHT + yOffset; y += GSIZE) {
                // this.scene.add.image(x, y, 'background');
                this.background.create(x, y, 'background');
            }
        }
        this.platforms = this.scene.physics.add.staticGroup();
        //Adding one hardcoded line of floor before level 0
        if (this.levelPos == 0) {
            for (var i = 0; i < GWIDTH / GSIZE; i++) {
                this.platforms.create(i * GSIZE + GSIZE / 2, GHEIGHT + GSIZE / 2, 'floor');
            }
        }
        this.jsonMap.floor.forEach(function (e) {
            var x, y;
            x = e.start.x + GSIZE / 2;
            y = e.start.y + GSIZE / 2 + yOffset;
            for (var i = 0; i < e.length; i++) {
                _this.platforms.create(x, y, 'floor');
                if (e.vertical) {
                    y += GSIZE;
                }
                else {
                    x += GSIZE;
                }
            }
        });
        this.platformCollider = this.scene.physics.add.collider(this.scene.player.sprite, this.platforms, function () {
            if (!_this.scene.player.sprite.body.wasTouching.down) {
                _this.scene.sound.play('land');
            }
        });
        this.exit = new Exit(this.jsonMap.exit, this);
        for (var _i = 0, _a = this.jsonMap.computers; _i < _a.length; _i++) {
            var computerJson = _a[_i];
            this.computers.push(new Computer(computerJson, this));
        }
        for (var _b = 0, _c = this.jsonMap.guns; _b < _c.length; _b++) {
            var gunJson = _c[_b];
            this.guns.push(new Gun(gunJson, this));
        }
        for (var _d = 0, _e = this.jsonMap.gates; _d < _e.length; _d++) {
            var gateJson = _e[_d];
            this.gates.push(new Gate(gateJson, this));
        }
        this.coins = this.scene.physics.add.staticGroup();
        for (var _f = 0, _g = this.jsonMap.coins; _f < _g.length; _f++) {
            var coin = _g[_f];
            this.coins.create(coin.x, coin.y + yOffset, 'coin');
        }
        this.coins.playAnimation('coin');
        this.coinCollider = this.scene.physics.add.overlap(this.coins, this.scene.player.sprite, function (playerSprite, coin) {
            // coin.destroy();
            // coin.disableBody(true, true);
            coin.destroy();
            _this.scene.sound.play('coin');
            playerSprite.body.touching.down = false;
            // this.scene.player.coins++;
            _this.scene.events.emit('takecoin');
        });
    };
    Level.prototype.update = function () {
        this.exit.update();
        if (this.scene.levelManager.currentLevel == this.levelPos) {
            for (var _i = 0, _a = this.guns; _i < _a.length; _i++) {
                var gun = _a[_i];
                gun.update();
            }
        }
    };
    Level.prototype.destroy = function () {
        // let promise: Promise<string>;
        // promise = new Promise<string>((resolve, reject) => {
        //     console.log('trying to destroy');
        //     this.background.destroy(true);
        //     this.coinCollider.destroy();
        //     this.platforms.destroy();
        //     this.platformCollider.destroy();
        //     this.coins.destroy(true);
        //     for (let gun of this.guns) {
        //         gun.destroy();
        //     }
        //     resolve('level destroyed');
        // });
        // return promise;
        // this.background.destroy(true);
        // this.coinCollider.destroy();
        // // this.platforms.destroy();
        // this.platformCollider.destroy();
        // this.coins.destroy(true);
        // for (let gun of this.guns) {
        //     gun.destroy();
        // }
        this.scene.physics.world.destroy();
        // console.log('destroying but dumb');
    };
    return Level;
}());
