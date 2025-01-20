class BackgroundObject extends MoveableObject {

    width = 1441;
    height = 480;
    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
        
        this.audioManager.loadAudio('bg', 'assets/audio/bg-music.mp3');
        // this.playBackgroundMusic();
    }

    playBackgroundMusic() {
        setInterval(() => {
            this.audioManager.playAudio('bg');
        }, 1000 * 10);
    }
}
