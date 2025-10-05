class CoinMark extends DrawableObject{
    COIN_MARK_IMAGES = [
        'images/4.Marks/orange/0_coin.png',
        'images/4.Marks/orange/20_coin.png',
        'images/4.Marks/orange/40_coin.png',
        'images/4.Marks/orange/60_coin.png',
        'images/4.Marks/orange/80_coin.png',
        'images/4.Marks/orange/100_coin.png'
,
    ];
    width = 180;
    height = 40;
    x = 220;
    y = 0;
    percentage = 0;
    constructor(){
        super();
        this.loadImages(this.COIN_MARK_IMAGES);
        this.setPercentageCoin(this.percentage);
    }



    /**
     * Updates  coin status display based on collected percentage.
     * Maps `percentage` value (0–10) to the correct coin mark image.
     * @param {number} percentage 
     */
    setPercentageCoin(percentage){
        this.percentage = percentage;

        if(this.percentage == 9 || this.percentage == 10){
            this.loadImage(this.COIN_MARK_IMAGES[5]);
        }else if(this.percentage == 7 || this.percentage == 8){
            this.loadImage(this.COIN_MARK_IMAGES[4]);
        }else if(this.percentage == 5 || this.percentage == 6){
            this.loadImage(this.COIN_MARK_IMAGES[3]);
        }else if(this.percentage == 3 || this.percentage == 4){
            this.loadImage(this.COIN_MARK_IMAGES[2]);
        }else if(this.percentage == 1 || this.percentage == 2){
            this.loadImage(this.COIN_MARK_IMAGES[1]);
        }else{
            this.loadImage(this.COIN_MARK_IMAGES[0]);
        }

    }
}