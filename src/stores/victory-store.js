import { defineStore } from "pinia";
import { ref, watch } from "vue";
import SaveManager, { Savestate } from "src/lib/SaveManager";

export class Victory {
    /** @type {Number} */
    level;
    /** @type {Number} */
    time;
    /** @type {Number} */
    hintCount;
    /** @type {Number} */
    difficultyLevel;
    /** @type {Number} */
    date;

    /**
     * @param {Object} args
     * @param {Number} args.level
     * @param {Number} args.time
     * @param {Number} args.hintCount
     * @param {Number} args.difficultyLevel
     * @param {Number} args.date
     */
    constructor(args) {
        this.level = args.level;
        this.time = args.time;
        this.hintCount = args.hintCount;
        this.difficultyLevel = args.difficultyLevel;
        this.date = args.date ?? new Date().getTime();
    }
}

export const useVictoryStore = defineStore("victory", () => {
    const victories = ref([]);

    const saveManager = new SaveManager("victories");
    saveManager.states.push(
        new Savestate(
            "list",
            () => victories.value,
            (v) => (victories.value = v)
        )
    );
    saveManager.load();

    watch(victories, saveManager.save, { deep: true });

    /** @param {Victory} victory */
    const addVictory = (victory) => {
        victories.value.splice(0, 0, victory);
    };

    return {
        victories,
        addVictory,
    };
});
