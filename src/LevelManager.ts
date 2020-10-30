class LevelManager {
    public levelList: Level[] = new Array;
    private scene: MainScene;
    public currentLevel: number = 0;
    public missing: number = 0;
    private levelCount: number = 0;
    
    constructor(scene: MainScene) {
        this.scene = scene;
    }

    generate() {
        for (let i = 0; i <= 2; i++) {
            this.addLevel();
        }
    }

    locatePlayer() {
        let player = this.scene.player;
        let playerLevelPos: number;

        playerLevelPos = - Math.floor((player.sprite.y + GSIZE / 2) / GHEIGHT);
        if (playerLevelPos > this.currentLevel) {
            this.handleLevelChange();
            this.currentLevel = playerLevelPos;
        }
    }

    handleLevelChange() {
        if (this.currentLevel > 0) {
            this.scene.physics.world = new Phaser.Physics.Arcade.World(this.scene, {});
            this.levelList[0].destroy();
            this.levelList.splice(0, 1);
            this.addLevel();
            this.missing++;
        }
    }

    addLevel() {
        let randomLevel: number = Math.floor(3 * Math.random()) + 1;
        // let randomLevel = 2;
        this.levelList.push(new Level(this.scene, randomLevel, this.levelCount));
        this.levelCount++;
    }
}