class Life extends MovableObject{
    LIFE_IMAGES = [
        'images/4.Marks/Hearts/green_heart_0.png',
        'images/4.Marks/Hearts/green_heart_2.png',
        'images/4.Marks/Hearts/green_heart_1.png',
        'images/4.Marks/Hearts/green_heart_3.png',
    ];
    imagePath = 'images/4.Marks/Hearts/green_heart_1.png';
    width = 50;
    height = 50;
    constructor(x, y){
        super().loadImage(this.imagePath);
        this.imageCache = {};
        this.loadImages(this.LIFE_IMAGES);
        this.animateLife();
        this.x = x;
        this.y = y;
    }

    animateLife(){
        setInterval(()=>{
            this.playAnimation(this.LIFE_IMAGES)
        }, 1000);
    }
}