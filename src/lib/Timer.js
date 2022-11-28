import { AppVisibility } from "quasar";
import { watch } from "vue";
import EventBus from "./eventbus";

export default class Timer {
    /** @type {Number} */
    time;

    /** @type {Boolean} */
    paused;

    /** @type {EventBus} */
    eventBus;

    // dispatchUpdate() {
    //     this.eventBus.dispatch("update", { time: this.time });
    // }

    updateTimer() {
        if (this.paused) return;

        this.time++;
        // this.dispatchUpdate();
    }

    /**
     * @param {Number}  value
     */
    set(value) {
        this.time = parseInt(value) || 0;
        // this.dispatchUpdate();
    }

    /** @type {Number} */
    __timer = 0;

    /**
     * @param {Number} initialValue
     */
    constructor(initialValue) {
        this.eventBus = new EventBus();
        this.paused = false;
        this.time = 0 + initialValue;

        watch(
            () => AppVisibility.appVisible,
            (val) => {
                if (val) {
                    this.__timer = window.setInterval(() => this.updateTimer(), 1000);
                } else {
                    window.clearInterval(this.__timer);
                }
            },
            { immediate: true }
        );
    }
}
