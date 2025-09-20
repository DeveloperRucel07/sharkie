class CoinMark extends DrawableObject{
    COIN_MARK_IMAGES = [];
    imagePath = 'images/4.Marks/Purple/0_ _1.png'; 
    width = 200;
    height = 40;
    x = 270;
    y = 0;
    constructor(){
        super().loadImage(this.imagePath);
        this.loadImages(this.COIN_MARK_IMAGES);
    }
}