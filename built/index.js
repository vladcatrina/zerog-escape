var GWIDTH = 768;
var GHEIGHT = 512;
var GSIZE = 32;
var sceneConfig = {
    key: 'MainScene',
    active: true,
    physics: {
        "default": 'arcade',
        arcade: {
            debug: false
        }
    }
};
var mainScene = new MainScene(sceneConfig);
var menu = new Menu({ key: 'Menuscene', active: true });
var uiScene = new UiScene({ key: 'UiScene', active: true }, menu);
var gameConfig = {
    type: Phaser.AUTO,
    width: GWIDTH,
    height: GHEIGHT,
    resolution: 1,
    fps: { target: 30 },
    scale: { mode: Phaser.Scale.ScaleModes.FIT },
    backgroundColor: '#2d2d2d',
    scene: [mainScene, uiScene, menu]
};
var game = new Phaser.Game(gameConfig);
