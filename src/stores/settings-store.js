import { defineStore } from "pinia";
import { ref, watch } from "vue";
import versions from "src/data/version.json";
import SaveManager, { Savestate } from "src/lib/SaveManager";

export const useSettingsStore = defineStore("settings", () => {
    const settings = {
        showErrors: ref(true),
        showTime: ref(true),
        showHints: ref(true),
        markImpossibleNumbers: ref(true),
        placeNumbersOnSelect: ref(false),
        autoRemoveNotes: ref(true),
    };

    const saveManager = new SaveManager();
    Object.keys(settings).forEach((key) => {
        saveManager.states.push(
            new Savestate(
                key,
                () => settings[key].value,
                (v) => (settings[key].value = v),
                () => {}
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
