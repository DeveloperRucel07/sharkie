COLLECTABLE_IMAGES_COINS = [
    'images/4.Marks/orange/0_coin.png',
    'images/4.Marks/orange/20_coin.png',
    'images/4.Marks/orange/40_coin.png',
    'images/4.Marks/orange/60_coin.png',
    'images/4.Marks/orange/80_coin.png',
    'images/4.Marks/orange/100_coin.png'
];

COLLECTABLE_IMAGES_POISONS = [
    'images/4.Marks/green/poisoned bubbles/0_ copia 2.png',
    'images/4.Marks/green/poisoned bubbles/20_ copia 3.png',
    'images/4.Marks/green/poisoned bubbles/40_ copia 2.png',
    'images/4.Marks/green/poisoned bubbles/60_ copia 2.png',
    'images/4.Marks/green/poisoned bubbles/80_ copia 2.png',
    'images/4.Marks/green/poisoned bubbles/100_ copia 3.png',
];

LIFE_MARK_IMAGES_SHARK = [
    'images/4.Marks/Purple/0_ .png',
    'images/4.Marks/Purple/20_ .png',
    'images/4.Marks/Purple/40_ .png',
    'images/4.Marks/Purple/60_ .png',
    'images/4.Marks/Purple/80_ .png',
    'images/4.Marks/Purple/100_ .png',
];

LIFE_MARK_IMAGES_ENDBOSS = [
    'images/4.Marks/red_endboss/0_endboss.png',
    'images/4.Marks/red_endboss/20_endboss.png',
    'images/4.Marks/red_endboss/40_endboss.png',
    'images/4.Marks/red_endboss/60_endboss.png',
    'images/4.Marks/red_endboss/80_endboss.png',
    'images/4.Marks/red_endboss/100_endboss.png'

];


class World {
    shark;
    level = level1;
    canvas;
    keyboard;
    life_mark = new LifeMark(10, LIFE_MARK_IMAGES_SHARK);
    coin_mark = new Collectable(220, COLLECTABLE_IMAGES_COINS);
    poison_mark = new Collectable(420, COLLECTABLE_IMAGES_POISONS);
    endboss_mark = new LifeMark(700, LIFE_MARK_IMAGES_ENDBOSS);
    bubbles = [];
    ctx;
    camera_x = 0;
    collectedCoins = 0;
    collectedPoisons = 0;
    worldWidth;
    intervalCheckCollision;
    intervalAnimatedObject;

