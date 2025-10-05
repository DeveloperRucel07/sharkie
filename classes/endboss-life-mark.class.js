class EndBossLife extends DrawableObject{
    LIFE_MARK_IMAGES = [
        'images/4.Marks/red_endboss/0_endboss.png',
        'images/4.Marks/red_endboss/20_endboss.png',
        'images/4.Marks/red_endboss/40_endboss.png',
        'images/4.Marks/red_endboss/60_endboss.png',
        'images/4.Marks/red_endboss/80_endboss.png',
        'images/4.Marks/red_endboss/100_endboss.png'

    ];
    width = 200;
    height = 40;
    x = 700;
    y = 0;

    percentage = 100;

    constructor(){
        super();
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