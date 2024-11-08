class MoveableObject {
  x = 120;
  y = 270;
  height = 170;
  width = 100;
  img;
  imageCache = {};
  speed = 0.15;
  otherDirection = false;
  currentImage;
  speedY;
  acceleration = 3;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180;
  }

  jump() {
    this.speedY = 30;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    if (images.length > 0) {
      let i = this.currentImage % images.length;
      this.img = this.imageCache[images[i]];
      this.currentImage++;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}
