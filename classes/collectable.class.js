class Collectable extends MovableObject{
    type;
    COLLECTABLE_IMGS = [];
    imagePath = '../images/4.Marks/1. Coins/1.png';
    constructor(x, y, width, height, COLLECTABLE_IMGS, type ){
        super(x, y, width, height);
        this.type = type; // "coin", "life", "poison"
        this.imageCache = {};
        this.COLLECTABLE_IMGS = COLLECTABLE_IMGS;
        this.loadImage(this.imagePath);
        this.loadImages(this.COLLECTABLE_IMGS);
        this.animateCollectable();


        if(this.type ==="poison"){
            this.y = 550;
        }
    }

     animateCollectable(){
        setInterval(()=>{
            let i = this.currentImage % this.COLLECTABLE_IMGS.length;
            let path = this.COLLECTABLE_IMGS[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000);
    }
}