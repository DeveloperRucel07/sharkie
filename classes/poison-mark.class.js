class PoisonMark extends DrawableObject{
    POISON_MARK_IMAGES = [];
    imagePath = 'images/4.Marks/Purple/0_.png';
    width = 200;
    height = 40;
    x = 520;
    y = 0;
    constructor(){
        super().loadImage(this.imagePath);
        this.loadImages(this.POISON_MARK_IMAGES);
    }
}