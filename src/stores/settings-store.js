import { defineStore } from "pinia";
import { ref } from "vue";
import versions from "src/data/version.json";

export const useSettingsStore = defineStore("settings", () => {
    const showErrors = ref(true);
    const showTime = ref(true);
    const showHints = ref(true);

    const version = `v${versions.major}.${versions.minor}.${versions.rev}`;

    return {
        showErrors,
        showTime,
        showHints,
        version,
    };
});
