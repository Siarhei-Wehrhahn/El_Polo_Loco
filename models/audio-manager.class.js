class AudioManager {
    static instance;

    constructor() {
        if (AudioManager.instance) {
            return AudioManager.instance;
        }
        this.audioCache = {};
        this.volume = 0.5; // Standardlautstärke
        AudioManager.instance = this;
    }

    static getInstance() {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    loadAudio(key, path) {
        const audio = new Audio(path);
        audio.volume = this.volume;
        this.audioCache[key] = audio;
        return audio;
    }

    playAudio(key) {
        if (this.audioCache[key]) {
            try {
                this.audioCache[key].currentTime = 0;
                this.audioCache[key].play();
            } catch(e) {
                console.error(e);
            }
        } else {
            console.error(`Audio mit Schlüssel "${key}" nicht gefunden.`);
        }
    }

    pauseAudio(key) {
        const audio = this.audioCache[key];
        if (audio) {
            audio.pause();
        }
    }

    setVolume(value) {
        this.volume = value;
        Object.values(this.audioCache).forEach(audio => {
            audio.volume = value;
        });
    }

  isPlaying(audioKey) {
    const audio = this.audioCache[audioKey];
    return audio && !audio.paused && audio.currentTime > 0;
  }
  
  stopAudio(audioKey) {
    const audio = this.audioCache[audioKey];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  } 
}
