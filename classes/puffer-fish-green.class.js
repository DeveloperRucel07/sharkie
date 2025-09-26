class PufferFishGreen extends MovableObject {
    IMAGES_SWIM = [
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];


    IMAGES_DIE = [
        'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png'
    ];

    imagePath = 'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png';
    width = 90;
    height = 90;
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
        this.speed = 7 + Math.random() * 0.5;
    }

    animateFish(){
        if(this.isDead()){
            this.playAnimation(this.IMAGES_DIE);
            this.animateDeathToTop();
        }else{

            this.playAnimation(this.IMAGES_SWIM);
        }
        this.moveLeft();
    }
 
}