class Background extends MovableObject{

    width = 720;
    height = 480;
    world;
    speed;

    constructor(imagePath,x,speed,world){
        super().loadImage(imagePath)
        this.x = x;
        this.y = 0;
        this.speed = speed;
        this.world = world;
        this.animate();
    }

    animate(){
        setInterval(() => {
            if ((keyboard.LEFT && this.world.character.x > 0) && !this.world.character.barrierLeft) {
                this.moveRight();
            } else if ((keyboard.RIGHT && this.world.character.x < this.world.level.level_end_x) && !this.world.character.barrierRight) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    

}