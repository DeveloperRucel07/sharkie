class Shark extends MovableObject {

    IMAGES_STAY =     
        Array.from({ length: 18 }, (_, i) =>
            `../images/1.Sharkie/Stay/${i+1}.png`,
    );

    IMAGES_LONGSTAY = 
        Array.from({ length: 14 }, (_, i) =>
            `../images/1.Sharkie/LongStay/i${i+1}.png`,
    );

    IMAGES_SWIM = 
        Array.from({ length: 6 }, (_, i) =>
            `../images/1.Sharkie/Swim/${i+1}.png`,
    );

    IMAGES_HURT_POISONED = 
        Array.from({ length: 5 }, (_, i) =>
            `../images/1.Sharkie/Hurt/1.Poisoned/${i+1}.png`,
    );

    IMAGES_HURT_ELECTRIC_SHOCK = [ 
        'images/1.Sharkie/Hurt/2.Electric shock/01.png',
        'images/1.Sharkie/Hurt/2.Electric shock/02.png',
        ...Array.from({ length: 3 }, (_, i) =>
            `../images/1.Sharkie/Hurt/2.Electric shock/${i+1}.png`,
        ),
    ]
    IMAGE_DEAD_POISONED = 
        Array.from({ length: 12 }, (_, i) =>
            `../images/1.Sharkie/Dead/1.Poisoned/${i+1}.png`,
    );
    
    IMAGES_DEAD_ELECTRIC_SHOCK = 
        Array.from({ length: 10 }, (_, i) =>
            `../images/1.Sharkie/Dead/2.Electro_shock/${i+1}.png`,
    );

    ATTACK_BUBBLE = 
        Array.from({ length: 8 }, (_, i) =>
            `../images/1.Sharkie/Attack/Bubble trap/op1 (with bubble formation)/${i+1}.png`,
    );

    ATTACK_POISONED_BUBBLE=
        Array.from({ length: 8 }, (_, i) =>
            `../images/1.Sharkie/Attack/Bubble trap/For Whale/${i+1}.png`,
    );

    ATTACK_SLAP =
        Array.from({ length: 8 }, (_, i) =>
            `../images/1.Sharkie/Attack/Fin slap/${i+1}.png`,
    );

    world;
    x= 0;
    y = 400;
    width = 250;
    height = 250;
    energy = 100000000;
    offset = {
        top:150,
        bottom:70,
        left:50,
        right:50
    }


    constructor(imagePath) {
        super().loadImage(imagePath);
        this.imageCache = {};
        this.loadImages(this.IMAGES_STAY);
        this.loadImages(this.IMAGES_LONGSTAY);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_ELECTRIC_SHOCK);
        this.loadImages(this.IMAGE_DEAD_POISONED);
        this.loadImages(this.IMAGES_DEAD_ELECTRIC_SHOCK);
        this.loadImages(this.ATTACK_POISONED_BUBBLE);
        this.loadImages(this.ATTACK_BUBBLE);
        this.loadImages(this.ATTACK_SLAP);
        this.jumHeight = 600;
        this.animate();
        this.y = 600 - this.height;
        this.speed = 0.15;
        this.worldWidth = this.worldWidth;
    }


    animate() {
        // this.playAnimation(this.IMAGES_STAY);
        if(this.isDead()){
            this.playAnimation(this.IMAGE_DEAD_POISONED); 
        }else if(this.hit()){
            this.playAnimation(this.IMAGES_HURT_POISONED);
        }else{ 
            setTimeout(()=>{
                this.playAnimation(this.IMAGES_LONGSTAY); 
            },5000);

            setInterval(() => {
                this.moveLeftOrRight();
                this.moveUpDown();
            }, 1000);
        }
        
    }


    moveLeftOrRight() {
        if (this.world.keyboard.RIGHT) {
            this.playAnimation(this.IMAGES_SWIM);
            this.moveRight();
        } else if (this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_SWIM);
            this.moveLeft();
        }
    }

    moveUpDown() {
        if (this.world.keyboard.UP && this.y > -110) {
            this.y -= this.speed;
        }
        if (this.world.keyboard.DOWN && this.y < this.jumHeight - this.height/1.5) {
            this.y += this.speed;
        }
    }

    moveRight() {
        this.otherDirection = false;
        this.worldWidth = this.world.worldWidth;
        if (this.x < (this.world.canvas.width - this.width*2) ) {
            this.x += this.speed;
        } else {
            const maxCameraX = this.worldWidth - this.world.canvas.width;
            this.world.camera_x = Math.max(
                Math.min(this.world.camera_x - this.speed, 0),
                -maxCameraX                                   
            );
        }
    }

    moveLeft() {
        this.otherDirection = true;
        if (this.x > 0 && this.world.camera_x === 0){
            this.x -= this.speed;
        }
        else if (this.x > this.world.canvas.width / 4) {
            this.x -= this.speed;
        } else {
            this.world.camera_x = Math.min(this.world.camera_x + this.speed, 0);
        }
        this.x = Math.max(this.x, 0);
    }

}

