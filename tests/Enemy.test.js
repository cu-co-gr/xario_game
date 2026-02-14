// Entity classes are loaded via setup.js

describe('Enemy', () => {
  let scene;
  let enemy;

  beforeEach(() => {
    scene = createMockScene();
    enemy = new Enemy(scene, 100, 0);
  });

  test('constructor initializes inactive', () => {
    expect(enemy.active).toBe(false);
  });

  test('constructor sets default stats', () => {
    expect(enemy.health).toBe(1);
    expect(enemy.points).toBe(100);
    expect(enemy.speed).toBe(150);
    expect(enemy.enemyType).toBe(1);
    expect(enemy.movementPattern).toBe('straight');
    expect(enemy.canShoot).toBe(false);
  });

  describe('spawn()', () => {
    test('type 1 (Scout) has correct stats', () => {
      enemy.spawn(1, 'straight', false, 1);

      expect(enemy.enemyType).toBe(1);
      expect(enemy.health).toBe(1);
      expect(enemy.points).toBe(100);
      expect(enemy.speed).toBe(230);
      expect(enemy.active).toBe(true);
    });

    test('type 2 (Fighter) has correct stats', () => {
      enemy.spawn(2, 'zigzag', false, 1);

      expect(enemy.enemyType).toBe(2);
      expect(enemy.health).toBe(2);
      expect(enemy.points).toBe(200);
      expect(enemy.speed).toBe(195);
    });

    test('type 3 (Heavy) has correct stats and can shoot', () => {
      enemy.spawn(3, 'straight', false, 1);

      expect(enemy.enemyType).toBe(3);
      expect(enemy.health).toBe(3);
      expect(enemy.points).toBe(300);
      expect(enemy.speed).toBe(138);
      expect(enemy.canShoot).toBe(true);
      expect(enemy.shootCooldown).toBe(1700);
    });

    test('type 4 (Swooper) forces swoop pattern', () => {
      enemy.spawn(4, 'straight', false, 1);

      expect(enemy.enemyType).toBe(4);
      expect(enemy.health).toBe(2);
      expect(enemy.points).toBe(250);
      expect(enemy.speed).toBe(253);
      expect(enemy.movementPattern).toBe('swoop');
    });

    test('wave number increases speed by 8% per wave', () => {
      enemy.spawn(1, 'straight', false, 1);
      const wave1Speed = enemy.speed;

      enemy.spawn(1, 'straight', false, 2);
      const wave2Speed = enemy.speed;

      expect(wave2Speed).toBeCloseTo(wave1Speed * 1.08, 0);
    });

    test('wave 5 speed is 32% faster than wave 1', () => {
      enemy.spawn(1, 'straight', false, 1);
      const wave1Speed = enemy.speed;

      enemy.spawn(1, 'straight', false, 5);
      const wave5Speed = enemy.speed;

      expect(wave5Speed).toBeCloseTo(wave1Speed * 1.32, 0);
    });

    test('sets initial downward velocity', () => {
      enemy.spawn(1, 'straight', false, 1);
      expect(enemy.setVelocityY).toHaveBeenCalledWith(enemy.speed);
    });

    test('returns self for chaining', () => {
      const result = enemy.spawn(1, 'straight', false, 1);
      expect(result).toBe(enemy);
    });

    test('creates layers for non-alien types', () => {
      enemy.spawn(1, 'straight', false, 1);
      expect(scene.add.sprite).toHaveBeenCalled();
    });

    test('creates animated sprite for type 4', () => {
      enemy.spawn(4, 'straight', false, 1);
      expect(scene.anims.create).toHaveBeenCalled();
    });
  });

  describe('hit()', () => {
    test('decreases health by 1', () => {
      enemy.spawn(2, 'straight', false, 1); // health = 2
      enemy.hit();
      expect(enemy.health).toBe(1);
    });

    test('returns false when not destroyed', () => {
      enemy.spawn(3, 'straight', false, 1); // health = 3
      expect(enemy.hit()).toBe(false);
    });

    test('returns true when destroyed', () => {
      enemy.spawn(1, 'straight', false, 1); // health = 1
      expect(enemy.hit()).toBe(true);
    });

    test('creates flash tween for layered enemy', () => {
      enemy.spawn(1, 'straight', false, 1);
      scene.tweens.add.mockClear();
      enemy.hit();
      expect(scene.tweens.add).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    test('does nothing when inactive', () => {
      enemy.active = false;
      enemy.moveTimer = 0;
      enemy.update(1000, 16);
      expect(enemy.moveTimer).toBe(0);
    });

    test('increments moveTimer', () => {
      enemy.spawn(1, 'straight', false, 1);
      enemy.active = true;
      enemy.update(1000, 100);
      expect(enemy.moveTimer).toBe(100);
    });

    test('straight pattern sets no horizontal velocity', () => {
      enemy.spawn(1, 'straight', false, 1);
      enemy.active = true;
      enemy.setVelocityX.mockClear();
      enemy.update(1000, 16);
      expect(enemy.setVelocityX).toHaveBeenCalledWith(0);
    });

    test('zigzag pattern toggles direction', () => {
      enemy.spawn(2, 'zigzag', false, 1);
      enemy.active = true;
      const initialDir = enemy.zigzagDirection;

      // Advance past toggle threshold (300ms)
      enemy.update(1000, 350);
      expect(enemy.zigzagDirection).toBe(-initialDir);
    });

    test('heavy enemy shoots when in range', () => {
      enemy.spawn(3, 'straight', true, 1);
      enemy.active = true;
      enemy.y = 100; // Within shooting range
      enemy.shootTimer = 2000; // Past cooldown

      scene.enemyBullets.get.mockClear();
      enemy.update(1000, 16);

      expect(scene.enemyBullets.get).toHaveBeenCalled();
    });
  });

  describe('destroy()', () => {
    test('deactivates enemy', () => {
      enemy.spawn(1, 'straight', false, 1);
      enemy.destroy();

      expect(enemy.active).toBe(false);
      expect(enemy.visible).toBe(false);
    });
  });
});
