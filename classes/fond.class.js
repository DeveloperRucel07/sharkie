class Fond extends MovableObject {
    speed;
    constructor( x, y, width, height, imagePath, speed) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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