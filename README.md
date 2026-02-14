# Retro Space Shooter - Milestone 1

A vertical-scrolling retro space shooter built with HTML5 and Phaser 3.

## Milestone 1: Core Gameplay Loop ✅

### Features Implemented
- ✅ Player ship with 8-directional movement (Arrow keys or WASD)
- ✅ Basic shooting mechanic (Spacebar)
- ✅ Enemy spawning with downward movement
- ✅ Collision detection (bullets vs enemies, player vs enemies)
- ✅ Explosion animations
- ✅ Score counter
- ✅ Lives system (3 lives)
- ✅ Parallax scrolling space background
- ✅ Game over screen with restart

## How to Run

### Option 1: Simple HTTP Server (Recommended)

1. Open a terminal in the project directory
2. Run a local web server:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Node.js (if you have http-server installed):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

3. Open your browser and go to: `http://localhost:8000`

### Option 2: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Controls

- **Movement**: Arrow Keys or WASD
- **Shoot**: Spacebar
- **Restart** (after game over): Spacebar

## Assets Used (from GAME_SPEC.md)

All assets are located in the `Assets/` directory as specified in the game spec:

- **Player Ship**: [Assets/Characters/top-down-shooter-ship/sprites/ship 01/](Assets/Characters/top-down-shooter-ship/sprites/ship 01/)
- **Thrust Animation**: [Assets/Characters/top-down-shooter-ship/sprites/thrust/01/](Assets/Characters/top-down-shooter-ship/sprites/thrust/01/)
- **Enemy**: [Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/](Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/)
- **Bullet**: [Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot1.png](Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot1.png)
- **Explosion**: [Assets/Misc/Explosions pack/explosion-1-a/](Assets/Misc/Explosions pack/explosion-1-a/)
- **Background**: [Assets/Packs/SpaceShooter/Space Shooter files/background/layered/](Assets/Packs/SpaceShooter/Space Shooter files/background/layered/)

## Project Structure

```
xario_game/
├── index.html              # Main HTML file
├── src/
│   ├── config.js           # Game configuration
│   ├── main.js             # Game initialization
│   ├── scenes/
│   │   └── GameScene.js    # Main gameplay scene
│   └── entities/
│       ├── Player.js       # Player ship class
│       ├── Enemy.js        # Enemy class
│       └── Projectile.js   # Bullet class
├── Assets/                 # Game assets (sprites, backgrounds, etc.)
├── GAME_SPEC.md           # Complete game specification
└── README.md              # This file
```

## Gameplay

- **Objective**: Destroy as many enemies as possible to achieve the highest score
- **Lives**: You start with 3 lives
- **Scoring**: Each enemy destroyed gives you 100 points
- **Game Over**: When all lives are lost

## Next Steps

See [GAME_SPEC.md](GAME_SPEC.md) for:
- **Milestone 2**: Enhanced gameplay with multiple enemy types, wave system, and power-ups
- **Milestone 3**: Boss battles, stage system, and high score persistence

## Technical Details

- **Engine**: Phaser 3.80.1
- **Language**: JavaScript (ES6)
- **Resolution**: 1280x720 (scales to fit screen)
- **Target**: Modern web browsers

## Troubleshooting

### Assets not loading?
- Make sure you're running the game through a web server (not just opening index.html directly)
- Check that the `Assets/` folder is in the same directory as `index.html`
- Check the browser console (F12) for any error messages

### Performance issues?
- Try a different browser (Chrome recommended)
- Close other browser tabs
- Check that hardware acceleration is enabled in your browser

## License

This is a learning project using pixel art assets. See individual asset folders for licensing information.
