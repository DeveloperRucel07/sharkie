class Level {
    pufferEnemies;
    jellyEnemies;
    backgrounds;
    coins;
    poisons;
    lifes;
    level_end_x = 5000;

    /**
     * Creates a Level object with specified enemies, backgrounds, poisons, coins, and lifes.
     * @param {Array} pufferEnemies - Array of PufferFish enemy objects.
     * @param {Array} jellyEnemies - Array of JellyFish enemy objects.
     * @param {Array} backgrounds - Array of Background objects.
     * @param {Array} poisons - Array of Poison objects.
     * @param {Array} coins - Array of Coin objects.
     * @param {Array} lifes - Array of Collectable life objects.
     */
    constructor(pufferEnemies,  jellyEnemies,  backgrounds, poisons, coins, lifes ){
        this.pufferEnemies = pufferEnemies;
        this.jellyEnemies = jellyEnemies;
        this.backgrounds = backgrounds;
        this.poisons = poisons;
        this.coins = coins;
        this.lifes = lifes;
    }
}