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

    /**
     * start the animate function after 200ms
     * set the jumHeight equal to the canvas height.
     */
    startSharkanimation(){
        setTimeout(()=>{ 
            this.animate();
            this.jumHeight = this.world.canvas.height;
        }, 200);
    }

    
    /**
     * handle Shark Movement base on Key value and if he is Sleeping, Hurt or Dead
     */
    animate() { 
        if(this.isDead()){
            this.playAnimation(this.IMAGE_DEAD_POISONED); 
            this.animateDeathToTop();
            this.sharkDead();
            this.world.sounds.shark_dead_sound.play();
            document.getElementById("gameOver").classList.remove("d-none");
            document.getElementById("gameOver").classList.add("d-flex");
        }else if(this.isHurt()){
            this.playAnimation(this.IMAGES_HURT_POISONED);
            this.changeSleepTime();
        }else if(this.isHurtElectric()){
            this.playAnimation(this.IMAGES_HURT_ELECTRIC_SHOCK);
            this.changeSleepTime();
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
            this.changeSleepTime();
            this.world.sounds.shark_bubble_sound.play();
        }else if(this.world.keyboard.F){
            this.playAnimation(this.ATTACK_POISONED_BUBBLE);
            this.throwBubble('poison');
            this.world.sounds.shark_poison_sound.play();
            this.changeSleepTime();
        }else if(this.slap){
            this.playAnimation(this.ATTACK_SLAP);
        }
        else{
            this.playAnimation(this.IMAGES_STAY);
            this.world.sounds.swim_sound.play();
        }
        
        this.world.sounds.swim_sound.play();
        this.sharkSlap()

    }


    /**
     * Handles the shark's death sequence by stopping the game after a delay.
     * Initiates a 4.5-second timeout before calling the stopGame function.
     */
    sharkDead(){
        setTimeout(()=>{
            this.world.stop();
            this.world.sounds.stopAllSounds();
        }, 4500);
    }


    /**
     * Starts an interval that checks if the shark should be vulnarable based on the time since its last hurt.
     * If the time elapsed exceeds the vulnarable delay, sets the `isVulnerable` property to true.
     *
     * @returns {void}
     */
    alreadyVulnerable(){
        setInterval(() => {
            if (Date.now() - this.lastHurt > this.isVulnerableDelay) {
                this.isVulnerable = true;
            }
        }, 1000 / 30);
    }


    /**
     * Moves the shark character to the right by increasing its x-coordinate.
     * Sets the direction to 'right' and updates the camera position.
     * Movement is restricted to within the lright boundary (this.x + this.width < this.world.worldWidth).
     */
    moveRight() {
        this.otherDirection = false;
        if (this.x + this.width < this.world.worldWidth) {
            this.x += this.speed;
            if (this.x > this.world.canvas.width / 2) {
                this.world.camera_x = -(this.x - this.world.canvas.width / 2);
            }
        }
    }


    /**
     * Moves the shark character to the right by increasing its x-coordinate.
     * Sets the direction to 'right' and updates the camera position.
     * Movement is restricted to within the lright boundary (this.x + this.width < this.world.worldWidth).
     */
    moveRight() {
        this.otherDirection = false;
        if (this.x + this.width < this.world.worldWidth) {
            this.x += this.speed;
            this.updateCamera();
        }
    }


    /**
     * Moves the shark character to the left by decreasing its x-coordinate.
     * Sets the direction to 'left' and updates the camera position.
     * Movement is restricted to within the left boundary (x > 0).
     */
    moveLeft() {
        this.otherDirection = true;
        if (this.x > 0) {
            this.x -= this.speed;
            this.updateCamera();
        }
    }


    /**
        * Updates the horizontal camera position so that it follows the player
        * while ensuring the camera does not move outside the world boundaries.
        *Algorithm:
        * - Centers the camera on the player's `x` position.
        * - Clamps the camera so it cannot scroll beyond the left or right edges of the world.
    */
    updateCamera() {
        const halfCanvas = this.world.canvas.width / 2;
        let cam = -this.x + halfCanvas;
        cam = Math.min(0, cam); 
        cam = Math.max(cam, -(this.world.worldWidth - this.world.canvas.width));
        this.world.camera_x = cam;
    }


    /**
     * Sets the shark's isSleeping status to false and updates the last Move timestamp.
     * Typically called when the shark is sleeping.
     */
    changeSleepTime(){
        this.lastMoveTime = Date.now();
        this.isSleeping = false;
    }


    /**
     * Sets the shark's vulnerability status to false and updates the last hurt timestamp.
     * Typically called when the shark becomes invulnerable after taking damage.
     */
    changeVulnerability(){
        this.lastHurt = Date.now();
        this.isVulnerable = false;
    }


    /**
     * Starts an interval that checks if the shark should be sleeping based on the time since its last movement.
     * If the time elapsed exceeds the sleep delay, sets the `isSleeping` property to true.
     *
     * @returns {void}
     */
    checkIfSleeping() {
        setInterval(() => {
            if (Date.now() - this.lastMoveTime > this.sleepDelay) {
                this.isSleeping = true;
            }
        }, 1000 / 30);
    }


    /**
     * Checks if the shark is moving left based on keyboard input.
     * If moving left, updates the shark's position and sleep time.
     * @returns {boolean|undefined} Returns true if the shark moves left, otherwise undefined.
     */
    isMovingLeft(){
        if (this.world.keyboard.LEFT) {
            this.moveLeft();
            this.changeSleepTime();
            return true;
        }
    }


    /**
     * Checks if the shark is moving right based on keyboard input.
     * If moving right, updates the shark's position and sleep time.
     * @returns {boolean|undefined} Returns true if the shark moves right, otherwise undefined.
     */
    isMovingRight(){
        if (this.world.keyboard.RIGHT) {
            this.moveRight();
            this.changeSleepTime();
            return true;
        }
    }


    /**
     * Checks if the shark is moving down based on keyboard input and canvas boundaries.
     * If moving down, updates the shark's position and sleep time.
     * @returns {boolean|undefined} Returns true if the shark moves down, otherwise undefined.
     */
    isMovingDown(){
        if (this.world.keyboard.DOWN && this.y + this.height - 60< this.world.canvas.height) {
            this.y += this.speed;
            this.changeSleepTime();
            return true;
        }
    }


    /**
     * Checks if the shark is moving Up based on keyboard input and canvas boundaries.
     * If moving Up, updates the shark's position and sleep time.
     * @returns {boolean|undefined} Returns true if the shark moves Up, otherwise undefined.
     */
    isMovingUp(){
        if (this.world.keyboard.UP && this.y > -110) {
            this.y -= this.speed;
            this.changeSleepTime();
            return true;
        }
    }


    /**
     * set Slap at true for 1500 after that it become false.
     */
    sharkSlap(){
        if (this.world.keyboard.SPACE && this.slapReady && !this.slap) {
            this.slap = true;
            this.world.sounds.shark_slap_sound.play();
            this.playAnimation(this.ATTACK_SLAP);
            this.slapStartTime = Date.now();
        }
        if (this.slap && Date.now() - this.slapStartTime > 500) {
            this.slap = false;
        }
    }


    /**
     * throw a bubble
     * @param {string} type type of the bubble (normal or poison)
     * @returns null
     */
    throwBubble(type){
        if (this.world.bubbles.length >= 20) return;
        let bubbleX = this.otherDirection ? this.x - 20 : this.x + this.width;
        let bubbleY = this.y + this.height / 2;
        if(type ==='poison' && this.world.collectedPoisons > 0){
            this.setPoisonBubble(bubbleX, bubbleY, type);
        }
        else{
           this.setNormalBubble(bubbleX, bubbleY, type)
        }
    }  


    /**
     * create poison bubble
     * @param {number} bubbleX the x value of the bubble
     * @param {*number} bubbleY  the y value of the bubble
     * @param {*string} type type of the bubble (normal or poison)
     */
    setPoisonBubble(bubbleX, bubbleY, type){
         if(this.poisonBubblesThrown < 10){
            let bubble = new ThrowableObject(bubbleX, bubbleY, type);
            bubble.otherDirection = this.otherDirection;
            this.world.bubbles.push(bubble);
            this.poisonBubblesThrown++;
            this.world.collectedPoisons = Math.max(0, this.world.collectedPoisons - 1);
            this.world.poison_mark.setPercentagePoison(this.world.collectedPoisons);
        }
    }


    /**
     * create normal bubble
     * @param {number} bubbleX the x value of the bubble
     * @param {*number} bubbleY  the y value of the bubble
     * @param {*string} type type of the bubble (normal or poison)
     */
    setNormalBubble(bubbleX, bubbleY, type){
        if(this.normalBubblesThrown < (20 - this.world.collectedPoisons) && this.normalBubblesThrown < 10){
            let bubble = new ThrowableObject(bubbleX, bubbleY, type);
            bubble.otherDirection = this.otherDirection;
            this.world.bubbles.push(bubble);
            this.normalBubblesThrown++;
        }
    }

}




