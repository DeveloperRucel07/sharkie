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
    y = 200;
    offset = {
        top:140,
        bottom:40,
        left:15,
        right:15
    }
    world;
    isComing = false;
    hasArrived = false;
    comeAnimationFrame = 0;

    constructor() {
        super().loadImage(this.imagePath);
        this.imageCache = {};
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 3;
    }

    animateFish(){
        if(this.isDead()){
            this.playAnimation(this.IMAGES_DEAD);
            this.animateDeathToTop();
            this.endbossDead();
            this.world.sounds.endboss_dead_sound.play();
            document.getElementById("youWin").classList.remove("d-none");
            document.getElementById("youWin").classList.add("d-flex");
            this.world.sounds.win_sound.play();

        }else if(this.isHurt()){
            this.playAnimation(this.IMAGES_HURT);
        }else{
            this.playAnimation(this.IMAGES_SWIM);
            this.world.sounds.endboss_background_sound.play();
        }

    }

    endbossDead(){
        setTimeout(()=>{
            stopGame();
        }, 4000)
    }


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

    moveTowardsShark(shark) {
        const distanceX = Math.abs(this.x - shark.x);
        const distanceY = Math.abs(this.y - shark.y);
        const nearThreshold = 150;
        this.otherDirection = !shark.otherDirection;
        if (distanceX < nearThreshold && distanceY < nearThreshold) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.world.sounds.endboss_attack_sound.play();
        }

        if (this.x > shark.x) {
            this.x -= this.speed;
        } else if (this.x < shark.x) {
            this.x += this.speed;
        }

        if (this.y > shark.y) {
            this.y -= this.speed / 2;
        } else if (this.y < shark.y) {
            this.y += this.speed / 2;
        }

    }


}