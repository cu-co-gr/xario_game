// Entity classes are loaded via setup.js

describe('Asteroid', () => {
  let scene;
  let asteroid;

  beforeEach(() => {
    scene = createMockScene();
    asteroid = new Asteroid(scene, 0, 0);
  });

  test('constructor initializes inactive', () => {
    expect(asteroid.setActive).toHaveBeenCalledWith(false);
    expect(asteroid.setVisible).toHaveBeenCalledWith(false);
  });

  test('constructor sets default stats', () => {
    expect(asteroid.health).toBe(3);
    expect(asteroid.maxHealth).toBe(3);
    expect(asteroid.points).toBe(50);
    expect(asteroid.asteroidSize).toBe('large');
  });

  describe('spawn()', () => {
    test('small asteroid has correct properties', () => {
      asteroid.spawn(100, 50, 'small');

      expect(asteroid.health).toBe(1);
      expect(asteroid.maxHealth).toBe(1);
      expect(asteroid.points).toBe(50);
      expect(asteroid.asteroidSize).toBe('small');
      expect(asteroid.setScale).toHaveBeenCalledWith(0.5);
      expect(asteroid.active).toBe(true);
    });

    test('medium asteroid has correct properties', () => {
      asteroid.spawn(100, 50, 'medium');

      expect(asteroid.health).toBe(2);
      expect(asteroid.maxHealth).toBe(2);
      expect(asteroid.points).toBe(100);
      expect(asteroid.asteroidSize).toBe('medium');
      expect(asteroid.setScale).toHaveBeenCalledWith(1);
    });

    test('large asteroid has correct properties', () => {
      asteroid.spawn(100, 50, 'large');

      expect(asteroid.health).toBe(3);
      expect(asteroid.maxHealth).toBe(3);
      expect(asteroid.points).toBe(150);
      expect(asteroid.asteroidSize).toBe('large');
      expect(asteroid.setScale).toHaveBeenCalledWith(1.5);
    });

    test('sets position correctly', () => {
      asteroid.spawn(200, 300, 'medium');

      expect(asteroid.x).toBe(200);
      expect(asteroid.y).toBe(300);
    });

    test('sets downward velocity', () => {
      asteroid.spawn(100, 50, 'large');

      expect(asteroid.setVelocityY).toHaveBeenCalled();
      expect(asteroid.setVelocityX).toHaveBeenCalled();
    });

    test('returns self for chaining', () => {
      const result = asteroid.spawn(100, 50, 'large');
      expect(result).toBe(asteroid);
    });
  });

  describe('hit()', () => {
    test('decreases health by 1', () => {
      asteroid.spawn(100, 50, 'large');
      const initialHealth = asteroid.health;
      asteroid.hit();

      expect(asteroid.health).toBe(initialHealth - 1);
    });

    test('returns false when not destroyed', () => {
      asteroid.spawn(100, 50, 'large'); // health = 3
      expect(asteroid.hit()).toBe(false);
      expect(asteroid.hit()).toBe(false);
    });

    test('returns true when destroyed', () => {
      asteroid.spawn(100, 50, 'small'); // health = 1
      expect(asteroid.hit()).toBe(true);
    });

    test('creates flash tween effect', () => {
      asteroid.spawn(100, 50, 'medium');
      asteroid.hit();

      expect(scene.tweens.add).toHaveBeenCalledWith(
        expect.objectContaining({
          targets: asteroid,
          alpha: 0.5,
          yoyo: true,
        })
      );
    });
  });

  describe('split()', () => {
    test('large asteroid splits into 2 medium', () => {
      asteroid.spawn(100, 50, 'large');
      const result = asteroid.split();

      expect(result).toEqual({ count: 2, size: 'medium' });
    });

    test('medium asteroid splits into 2 small', () => {
      asteroid.spawn(100, 50, 'medium');
      const result = asteroid.split();

      expect(result).toEqual({ count: 2, size: 'small' });
    });

    test('small asteroid does not split', () => {
      asteroid.spawn(100, 50, 'small');
      const result = asteroid.split();

      expect(result).toBeNull();
    });
  });

  describe('destroy()', () => {
    test('deactivates and hides asteroid', () => {
      asteroid.spawn(100, 50, 'medium');
      asteroid.destroy();

      expect(asteroid.active).toBe(false);
      expect(asteroid.visible).toBe(false);
    });

    test('resets position off-screen', () => {
      asteroid.spawn(200, 300, 'medium');
      asteroid.destroy();

      expect(asteroid.x).toBe(-100);
      expect(asteroid.y).toBe(-100);
    });
  });
});
