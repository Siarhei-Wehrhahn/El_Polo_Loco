class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins = [];
    level_end_x = 71950;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.createMoreChicken();
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
            new Coin(x, y + 140),
          );
      }
}

    createBackgroundObjectsLevel1() {
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

      createMoreChicken() {
        setInterval(() => {
            if(world.character.x < this.level_end_x) {
                const spawnDistance = 1000 + Math.random() * 100;
                const chickenPosition = world.character.x + spawnDistance;

                const newChicken = [
                    new Chicken(chickenPosition),
                    new Chicken(chickenPosition + 50),
                ];

                this.enemies.push(...newChicken)
            }
        }, 1000 * 10)
      }

      
}