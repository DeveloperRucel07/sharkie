/**
 * 
 * @returns HTML template for the History
 */
function TemplateHistory(){
    return `
            <h2 class="title">Deep under the waves, in the mysterious Coral Kingdom, lives a brave little shark named Sharkie.</h2>
            <p>
                Long ago, the Coral Kingdom was a place of peace and beauty...
                Puffer fishes gang swims across, blocking the path.
                Jelly fishes glow menacingly.
                Bottles of poison float slowly to set the mood. 
                Only one hero can save the ocean...
                Sharkie, the Ocean Guardian!
            </p>
            <h4 class="title">The Mission:</h4>
            <ul>
                <li>Collect coins to rebuild the Coral Kingdom 💰</li>
                <li>Protect the ocean from poison ☠️</li>
                <li>Defeat the enemies with your powers ⚔️</li>
                <li>And bring peace back to the deep blue sea 🌍💙</li>
            </ul>
            <h2 class="title">Are you ready to Help Sharkie Recover the Ocean?</h2>
    
    `
}


/**
 * 
 * @returns HTML template for controls(how tonplay the Game);
 */
function templateHowToPlay(){
    return `
            <h3 class="title">How to Play</h3>
            <ol>
                <li>Moves:
                    <ul>
                        <li> Move Left: use <img src="./images/5.Buttons/Key/arow-left.png" alt=""> or use the <span class="span-key">LEFT</span> key</li>
                        <li>Move Right: use <img src="./images/5.Buttons/Key/arow-right.png" alt=""> or use the <span class="span-key">RIGHT</span> key</li>
                        <li>Move Up: use <img src="./images/5.Buttons/Key/arow-up.png" alt=""> or use the <span class="span-key">UP</span> key</li>
                        <li>Move Down: use <img src="./images/5.Buttons/Key/arow-down.png" alt=""> or use the <span class="span-key">DOWN</span> key</li>
                    </ul>
                </li>

                <li>
                    Attacks:
                    <ul>
                        <li>normal Bubble attack: use <img src="./images/5.Buttons/Key/normal-bubble.png" alt=""> or use the <span class="span-key">D</span> key</li>
                        <li>Poison Bubble attack: use <img src="./images/5.Buttons/Key/poison-bubble.png" alt=""> or use the <span class="span-key">F</span> key</li>
                        <li>Slap attack: use <img src="./images/5.Buttons/Key/slap-shark.png" alt=""> or use the <span class="span-key">SPACE</span> key </li>
                    </ul>
                </li>
            </ol>

            <ul>
                <li>Mute and Unmute Sound: <img src="./images/5.Buttons/Key/volume.png" alt="mute/unmute image"></li>
                <li> FullScreen: <img src="./images/5.Buttons/Key/fullscreen.png" alt="fullscreen image"></li>
            </ul>
            

    `
}

/**
 * 
 * @returns HTML Template for the Impressum
 */
function templateImpressum(){
    return `
        <h1 class="title">Impressum</h1>

        <p>Rucel Tsafack<br />
        An d. Trave 30 <br />
        23795 Bad Segeberg</p>

        <h2>Kontakt</h2>
        <p>Telefon: 015563633814<br />
        E-Mail: tsafackrucel@gmail.com</p>
        <p>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p>
    
    `;
}