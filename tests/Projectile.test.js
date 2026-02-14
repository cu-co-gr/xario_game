// Entity classes are loaded via setup.js

describe('Projectile', () => {
  let scene;
  let projectile;

  beforeEach(() => {
    scene = createMockScene();
    projectile = new Projectile(scene, 100, 200);
  });

  test('constructor initializes inactive and invisible', () => {
    expect(projectile.setActive).toHaveBeenCalledWith(false);
    expect(projectile.setVisible).toHaveBeenCalledWith(false);
  });

  test('constructor sets default properties', () => {
    expect(projectile.isEnemyBullet).toBe(false);
    expect(projectile.body.setSize).toHaveBeenCalledWith(8, 20);
    expect(projectile.setScale).toHaveBeenCalledWith(1.5);
  });

  test('fire() activates and sets velocity for player bullet', () => {
    projectile.fire(0, -500, false);

    expect(projectile.setActive).toHaveBeenCalledWith(true);
    expect(projectile.setVisible).toHaveBeenCalledWith(true);
    expect(projectile.setVelocity).toHaveBeenCalledWith(0, -500);
    expect(projectile.isEnemyBullet).toBe(false);
    expect(projectile.setTexture).toHaveBeenCalledWith('bullet');
    expect(projectile.clearTint).toHaveBeenCalled();
  });

  test('fire() sets enemy bullet properties', () => {
    projectile.fire(0, 200, true);

    expect(projectile.isEnemyBullet).toBe(true);
    expect(projectile.setTexture).toHaveBeenCalledWith('enemy-bullet');
    expect(projectile.setScale).toHaveBeenCalledWith(2);
    expect(projectile.setTint).toHaveBeenCalledWith(0xff4444);
  });

  test('update() deactivates bullet when off-screen (top)', () => {
    projectile.y = -51;
    projectile.update();

    expect(projectile.setActive).toHaveBeenCalledWith(false);
    expect(projectile.setVisible).toHaveBeenCalledWith(false);
  });

  test('update() deactivates bullet when off-screen (bottom)', () => {
    projectile.y = CONFIG.HEIGHT + 51;
    projectile.update();

    expect(projectile.setActive).toHaveBeenCalledWith(false);
    expect(projectile.setVisible).toHaveBeenCalledWith(false);
  });

  test('update() keeps bullet active when on-screen', () => {
    projectile.y = 400;
    projectile.setActive.mockClear();
    projectile.setVisible.mockClear();

    projectile.update();

    expect(projectile.setActive).not.toHaveBeenCalled();
    expect(projectile.setVisible).not.toHaveBeenCalled();
  });

  test('destroy() resets bullet state', () => {
    projectile.destroy();

    expect(projectile.setActive).toHaveBeenCalledWith(false);
    expect(projectile.setVisible).toHaveBeenCalledWith(false);
    expect(projectile.setVelocity).toHaveBeenCalledWith(0, 0);
  });
});
