import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
    const showErrors = ref(true);
    const showTime = ref(true);
    const showHints = ref(true);

    const version = "v0.1";

    return {
        showErrors,
        showTime,
        showHints,
        version,
    };
});
