class JellyFishGreen extends MovableObject{
    width = 80;
    height = 80;
    offset = {
        top:8,
        bottom:8,
        left:8,
        right:8
    }
   
    IMAGES_SWIM = [
        'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];

    IMAGES_DIE = [
        'images/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'images/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'images/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'images/2.Enemy/2 Jelly fish/Dead/green/g4.png'
    ];

    imagePath = 'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png';
    constructor(x){
        super().loadImage(this.imagePath);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DIE);
        this.y = 600 - this.height;
        this.x = x;
        this.speed = 3 + Math.random() * 0.3;
        this.jumHeight = 600;
        this.animate();
    }


    /**
    *Animates jelly fish behavior.
    * - If dead -> play death animation and move upwards.
    * - If alive -> play swim animation.
    * Jelly Fish Move Up and Down automatically
    *
    */
    animate(){ 
        if(this.isDead()){
            this.playAnimation(this.IMAGES_DIE);
            this.animateDeathToTop();
        }else{
            this.playAnimation(this.IMAGES_SWIM);
        }
        this.moveUpDown(); 
    }


    /**
     * Moves the object vertically (up and down).
     * Decreases `y` by `speed` each call (moving upward).
     * Reverses direction when reaching the top (0 or -jumpHeight).
     * Reverses direction when reaching the bottom (jumpHeight - height + 20).
     */
    moveUpDown(){
        this.y -= this.speed;
        if (this.y <= 0 || this.y <= -this.jumHeight) {
            this.speed *= -1;
        }else if (this.y >= this.jumHeight -this.height+20) {
            this.speed *= -1;
        }
    }

}