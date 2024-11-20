class Chicken extends MoveableObject {
  height = 60;
  width = 60;
  y = 359;
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  currentImage = 0;
  isDead = false;
  walkInterval;
  animationInterval;
  offset = {
    top: 10,
    bottom: 5,
    left: 4,
    right: 9,
  };

  constructor(xPosition = 1050 + Math.random() * 500) {
    super().loadImage(
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.x = xPosition;
    this.speed = 0.15 + Math.random() * 0.6;
    this.animate();
  }

  animate() {
    this.walkInterval = setInterval(() => {
      // if (this.x <= -10) {
      //   this.x = Character.x + 400;
      // }
      this.moveLeft();
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  deadChicken() {
    clearInterval(this.walkInterval);
    clearInterval(this.animationInterval);
    this.playRandomAudio();
    this.loadImage(
      "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    );
  }
}
