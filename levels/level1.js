let level1;

IMAGES_SWIM_PUFFERFISH_ORANGE = [
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
];
IMAGES_DIE_PUFFERFISH_ORANGE = [
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png'
];
IMAGES_SWIM_PUFFERFISH_GREEN = [
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
];
IMAGES_DIE_PUFFERFISH_GREEN = [
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png'
];
IMAGES_SWIM_PUFFERFISH_PINK = [
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
];
IMAGES_DIE_PUFFERFISH_PINK = [
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png',
    'images/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png',
];

IMAGES_SWIM_JELLYFISH_YELLOW = [
    'images/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
    'images/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
    'images/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
    'images/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
];
IMAGES_DIE_JELLYFISH_YELLOW = [
    'images/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
    'images/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
    'images/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
    'images/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
];

IMAGES_SWIM_JELLYFISH_LILA = [
    'images/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
    'images/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
    'images/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
    'images/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
];
IMAGES_DIE_JELLYFISH_LILA = [
    'images/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
    'images/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
    'images/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
    'images/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
];
IMAGES_SWIM_JELLYFISH_PINK = [
     'images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
    'images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
    'images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
    'images/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
];
IMAGES_DIE_JELLYFISH_PINK = [
    'images/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
    'images/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
    'images/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
    'images/2.Enemy/2 Jelly fish/Dead/Pink/P4.png',
];
IMAGES_SWIM_JELLYFISH_GREEN = [
    'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
    'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
    'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
    'images/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
];
IMAGES_DIE_JELLYFISH_GREEN = [
    'images/2.Enemy/2 Jelly fish/Dead/green/g1.png',
    'images/2.Enemy/2 Jelly fish/Dead/green/g2.png',
    'images/2.Enemy/2 Jelly fish/Dead/green/g3.png',
    'images/2.Enemy/2 Jelly fish/Dead/green/g4.png'
];

/**
 * inititate Level Game
 */
function initLevel(){
    level1  = new Level(
        [
            new PufferFish(400, 10, IMAGES_SWIM_PUFFERFISH_ORANGE, IMAGES_DIE_PUFFERFISH_ORANGE),
            new PufferFish(600, 100, IMAGES_SWIM_PUFFERFISH_GREEN, IMAGES_DIE_PUFFERFISH_GREEN),
            new PufferFish(500, 400, IMAGES_SWIM_PUFFERFISH_ORANGE, IMAGES_DIE_PUFFERFISH_ORANGE),
            new PufferFish(800, 200, IMAGES_SWIM_PUFFERFISH_PINK, IMAGES_DIE_PUFFERFISH_PINK),
            new PufferFish(1200, 10, IMAGES_SWIM_PUFFERFISH_PINK, IMAGES_DIE_PUFFERFISH_PINK),
            new PufferFish(1900, 300, IMAGES_SWIM_PUFFERFISH_ORANGE, IMAGES_DIE_PUFFERFISH_ORANGE),
            new PufferFish(2700, 400, IMAGES_SWIM_PUFFERFISH_PINK, IMAGES_DIE_PUFFERFISH_PINK),
            new PufferFish(3000, 500, IMAGES_SWIM_PUFFERFISH_GREEN, IMAGES_DIE_PUFFERFISH_GREEN),
            new PufferFish(3200, 400, IMAGES_SWIM_PUFFERFISH_ORANGE, IMAGES_DIE_PUFFERFISH_ORANGE),
            new PufferFish(3100, 100, IMAGES_SWIM_PUFFERFISH_PINK, IMAGES_DIE_PUFFERFISH_PINK),
            new PufferFish(3300, 10, IMAGES_SWIM_PUFFERFISH_GREEN, IMAGES_DIE_PUFFERFISH_GREEN),
        ],

        [
            new JellyFish(350, IMAGES_SWIM_JELLYFISH_LILA, IMAGES_DIE_JELLYFISH_LILA),
            new JellyFish(650, IMAGES_SWIM_JELLYFISH_YELLOW, IMAGES_DIE_JELLYFISH_YELLOW),
            new JellyFish(950, IMAGES_SWIM_JELLYFISH_PINK, IMAGES_DIE_JELLYFISH_PINK),
            new JellyFish(1250, IMAGES_SWIM_JELLYFISH_GREEN, IMAGES_DIE_JELLYFISH_GREEN),
            new JellyFish(1600, IMAGES_SWIM_JELLYFISH_GREEN, IMAGES_DIE_JELLYFISH_GREEN),
            new JellyFish(2000, IMAGES_SWIM_JELLYFISH_YELLOW, IMAGES_DIE_JELLYFISH_YELLOW),
            new JellyFish(2200, IMAGES_SWIM_JELLYFISH_LILA, IMAGES_DIE_JELLYFISH_LILA),
            new JellyFish(3000, IMAGES_SWIM_JELLYFISH_PINK, IMAGES_DIE_JELLYFISH_PINK),
            new JellyFish(3200, IMAGES_SWIM_JELLYFISH_LILA, IMAGES_DIE_JELLYFISH_LILA),
            new JellyFish(2800, IMAGES_SWIM_JELLYFISH_GREEN, IMAGES_DIE_JELLYFISH_GREEN),
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
