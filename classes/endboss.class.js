class Endboss extends MovableObject{
    IMAGES_COME = [
        'images/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/10.png',
        
    ];

    IMAGES_SWIM = [
        'images/2.Enemy/3 Final Enemy/2.floating/1.png',
        'images/2.Enemy/3 Final Enemy/2.floating/2.png',
        'images/2.Enemy/3 Final Enemy/2.floating/3.png',
        'images/2.Enemy/3 Final Enemy/2.floating/4.png',
        'images/2.Enemy/3 Final Enemy/2.floating/5.png',
        'images/2.Enemy/3 Final Enemy/2.floating/6.png',
        'images/2.Enemy/3 Final Enemy/2.floating/7.png',
        'images/2.Enemy/3 Final Enemy/2.floating/8.png',
        'images/2.Enemy/3 Final Enemy/2.floating/9.png',
        'images/2.Enemy/3 Final Enemy/2.floating/10.png',
        'images/2.Enemy/3 Final Enemy/2.floating/11.png',
        'images/2.Enemy/3 Final Enemy/2.floating/12.png',
        'images/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_HURT = [
        'images/2.Enemy/3 Final Enemy/Hurt/1.png',
        'images/2.Enemy/3 Final Enemy/Hurt/3.png',
        'images/2.Enemy/3 Final Enemy/Hurt/4.png',
        'images/2.Enemy/3 Final Enemy/Hurt/2.png'
    ]
    imagePath = 'images/2.Enemy/3 Final Enemy/1.Introduce/5.png';
    width = 350;
    height = 350;
    offset = {
        top:140,
        bottom:40,
        left:15,
        right:15
    }

    constructor(x, y) {
        super().loadImage(this.imagePath);
        this.x = x;
        this.y = y;
        this.imageCache = {};
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_HURT);
        this.speed = 0;
    }

    animateFish(){
        if(this.isHurt()){
            this.playAnimation(this.IMAGES_HURT);
        }else{
            this.playAnimation(this.IMAGES_SWIM);
        }

    }
}