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
        this.moveUP();
        this.moveDOWN();
        this.moveLEFT();
        this.moveRIGHT();
        this.speed = 0.15 + Math.random() * 0.3;
    }


    animate(){
        
        setInterval(() => {
            if ( this.world.keyboard.RIGHT && this.x < 700) {
                this.otherDirection = false;
                this.playAnimation(this.IMAGES_SWIM);
                this.moveRIGHT();
            }else if ( this.world.keyboard.LEFT && this.x > -75) {
                this.otherDirection = true;
                this.playAnimation(this.IMAGES_SWIM);
                this.moveLEFT();
            }else if ( this.world.keyboard.UP && this.y > -120) {
                this.playAnimation(this.IMAGES_SWIM);
                this.moveUP();
            }
            else if ( this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height + 100) {
                this.playAnimation(this.IMAGES_SWIM);
                this.moveDOWN();
            }

        }, 1000 / 60);
    }

    moveUP(){ 
        setInterval(() => {
            if (this.world.keyboard.UP && this.y > -120) {
                this.y -= 0.01;
            }
        }, 1000 / 60);  
    }

    moveDOWN(){ 
        setInterval(() => {
            if (this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height + 100) {
                this.y += 0.01;
            }
        }, 1000 / 60);  
    }

    moveLEFT(){
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > -75) {
                this.x -= 0.01;
            }
        }, 1000 / 60);
    }

    moveRIGHT(){
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.canvas.width - this.width + 100) {
                this.x += 0.01;
            }
        }, 1000 / 60);
    }
}

