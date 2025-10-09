const tryAgain = document.getElementById("tryAgain");
const startGameDiv = document.querySelector(".start-game");
const gameZone = document.querySelector(".game-zone");
const menuInfos = document.getElementById('menuInfos');
const mobileButton = document.getElementById('mobileButtons');
const settingBtn = document.getElementById('setting');
const gameOver = document.getElementById('gameOver');
let startBtn = document.getElementById("startBtnGame");
let volumeIcon = document.getElementById("volume");
const volumeStatus = document.querySelector('.img-volume');
const historyContain = document.querySelector('#historyContain');
const fullscreenContainer = document.querySelector('#fullscreen');
let instructions = document.getElementById("instructions");
let volume = true;

/**
 * open the menu infos
 */
function openMenu(event){
  event.stopPropagation();
  if(instructions.classList.contains('d-none')){
    instructions.classList.remove('d-none');
    instructions.classList.add('d-flex');
  }else{
    instructions.classList.add('d-none');
  }
}


/**
 * change the Sound status for Muted or Unmuted.
 */
volumeIcon?.addEventListener('click', function(event){
  event.stopPropagation();
  volume = !volume;
  if(!volume){
    sounds.muteAllSounds();
    volumeStatus.src = './images/5.Buttons/Key/volume_off.png';
  }else{
    sounds.unmuteAllSounds();
    volumeStatus.src = './images/5.Buttons/Key/volume.png';
  }
})


/**
 * start the Game
 * set the gameZone class to d-flex
 * check if the current device is a touch device he show the MobileMove Keys
 * 
 * initiate the Level.
 */
function startGame(){
    startGameDiv.classList.add('d-none');
    gameZone.classList.remove('d-none');
    gameZone.classList.add('d-flex');
    fullscreenContainer.classList.remove('d-none');
    fullscreenContainer.classList.add('d-flex');
    if (isTouchDevice()) {
      mobileButton.classList.remove('d-none');
      mobileButton.classList.add('d-flex');
    } else {
      mobileButton.classList.add('d-none');
      mobileButton.classList.remove('d-flex');
    } 
    initLevel();
}


/**
 * replay the Game
 */
tryAgain.addEventListener('click', ()=>{
  location.reload();
})


/**
 * show the history in the Menuinfos
 * @param {Event} event 
 */
function startHistory(event){
  event.stopPropagation();
    menuInfos.innerHTML  = '';
    menuInfos.innerHTML = TemplateHistory();
}


/**
 * show the controls in the Menuinfos
 * @param {Event} event 
 */
function startIntructions(event){
  event.stopPropagation();
    menuInfos.innerHTML  = '';
    menuInfos.innerHTML = templateHowToPlay();
}


/**
 * show the Impressum in the Menuinfos
 * @param {Event} event 
 */
function impressum(event){
  event.stopPropagation();
    menuInfos.innerHTML  = '';
    menuInfos.innerHTML = templateImpressum();
}


/**
 * close the Menu when the user out of the menu click.
 * @param {Event} event 
 */
function closeMenu(event){
  instructions.classList.add('d-none');
  event.stopPropagation();

}


/**
 * check if the current device is a touchable device or not.
 * @returns true or false
 */
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0  
  );
}


/**
 * check the device oriantation
 * show the turn your device message if the width < height
 */
function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    document.getElementById("orientation").style.display = "flex";
  } else {
    document.getElementById("orientation").style.display = "none";
  }
}


window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);



