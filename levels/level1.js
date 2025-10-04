let level1;


/**
 * inititate Level Game
 */
function initLevel(){
    level1  = new Level(
        [
            new PufferFishOrange(400, 10),
            new PufferFishGreen(600, 100),
            new PufferFishOrange(500, 400),
            new PufferFishPink(800, 200),
            new PufferFishPink(1200, 10),
            new PufferFishOrange(1900, 300),
            new PufferFishPink(2700, 400),
            new PufferFishGreen(3000, 500),
            new PufferFishOrange(3200, 400),
            new PufferFishPink(3100, 100),
            new PufferFishGreen(3300, 10),
        ],

        [
            new JellyFishLila(350),
            new JellyFishYellow(650),
            new JellyFishPink(950),
            new JellyFishGreen(1250),
            new JellyFishGreen(1600),
            new JellyFishYellow(2000),
            new JellyFishLila(2200),
            new JellyFishPink(3000),
            new JellyFishLila(3200),
            new JellyFishGreen(2800),
        ],

        [
            //water
            ...Array.from({ length: 23 }, (_, i) =>
                new Background(899 * i, 'images/3.Background/Layers/5. Water/L.png', 0)
            ),

            // Lights
            ...Array.from({ length: 30 }, (_, i) =>
                new Fond(
                    675 * i,
                    0,
                    `images/3.Background/Layers/1. Light/${i % 2 === 0 ? '1' : '2'}.png`,
                    0.75
                )
            ),

            //first fond
            ...Array.from({ length: 23 }, (_, i) =>
                new Fond(675 * i, 60, 'images/3.Background/Layers/4.Fondo 2/D.png', 0.5)
            ),
            
            //second fond
            ...Array.from({ length: 23 }, (_, i) =>
                new Fond(675 * i, 120, 'images/3.Background/Layers/3.Fondo 1/L.png', 0.25)
            ),
            
            //floor
            ...Array.from({ length: 23 }, (_, i) =>
                new Fond(675 * i, 170, 'images/3.Background/Layers/2. Floor/L.png', 0.15)
            ),

        ],

        [
            new Poison(450),
            new Poison(1000),
            new Poison(2450),
            new Poison(600),
            new Poison(800),
            new Poison(1200),
            new Poison(1500),
            new Poison(1800),
            new Poison(2000),
            new Poison(2800),

        ],

        [
            new Coin(300, 450),
            new Coin(700, 250),
            new Coin(1100, 10),
            new Coin(1500, 350),
            new Coin(1900, 150),
            new Coin(2300, 50),
            new Coin(2400, 250),
            new Coin(2600, 350),
            new Coin(3300, 10),
            new Coin(3000, 450),
        ],

        [
            new Life(310, 200),
            new Life(900, 10),
            new Life(1200, 400),
            new Life(1800, 500),
            new Life(2300, 300),
            new Life(2800, 100),

        ],


    );
}
