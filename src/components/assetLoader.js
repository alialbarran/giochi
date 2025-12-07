// Asset Loader - Manages loading and caching of game assets

class AssetLoader {
    constructor() {
        this.images = {};
        this.loadedCount = 0;
        this.totalCount = 0;
        this.onProgressCallbacks = [];
        this.onCompleteCallbacks = [];
    }

    // Load a single image
    loadImage(name, path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images[name] = img;
                this.loadedCount++;
                this.notifyProgress();
                resolve(img);
            };
            img.onerror = () => {
                console.warn(`Failed to load image: ${path}`);
                // Create a fallback colored square
                const fallback = this.createFallbackImage(20, 20, '#666666');
                this.images[name] = fallback;
                this.loadedCount++;
                this.notifyProgress();
                resolve(fallback);
            };
            img.src = path;
        });
    }

    // Create a fallback colored rectangle for missing images
    createFallbackImage(width, height, color) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        return canvas;
    }

    // Load multiple images
    async loadImages(imageMap) {
        this.totalCount = Object.keys(imageMap).length;
        this.loadedCount = 0;

        const promises = Object.entries(imageMap).map(([name, path]) => 
            this.loadImage(name, path)
        );

        await Promise.all(promises);
        this.notifyComplete();
        return this.images;
    }

    // Get a loaded image
    getImage(name) {
        return this.images[name] || null;
    }

    // Check if image exists
    hasImage(name) {
        return name in this.images;
    }

    // Progress notification
    onProgress(callback) {
        this.onProgressCallbacks.push(callback);
    }

    // Complete notification
    onComplete(callback) {
        this.onCompleteCallbacks.push(callback);
    }

    notifyProgress() {
        const progress = this.totalCount > 0 ? (this.loadedCount / this.totalCount) * 100 : 0;
        this.onProgressCallbacks.forEach(cb => cb(progress, this.loadedCount, this.totalCount));
    }

    notifyComplete() {
        this.onCompleteCallbacks.forEach(cb => cb(this.images));
    }

    // Get loading progress
    getProgress() {
        return this.totalCount > 0 ? (this.loadedCount / this.totalCount) * 100 : 0;
    }
}

// Create singleton instance
export const assetLoader = new AssetLoader();

// Asset paths configuration for Snake game
export const snakeAssets = {
    // Game icons (Main Menu)
    'icon-snake': 'src/assets/images/icons/snake-icon.png',
    'icon-asteroids': 'src/assets/images/icons/asteroids-icon.png',
    
    // Level icons
    'level-amazonas': 'src/assets/images/levels/amazonas-icon.png',
    'level-africa': 'src/assets/images/levels/africa-icon.png',
    'level-india': 'src/assets/images/levels/india-icon.png',
    'level-china': 'src/assets/images/levels/china-icon.png',
    'level-japan': 'src/assets/images/levels/japan-icon.png',
    'level-america': 'src/assets/images/levels/america-icon.png',
    'level-europe': 'src/assets/images/levels/europe-icon.png',
    'level-australia': 'src/assets/images/levels/australia-icon.png',
    'level-metro-london': 'src/assets/images/levels/metro-london-icon.png',
    'level-metro-intl': 'src/assets/images/levels/metro-internacional-icon.png',
    
    // Snake sprites
    'snake-head': 'src/assets/images/sprites/snake-head.png',
    'snake-body': 'src/assets/images/sprites/snake-body.png',
    'food-normal': 'src/assets/images/sprites/food-normal.png',
    'food-special': 'src/assets/images/sprites/food-special.png',
    
    // Backgrounds (optional - can use solid colors)
    'bg-amazonas': 'src/assets/images/backgrounds/amazonas-bg.png',
    'bg-africa': 'src/assets/images/backgrounds/africa-bg.png',
    'bg-india': 'src/assets/images/backgrounds/india-bg.png',
    'bg-china': 'src/assets/images/backgrounds/china-bg.png',
    'bg-japan': 'src/assets/images/backgrounds/japan-bg.png',
    'bg-america': 'src/assets/images/backgrounds/america-bg.png',
    'bg-europe': 'src/assets/images/backgrounds/europe-bg.png',
    'bg-australia': 'src/assets/images/backgrounds/australia-bg.png',
    'bg-metro-london': 'src/assets/images/backgrounds/metro-london-bg.png',
    'bg-metro-intl': 'src/assets/images/backgrounds/metro-internacional-bg.png',
};

// Asset paths for Asteroids game
export const asteroidsAssets = {
    'icon-asteroids': 'src/assets/images/icons/asteroids-icon.png',
    'ship': 'src/assets/images/sprites/ship.png',
    'asteroid-large': 'src/assets/images/sprites/asteroid-large.png',
    'asteroid-medium': 'src/assets/images/sprites/asteroid-medium.png',
    'asteroid-small': 'src/assets/images/sprites/asteroid-small.png',
    'bullet': 'src/assets/images/sprites/bullet.png',
    'bg-space': 'src/assets/images/backgrounds/space-bg.png',
};
