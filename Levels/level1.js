const level1 = new Level(
        [
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new Endboss(),
        ],
        [
            new Cloud()
        ],
        [
            new Coin()
        ],
        [],
)

level1.createBackgroundObjectsLevel1();
level1.spawnCoins();
level1.spawnBottles();