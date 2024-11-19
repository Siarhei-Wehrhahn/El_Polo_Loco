class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  bottles;
  hurtSound;
  audios = [
    "assets/audio/splat/splat.mp3",
    "assets/audio/splat/splat1.mp3",
    "assets/audio/splat/splat2.mp3",
    "assets/audio/splat/splat3.mp3",
  ];
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  constructor() {
    super();
    this.hurtSound = this.audioManager.loadAudio('hurt', "assets/audio/hurt.mp3");
  }

  playRandomAudio() {
    const randomSoundPath = this.audios[Math.floor(Math.random() * this.audios.length)];
    let index = this.audios.findIndex(audio => audio === randomSoundPath);
    this.audioManager.playAudio(this.audios[index]);
  }

  playHurtSound() {
    this.audioManager.playAudio('hurt');
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
    if (this instanceof ThrowableObject) {
      return true;
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

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    let timePassed = new Date().getTime() - this.lastHit;
    if (timePassed > 1000 && this.energy > 0) {
      this.playHurtSound();
      this.energy -= 15;
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
