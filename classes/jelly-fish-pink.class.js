class JellyFishPink extends MovableObject{
    width = 90;
    height = 90;
   
    IMAGES = [
        '../images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        '../images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        '../images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        '../images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
    ];

    imagePath = '../images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png';
    constructor(x){
        super().loadImage(this.imagePath);
        this.loadImages(this.IMAGES);
        this.y = this.y = 600 - this.height;
        this.x = x;
        this.speed = 0.01 + Math.random() * 0.3;
        this.jumHeight = 600;
        this.animate();
    }


    animate(){

        this.playAnimation(this.IMAGES);
        this.moveUpDown();
    }


    moveUpDown(){
        setInterval(() => {
            this.y -= this.speed;
            if (this.y <= 0 || this.y <= -this.jumHeight) {
                this.speed *= -1;
            }else if (this.y >= this.jumHeight) {
                this.speed *= -1;
            }
        }, 1000);
    }

}