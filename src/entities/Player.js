class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player-1');

        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Add all ship layers directly (no container)
        this.layers = [];
        for (let i = 1; i <= 5; i++) {
            const layer = scene.add.sprite(x, y, `player-${i}`);
            layer.setDepth(10);
            this.layers.push(layer);
        }

        // Add thrust sprites (behind the ship)
        this.thrust1 = scene.add.sprite(x, y + 20, 'thrust-1');
        this.thrust2 = scene.add.sprite(x, y + 20, 'thrust-2');
        this.thrust1.setVisible(false);
        this.thrust2.setVisible(false);
        this.thrust1.setDepth(9);
        this.thrust2.setDepth(9);

        // Set physics body
        this.setCollideWorldBounds(true);
        this.setDepth(10);
        this.setVisible(false); // Use layers instead

        // Physics settings
        this.body.setSize(40, 40);
        this.setDrag(200, 200);

        // Thrust animation
        this.thrustFrame = 0;
        this.thrustTimer = 0;

        // Flash effect for damage
        this.isFlashing = false;

        // Weapon system
        this.currentWeapon = 'normal'; // normal, spread, rapidfire, pulse
        this.weaponTimer = 0;
        this.weaponDuration = 0;

        // Shield system
        this.hasShield = false;
        this.shieldSprite = null;

        this.scene = scene;
    }

    update(time, delta, cursors, wasd) {
        // Handle movement
        const velocity = new Phaser.Math.Vector2(0, 0);

        if (cursors.left.isDown || wasd.left.isDown) {
            velocity.x = -1;
        } else if (cursors.right.isDown || wasd.right.isDown) {
            velocity.x = 1;
        }

        if (cursors.up.isDown || wasd.up.isDown) {
            velocity.y = -1;
        } else if (cursors.down.isDown || wasd.down.isDown) {
            velocity.y = 1;
        }

        // Normalize diagonal movement
        velocity.normalize();
        velocity.scale(CONFIG.PLAYER.SPEED);

        this.setVelocity(velocity.x, velocity.y);

        // Keep player on screen
        this.x = Phaser.Math.Clamp(this.x, 20, CONFIG.WIDTH - 20);
        this.y = Phaser.Math.Clamp(this.y, 20, CONFIG.HEIGHT - 20);

        // Update all layer positions to match physics body
        this.layers.forEach(layer => {
            layer.setPosition(this.x, this.y);
        });

        // Update thrust positions
        this.thrust1.setPosition(this.x, this.y + 20);
        this.thrust2.setPosition(this.x, this.y + 20);

        // Show thrust when moving
        const isMoving = velocity.x !== 0 || velocity.y !== 0;
        if (isMoving) {
            this.thrustTimer += delta;
            if (this.thrustTimer > 100) {
                this.thrustFrame = 1 - this.thrustFrame;
                this.thrustTimer = 0;
            }
            this.thrust1.setVisible(this.thrustFrame === 0);
            this.thrust2.setVisible(this.thrustFrame === 1);
        } else {
            this.thrust1.setVisible(false);
            this.thrust2.setVisible(false);
        }

        // Update weapon timer
        if (this.currentWeapon !== 'normal') {
            this.weaponTimer += delta;
            if (this.weaponTimer >= this.weaponDuration) {
                this.currentWeapon = 'normal';
                this.weaponTimer = 0;
            }
        }

        // Update shield position
        if (this.hasShield && this.shieldSprite) {
            this.shieldSprite.setPosition(this.x, this.y);
        }
    }

    flash() {
        if (this.isFlashing) return;

        this.isFlashing = true;

        // Flash all layers
        const targets = [...this.layers, this.thrust1, this.thrust2];

        this.scene.tweens.add({
            targets: targets,
            alpha: 0.3,
            duration: 100,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                targets.forEach(sprite => sprite.alpha = 1);
                this.isFlashing = false;
            }
        });
    }

    setWeapon(weaponType, duration) {
        this.currentWeapon = weaponType;
        this.weaponDuration = duration;
        this.weaponTimer = 0;
    }

    addShield() {
        if (this.hasShield) return;

        this.hasShield = true;

        // Create shield visual
        this.shieldSprite = this.scene.add.circle(this.x, this.y, 35, 0x00ffff, 0.3);
        this.shieldSprite.setDepth(9);
        this.shieldSprite.setStrokeStyle(2, 0x00ffff);

        // Pulse animation
        this.scene.tweens.add({
            targets: this.shieldSprite,
            alpha: 0.1,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }

    removeShield() {
        this.hasShield = false;
        if (this.shieldSprite) {
            this.shieldSprite.destroy();
            this.shieldSprite = null;
        }
    }

    takeDamage() {
        // If has shield, remove shield instead of taking damage
        if (this.hasShield) {
            this.removeShield();
            this.flash();
            return false; // No damage taken
        }
        return true; // Damage taken
    }

    destroy() {
        // Destroy all layers
        this.layers.forEach(layer => layer.destroy());
        this.thrust1.destroy();
        this.thrust2.destroy();
        if (this.shieldSprite) this.shieldSprite.destroy();
        super.destroy();
    }
}
