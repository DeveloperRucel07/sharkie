const tryAgain = document.getElementById("tryAgain");
const startGameDiv = document.querySelector(".start-game");
const gameZone = document.querySelector(".game-zone");
const historyGame = document.getElementById('historyGame');
const mobileButton = document.getElementById('mobileButtons');
const settingBtn = document.getElementById('setting');
let startBtn = document.getElementById("startBtnGame");
let volumeIcon = document.getElementById("volume");
const volumeStatus = document.querySelector('.img-volume');
let instructions = document.getElementById("instructions");
let volume = true;


settingBtn?.addEventListener('click', function(){
  instructions.classList.toggle('d-none');
})

volumeIcon?.addEventListener('click', function(){
  volume = !volume;
  if(!volume){
    volumeStatus.src = './images/5.Buttons/Key/volume_off.png';
  }else{
    volumeStatus.src = './images/5.Buttons/Key/volume.png';
  }
})


function startGame(){
    startGameDiv.classList.add('d-none');
    gameZone.classList.remove('d-none');
    gameZone.classList.add('d-flex');
    if (isTouchDevice()) {
      mobileButton.classList.remove('d-none');
      mobileButton.classList.add('d-flex');
    } else {
      mobileButton.classList.add('d-none');
      mobileButton.classList.remove('d-flex');
    }
    init();
}


tryAgain.addEventListener('click', ()=>{
    location.reload();
})


function startHistory(){
    historyGame.innerHTML  = '';
    historyGame.innerHTML = TemplateStartHistory();
}


function nextToMision(){
    historyGame.innerHTML  = '';
    historyGame.innerHTML = templateMission();
}


function nextToStartGame(){
    historyGame.innerHTML  = '';
    historyGame.innerHTML = templateReadyToPlay();
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



