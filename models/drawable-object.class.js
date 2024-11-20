class DrawableObject {
    x = 120;
    y = 270;
    img;
    imageCache = {};
    currentImage;
    height = 170;
    width = 100;
    audioManager;

    constructor() {
      this.audioManager = AudioManager.getInstance();
    }

    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
    }

    draw(ctx) {
      if (this.img) {
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
  }

  drawFrame(ctx) {
    if (this instanceof Endboss || this instanceof SmallChicken || this instanceof Chicken || this instanceof Character || this instanceof FireBall || this instanceof Coin) {
      const xPos = this.x + this.offset.left;
      const yPos = this.y + this.offset.top;
      const width = this.width - this.offset.left - this.offset.right;
      const height = this.height - this.offset.top - this.offset.bottom;
  
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'red';
      ctx.rect(xPos, yPos, width, height);
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

document.addEventListener('DOMContentLoaded', () => {
  const audioManager = AudioManager.getInstance();

  document.getElementById('volumeSlider').addEventListener('input', (event) => {
      const selectedVolume = parseFloat(event.target.value) / 100;
      audioManager.setVolume(selectedVolume);
  });
});