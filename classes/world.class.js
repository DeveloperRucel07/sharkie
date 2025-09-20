class World {
    shark;
    level = level1;
    canvas;
    keyboard;
    life_mark = new LifeMark();
    coin_mark = new CoinMark();
    poison_mark = new PoisonMark();
    ctx;
    camera_x = 0;
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
        ctx.restore();
        this.shark.draw(ctx);
        this.shark.drawBorderOffset(ctx);
        this.life_mark.draw(ctx);
        this.coin_mark.draw(ctx);
        this.poison_mark.draw(ctx);
    }

    animatedObjects() {
        this.level.backgrounds.forEach(layer => layer.animate());
        this.shark.animate();
        this.level.pufferEnemies.forEach(enemy => enemy.animateFish());
        this.level.jellyEnemies.forEach(jelly => jelly.animate());
    }


    checkColisions(){
        setInterval(()=>{
            this.level.pufferEnemies.forEach((pufferEnemy)=>{
                if(this.shark.isColliding(pufferEnemy)){
                    this.shark.hit();
                }
            })
            this.level.jellyEnemies.forEach((jellyEnemy)=>{
                if(this.shark.isColliding(jellyEnemy)){
                    this.shark.hit();
                }
            })
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

