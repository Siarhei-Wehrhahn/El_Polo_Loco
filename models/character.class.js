class Character extends MoveableObject {
  height = 250;
  width = 100;
  y = 180;
  IMAGES_WALKING_PEPE = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  currentImagePepe = 0;

  constructor() {
    super().loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING_PEPE);
    this.animate();
  }

  animate() {
    if (this.world.keyboard.RIGHT) {
      setInterval(() => {
        let i = this.currentImagePepe % this.IMAGES_WALKING_PEPE.length;
        this.img = this.imageCache[this.IMAGES_WALKING_PEPE[i]];
        this.currentImagePepe++;
      }, 100);
    }
  }

  jump() {}
}
