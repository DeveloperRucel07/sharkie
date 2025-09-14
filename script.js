const startBtn = document.getElementById("startBtnGame");
const startGameDiv = document.querySelector(".start-game");
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
    startGameDiv.style.display = "none";
    init();
});
