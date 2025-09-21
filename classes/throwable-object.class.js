class ThrowableObject extends MovableObject{
    type;
    contructor(type, x, y, image){
        super().loadImage(this.image);
        this.type = type;
        this.x = x;
        this.y = y;
        this.image = image;
    }


}