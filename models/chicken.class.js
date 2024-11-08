class Chicken extends MoveableObject {
    height = 60;
    width = 60;
    y = 359;
    IMAGES_WALKING = [
      'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    currentImage = 0;

  constructor(xPosition = 250 + Math.random() * 500) {
    super().loadImage(
      'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'
    );
    this.loadImages(this.IMAGES_WALKING)
    this.moveLeft
    this.x = xPosition;
    this.speed = 0.15 + Math.random() * 0.6;
    this.animate()

  }

  animate() {
    setInterval(() => {
      if (this.x <= -10) {
        this.x = Character.x + 400;
      }
      this.moveLeft()
    }, 1000/60);
    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200)
  }


}
