let canvas;
let ctx;
canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');
let keyboard = new Keyboard();
let world = new World(canvas, ctx, keyboard);

function resizeCanvas() {
    if (window.innerWidth >= 999) {
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
    }
}

// let world = new World(canvas, ctx);

function init() {
    resizeCanvas();
    world.draw(ctx);
    world.start();
}

window.addEventListener("resize", init);

window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") keyboard.LEFT = true;
    if (e.code === "ArrowRight") keyboard.RIGHT = true;
    if (e.code === "ArrowUp") keyboard.UP = true;
    if (e.code === "ArrowDown") keyboard.DOWN = true;
    if (e.code === "Space") keyboard.SPACE = true;
    if (e.code === "Enter") keyboard.ENTER = true;
});

window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") keyboard.LEFT = false;
    if (e.code === "ArrowRight") keyboard.RIGHT = false;
    if (e.code === "ArrowUp") keyboard.UP = false;
    if (e.code === "ArrowDown") keyboard.DOWN = false;
    if (e.code === "Space") keyboard.SPACE = false;
    if (e.code === "Enter") keyboard.ENTER = false;
});