class BossStatusBar extends StatusBar {
    x;
    y;
    height = 50;
    width = 220;
    IMAGES = [
      'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
      'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
      'assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
      'assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
      'assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
      'assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];
    percentage = 100;
    selectedImage = 0;
    otherDirection = true;
    
    constructor(x, y) {
      super();
      this.x = x;
      this.y = y;
      this.setPercentage(100);
      this.loadImagesAsync(this.IMAGES);
    }
  
    loadImagesAsync(images) {
      this.imageCache = {};
      let loadedImages = 0;
      const totalImages = images.length;
  
      images.forEach((imagePath) => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
          loadedImages++;
          this.imageCache[imagePath] = img;
          if (loadedImages === totalImages) {
            // Alle Bilder wurden erfolgreich geladen
            this.setPercentage(this.percentage); // Jetzt kann das Bild angezeigt werden
          }
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${imagePath}`);
        };
      });
    }
  
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  }
  