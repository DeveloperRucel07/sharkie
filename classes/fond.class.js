class Fond extends MovableObject {
    speed;
    width = 676;
    height = 450;
    constructor( x, y, imagePath, speed) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animate();
    }


    animate() {
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.x = 900;
        }
    }

}