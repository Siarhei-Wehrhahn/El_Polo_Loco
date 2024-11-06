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

  constructor() {
    super().loadImage(
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.moveLeft
    this.loadImages(this.IMAGES_WALKING)
    this.x = 250 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.6;
    this.animate()

  }

  animate() {
    this.moveLeft();
    setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length
        this.img = this.imageCache[this.IMAGES_WALKING[i]];
        this.currentImage++;
    }, 200)
  }


}
