describe('CONFIG', () => {
  test('has version and build info', () => {
    expect(CONFIG.VERSION).toBeDefined();
    expect(CONFIG.BUILD_TIME).toBeDefined();
    expect(new Date(CONFIG.BUILD_TIME).getTime()).not.toBeNaN();
  });

  test('has correct game dimensions', () => {
    expect(CONFIG.WIDTH).toBe(800);
    expect(CONFIG.HEIGHT).toBe(900);
  });

  test('has player settings', () => {
    expect(CONFIG.PLAYER).toBeDefined();
    expect(CONFIG.PLAYER.SPEED).toBeGreaterThan(0);
    expect(CONFIG.PLAYER.FIRE_RATE).toBeGreaterThan(0);
    expect(CONFIG.PLAYER.MAX_LIVES).toBeGreaterThanOrEqual(1);
    expect(CONFIG.PLAYER.START_X).toBeLessThanOrEqual(CONFIG.WIDTH);
    expect(CONFIG.PLAYER.START_Y).toBeLessThanOrEqual(CONFIG.HEIGHT);
  });

  test('has enemy settings', () => {
    expect(CONFIG.ENEMY).toBeDefined();
    expect(CONFIG.ENEMY.SPEED).toBeGreaterThan(0);
    expect(CONFIG.ENEMY.SPAWN_RATE).toBeGreaterThan(0);
    expect(CONFIG.ENEMY.MAX_ENEMIES).toBeGreaterThanOrEqual(1);
    expect(CONFIG.ENEMY.POINTS).toBeGreaterThan(0);
  });

  test('has projectile settings', () => {
    expect(CONFIG.PROJECTILE).toBeDefined();
    expect(CONFIG.PROJECTILE.PLAYER_SPEED).toBeGreaterThan(0);
    expect(CONFIG.PROJECTILE.ENEMY_SPEED).toBeGreaterThan(0);
    expect(CONFIG.PROJECTILE.PLAYER_SPEED).toBeGreaterThan(CONFIG.PROJECTILE.ENEMY_SPEED);
  });

  test('has background settings', () => {
    expect(CONFIG.BACKGROUND).toBeDefined();
    expect(CONFIG.BACKGROUND.SCROLL_SPEED).toBeGreaterThan(0);
  });

  test('has asset paths', () => {
    expect(CONFIG.ASSETS).toBeDefined();
    expect(CONFIG.ASSETS.PLAYER_SHIP).toBeTruthy();
    expect(CONFIG.ASSETS.PLAYER_BULLET).toBeTruthy();
    expect(CONFIG.ASSETS.EXPLOSION).toBeTruthy();
    expect(CONFIG.ASSETS.BACKGROUND).toBeTruthy();
  });
});
