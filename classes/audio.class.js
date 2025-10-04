class SoundManager {
    constructor() {
        this.background_music = new Audio('audio/background_music.mp3');
        this.background_music.loop = true;
        this.background_music.volume = 0.2;

        this.collect_coin_sound = new Audio('audio/coin.mp3');
        this.win_sound = new Audio('audio/win.mp3');
        this.game_over_sound = new Audio('audio/game_over.mp3');
        this.swim_sound = new Audio('audio/swim.mp3');
        this.electric_sound = new Audio('audio/jellyfish_attack.mp3');
        this.shark_slap_sound = new Audio('audio/slap_sound.mp3');
        this.shark_hurt_sound = new Audio('audio/sharkie_hurt.mp3');
        this.shark_dead_sound = new Audio('audio/sharkie_dead.mp3');
        this.shark_bubble_sound = new Audio('audio/sharkie_attack.mp3');
        this.shark_poison_sound = new Audio('audio/poison_bubble.mp3');
        this.shark_sleeping_sound = new Audio('audio/sleeping.mp3');
        this.collect_poison_sound = new Audio('audio/poison_collect.mp3');
        this.collect_life_sound = new Audio('audio/health_pickup.mp3');
        this.entry_endboss_sound = new Audio('audio/entry_enboss.mp3');
        this.endboss_attack_sound = new Audio('audio/endboss_attack.mp3');
        this.endboss_hurt_sound = new Audio('audio/boss_hurt.mp3');
        this.endboss_dead_sound = new Audio('audio/boss_dead.mp3');
        this.endboss_background_sound = new Audio('audio/background_endboss.mp3');

    }


    /**
     * check every instance of Audio and pause them.
     */
    stopAllSounds() {
        for (const key in this) {
            if (this[key] instanceof Audio) {
                this[key].pause();
                this[key].currentTime = 0;
            }
        }
    }


    /**
     * check every instance of Audio and muted them.
     */
    muteAllSounds() {
        for (const key in this) {
            if (this[key] instanceof Audio) {
                this[key].muted = true;
            }
        }
    }


    /**
     * check every instance of Audio and unmuted them.
     */
    unmuteAllSounds() {
        for (const key in this) {
            if (this[key] instanceof Audio) {
                this[key].muted = false;
            }
        }
    }

}