    constructor(canvas, ctx, keyboard, sounds) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.sounds = sounds;
        this.keyboard = keyboard;
        this.worldWidth = this.level.level_end_x;
        this.shark = new Shark('images/1.Sharkie/Stay/1.png');
        this.endboss =  new Endboss();
        this.setWorldToObject();
    }


    /**
     * set the world to shark and Endboss.
     */
    setWorldToObject() {
        this.shark.world = this;
        this.endboss.world = this;
    }


    /**
     * take an array and Draw all element in the context
     * @param {Array} array array of drawable object
     */
    addObjectsToCanvas(array){
        array.forEach(obj =>{
            obj.draw(this.ctx);
        }); 
    }


    /**
     * draw all element in the context
     * @param {Context} ctx 
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.level.backgrounds);
        this.addObjectsToCanvas(this.level.pufferEnemies);
        this.addObjectsToCanvas(this.level.jellyEnemies);
        this.addObjectsToCanvas(this.level.coins);
        this.addObjectsToCanvas(this.level.lifes);
        this.addObjectsToCanvas(this.level.poisons);
        this.addObjectsToCanvas(this.bubbles);
        this.shark.draw(ctx);
        this.endboss.draw(ctx);
        ctx.restore();
        this.life_mark.draw(ctx);
        this.coin_mark.draw(ctx);
        this.poison_mark.draw(ctx);
        this.endboss_mark.draw(ctx);
    }


    /**
     * Animates all dynamic objects in the game.
     * Call this inside the main game loop to keep the world alive.
     */
    animatedObjects() {
        this.level.backgrounds.forEach(layer => layer.animate());
        this.shark.startSharkanimation();
        this.endboss.checkIfSharkComming(this.shark);
        this.level.pufferEnemies.forEach(enemy => enemy.animateFish());
        this.level.jellyEnemies.forEach(jelly => jelly.animate());
        this.bubbles.forEach(bubble => bubble.throw());
    }


    /**
     * Sets up a recurring collision check (every 200ms).
     * Runs continuously via `setInterval` and stores the ID in `intervalCheckCollision`
     */
    checkColisions(){
        this.intervalCheckCollision = setInterval(()=>{
            this.sharkCollisionWithPufferFishes();
            this.sharkCollisionWithJellyFishes();
            this.bubbleCollisionWithPufferFishes();
            this.bubbleCollisionWithJellyFishes();
            this.sharkCollisionWithCoins();
            this.sharkCollisionWithPoisons();
            this.sharkCollisionWithLifes();
            this.checkBubbleEndbossCollision();
            this.sharkCollisionWithEndboss();
        }, 200)
    }


    /**
     * Handles collisions between shark and puffer fish .
     * If shark is slapping -> kill puffer, play slap sound, remove enemy.
     * If shark is vulnerable and collides -> shark takes damage, play hurt sound,
     * update life bar, and toggle vulnerability.
     */
    sharkCollisionWithPufferFishes(){
        this.level.pufferEnemies.forEach((pufferEnemy, index)=>{
            if(this.shark.slap && this.shark.isColliding(pufferEnemy)){
                pufferEnemy.die = true;
                this.sounds.shark_slap_sound.play();
                setTimeout(()=>{
                    this.level.pufferEnemies.splice(index, 1);
                }, 3000);
            }else
                if(this.shark.isVulnerable && this.shark.isColliding(pufferEnemy)){
                this.shark.hit(10);
                this.sounds.shark_hurt_sound.play();
                this.shark.changeVulnerability();
                this.life_mark.setPercentageLife(this.shark.energy);
            }
        })
    }


    /**
     * Handles collisions between bubble and puffer fish.
     * If bubble collides with a puffer -> kill puffer, play electric sound,
     * remove puffer and bubble.
     */
    bubbleCollisionWithPufferFishes(){
        this.level.pufferEnemies.forEach((pufferEnemy, index)=>{
            this.bubbles.forEach((bubble, bubbleIndex)=>{
                if(bubble.isColliding(pufferEnemy)){
                    pufferEnemy.die = true;
                    this.sounds.electric_sound.play();
                    setTimeout(()=>{
                        this.level.pufferEnemies.splice(index, 1);
                    }, 3000);
                    this.bubbles.splice(bubbleIndex, 1);
                }
            })
        })
    }


    /**
     * Handles collisions between shark and jelly fish .
     * If shark is slapping -> kill jelly, play slap sound, remove enemy.
     * If shark is vulnerable and collides -> shark takes damage, play hurt sound,
     * update life bar, and toggle vulnerability.
     */
    sharkCollisionWithJellyFishes(){
        this.level.jellyEnemies.forEach((jellyEnemy, index)=>{
            if( this.shark.isVulnerable && this.shark.isColliding(jellyEnemy)){
                this.shark.electro();
                this.sounds.electric_sound.play();
                this.shark.changeVulnerability();
                this.life_mark.setPercentageLife(this.shark.energy);
            } else if(this.shark.slap && this.shark.isColliding(jellyEnemy)){
                jellyEnemy.die = true;
                this.sounds.shark_slap_sound.play();
                setTimeout(()=>{
                    this.level.jellyEnemies.splice(index, 1);
                }, 3000);
            }
        })
    }

    /**
     * Handles collisions between bubble and jelly fish.
     * If bubble collides with a jelly -> kill jelly, play electric sound,
     * remove jelly and bubble.
     */
    bubbleCollisionWithJellyFishes(){
        this.level.jellyEnemies.forEach((jellyEnemy, index)=>{
            this.bubbles.forEach((bubble, bubbleIndex)=>{
                if(bubble.isColliding(jellyEnemy)){
                    jellyEnemy.die = true;
                    this.sounds.electric_sound.play();
                    setTimeout(()=>{
                        this.level.jellyEnemies.splice(index, 1);
                    }, 3000);
                    this.bubbles.splice(bubbleIndex, 1);
                }
            })
        })
    }


    /**
     *Handles collisions between shark and coin.
     *If shark collides with a coin -> increment collected coins,
     *play coin sound, remove coin, and update coin bar.
     */
    sharkCollisionWithCoins(){
        this.level.coins.forEach((coin, index) => {
            if (this.shark.isColliding(coin)) {
                this.collectedCoins++;
                this.sounds.collect_coin_sound.play();
                this.level.coins.splice(index, 1);
                this.coin_mark.setPercentage(this.collectedCoins);
            }
        })
    }
    

    /**
     *Handles collisions between shark and poison.
     *If shark collides with a poison -> increment collected poison,
     *play poison sound, remove poison, and update poison bar.
     */
    sharkCollisionWithPoisons(){
        this.level.poisons.forEach((poison, index) => {
            if (this.shark.isColliding(poison)) {
                this.collectedPoisons++;
                this.sounds.collect_poison_sound.play();
                this.level.poisons.splice(index, 1);
                this.poison_mark.setPercentage(this.collectedPoisons);
            }
        })
    }
    

    /**
     *Handles collisions between shark and life.
     *- Shark can only collect life if its energy is less than 100,
     *- Each collected life increases energy by 10, capped at 100.
     - Plays sound, removes life from the level, and updates life bar.
     */
    sharkCollisionWithLifes(){
        this.level.lifes.forEach((life, index) => {
            if (this.shark.isColliding(life)) {
                if(this.shark.energy < 100){
                    this.sounds.collect_life_sound.play();
                    this.shark.energy = Math.min(this.shark.energy + 10, 100);
                    this.level.lifes.splice(index, 1);
                    this.life_mark.setPercentageLife(this.shark.energy);
                }
            }
        })

    }


    /**
     * Handles collisions between Endboss and bubble.
     * If endboss collides -> endboss takes damage, play hurt sound,
     * update endboss life bar.
     */
    checkBubbleEndbossCollision() {
        this.bubbles.forEach(bubble => {
            if (this.endboss && this.endboss.isColliding(bubble)) {
                this.endboss.hit(3);
                this.endboss.changeVulnerability();
                this.sounds.endboss_hurt_sound.play();
                this.endboss_mark.setPercentageLife(this.endboss.energy);

            }
        });
    }


    /**
     * Handles collisions between shark and Endboss.
     * If shark is vulnerable and collides -> shark takes damage, play hurt sound,
     * update life bar, and toggle vulnerability.
     */
    sharkCollisionWithEndboss() {
        if (this.endboss.isColliding(this.shark) && this.shark.isVulnerable) {
            this.endboss.playAnimation(this.endboss.IMAGES_ATTACK);
            this.shark.hit(10);
            this.sounds.shark_hurt_sound.play();
            this.shark.changeVulnerability();
            this.life_mark.setPercentageLife(this.shark.energy);
        }else if(this,this.shark.slap && this.endboss.isColliding(this.shark)){
            this.endboss.hit(2);
            this.endboss.changeVulnerability();
            this.sounds.shark_slap_sound.play();
            this.endboss_mark.setPercentageLife(this.endboss.energy);
        }
    }


    /**
     * draw all element in the context.
     */
    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw(this.ctx);
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    
    /**
     * start the Game and animate element.
     */
    start() {
        this.intervalAnimatedObject = setInterval(()=>{
            this.animatedObjects();
        }, 1000/15);
        this.sounds.resetAllSounds();
        this.checkColisions(); 
        this.gameLoop();
    }


    /**
     * Pause the Game: pause animation and sounds.
     * If already paused, resume the game.
     * */
    pauseWorld(){
        if (this.animationId) {
            this.stop();
        }else if(this.animationId == null){
            this.start();
        }
    }


    /**
     * Stop the Game: stop animation, stop sounds, clear the interval for animated Objects.
     */
    stop() {
        this.sounds.stopAllSounds();
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            clearInterval(this.intervalAnimatedObject);
            clearInterval(this.intervalCheckCollision);
            this.animationId = null;
        }
    }
}

