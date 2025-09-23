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
    energy = 100;

    offset = {
        top:0,
        bottom:0,
        left:0,
        right:0
    }

    lastHit = 0;
    lastChock= 0;

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
        if(this.x + this.width>= this.max_x_fishes){
            this.x = this.max_x_fishes - this.width;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
    }

    moveRight() {
        this.otherDirection = true;
        this.x += this.speed;
        if (this.x + this.width >= this.max_x_fishes) {
            this.x = this.max_x_fishes - this.width;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
        if(this.x <= 0){
            this.x = 0;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
    }

    isColliding(moObject) {
        return (
            this.x + this.offset.left < moObject.x + moObject.width - moObject.offset.right && 
            this.x + this.width - this.offset.right > moObject.x + moObject.offset.left &&   
            this.y + this.offset.top < moObject.y + moObject.height - moObject.offset.bottom && 
            this.y + this.height - this.offset.bottom > moObject.y + moObject.offset.top     
        );
    }


    hit(){
        this.energy -= 2;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit  = new Date().getTime();
        }
    }

    electro(){
        this.energy -= 4;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastChock  = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isHurtElectric(){
        let timepassed = new Date().getTime() - this.lastChock;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead(){
        return this.energy == 0;
    }


}