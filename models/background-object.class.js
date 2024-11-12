class BackgroundObject extends MoveableObject {

    width = 1441;
    height = 480;
    constructor(imagePath, x) {
        super().loadImage(imagePath)
        this.x = x;
        this.y = 480 - this.height;
    }
}