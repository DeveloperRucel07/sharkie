function randomPosition(min, max) {
    return Math.floor(Math.random() * max) + min;
}

// function drawWorldBackground(backgrounds, ctx) {
//     backgrounds.forEach(layer => layer.draw(ctx));
// }


class World {
    shark;
    enemies = [];
    jellyEnemies = [];
    backgrounds = [];
    canvas;
    keyboard;
    ctx;
    PUFFER_FISH_IMAGES_1 = [
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    PUFFER_FISH_IMAGES_2 = [
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    ];
    PUFFER_FISH_IMAGES_3 = [
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        '../images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];

    JELLY_FISH_IMAGES_REGULAR_LILLA = [
        '../images/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        '../images/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        '../images/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        '../images/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];

    JELLY_FISH_IMAGES_REGULAR_YELLOW = [
        '../images/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        '../images/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        '../images/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        '../images/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];

    constructor(canvas, ctx, numEnemies = 12, keyboard) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyboard = keyboard;
        this.shark = new Shark(0, 300, 300, 300, '../images/1.Sharkie/Stay/1.png');
        const enemyWidth = 70;
        const enemyHeight = 70;

        const cols = Math.floor((800 - 200) / enemyWidth);
        const rows = Math.floor(600 / enemyHeight);        
        const maxEnemies = rows * cols;

        if (numEnemies > maxEnemies) {
            console.warn(`Too many enemies! Reducing from ${numEnemies} to ${maxEnemies}`);
            numEnemies = maxEnemies;
        }

        let fishPositions = [];
        for (let c = 0; c < cols; c++) {
            const y = Math.floor(Math.random() * rows) * enemyHeight;
            fishPositions.push({ x: 200 + c * enemyWidth, y });
        }

        let jellyPositions = [];
        for (let r = 0; r < rows; r++) {
            const x = 200 + Math.floor(Math.random() * cols) * enemyWidth;
            jellyPositions.push({ x, y: r * enemyHeight });
        }

        fishPositions.sort(() => Math.random() - 0.5);
        jellyPositions.sort(() => Math.random() - 0.5);

        const enemyFishes = [
            this.PUFFER_FISH_IMAGES_1,
            this.PUFFER_FISH_IMAGES_2,
            this.PUFFER_FISH_IMAGES_3,
        ];

        const enemyJelly = [
            this.JELLY_FISH_IMAGES_REGULAR_LILLA,
            this.JELLY_FISH_IMAGES_REGULAR_YELLOW,
        ];

        for (let i = 0; i < numEnemies && i < fishPositions.length; i++) {
            let pos = fishPositions[i];
            let images = enemyFishes[i % enemyFishes.length];
            this.enemies.push(new Fish(pos.x, pos.y, enemyWidth, enemyHeight, images, 2)); // speed 2
        }

        for (let j = 0; j < numEnemies && j < jellyPositions.length; j++) {
            let pos = jellyPositions[j];
            let images = enemyJelly[j % enemyJelly.length];
            this.jellyEnemies.push(new Jelly(pos.x, pos.y, enemyWidth, enemyHeight, images, 2)); // speed 2
        }


        this.backgrounds = [
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
        this.addObjectsToCanvas(this.enemies);
        this.addObjectsToCanvas(this.jellyEnemies);
        this.shark.draw(ctx);
        
    }

    animatedObjects() {
        this.backgrounds.forEach(layer => layer.animate());
        this.shark.animate();
        this.enemies.forEach(enemy => enemy.animateFish());
        this.jellyEnemies.forEach(jelly => jelly.animateJelly());
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

