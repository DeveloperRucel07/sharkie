class PoisonMark extends DrawableObject{
    POISON_MARK_IMAGES = [
        'images/4.Marks/green/poisoned bubbles/0_ copia 2.png',
        'images/4.Marks/green/poisoned bubbles/20_ copia 3.png',
        'images/4.Marks/green/poisoned bubbles/40_ copia 2.png',
        'images/4.Marks/green/poisoned bubbles/60_ copia 2.png',
        'images/4.Marks/green/poisoned bubbles/80_ copia 2.png',
        'images/4.Marks/green/poisoned bubbles/100_ copia 3.png',
    ];
    width = 200;
    height = 40;
    x = 520;
    y = 0;
    percentage = 0;
    constructor(){
        super();
        this.loadImages(this.POISON_MARK_IMAGES);
        this.setPercentagePoison(this.percentage)
    }


    /**
     * Updates poison status display based on collected percentage.
     * Maps `percentage` value (0–10) to the correct poison mark image.
     * @param {number} percentage 
     */
    setPercentagePoison(percentage){
        this.percentage = percentage;

        if( this.percentage == 9 || this.percentage == 10){
            this.loadImage(this.POISON_MARK_IMAGES[5]);
        }else if(this.percentage == 7 || this.percentage == 8){
            this.loadImage(this.POISON_MARK_IMAGES[4]);
        }else if(this.percentage == 5 || this.percentage == 6){
            this.loadImage(this.POISON_MARK_IMAGES[3]);
        }else if(this.percentage == 3 || this.percentage == 4){
            this.loadImage(this.POISON_MARK_IMAGES[2]);
        }else if(this.percentage == 1 || this.percentage == 2){
            this.loadImage(this.POISON_MARK_IMAGES[1]);
        }else{
            this.loadImage(this.POISON_MARK_IMAGES[0]);
        }

    }
    
}