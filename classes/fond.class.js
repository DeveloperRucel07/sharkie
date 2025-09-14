class Fond extends MovableObject {
    speed;
    constructor( x, y, width, height, imagePath, speed) {
        super(x, y, width, height);
        this.loadImage(imagePath);
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