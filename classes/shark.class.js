class Shark extends MovableObject {
    IMAGES_SWIM = [
            '../images/1.Sharkie/Swim/1.png',
            '../images/1.Sharkie/Swim/2.png',
            '../images/1.Sharkie/Swim/3.png',
            '../images/1.Sharkie/Swim/4.png',
            '../images/1.Sharkie/Swim/5.png',
            '../images/1.Sharkie/Swim/6.png',
        ];
    world;
    x= 0;
    y = 400;
    width = 250;
    height = 250;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.imageCache = {};
        this.loadImages(this.IMAGES_SWIM);
        this.jumHeight = 600;
        this.animate();
        this.y = 600 - this.height;
        this.speed = 0.15;
        this.worldWidth = this.worldWidth;
    }


    animate() {
        setInterval(() => {
            this.moveLeftOrRight();
            this.moveUpDown();
        }, 100);
    }

    moveLeftOrRight() {
        if (this.world.keyboard.RIGHT) {
            this.playAnimation(this.IMAGES_SWIM);
            this.moveRight();
        } else if (this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_SWIM);
            this.moveLeft();
        }
    }

    moveUpDown() {
        if (this.world.keyboard.UP && this.y > -110) {
            this.y -= this.speed;
        }
        if (this.world.keyboard.DOWN && this.y < this.jumHeight - this.height/1.5) {
            this.y += this.speed;
        }
    }

    moveRight() {
        this.otherDirection = false;
        this.worldWidth = this.world.worldWidth;
        if (this.x < (this.world.canvas.width - this.width*2) ) {
            this.x += this.speed;
        } else {
            const maxCameraX = this.worldWidth - this.world.canvas.width;
            this.world.camera_x = Math.max(
                Math.min(this.world.camera_x - this.speed, 0),
                -maxCameraX                                   
            );
        }
    }

    moveLeft() {
        this.otherDirection = true;
        if (this.x > 0 && this.world.camera_x === 0){
            this.x -= this.speed;
        }
        else if (this.x > this.world.canvas.width / 4) {
            this.x -= this.speed;
        } else {
            this.world.camera_x = Math.min(this.world.camera_x + this.speed, 0);
        }
        this.x = Math.max(this.x, 0);
    }

}

