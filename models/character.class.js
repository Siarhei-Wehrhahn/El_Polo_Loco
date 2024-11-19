class Character extends MoveableObject {
  height = 250;
  width = 115;
  y = 180;
  baseSpeed = 7;
  maxSpeed = 15;
  speed = this.baseSpeed;
  speedIncrement = 0.15;
  walkDuration = 0;
  lastDirection = null;
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMP = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_STAND = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_STAND = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];
  world;
  currentImage = 0;
  coins = 0;
  isJumping = false;
  timeWithoutPushButton;
  animationPlayed = false;
  gameEnd = false;
  offset = {
    top: 120,
    bottom: 19,
    left: 24,
    right: 32,
  };
  isStanding = false;
  isLongStanding = false;
  currentDirection = null;

  constructor() {
    super().loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STAND);
    this.loadImages(this.IMAGES_LONG_STAND);
    this.audioManager.loadAudio('jump', 'assets/audio/jump.mp3');
    this.audioManager.loadAudio('walk', 'assets/audio/walk.mp3');
    this.animate();
    this.applyGravity();
  }

  pushNothing() {
    if (
        !this.world.keyboard.RIGHT &&
        !this.world.keyboard.LEFT &&
        !this.world.keyboard.UP &&
        !this.world.keyboard.DOWN &&
        !this.world.keyboard.D &&
        !this.world.keyboard.SPACE &&
        !this.gameEnd
      ) {
        if (!this.timeWithoutPushButton) {
          this.timeWithoutPushButton = Date.now();
        }
        this.audioManager.pauseAudio('walk');
      } else {
        this.timeWithoutPushButton = null;
      }
  }

  goRight() {
    if (
        this.world &&
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        this.energy > 0 &&
        !this.gameEnd
      ) {
        this.currentDirection = "RIGHT";
        this.otherDirection = false;
        this.moveRight();
        if (!this.isAboveGround()) {
          this.audioManager.playAudio('walk');
        }
      }
  }

  goLeft() {
    if (
        this.world &&
        this.world.keyboard.LEFT &&
        this.x > 108 &&
        this.energy > 0 &&
        !this.gameEnd
      ) {
        this.currentDirection = "LEFT";
        this.otherDirection = true;
        this.moveLeft();
        if (!this.isAboveGround()) {
          this.audioManager.playAudio('walk');
        }
      }
  }

  pushUpAndJump() {
    if (
        this.world &&
        (this.world.keyboard.UP || this.world.keyboard.SPACE) &&
        !this.isAboveGround() &&
        this.energy > 0 &&
        !this.gameEnd
      ) {
        this.isJumping = true;
        this.jump();
        this.audioManager.playAudio('jump');
        setTimeout(() => {
          this.isJumping = false;
        }, 880);
      }
  }

  checkDirection() {
    if (
        this.currentDirection === this.lastDirection &&
        this.currentDirection !== null
      ) {
        this.walkDuration += 1000 / 60;
      } else {
        this.walkDuration = 0;
        this.speed = this.baseSpeed;
      }
  }

  animate() {
    this.startMovementLogic();
    this.startAnimationLogic();
  }
  
  startMovementLogic() {
    setInterval(() => {
      this.pushNothing();
      this.goRight();
      this.goLeft();
      this.pushUpAndJump();
      this.updateCameraPosition();
      this.updateSpeed();
      this.lastDirection = this.currentDirection;
    }, 1000 / 60);
  }
  
  startAnimationLogic() {
    setInterval(() => {
      if (this.isDeadAnimationNeeded()) {
        this.handleDeadAnimation();
      } else if (this.isHurtAnimationNeeded()) {
        this.playAnimation(this.IMAGES_HURT, 50);
      } else if (this.isJumpAnimationNeeded()) {
        this.playAnimation(this.IMAGES_JUMP, 50);
      } else if (this.isWalkingAnimationNeeded()) {
        this.playAnimation(this.IMAGES_WALKING, 50);
        this.resetStandStates();
      } else if (!this.isDead()) {
        this.handleIdleAnimations();
      }
    }, 50);
  }
  
  updateCameraPosition() {
    this.world.camera_x = -this.x + 100;
  }
  
  updateSpeed() {
    if (this.walkDuration >= 2000) {
      this.speed = Math.min(this.speed + this.speedIncrement, this.maxSpeed);
    }
  }
  
  isDeadAnimationNeeded() {
    return this.isDead() && !this.animationPlayed;
  }
  
  handleDeadAnimation() {
    this.playAnimationOnce(this.IMAGES_DEAD);
    this.animationPlayed = true;
    setTimeout(() => {
      this.gameEnd = true;
    }, this.IMAGES_DEAD.length * 100);
  }
  
  isHurtAnimationNeeded() {
    return this.isHurt() && !this.isDead();
  }
  
  isJumpAnimationNeeded() {
    return this.isAboveGround();
  }
  
  isWalkingAnimationNeeded() {
    return (
      this.world &&
      (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
      !this.isAboveGround()
    );
  }  

  handleIdleAnimations() {
    const timeIdle = this.timeWithoutPushButton
      ? Date.now() - this.timeWithoutPushButton
      : 0;

    if (timeIdle > 4000) {
      this.isStanding = false;
      this.isLongStanding = true;
      this.playAnimation(this.IMAGES_LONG_STAND, 100);
    } else if (timeIdle > 2000 && !this.isStanding && !this.isLongStanding) {
      this.isStanding = true;
      this.playAnimationOnce(this.IMAGES_STAND);
    } else if (!this.isStanding && !this.isLongStanding) {
      this.img = this.imageCache[this.IMAGES_STAND[0]];
    }
  }

  playAnimation(images, interval = 50) {
    const now = Date.now();
    if (!this.lastAnimationFrame || now - this.lastAnimationFrame > interval) {
      this.currentImage = (this.currentImage + 1) % images.length;
      this.img = this.imageCache[images[this.currentImage]];
      this.lastAnimationFrame = now;
    }
  }

  resetStandStates() {
    this.isStanding = false;
    this.isLongStanding = false;
  }

  playWalkingSound() {
    if (this.walkingSound.readyState === 4 && this.walkingSound.paused) {
      this.walkingSound.currentTime = 0;
      this.walkingSound.play();
    }
  }

  playJumpSound() {
    if (this.jumpSound.readyState === 4) {
      if (this.jumpSound.paused) {
        this.jumpSound.currentTime = 0;
        this.jumpSound.play();
      }
    }
  }

  playAnimationOnce(images) {
    let index = 0;
    const interval = setInterval(() => {
      this.img = this.imageCache[images[index]];
      index++;
      if (index >= images.length) {
        clearInterval(interval);
      }
    }, 100);
  }
}
