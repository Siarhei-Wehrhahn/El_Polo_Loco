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
  endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
  fireballs = [];
  animationPlayed = false;
  showWinningScreenInstance = new ShowWinningScreen();
  fullLife = 100;
  smallHit = 10;
  currentDirection = null;
  directionDuration = 0;
  maxSpeed = 1.0;
  speedIncreaseRate = 0.02;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character.audioManager.loadAudio('throw', 'assets/audio/throw.mp3');
    this.character.audioManager.loadAudio('explosion', 'assets/audio/explosion.mp3');
    this.character.audioManager.loadAudio('shot', 'assets/audio/shot-fireball.mp3');
    this.character.audioManager.loadAudio('hurt', 'assets/audio/hurt.mp3');
    this.character.audioManager.loadAudio('coinCollect', 'assets/audio/collect-coin.mp3');
    this.setWorld();
    this.endboss.world = this;
    this.draw();
    this.run();
  }

  playThrowSound() {
    this.character.audioManager.playAudio("throw", 0.81, 650);
  }

  playExplosionSound() {
    this.character.audioManager.playAudio("explosion");
  }

  playShotSound() {
    this.character.audioManager.playAudio("shot", 0.9);
  }

  playSound(sound, startTime = 0, duration = null) {
    if (sound.readyState === 4) {
      sound.currentTime = startTime;
      sound.play();
      if (duration) {
        setTimeout(() => {
          sound.pause();
          sound.currentTime = 0;
        }, duration);
      }
    }
  }

  shotFireBall() {
    let fireBall = new FireBall(this.endboss.x, this.endboss.y);
    this.fireballs.push(fireBall);
    this.playShotSound();

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
      this.checkFireballCollision();
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkEnemiesCollision();
      this.checkForLose();
    }, 1000 / 60);
  }

  clearGameObjects() {
    this.level.enemies = [];
    this.level.coins = [];
    this.level.bottles = [];
    this.throwableObject = [];
    this.fireballs = [];
    this.character = null;
    this.level = null;
  }

  checkForLose() {
    if (this.character.energy <= 0) {
      this.character.gameEnd = true;
      this.level.enemies.forEach((enemy) => {
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 100);
      });
      this.showWinningScreenInstance.showLoseScreen(this.character.x);
    }
  }

  checkFireballCollision() {
    this.fireballs.forEach((fireball, index) => {
      if (!fireball.hasHit) {
        if (this.character.isColliding(fireball) && !this.character.gameEnd) {
          fireball.hasHit = true;

          this.character.hit();
          this.playExplosionSound();
          this.statusbar.setPercentage(this.character.energy);

          this.fireballs.splice(index, 1);
        }
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.canThrowBottle && this.bottleCount > 0) {
      this.bottleCount--;
      this.playThrowSound();
      this.bottlebar.setPercentage(Math.min(this.bottleCount * 5, 100));

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
    this.throwableObject.forEach((bottle, bottleIndex) => {
      if (!bottle.hasHit) {
        this.level.enemies.forEach((enemy) => {
          if (enemy instanceof Endboss && enemy.isColliding(bottle)) {
            bottle.triggerSplash();
            bottle.hasHit = true;

            if (enemy.energy > 0) {
              enemy.energy -= this.smallHit;
              enemy.animateHurt();
            } else if (enemy.energy <= 0 && !this.animationPlayed) {
              this.animationPlayed = true;
              enemy.animateDead();
              this.character.gameEnd = true;
              this.level.enemies.forEach((enemy) => {
                this.level.enemies.splice(
                  this.level.enemies.indexOf(enemy),
                  100
                );
              });
              this.showWinningScreenInstance.showWinningScreen(
                this.character.x
              );
            }
            if (enemy.energy < 0) {
              enemy.energy = 0;
            }

            this.bossBar.setPercentage(enemy.energy);

            setTimeout(() => {
              this.throwableObject.splice(bottleIndex, 1);
            }, 200);
          }
        });
      }
    });
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      const enemyBottom = enemy.y + enemy.height - enemy.offset.bottom;

      if (this.character.isColliding(enemy) && !this.character.gameEnd) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
          if (!enemy.isDead && !(enemy instanceof Endboss)) {
            enemy.energy -= this.fullLife;
            if (enemy.energy <= 0) {
              enemy.isDead = true;
              this.showDeadChicken(enemy);
            }
          }
        } else if (!enemy.isDead && !this.character.gameEnd) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        }
      }
    });
  }

  showDeadChicken(enemy) {
    enemy.deadChicken();
    setTimeout(() => {
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }, 2000);
  }

  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.audioManager.playAudio('coinCollect');
        this.character.coins += 1;
        this.coinbar.setPercentage(Math.min(this.character.coins * 2, 100));
        this.level.coins.splice(index, 1);
        setTimeout(() => {
          this.character.audioManager.pauseAudio('coinCollect');
        }, 500);
      }
    });
  }

  checkEnemiesCollision() {
    this.throwableObject.forEach((bottle) => {
      if (!bottle.hasHit) {
        this.level.enemies.forEach((enemy, index) => {
          if (enemy.isColliding(bottle) && !this.character.gameEnd) {
            bottle.triggerSplash();
            if (enemy.energy > 0) {
              enemy.energy -= this.fullLife;
            }

            if (enemy.energy <= 0 && !enemy.isDead) {
              enemy.isDead = true;
              this.showDeadChicken(enemy);
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
    this.addObjectToMap(this.fireballs);
    this.addToMap(this.showWinningScreenInstance);
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
