class PufferFish extends MovableObject {
    IMAGES_SWIM;

    IMAGES_DIE;

    width = 100;
    height = 100;
    offset = {
        top:8,
        bottom:25,
        left:0,
        right:10
    }


    /**
     * Creates a PufferFish object at specified coordinates with swim and die animations.
     * @param {number} x - The x-coordinate of the PufferFish.
     * @param {number} y - The y-coordinate of the PufferFish.
     * @param {Array} IMAGES_SWIM - Array of image paths for swimming animation.
     * @param {Array} IMAGES_DIE - Array of image paths for dying animation.
     */
    constructor(x, y, IMAGES_SWIM, IMAGES_DIE) {
        super();
        this.x = x;
        this.y = y;
        this.IMAGES_SWIM = IMAGES_SWIM;
        this.IMAGES_DIE = IMAGES_DIE;
        this.imageCache = {};
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DIE);
        this.animateFish();
        this.speed = 10 + Math.random() * 1.5;
        this.die = false;
        
    }


    /**
        *Animates puffer fish behavior.
        * - If dead -> play death animation and move upwards.
        * - If alive -> play swim animation.
        * start to move Left
        *
    */
    animateFish(){
        if(this.die){
            this.playAnimation(this.IMAGES_DIE);
            this.animateDeathToTop();
        }else{
            this.playAnimation(this.IMAGES_SWIM);
        }
        this.moveLeft();
    }
 
}