class Coin extends MovableObject{
    COIN_IMAGES = [
        '../images/4.Marks/1. Coins/1.png',
        '../images/4.Marks/1. Coins/3.png',
        '../images/4.Marks/1. Coins/4.png',
        '../images/4.Marks/1. Coins/2.png',
    ];
    imagePath = '../images/4.Marks/1. Coins/1.png';
    constructor(x, y, width, height, COIN_IMAGES ){
        super(x, y, width, height);
        this.type = type; 
        this.imageCache = {};
        this.COIN_IMAGES = COIN_IMAGES;
        this.loadImage(this.imagePath);
        this.loadImages(this.COIN_IMAGES);
        this.animateCoin();
    }

    animateCoin(){
        setInterval(()=>{
            this.playAnimation(this.COIN_IMAGES)
        }, 1000);
    }
}