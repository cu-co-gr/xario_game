class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy1-1');

        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.layers = [];
        this.enemyType = 1; // Default to scout
        this.animSprite = null; // For animated enemies (alien)

        // Enemy stats (will be set in spawn)
        this.health = 1;
        this.maxHealth = 1;
        this.points = 100;
        this.speed = 150;

        // Set physics properties
        this.setDepth(5);
        this.body.setSize(40, 40);
        this.setVisible(false);

        // Movement pattern
        this.movementPattern = 'straight';
        this.moveTimer = 0;
        this.zigzagDirection = 1;
        this.divePhase = 'approach'; // For swooper: approach, dive, retreat

        // Shooting
        this.canShoot = false;
        this.shootTimer = 0;
        this.shootCooldown = 3000;

        // Start inactive
        this.setActive(false);
    }

    spawn(enemyType = 1, pattern = 'straight', canShoot = false, waveNumber = 1) {
        this.setActive(true);
        this.setVisible(false);
        this.enemyType = enemyType;

        // Clean up old layers/sprites
        this.layers.forEach(layer => layer.destroy());
        this.layers = [];
        if (this.animSprite) {
            this.animSprite.destroy();
            this.animSprite = null;
        }

        // Speed multiplier based on wave (increases 8% per wave)
        const waveSpeedMultiplier = 1 + ((waveNumber - 1) * 0.08);

        // Set enemy type-specific properties
        switch (enemyType) {
            case 1: // Scout - fast, weak
                this.createLayers('enemy1', 5);
                this.health = 1;
                this.maxHealth = 1;
                this.points = 100;
                this.speed = 230 * waveSpeedMultiplier; // 15% faster (was 200)
                this.body.setSize(40, 40);
                break;

            case 2: // Fighter - medium
                this.createLayers('enemy2', 4);
                this.health = 2;
                this.maxHealth = 2;
                this.points = 200;
                this.speed = 195 * waveSpeedMultiplier; // 15% faster (was 170)
                this.body.setSize(45, 45);
                break;

            case 3: // Heavy - slow, strong, shoots
                this.createLayers('enemy3', 4);
                this.health = 3;
                this.maxHealth = 3;
                this.points = 300;
                this.speed = 138 * waveSpeedMultiplier; // 15% faster (was 120)
                this.canShoot = true;
                this.shootCooldown = 1700; // Shoots 15% more often (was 2000ms)
                this.body.setSize(50, 50);
                break;

            case 4: // Swooper (alien) - animated, dive attack
                this.createAnimatedSprite();
                this.health = 2;
                this.maxHealth = 2;
                this.points = 250;
                this.speed = 253 * waveSpeedMultiplier; // 15% faster (was 220)
                this.body.setSize(45, 45);
                pattern = 'swoop'; // Force swoop pattern
                break;
        }

        // Set movement pattern
        this.movementPattern = pattern;
        this.moveTimer = 0;
        this.divePhase = 'approach';
        this.zigzagDirection = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;

        // Set shooting
        this.canShoot = canShoot || enemyType === 3;
        this.shootTimer = Phaser.Math.Between(0, 2000);

        // Set initial velocity
        this.setVelocityY(this.speed);

        return this;
    }

    createLayers(prefix, count) {
        for (let i = 1; i <= count; i++) {
            const layer = this.scene.add.sprite(this.x, this.y, `${prefix}-${i}`);
            layer.setDepth(5);
            layer.setVisible(true);
            this.layers.push(layer);
        }
    }

    createAnimatedSprite() {
        // Create animated sprite for alien
        this.animSprite = this.scene.add.sprite(this.x, this.y, 'alien-1');
        this.animSprite.setDepth(5);

        // Create animation if it doesn't exist
        if (!this.scene.anims.exists('alien-fly')) {
            this.scene.anims.create({
                key: 'alien-fly',
                frames: [
                    { key: 'alien-1' },
                    { key: 'alien-2' },
                    { key: 'alien-3' },
                    { key: 'alien-4' },
                    { key: 'alien-5' },
                    { key: 'alien-6' },
                    { key: 'alien-7' },
                    { key: 'alien-8' }
                ],
                frameRate: 12,
                repeat: -1
            });
        }

        this.animSprite.play('alien-fly');
    }

    update(time, delta) {
        if (!this.active) return;

        // Update layer positions
        if (this.animSprite) {
            this.animSprite.setPosition(this.x, this.y);
        } else {
            this.layers.forEach(layer => {
                layer.setPosition(this.x, this.y);
            });
        }

        // Handle movement patterns
        this.moveTimer += delta;

        switch (this.movementPattern) {
            case 'zigzag':
                if (this.moveTimer > 300) {
                    this.zigzagDirection *= -1;
                    this.moveTimer = 0;
                }
                this.setVelocityX(this.zigzagDirection * 150);
                this.setVelocityY(this.speed);
                break;

            case 'sine':
                this.setVelocityX(Math.sin(this.y / 50) * 100);
                this.setVelocityY(this.speed);
                break;

            case 'swoop':
                this.handleSwoopMovement();
                break;

            case 'straight':
            default:
                this.setVelocityX(0);
                this.setVelocityY(this.speed);
                break;
        }

        // Handle shooting
        if (this.canShoot && this.y > 50 && this.y < CONFIG.HEIGHT - 100) {
            this.shootTimer += delta;
            if (this.shootTimer > this.shootCooldown) {
                this.shoot();
                this.shootTimer = 0;
            }
        }
    }

    handleSwoopMovement() {
        // Swooper dive attack pattern
        switch (this.divePhase) {
            case 'approach':
                // Move down slowly until mid-screen
                this.setVelocityX(Math.sin(this.y / 30) * 80);
                this.setVelocityY(this.speed * 0.5);

                if (this.y > CONFIG.HEIGHT / 3) {
                    this.divePhase = 'dive';
                    this.moveTimer = 0;
                }
                break;

            case 'dive':
                // Dive toward player
                if (this.scene.player) {
                    const targetX = this.scene.player.x;
                    const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, this.y + 200);

                    // Calculate velocity components manually
                    const vx = Math.cos(angle) * this.speed;
                    const vy = Math.sin(angle) * this.speed;
                    this.setVelocity(vx, vy);
                }

                if (this.moveTimer > 1000 || this.y > CONFIG.HEIGHT * 0.8) {
                    this.divePhase = 'retreat';
                }
                break;

            case 'retreat':
                // Fly off screen
                this.setVelocityX(this.zigzagDirection * 100);
                this.setVelocityY(this.speed * 0.7);
                break;
        }
    }

    shoot() {
        if (this.scene.enemyBullets) {
            const bullet = this.scene.enemyBullets.get(this.x, this.y + 20);
            if (bullet) {
                bullet.fire(0, CONFIG.PROJECTILE.ENEMY_SPEED, true);
            }
        }
    }

    hit() {
        // Take damage
        this.health--;

        // Flash effect
        if (this.animSprite) {
            this.scene.tweens.add({
                targets: this.animSprite,
                alpha: 0.5,
                duration: 100,
                yoyo: true
            });
        } else {
            this.layers.forEach(layer => {
                this.scene.tweens.add({
                    targets: layer,
                    alpha: 0.5,
                    duration: 100,
                    yoyo: true
                });
            });
        }

        // Return true if destroyed
        return this.health <= 0;
    }

    destroy() {
        this.setActive(false);
        this.setVisible(false);

        // Hide/destroy all layers
        this.layers.forEach(layer => {
            layer.setVisible(false);
            layer.setPosition(-100, -100);
        });

        if (this.animSprite) {
            this.animSprite.setVisible(false);
            this.animSprite.setPosition(-100, -100);
        }

        this.setVelocity(0, 0);
        this.setPosition(-100, -100);
    }
}
