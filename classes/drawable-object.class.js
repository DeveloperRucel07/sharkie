class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 250;
    height = 100;
    width = 100;
    otherDirection = false;
    max_x_fishes = 3300;

    /**
     * Loads an image from the given path and assigns it to this.img.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and caches them in this.imageCache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    /**
     * Draws the object's image on the canvas context. Flips horizontally if otherDirection is true.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if(!this.otherDirection){ 
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
            ctx.restore();
        } 
    }

    /**
     * Draws a red border around the object if it is an instance of specific enemy or item classes.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawBorder(ctx){
        if(this instanceof Shark || this instanceof Poison || this instanceof Coin || this instanceof Life || this instanceof PufferFishPink || this instanceof PufferFishOrange || this instanceof PufferFishGreen || this instanceof JellyFishYellow || this instanceof JellyFishPink || this instanceof JellyFishLila || this instanceof JellyFishGreen || this instanceof Endboss){
            ctx.beginPath();
            ctx.strokeStyle = "red"; 
            ctx.lineWidth = 2;       
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.stroke(); 
        }
        
    }

    /**
     * Draws a green border around the object with offset adjustments if it is an instance of specific enemy or item classes.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawBorderOffset(ctx){
        if(this instanceof Shark || this instanceof Poison || this instanceof Coin || this instanceof Life || this instanceof PufferFishPink || this instanceof PufferFishOrange || this instanceof PufferFishGreen || this instanceof JellyFishYellow || this instanceof JellyFishPink || this instanceof JellyFishLila || this instanceof JellyFishGreen || this instanceof Endboss){
            ctx.beginPath();
            ctx.strokeStyle = "green"; 
            ctx.lineWidth = 3;       
            ctx.strokeRect(this.x+this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke(); 
        }
        
    }
}