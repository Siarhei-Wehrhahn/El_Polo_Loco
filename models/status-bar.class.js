class StatusBar extends DrawableObject {
  x;
  y;
  height = 50;
  width= 220;
  IMAGES = {
    "health":[
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
      "assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
    ],
    "coins":[
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ],
    "bottles":[
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]
  } 
  selectedBar;

  percentage;
  selectedimage = 6;

  constructor(x, y, selectedBar, percentage) {
    super();
    this.loadImages(this.IMAGES.health);
    this.loadImages(this.IMAGES.coins);
    this.loadImages(this.IMAGES.bottles);
    this.x = x;
    this.y = y;
    this.selectedBar = selectedBar;
    this.setPercentage(percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.selectedBar][this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else if (this.percentage == 0) {
      return 0;
    }
  }
}
