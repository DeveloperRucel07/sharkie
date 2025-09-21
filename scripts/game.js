let canvas;
let ctx;
canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');
let keyboard = new Keyboard();
canvas.width = 900;
canvas.height = 600;
let world = new World(canvas, ctx, keyboard);


function init() {
    world.start();
}

function stopGame(){
    world.stop();
}


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


