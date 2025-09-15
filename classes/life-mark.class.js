class LifeMark extends DrawableObject{
    LIFE_MARK_IMAGES = [];
    imagePath = '../images/4.Marks/Purple/100_ .png'; 
    constructor(x,y, width, height, imagePath, LIFE_MARK_IMAGES ){
        super(x,y, width, height, imagePath);
        this.loadImage(imagePath);
        this.LIFE_MARK_IMAGES = LIFE_MARK_IMAGES
        this.loadImages(this.LIFE_MARK_IMAGES);
    }
}