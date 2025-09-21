class World {
    shark;
    level = level1;
    canvas;
    keyboard;
    life_mark = new LifeMark();
    coin_mark = new CoinMark();
    poison_mark = new PoisonMark();
    bubbles = [];
    ctx;
    camera_x = 0;
    collectedCoins = 0;
    collectedPoisons = 0;
    collectedLifes = 0;
    worldWidth;
    constructor(canvas, ctx, keyboard) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.worldWidth = this.level.level_end_x;
        this.shark = new Shark('images/1.Sharkie/Stay/1.png');
        this.setWorldToShark();
        this.checkColisions();  
    }

    setWorldToShark() {
        this.shark.world = this;
    }

    addObjectsToCanvas(array){
        array.forEach(obj =>{
            obj.draw(this.ctx);
        }); 
    }

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
        ctx.restore();
        this.life_mark.draw(ctx);
        this.coin_mark.draw(ctx);
        this.poison_mark.draw(ctx);
    }

    animatedObjects() {
        this.level.backgrounds.forEach(layer => layer.animate());
        this.shark.animate();
        this.level.pufferEnemies.forEach(enemy => enemy.animateFish());
        this.level.jellyEnemies.forEach(jelly => jelly.animate());
        this.bubbles.forEach(bubble => bubble.throw());
    }


    checkColisions(){

        setInterval(()=>{
            this.sharkCollisionWithPufferFishes();
            this.sharkCollisionWithJellyFishes(); 
            this.sharkCollisionWithCoins();
            this.sharkCollisionWithPoisons();
            this.sharkCollisionWithLifes();
        }, 200) 
    }



    sharkCollisionWithPufferFishes(){
        this.level.pufferEnemies.forEach((pufferEnemy, index)=>{
            if(this.shark.isColliding(pufferEnemy)){
                this.shark.hit();
                this.life_mark.setPercentageLife(this.shark.energy);
            }
        })
    }

    sharkCollisionWithJellyFishes(){
        this.level.jellyEnemies.forEach((jellyEnemy, index)=>{
            if(this.shark.isColliding(jellyEnemy)){
                this.shark.electro();
                this.life_mark.setPercentageLife(this.shark.energy);
            }
        })
    }

    sharkCollisionWithCoins(){
        this.level.coins.forEach((coin, index) => {
            if (this.shark.isColliding(coin)) {
                this.collectedCoins++;
                this.level.coins.splice(index, 1);
                this.coin_mark.setPercentageCoin(this.collectedCoins);
            }
        })
    }
    
    sharkCollisionWithPoisons(){
        this.level.poisons.forEach((poison, index) => {
            if (this.shark.isColliding(poison)) {
                this.collectedPoisons++;
                this.level.poisons.splice(index, 1);
                this.poison_mark.setPercentagePoison(this.collectedPoisons);
            }
        })
    }
    
    sharkCollisionWithLifes(){
        this.level.lifes.forEach((life, index) => {
            if (this.shark.isColliding(life)) {
                this.collectedLifes++;
                let newEnergy = this.collectedLifes*10;
                this.shark.energy = this.shark.energy + newEnergy;
                this.level.lifes.splice(index, 1);
                this.life_mark.setPercentageLife(this.shark.energy);
            }
        })

    }


    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw(this.ctx);
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    start() {
        setInterval(()=>{
            this.animatedObjects();
        }, 1000/15);
        this.gameLoop();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }else if(this.animationId == null){
            this.start();
        }
    }
}

