class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 250;
    height = 100;
    width = 100;
    otherDirection = false;
    speed = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => { this.imgLoaded = true;}; //set load imLoaded on true when the image ist loaded
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.onload = () => { this.imgLoaded = true;};
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    draw(ctx) {
        if(!this.otherDirection){ 
            if (this.imgLoaded) { 
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }else{
                console.error("Image not loaded yet: " + this.img.src);
            }
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            if (this.imgLoaded) {
                ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
            }else{
                console.error("Image not loaded yet: " + this.img.src);
            }
            ctx.restore();
        } 
    }
}