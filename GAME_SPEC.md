# Retro Space Shooter - Game Specification

## Project Overview
A vertical-scrolling retro space shooter built with HTML5/JavaScript (Canvas/Phaser framework). Players control a spaceship, destroy waves of enemies, collect power-ups, and face epic boss battles.

---

## Technical Stack
- **Engine**: HTML5 Canvas / Phaser 3
- **Language**: JavaScript/TypeScript
- **Target Platform**: Web Browser (Desktop & Mobile)
- **Resolution**: 1280x720 (scalable)

---

## Core Requirements

### Gameplay Mechanics
- **Player Control**:
  - Arrow keys / WASD for 8-directional movement
  - Spacebar for shooting
  - Constrain player to screen boundaries

- **Combat System**:
  - Vertical scrolling gameplay (enemies approach from top)
  - Projectile-based combat
  - Multiple weapon types with upgrades
  - Enemy variety with different behaviors

- **Progression System**:
  - Wave-based enemy spawning
  - Stage progression with increasing difficulty
  - Boss battles at end of each stage
  - Score accumulation with combo multipliers

- **Power-up System**:
  - Collectible items that enhance ship abilities
  - Weapon upgrades (spread shot, rapid fire, etc.)
  - Shield/health pickups
  - Score multiplier gems

### Visual Style
- **Art Style**: Pixel art retro aesthetic
- **Animation**: Sprite-based with smooth frame animations
- **Effects**: Explosions, hit flashes, particle effects
- **UI**: Retro-styled HUD with score, lives, and power-up indicators

### Game Flow
1. Main Menu → Game Start
2. Stage 1-3 with wave-based enemies
3. Boss battle at end of each stage
4. Game Over screen with high score display
5. Restart option

---

## Asset Library

All assets are located in the `Assets/` directory and organized by type.

### Player Assets

#### Player Ship Options
- **Primary Ship**: [Assets/Packs/SpaceShooter/Space Shooter files/player/sprites/](Assets/Packs/SpaceShooter/Space Shooter files/player/sprites/)
  - Main player sprite with animation frames

- **Alternative Ships**: [Assets/Characters/top-down-shooter-ship/sprites/](Assets/Characters/top-down-shooter-ship/sprites/)
  - `ship 01/` - Blue fighter
  - `ship 02/` - Red fighter
  - `ship 03/` - Green fighter
  - `ship 04/` - Yellow fighter
  - `thrust/` - Engine thrust animation frames

### Enemy Assets

#### Standard Enemies
- **Space Shooter Enemies**: [Assets/Packs/SpaceShooter/Space Shooter files/enemy/sprites/](Assets/Packs/SpaceShooter/Space Shooter files/enemy/sprites/)
  - Basic enemy ship with animation

- **Top-Down Enemies**: [Assets/Characters/top-down-shooter-enemies/sprites/](Assets/Characters/top-down-shooter-enemies/sprites/)
  - `enemy-01/` - Scout ship (fast, weak)
  - `enemy-02/` - Fighter ship (medium)
  - `enemy-03/` - Heavy ship (slow, strong)
  - `enemy-death/` - Death animation frames

#### Flying Enemies
- **Alien Flying Enemy**: [Assets/Characters/alien-flying-enemy/sprites/](Assets/Characters/alien-flying-enemy/sprites/)
  - 8-frame animation (alien-enemy-flying1.png through alien-enemy-flying8.png)
  - Swooping attack pattern enemy
  - Spritesheet available: [Assets/Characters/alien-flying-enemy/spritesheet.png](Assets/Characters/alien-flying-enemy/spritesheet.png)

#### Boss Enemy
- **Boss Ship**: [Assets/Misc/top-down-boss/](Assets/Misc/top-down-boss/)
  - Large enemy for end-of-stage battles

### Environment Assets

#### Backgrounds
- **Primary Background**: [Assets/Packs/SpaceShooter/Space Shooter files/background/layered/](Assets/Packs/SpaceShooter/Space Shooter files/background/layered/)
  - Layered parallax space background
  - Preview: [Assets/Packs/SpaceShooter/Space Shooter files/background/bg-preview.png](Assets/Packs/SpaceShooter/Space Shooter files/background/bg-preview.png)

- **Alternative Background**: [Assets/Environments/space_background_pack/Blue Version/layered/](Assets/Environments/space_background_pack/Blue Version/layered/)
  - Blue-tinted space background with multiple layers

