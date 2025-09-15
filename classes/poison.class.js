class Poison extends MovableObject{
    POISON_IMAGES = [
        '../images/4.Marks/Posión/Animada/1.png',
        '../images/4.Marks/Posión/Animada/2.png',
        '../images/4.Marks/Posión/Animada/6.png',
        '../images/4.Marks/Posión/Animada/3.png',
        '../images/4.Marks/Posión/Animada/4.png',
        '../images/4.Marks/Posión/Animada/7.png',
        '../images/4.Marks/Posión/Animada/5.png',
        '../images/4.Marks/Posión/Animada/8.png',
    ]
    imagePath = '../images/4.Marks/Posión/Animada/1.png';
    constructor(x, y, width, height, POISON_IMAGES ){
        super(x, y, width, height);
        this.type = type; 
        this.imageCache = {};
        this.POISON_IMAGES = POISON_IMAGES;
        this.loadImage(this.imagePath);
        this.loadImages(this.POISON_IMAGES);
        this.animatePoison();
        this.y = 550;
    }

    animatePoison(){
        setInterval(()=>{
            this.playAnimation(this.POISON_IMAGES)
        }, 1000);
    }
}