function TemplateStartHistory(){
    return `
        <div class="history-text card">
            <h2 class="title">Deep under the waves, in the mysterious Coral Kingdom, lives a brave little shark named Sharkie.</h2>
            <p>
                Long ago, the Coral Kingdom was a place of peace and beauty...
                Puffer fishes gang swims across, blocking the path.
                Jelly fishes glow menacingly.
                Bottles of poison float slowly to set the mood. 
                Only one hero can save the ocean...
                Sharkie, the Ocean Guardian!
            </p>
            <div class="next">
                <span></span>
                <button type="button" onclick="nextToMision()">Next</button>
            </div>
        </div>
    
    `
}

function templateMission(){
    return `
        <div class="mission card">
            <h4 class="title">The Mission:</h4>
            <ul>
                <li>Collect coins to rebuild the Coral Kingdom 💰</li>
                <li>Protect the ocean from poison ☠️</li>
                <li>Defeat the enemies with your powers ⚔️</li>
                <li>And bring peace back to the deep blue sea 🌍💙</li>
            </ul>
            <div class="next">
                <button type="button" onclick="startHistory()">Previous</button>
                <button type="button" onclick="nextToStartGame()">Next</button>
            </div>
        </div>
    `
}


function templateReadyToPlay(){
    return `

        <div class="start-btn">
            <h5 class="title">Are you ready to help Sharkie save the ocean?</h5>
            <button id="startBtnGame" class="start-game-btn" onclick="startGame()"> <img src="./images/5.Buttons/Start/1.png" alt="Start Game"></button>
        </div>
    `
}