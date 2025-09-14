class Mark extends MovableObject{
    MARK_IMAGES = [];
    constructor(x,y, width, height, imagePath ){
        super(x,y, width, height, imagePath);
        this.loadImage(imagePath);
        this.loadImages(this.MARK_IMAGES);
    }
}