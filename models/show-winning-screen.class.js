class ShowWinningScreen extends MoveableObject {
  x;
  y = 1500;
  width = 400;
  height = 200;
  currentImage = 0;
  isPlayed = false;

  IMAGES_WIN = [
    "assets/img/9_intro_outro_screens/win/won_1.png",
    "assets/img/9_intro_outro_screens/win/won_2.png",
  ];
  IMAGES_LOST = [
    "assets/img/9_intro_outro_screens/game_over/game over.png",
    "assets/img/9_intro_outro_screens/game_over/game over.png",
  ];
  winSound;
  loseSound;

  constructor() {
    super();
    this.loadImages(this.IMAGES_WIN);
    this.loadImages(this.IMAGES_LOST);
    this.audioManager.loadAudio('win', 'assets/audio/win.mp3');
    this.audioManager.loadAudio('lose', 'assets/audio/lose.mp3');
  }

  showWinningScreen(x) {
    this.y = 137;
    this.x = x + 240;
    if (!this.isPlayed) {
      this.isPlayed = true;
      this.audioManager.playAudio('win');
    }
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WIN);
    }, 200);

    setTimeout(() => {
      this.audioManager.pauseAudio('lose');
    }, 3000);

    setTimeout(() => {
      clearInterval(this.animationInterval);
      this.showRestartButton();
    }, 5000);
  }

  showLoseScreen(x) {
    this.y = 137;
    this.x = x + 220;
    if (!this.isPlayed) {
      this.isPlayed = true;
      this.audioManager.playAudio('lose');
    }
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_LOST);
    }, 200);

    setTimeout(() => {
      clearInterval(this.animationInterval);
      this.showRestartButton();
    }, 5000);
  }

  showRestartButton() {
    if (document.getElementById("restartButton")) {
      return;
    }
  
    const button = document.createElement("a");
    button.id = "restartButton";
    button.className = "codepen-button";
    button.innerHTML = "<span>Restart Game</span>";
    button.style.position = "absolute";
    button.style.top = "50%";
    button.style.left = "50%";
    button.style.transform = "translate(-50%, -50%)";
    button.style.textAlign = "center";
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
