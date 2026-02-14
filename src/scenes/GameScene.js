class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load player ship sprites (5 layers for ship 01)
        this.load.image('player-1', 'Assets/Characters/top-down-shooter-ship/sprites/ship 01/_0000_Layer-1.png');
        this.load.image('player-2', 'Assets/Characters/top-down-shooter-ship/sprites/ship 01/_0001_Layer-2.png');
        this.load.image('player-3', 'Assets/Characters/top-down-shooter-ship/sprites/ship 01/_0002_Layer-3.png');
        this.load.image('player-4', 'Assets/Characters/top-down-shooter-ship/sprites/ship 01/_0003_Layer-4.png');
        this.load.image('player-5', 'Assets/Characters/top-down-shooter-ship/sprites/ship 01/_0004_Layer-5.png');

        // Load thrust animation (2 frames)
        this.load.image('thrust-1', 'Assets/Characters/top-down-shooter-ship/sprites/thrust/01/_0000_Layer-2.png');
        this.load.image('thrust-2', 'Assets/Characters/top-down-shooter-ship/sprites/thrust/01/_0001_Layer-1.png');

        // Load enemy-01 sprites (Scout - 5 layers)
        this.load.image('enemy1-1', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/_0000_Layer-1.png');
        this.load.image('enemy1-2', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/_0001_Layer-2.png');
        this.load.image('enemy1-3', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/_0002_Layer-3.png');
        this.load.image('enemy1-4', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/_0003_4.png');
        this.load.image('enemy1-5', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-01/_0004_5.png');

        // Load enemy-02 sprites (Fighter - 4 layers)
        this.load.image('enemy2-1', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-02/_0000_Layer-1.png');
        this.load.image('enemy2-2', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-02/_0001_Layer-2.png');
        this.load.image('enemy2-3', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-02/_0002_Layer-3.png');
        this.load.image('enemy2-4', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-02/_0003_Layer-4.png');

        // Load enemy-03 sprites (Heavy - 4 layers)
        this.load.image('enemy3-1', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-03/_0000_Layer-1.png');
        this.load.image('enemy3-2', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-03/_0001_Layer-2.png');
        this.load.image('enemy3-3', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-03/_0002_Layer-3.png');
        this.load.image('enemy3-4', 'Assets/Characters/top-down-shooter-enemies/sprites/enemy-03/_0003_Layer-4.png');

        // Load alien sprites (Swooper - 8 animation frames)
        for (let i = 1; i <= 8; i++) {
            this.load.image(`alien-${i}`, `Assets/Characters/alien-flying-enemy/sprites/alien-enemy-flying${i}.png`);
        }

        // Load player bullet
        this.load.image('bullet', 'Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot1.png');

        // Load enemy bullets
        this.load.image('enemy-bullet', 'Assets/Misc/EnemyProjectile/Sprites/frame1.png');

        // Load power-up sprites
        this.load.image('powerup-weapon', 'Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot2.png');
        this.load.image('powerup-shield', 'Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot2.png');
        this.load.image('powerup-gem', 'Assets/Packs/SpaceShooter/Space Shooter files/shoot/shoot1.png');

        // Load weapon upgrade sprites
        this.load.image('bullet-spread', 'Assets/Misc/Warped shooting fx/crossed/Sprites/crossed1.png');
        this.load.image('bullet-pulse', 'Assets/Misc/Warped shooting fx/Pulse/Sprites/pulse1.png');

        // Load boss sprites as individual images (more stable than spritesheet)
        this.load.image('boss-frame-0', 'Assets/Misc/top-down-boss/PNG/sprites/boss/_0000_Layer-1.png');
        this.load.image('boss-frame-1', 'Assets/Misc/top-down-boss/PNG/sprites/boss/_0001_Layer-2.png');
        this.load.image('boss-frame-2', 'Assets/Misc/top-down-boss/PNG/sprites/boss/_0002_Layer-3.png');
        this.load.image('boss-frame-3', 'Assets/Misc/top-down-boss/PNG/sprites/boss/_0003_Layer-4.png');
        this.load.image('boss-frame-4', 'Assets/Misc/top-down-boss/PNG/sprites/boss/_0004_Layer-5.png');

        // Load explosion animation (8 frames)
        for (let i = 1; i <= 8; i++) {
            this.load.image(`explosion-${i}`, `Assets/Misc/Explosions pack/explosion-1-a/Sprites/explosion-${i}.png`);
        }

        // Load background layers
        this.load.image('bg-stars', 'Assets/Packs/SpaceShooter/Space Shooter files/background/layered/bg-stars.png');
        this.load.image('bg-planet', 'Assets/Packs/SpaceShooter/Space Shooter files/background/layered/bg-planet.png');
        this.load.image('bg-back', 'Assets/Packs/SpaceShooter/Space Shooter files/background/layered/bg-back.png');
    }

    createAsteroidGraphics() {
        // Create procedural asteroid graphics (rocky irregular circle)
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        // Draw irregular asteroid shape with fixed variations (not random during texture generation)
        graphics.fillStyle(0x888888);
        graphics.beginPath();
        const points = 12;
        const radius = 30;
        const variations = [0.9, 1.0, 0.8, 0.95, 0.75, 1.0, 0.85, 0.95, 0.8, 1.0, 0.9, 0.85]; // Fixed variations

        for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const variation = variations[i];
            const x = Math.cos(angle) * radius * variation;
            const y = Math.sin(angle) * radius * variation;
            if (i === 0) {
                graphics.moveTo(x + 32, y + 32);
            } else {
                graphics.lineTo(x + 32, y + 32);
            }
        }
        graphics.closePath();
        graphics.fillPath();

        // Add some darker spots for detail
        graphics.fillStyle(0x666666);
        graphics.fillCircle(20, 20, 5);
        graphics.fillCircle(40, 25, 4);
        graphics.fillCircle(30, 40, 6);

        // Generate texture from graphics
        graphics.generateTexture('asteroid-large', 64, 64);
        graphics.destroy();
    }

    create() {
        console.log('');
        console.log('**************************************************');
        console.log('*** CREATE CALLED - NEW SCENE STARTING ***');
        console.log('**************************************************');
        console.log('');

        try {
            // Game state
            this.score = 0;
            this.lives = CONFIG.PLAYER.MAX_LIVES;
            this.gameOver = false;
            this.isRestarting = false;
            this.lastFired = 0;
            this.lastEnemySpawn = 0;
            this.lastAsteroidSpawn = 0;
            this.enemiesKilled = 0; // Track for progressive difficulty

            // Stage system
            this.currentStage = 1;
            this.maxStages = 3;
            this.wavesPerStage = 3; // 3 waves before boss (easier testing)

            // Wave system
            this.currentWave = 1;
            this.enemiesPerWave = 18; // Base enemies per wave (20% harder: was 15)
            this.enemiesSpawnedThisWave = 0;
            this.enemiesKilledThisWave = 0;
            this.waveInProgress = false;
            this.wavePaused = false;
            this.wavePauseTimer = 0;
            this.wavePauseDuration = 3000; // 3 seconds between waves

            // Boss state
            this.bossActive = false;
            this.boss = null;
            this.lastBossPowerupDrop = 0;
            this.bossPowerupInterval = 8000; // Drop a power-up every 8 seconds during boss fight

            // Pause state
            this.isPaused = false;

            // Performance monitoring
            this.frameCount = 0;
            this.lastFpsUpdate = 0;
            this.fpsLog = [];
            this.lastFrameTime = performance.now();

            console.log('Setting up background...');
            // Setup background
            this.setupBackground();

        console.log('Creating asteroid graphics...');
        // Create procedural asteroid textures
        this.createAsteroidGraphics();

        // Create groups
        this.bullets = this.physics.add.group({
            classType: Projectile,
            maxSize: 30,
            runChildUpdate: true
        });

        this.enemyBullets = this.physics.add.group({
            classType: Projectile,
            maxSize: 30,
            runChildUpdate: true
        });

        this.enemies = this.physics.add.group({
            classType: Enemy,
            maxSize: 15,
            runChildUpdate: true
        });

        this.explosions = this.add.group({
            maxSize: 15
        });

        this.powerups = this.physics.add.group({
            classType: PowerUp,
            maxSize: 10,
            runChildUpdate: true
        });

        this.asteroids = this.physics.add.group({
            classType: Asteroid,
            maxSize: 15,
            runChildUpdate: true
        });

        // Create player
        this.player = new Player(this, CONFIG.PLAYER.START_X, CONFIG.PLAYER.START_Y);

        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Setup collisions
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.playerHitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemyBullets, this.enemyBulletHitPlayer, null, this);
        this.physics.add.overlap(this.player, this.powerups, this.playerCollectPowerup, null, this);
        this.physics.add.overlap(this.bullets, this.asteroids, this.bulletHitAsteroid, null, this);
        this.physics.add.overlap(this.player, this.asteroids, this.playerHitAsteroid, null, this);

        // Boss collisions will be checked manually in update since boss is a single entity

        console.log('Setting up UI...');
        // Setup UI
        this.setupUI();

        // Show initial wave message
        this.time.delayedCall(500, () => {
            this.startNextWave();
        });

        console.log('=== GameScene created successfully! ===');
        } catch (error) {
            console.error('!!! ERROR IN CREATE !!!', error);
            console.error('Stack trace:', error.stack);
        }
    }

    setupBackground() {
        // Add background layers for parallax scrolling
        this.bgBack = this.add.tileSprite(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, 'bg-back')
            .setOrigin(0, 0);

        this.bgPlanet = this.add.tileSprite(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, 'bg-planet')
            .setOrigin(0, 0);

        this.bgStars = this.add.tileSprite(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, 'bg-stars')
            .setOrigin(0, 0);
    }

    setupUI() {
        // Score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 4
        }).setScrollFactor(0).setDepth(100);

        // Lives text
        this.livesText = this.add.text(16, 56, `Lives: ${this.lives}`, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 4
        }).setScrollFactor(0).setDepth(100);

        // Wave text
        this.waveText = this.add.text(CONFIG.WIDTH / 2, 16, 'Wave 1', {
            fontSize: '32px',
            fill: '#0ff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(100);

        // Boss health bar (initially hidden)
        this.bossHealthBar = null;

        // Pause overlay (initially hidden)
        this.pauseOverlay = this.add.rectangle(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setDepth(200)
            .setVisible(false);

        this.pauseText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'PAUSED\n\nPress P to Resume', {
            fontSize: '64px',
            fill: '#0ff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(201).setVisible(false);

        // FPS counter
        this.fpsText = this.add.text(16, CONFIG.HEIGHT - 16, 'FPS: --', {
            fontSize: '20px',
            fill: '#ffff00',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0, 1).setDepth(150);

        // Version/build info
        const buildDate = new Date(CONFIG.BUILD_TIME).toLocaleString();
        this.add.text(CONFIG.WIDTH - 16, 16, `v${CONFIG.VERSION} | ${buildDate}`, {
            fontSize: '14px',
            fill: '#666666',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 2
        }).setOrigin(1, 0).setDepth(100);
    }

    createBossHealthBar() {
        // Create boss health bar
        const barWidth = 600;
        const barHeight = 30;
        const x = CONFIG.WIDTH / 2 - barWidth / 2;
        const y = 60;

        this.bossHealthBar = {
            background: this.add.rectangle(x, y, barWidth, barHeight, 0x000000).setOrigin(0, 0).setDepth(100),
            fill: this.add.rectangle(x, y, barWidth, barHeight, 0xff0000).setOrigin(0, 0).setDepth(101),
            outline: this.add.rectangle(x, y, barWidth, barHeight).setStrokeStyle(4, 0xffffff).setOrigin(0, 0).setDepth(102),
            text: this.add.text(CONFIG.WIDTH / 2, y + barHeight / 2, 'BOSS', {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'Courier New',
                stroke: '#000',
                strokeThickness: 4
            }).setOrigin(0.5).setDepth(103),
            maxWidth: barWidth,
            x: x,
            y: y,
            update: function(health, maxHealth) {
                const percent = health / maxHealth;
                this.fill.width = this.maxWidth * percent;
                this.text.setText(`BOSS ${health}/${maxHealth}`);
            },
            destroy: function() {
                this.background.destroy();
                this.fill.destroy();
                this.outline.destroy();
                this.text.destroy();
            }
        };
    }

    update(time, delta) {
        // Performance monitoring - calculate FPS
        const currentTime = performance.now();
        const frameDelta = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;
        const currentFPS = 1000 / frameDelta;

        // Update FPS counter every 500ms
        this.frameCount++;
        if (time > this.lastFpsUpdate + 500) {
            const avgFPS = Math.round(currentFPS);
            this.fpsText.setText(`FPS: ${avgFPS}`);
            this.fpsLog.push({time: time, fps: avgFPS, delta: frameDelta});

            // Log to console when FPS drops below 30 or when boss is active
            if (avgFPS < 30 || this.bossActive) {
                console.log(`⚠️ FPS: ${avgFPS} | Frame time: ${frameDelta.toFixed(2)}ms | Boss active: ${this.bossActive}`);
            }

            this.lastFpsUpdate = time;
        }

        // Handle pause toggle (works even during game over)
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey) && !this.gameOver && !this.isRestarting) {
            this.isPaused = !this.isPaused;
            this.pauseOverlay.setVisible(this.isPaused);
            this.pauseText.setVisible(this.isPaused);

            // Pause/resume physics
            if (this.isPaused) {
                this.physics.pause();
            } else {
                this.physics.resume();
            }
        }

        // Don't run update during game over, restart, or pause
        if (this.gameOver || this.isRestarting || this.isPaused) {
            return;
        }

        // Scroll background
        this.bgBack.tilePositionY -= CONFIG.BACKGROUND.SCROLL_SPEED * 0.3;
        this.bgPlanet.tilePositionY -= CONFIG.BACKGROUND.SCROLL_SPEED * 0.6;
        this.bgStars.tilePositionY -= CONFIG.BACKGROUND.SCROLL_SPEED;

        // Update player
        this.player.update(time, delta, this.cursors, this.wasd);

        // Handle shooting (rapid fire has half cooldown)
        const fireRate = this.player.currentWeapon === 'rapidfire' ? CONFIG.PLAYER.FIRE_RATE / 2 : CONFIG.PLAYER.FIRE_RATE;
        if (this.fireKey.isDown && time > this.lastFired + fireRate) {
            this.fireBullet();
            this.lastFired = time;
        }

        // Boss battle logic
        if (this.bossActive && this.boss) {
            this.boss.update(time, delta);

            // Periodically drop power-ups during boss fight
            if (time > this.lastBossPowerupDrop + this.bossPowerupInterval) {
                this.lastBossPowerupDrop = time;
                const x = Phaser.Math.Between(100, CONFIG.WIDTH - 100);
                const types = ['spread', 'rapidfire', 'pulse', 'shield'];
                const type = types[Phaser.Math.Between(0, types.length - 1)];
                const powerup = this.powerups.get(x, -20);
                if (powerup) {
                    powerup.spawn(x, -20, type);
                }
            }

            // Check bullet collisions with boss
            this.bullets.children.entries.forEach(bullet => {
                if (bullet.active && this.physics.overlap(bullet, this.boss)) {
                    this.bulletHitBoss(bullet, this.boss);
                }
            });

            // Check player collision with boss
            if (this.physics.overlap(this.player, this.boss)) {
                this.playerHitBoss();
            }
        }
        // Wave system logic
        else if (this.wavePaused) {
            // Pause between waves
            this.wavePauseTimer += delta;
            if (this.wavePauseTimer >= this.wavePauseDuration) {
                this.startNextWave();
            }
        } else {
            // Wave in progress - spawn enemies
            const spawnRate = Math.max(400, 960 - (this.currentWave * 96)); // 20% faster spawning (was 500/1200/120)
            const maxActiveEnemies = Math.min(15, 5 + this.currentWave); // 20% more concurrent enemies (was 12, 4+wave)

            // Check if we should spawn more enemies
            if (this.enemiesSpawnedThisWave < this.enemiesPerWave &&
                time > this.lastEnemySpawn + spawnRate &&
                this.enemies.countActive(true) < maxActiveEnemies) {
                this.spawnEnemy();
                this.enemiesSpawnedThisWave++;
                this.lastEnemySpawn = time;
            }

            // Check if wave is complete
            if (this.enemiesSpawnedThisWave >= this.enemiesPerWave &&
                this.enemies.countActive(true) === 0) {
                this.completeWave();
            }
        }

        // Remove off-screen bullets
        this.bullets.children.entries.forEach(bullet => {
            if (bullet.active && bullet.y < -50) {
                bullet.destroy();
            }
        });

        // Remove off-screen enemy bullets
        this.enemyBullets.children.entries.forEach(bullet => {
            if (bullet.active && bullet.y > CONFIG.HEIGHT + 50) {
                bullet.destroy();
            }
        });

        // Remove off-screen enemies
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.active && enemy.y > CONFIG.HEIGHT + 50) {
                enemy.destroy();
            }
        });

        // Remove off-screen powerups
        this.powerups.children.entries.forEach(powerup => {
            if (powerup.active && powerup.y > CONFIG.HEIGHT + 50) {
                powerup.destroy();
            }
        });

        // Remove off-screen asteroids
        this.asteroids.children.entries.forEach(asteroid => {
            if (asteroid.active && asteroid.y > CONFIG.HEIGHT + 50) {
                asteroid.destroy();
            }
        });

        // Spawn asteroids periodically (20% more frequent)
        const asteroidSpawnInterval = Math.max(2400, 4800 - (this.currentWave * 240)); // 20% faster (was 3000/6000/300)
        if (time > this.lastAsteroidSpawn + asteroidSpawnInterval) {
            this.spawnAsteroid();
            this.lastAsteroidSpawn = time;
        }
    }

    fireBullet() {
        const weapon = this.player.currentWeapon;
        const speed = CONFIG.PROJECTILE.PLAYER_SPEED;

        switch (weapon) {
            case 'spread':
                // 3 bullets in spread pattern
                for (let i = -1; i <= 1; i++) {
                    const bullet = this.bullets.get(this.player.x, this.player.y - 30);
                    if (bullet) {
                        bullet.setTexture('bullet-spread');
                        bullet.setScale(1.5);
                        bullet.fire(i * 100, -speed);
                    }
                }
                break;

            case 'rapidfire':
                // Single bullet but fire rate is doubled (handled in update)
                const bullet = this.bullets.get(this.player.x, this.player.y - 30);
                if (bullet) {
                    bullet.setTexture('bullet');
                    bullet.setScale(1);
                    bullet.fire(0, -speed * 1.5);
                }
                break;

            case 'pulse':
                // Larger, more powerful pulse laser
                const pulse = this.bullets.get(this.player.x, this.player.y - 30);
                if (pulse) {
                    pulse.setTexture('bullet-pulse');
                    pulse.setScale(2);
                    pulse.fire(0, -speed * 1.2);
                }
                break;

            case 'normal':
            default:
                // Normal bullet
                const normalBullet = this.bullets.get(this.player.x, this.player.y - 30);
                if (normalBullet) {
                    normalBullet.setTexture('bullet');
                    normalBullet.setScale(1);
                    normalBullet.fire(0, -speed);
                }
                break;
        }
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(50, CONFIG.WIDTH - 50);
        const enemy = this.enemies.get(x, -50);
        if (enemy) {
            // Choose enemy type (weighted: more scouts early, more variety later)
            const rand = Math.random();
            const difficulty = Math.min(this.enemiesKilled / 20, 1); // 0 to 1 based on kills

            let enemyType, pattern;

            if (rand < 0.5 - difficulty * 0.2) {
                // Scout (50% early, 30% later)
                enemyType = 1;
                pattern = ['straight', 'sine'][Phaser.Math.Between(0, 1)];
            } else if (rand < 0.75) {
                // Fighter (25%)
                enemyType = 2;
                pattern = 'zigzag';
            } else if (rand < 0.9) {
                // Heavy (15%)
                enemyType = 3;
                pattern = 'straight';
            } else {
                // Swooper (10%)
                enemyType = 4;
                pattern = 'swoop'; // Will be forced in Enemy.spawn()
            }

            enemy.spawn(enemyType, pattern, false, this.currentWave);
        }
    }

    spawnAsteroid() {
        const x = Phaser.Math.Between(50, CONFIG.WIDTH - 50);
        const asteroid = this.asteroids.get(x, -50);
        if (asteroid) {
            // Choose asteroid size (weighted toward medium)
            const rand = Math.random();
            let size;
            if (rand < 0.2) {
                size = 'small';
            } else if (rand < 0.7) {
                size = 'medium';
            } else {
                size = 'large';
            }

            asteroid.spawn(x, -50, size);
        }
    }

    startNextWave() {
        this.wavePaused = false;
        this.wavePauseTimer = 0;

        // Check if we should spawn boss
        if (this.currentWave % this.wavesPerStage === 0) {
            // Boss battle!
            this.spawnBoss();
        } else {
            // Regular wave
            this.enemiesSpawnedThisWave = 0;
            this.enemiesKilledThisWave = 0;

            // Update wave UI
            this.waveText.setText(`Wave ${this.currentWave}`);

            // Show "Wave X" message briefly
            const waveStartText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, `Wave ${this.currentWave}`, {
                fontSize: '64px',
                fill: '#0ff',
                fontFamily: 'Courier New',
                stroke: '#000',
                strokeThickness: 8
            }).setOrigin(0.5).setDepth(200);

            this.tweens.add({
                targets: waveStartText,
                alpha: 0,
                y: CONFIG.HEIGHT / 2 - 50,
                duration: 2000,
                onComplete: () => waveStartText.destroy()
            });
        }
    }

    showBossWarning() {
        const warningText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'WARNING!\nBOSS APPROACHING', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(200);

        // Flash warning
        this.tweens.add({
            targets: warningText,
            alpha: 0.3,
            duration: 300,
            yoyo: true,
            repeat: 4,
            onComplete: () => {
                this.tweens.add({
                    targets: warningText,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => warningText.destroy()
                });
            }
        });
    }

    spawnBoss() {
        console.log('=== SPAWNING BOSS ===');
        this.bossActive = true;
        this.lastBossPowerupDrop = this.time.now;

        // Spawn boss based on current stage
        const bossStage = Math.ceil(this.currentWave / this.wavesPerStage);
        this.boss = new Boss(this, CONFIG.WIDTH / 2, -100);
        this.boss.spawn(bossStage);

        // Create boss health bar
        this.createBossHealthBar();

        // Update wave text
        this.waveText.setText(`BOSS - Stage ${bossStage}`);
    }

    completeWave() {
        // Calculate wave bonus
        const waveBonus = 500 + (this.currentWave * 250);
        this.addScore(waveBonus);

        // Show wave complete message
        const waveCompleteText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, `Wave ${this.currentWave} Complete!\n+${waveBonus} Bonus`, {
            fontSize: '48px',
            fill: '#0f0',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5).setDepth(200);

        this.tweens.add({
            targets: waveCompleteText,
            alpha: 0,
            duration: 3000,
            onComplete: () => waveCompleteText.destroy()
        });

        // Check if we should spawn boss (after 5 waves)
        if (this.currentWave % this.wavesPerStage === 0) {
            // Boss time!
            this.wavePaused = true;
            this.wavePauseTimer = 0;
            this.wavePauseDuration = 5000; // Longer pause before boss

            // Show boss warning
            this.time.delayedCall(2000, () => {
                this.showBossWarning();
            });
        } else {
            // Prepare next wave
            this.currentWave++;
            this.enemiesPerWave = 18 + (this.currentWave * 6); // 20% more enemies each wave
            this.wavePaused = true;
            this.wavePauseTimer = 0;
            this.wavePauseDuration = 3000; // Normal pause
        }
    }

    trySpawnPowerup(x, y) {
        const rand = Math.random();

        // Power-up drop rates (25% total chance)
        if (rand < 0.08) {
            // 8% - Spread shot
            const powerup = this.powerups.get(x, y);
            if (powerup) powerup.spawn(x, y, 'spread');
        } else if (rand < 0.15) {
            // 7% - Rapid fire
            const powerup = this.powerups.get(x, y);
            if (powerup) powerup.spawn(x, y, 'rapidfire');
        } else if (rand < 0.20) {
            // 5% - Pulse laser
            const powerup = this.powerups.get(x, y);
            if (powerup) powerup.spawn(x, y, 'pulse');
        } else if (rand < 0.25) {
            // 5% - Shield
            const powerup = this.powerups.get(x, y);
            if (powerup) powerup.spawn(x, y, 'shield');
        } else if (rand < 0.40) {
            // 15% - Score gem
            const powerup = this.powerups.get(x, y);
            if (powerup) powerup.spawn(x, y, 'gem');
        }
    }

    playerCollectPowerup(player, powerup) {
        const type = powerup.powerUpType;

        // Collection effect
        powerup.collect();

        // Apply power-up based on type
        switch (type) {
            case 'spread':
                this.player.setWeapon('spread', 15000); // 15 seconds
                this.showPowerupMessage('Spread Shot!');
                break;

            case 'rapidfire':
                this.player.setWeapon('rapidfire', 15000);
                this.showPowerupMessage('Rapid Fire!');
                break;

            case 'pulse':
                this.player.setWeapon('pulse', 15000);
                this.showPowerupMessage('Pulse Laser!');
                break;

            case 'shield':
                this.player.addShield();
                this.showPowerupMessage('Shield!');
                break;

            case 'gem':
                this.addScore(500);
                this.showPowerupMessage('+500 Points!');
                break;
        }
    }

    showPowerupMessage(text) {
        const message = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT - 100, text, {
            fontSize: '32px',
            fill: '#0ff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(200);

        this.tweens.add({
            targets: message,
            y: CONFIG.HEIGHT - 150,
            alpha: 0,
            duration: 2000,
            onComplete: () => message.destroy()
        });
    }

    bulletHitEnemy(bullet, enemy) {
        bullet.destroy();

        // Hit enemy (returns true if destroyed)
        const destroyed = enemy.hit();

        if (destroyed) {
            // Create explosion based on enemy type
            const explosionSize = this.getExplosionSizeForEnemy(enemy.enemyType);
            this.createExplosion(enemy.x, enemy.y, explosionSize);

            // Add score based on enemy type
            this.addScore(enemy.points);
            this.enemiesKilled++;
            this.enemiesKilledThisWave++;

            // Chance to drop power-up
            this.trySpawnPowerup(enemy.x, enemy.y);

            // Destroy enemy
            enemy.destroy();
        }
    }

    enemyBulletHitPlayer(player, bullet) {
        bullet.destroy();

        // Create small explosion for bullet impact
        this.createExplosion(bullet.x, bullet.y, 'small');

        // Take damage (respects shield)
        const damageTaken = this.player.takeDamage();
        if (damageTaken) {
            this.lives--;
            this.livesText.setText(`Lives: ${this.lives}`);
            this.player.flash();

            // Check game over
            if (this.lives <= 0) {
                this.triggerGameOver();
            }
        }
    }

    playerHitEnemy(player, enemy) {
        // Create explosion based on enemy type
        const explosionSize = this.getExplosionSizeForEnemy(enemy.enemyType);
        this.createExplosion(enemy.x, enemy.y, explosionSize);

        enemy.destroy();

        // Take damage (respects shield)
        const damageTaken = this.player.takeDamage();
        if (damageTaken) {
            this.lives--;
            this.livesText.setText(`Lives: ${this.lives}`);
            this.player.flash();

            // Check game over
            if (this.lives <= 0) {
                this.triggerGameOver();
            }
        }
    }

    bulletHitAsteroid(bullet, asteroid) {
        bullet.destroy();

        // Hit asteroid (returns true if destroyed)
        const destroyed = asteroid.hit();

        if (destroyed) {
            // Create explosion based on asteroid size
            const explosionSize = asteroid.asteroidSize === 'large' ? 'large' :
                                  asteroid.asteroidSize === 'medium' ? 'medium' : 'small';
            this.createExplosion(asteroid.x, asteroid.y, explosionSize);

            // Add score
            this.addScore(asteroid.points);

            // Check if asteroid should split
            const splitInfo = asteroid.split();
            if (splitInfo) {
                // Spawn smaller asteroids
                for (let i = 0; i < splitInfo.count; i++) {
                    const newAsteroid = this.asteroids.get(asteroid.x, asteroid.y);
                    if (newAsteroid) {
                        newAsteroid.spawn(asteroid.x, asteroid.y, splitInfo.size);
                        // Give each split asteroid a different direction
                        const angle = (i / splitInfo.count) * Math.PI * 2 + Phaser.Math.FloatBetween(-0.5, 0.5);
                        const speed = 100;
                        newAsteroid.setVelocity(
                            Math.cos(angle) * speed,
                            Math.sin(angle) * speed + 80
                        );
                    }
                }
            }

            // Destroy asteroid
            asteroid.destroy();
        }
    }

    playerHitAsteroid(player, asteroid) {
        // Create explosion based on asteroid size
        const explosionSize = asteroid.asteroidSize === 'large' ? 'large' :
                              asteroid.asteroidSize === 'medium' ? 'medium' : 'small';
        this.createExplosion(asteroid.x, asteroid.y, explosionSize);

        // Destroy asteroid
        asteroid.destroy();

        // Take damage (respects shield)
        const damageTaken = this.player.takeDamage();
        if (damageTaken) {
            this.lives--;
            this.livesText.setText(`Lives: ${this.lives}`);
            this.player.flash();

            // Check game over
            if (this.lives <= 0) {
                this.triggerGameOver();
            }
        }
    }

    bulletHitBoss(bullet, boss) {
        bullet.destroy();

        // Hit boss
        const destroyed = boss.hit();

        if (destroyed) {
            // Boss defeated!
            this.bossDefeated();
        }
    }

    playerHitBoss() {
        // Take damage (respects shield)
        const damageTaken = this.player.takeDamage();
        if (damageTaken) {
            this.lives--;
            this.livesText.setText(`Lives: ${this.lives}`);
            this.player.flash();

            // Check game over
            if (this.lives <= 0) {
                this.triggerGameOver();
            }
        }

        // Push player back to prevent multiple hits
        this.player.y += 50;
    }

    bossDefeated() {
        console.log('=== BOSS DEFEATED ===');

        // Save boss position and points before destroying
        const bossX = this.boss.x;
        const bossY = this.boss.y;
        const bossPoints = this.boss.points;

        // Create massive explosion
        this.createExplosion(bossX, bossY, 'xlarge');

        // Add extra explosions for effect
        for (let i = 0; i < 5; i++) {
            this.time.delayedCall(i * 200, () => {
                const offsetX = Phaser.Math.Between(-60, 60);
                const offsetY = Phaser.Math.Between(-60, 60);
                this.createExplosion(bossX + offsetX, bossY + offsetY, 'large');
            });
        }

        // Add score
        this.addScore(bossPoints);

        // Destroy boss health bar
        if (this.bossHealthBar) {
            this.bossHealthBar.destroy();
            this.bossHealthBar = null;
        }

        // Clean up boss
        this.boss.destroy();
        this.boss = null;
        this.bossActive = false;

        // Drop multiple power-ups
        for (let i = 0; i < 3; i++) {
            this.time.delayedCall(500 + i * 300, () => {
                const x = CONFIG.WIDTH / 2 + Phaser.Math.Between(-100, 100);
                const y = 150;
                const types = ['spread', 'rapidfire', 'pulse', 'shield', 'gem'];
                const type = types[Phaser.Math.Between(0, types.length - 1)];
                const powerup = this.powerups.get(x, y);
                if (powerup) powerup.spawn(x, y, type);
            });
        }

        // Show victory message
        this.time.delayedCall(1500, () => {
            this.showBossVictory(bossPoints);
        });
    }

    showBossVictory(points) {
        const victoryText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'BOSS DEFEATED!\n+' + points + ' Points', {
            fontSize: '64px',
            fill: '#00ff00',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(200);

        this.tweens.add({
            targets: victoryText,
            alpha: 0,
            y: CONFIG.HEIGHT / 2 - 50,
            duration: 3000,
            onComplete: () => {
                victoryText.destroy();
                this.progressToNextStage();
            }
        });
    }

    progressToNextStage() {
        // Increment to next stage
        this.currentWave++;
        this.currentStage = Math.ceil(this.currentWave / this.wavesPerStage);

        // Check if game is complete (finished all stages)
        if (this.currentStage > this.maxStages) {
            this.gameComplete();
        } else {
            // Continue to next stage
            this.enemiesPerWave = 18 + (this.currentWave * 6);
            this.wavePaused = true;
            this.wavePauseTimer = 0;
            this.wavePauseDuration = 5000; // Longer pause after boss

            // Show stage transition
            this.showStageTransition();
        }
    }

    showStageTransition() {
        const stageText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, `STAGE ${this.currentStage}`, {
            fontSize: '72px',
            fill: '#ffff00',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5).setDepth(200);

        this.tweens.add({
            targets: stageText,
            scale: 1.2,
            duration: 500,
            yoyo: true,
            onComplete: () => {
                this.tweens.add({
                    targets: stageText,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => stageText.destroy()
                });
            }
        });
    }

    gameComplete() {
        console.log('=== GAME COMPLETE - ALL STAGES CLEARED ===');

        // Show victory screen (store references for cleanup on restart)
        this.gameOverText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 100, 'GAME COMPLETE!', {
            fontSize: '72px',
            fill: '#ffff00',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5).setDepth(200);

        this.finalScoreText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, `Final Score: ${this.score}`, {
            fontSize: '48px',
            fill: '#fff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(200);

        this.restartText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 100, 'Press SPACE to Play Again', {
            fontSize: '32px',
            fill: '#0ff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(200);

        // Pause game
        this.gameOver = true;
        this.physics.pause();

        // Allow restart
        this.input.keyboard.once('keydown-SPACE', () => {
            this.restartGame();
        });
    }

    getExplosionSizeForEnemy(enemyType) {
        // Different explosion sizes based on enemy type
        switch (enemyType) {
            case 1: return 'medium';    // Scout
            case 2: return 'medium';    // Fighter
            case 3: return 'large';     // Heavy
            case 4: return 'xlarge';    // Swooper
            default: return 'medium';
        }
    }

    createExplosion(x, y, size = 'medium') {
        // Determine scale based on size
        let scale;
        switch (size) {
            case 'small':
                scale = 1;
                break;
            case 'medium':
                scale = 2;
                break;
            case 'large':
                scale = 3;
                break;
            case 'xlarge':
                scale = 3.5;
                break;
            default:
                scale = 2;
        }

        // Create explosion animation
        const explosion = this.add.sprite(x, y, 'explosion-1');
        explosion.setScale(scale);
        explosion.setDepth(50);

        // Create animation if it doesn't exist
        if (!this.anims.exists('explode')) {
            this.anims.create({
                key: 'explode',
                frames: [
                    { key: 'explosion-1' },
                    { key: 'explosion-2' },
                    { key: 'explosion-3' },
                    { key: 'explosion-4' },
                    { key: 'explosion-5' },
                    { key: 'explosion-6' },
                    { key: 'explosion-7' },
                    { key: 'explosion-8' }
                ],
                frameRate: 20,
                hideOnComplete: true
            });
        }

        explosion.play('explode');
        explosion.once('animationcomplete', () => {
            explosion.destroy();
        });
    }

    addScore(points) {
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    triggerGameOver() {
        console.log('=== GAME OVER TRIGGERED ===');
        this.gameOver = true;

        // Stop all movement
        console.log('Pausing physics...');
        this.physics.pause();

        // Show game over text (save references for hiding later)
        this.gameOverText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 50, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5).setDepth(200);

        this.finalScoreText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 30, `Final Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(200);

        this.restartText = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 90, 'Press SPACE to Restart', {
            fontSize: '24px',
            fill: '#0ff',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(200);

        // Add restart functionality
        this.input.keyboard.once('keydown-SPACE', () => {
            this.restartGame();
        });
    }

    restartGame() {
        console.log('=== MANUAL RESTART - BYPASSING PHASER LIFECYCLE ===');

        // CRITICAL: Block update() from running during restart
        this.isRestarting = true;

        try {
            // 1. Reset game state variables (keep gameOver=true for now)
            this.score = 0;
            this.lives = CONFIG.PLAYER.MAX_LIVES;
            this.enemiesKilled = 0;
            this.lastFired = 0;
            this.lastEnemySpawn = 0;
            this.lastAsteroidSpawn = 0;

            // Reset stage system
            this.currentStage = 1;

            // Reset wave system
            this.currentWave = 1;
            this.enemiesPerWave = 18; // Match initial value (20% harder)
            this.enemiesSpawnedThisWave = 0;
            this.enemiesKilledThisWave = 0;
            this.waveInProgress = false;
            this.wavePaused = false;
            this.wavePauseTimer = 0;

            // Reset boss state
            this.bossActive = false;
            if (this.boss) {
                this.boss.destroy();
                this.boss = null;
            }
            if (this.bossHealthBar) {
                this.bossHealthBar.destroy();
                this.bossHealthBar = null;
            }

            console.log('✓ Game state reset');

            // 2. Clean up all game objects BEFORE resuming physics
            this.bullets.clear(true, true);
            this.enemyBullets.clear(true, true);
            console.log('✓ Bullets cleared');

            // Destroy all enemies (deactivates and hides)
            this.enemies.children.each(enemy => {
                if (enemy.active) {
                    enemy.destroy();
                }
            });
            console.log('✓ Enemies destroyed');

            // Clear all power-ups
            this.powerups.clear(true, true);
            console.log('✓ Power-ups cleared');

            // Clear all asteroids
            this.asteroids.clear(true, true);
            console.log('✓ Asteroids cleared');

            // 3. Reset player position and state
            this.player.x = CONFIG.PLAYER.START_X;
            this.player.y = CONFIG.PLAYER.START_Y;
            this.player.setVelocity(0, 0);
            this.player.lives = CONFIG.PLAYER.MAX_LIVES;
            this.player.setActive(true);
            this.player.setVisible(true);

            // Reset all player layers
            this.player.layers.forEach(layer => {
                layer.setVisible(true);
                layer.setAlpha(1);
                layer.setPosition(this.player.x, this.player.y);
            });

            // Reset thrust sprites
            this.player.thrust1.setVisible(false);
            this.player.thrust2.setVisible(false);

            // Reset weapon and shield
            this.player.currentWeapon = 'normal';
            this.player.weaponTimer = 0;
            this.player.removeShield();

            console.log('✓ Player reset');

            // 4. Destroy game over UI
            if (this.gameOverText) this.gameOverText.destroy();
            if (this.finalScoreText) this.finalScoreText.destroy();
            if (this.restartText) this.restartText.destroy();
            console.log('✓ Game over UI destroyed');

            // 5. Update HUD
            this.scoreText.setText(`Score: ${this.score}`);
            this.livesText.setText(`Lives: ${this.lives}`);
            this.waveText.setText(`Wave ${this.currentWave}`);
            console.log('✓ HUD updated');

            // 6. LAST STEP: Resume physics and allow game to run
            this.physics.resume();
            this.gameOver = false;
            this.isRestarting = false;
            console.log('✓ Physics resumed, game running');

            console.log('=== MANUAL RESTART COMPLETE ===');

        } catch (error) {
            console.error('!!! ERROR DURING MANUAL RESTART !!!', error);
            console.error('Stack trace:', error.stack);
            this.isRestarting = false;
        }
    }
}
