const tryAgain = document.getElementById("tryAgain");
const startGameDiv = document.querySelector(".start-game");
const gameZone = document.querySelector(".game-zone");
const historyGame = document.getElementById('historyGame');
let startBtn = document.getElementById("startBtnGame");
let imgIndex = 0;


function startGame(){
    startGameDiv.classList.add('d-none');
    gameZone.classList.remove('d-none');
    gameZone.classList.add('d-flex');
    init();
}


tryAgain.addEventListener('click', ()=>{
    init();
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



