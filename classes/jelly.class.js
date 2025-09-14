class Jelly extends MovableObject {
    IMAGES_SWIM = [];
    imagePath = '../images/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png';
    constructor(x, y, width, height ,IMAGES_SWIM) {
        super(x, y, width, height);
        this.loadImage(this.imagePath);
        this.imageCache = {};
        this.IMAGES_SWIM = IMAGES_SWIM;
        this.loadImages(this.IMAGES_SWIM);
        this.animateJelly();
        this.currentFrame = 0;
        this.frameCounter = 0;
        this.frameSpeed = 30;
        this.speed = 0.4 + Math.random() * 0.3;
        this.jumHeight = 600;
        this.moveUpDown();
    }

    animateJelly(){
        this.frameCounter++;
        if (this.frameCounter >= this.frameSpeed) {
            this.currentFrame = (this.currentFrame + 1) % this.IMAGES_SWIM.length;
            this.frameCounter = 0;
            let i = this.currentImage % this.IMAGES_SWIM.length;
            let path = this.IMAGES_SWIM[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    moveUpDown(){
        
        setInterval(() => {
            this.y -= this.speed;
            if (this.y <= 0 || this.y <= -this.jumHeight) {
                this.speed *= -1;
            }else if (this.y >= this.jumHeight) {
                this.speed *= -1;
            }
        }, 1000 / 60);
    }

}