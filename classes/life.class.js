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

    /**
     * Creates a Coin object at specified coordinates.
     * @param {number} x - The x-coordinate of the Coin.
     * @param {number} y - The y-coordinate of the Coin.
     */
    constructor(x, y){
        super().loadImage(this.imagePath);
        this.imageCache = {};
        this.loadImages(this.LIFE_IMAGES);
        this.animateLife();
        this.x = x;
        this.y = y;
    }


    /**
     * animate life continously in the interval
     */
    animateLife(){
        setInterval(()=>{
            this.playAnimation(this.LIFE_IMAGES)
        }, 1000);
    }
}