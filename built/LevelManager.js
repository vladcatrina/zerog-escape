var LevelManager = /** @class */ (function () {
    function LevelManager(scene) {
        this.levelList = new Array;
        this.currentLevel = 0;
        this.missing = 0;
        this.levelCount = 0;
        this.scene = scene;
    }
    LevelManager.prototype.generate = function () {
        for (var i = 0; i <= 2; i++) {
            this.addLevel();
        }
    };
    LevelManager.prototype.locatePlayer = function () {
        var player = this.scene.player;
        var playerLevelPos;
        playerLevelPos = -Math.floor((player.sprite.y + GSIZE / 2) / GHEIGHT);
        if (playerLevelPos > this.currentLevel) {
            this.handleLevelChange();
            this.currentLevel = playerLevelPos;
        }
    };
    LevelManager.prototype.handleLevelChange = function () {
        if (this.currentLevel > 0) {
            this.scene.physics.world = new Phaser.Physics.Arcade.World(this.scene, {});
            this.levelList[0].destroy();
            this.levelList.splice(0, 1);
            this.addLevel();
            this.missing++;
        }
    };
    LevelManager.prototype.addLevel = function () {
        var randomLevel = Math.floor(3 * Math.random()) + 1;
        // let randomLevel = 2;
        this.levelList.push(new Level(this.scene, randomLevel, this.levelCount));
        this.levelCount++;
    };
    return LevelManager;
}());
