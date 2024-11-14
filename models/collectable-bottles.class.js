class CollectableBottle extends MoveableObject {
  height = 80;
  width = 70;
  y = 350;
  x;
  
  offset = {
    top: 15,
    bottom: 11,
    left: 32,
    right: 17
  }

  constructor(x) {
    super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
    this.x = x;
  }
}