#### Environmental Hazards
- **Asteroids**: [Assets/Packs/SpaceShooter/Space Shooter files/asteroids/](Assets/Packs/SpaceShooter/Space Shooter files/asteroids/)
  - `asteroid.png` - Large asteroid
  - `asteroid-small.png` - Small asteroid

- **Additional Asteroids**: [Assets/Packs/asteroid-fighter/PNG/asteroids/](Assets/Packs/asteroid-fighter/PNG/asteroids/)
  - More asteroid variations

### Weapon & Projectile Assets

#### Player Weapons
- **Basic Shots**: [Assets/Packs/SpaceShooter/Space Shooter files/shoot/](Assets/Packs/SpaceShooter/Space Shooter files/shoot/)
  - `shoot1.png` - Standard bullet
  - `shoot2.png` - Upgraded bullet

#### Advanced Weapons (Power-ups)
- **Warped Shooting FX**: [Assets/Misc/Warped shooting fx/](Assets/Misc/Warped shooting fx/)
  - `Bolt/` - Energy bolt weapons
  - `charged/` - Charged shot effects
  - `crossed/` - Spread shot pattern
  - `Pulse/` - Pulse laser effects
  - `spark/` - Electric spark weapons
  - `waveform/` - Wave beam weapons

#### Enemy Projectiles
- **Enemy Bullets**: [Assets/Misc/EnemyProjectile/](Assets/Misc/EnemyProjectile/)
  - Enemy weapon sprites

### Visual Effects Assets

#### Explosions
- **Primary Explosions**: [Assets/Packs/SpaceShooter/Space Shooter files/explosion/sprites/](Assets/Packs/SpaceShooter/Space Shooter files/explosion/sprites/)
  - Basic explosion animation frames

- **Enhanced Explosions**: [Assets/Misc/Explosions pack/](Assets/Misc/Explosions pack/)
  - `explosion-1-a/` - Small explosion
  - `explosion-1-b/` - Medium explosion
  - `explosion-1-c/` - Large explosion
  - `explosion-1-d/` - Massive explosion
  - `explosion-1-e/` - Fiery explosion
  - `explosion-1-f/` - Blue explosion
  - `explosion-1-g/` - Special explosion

- **Enemy Death**: [Assets/Misc/EnemyDeath/](Assets/Misc/EnemyDeath/)
  - Specific enemy death effects

#### Hit Effects
- **Hit Flash**: [Assets/Packs/SpaceShooter/Space Shooter files/flash/](Assets/Packs/SpaceShooter/Space Shooter files/flash/)
  - Impact flash effects

- **Hit Effects**: [Assets/Packs/SpaceShooter/Space Shooter files/Hit/](Assets/Packs/SpaceShooter/Space Shooter files/Hit/)
  - Bullet impact effects

- **Advanced Hit FX**: [Assets/Misc/Warped shooting fx/hits/](Assets/Misc/Warped shooting fx/hits/)
  - Various hit effect animations

### Power-up & Collectible Assets

#### Collectibles
- **Gems/Power-ups**: [Assets/Misc/gems/spritesheets/](Assets/Misc/gems/spritesheets/)
  - Animated gem sprites for score multipliers
  - Can be color-coded for different power-up types

---

## Milestone Breakdown

### Milestone 1: Core Gameplay Loop (Week 1-2)
**Goal**: Create a playable vertical shooter with basic mechanics

#### Features
- ✅ Player ship spawns at bottom center
- ✅ 8-directional movement with keyboard controls
- ✅ Basic shooting mechanic (spacebar)
- ✅ Single enemy type spawning from top
- ✅ Enemy movement patterns (straight down)
- ✅ Collision detection (player bullets vs enemies, player vs enemies)
- ✅ Enemy destruction with basic explosion
- ✅ Score counter (UI)
- ✅ Lives system (3 lives)
- ✅ Scrolling space background

#### Assets Used
- **Player**: [ship 01/](Assets/Characters/top-down-shooter-ship/sprites/ship 01/) + [thrust/](Assets/Characters/top-down-shooter-ship/sprites/thrust/)
- **Enemy**: [enemy-01/](Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/)
- **Projectile**: [shoot1.png](Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot1.png)
- **Explosion**: [explosion-1-a/](Assets/Misc/Explosions pack/explosion-1-a/)
- **Background**: [layered/](Assets/Packs/SpaceShooter/Space Shooter files/background/layered/)

