class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'powerup-weapon');

        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.powerUpType = 'weapon'; // weapon, rapidfire, shield, gem

        // Set physics
        this.setDepth(10);
        this.body.setSize(30, 30);
        this.setScale(1.5);

        // Floating animation
        this.floatOffset = 0;
        this.floatSpeed = 2;

        // Start inactive
        this.setActive(false);
        this.setVisible(false);
    }

    spawn(x, y, type) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.powerUpType = type;

        // Set sprite and color based on type
        switch (type) {
            case 'spread':
                this.setTexture('powerup-weapon');
                this.setTint(0xff00ff); // Magenta for spread shot
                break;

            case 'rapidfire':
                this.setTexture('powerup-weapon');
                this.setTint(0xffff00); // Yellow for rapid fire
                break;

            case 'pulse':
                this.setTexture('powerup-weapon');
                this.setTint(0x00ffff); // Cyan for pulse laser
                break;

            case 'shield':
                this.setTexture('powerup-shield');
                this.setTint(0x00ff00); // Green for shield
                break;

            case 'gem':
                this.setTexture('powerup-gem');
                this.clearTint();
                break;
        }

        // Slow downward movement
        this.setVelocityY(80);
        this.floatOffset = 0;

        return this;
    }

    update(time, delta) {
        if (!this.active) return;

        // Floating effect (bob up and down)
        this.floatOffset += delta * 0.003;
        const bobAmount = Math.sin(this.floatOffset * this.floatSpeed) * 3;
        this.y += bobAmount * 0.1;

        // Rotate slowly
        this.rotation += 0.02;
    }

    collect() {
        // Particle effect on collection
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            scale: 2,
            duration: 200,
            onComplete: () => {
                this.destroy();
            }
        });
    }

    destroy() {
        this.setActive(false);
        this.setVisible(false);
        this.setPosition(-100, -100);
        this.setVelocity(0, 0);
        this.setAlpha(1);
        this.setScale(1.5);
        this.rotation = 0;
    }
}
