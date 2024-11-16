class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  bottles;
  hurtSound = new Audio('assets/audio/hurt.mp3');
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if(this instanceof ThrowableObject) {
      return true   
    } else {
      return this.y < 180;
    }
  }

  jump() {
    this.speedY = 30;
  }

  playAnimation(images) {
    if (images.length > 0) {
      let i = this.currentImage % images.length;
      let imgPath = images[i];
      
      if (this.imageCache[imgPath]) {
        this.img = this.imageCache[imgPath];
        this.currentImage++;
      } else {
        console.error(`Bild nicht gefunden im Cache: ${imgPath}`);
      }
    }
  }

  isColliding (mo) {
    return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
}
  
hit() {
  let timePassed = new Date().getTime() - this.lastHit;
  if (timePassed > 1000) {
    this.hurtSound.play();
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
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
