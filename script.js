const startBtn = document.getElementById("startBtnGame");
const tryAgain = document.getElementById("tryAgain");
const startGameDiv = document.querySelector(".start-game");
const gameZone = document.querySelector(".game-zone");

START_IMG = [
    "./images/5.Buttons/Start/1.png",
    "./images/5.Buttons/Start/2.png",
    "./images/5.Buttons/Start/3.png",
    "./images/5.Buttons/Start/4.png",
];

document.addEventListener("DOMContentLoaded", () => {
    let imgIndex = 0;
    setInterval(() => {
        startBtn.innerHTML = `<img src="${START_IMG[imgIndex]}" alt="Start Game">`;
        imgIndex = (imgIndex + 1) % START_IMG.length;
    }, 1200);
});

startBtn.addEventListener("click", () => {
    startGameDiv.classList.add('d-none');
    gameZone.classList.remove('d-none');
    gameZone.classList.add('d-flex');
    init();
});

tryAgain.addEventListener('click', ()=>{
    window.location.reload();
})



function getDeviceType() {
    const ua = navigator.userAgent;
     console.log(ua);
    if (/android/i.test(ua)) {
        return "Android";
    }
    if (/iPad|iPhone|Mac|iPod/.test(ua) && !window.MSStream) {
        return "iOS";
    }
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
        return "Tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "Mobile";
    }
   
    return "Desktop";
}

console.log("Device type:", getDeviceType());

