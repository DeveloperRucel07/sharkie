class LifeMark extends DrawableObject{
    LIFE_MARK_IMAGES;
    width = 180;
    height = 40;
    x;
    y = 0;
    percentage = 100;
    
    /**
     * Creates a Collectable object at specified x-coordinate with given images.
     * @param {number} x - The x-coordinate of the Collectable.
     * @param {Array} LIFE_MARK_IMAGES - Array of image paths for different life mark states.
     */
    constructor(x, LIFE_MARK_IMAGES){
        super();
        this.x = x;
        this.LIFE_MARK_IMAGES = LIFE_MARK_IMAGES;
        this.loadImages(this.LIFE_MARK_IMAGES);
        this.setPercentageLife(this.percentage);
        
    }


    /**
     *Updates the life/health bar display based on current life percentage.
     * Maps `percentage` value (0–100) to the correct life mark image.
     * @param {number} percentage 
     */
    setPercentageLife(percentage){
        this.percentage = percentage;
        if(this.percentage == 0){
            this.loadImage(this.LIFE_MARK_IMAGES[0]);
        }else if(this.percentage <= 20){
            this.loadImage(this.LIFE_MARK_IMAGES[1]);
        }else if(this.percentage <= 40){
            this.loadImage(this.LIFE_MARK_IMAGES[2]);
        }else if(this.percentage <= 60){
            this.loadImage(this.LIFE_MARK_IMAGES[3]);
        }else if(this.percentage <= 80){
            this.loadImage(this.LIFE_MARK_IMAGES[4]);
        }else{
            this.loadImage(this.LIFE_MARK_IMAGES[5]);
        }
    }

}