#### Success Criteria
- Player can move and shoot smoothly
- Enemies spawn and move predictably
- Collisions work correctly
- Score increases when enemies are destroyed
- Game ends when lives reach 0

---

### Milestone 2: Enhanced Gameplay & Power-ups (Week 3-4)
**Goal**: Add depth with multiple enemies, power-ups, and wave system

#### Features
- ✅ **Multiple Enemy Types**:
  - Scout (fast, weak, straight movement)
  - Fighter (medium, zigzag pattern)
  - Heavy (slow, strong, shoots back)
  - Swooping alien (dive attack pattern)

- ✅ **Wave System**:
  - Wave counter UI
  - Progressive difficulty (more enemies, faster)
  - Wave clear bonus points
  - Brief pause between waves

- ✅ **Power-up System**:
  - Collectible drops from enemies
  - Weapon upgrades (spread shot, rapid fire, pulse laser)
  - Shield power-up (1 extra hit)
  - Score multiplier gems
  - Visual indicator for active power-ups

- ✅ **Enhanced Effects**:
  - Multiple explosion types for different enemies
  - Hit flash when player takes damage
  - Particle effects for power-up collection
  - Enemy death animations

- ✅ **Asteroids**:
  - Environmental hazards
  - Destructible obstacles with health

#### Assets Used
- **Additional Enemies**:
  - [enemy-02/](Assets/Characters/top-down-shooter-enemies/sprites/enemy-02/)
  - [enemy-03/](Assets/Characters/top-down-shooter-enemies/sprites/enemy-03/)
  - [alien-flying-enemy sprites/](Assets/Characters/alien-flying-enemy/sprites/)

- **Power-up Weapons**:
  - [crossed/](Assets/Misc/Warped shooting fx/crossed/) - Spread shot
  - [Pulse/](Assets/Misc/Warped shooting fx/Pulse/) - Pulse laser
  - [charged/](Assets/Misc/Warped shooting fx/charged/) - Power shot

- **Collectibles**: [gems/spritesheets/](Assets/Misc/gems/spritesheets/)
- **Asteroids**: [asteroids/](Assets/Packs/SpaceShooter/Space Shooter files/asteroids/)
- **Enhanced Explosions**: [explosion-1-b/](Assets/Misc/Explosions pack/explosion-1-b/) through [explosion-1-d/](Assets/Misc/Explosions pack/explosion-1-d/)
- **Hit Effects**: [hits/](Assets/Misc/Warped shooting fx/hits/)
- **Enemy Projectiles**: [EnemyProjectile/](Assets/Misc/EnemyProjectile/)

#### Success Criteria
- 3+ distinct enemy types with unique behaviors
- Waves increase in difficulty progressively
- Power-ups spawn and can be collected
- Weapon upgrades visibly change player firepower
- Game feels more dynamic and engaging

---

### Milestone 3: Boss Battles & Complete Game (Week 5-6)
**Goal**: Polish and complete the full game experience

#### Features
- ✅ **Stage System**:
  - 3 complete stages
  - Each stage has 5 waves + boss
  - Stage transition screens
  - Progressive background changes

- ✅ **Boss Battles**:
  - Large boss ship at end of each stage
  - Multi-phase attack patterns
  - Boss health bar
  - Unique movement patterns per boss
  - Special boss explosions

- ✅ **High Score System**:
  - Persistent high score (localStorage)
  - Combo multiplier system (consecutive kills)
  - Perfect wave bonus
  - Boss kill bonus
  - High score display on game over

- ✅ **UI/UX Polish**:
  - Main menu screen
  - Pause functionality
  - Game over screen with stats
  - Restart/Continue options
  - Visual polish (screen shake, flash effects)

- ✅ **Difficulty Balancing**:
  - Playtesting and tweaking
  - Enemy health/damage balancing
  - Power-up spawn rates
  - Boss difficulty tuning

- ✅ **Player Ship Selection** (Bonus):
  - Choose from 4 different ships at start
  - Each with slightly different stats

#### Assets Used
- **Boss**: [top-down-boss/](Assets/Misc/top-down-boss/)
- **Alternative Player Ships**:
  - [ship 02/](Assets/Characters/top-down-shooter-ship/sprites/ship 02/)
  - [ship 03/](Assets/Characters/top-down-shooter-ship/sprites/ship 03/)
  - [ship 04/](Assets/Characters/top-down-shooter-ship/sprites/ship 04/)

