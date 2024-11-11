class DrawableObject {
    x = 120;
    y = 270;
    img;
    imageCache = {};
    currentImage;
    height = 170;
    width = 100;

    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
    }

    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }

}