class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 55;
  offset = {
      top: 75,
      bottom: 16,
      left: 40,
      right: 32
  };
  energy = 100;
  IMAGES_WALKING = [
      'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  IMAGES_ALERT = [
      'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
  ];
  IMAGES_ATTACK = [
      'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
  ];
  IMAGES_HURT = [
      'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
      'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
      'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];
  IMAGES_DEAD = [
      'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
  ];
  currentImage = 0;
  isAnimating = false;
  fireballs = [];

  constructor() {
      super().loadImage(this.IMAGES_ALERT[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 800;
      this.animateBoss();
  }

  animateBoss() {
      this.animateWalking();
  }

  animateWalking() {
      if (!this.isAnimating) {
          this.isAnimating = true;
          let counter = 0;
          const walkingInterval = setInterval(() => {
              this.playAnimation(this.IMAGES_WALKING);
              this.x -= 0.1;
              counter++;
              if (counter >= this.IMAGES_WALKING.length) {
                  clearInterval(walkingInterval);
                  this.isAnimating = false;
                  this.animateAlert();
              }
          }, 800);
      }
  }

  animateAlert() {
      if (!this.isAnimating) {
          this.isAnimating = true;
          let counter = 0;
          const alertInterval = setInterval(() => {
              this.playAnimation(this.IMAGES_ALERT);
              counter++;
              if (counter >= this.IMAGES_ALERT.length) {
                  clearInterval(alertInterval);
                  this.isAnimating = false;
                  this.animateAttack();
              }
          }, 500);
      }
  }

  animateAttack() {
    if (!this.isAnimating) {
        this.isAnimating = true;
        let counter = 0;
        const attackInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
            this.animateFlash();
            counter++;
            if (counter >= this.IMAGES_ATTACK.length) {
                clearInterval(attackInterval);
                this.isAnimating = false;
                if (this.world) {
                    this.world.shotFireBall();
                }
            }
        }, 500);
    }
}


  animateFlash() {
      let fireBall = new FireBall(this.x, this.y);
      this.fireballs.push(fireBall);
      setInterval(() => {
        fireBall.shot();
      }, 1000 / 60);
      setTimeout(() => {
        this.fireballs.splice(this.fireballs.indexOf(fireBall), 1);
      }, 2000)
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
          }, 500);
      }
  }

  animateDead() {
      if (!this.isAnimating) {
          this.isAnimating = true;
          let counter = 0;
          const deadInterval = setInterval(() => {
              this.playAnimation(this.IMAGES_DEAD);
              counter++;
              if (counter >= this.IMAGES_DEAD.length) {
                  clearInterval(deadInterval);
                  this.isAnimating = false;
                  this.remove();
              }
          }, 500);
      }
  }

  takeDamage(damage) {
      this.energy -= damage;
      if (this.energy <= 0) {
          this.die();
      } else {
          this.animateHurt();
      }
  }

  die() {
      this.animateDead();
  }
}