- **Boss Explosions**:
  - [explosion-1-e/](Assets/Misc/Explosions pack/explosion-1-e/)
  - [explosion-1-f/](Assets/Misc/Explosions pack/explosion-1-f/)
  - [explosion-1-g/](Assets/Misc/Explosions pack/explosion-1-g/)

- **All Advanced Weapons**: [Warped shooting fx/](Assets/Misc/Warped shooting fx/)
- **Alternative Background**: [Blue Version/](Assets/Environments/space_background_pack/Blue Version/)

#### Success Criteria
- Complete playthrough from menu to game over
- 3 stages with functional bosses
- High scores persist between sessions
- Game feels balanced and fair
- Smooth performance (60 FPS)
- No major bugs or crashes

---

## Game Balance & Design

### Scoring System
- **Enemy Kill**: 100 points (base)
- **Combo Multiplier**: +10% per consecutive kill (max 5x)
- **Wave Clear Bonus**: 500 points
- **Boss Kill**: 5000 points
- **Gem Collect**: 50 points + 2x score multiplier (10 seconds)
- **Perfect Wave**: 1000 bonus (no damage taken)

### Power-up Drop Rates
- **Weapon Upgrade**: 15% chance on enemy death
- **Shield**: 8% chance on enemy death
- **Score Gem**: 12% chance on enemy death
- **Boss Guaranteed**: 3 power-ups on boss death

### Enemy Stats (Base - Stage 1)

| Enemy Type | Health | Speed | Points | Pattern |
|------------|--------|-------|--------|---------|
| Scout | 1 hit | Fast | 100 | Straight down |
| Fighter | 2 hits | Medium | 200 | Zigzag |
| Heavy | 3 hits | Slow | 300 | Straight + shoots |
| Swooper | 2 hits | Fast | 250 | Dive attack |

### Boss Stats

| Boss | Health | Phases | Special Attack |
|------|--------|--------|----------------|
| Stage 1 | 50 hits | 2 | Spread shot |
| Stage 2 | 75 hits | 3 | Laser beam + minions |
| Stage 3 | 100 hits | 3 | Bullet hell + asteroids |

---

## Technical Requirements

### Performance Targets
- **Frame Rate**: 60 FPS (constant)
- **Load Time**: < 3 seconds
- **Memory**: < 100 MB
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest 2 versions)

### Code Structure
```
/src
  /core
    - game.js (main game loop)
    - config.js (game settings)
  /entities
    - player.js
    - enemy.js
    - boss.js
    - projectile.js
    - powerup.js
  /systems
    - collision.js
    - spawner.js
    - score.js
  /scenes
    - menu.js
    - gameplay.js
    - gameover.js
  /utils
    - assetLoader.js
    - input.js
/assets
  (organized as per Asset Library structure)
/index.html
```

### Asset Loading Strategy
- **Preload**: All essential assets in menu scene
- **Sprite Atlases**: Combine sprites for efficiency
- **Lazy Load**: Boss assets only when needed
- **Asset Pool**: Reuse sprites (bullets, explosions)

---

## Development Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Setup & Planning | 2 days | Project structure, Phaser setup, asset organization |
| **Milestone 1** | 1-2 weeks | Playable core loop |
| **Milestone 2** | 1-2 weeks | Enhanced gameplay with power-ups |
| **Milestone 3** | 1-2 weeks | Complete game with bosses |
| Polish & Testing | 3-5 days | Bug fixes, balancing, optimization |

**Total Estimated Time**: 5-7 weeks

---

## Future Enhancements (Post-Launch)
- Sound effects and background music
- Mobile touch controls
- Endless mode
- Leaderboard (online)
- Additional stages and bosses
- Co-op multiplayer
- Achievements system
- Ship customization

---

## Success Metrics
- ✅ All three milestones are playable and fun
- ✅ Game runs at 60 FPS on target browsers
- ✅ No game-breaking bugs
- ✅ Balanced difficulty curve
- ✅ Clear visual feedback for all actions
- ✅ Replayability through high score system

---

## Notes
- All asset paths are relative to project root
- Assets are already provided in pixel art style
- Focus on tight, responsive controls
- Keep scope manageable - cut features if timeline slips
- Playtest after each milestone for feedback

---

**Document Version**: 1.0
**Last Updated**: 2026-02-12
**Status**: Ready for Development
