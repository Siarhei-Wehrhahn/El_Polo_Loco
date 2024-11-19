class AudioManager {
    constructor() {
        this.audioCache = {};
        this.volume = 0.5;  // Standardlautstärke (50%)
    }

    loadAudio(key, path) {
        const audio = new Audio(path);
        audio.volume = this.volume;  // Setzt die Lautstärke
        this.audioCache[key] = audio;
        return audio;
    }

    playAudio(key) {
        if (this.audioCache[key]) {
            this.audioCache[key].play();
        } else if (key) {
            let audio = new Audio(key);
            audio.volume = this.volume;  // Setzt die Lautstärke für neu geladenes Audio
            audio.play();
        } else {
            console.error(`Audio mit Schlüssel "${key}" nicht gefunden.`);
        }
    }

    pauseAudio(name) {
        const audio = this.audioCache[name];
        if (audio) {
            audio.pause();
        }
    }

    setVolume(value) {
        this.volume = value;  // Lautstärkewert aktualisieren
        // Alle geladenen Audios anpassen
        Object.values(this.audioCache).forEach(audio => {
            audio.volume = value;
        });
    }
}