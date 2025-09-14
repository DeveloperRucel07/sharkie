class Fish extends MovableObject {
    IMAGES_SWIM = [];
    imagePath = '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png';
    constructor(x, y, width, height ,IMAGES_SWIM) {
        super(x, y, width, height);
        this.loadImage(this.imagePath);
        this.imageCache = {};
        this.IMAGES_SWIM = IMAGES_SWIM;
        this.loadImages(this.IMAGES_SWIM);
        this.animateFish();
        this.speed = 0.15 + Math.random() * 0.5;
        this.moveLeft();
        // this.moveRight();
    }

    animateFish(){
        let i = this.currentImage % this.IMAGES_SWIM.length;
        let path = this.IMAGES_SWIM[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        this.moveLeft();

    }
 
}