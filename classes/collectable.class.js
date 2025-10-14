class Collectable extends DrawableObject{
    COLLECTABLE_IMAGES;
    width = 180;
    height = 40;
    x;
    y = 0;
    percentage = 0;

    /**
     * Creates a Collectable object at specified x-coordinate with given images.
     * @param {number} x - The x-coordinate of the Collectable.
     * @param {Array} COLLECTABLE_IMAGES - Array of image paths for different collectable states.
     */
    constructor(x, COLLECTABLE_IMAGES){
        super();
        this.x = x;
        this.COLLECTABLE_IMAGES = COLLECTABLE_IMAGES;
        this.loadImages(this.COLLECTABLE_IMAGES);
        this.setPercentage(this.percentage);
    }



    /**
     * Updates  coin status display based on collected percentage.
     * Maps `percentage` value (0–10) to the correct coin mark image.
     * @param {number} percentage 
     */
    setPercentage(percentage){
        this.percentage = percentage;

        if(this.percentage == 9 || this.percentage == 10){
            this.loadImage(this.COLLECTABLE_IMAGES[5]);
        }else if(this.percentage == 7 || this.percentage == 8){
            this.loadImage(this.COLLECTABLE_IMAGES[4]);
        }else if(this.percentage == 5 || this.percentage == 6){
            this.loadImage(this.COLLECTABLE_IMAGES[3]);
        }else if(this.percentage == 3 || this.percentage == 4){
            this.loadImage(this.COLLECTABLE_IMAGES[2]);
        }else if(this.percentage == 1 || this.percentage == 2){
            this.loadImage(this.COLLECTABLE_IMAGES[1]);
        }else{
            this.loadImage(this.COLLECTABLE_IMAGES[0]);
        }

    }
}