class MovableObject {
    x;
    y;
    width;
    height;
    image;
    imageCache = {};
    currentImage = 0;
    speed = 0;
    otherDirection = false;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveLeft() {
        this.x -= this.speed;
        if (this.x <= 0) {
            this.x = 0;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
    }

    moveRight() {
        this.otherDirection = true;
        this.x += this.speed;
        if (this.x + this.width >= 900) {
            this.x = 900 - this.width;
            this.speed *= -1;
            this.otherDirection = false; 
        }
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => {
            this.imgLoaded = true;
        };
    }

    draw(ctx) {
        if(!this.otherDirection){ 
            if (this.imgLoaded) { 
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }else{
                console.error("Image not loaded yet: " + this.img.src);
            }
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            if (this.imgLoaded) {
                ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
            }else{
                console.error("Image not loaded yet: " + this.img.src);
            }
            ctx.restore();
        } 
    }
}