class MovableObject extends DrawableObject{
    x;
    y;
    width;
    height;
    image;
    imageCache = {};
    currentImage = 0;
    speed = 0;
    otherDirection = false;

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }



    moveLeft() {
        this.x -= this.speed;
        if (this.x <= 0) {
            this.x = 0;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
    }

    moveRight() {
        this.otherDirection = true;
        this.x += this.speed;
        if (this.x + this.width >= 900) {
            this.x = 900 - this.width;
            this.speed *= -1;
            this.otherDirection = false; 
        }
    }
  
}