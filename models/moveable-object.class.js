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
      let i = this.currentImage % this.IMAGES_WALKING.length;
      this.img = this.imageCache[this.IMAGES_WALKING[i]];
      this.currentImage++;
    }

    moveLeft() {
        setInterval(() => {
          this.x -= this.speed;
        }, 1000/60)
      }
}