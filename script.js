const tryAgain = document.getElementById("tryAgain");
const startGameDiv = document.querySelector(".start-game");
const gameZone = document.querySelector(".game-zone");
const menuInfos = document.getElementById('menuInfos');
const mobileButton = document.getElementById('mobileButtons');
const settingBtn = document.getElementById('setting');
const footer = document.getElementById('footer');
let startBtn = document.getElementById("startBtnGame");
let volumeIcon = document.getElementById("volume");
const volumeStatus = document.querySelector('.img-volume');
const historyContain = document.querySelector('#historyContain');
const fullscreenContainer = document.querySelector('#fullscreen');
let instructions = document.getElementById("instructions");
let volume = true;


settingBtn?.addEventListener('click', function(event){
  event.stopPropagation();
  if(instructions.classList.contains('d-none')){
    instructions.classList.remove('d-none');
    instructions.classList.add('d-flex');
  }else{
    instructions.classList.add('d-none');
  }
})

volumeIcon?.addEventListener('click', function(){
  volume = !volume;
  if(!volume){
    sounds.muteAllSounds();
    volumeStatus.src = './images/5.Buttons/Key/volume_off.png';
  }else{
    sounds.unmuteAllSounds();
    volumeStatus.src = './images/5.Buttons/Key/volume.png';
  }
})


function startGame(){
    startGameDiv.classList.add('d-none');
    gameZone.classList.remove('d-none');
    footer.classList.add('d-none');
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


tryAgain.addEventListener('click', ()=>{
    location.reload();
})


function startHistory(event){
  event.stopPropagation();
    menuInfos.innerHTML  = '';
    menuInfos.innerHTML = TemplateHistory();
}


function startIntructons(event){
  event.stopPropagation();
    menuInfos.innerHTML  = '';
    menuInfos.innerHTML = templateHowToPlay();
}


function closeMenu(event){
  instructions.classList.add('d-none');
  event.stopPropagation();

}



function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0  
  );
}


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



