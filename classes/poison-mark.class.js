class PoisonMark extends DrawableObject{
    POISON_MARK_IMAGES = [];
    imagePath = '../images/4.Marks/Purple/0_.png'; 
    constructor(x,y, width, height, imagePath, POISON_MARK_IMAGES ){
        super(x,y, width, height, imagePath);
        this.loadImage(imagePath);
        this.POISON_MARK_IMAGES = POISON_MARK_IMAGES;
        this.loadImages(this.POISON_MARK_IMAGES);
    }
}