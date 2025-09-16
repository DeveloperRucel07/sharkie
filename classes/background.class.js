class Background extends MovableObject{

    width = 900;
    height = 600;
    speed;

    constructor(x, imagePath, speed){
        super().loadImage(imagePath)
        this.x = x;
        this.y = 0;
        this.speed = speed;
    }

    animate() {
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.x = 900;
        }
    }

}