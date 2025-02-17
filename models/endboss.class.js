class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 55;
  offset = {
    top: 75,
    bottom: 16,
    left: 40,
    right: 32,
  };
  energy = 100;
  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  currentImage = 0;
  isAnimating = false;
  fireballs = [];
  isDead = false;

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.audioManager.loadAudio('bbq', 'assets/audio/bbq.mp3');
    this.audioManager.loadAudio('hello', 'assets/audio/endboss.mp3');
    this.x = 6000;
    this.animateBoss();
  }

  animateBoss() {
    const checkProximityInterval = setInterval(() => {
      if (
        this.world &&
        this.world.character &&
        this.energy > 0 &&
        this.world.character.x + this.world.character.width >= this.x - 500
      ) {
        clearInterval(checkProximityInterval);
        this.loopAnimations();
      }
    }, 100);
  }

  loopAnimations() {
    if (this.isDead || this.energy <= 0) return;
    this.animateWalking(() => {
      this.animateAlert(() => {
        this.animateAttack(() => {
          this.loopAnimations();
        });
      });
    });
  }

  animateWalking(callback) {
    if (this.isDead) return;
    let counter = 0;
    const walkingInterval = setInterval(() => {
      if (this.isDead) {
        clearInterval(walkingInterval);
        return;
      }
      this.playAnimation(this.IMAGES_WALKING);
      this.x -= 5;
      counter++;
      if (counter >= this.IMAGES_WALKING.length) {
        clearInterval(walkingInterval);
        if (callback) callback();
      }
    }, 200);
  }

  animateAlert(callback) {
    let counter = 0;
    this.audioManager.playAudio('hello');
    const alertInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
      counter++;
      if (counter >= this.IMAGES_ALERT.length) {
        clearInterval(alertInterval);
        if (callback) callback();
      }
    }, 500);
  }

  animateAttack(callback) {
    if (this.isDead) return;
    let counter = 0;
    const attackInterval = setInterval(() => {
      if (this.isDead) {
        clearInterval(attackInterval);
        return;
      }
      this.audioManager.pauseAudio('hello');
      this.playAnimation(this.IMAGES_ATTACK);
      counter++;
      if (counter >= this.IMAGES_ATTACK.length) {
        clearInterval(attackInterval);
        if (callback) callback();
      }
    }, 500);
    if (!this.isDead) this.animateFlash();
    if (!this.isDead) this.world.shotFireBall();
  }

  animateFlash() {
    if (this.isDead) return;
    let fireBall = new FireBall(this.x, this.y);
    this.fireballs.push(fireBall);
    const fireballInterval = setInterval(() => {
      if (this.isDead) {
        clearInterval(fireballInterval);
        return;
      }
      fireBall.shot();
    }, 1000 / 60);

    setTimeout(() => {
      clearInterval(fireballInterval);
      this.fireballs.splice(this.fireballs.indexOf(fireBall), 1);
    }, 2000);
  }

  animateHurt() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      let counter = 0;
      const hurtInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_HURT);
        counter++;
        if (counter >= this.IMAGES_HURT.length) {
          clearInterval(hurtInterval);
          this.isAnimating = false;
        }
      }, 100);
    }
  }

  animateDead() {
    if (this.isDead || this.isAnimating) return;

    this.clearAllIntervals();
    this.isDead = true;
    this.isAnimating = true;

    let counter = 0;
    const deadInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
      counter++;
      if (counter >= this.IMAGES_DEAD.length) {
        this.audioManager.playAudio('bbq')
        clearInterval(deadInterval);
        this.isAnimating = false;
        setTimeout(() => this.remove(), 1000);
        setTimeout(() => this.audioManager.pauseAudio('bbq'), 5000);
      }
    }, 500);
  }

  clearAllIntervals() {
    if (this.walkingInterval) clearInterval(this.walkingInterval);
    if (this.alertInterval) clearInterval(this.alertInterval);
    if (this.attackInterval) clearInterval(this.attackInterval);
  }

  remove() {
    const index = this.world.level.enemies.indexOf(this);
    if (index !== -1) {
      this.world.level.enemies.splice(index, 1);
    }
  }

  takeDamage(damage) {
    if (this.isDead) return;

    this.energy -= damage;

    if (this.energy <= 0) {
      this.die();
    } else if (!this.isAnimating) {
      this.animateHurt();
    }
  }

  die() {
    if (this.isDead) return;
    this.animateDead();
  }
}
