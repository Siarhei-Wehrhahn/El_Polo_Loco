class ShowWinningScreen extends MoveableObject {
    x;
    y = 1500;
    width = 400;
    height = 200;
    currentImage = 0;

    IMAGES_WIN = [
        'assets/img/9_intro_outro_screens/win/won_1.png',
        'assets/img/9_intro_outro_screens/win/won_2.png',
    ];

    constructor() {
        super()
        this.loadImage(this.IMAGES_WIN[0]);
        this.loadImages(this.IMAGES_WIN);
    }
// TODO: ! WinninSScreen
showWinningScreen(x) {
    this.y = 150;
    this.x = x + 200;
    this.animationInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_WIN);
    }, 200);

    setTimeout(() => {
        clearInterval(this.animationInterval);
        this.showRestartButton();
    }, 5000);
}



    showRestartButton() {
        const button = document.createElement("button");
        button.textContent = "Restart Game";
        button.style.position = "absolute";
        button.style.top = "50%";
        button.style.left = "50%";
        button.style.transform = "translate(-50%, -50%)";
        button.style.padding = "10px 20px";
        button.style.fontSize = "20px";
        button.style.backgroundColor = "gold";
        button.style.border = "none";
        button.style.cursor = "pointer";
        document.body.appendChild(button);

        button.addEventListener("click", () => {
            document.body.removeChild(button);
            this.restartGame();
        });
    }

    restartGame() {
        location.reload();
    }

    clearIntervals() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
