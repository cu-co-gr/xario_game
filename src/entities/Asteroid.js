class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'asteroid-large');

        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.asteroidSize = 'large'; // small, medium, large

        // Asteroid stats (will be set in spawn)
        this.health = 3;
        this.maxHealth = 3;
        this.points = 50;
        this.speed = 80;

        // Set physics properties
        this.setDepth(5);
        this.body.setSize(40, 40);

        // Rotation speed (random)
        this.rotationSpeed = Phaser.Math.FloatBetween(-0.02, 0.02);

        // Start inactive
        this.setActive(false);
        this.setVisible(false);
    }

    spawn(x, y, size = 'large') {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.asteroidSize = size;

        // Set properties based on size
        switch (size) {
            case 'small':
                this.health = 1;
                this.maxHealth = 1;
                this.points = 50;
                this.speed = Phaser.Math.Between(100, 150);
                this.setScale(0.5);
                this.body.setSize(20, 20);
                break;

            case 'medium':
                this.health = 2;
                this.maxHealth = 2;
                this.points = 100;
                this.speed = Phaser.Math.Between(80, 120);
                this.setScale(1);
                this.body.setSize(30, 30);
                break;

            case 'large':
                this.health = 3;
                this.maxHealth = 3;
                this.points = 150;
                this.speed = Phaser.Math.Between(60, 100);
                this.setScale(1.5);
                this.body.setSize(40, 40);
                break;
        }

        // Random tint for variety (gray/brown tones)
        const tints = [0xaaaaaa, 0x888888, 0x999999, 0x996633, 0x885533];
        this.setTint(tints[Phaser.Math.Between(0, tints.length - 1)]);

        // Set random rotation speed
        this.rotationSpeed = Phaser.Math.FloatBetween(-0.03, 0.03);
        this.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);

        // Set downward velocity with slight horizontal drift
        this.setVelocityY(this.speed);
        this.setVelocityX(Phaser.Math.Between(-30, 30));

        return this;
    }

    update(time, delta) {
        if (!this.active) return;

        // Rotate asteroid
        this.rotation += this.rotationSpeed;
    }

    hit() {
        // Take damage
        this.health--;

        // Flash effect
        this.scene.tweens.add({
            targets: this,
            alpha: 0.5,
            duration: 100,
            yoyo: true
        });

        // Return true if destroyed
        return this.health <= 0;
    }

    split() {
        // Only large and medium asteroids can split
        if (this.asteroidSize === 'large') {
            return { count: 2, size: 'medium' };
        } else if (this.asteroidSize === 'medium') {
            return { count: 2, size: 'small' };
        }
        return null;
    }

    destroy() {
        this.setActive(false);
        this.setVisible(false);
        this.setPosition(-100, -100);
        this.setVelocity(0, 0);
        this.setAlpha(1);
        this.setScale(1);
        this.rotation = 0;
    }
}
