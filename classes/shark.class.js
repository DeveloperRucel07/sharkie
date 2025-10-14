class Shark extends MovableObject {

    IMAGES_STAY =     
        Array.from({ length: 18 }, (_, i) =>
            `images/1.Sharkie/Stay/${i+1}.png`,
    );

    IMAGES_LONGSTAY = 
        Array.from({ length: 10 }, (_, i) =>
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
    offset = {top:120, bottom:50, left:50, right:50}
    lastMoveTime = 0;
    poisonBubblesThrown = 0;
    normalBubblesThrown = 0;
    slapReady = true;
    deadSoundAlreadyPlayed = false;
    animated;
    isVulnerable = true;
    isVulnerableDelay = 2000;
    canThrowNormalBubble = true;
    canThrowPoisonBubble = true;
    lastBubbleThrowTime = 0;
    bubbleThrowCooldown = 2000;
    speed = 15;
    isSleeping = false;
    sleepDelay = 5000;

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
        this.lastHurt = Date.now();
        this.lastMoveTime = Date.now();
        this.worldWidth = this.worldWidth;
        this.startSharkanimation();
        this.checkIfSleeping();
        this.alreadyVulnerable(); 
        this.eventlistenerForBubbles();
    }

    /**
     * Adds event listeners for bubble throwing actions.
     * Listens for 'D' key to throw normal bubbles and 'F' key to throw poison bubbles.
     * Sets corresponding flags and updates sleep timer when keys are released.
     */
    eventlistenerForBubbles(){
        window.addEventListener("keyup", (e) => {
            if (e.code === "KeyD") {
                this.canThrowNormalBubble = true;
                this.changeSleepTime();
            }
            if (e.code === "KeyF") {
                this.canThrowPoisonBubble = true;
                this.changeSleepTime();
            }
        });
    }

    /**
     * start the animate function after 200ms
     * set the jumHeight equal to the canvas height.
     */
    startSharkanimation(){
        this.animated = setTimeout(()=>{ 
            this.animate();
            this.jumHeight = this.world.canvas.height;
        }, 200);
    }

    /**
     * handle Shark Movement base on Key value and if he is Sleeping, Hurt or Dead
     */
    animate() {
        if(this.isDead()){
            this.sharkDead();
            this.stopAfterDeath();
        }else if(this.isHurt()){
            this.playAnimation(this.IMAGES_HURT_POISONED);
            this.changeSleepTime();
        }else if(this.isHurtElectric()){
            this.playAnimation(this.IMAGES_HURT_ELECTRIC_SHOCK);
            this.changeSleepTime();
        }else{
            this.sharkMovement();
        }
        this.sharkSlap();
    }

    /**
     * Handles actions when the shark is alive and not hurt or dead.
     */
    sharkMovement() {
        let isMoving = false;
        if(this.multipleMove(isMoving)){
            this.playAnimation(this.IMAGES_SWIM);
        }else if(this.isSleeping){
            this.playAnimation(this.IMAGES_LONGSTAY);
            this.world.sounds.shark_sleeping_sound.play();
        }else if(this.world.keyboard.D){
            this.throwBubbleNormal();
        }else if(this.world.keyboard.F){
            this.throwBubblePoison();
        }else if(this.slap){
            this.playAnimation(this.ATTACK_SLAP);
        }else{
            this.playAnimation(this.IMAGES_STAY);
            this.world.sounds.swim_sound.play();
        }
    }

    /** check if the shark is moving in any direction
     * if he is moving in any direction set isMoving to true
     * @returns {boolean} true or false
     */
    multipleMove(isMoving){
        if(this.isMovingRight()) isMoving = true;
        if(this.isMovingLeft()) isMoving = true;
        if(this.isMovingUp()) isMoving = true;
        if(this.isMovingDown()) isMoving = true;
        return isMoving;
    }

    /**     * Handles the shark's death sequence by stopping the game after a delay.
     * Initiates a 3.5-second timeout before calling the stopGame function.
     */
    stopAfterDeath(){
        closeButtonsWinLose(); 
        setTimeout(()=>{
            this.world.stop();
            if(this.world.endboss.isDead()){
                this.showReplayButton();
            }else{
                this.showReplayButton();
            }
        }, 3000)
    }


    /**
     * Handles the shark's death sequence by stopping the game after a delay.
     * Initiates a 4.5-second timeout before calling the stopGame function.
     */
    sharkDead(){
        this.playAnimation(this.IMAGE_DEAD_POISONED);
        this.animateDeathToTop();
        if(!this.deadSoundAlreadyPlayed){
            this.world.sounds.shark_dead_sound.play();
            this.world.sounds.game_over_sound.play();
            this.deadSoundAlreadyPlayed = true;
        }
        
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
            this.sharkMoveLeft();
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
            this.sharkMoveRight();
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
     * throw a bubble by type (normal or poison)
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
         if(this.poisonBubblesThrown <= 10){
            let bubble = new ThrowableObject(bubbleX, bubbleY, type);
            bubble.otherDirection = this.otherDirection;
            this.world.bubbles.push(bubble);
            this.poisonBubblesThrown++;
            this.world.collectedPoisons = Math.max(0, this.world.collectedPoisons - 1);
            this.world.poison_mark.setPercentage(this.world.collectedPoisons);
        }else{
            showBubbles();
        }
    }

    /**
     * create normal bubble
     * @param {number} bubbleX the x value of the bubble
     * @param {*number} bubbleY  the y value of the bubble
     * @param {*string} type type of the bubble (normal or poison)
     */
    setNormalBubble(bubbleX, bubbleY, type){
        if(this.normalBubblesThrown < (30 - this.poisonBubblesThrown) && this.normalBubblesThrown <= 20){
            let bubble = new ThrowableObject(bubbleX, bubbleY, type);
            bubble.otherDirection = this.otherDirection;
            this.world.bubbles.push(bubble);
            this.normalBubblesThrown++;
        }
    }

    /** * Throws a poison bubble if conditions are met (cooldown and availability).
     * Plays the corresponding sound and updates the sleep timer.
     */
    throwBubblePoison(){
        if(this.world.collectedPoisons > 0 && this.canThrowPoisonBubble && (Date.now() - this.lastBubbleThrowTime > this.bubbleThrowCooldown)){
            this.playAnimation(this.ATTACK_POISONED_BUBBLE);
            this.throwBubble('poison');
            this.canThrowPoisonBubble = false;
            this.lastBubbleThrowTime = Date.now();
            this.world.sounds.shark_poison_sound.play();
            this.changeSleepTime();
        }
    }

    /** * Throws a normal bubble if conditions are met (cooldown and availability).
     * Plays the corresponding sound and updates the sleep timer.
     */
    throwBubbleNormal(){
        if(this.canThrowNormalBubble && (Date.now() - this.lastBubbleThrowTime > this.bubbleThrowCooldown)){
            this.playAnimation(this.ATTACK_BUBBLE);
            this.throwBubble('normal');
            this.canThrowNormalBubble = false;
            this.lastBubbleThrowTime = Date.now();
            this.world.sounds.shark_bubble_sound.play();
            this.changeSleepTime();
        }
    }
}