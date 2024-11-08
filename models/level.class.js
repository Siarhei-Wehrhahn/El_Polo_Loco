class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 14400000000;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.createMoreChicken();
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
                ];

                this.enemies.push(...newChicken)
            }
        }, 1000 * 3)
      }
}