class CoinMark extends DrawableObject{
    COIN_MARK_IMAGES = [];
    imagePath = '../images/4.Marks/Purple/0_ _1.png'; 
    constructor(x,y, width, height, imagePath, COIN_MARK_IMAGES ){
        super(x,y, width, height, imagePath);
        this.loadImage(imagePath);
        this.COIN_MARK_IMAGES = COIN_MARK_IMAGES;
        this.loadImages(this.COIN_MARK_IMAGES);
    }
}