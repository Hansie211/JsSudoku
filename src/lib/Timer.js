import { AppVisibility } from "quasar";
import { watch } from "vue";
import EventBus from "./eventbus";

/**
 * @param {Object} value
 * @param {Number} def
 * @returns {Number}
 */
function parseDef(value, def) {
    const result = parseInt(value);
    return isNaN(result) ? def : result;
}

export default class Timer {
    /** @type {Number} */
    time;

    /** @type {Boolean} */
    paused;

    /** @type {EventBus} */
    eventBus;

    dispatchUpdate() {
        this.eventBus.dispatch("update", { time: this.time });
    }

    updateTimer() {
        if (this.paused) return;

        this.time++;
        this.dispatchUpdate();
    }

    /**
     * @param {Number}  value
     */
    set(value) {
        this.time = parseDef(value, 0);
        this.dispatchUpdate();
    }

    start() {
        watch(
            () => AppVisibility.appVisible,
            (val) => {
                if (val) {
                    this.__timer = window.setInterval(this.updateTimer.bind(this), 1000);
                } else {
                    window.clearInterval(this.__timer);
                }
            },
            { immediate: true }
        );
    }

    /** @type {Number} */
    __timer = 0;

    /**
     * @param {Number} initialValue
     */
    constructor(initialValue) {
        this.eventBus = new EventBus();
        this.paused = false;
        this.time = parseDef(initialValue, 0);
    }
}
