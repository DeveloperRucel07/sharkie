class Level {
    pufferEnemies;
    jellyEnemies;
    backgrounds;
    coins;
    poisons;
    lifes;
    level_end_x = 5000;

    constructor(pufferEnemies,  jellyEnemies,  backgrounds, poisons, coins, lifes ){
        this.pufferEnemies = pufferEnemies;
        this.jellyEnemies = jellyEnemies;
        this.backgrounds = backgrounds;
        this.poisons = poisons;
        this.coins = coins;
        this.lifes = lifes;
    }
}