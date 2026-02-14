// Entity classes are loaded via setup.js

describe('PowerUp', () => {
  let scene;
  let powerup;

  beforeEach(() => {
    scene = createMockScene();
    powerup = new PowerUp(scene, 0, 0);
  });

  test('constructor initializes inactive', () => {
    expect(powerup.setActive).toHaveBeenCalledWith(false);
    expect(powerup.setVisible).toHaveBeenCalledWith(false);
  });

  test('constructor sets default type', () => {
    expect(powerup.powerUpType).toBe('weapon');
  });

  describe('spawn()', () => {
    test('sets position and activates', () => {
      powerup.spawn(200, 300, 'spread');

      expect(powerup.x).toBe(200);
      expect(powerup.y).toBe(300);
      expect(powerup.active).toBe(true);
      expect(powerup.visible).toBe(true);
    });

    test('spread type sets magenta tint', () => {
      powerup.spawn(100, 100, 'spread');

      expect(powerup.powerUpType).toBe('spread');
      expect(powerup.setTexture).toHaveBeenCalledWith('powerup-weapon');
      expect(powerup.setTint).toHaveBeenCalledWith(0xff00ff);
    });

    test('rapidfire type sets yellow tint', () => {
      powerup.spawn(100, 100, 'rapidfire');

      expect(powerup.powerUpType).toBe('rapidfire');
      expect(powerup.setTint).toHaveBeenCalledWith(0xffff00);
    });

    test('pulse type sets cyan tint', () => {
      powerup.spawn(100, 100, 'pulse');

      expect(powerup.powerUpType).toBe('pulse');
      expect(powerup.setTint).toHaveBeenCalledWith(0x00ffff);
    });

    test('shield type uses shield texture', () => {
      powerup.spawn(100, 100, 'shield');

      expect(powerup.powerUpType).toBe('shield');
      expect(powerup.setTexture).toHaveBeenCalledWith('powerup-shield');
      expect(powerup.setTint).toHaveBeenCalledWith(0x00ff00);
    });

    test('gem type uses gem texture and no tint', () => {
      powerup.spawn(100, 100, 'gem');

      expect(powerup.powerUpType).toBe('gem');
      expect(powerup.setTexture).toHaveBeenCalledWith('powerup-gem');
      expect(powerup.clearTint).toHaveBeenCalled();
    });

    test('sets downward velocity', () => {
      powerup.spawn(100, 100, 'spread');
      expect(powerup.setVelocityY).toHaveBeenCalledWith(80);
    });

    test('returns self for chaining', () => {
      const result = powerup.spawn(100, 100, 'gem');
      expect(result).toBe(powerup);
    });
  });

  describe('update()', () => {
    test('does nothing when inactive', () => {
      powerup.active = false;
      const initialRotation = powerup.rotation;
      powerup.update(1000, 16);

      expect(powerup.rotation).toBe(initialRotation);
    });

    test('rotates when active', () => {
      powerup.active = true;
      powerup.update(1000, 16);

      expect(powerup.rotation).toBeCloseTo(0.02, 5);
    });
  });

  describe('collect()', () => {
    test('creates collection tween', () => {
      powerup.collect();

      expect(scene.tweens.add).toHaveBeenCalledWith(
        expect.objectContaining({
          targets: powerup,
          alpha: 0,
          scale: 2,
          duration: 200,
        })
      );
    });
  });

  describe('destroy()', () => {
    test('deactivates and resets state', () => {
      powerup.spawn(200, 300, 'spread');
      powerup.destroy();

      expect(powerup.active).toBe(false);
      expect(powerup.visible).toBe(false);
      expect(powerup.x).toBe(-100);
      expect(powerup.y).toBe(-100);
    });
  });
});
