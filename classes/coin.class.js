class Coin extends MovableObject{
    COIN_IMAGES = [
        'images/4.Marks/1. Coins/1.png',
        'images/4.Marks/1. Coins/3.png',
        'images/4.Marks/1. Coins/4.png',
        'images/4.Marks/1. Coins/2.png',
    ];
    imagePath = 'images/4.Marks/1. Coins/1.png';
    width = 50;
    height = 50;

    /**
     * Creates a Coin object at specified coordinates.
     * @param {number} x - The x-coordinate of the Coin.
     * @param {number} y - The y-coordinate of the Coin.
     */
    constructor(x, y ){
        super().loadImage(this.imagePath);
        this.imageCache = {};
        this.loadImages(this.COIN_IMAGES);
        this.animateCoin();
        this.x = x;
        this.y = y;
    }


    /**
     * animate coin continously in the interval
     */
    animateCoin(){
        setInterval(()=>{
            this.playAnimation(this.COIN_IMAGES)
        }, 100);
    }
}