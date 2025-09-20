class LifeMark extends DrawableObject{
    LIFE_MARK_IMAGES = [];
    imagePath = 'images/4.Marks/Purple/100_ .png';
    width = 200;
    height = 40;
    x = 10;
    y = 0;

    constructor(){
        super().loadImage(this.imagePath);
        this.loadImages(this.LIFE_MARK_IMAGES);
    }
}