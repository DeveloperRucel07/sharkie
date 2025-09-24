class EndBossLife extends DrawableObject{
    LIFE_MARK_IMAGES = [
        'images/4.Marks/Purple/0_ .png',
        'images/4.Marks/Purple/20_ .png',
        'images/4.Marks/Purple/40_ .png',
        'images/4.Marks/Purple/60_ .png',
        'images/4.Marks/Purple/80_ .png',
        'images/4.Marks/Purple/100_ .png',
    ];
    width = 200;
    height = 40;
    x = 10;
    y = 0;

    percentage = 100;

    constructor(){
        super();
        // this.percentage = percentage;
        this.loadImages(this.LIFE_MARK_IMAGES);
        this.setPercentageLife(this.percentage);
        
    }

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