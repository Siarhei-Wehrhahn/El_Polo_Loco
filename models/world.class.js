class World {
  character = new Character();
  enemies = [
      new Chicken(),
      new Chicken(),
      new Chicken()
  ];
  clouds = [
      new Cloud()
  ];
  backgroundObjects = [];

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.createBackgroundObjects();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
  }

  createBackgroundObjects() {
    const backgroundLayers = [
      'assets/img/5_background/layers/air.png',
      'assets/img/5_background/layers/3_third_layer/full.png',
      'assets/img/5_background/layers/2_second_layer/full.png',
      'assets/img/5_background/layers/1_first_layer/full.png',
    ];

    const repetitions = 50;
    const layerWidth = 1439;
    for (let i = 0; i < repetitions; i++) {
      backgroundLayers.forEach((layer) => {
        this.backgroundObjects.push(
          new BackgroundObject(layer, i * layerWidth)
        );
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);
    this.addObjectToMap(this.clouds);
    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  addObjectToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}