class ThrowableObject extends MovableObject {
    type;
    width = 40;
    height = 40;
    speed = 5;
    vx = 1; // horizontal velocity
    vy = 1; // vertical velocity
    gravity = 4; // gravity acceleration
    constructor(x, y, type){
        super();
        this.type = type;
        if(type === "poison"){
            this.loadImage('images/1.Sharkie/Attack/Bubble trap/Poisoned Bubble (for whale).png');
        }else{
            this.loadImage('images/1.Sharkie/Attack/Bubble trap/Bubble.png');
        }
        this.x = x;
        this.y = y;
        this.otherDirection = false;
    }


    /**
     * Updates projectile (e.g., bubble) movement each frame.
     *
     * - Moves left/right depending on `otherDirection`.
     * - Applies horizontal (`vx`) and vertical (`vy`) velocity.
     * - Applies gravity effect to `vy`.
     * - Stops updating if projectile leaves top or left screen bounds.
     */
    throw(){
        if(this.otherDirection){
            this.x -= this.speed;
        }else{
            this.x += this.speed;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.vy -= this.gravity;

        if (this.y < 0 || this.x < 0) return;
    }
}