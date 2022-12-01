import { defineStore } from "pinia";
import { ref, watch } from "vue";
import GameStateManager from "src/lib/GameStateManager";
import { useSettingsStore } from "./settings-store";

export const useGameStore = defineStore("game", () => {
    const settings = useSettingsStore();

    const gameState = ref(new GameStateManager(settings));
    gameState.value.saveManager.load();
    gameState.value.timer.start();

    //watch(gameState, () => gameState.value.saveManager.save(), { deep: true });

    return {
        gameState,
    };
});

/** @return {GameStateManager} */
export function getGameState() {
    const store = useGameStore();
    return store.gameState;
}
