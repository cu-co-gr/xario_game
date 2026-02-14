// Phaser mock for unit testing
// Mocks the Phaser 3 framework so entity classes can be tested without a browser

const mockSprite = {
  setActive: jest.fn().mockReturnThis(),
  setVisible: jest.fn().mockReturnThis(),
  setDepth: jest.fn().mockReturnThis(),
  setScale: jest.fn().mockReturnThis(),
  setPosition: jest.fn().mockReturnThis(),
  setVelocity: jest.fn().mockReturnThis(),
  setVelocityX: jest.fn().mockReturnThis(),
  setVelocityY: jest.fn().mockReturnThis(),
  setTexture: jest.fn().mockReturnThis(),
  setFrame: jest.fn().mockReturnThis(),
  setTint: jest.fn().mockReturnThis(),
  clearTint: jest.fn().mockReturnThis(),
  setAlpha: jest.fn().mockReturnThis(),
  setOrigin: jest.fn().mockReturnThis(),
  setCollideWorldBounds: jest.fn().mockReturnThis(),
  setDrag: jest.fn().mockReturnThis(),
  setStrokeStyle: jest.fn().mockReturnThis(),
  destroy: jest.fn(),
  play: jest.fn().mockReturnThis(),
  x: 0,
  y: 0,
  active: true,
  rotation: 0,
  alpha: 1,
};

function createMockSprite() {
  return { ...mockSprite };
}

const mockBody = {
  setSize: jest.fn().mockReturnThis(),
};

const mockTween = {
  targets: null,
};

const mockScene = {
  add: {
    existing: jest.fn(),
    sprite: jest.fn(() => createMockSprite()),
    text: jest.fn(() => ({
      setOrigin: jest.fn().mockReturnThis(),
      setDepth: jest.fn().mockReturnThis(),
      destroy: jest.fn(),
    })),
    circle: jest.fn(() => ({
      setDepth: jest.fn().mockReturnThis(),
      setStrokeStyle: jest.fn().mockReturnThis(),
      destroy: jest.fn(),
    })),
  },
  physics: {
    add: {
      existing: jest.fn(),
      group: jest.fn(),
    },
  },
  tweens: {
    add: jest.fn(() => mockTween),
  },
  anims: {
    exists: jest.fn(() => false),
    create: jest.fn(),
  },
  player: { x: 400, y: 750 },
  enemyBullets: {
    get: jest.fn(() => ({
      fire: jest.fn(),
    })),
  },
  bossHealthBar: {
    update: jest.fn(),
  },
};

// Phaser global mock
global.Phaser = {
  Physics: {
    Arcade: {
      Sprite: class MockArcadeSprite {
        constructor(scene, x, y, texture) {
          this.scene = scene;
          this.x = x || 0;
          this.y = y || 0;
          this.texture = { key: texture };
          this.active = false;
          this.visible = false;
          this.alpha = 1;
          this.rotation = 0;
          this.depth = 0;
          this.scaleX = 1;
          this.scaleY = 1;
          this.body = { ...mockBody };
          this.layers = [];

          // Chainable sprite methods
          this.setActive = jest.fn(function(val) { this.active = val; return this; });
          this.setVisible = jest.fn(function(val) { this.visible = val; return this; });
          this.setDepth = jest.fn(function(val) { this.depth = val; return this; });
          this.setScale = jest.fn(function(val) { this.scaleX = val; this.scaleY = val; return this; });
          this.setPosition = jest.fn(function(x, y) { this.x = x; this.y = y; return this; });
          this.setVelocity = jest.fn(function(vx, vy) { this.vx = vx; this.vy = vy; return this; });
          this.setVelocityX = jest.fn(function(vx) { this.vx = vx; return this; });
          this.setVelocityY = jest.fn(function(vy) { this.vy = vy; return this; });
          this.setTexture = jest.fn(function(key) { this.texture = { key }; return this; });
          this.setFrame = jest.fn().mockReturnThis();
          this.setTint = jest.fn().mockReturnThis();
          this.clearTint = jest.fn().mockReturnThis();
          this.setAlpha = jest.fn(function(val) { this.alpha = val; return this; });
          this.setOrigin = jest.fn().mockReturnThis();
          this.setCollideWorldBounds = jest.fn().mockReturnThis();
          this.setDrag = jest.fn().mockReturnThis();
          this.play = jest.fn().mockReturnThis();
        }
      },
    },
  },
  Math: {
    Between: jest.fn((min, max) => Math.floor(Math.random() * (max - min + 1)) + min),
    FloatBetween: jest.fn((min, max) => Math.random() * (max - min) + min),
    Clamp: jest.fn((val, min, max) => Math.min(Math.max(val, min), max)),
    Linear: jest.fn((a, b, t) => a + (b - a) * t),
    Angle: {
      Between: jest.fn((x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1)),
    },
    Vector2: class {
      constructor(x, y) { this.x = x || 0; this.y = y || 0; }
      normalize() {
        const len = Math.sqrt(this.x * this.x + this.y * this.y);
        if (len > 0) { this.x /= len; this.y /= len; }
        return this;
      }
      scale(s) { this.x *= s; this.y *= s; return this; }
    },
  },
  Scene: class MockScene {
    constructor() {}
  },
};

