class PufferFishOrange extends MovableObject {
    IMAGES_SWIM = [
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    ];

    IMAGES_DIE = [
        'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png'
    ];

    imagePath = 'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png';
    width = 80;
    height = 80;
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
        this.speed = 4 + Math.random() * 0.5;
        this.moveLeft();
    }

    animateFish(){
        if(this.isDead()){
            this.playAnimation(this.IMAGES_SWIM);
        }
        this.playAnimation(this.IMAGES_SWIM);
        this.moveLeft();
    }
 
}