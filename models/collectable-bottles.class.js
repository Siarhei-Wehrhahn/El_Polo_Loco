class CollectableBottle extends MoveableObject {
  height = 80;
  width = 70;
  y = 350;
  x;

  constructor(x) {
    super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
    this.x = x;
  }
}