// CONFIG global mock
global.CONFIG = {
  VERSION: '1.0.0',
  BUILD_TIME: '2026-02-13T00:00:00Z',
  WIDTH: 800,
  HEIGHT: 900,
  PLAYER: {
    SPEED: 300,
    FIRE_RATE: 200,
    MAX_LIVES: 3,
    START_X: 400,
    START_Y: 750,
  },
  ENEMY: {
    SPEED: 150,
    SPAWN_RATE: 1500,
    MAX_ENEMIES: 5,
    POINTS: 100,
  },
  PROJECTILE: {
    PLAYER_SPEED: 500,
    ENEMY_SPEED: 200,
  },
  BACKGROUND: {
    SCROLL_SPEED: 1,
  },
  ASSETS: {
    PLAYER_SHIP: 'Assets/Characters/top-down-shooter-ship/sprites/ship 01/',
    PLAYER_THRUST: 'Assets/Characters/top-down-shooter-ship/sprites/thrust/',
    ENEMY_01: 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/',
    PLAYER_BULLET: 'Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot1.png',
    EXPLOSION: 'Assets/Misc/Explosions pack/explosion-1-a/',
    BACKGROUND: 'Assets/Packs/SpaceShooter/Space Shooter files/background/layered/',
  },
};

// Load all entity source files into global scope
const fs = require('fs');
const entityFiles = [
  { file: 'src/entities/Projectile.js', name: 'Projectile' },
  { file: 'src/entities/PowerUp.js', name: 'PowerUp' },
  { file: 'src/entities/Asteroid.js', name: 'Asteroid' },
  { file: 'src/entities/Enemy.js', name: 'Enemy' },
  { file: 'src/entities/Boss.js', name: 'Boss' },
];
entityFiles.forEach(({ file, name }) => {
  const code = fs.readFileSync(file, 'utf8');
  // Convert "class Foo extends ..." to "global.Foo = class Foo extends ..."
  const wrapped = code.replace(`class ${name}`, `global.${name} = class ${name}`);
  eval(wrapped);
});

// Helper to create a fresh mock scene for each test
global.createMockScene = () => {
  return {
    add: {
      existing: jest.fn(),
      sprite: jest.fn(() => createMockSprite()),
      text: jest.fn(() => ({
        setOrigin: jest.fn().mockReturnThis(),
        setDepth: jest.fn().mockReturnThis(),
        destroy: jest.fn(),
      })),
      circle: jest.fn(() => ({
        setDepth: jest.fn().mockReturnThis(),
        setStrokeStyle: jest.fn().mockReturnThis(),
        destroy: jest.fn(),
      })),
    },
    physics: {
      add: {
        existing: jest.fn(),
        group: jest.fn(),
      },
    },
    tweens: {
      add: jest.fn(() => mockTween),
    },
    anims: {
      exists: jest.fn(() => false),
      create: jest.fn(),
    },
    player: { x: 400, y: 750 },
    enemyBullets: {
      get: jest.fn(() => ({
        fire: jest.fn(),
      })),
    },
    bossHealthBar: {
      update: jest.fn(),
    },
  };
};
