let canvas;
let ctx;
let sounds = new SoundManager();
let keyboard = new Keyboard();
let world;


/**
 * iniatate the game with New World and set the Width and Height for the Canvas.
 */
function init() {
    canvas = document.getElementById('gameCanvas');
    canvas.width = 900;
    canvas.height = 600;
    if (isMobileDevice()) {
        canvas.style.width = '100%';
        canvas.style.height = window.innerHeight + 'px';
    }
    ctx = canvas.getContext('2d');
    world = new World(canvas, ctx, keyboard, sounds);
    setTimeout(()=>{
        world.start();
    },100)
}


/**
 * Stop the Game 
 * stop all sounds and movable objects in the World.
 */
function pauseGame(){
    // world.sounds.stopAllSounds();
    world.pauseWorld();
}


/**
 * check if the actual device is a mobile device or not.
 * @returns return true or false
 */
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}


/** if the device is a mobile device stop the fullscreen button
 */
function stopFullscreen(){
    if(isMobileDevice()){
        document.querySelector('#fullscreen').classList.remove('d-flex');
        document.querySelector('#fullscreen').classList.add('d-none');
    }
}

/**
 * Set a fullscreen for better experince
 * but the fullscreen is in mobile device desable.
 */
function fullscreen() {
    if(isMobileDevice()) return;
    if (!isMobileDevice()) {
        const widthObj = window.innerWidth;
        const heightObj = window.innerHeight;
        const ratio = canvas.width / canvas.height;
        maintainObjWidthHeight(widthObj, heightObj, ratio);
        if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) { 
        canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
        }
    } 
}


/**
 * set to the canvas the new width and height, when we use fullscreen
 * maintain the aspect ratio of the canvas.
 * @param {number} widthObj new width of the canvas (the InnerWidth)
 * @param {*number} heightObj new height of the canvas (the InnerHeight)
 * @param {*number} ratio the ratio 
 */
function maintainObjWidthHeight(widthObj, heightObj, ratio){
    if((widthObj / heightObj) > ratio){
        canvas.height = heightObj;
        canvas.width = heightObj * ratio;
    }else{
        canvas.width = widthObj;
        canvas.height = canvas.width / ratio;
    }
}


/**
 * move the shark left 
 * @param {Event} event 
 * @param {*boolean} value true or false
 */
function moveLeftMobile(event, value){
    if (event.cancelable) {
        event.preventDefault();
    }
    keyboard.LEFT = value;
}


/**
 * move the shark right
 * @param {Event} event 
 * @param {*boolean} value true or false
 */
function moveRightMobile(event, value){
    if (event.cancelable) {
        event.preventDefault();
    }
    keyboard.RIGHT = value;
}


/**
 * move the shark Up 
 * @param {Event} event 
 * @param {*boolean} value true or false
 */
function moveUpMobile(event, value){
    if (event.cancelable) {
        event.preventDefault();
    }
    keyboard.UP = value;
}


/**
 * move the shark Down 
 * @param {Event} event 
 * @param {*boolean} value true or false
 */
function moveDownMobile(event, value){
    if (event.cancelable) {
        event.preventDefault();
    }
    keyboard.DOWN = value;
}


/**
 * set the slap value of the shark 
 * @param {Event} event 
 * @param {*boolean} value true or false
 */
function slap(event, value){
    if (event.cancelable) {
        event.preventDefault();
    }
    keyboard.SPACE = value;
}


/**
 * throw normal bubble 
 * @param {Event} event 
 * @param {*boolean} value true or false
 */
function normalBubble(event, value){
    if (event.cancelable) {
        event.preventDefault();
    }
    if(value === false) world.shark.canThrowNormalBubble = true;
    keyboard.D = value;
}


/**
 * throw poison bubble 
 * @param {Event} event 
 * @param {*boolean} value true or false
 */
function poisonBubble(event, value){
    if (event.cancelable) {
        event.preventDefault();
    }
    if(value === false) world.shark.canThrowPoisonBubble = true;
    keyboard.F = value;
}

/**
 * if a key is pressed set the value in the keyboard to true
 * @param {Event} event envent listener for keydown
 */
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


/** if a key is released set the value in the keyboard to false
 * @param {Event} event envent listener for keyup
 */
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


