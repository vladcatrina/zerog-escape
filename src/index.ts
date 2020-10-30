const GWIDTH = 768;
const GHEIGHT = 512;
const GSIZE = 32;

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    key: 'MainScene',
    active: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

let mainScene: MainScene = new MainScene(sceneConfig);
let menu: Menu = new Menu({ key: 'Menuscene', active: true });
let uiScene: UiScene = new UiScene({ key: 'UiScene', active: true }, menu);

let gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: GWIDTH,
    height: GHEIGHT,
    resolution: 1,
    fps: { target: 30 },
    scale: { mode: Phaser.Scale.ScaleModes.FIT},
    backgroundColor: '#2d2d2d',
    scene: [mainScene, uiScene, menu]
};

let game: Phaser.Game = new Phaser.Game(gameConfig);


