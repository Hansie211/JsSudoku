<template>
    <q-page id="page" v-if="gameState.puzzle">
        <div style="padding: 10px">
            <sudoku-board ref="sudoku" :puzzle="gameState.puzzle" :key="renderKey" size="4.7vw" @cellSelected="cellSelected" />
        </div>
        <div id="bottom-bar" class="flex column full-width">
            <div id="info-bar" class="flex row full-width q-px-sm">
                <div v-show="settings.showTime">{{ puzzleTime }}</div>
                <q-space />
                <div class="text-caption q-mr-sm flex flex-center"><difficulty-rating :level="gameState.puzzle?.difficultyLevel || 0" /></div>
                <div class="text-caption flex-center">Hints {{ gameState.hintCount }}</div>
            </div>
            <div id="action-bar" class="full-width">
                <div id="mode-bar" class="row q-pa-sm">
                    <q-btn icon="settings" round flat size="md" @click="showSettings" />
                    <q-space />
                    <q-btn icon="undo" flat round size="md" @click="undo" />
                    <q-btn icon="tips_and_updates" flat round size="md" @click="hint" v-show="settings.showHints" />
                    <q-toggle v-model="noteMode" icon="edit" color="positive" />
                    <q-btn icon="backspace" flat round size="md" @click="clearCell" />
                </div>

                <number-bar :size="9" @click="placeNumber" :activeNumbers="activeNumbers" />
            </div>
        </div>
    </q-page>
</template>

<script>
import SudokuBoard from "src/components/SudokuBoard.vue";
import SettingsScreen from "src/components/SettingsScreen";
import { StructureDefinitions } from "src/lib/sudoku/board";
import { defineComponent, reactive, ref, toRef } from "vue";
import { Cell } from "src/lib/reactiveSoduku";
import { useSettingsStore } from "src/stores/settings-store";
import NumberBar from "src/components/NumberBar";
import VictoryScreen from "src/components/VictoryScreen";
import GameStateManager from "src/lib/GameStateManager";
import DifficultyRating from "src/components/DifficultyRating.vue";

export default defineComponent({
    components: { SudokuBoard, NumberBar, DifficultyRating },
    name: "IndexPage",
    setup() {
        const settings = useSettingsStore();
        const gameState = reactive(new GameStateManager());

        return {
            settings,
            /** @type {GameStateManager} */
            gameState,
            renderKey: ref(0),
        };
    },
    created() {
        this.gameState.saveManager.load();

        this.gameState.eventBus.on("victory", (event) => {
            this.showVictory();
        });

        this.gameState.eventBus.on("error", (event) => {
            this.showError(event.message);
        });

        this.gameState.timer.start();
    },
    data() {
        return {
            noteMode: false,
            selectedCellId: null,
        };
    },
    methods: {
        showError(text) {
            this.$q.notify({
                message: text,
                group: false,
                type: "negative",
                timeout: 1000,
                actions: [{ icon: "close", color: "white" }],
            });
        },
        showVictory() {
            const time = this.gameState.timer.time;

            const victories = this.$q.localStorage.getItem("victories")?.data ?? [];
            victories.push({
                level: this.gameState.puzzle.seed,
                time: time,
                hintCount: this.gameState.hintCount,
                difficultyLevel: this.gameState.puzzle.difficultyLevel,
            });
            this.$q.localStorage.set("victories", { data: victories });

            this.$q
                .dialog({
                    component: VictoryScreen,
                    componentProps: {
                        puzzle: this.gameState.puzzle,
                        time: time,
                        hintCount: this.gameState.hintCount,
                    },
                })
                .onOk((info) => this.gameState.newLevel(info.difficultyLevel, info.seed));
        },
        showSettings() {
            this.$q
                .dialog({
                    component: SettingsScreen,
                    componentProps: {
                        currentLevel: this.gameState.puzzle.seed,
                    },
                })
                .onOk((action) => {
                    switch (action.name) {
                        case "new-level":
                            this.gameState.newLevel(action.data.level, action.data.seed);
                            break;
                        case "reset-level":
                            this.gameState.resetLevel();
                            break;
                    }
                });
        },

        placeNumber(num) {
            if (this.noteMode) this.gameState.placeNote(this.selectedCellId, num);
            else this.gameState.placeNum(this.selectedCellId, num);
        },

        clearCell() {
            this.gameState.clearCell(this.selectedCellId);
        },
        hint() {
            this.gameState.hint();
        },
        cellSelected(id) {
            this.selectedCellId = id;
        },
        undo() {
            this.gameState.undo();
        },
    },
    computed: {
        boardSize() {
            return StructureDefinitions.SIZE;
        },
        /** @returns {Cell} */
        selectedCell() {
            return this.gameState.puzzle.findCellById(this.selectedCellId);
        },
        activeNumbers() {
            if (!this.selectedCell) return [];
            if (this.selectedCell.isStatic) return [];
            if (this.selectedCell.value) return [];

            return this.selectedCell.notes.values;
        },
        puzzleTime() {
            const time = this.gameState.timer.time;
            const s = 0 + (time % 60);
            const m = 0 + Math.floor(time / 60);

            return m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
        },
    },
});
</script>
<style scoped>
#page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

#action-bar {
    background-color: var(--q-accent);

    height: 200px;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    color: white;
}

#mode-bar {
    flex-grow: 0;
    flex-shrink: 0;
}
</style>
