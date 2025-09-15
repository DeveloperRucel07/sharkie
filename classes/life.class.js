class Life extends MovableObject{
    LIFE_IMAGES = [
        '../images/4.Marks/Hearts/green_heart_0.png',
        '../images/4.Marks/Hearts/green_heart_2.png',
        '../images/4.Marks/Hearts/green_heart_1.png',
        '../images/4.Marks/Hearts/green_heart_3.png',
    ];
    imagePath = '../images/4.Marks/Hearts/green_heart_1.png';
    constructor(x, y, width, height, LIFE_IMAGES ){
        super(x, y, width, height);
        this.type = type; 
        this.imageCache = {};
        this.LIFE_IMAGES = LIFE_IMAGES;
        this.loadImage(this.imagePath);
        this.loadImages(this.LIFE_IMAGES);
        this.animateLife();
    }

    animateLife(){
        setInterval(()=>{
            this.playAnimation(this.LIFE_IMAGES)
        }, 1000);
    }
}