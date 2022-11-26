import { defineStore } from "pinia";
import { ref } from "vue";
import version from "src/data/version.json";

export const useSettingsStore = defineStore("settings", () => {
    const showErrors = ref(true);
    const showTime = ref(true);
    const showHints = ref(true);

    const version = `v${version.major}.${version.minor}.${version.revision}`;

    return {
        showErrors,
        showTime,
        showHints,
        version,
    };
});
