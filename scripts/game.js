let canvas;
let ctx;
canvas = document.getElementById('gameCanvas');
canvas.width = 900;
canvas.height = 600;
ctx = canvas.getContext('2d');
let keyboard = new Keyboard();
let world = new World(canvas, ctx, keyboard);


function init() {
    world.start();
}

function stopGame(){
    world.stop();
}



function moveLeftMobile(event, value){
    event.preventDefault();
    keyboard.LEFT = value;
}

function moveRightMobile(event, value){
    event.preventDefault();
    keyboard.RIGHT = value;
}

function moveUpMobile(event, value){
    event.preventDefault();
    keyboard.UP = value;
}

function moveDownMobile(event, value){
    event.preventDefault();
    keyboard.DOWN = value;
}

function slap(event, value){
    event.preventDefault();
    keyboard.SPACE = value;
}

function normalBubble(event, value){
    event.preventDefault();
    keyboard.D = value;
}

function poisonBubble(event, value){
    event.preventDefault();
    keyboard.F = value;
}


window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") keyboard.LEFT = true;
    if (e.code === "ArrowRight") keyboard.RIGHT = true;
    if (e.code === "ArrowUp") keyboard.UP = true;
    if (e.code === "ArrowDown") keyboard.DOWN = true;
    if (e.code === "Space") keyboard.SPACE = true;
    if (e.code === "Enter") keyboard.ENTER = true;
    if (e.code === "KeyD") keyboard.D = true;
    if (e.code === "KeyF") keyboard.F = true;
});

window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") keyboard.LEFT = false;
    if (e.code === "ArrowRight") keyboard.RIGHT = false;
    if (e.code === "ArrowUp") keyboard.UP = false;
    if (e.code === "ArrowDown") keyboard.DOWN = false;
    if (e.code === "Space") keyboard.SPACE = false;
    if (e.code === "Enter") keyboard.ENTER = false;
    if (e.code === "KeyD") keyboard.D = false;
    if (e.code === "KeyF") keyboard.F = false;
});


