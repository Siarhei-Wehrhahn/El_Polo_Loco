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
  world;
  walking_sound = new Audio('../assets/audio/running.mp3');
  jump_sound = new Audio('assets/audio/jump.mp3')
  currentImage = 0;

  constructor() {
    super().loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      let currentDirection = null;
      this.walking_sound.pause();
      if (
        this.world &&
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x
      ) {
        currentDirection = "RIGHT";
        this.otherDirection = false;
        this.x += this.speed;
        this.walking_sound.play();
      }

      if (this.world && this.world.keyboard.LEFT && this.x > 108) {
        currentDirection = "LEFT";
        this.otherDirection = true;
        this.x -= this.speed;
        this.walking_sound.play();
      }

      if(this.world && this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
        this.jump_sound.play();
      }

      this.world.camera_x = -this.x + 100;

      if (
        currentDirection === this.lastDirection &&
        currentDirection !== null
      ) {
        this.walkDuration += 1000 / 60;
      } else {
        this.walkDuration = 0;
        this.speed = this.baseSpeed;
      }

      if (this.walkDuration >= 2000) {
        this.speed = Math.min(this.speed + this.speedIncrement, this.maxSpeed);
      }

      this.lastDirection = currentDirection;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMP);
      } else {
        if (
          this.world &&
          (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
          !this.isAboveGround()
        ) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 50);
  }
}
