class SoundManager {
    constructor() {
        this.background_music = new Audio('audio/background_music.mp3');
        this.background_music.loop = true;
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

        this.backgroundSounds = [this.background_music, this.endboss_background_sound]; //
        this.effectSounds = [
            this.collect_coin_sound,
            this.win_sound,
            this.game_over_sound,
            this.swim_sound,
            this.electric_sound,
            this.shark_slap_sound,
            this.shark_hurt_sound,
            this.shark_dead_sound,
            this.shark_bubble_sound,
            this.shark_poison_sound,
            this.shark_sleeping_sound,
            this.collect_poison_sound,
            this.collect_life_sound,
            this.entry_endboss_sound,
            this.endboss_attack_sound,
            this.endboss_hurt_sound,
            this.endboss_dead_sound,
        ];
    }


    /**
     * Play all background sounds.
     */
    playAllSounds() {
        this.backgroundSounds.forEach(sound => {
            sound.play();
            sound.currentTime = 0;
        });
    }


    /**
     * Stop all sounds (background and effects).
     */
    stopAllSounds() {
        console.warn('stopAllSounds()');
        [...this.backgroundSounds, ...this.effectSounds].forEach(sound => {
            sound.currentTime = 0;
            sound.pause();
        });
    }


    /**
     * Stop only background sounds.
     */
    stopBackgroundSounds() {
        console.warn('stopBackgroundSounds()');
        this.backgroundSounds.forEach(sound => {
            sound.currentTime = 0;
            sound.pause();
        });
    }


    /**
     * Restart background sounds from the beginning.
     */
    restartBackgroundSounds() {
        this.backgroundSounds.forEach(sound => {
            sound.currentTime = 0;
            sound.play();
        });
    }

    /**
     * Reset all sounds (background and effects) and restart background sounds.
     */
    resetAllSounds() {
        console.warn('resetAllSounds the Sounds again!!!');
        [...this.backgroundSounds, ...this.effectSounds].forEach(sound => {
            sound.currentTime = 0;
            sound.pause();
        });
        this.backgroundSounds.forEach(sound => {
            sound.currentTime = 0;
            sound.play();
        });
    }


    /**
     * Mute all sounds (background and effects).
     */
    muteAllSounds() {
        [...this.backgroundSounds, ...this.effectSounds].forEach(sound => {
            sound.muted = true;
        });
    }


    /**
     * Unmute all sounds (background and effects).
     */
    unmuteAllSounds() {
        [...this.backgroundSounds, ...this.effectSounds].forEach(sound => {
            sound.muted = false;
        });
    }

}
