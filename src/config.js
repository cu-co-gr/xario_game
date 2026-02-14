// Game Configuration
const CONFIG = {
    // Build info
    VERSION: '1.0.0',
    BUILD_TIME: '2026-02-13T00:00:00Z',

    // Game dimensions
    WIDTH: 800,
    HEIGHT: 900,

    // Player settings
    PLAYER: {
        SPEED: 300,
        FIRE_RATE: 200, // milliseconds between shots
        MAX_LIVES: 3,
        START_X: 400,
        START_Y: 750
    },

    // Enemy settings
    ENEMY: {
        SPEED: 150,
        SPAWN_RATE: 1500, // milliseconds between spawns
        MAX_ENEMIES: 5,
        POINTS: 100
    },

    // Projectile settings
    PROJECTILE: {
        PLAYER_SPEED: 500,
        ENEMY_SPEED: 200
    },

    // Background scroll speed
    BACKGROUND: {
        SCROLL_SPEED: 1
    },

    // Asset paths (from GAME_SPEC.md)
    ASSETS: {
        // Player ship (ship 01)
        PLAYER_SHIP: 'Assets/Characters/top-down-shooter-ship/sprites/ship 01/',
        PLAYER_THRUST: 'Assets/Characters/top-down-shooter-ship/sprites/thrust/',

        // Enemy (enemy-01)
        ENEMY_01: 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/',

        // Projectile
        PLAYER_BULLET: 'Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot1.png',

        // Explosion
        EXPLOSION: 'Assets/Misc/Explosions pack/explosion-1-a/',

        // Background
        BACKGROUND: 'Assets/Packs/SpaceShooter/Space Shooter files/background/layered/'
    }
};
