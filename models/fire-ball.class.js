class FireBall extends MoveableObject {
    x;
    y;
    width = 150;
    height = 150;
    speedX = -8;
    IMAGES_SHOT = [
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_0.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_1.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_2.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_3.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_4.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_5.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_6.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_7.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_8.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_9.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_10.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_11.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_12.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_20.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_21.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_22.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_23.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_24.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_25.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_26.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_27.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_28.png',
        'assets/img/4_enemie_boss_chicken/3_attack/energyBall/img_29.png',
      ];
      currentImage = 0;
      hasHit = false;
      explosionSound = new Audio('assets/audio/explosion.mp3');
      otherDirection = true;

  // TODO: Fertig machen
  // ! Fireball Function
    constructor(x, y) {
        super().loadImage(this.IMAGES_SHOT[0]);
        this.loadImages(this.IMAGES_SHOT);
        this.x = x;
        this.y = y + 200;
    }

    shot() {
        let shotinterval = setInterval(() => {
            if(!this.hasHit) {
                this.playAnimation(this.IMAGES_SHOT);
                this.x += this.speedX;
            }
        }, 1000 / 60)
    }


}