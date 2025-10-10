class MovableObject extends DrawableObject{
    x;
    y;
    width;
    height;
    image;
    imageCache = {};
    currentImage = 0;
    speed = 0;
    otherDirection = false;
    energy = 100;

    offset = {
        top:0,
        bottom:0,
        left:0,
        right:0
    }

    lastHit = 0;
    lastChock= 0;
    lastEndBossHurt = 0


    /**
     * Updates the current sprite image for animation.
     * Loop through the provided array of `images`
     * Uses `currentImage` to determine the next frame.
     * Updates `this.img` with the image from `imageCache`.
     * Increments `currentImage` for the next frame.
     * @param {Array} images Array of image paths representing animation frames
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }

    
    /**
     * Moves the object to the left within its allowed horizontal bounds.
     * - Decreases `x` by `speed`.
     * - Reverses direction and flips `otherDirection` if hitting left or right boundary.
     * - Keeps object within [0, max_x_fishes].
     */
    moveLeft() {
        this.x -= this.speed;
        if (this.x <= 0) {
            this.x = 0;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
        if(this.x + this.width>= this.max_x_fishes){
            this.x = this.max_x_fishes - this.width;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
    }


    /**
     * Moves the object to the right within its allowed horizontal bounds.
     * - Increases `x` by `speed`.
     * - Sets `otherDirection` to true (facing right).
     * - Reverses direction and flips `otherDirection` if hitting left or right boundary.
     * - Keeps object within [0, max_x_fishes].
     */
    moveRight() {
        this.otherDirection = true;
        this.x += this.speed;
        if (this.x + this.width >= this.max_x_fishes) {
            this.x = this.max_x_fishes - this.width;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
        if(this.x <= 0){
            this.x = 0;
            this.speed *= -1;
            this.otherDirection = !this.otherDirection;
        }
    }


    /**
     * Checks if the current movable object is colliding with another movable object (moObject) using axis-aligned bounding box (AABB) collision detection. 
     * This method accounts for offset values to provide more precise collision boundaries, allowing for hitboxes that are smaller than the object's full dimensions.
     * @param {Object} moObject 
     * @returns true or false
     */
    isColliding(moObject) {
        return (
            this.x + this.offset.left < moObject.x + moObject.width - moObject.offset.right && 
            this.x + this.width - this.offset.right > moObject.x + moObject.offset.left &&   
            this.y + this.offset.top < moObject.y + moObject.height - moObject.offset.bottom && 
            this.y + this.height - this.offset.bottom > moObject.y + moObject.offset.top     
        );
    }


    /**
     *Applies damage to the movable object by reducing its energy level. If the energy drops below zero, it is clamped to zero. 
     *If the object is not dead after the hit, records the timestamp of the last hit for hurt state tracking
     * @param {number} damage The amount of damage to apply to the object's energy
     */
    hit(damage){
        this.energy -= damage;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastHit  = new Date().getTime();
        }
    }


    /**
     * Applies electric shock damage to the movable object, reducing its energy by a fixed amount (6). 
     * Similar to hit(), it clamps energy to zero if it goes negative and records the timestamp of the last electric shock if the object survives.
     * this for Jelly Fishes when they colliding with Shark
     */
    electro(){
        this.energy -= 10;
        if(this.energy < 0){
            this.energy = 0;
        }else{
            this.lastChock  = new Date().getTime();
        }
    }


    /**
     * Determines if the movable object is currently in a "hurt" state due to recent damage. 
     * This is based on whether a hit occurred within the last second.
     * @returns true or false
     */
    isHurt(){
        if (!this.lastHit) return false;
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    
    /**
     * Determines if the movable object is currently in an "electric hurt" state due to recent electric shock. 
     * Similar to isHurt(), but checks for electric shocks within the last second.
     * @returns true or false
     */
    isHurtElectric(){
        let timepassed = new Date().getTime() - this.lastChock;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Checks if the movable object is dead by verifying if its energy has reached zero.
     * @returns true or false
     */
    isDead(){
        return this.energy == 0;
    }


    /**
     * Animates the movable object's death by moving it upward off the screen. The behavior differs based on the object's 
     * type: for Shark or Endboss instances, it moves to y=-100 and loads a specific image; for others, it stops at y=0.
     */
    animateDeathToTop() {
        if (this.y > 0) {
            this.y -= 10; 
            if (this.y < 0){
                if(this instanceof Shark || this instanceof Endboss){
                    this.y = -100;
                    this.loadImage(this.imagePath);
                }else{
                    this.y = 0;
                }
            };
        }
    }


}