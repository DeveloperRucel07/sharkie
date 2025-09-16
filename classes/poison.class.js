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
    width = 50;
    height = 50;
    constructor(x){
        super().loadImage(this.imagePath);
        this.imageCache = {};
        this.loadImages(this.POISON_IMAGES);
        this.animatePoison();
        this.x = x;
        this.y = 550;
    }

    animatePoison(){
        setInterval(()=>{
            this.playAnimation(this.POISON_IMAGES)
        }, 100);
    }
}