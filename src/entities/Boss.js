class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'boss-frame-0');

        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.layers = [];
        this.bossStage = 1; // Which stage boss (1-3)

        // Boss stats
        this.maxHealth = 50;
        this.health = 50;
        this.points = 5000;
        this.speed = 80;
        this.phase = 1; // Current attack phase
        this.maxPhases = 2;

        // Set physics properties
        this.setDepth(15);
        this.body.setSize(80, 80); // Hitbox sized for 2.5x scaled boss

        // Movement state
        this.moveTimer = 0;
        this.moveDirection = 1;
        this.targetY = 150; // Y position to stay at

        // Attack state
        this.shootTimer = 0;
        this.attackPattern = 'spread';
        this.phaseTransitioning = false;
        this.isFlashing = false;

        // Start inactive
        this.setActive(false);
        this.setVisible(false);
    }

    spawn(bossStage = 1) {
        this.setActive(true);
        this.setVisible(false);
        this.bossStage = bossStage;

        // Clean up old layers
        this.layers.forEach(layer => layer.destroy());
        this.layers = [];

        // Set boss-specific properties based on stage
        switch (bossStage) {
            case 1: // Stage 1 Boss - Spread pattern
                this.createLayers('boss', 1);
                this.maxHealth = 50;
                this.health = 50;
                this.points = 5000;
                this.speed = 60;
                this.maxPhases = 2;
                this.attackPattern = 'spread';
                this.body.setSize(100, 100);
                break;

            case 2: // Stage 2 Boss - Laser pattern
                this.createLayers('boss', 1);
                this.maxHealth = 75;
                this.health = 75;
                this.points = 7500;
                this.speed = 70;
                this.maxPhases = 3;
                this.attackPattern = 'laser';
                this.body.setSize(110, 110);
                break;

            case 3: // Stage 3 Boss - Bullet hell
                this.createLayers('boss', 1);
                this.maxHealth = 100;
                this.health = 100;
                this.points = 10000;
                this.speed = 80;
                this.maxPhases = 3;
                this.attackPattern = 'bullet_hell';
                this.body.setSize(120, 120);
                break;
        }

        // Reset state
        this.phase = 1;
        this.phaseTransitioning = false;
        this.moveTimer = 0;
        this.shootTimer = 0;
        this.moveDirection = 1;

        // Position boss at top center
        this.setPosition(CONFIG.WIDTH / 2, -100);
        this.targetY = 150;

        // Set initial appearance based on full health
        this.updateAppearance();

        // Enter animation
        this.scene.tweens.add({
            targets: this,
            y: this.targetY,
            duration: 2000,
            ease: 'Power2'
        });

        return this;
    }

    createLayers(baseTexture, count) {
        // SIMPLIFIED: Use single static sprite - texture changes based on health
        // Each boss frame is a separate image file (no spritesheet)
        this.setScale(2.5);
        this.setVisible(true);
        this.setDepth(16);

        // Start with frame 0 (full health appearance)
        this.setTexture('boss-frame-0');

        // Clear any old layers
        this.layers = [];
        this.glowRay1 = null;
        this.glowRay2 = null;
    }

    updateAppearance() {
        // Change boss texture based on health percentage
        // boss-frame-0: 100-80% health
        // boss-frame-1: 80-60% health
        // boss-frame-2: 60-40% health
        // boss-frame-3: 40-20% health
        // boss-frame-4: 20-0% health
        const healthPercent = this.health / this.maxHealth;

        let textureName;
        if (healthPercent > 0.8) {
            textureName = 'boss-frame-0';
        } else if (healthPercent > 0.6) {
            textureName = 'boss-frame-1';
        } else if (healthPercent > 0.4) {
            textureName = 'boss-frame-2';
        } else if (healthPercent > 0.2) {
            textureName = 'boss-frame-3';
        } else {
            textureName = 'boss-frame-4';
        }

        // Only change texture when crossing a threshold
        if (this.texture.key !== textureName) {
            this.setTexture(textureName);
        }
    }

    update(time, delta) {
        if (!this.active) return;

        // Boss oscillation using exact velocity from sine derivative
        // Position: x = center + A * sin(ω * t)
        // Velocity: dx/dt = A * ω * cos(ω * t) * 1000 (convert ms to sec)
        this.moveTimer += delta;
        const omega = 0.00002 * this.speed; // ~5 sec period at speed=60
        const amplitude = 200;

        const vx = amplitude * omega * Math.cos(this.moveTimer * omega) * 1000;
        this.setVelocityX(vx);

        // Keep boss at target Y using velocity
        if (Math.abs(this.y - this.targetY) > 5) {
            this.setVelocityY((this.targetY - this.y) * 5);
        } else {
            this.setVelocityY(0);
        }

        // Attack logic
        this.shootTimer += delta;
        const fireRate = this.phase >= 2 ? 800 : 1200;

        if (this.shootTimer >= fireRate && !this.phaseTransitioning) {
            this.attack();
            this.shootTimer = 0;
        }

        // Check for phase transition
        if (!this.phaseTransitioning) {
            const healthPercent = this.health / this.maxHealth;
            if (this.phase === 1 && healthPercent <= 0.5 && this.maxPhases >= 2) {
                this.transitionToPhase2();
            } else if (this.phase === 2 && healthPercent <= 0.25 && this.maxPhases >= 3) {
                this.transitionToPhase3();
            }
        }
    }

    attack() {
        // Different attack patterns based on phase and boss stage
        switch (this.attackPattern) {
            case 'spread':
                this.spreadShot();
                break;
            case 'laser':
                this.spreadShot(); // Placeholder - would implement laser
                break;
            case 'bullet_hell':
                this.circularShot();
                break;
        }
    }

    spreadShot() {
        // Fire 3-5 bullets in a spread pattern
        const bulletCount = this.phase === 2 ? 5 : 3;
        const spreadAngle = Math.PI / 3; // 60 degrees
        const startAngle = Math.PI / 2 - spreadAngle / 2; // Start from left

        for (let i = 0; i < bulletCount; i++) {
            const angle = startAngle + (spreadAngle / (bulletCount - 1)) * i;
            const bullet = this.scene.enemyBullets.get(this.x, this.y + 50);
            if (bullet) {
                const speed = 250;
                bullet.fire(Math.cos(angle) * speed, Math.sin(angle) * speed);
            }
        }
    }

    circularShot() {
        // Fire bullets in a circular pattern
        const bulletCount = 8;
        const angleStep = (Math.PI * 2) / bulletCount;

        for (let i = 0; i < bulletCount; i++) {
            const angle = angleStep * i + this.moveTimer * 0.001;
            const bullet = this.scene.enemyBullets.get(this.x, this.y);
            if (bullet) {
                const speed = 200;
                bullet.fire(Math.cos(angle) * speed, Math.sin(angle) * speed);
            }
        }
    }

    transitionToPhase2() {
        this.phaseTransitioning = true;
        this.phase = 2;

        // Flash effect on boss
        this.scene.tweens.add({
            targets: this,
            alpha: 0.3,
            duration: 150,
            yoyo: true,
            repeat: 5
        });

        // Show phase warning
        const phaseText = this.scene.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'PHASE 2!', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5).setDepth(200);

        this.scene.tweens.add({
            targets: phaseText,
            alpha: 0,
            y: CONFIG.HEIGHT / 2 - 50,
            duration: 2000,
            onComplete: () => {
                phaseText.destroy();
                this.phaseTransitioning = false;
            }
        });

        // Increase speed
        this.speed *= 1.3;
    }

    transitionToPhase3() {
        this.phaseTransitioning = true;
        this.phase = 3;

        // Flash effect on boss
        this.scene.tweens.add({
            targets: this,
            alpha: 0.3,
            duration: 150,
            yoyo: true,
            repeat: 5
        });

        // Show phase warning
        const phaseText = this.scene.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'FINAL PHASE!', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Courier New',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5).setDepth(200);

        this.scene.tweens.add({
            targets: phaseText,
            alpha: 0,
            y: CONFIG.HEIGHT / 2 - 50,
            duration: 2000,
            onComplete: () => {
                phaseText.destroy();
                this.phaseTransitioning = false;
            }
        });

        // Switch to bullet hell pattern
        this.attackPattern = 'bullet_hell';
        this.speed *= 1.5;
    }

    hit() {
        // Take damage
        this.health--;

        // Update appearance based on new health
        this.updateAppearance();

        // Flash effect - only if not already flashing
        // Multiple overlapping alpha tweens cause flickering!
        if (!this.isFlashing) {
            this.isFlashing = true;
            this.scene.tweens.add({
                targets: this,
                alpha: 0.5,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.alpha = 1;
                    this.isFlashing = false;
                }
            });
        }

        // Update boss health bar
        if (this.scene.bossHealthBar) {
            this.scene.bossHealthBar.update(this.health, this.maxHealth);
        }

        // Return true if destroyed
        return this.health <= 0;
    }

    destroy() {
        // Clean up glow effects
        if (this.glowRay1) {
            this.glowRay1.destroy();
            this.glowRay1 = null;
        }
        if (this.glowRay2) {
            this.glowRay2.destroy();
            this.glowRay2 = null;
        }

        // Clean up all layers
        this.layers.forEach(layer => {
            if (layer) layer.destroy();
        });
        this.layers = [];

        // Reset base sprite
        this.setActive(false);
        this.setVisible(false);
        this.setPosition(-200, -200);
        this.setVelocity(0, 0);
        this.setAlpha(1); // Reset alpha
    }
}
