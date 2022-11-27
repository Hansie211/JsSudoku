import { defineStore } from "pinia";
import { ref, watch } from "vue";
import versions from "src/data/version.json";
import { SaveManager, Savestate } from "src/lib/savegame";

export const useSettingsStore = defineStore("settings", () => {
    const settings = {
        showErrors: ref(undefined),
        showTime: ref(undefined),
        showHints: ref(undefined),
    };

    const saveManager = new SaveManager();

    Object.keys(settings).forEach((key) => {
        saveManager.states.push(
            new Savestate(
                key,
                () => settings[key].value,
                (v) => (settings[key].value = v),
                () => true
            )
        );
    });
    saveManager.load();

    Object.keys(settings).forEach((key) => watch(settings[key], () => saveManager.save()));

    const version = `v${versions.major}.${versions.minor}.${versions.rev}`;

    return {
        ...settings,
        version,
    };
});
