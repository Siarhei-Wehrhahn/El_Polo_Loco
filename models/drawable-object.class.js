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

    drawFrame(ctx) {
      if (this instanceof Character || this instanceof Chicken) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
      }
    }

    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }

}