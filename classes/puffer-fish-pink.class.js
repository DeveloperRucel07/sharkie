class PufferFishPink extends MovableObject {
    IMAGES_SWIM = [
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];
    imagePath = 'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png';
    width = 100;
    height = 100;
    offset = {
        top:8,
        bottom:25,
        left:0,
        right:10
    }

    constructor(x, y) {
        super().loadImage(this.imagePath);
        this.x = x;
        this.y = y;
        this.imageCache = {};
        this.loadImages(this.IMAGES_SWIM);
        this.animateFish();
        this.speed = 0.3 + Math.random() * 0.5;
        
    }

    animateFish(){
        this.playAnimation(this.IMAGES_SWIM);
        this.moveLeft();
    }
 
}