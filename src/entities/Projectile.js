class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setActive(false);
        this.setVisible(false);

        this.body.setSize(8, 20);
        this.setScale(1.5);

        this.isEnemyBullet = false;
    }

    fire(velocityX, velocityY, isEnemy = false) {
        this.setActive(true);
        this.setVisible(true);
        this.setVelocity(velocityX, velocityY);

        // Change sprite for enemy bullets
        if (isEnemy) {
            this.setTexture('enemy-bullet');
            this.setScale(2);
            this.body.setSize(8, 12);
            this.setTint(0xff4444); // Red tint for enemy bullets
            this.isEnemyBullet = true;
        } else {
            this.setTexture('bullet');
            this.setScale(1.5);
            this.body.setSize(8, 20);
            this.clearTint();
            this.isEnemyBullet = false;
        }
    }

    update() {
        // Deactivate if off-screen
        if (this.y < -50 || this.y > CONFIG.HEIGHT + 50) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    destroy() {
        this.setActive(false);
        this.setVisible(false);
        this.setVelocity(0, 0);
    }
}
