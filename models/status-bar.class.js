class StatusBar extends DrawableObject {
    x = 20;
    y = 20;
    height = 50;
    width = 300;
    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ]

    percentage = 100;
    selectedimage = 6;

    constructor() {
        super.loadImages(this.IMAGES);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        this.selectedimage = Math.floor(percentage / 20);
        console.log(this.selectedimage);
        
    }
}