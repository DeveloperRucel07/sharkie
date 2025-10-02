class JellyFishLila extends MovableObject{
    width = 80;
    height = 80;
    offset = {
        top:8,
        bottom:8,
        left:8,
        right:8
    }
   
    IMAGES = [
        'images/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'images/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'images/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'images/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png', 
    ];

    imagePath = 'images/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png';
    constructor(x){
        super().loadImage(this.imagePath);
        this.loadImages(this.IMAGES);
        this.y = this.y = 600 - this.height;
        this.x = x;
        this.speed = 5 + Math.random() * 0.3;
        this.jumHeight = 600;
        this.animate();
    }


    animate(){
        this.playAnimation(this.IMAGES);
        this.moveUpDown();
    }


    moveUpDown(){
        this.y -= this.speed;
        if (this.y <= 0 || this.y <= -this.jumHeight) {
            this.speed *= -1;
        }else if (this.y >= this.jumHeight -this.height+20) {
            this.speed *= -1;
        }
    }

}