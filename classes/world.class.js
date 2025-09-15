class World {
    shark;
    pufferEnemies = [
        new PufferFishGreen(600, 100),
        new PufferFishOrange(500, 10),
        new PufferFishPink(800, 200),
        new PufferFishOrange(900, 300),
        new PufferFishPink(700, 400),
        new PufferFishGreen(800, 500),
    ];

    jellyEnemies = [
        new JellyFishLila(150),
        new JellyFishGreen(250),
        new JellyFishYellow(550),
        new JellyFishPink(850),
        new JellyFishGreen(1150),
    ];

    backgrounds = [
        new Fond(0, 0, 900, 600, '../images/3.Background/Layers/5. Water/D.png',0),
        new Fond(0, 0, 900, 600, 'images/3.Background/Layers/1. Light/1.png',0.75),
        new Fond(900, 0, 900, 600, 'images/3.Background/Layers/1. Light/2.png',0.75),
        new Fond(10, 220, 1000, 300, '../images/3.Background/Layers/4.Fondo 2/D.png ',0.5),
        new Fond(1000, 220, 1010, 300, '../images/3.Background/Layers/4.Fondo 2/D.png ',0.5),
        new Fond(10, 260, 1000, 300, '../images/3.Background/Layers/3.Fondo 1/L.png',0.25),
        new Fond(1000, 260, 1010, 300, '../images/3.Background/Layers/3.Fondo 1/L.png',0.25),
        // new Fond(0, 200, 900, 400, '../images/3.Background/Layers/2. Floor/D.png',0.15),
        new Fond(10, 200, 900, 400, '../images/3.Background/Layers/2. Floor/L.png',0.15),
        new Fond(900, 200, 910, 400, '../images/3.Background/Layers/2. Floor/L.png',0.15),
    ];

    collectables = [];
    collectedItems = [];
    canvas;
    keyboard;
    ctx;
    constructor(canvas, ctx, keyboard) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.shark = new Shark('../images/1.Sharkie/Stay/1.png');
        this.setWorldToShark();
        
    }

    setWorldToShark() {
        this.shark.world = this;
    }

    addObjectsToCanvas(array){
        array.forEach(obj => obj.draw(this.ctx));
    }

    draw(ctx) {
        this.addObjectsToCanvas(this.backgrounds);
        this.addObjectsToCanvas(this.pufferEnemies);
        this.addObjectsToCanvas(this.jellyEnemies);
        this.addObjectsToCanvas(this.collectedItems);
        this.shark.draw(ctx);
    }

    animatedObjects() {
        this.backgrounds.forEach(layer => layer.animate());
        this.shark.animate();
        this.pufferEnemies.forEach(enemy => enemy.animateFish());
        this.jellyEnemies.forEach(jelly => jelly.animate());
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animatedObjects();
        this.draw(this.ctx);
        this.animationID = requestAnimationFrame(() => this.gameLoop());
    }

    start() {
        this.gameLoop();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

