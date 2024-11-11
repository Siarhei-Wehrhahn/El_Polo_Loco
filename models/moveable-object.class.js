class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY;
  acceleration = 3;
  energy = 100;
  lastHit = 0;

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

  playAnimation(images) {
    if (images.length > 0) {
      let i = this.currentImage % images.length;
      this.img = this.imageCache[images[i]];
      this.currentImage++;
    }
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

  isColliding (mo) {
    return  this.x + this.width > mo.x &&
    this.y + this.height > mo.y &&
    this.x < mo.x &&
    this.y < mo.y + mo.height;
}
  
  hit() {
    this.energy -= 5;
    if(this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
}

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}
