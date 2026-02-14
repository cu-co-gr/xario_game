// Entity classes are loaded via setup.js

describe('Boss', () => {
  let scene;
  let boss;

  beforeEach(() => {
    scene = createMockScene();
    boss = new Boss(scene, 0, 0);
  });

  test('constructor initializes inactive', () => {
    expect(boss.active).toBe(false);
    expect(boss.visible).toBe(false);
  });

  test('constructor sets default stats', () => {
    expect(boss.maxHealth).toBe(50);
    expect(boss.health).toBe(50);
    expect(boss.points).toBe(5000);
    expect(boss.phase).toBe(1);
    expect(boss.bossStage).toBe(1);
  });

  describe('spawn()', () => {
    test('stage 1 boss has correct stats', () => {
      boss.spawn(1);

      expect(boss.bossStage).toBe(1);
      expect(boss.maxHealth).toBe(50);
      expect(boss.health).toBe(50);
      expect(boss.points).toBe(5000);
      expect(boss.speed).toBe(60);
      expect(boss.maxPhases).toBe(2);
      expect(boss.attackPattern).toBe('spread');
    });

    test('stage 2 boss has correct stats', () => {
      boss.spawn(2);

      expect(boss.bossStage).toBe(2);
      expect(boss.maxHealth).toBe(75);
      expect(boss.health).toBe(75);
      expect(boss.points).toBe(7500);
      expect(boss.speed).toBe(70);
      expect(boss.maxPhases).toBe(3);
      expect(boss.attackPattern).toBe('laser');
    });

    test('stage 3 boss has correct stats', () => {
      boss.spawn(3);

      expect(boss.bossStage).toBe(3);
      expect(boss.maxHealth).toBe(100);
      expect(boss.health).toBe(100);
      expect(boss.points).toBe(10000);
      expect(boss.speed).toBe(80);
      expect(boss.attackPattern).toBe('bullet_hell');
    });

    test('resets phase and state on spawn', () => {
      boss.spawn(1);

      expect(boss.phase).toBe(1);
      expect(boss.phaseTransitioning).toBe(false);
      expect(boss.moveTimer).toBe(0);
      expect(boss.shootTimer).toBe(0);
    });

    test('positions boss at top center', () => {
      boss.spawn(1);

      expect(boss.x).toBe(CONFIG.WIDTH / 2);
      expect(boss.y).toBe(-100);
    });

    test('creates entry tween animation', () => {
      boss.spawn(1);

      expect(scene.tweens.add).toHaveBeenCalledWith(
        expect.objectContaining({
          targets: boss,
          y: 150,
          duration: 2000,
        })
      );
    });

    test('returns self for chaining', () => {
      const result = boss.spawn(1);
      expect(result).toBe(boss);
    });
  });

  describe('createLayers()', () => {
    test('sets scale to 2.5', () => {
      boss.createLayers('boss', 1);
      expect(boss.setScale).toHaveBeenCalledWith(2.5);
    });

    test('sets texture to boss-frame-0', () => {
      boss.createLayers('boss', 1);
      expect(boss.setTexture).toHaveBeenCalledWith('boss-frame-0');
    });

    test('clears old layers', () => {
      boss.createLayers('boss', 1);
      expect(boss.layers).toEqual([]);
      expect(boss.glowRay1).toBeNull();
      expect(boss.glowRay2).toBeNull();
    });
  });

  describe('updateAppearance()', () => {
    beforeEach(() => {
      boss.spawn(1); // maxHealth = 50
      boss.setTexture.mockClear();
    });

    test('frame 0 at full health - no redundant setTexture', () => {
      // Boss already has boss-frame-0 from spawn, so updateAppearance skips setTexture
      boss.setTexture.mockClear();
      boss.health = 45; // 90% - still frame 0
      boss.updateAppearance();
      expect(boss.setTexture).not.toHaveBeenCalled();
    });

    test('frame 1 at 80-60% health', () => {
      boss.health = 35; // 70%
      boss.updateAppearance();
      expect(boss.setTexture).toHaveBeenCalledWith('boss-frame-1');
    });

    test('frame 2 at 60-40% health', () => {
      boss.health = 25; // 50%
      boss.updateAppearance();
      expect(boss.setTexture).toHaveBeenCalledWith('boss-frame-2');
    });

    test('frame 3 at 40-20% health', () => {
      boss.health = 15; // 30%
      boss.updateAppearance();
      expect(boss.setTexture).toHaveBeenCalledWith('boss-frame-3');
    });

    test('frame 4 at below 20% health', () => {
      boss.health = 5; // 10%
      boss.updateAppearance();
      expect(boss.setTexture).toHaveBeenCalledWith('boss-frame-4');
    });

    test('frame changes at exact boundaries', () => {
      boss.health = 40; // exactly 80%
      boss.updateAppearance();
      expect(boss.setTexture).toHaveBeenCalledWith('boss-frame-1');

      boss.setTexture.mockClear();
      boss.health = 41; // just above 80%
      boss.updateAppearance();
      expect(boss.setTexture).toHaveBeenCalledWith('boss-frame-0');
    });
  });

  describe('hit()', () => {
    beforeEach(() => {
      boss.spawn(1);
    });

    test('decreases health by 1', () => {
      const initial = boss.health;
      boss.hit();
      expect(boss.health).toBe(initial - 1);
    });

    test('calls updateAppearance (texture changes at threshold)', () => {
      boss.health = 41; // Just above 80% threshold
      boss.updateAppearance(); // Set to boss-frame-0
      boss.setTexture.mockClear();
      boss.health = 41; // Will become 40 after hit(), crossing 80% threshold
      boss.hit(); // Should trigger texture change to boss-frame-1
      expect(boss.setTexture).toHaveBeenCalledWith('boss-frame-1');
    });

    test('creates flash tween on first hit', () => {
      scene.tweens.add.mockClear();
      boss.hit();
      expect(scene.tweens.add).toHaveBeenCalledWith(
        expect.objectContaining({
          targets: boss,
          alpha: 0.5,
          yoyo: true,
        })
      );
    });

    test('does not create overlapping flash tweens', () => {
      boss.hit(); // First hit - creates tween, sets isFlashing = true
      scene.tweens.add.mockClear();
      boss.hit(); // Second hit - should NOT create another tween
      expect(scene.tweens.add).not.toHaveBeenCalled();
    });

    test('updates health bar', () => {
      boss.hit();
      expect(scene.bossHealthBar.update).toHaveBeenCalled();
    });

    test('returns false when not destroyed', () => {
      expect(boss.hit()).toBe(false);
    });

    test('returns true when health reaches 0', () => {
      boss.health = 1;
      expect(boss.hit()).toBe(true);
    });
  });

  describe('update()', () => {
    beforeEach(() => {
      boss.spawn(1);
      boss.active = true;
    });

    test('does nothing when inactive', () => {
      boss.active = false;
      const initialX = boss.x;
      boss.update(1000, 16);
      expect(boss.x).toBe(initialX);
    });

    test('updates horizontal position with oscillation', () => {
      boss.y = boss.targetY; // Skip Y interpolation
      boss.update(1000, 100);
      // Boss should have moved from center
      expect(boss.moveTimer).toBe(100);
    });

    test('increments shoot timer', () => {
      boss.update(1000, 500);
      expect(boss.shootTimer).toBe(500);
    });
  });

  describe('phase transitions', () => {
    beforeEach(() => {
      boss.spawn(1);
      boss.active = true;
    });

    test('transitions to phase 2 at 50% health', () => {
      boss.health = boss.maxHealth * 0.5;
      boss.update(1000, 16);

      expect(boss.phase).toBe(2);
      expect(boss.phaseTransitioning).toBe(true);
    });

    test('phase 2 increases speed by 30%', () => {
      const initialSpeed = boss.speed;
      boss.transitionToPhase2();
      expect(boss.speed).toBeCloseTo(initialSpeed * 1.3);
    });
  });

  describe('attack()', () => {
    beforeEach(() => {
      boss.spawn(1);
    });

    test('spread pattern calls spreadShot', () => {
      boss.attackPattern = 'spread';
      boss.attack();
      // spreadShot tries to get bullets from scene
      expect(scene.enemyBullets.get).toHaveBeenCalled();
    });

    test('bullet_hell pattern calls circularShot', () => {
      boss.attackPattern = 'bullet_hell';
      boss.attack();
      expect(scene.enemyBullets.get).toHaveBeenCalled();
    });
  });

  describe('spreadShot()', () => {
    beforeEach(() => {
      boss.spawn(1);
    });

    test('fires 3 bullets in phase 1', () => {
      boss.phase = 1;
      scene.enemyBullets.get.mockClear();
      boss.spreadShot();
      expect(scene.enemyBullets.get).toHaveBeenCalledTimes(3);
    });

    test('fires 5 bullets in phase 2', () => {
      boss.phase = 2;
      scene.enemyBullets.get.mockClear();
      boss.spreadShot();
      expect(scene.enemyBullets.get).toHaveBeenCalledTimes(5);
    });
  });

  describe('circularShot()', () => {
    test('fires 8 bullets in circle', () => {
      boss.spawn(1);
      scene.enemyBullets.get.mockClear();
      boss.circularShot();
      expect(scene.enemyBullets.get).toHaveBeenCalledTimes(8);
    });
  });

  describe('destroy()', () => {
    test('deactivates and hides boss', () => {
      boss.spawn(1);
      boss.destroy();

      expect(boss.active).toBe(false);
      expect(boss.visible).toBe(false);
    });
  });
});
