class PufferFishOrange extends MovableObject {
    IMAGES_SWIM = [
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    ];
    imagePath = '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png';
    width = 80;
    height = 80;
    offset = {
        top:10,
        bottom:60,
        left:10,
        right:10
    }

    constructor(x, y) {
        super().loadImage(this.imagePath);
        this.x = x;
        this.y = y;
        this.imageCache = {};
        this.loadImages(this.IMAGES_SWIM);
        this.animateFish();
        this.speed = 0.15 + Math.random() * 0.5;
        this.moveLeft();
    }

    animateFish(){
        this.playAnimation(this.IMAGES_SWIM);
        this.moveLeft();
    }
 
}