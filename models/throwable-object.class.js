class ThrowableObject extends MoveableObject {
  IMAGES_THROW = [
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
      "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SPLASH = [
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
      "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  currentImage = 0;
  hasHit = false;
  brokenGlass;

  constructor(x, y, world) {
      super().loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
      this.world = world;
      this.loadImages(this.IMAGES_THROW);
      this.loadImages(this.IMAGES_SPLASH);
      this.audioManager.loadAudio('brokenGlass', 'assets/audio/glass-break.mp3')
      this.x = x;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.speedY = 30;
      this.throw();
  }

  throw() {
    this.applyGravity();
    this.speedY = 30;
    this.throwInterval = setInterval(() => {
        if (!this.hasHit) {
            this.playAnimation(this.IMAGES_THROW);
            this.x += this.speedX;
        }
    }, 1000 / 60);
}


  applyGravity() {
      this.gravityInterval = setInterval(() => {
          if (!this.hasHit) {
              if (this.isAboveGround()) {
                  this.y -= this.speedY;
                  this.speedY -= this.acceleration;
              } else {
                  this.triggerSplash(false);
              }
          }
      }, 1000 / 25);
  }

  isAboveGround() {
      return this.y < 360;
  }

  triggerSplash(hitEnemy) {
      if (!this.hasHit) {
          this.hasHit = true;
          if (hitEnemy) {
              this.y += 40;
          }
          clearInterval(this.throwInterval);
          clearInterval(this.gravityInterval);
          this.audioManager.playAudio('brokenGlass')
          this.startSplashAnimation();
      }
  }

  startSplashAnimation() {
      this.currentImage = 0;
      const splashInterval = setInterval(() => {
          this.playAnimation(this.IMAGES_SPLASH);
          if (this.currentImage >= this.IMAGES_SPLASH.length - 1) {
              clearInterval(splashInterval);
              this.currentImage = 0;
              this.img = null;
          } else {
              this.currentImage++;
          }
      }, 1000 / 25);
  }
}
