class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins = [];
  bottles = [];
  level_end_x = 71950;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }

  spawnBottles() {
    const repetitions = 50;
    let x = 200;
    for (let i = 0; i < repetitions; i++) {
      this.bottles.push(
        new CollectableBottle(x)
      );
      x += Math.random() * 550;
    }
  }

  spawnCoins() {
    const repetitions = 50;
    let y = -200;
    for (let i = 0; i < repetitions; i++) {
      y += 1000;
      let x = 110 + Math.random() * 150;
      this.coins.push(
        new Coin(x, y),
        new Coin(x, y + 35),
        new Coin(x, y + 70),
        new Coin(x, y + 105),
        new Coin(x, y + 140)
      );
    }
  }

  createBackgroundObjectsLevel1() {
    const backgroundLayers = {
      1: [
        "assets/img/5_background/layers/air.png",
        "assets/img/5_background/layers/air.png",
      ],
      2: [
        "assets/img/5_background/layers/3_third_layer/1.png",
        "assets/img/5_background/layers/3_third_layer/2.png",
      ],
      3: [
        "assets/img/5_background/layers/2_second_layer/1.png",
        "assets/img/5_background/layers/2_second_layer/2.png",
      ],
      4: [
        "assets/img/5_background/layers/1_first_layer/1.png",
        "assets/img/5_background/layers/1_first_layer/2.png",
      ],
    };
  
    const repetitions = 50;
    const layerWidth = 1440;
    const overlap = 1;
  
    for (let i = 0; i < repetitions; i++) {
      Object.keys(backgroundLayers).forEach((layerKey) => {
        const layerImages = backgroundLayers[layerKey];

        this.backgroundObjects.push(
          new BackgroundObject(layerImages[0], i * layerWidth * 2 - overlap)
        );

        this.backgroundObjects.push(
          new BackgroundObject(layerImages[1], i * layerWidth * 2 + layerWidth - overlap)
        );
      });
    }
  }

  createMoreChicken() {
    setTimeout(() => {
        setInterval(() => {
            if (world && world.character) {
                const spawnDistance = 1000 + Math.random() * 100;
                const chickenPosition = world.character.x + spawnDistance;

                const newChicken = [
                    new Chicken(chickenPosition),
                    new SmallChicken(chickenPosition + 40),
                    new Chicken(chickenPosition + 50),
                    new SmallChicken(chickenPosition + 70),
                ];

                this.enemies.push(...newChicken);
            }
        }, 1000 * 5);
    }, 4000);
}

}
