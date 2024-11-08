const level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
            new Coin()
        ],
        [
            new Cloud()
        ],
        [],
        [],
)

level1.createBackgroundObjectsLevel1();
level1.spawnCoins();