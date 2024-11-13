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

  constructor(x, y, world) {
    super().loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.world = world;
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.speedY = 30;
    this.throw();
    this.checkCollisions();
  }

  throw() {
    this.applyGravity();
    this.speedY = 30;
    this.throwInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_THROW);
      this.x += 8;
    }, 1000 / 60);
  }

  checkCollisions() {
    // this.world.level.enemies.forEach((enemie) => {
    //   if (this.isColliding(enemie)) {
    //     this.startSplashAnimation();
    //     enemie.hit();
    //   }
    // });
  }

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        clearInterval(this.throwInterval);
        this.startSplashAnimation();
        clearInterval(this.gravityInterval);
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 360;
  }

  startSplashAnimation() {
    this.hasHit = true;
    this.currentImage = 0;
    const splashInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
        
        // Erhöhen Sie currentImage nur, wenn playAnimation keine Schleifenlogik hat
        if (this.currentImage >= this.IMAGES_SPLASH.length - 1) {
            clearInterval(splashInterval);
            this.currentImage = 0;
            this.img = null;  // Setzt das Bild auf null, um das letzte Splash-Bild zu entfernen
        } else {
            this.currentImage++;
        }
    }, 1000 / 25);
}

}