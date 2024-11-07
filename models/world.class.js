class World {
  character = new Character();
  enemies = [
      new Chicken(),
      new Chicken(),
      new Chicken()
    ]
    clouds = [
      new Cloud()
    ]
    backgroundObjects = [
      new BackgroundObject('assets/img/5_background/layers/air.png', 0, -1),
      new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
    ]
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.setWorld();
      this.draw();
    }

    setWorld() {
      this.character.world = this;
    }

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.addObjectToMap(this.backgroundObjects);
      this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
      this.addObjectToMap(this.enemies);
      this.addObjectToMap(this.clouds);

  
      requestAnimationFrame(() => this.draw());
  }

  addObjectToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o)
    })
  }

  addToMap(mo) {
    if(mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.img.width, 0);
      this.ctx.scale(-1, 1);
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    if(mo.otherDirection) {
      this.ctx.restore();
    }
  }
}