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
    slap = false;
    offset = {
        top:120,
        bottom:50,
        left:50,
        right:50
    }
    lastMoveTime = 0;
    poisonBubblesThrown = 0;
    normalBubblesThrown = 0;
    slapReady = true;



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
        this.speed = 10;
        this.isSleeping = false;
        this.sleepDelay = 5000;
        this.lastHurt = Date.now();
        this.lastMoveTime = Date.now();
        this.isVulnerable = true;
        this.isVulnerableDelay = 2000;
        this.worldWidth = this.worldWidth;
        this.startSharkanimation();
        this.checkIfSleeping();
        this.alreadyVulnerable(); 
    }


    startSharkanimation(){
        setTimeout(()=>{ 
            this.animate();
            this.jumHeight = this.world.canvas.height;
        }, 200);
    }


    animate() { 
        if(this.isDead()){
            this.playAnimation(this.IMAGE_DEAD_POISONED); 
            this.animateDeathToTop();
            this.sharkDead();
            this.world.sounds.shark_dead_sound.play();
            document.getElementById("tryAgain").classList.remove("d-none");
            document.getElementById("tryAgain").classList.add("d-flex");
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
            this.world.sounds.shark_sleeping_sound.play();
        }else if(this.world.keyboard.D){
            this.playAnimation(this.ATTACK_BUBBLE);
            this.throwBubble('normal');
            this.world.sounds.shark_bubble_sound.play();
        }else if(this.world.keyboard.F){
            this.playAnimation(this.ATTACK_POISONED_BUBBLE);
            this.throwBubble('poison');
            this.world.sounds.shark_poison_sound.play();
        }
        else{
            this.playAnimation(this.IMAGES_STAY);
            this.world.sounds.water_sound.play();
        }

        this.sharkSlap()

    }


    sharkDead(){
        setTimeout(()=>{
            stopGame();
        }, 4500);
    }


    alreadyVulnerable(){
        setInterval(() => {
            if (Date.now() - this.lastHurt > this.isVulnerableDelay) {
                this.isVulnerable = true;
            }
        }, 1000 / 30);
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


    changeVulnerability(){
        this.lastHurt = Date.now();
        this.isVulnerable = false;
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
        if (this.world.keyboard.DOWN && this.y < this.jumHeight - this.height + 60) {
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

    sharkSlap(){
        if (this.world.keyboard.SPACE && this.slapReady && !this.slap) {
            this.slap = true;
            this.world.sounds.shark_slap_sound.play();
            this.playAnimation(this.ATTACK_SLAP);
            this.slapStartTime = Date.now();
        }
        if (!this.world.keyboard.SPACE) {
            this.slapReady = true;
        }
        if (this.slap && Date.now() - this.slapStartTime > 1000) {
            this.slap = false;
        }
    }


    throwBubble(type){
        if (this.world.bubbles.length >= 30) return;
        let bubbleX = this.otherDirection ? this.x - 20 : this.x + this.width;
        let bubbleY = this.y + this.height / 2;
        if(type ==='poison' && this.world.collectedPoisons > 0){
            if(this.poisonBubblesThrown < 10){
                let bubble = new ThrowableObject(bubbleX, bubbleY, type);
                bubble.otherDirection = this.otherDirection;
                this.world.bubbles.push(bubble);
                this.poisonBubblesThrown++;
                this.world.collectedPoisons = Math.max(0, this.world.collectedPoisons - 1);
                this.world.poison_mark.setPercentagePoison(this.world.collectedPoisons);
            }
        }
        else{
            if(this.normalBubblesThrown < (30 - this.world.collectedPoisons) && this.normalBubblesThrown < 10){
                let bubble = new ThrowableObject(bubbleX, bubbleY, type);
                bubble.otherDirection = this.otherDirection;
                this.world.bubbles.push(bubble);
                this.normalBubblesThrown++;
            }
        }
    }  

}




