class Endboss extends MovableObject{
    IMAGES_COME = [
        '',
        'images/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'images/2.Enemy/3 Final Enemy/1.Introduce/10.png',
        
    ];

    IMAGES_SWIM = [
        'images/2.Enemy/3 Final Enemy/2.floating/1.png',
        'images/2.Enemy/3 Final Enemy/2.floating/2.png',
        'images/2.Enemy/3 Final Enemy/2.floating/3.png',
        'images/2.Enemy/3 Final Enemy/2.floating/4.png',
        'images/2.Enemy/3 Final Enemy/2.floating/5.png',
        'images/2.Enemy/3 Final Enemy/2.floating/6.png',
        'images/2.Enemy/3 Final Enemy/2.floating/7.png',
        'images/2.Enemy/3 Final Enemy/2.floating/8.png',
        'images/2.Enemy/3 Final Enemy/2.floating/9.png',
        'images/2.Enemy/3 Final Enemy/2.floating/10.png',
        'images/2.Enemy/3 Final Enemy/2.floating/11.png',
        'images/2.Enemy/3 Final Enemy/2.floating/12.png',
        'images/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_HURT = [
        'images/2.Enemy/3 Final Enemy/Hurt/1.png',
        'images/2.Enemy/3 Final Enemy/Hurt/3.png',
        'images/2.Enemy/3 Final Enemy/Hurt/4.png',
        'images/2.Enemy/3 Final Enemy/Hurt/2.png'
    ];

    IMAGES_DEAD = [
        'images/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
        'images/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'images/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'images/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'images/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'images/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ];

    IMAGES_ATTACK = [
        'images/2.Enemy/3 Final Enemy/Attack/1.png',
        'images/2.Enemy/3 Final Enemy/Attack/2.png',
        'images/2.Enemy/3 Final Enemy/Attack/4.png',
        'images/2.Enemy/3 Final Enemy/Attack/5.png',
        'images/2.Enemy/3 Final Enemy/Attack/3.png',
    ];

    imagePath = 'images/2.Enemy/3 Final Enemy/1.Introduce/5.png';
    width = 350;
    height = 350;
    x = 3800;
    y = -200;
    offset = {
        top:145,
        bottom:50,
        left:25,
        right:25
    }
    world;
    isComing = false;
    hasArrived = false;
    comeAnimationFrame = 0;
    deadSoundPlayed = false;
    isVulnerable = true;
    isVulnerableDelay = 2000;

    /**
     * Initializes the Endboss by loading images, setting speed, and starting vulnerability checks.
     */
    constructor() {
        super().loadImage(this.imagePath);
        this.imageCache = {};
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 5 + Math.random() * 0.5;
        this.lastHurt = Date.now();
        this.alreadyVulnerable();
    }


    /**
     * Animates the Endboss based on its state (dead, hurt, or swimming).
     */
    animateFish(){
        if(this.isDead()){
            this.playAnimation(this.IMAGES_DEAD);
            this.animateDeathToTop();
            this.endbossDead();
            if(!this.deadSoundPlayed){
                this.world.sounds.endboss_dead_sound.play();
                this.world.sounds.win_sound.play();
                this.deadSoundPlayed = true;
            }
        }else if(this.isHurt()){
            this.playAnimation(this.IMAGES_HURT);
        }else{
            this.playAnimation(this.IMAGES_SWIM);
            this.world.sounds.endboss_background_sound.play();
        }
    }


    /**
     * Handles the death sequence of the Endboss.
     */
    endbossDead(){
        closeButtonsWinLose();
        setTimeout(()=>{
            this.world.stop();
            if(this.world.shark.isDead()){
                this.showReplayButton();
                return;
            }else{
                this.showWinButton();
            }
        }, 3500)
    }


    /** Displays the game win screen by manipulating DOM elements.
     * Removes 'd-none' class and adds 'd-flex' class to the game over element.
     */
    showWinButton(){
        setTimeout(()=>{
            document.getElementById("youWin").classList.remove("d-none");
            document.getElementById("youWin").classList.add("d-flex");
        }, 4000)
    }


    /**
     * Checks if the shark is close enough to trigger the Endboss's arrival animation.
     * @param {Shark} shark - The shark object.
     */
    checkIfSharkComming(shark){
        if (!this.isComing && shark.x >= 3650 && !this.hasArrived) {
            this.isComing = true;
            this.comeAnimationFrame = 0;
        }

        if (this.isComing && !this.hasArrived) {
            this.playComeAnimation();
        } else if (this.hasArrived) {
            this.animateFish();
            this.moveTowardsShark(shark);
        }
    }


    /**
     * Plays the introduction animation for the Endboss.
     */
    playComeAnimation() {
        if (this.comeAnimationFrame < this.IMAGES_COME.length) {
            this.loadImage(this.IMAGES_COME[this.comeAnimationFrame]);
            this.comeAnimationFrame++;
        } else {
            this.isComing = false;
            this.hasArrived = true;
            this.comeAnimationFrame = 0;
        }
        this.world.sounds.entry_endboss_sound.play();
    }


    /**
     * Moves the Endboss towards the shark and attacks if close.
     * @param {Shark} shark - The shark object.
     */
    moveTowardsShark(shark) {
        const distanceX = Math.abs(this.x - shark.x);
        const distanceY = Math.abs(this.y - shark.y);
        const nearThreshold = 150;
        this.otherDirection = this.x < shark.x; // Face towards shark: true if endboss is to the right of shark
        if (distanceX < nearThreshold && distanceY < nearThreshold) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.world.sounds.endboss_attack_sound.play();
        }
        this.endbossFollowShark(shark);
    }


    /**
     * Makes the Endboss follow the shark's position.
     * @param {Shark} shark - The shark object.
     */
    endbossFollowShark(shark){
        const moveThreshold = 50; // Only move if distance exceeds this threshold to prevent oscillation
        if (Math.abs(this.x - shark.x) > moveThreshold) {
            if (this.x > shark.x) {
                this.x -= this.speed;
            } else if (this.x < shark.x) {
                this.x += this.speed;
            }
        }
        if (Math.abs(this.y - shark.y) > moveThreshold) {
            if (this.y > shark.y) {
                this.y -= this.speed / 2;
            } else if (this.y < shark.y && this.y + this.height < this.world.canvas.height) {
                this.y += this.speed / 2;
            }
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
     * Sets the shark's vulnerability status to false and updates the last hurt timestamp.
     * Typically called when the shark becomes invulnerable after taking damage.
     */
    changeVulnerability(){
        this.lastHurt = Date.now();
        this.isVulnerable = false;
    }


}