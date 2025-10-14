class Fond extends MovableObject {
    speed;
    width = 676;
    height = 450;

    /**
     * Creates a Fond object at specified coordinates with given image and speed.
     * @param {number} x - The x-coordinate of the Fond.
     * @param {number} y - The y-coordinate of the Fond.
     * @param {string} imagePath - The path to the image file.
     * @param {number} speed - The speed at which the Fond moves left.
     */
    constructor( x, y, imagePath, speed) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animate();
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