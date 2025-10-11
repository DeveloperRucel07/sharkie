class JellyFish extends MovableObject{
    width = 80;
    height = 80;
    offset = {
        top:8,
        bottom:8,
        left:8,
        right:8
    }
   
    IMAGES_SWIM;
    IMAGES_DIE;

    constructor(x, IMAGES_SWIM, IMAGES_DIE){
        super();
        this.y = this.y = 600 - this.height;
        this.x = x;
        this.IMAGES_SWIM = IMAGES_SWIM;
        this.IMAGES_DIE = IMAGES_DIE;
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DIE);
        this.speed = 8 + Math.random() * 2;
        this.jumHeight = 600;
        this.animate();
        this.die = false;
    }


    /**
    *Animates jelly fish behavior.
    * - If dead -> play death animation and move upwards.
    * - If alive -> play swim animation.
    * Jelly Fish Move Up and Down automatically
    *
    */
    animate(){
        if(this.die){
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