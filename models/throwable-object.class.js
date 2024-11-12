class ThrowableObject extends MoveableObject {
  IMAGES_THROW = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  constructor(x, y) {
    super().loadImage("assets/img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_THROW);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.speedY = 30;
    this.throw();
    this.applyGravity()
  }

  throw() {
    this.playAnimation(this.IMAGES_THROW);
    this.speedY = 30;
    this.throwInterval = setInterval(() => {
      this.x += 10;
    }, 1000 / 60);
  }

  checkHit(){
    World.checkColi
  }
}
