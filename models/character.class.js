class Character extends MoveableObject {
  height = 250;
  width = 100;
  y = 180;
  baseSpeed = 7;
  maxSpeed = 15;
  speed = this.baseSpeed;
  speedIncrement = 0.15;
  walkDuration = 0;
  lastDirection = null;
  IMAGES_WALKING_PEPE = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  walking_sound = new Audio('../assets/audio/running.mp3');
  currentImagePepe = 0;

  constructor() {
    super().loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING_PEPE);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let currentDirection = null;
      this.walking_sound.pause();
      if (this.world && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        currentDirection = 'RIGHT';
        this.otherDirection = false;
        this.x += this.speed;
        this.walking_sound.play();
      } 
      
      if (this.world && this.world.keyboard.LEFT && this.x > 100) {
        currentDirection = 'LEFT';
        this.otherDirection = true;
        this.x -= this.speed;
        this.walking_sound.play();
      }

      this.world.camera_x = -this.x + 100;

      if (currentDirection === this.lastDirection && currentDirection !== null) {
        this.walkDuration += 1000 / 60;
      } else {
        this.walkDuration = 0;
        this.speed = this.baseSpeed;
      }

      if(this.walkDuration >= 2000) {
        this.speed = Math.min(this.speed + this.speedIncrement, this.maxSpeed);
      }

      this.lastDirection = currentDirection;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
        let i = this.currentImagePepe % this.IMAGES_WALKING_PEPE.length;
        this.img = this.imageCache[this.IMAGES_WALKING_PEPE[i]];
        this.currentImagePepe++;
      }
    }, 50);
  }

  jump() {}
}
