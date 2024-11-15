class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusbar = new StatusBar(20, 70, "health", 100);
  coinbar = new StatusBar(20, 35, "coins", 0);
  bottlebar = new StatusBar(20, 0, "bottles", 0);
  bossBar = new BossStatusBar(800, 0);
  throwableObject = [];
  canThrowBottle = true;
  bottleCount = 5;
  throwSound = new Audio("assets/audio/throw.mp3");
  // TODO: Fertig machen
  // ! Fireball Function
  endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
  fireballs = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.endboss.world = this;
    this.draw();
    this.run();
}


shotFireBall() {
  let fireBall = new FireBall(this.endboss.x, this.endboss.y);
  this.throwableObject.push(fireBall);
  fireBall.shot();
  
  setTimeout(() => {
      this.removeFireBall(fireBall);
  }, 2000);
}

removeFireBall(fireBall) {
  const index = this.throwableObject.indexOf(fireBall);
  if (index > -1) {
      this.throwableObject.splice(index, 1);
  }
}


  run() {
    setInterval(() => {
      this.checkBossCollision();
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkEnemiesCollision();
    }, 1000 / 60);
  }

  playThrowSound() {
    this.throwSound.currentTime = 0.81;
    this.throwSound.play();
    setTimeout(() => {
      this.throwSound.pause();
      this.throwSound.currentTime = 0;
    }, 650);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.canThrowBottle && this.bottleCount > 0) {
        this.bottleCount--;
        this.playThrowSound();

        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            this.bossBar.setPercentage(Math.min(endboss.energy * 5, 100));
        }

        let bottle = new ThrowableObject(
            this.character.x + (this.character.otherDirection ? -10 : 70),
            this.character.y + 100,
            this.character.bottles
        );

        bottle.speedX = this.character.otherDirection ? -8 : 8;

        this.throwableObject.push(bottle);
        this.canThrowBottle = false;
        setTimeout(() => {
            this.canThrowBottle = true;
        }, 1000);
    }
}

checkBossCollision() {
  this.throwableObject.forEach((projectile) => {
      if (!projectile.hasHit) {
          this.level.enemies.forEach((enemy, index) => {
              if (enemy.isColliding(projectile instanceof ThrowableObject)) {
                  projectile.hasHit = true;
                  projectile.triggerSplash();

                  if (enemy instanceof Endboss) {
                      enemy.energy -= 20;
                      if (enemy.energy < 0) {
                          enemy.energy = 0;
                      }

                      this.bossBar.setPercentage((enemy.energy / 100) * 100);
                  }

                  if (enemy.energy > 0) {
                      enemy.energy -= 100;
                  }

                  if (enemy.energy <= 0 && !enemy.isDead) {
                      enemy.isDead = true;
                      enemy.showDeadChicken();
                      setTimeout(() => {
                          this.level.enemies.splice(index, 1);
                      }, 500);
                  }
              }
          });
      }
  });
}


  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      const enemyBottom = enemy.y + enemy.height - enemy.offset.bottom;

      if (this.character.isColliding(enemy)) {
        if (
          this.character.y +
            this.character.height -
            this.character.offset.bottom <=
            enemyBottom &&
          this.character.speedY < 0 &&
          this.character.isJumping
        ) {
          if (!enemy.isDead) {
            enemy.energy -= 50;
            if (enemy.energy <= 0) {
              this.showDeadChicken(enemy);
            }
          }
        } else if (!enemy.isDead) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        }
      }
    });
  }

  showDeadChicken(enemy) {
    enemy.isDead = true;
    enemy.showDeadChicken();
    setTimeout(() => {
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }, 2000);
  }

  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.coins += 1;
        this.coinbar.setPercentage(Math.min(this.character.coins * 2, 100));
        this.level.coins.splice(index, 1);
      }
    });
  }

  // TODO: endboss, responsive machen

  checkEnemiesCollision() {
    this.throwableObject.forEach((bottle) => {
      if (!bottle.hasHit) {
        this.level.enemies.forEach((enemy, index) => {
          if (enemy.isColliding(bottle)) {
            bottle.triggerSplash();
            if (enemy.energy > 0) {
              enemy.energy -= 100;
            }

            if (enemy.energy <= 0 && !enemy.isDead) {
              enemy.isDead = true;
              enemy.showDeadChicken();
              setTimeout(() => {
                this.level.enemies.splice(index, 1);
              }, 500);
            }
          }
        });
      }
    });
  }

  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottleCount++;
        this.bottlebar.setPercentage(Math.min(this.bottleCount * 5, 100));
        this.level.bottles.splice(index, 1);
      }
    });
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    // TODO: Fertig machen
    // ! Fireball Function
    this.addObjectToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
    if (this.character.x >= 4000) {
      this.addToMap(this.bossBar);
  }
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.level.bottles);
    this.addObjectToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
