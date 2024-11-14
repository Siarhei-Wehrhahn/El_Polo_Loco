class Coin extends MoveableObject {
    height = 100;
    width = 100;
    y;
    x;
    offset = {
        top: 37,
        bottom: 37,
        left: 37,
        right: 37
      }

    constructor(y, x) {
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.y = y;
        this.x = x;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
