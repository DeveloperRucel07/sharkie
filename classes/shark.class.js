class Shark extends MovableObject {

    IMAGES_STAY =     
        Array.from({ length: 18 }, (_, i) =>
            `images/1.Sharkie/Stay/${i+1}.png`,
    );

    IMAGES_LONGSTAY = 
        Array.from({ length: 14 }, (_, i) =>
            `images/1.Sharkie/LongStay/I${i+1}.png`,
    );

    IMAGES_SWIM = 
        Array.from({ length: 6 }, (_, i) =>
            `images/1.Sharkie/Swim/${i+1}.png`,
    );

    IMAGES_HURT_POISONED = 
        Array.from({ length: 5 }, (_, i) =>
            `images/1.Sharkie/Hurt/1.Poisoned/${i+1}.png`,
    );

    IMAGES_HURT_ELECTRIC_SHOCK = [ 
        'images/1.Sharkie/Hurt/2.Electric shock/01.png',
        'images/1.Sharkie/Hurt/2.Electric shock/02.png',
        ...Array.from({ length: 3 }, (_, i) =>
            `images/1.Sharkie/Hurt/2.Electric shock/${i+1}.png`,
        ),
    ]
    IMAGE_DEAD_POISONED = 
        Array.from({ length: 12 }, (_, i) =>
            `images/1.Sharkie/Dead/1.Poisoned/${i+1}.png`,
    );
    
    IMAGES_DEAD_ELECTRIC_SHOCK = 
        Array.from({ length: 10 }, (_, i) =>
            `images/1.Sharkie/Dead/2.Electro_shock/${i+1}.png`,
    );

    ATTACK_BUBBLE = 
        Array.from({ length: 8 }, (_, i) =>
            `images/1.Sharkie/Attack/Bubble trap/op1 (with bubble formation)/${i+1}.png`,
    );

    ATTACK_POISONED_BUBBLE=
        Array.from({ length: 8 }, (_, i) =>
            `images/1.Sharkie/Attack/Bubble trap/For Whale/${i+1}.png`,
    );

    ATTACK_SLAP =
        Array.from({ length: 8 }, (_, i) =>
            `images/1.Sharkie/Attack/Fin slap/${i+1}.png`,
    );

    world;
    x= 0;
    y = 400;
    width = 250;
    height = 250;
    energy = 100;
    offset = {
        top:120,
        bottom:50,
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
        this.y = 600 - this.height;
        this.speed = 5;
        this.isSleeping = false;
        this.lastMoveTime = Date.now();
        this.sleepDelay = 5000;
        this.worldWidth = this.worldWidth;
        setTimeout(()=>{ this.animate();}, 200);
        this.checkIfSleeping();
    }


    animate() { 
        if(this.isDead()){
            document.getElementById("tryAgain").classList.remove("d-none");
            document.getElementById("tryAgain").classList.add("d-flex");
            this.playAnimation(this.IMAGE_DEAD_POISONED); 
        }else if(this.isHurt()){
            this.playAnimation(this.IMAGES_HURT_POISONED);
        }else if(this.isHurtElectric()){
            this.playAnimation(this.IMAGES_HURT_ELECTRIC_SHOCK);
        }else if(this.isMovingRight()){
            this.playAnimation(this.IMAGES_SWIM); 
        }else if(this.isMovingLeft()){
            this.playAnimation(this.IMAGES_SWIM); 
        }else if(this.isMovingUp()){
            this.playAnimation(this.IMAGES_SWIM); 
        }else if(this.isMovingDown()){
            this.playAnimation(this.IMAGES_SWIM); 
        }else if(this.isSleeping){
            this.playAnimation(this.IMAGES_LONGSTAY); 
        }else{
            this.playAnimation(this.IMAGES_STAY); 
        }
 
    }

    moveRight() {
        this.otherDirection = false;
        if (this.x + this.width < this.world.worldWidth) {
            this.x += this.speed;
            if (this.x > this.world.canvas.width / 2) {
                this.world.camera_x = -(this.x - this.world.canvas.width / 2);
            }
        }
    }

    moveRight() {
        this.otherDirection = false;
        if (this.x + this.width < this.world.worldWidth) {
            this.x += this.speed;
            this.updateCamera();
        }
    }

    moveLeft() {
        this.otherDirection = true;
        if (this.x > 0) {
            this.x -= this.speed;
            this.updateCamera();
        }
    }

    updateCamera() {
        const halfCanvas = this.world.canvas.width / 2;
        let cam = -this.x + halfCanvas;
        cam = Math.min(0, cam); 
        cam = Math.max(cam, -(this.world.worldWidth - this.world.canvas.width));
        this.world.camera_x = cam;
    }

    changeSleepTime(){
        this.lastMoveTime = Date.now();
        this.isSleeping = false;
    }

    checkIfSleeping() {
        setInterval(() => {
            if (Date.now() - this.lastMoveTime > this.sleepDelay) {
                this.isSleeping = true;
            }
        }, 1000 / 30);
    }


    isMovingLeft(){
        if (this.world.keyboard.LEFT) {
            this.moveLeft();
            this.changeSleepTime();
            return true;
        }
    }

    isMovingRight(){
        if (this.world.keyboard.RIGHT) {
            this.moveRight();
            this.changeSleepTime();
            return true;
        }
    }

    isMovingDown(){
        if (this.world.keyboard.DOWN && this.y < this.jumHeight - this.height/1.5) {
            this.y += this.speed;
            this.changeSleepTime();
            return true;
        }
    }

    isMovingUp(){
        if (this.world.keyboard.UP && this.y > -110) {
            this.y -= this.speed;
            this.changeSleepTime();
            return true;
        }
    }

}




