class Background extends MovableObject{

    width = 900;
    height = 600;
    speed;

    /**
     * Creates a Background object at specified x-coordinate with given image and speed.
     * @param {number} x - The x-coordinate of the Background.
     * @param {string} imagePath - The path to the image file.
     * @param {number} speed - The speed at which the Background moves left.
     */
    constructor(x, imagePath, speed){
        super().loadImage(imagePath)
        this.x = x;
        this.y = 0;
        this.speed = speed;
    }


    /**
     * Animates object movement from right to left across the screen.
     * Decreases `x` by `speed` each frame (moves left).
     * When the object moves fully off-screen (x <= -width),
     * it resets to `x = 900` (reappears on the right side).
     */
    animate() {
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.x = 900;
        }
    }

}