const tryAgain = document.getElementById("tryAgain");
const startGameDiv = document.querySelector(".start-game");
const gameZone = document.querySelector(".game-zone");
const historyGame = document.getElementById('historyGame');
const mobileButton = document.getElementById('mobileButtons');
let startBtn = document.getElementById("startBtnGame");
const settingBtn = document.getElementById('setting');
let instructions = document.getElementById("instructions");
let imgIndex = 0;


settingBtn?.addEventListener('click', function(){
  instructions.classList.toggle('d-none');
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



