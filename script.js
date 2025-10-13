const startGameDiv = document.querySelector(".start-game");
const gameZone = document.querySelector(".game-zone");
const footer = document.querySelector(".footer");
const menuInfos = document.getElementById("menuInfos");
const mobileButton = document.getElementById("mobileButtons");
const settingBtn = document.getElementById("setting");
const gameOver = document.getElementById("gameOver");
const youWin = document.getElementById("youWin");
let startBtn = document.getElementById("startBtnGame");
let volumeIcon = document.getElementById("volume");
const volumeStatus = document.querySelector(".img-volume");
const historyContain = document.querySelector("#historyContain");
const fullscreenContainer = document.querySelector("#fullscreen");
let instructions = document.getElementById("instructions");
const volumeSlider = document.getElementById("volumeSlider");

/**
 * open the menu infos
 */
function openMenu(event) {
  event.stopPropagation();
  if (instructions.classList.contains("d-none")) {
    instructions.classList.remove("d-none");
    instructions.classList.add("d-flex");
  } else {
    instructions.classList.add("d-none");
  }
}

/**
 * Mute and Unmute the Sound
 * set the volume level from the localStorage
 * set the volume icon from the localStorage
 */
function muteAndunmuteSound() {
  if (
    localStorage.getItem("volume") === null ||
    localStorage.getItem("volumeLevel") === null
  ) {
    localStorage.setItem("volume", "true");
    localStorage.setItem("volumeLevel", "0.5");
  }

  let volume = localStorage.getItem("volume") === "true";
  let volumeLevel = parseFloat(localStorage.getItem("volumeLevel"));

  if (sounds && volume) {
    sounds.setVolume(volumeLevel);
    volumeStatus.src = "./images/5.Buttons/Key/volume.png";
  } else if (sounds) {
    sounds.setVolume(0);
    volumeStatus.src = "./images/5.Buttons/Key/volume_off.png";
  }else{
    volumeStatus.src = "./images/5.Buttons/Key/volume_off.png";
    return;
  }
  volumeSlider.value = volumeLevel;
}

/**
 * change the Sound status for Muted or Unmuted.
 */
volumeIcon?.addEventListener("click", function (event) {
  event.stopPropagation();
  let volume = localStorage.getItem("volume") === "true";
  if (volume && sounds) {
    localStorage.setItem("volume", "false");
    sounds.setVolume(0);
    volumeStatus.src = "./images/5.Buttons/Key/volume_off.png";
  } else if (sounds) {
    localStorage.setItem("volume", "true");
    let volumeLevel = parseFloat(localStorage.getItem("volumeLevel"));
    sounds.setVolume(volumeLevel);
    volumeStatus.src = "./images/5.Buttons/Key/volume.png";
  }else{
    volumeStatus.src = "./images/5.Buttons/Key/volume_off.png";
    return;
  }
});

/**
 * Handle volume slider change.
 */
volumeSlider?.addEventListener("input", function (event) {
  let volumeLevel = parseFloat(event.target.value);
  if (sounds){
    localStorage.setItem("volumeLevel", volumeLevel.toString());
    sounds.setVolume(volumeLevel);
    localStorage.setItem("volume", "true"); // Ensure volume is enabled when adjusting slider
    volumeStatus.src = "./images/5.Buttons/Key/volume.png";
  }else{
    return;
  }
});

/**
 * start the Game
 * set the gameZone class to d-flex
 * check if the current device is a touch device he show the MobileMove Keys
 *
 * initiate the Level.
 */
function startGame() {
  document.querySelector(".p-controls").classList.add("d-none");
  startGameDiv.classList.add("d-none");
  footer.classList.add("d-none");
  gameZone.classList.remove("d-none");
  gameZone.classList.add("d-flex");
  volumeSlider.classList.add("d-none");
  touchDeviceStartGame();
  stopFullscreen();
  initLevel();
}

/** show the mobile buttons if the device is a touch device
 */
function touchDeviceStartGame() {
  if (isTouchDevice()) {
    mobileButton.classList.remove("d-none");
    mobileButton.classList.add("d-flex");
  } else {
    mobileButton.classList.add("d-none");
    mobileButton.classList.remove("d-flex");
  }
}

/**
 * replay the Game
 */
function replayGame() {
  closeButtonsWinLose();
  startGame();
  init();
}

/**
 * restart the Game by reloading the page
 */
function restartGame() {
  location.reload();
}

/** close the YouWin and GameOver windows
 */
function closeButtonsWinLose() {
  youWin.classList.add("d-none");
  gameOver.classList.add("d-none");
}

/**
 * show the history in the Menuinfos
 * @param {Event} event
 */
function startHistory(event) {
  event.stopPropagation();
  menuInfos.innerHTML = "";
  menuInfos.innerHTML = TemplateHistory();
}

/**
 * show the controls in the Menuinfos
 * @param {Event} event
 */
function startIntructions(event) {
  event.stopPropagation();
  menuInfos.innerHTML = "";
  menuInfos.innerHTML = templateHowToPlay();
}

/**
 * show the Impressum in the Menuinfos
 * @param {Event} event
 */
function impressum(event) {
  event.stopPropagation();
  menuInfos.innerHTML = "";
  menuInfos.innerHTML = templateImpressum();
}

/**
 * close the Menu when the user out of the menu click.
 * @param {Event} event
 */
function closeMenu(event) {
  instructions.classList.add("d-none");
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

/** add event listeners to check orientation on load,
 * this check the orintation when the page is loaded
 * and when the user change the size of the window or change the orintation
 */
window.addEventListener("load", () => {
  checkOrientation();
  stopFullscreen();
});

/** add event listeners to check orientation on resize,
 * this check the orintation when the page is resized
 * and when the user change the size of the window or change the orintation
 */
window.addEventListener("resize", () => {
  checkOrientation();
  stopFullscreen();
});

/** add event listeners to check orientation on orientationchange,
 * this check the orintation when the page is changed
 * and when the user change the size of the window or change the orintation
 */
window.addEventListener("orientationchange", () => {
  checkOrientation();
  stopFullscreen();
});

/** show the bubbles popup when user user all poisoned bubbles
 */
function showBubbles(){
  const popup = document.getElementById("gameStartPopup");
  popup.classList.remove("d-none");
  popup.classList.add("d-flex");
  setTimeout(() => {
    popup.classList.add("d-none");
    popup.classList.remove("d-flex");
  }, 3000);
}
